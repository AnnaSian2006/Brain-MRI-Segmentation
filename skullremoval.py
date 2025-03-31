import numpy as np
import cv2
import matplotlib.pyplot as plt
import scipy.ndimage as ndimage
from skimage import filters, morphology
import tensorflow as tf
from tensorflow.keras import models, layers

def create_simple_cnn(input_shape):
    """
    Create a simple CNN model for Grad-CAM
    
    Parameters:
    - input_shape: Shape of input image
    
    Returns:
    - CNN model
    """
    model = models.Sequential([
        layers.Input(shape=input_shape),
        layers.Conv2D(16, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same', name='final_conv'),
        layers.GlobalAveragePooling2D(),
        layers.Dense(2, activation='softmax')  # Binary classification: skull vs. brain
    ])
    
    model.compile(optimizer='adam', loss='binary_crossentropy')
    return model

def generate_gradcam(model, img, layer_name, class_idx=0):
    """
    Generate Grad-CAM heatmap
    
    Parameters:
    - model: Trained CNN model
    - img: Input image
    - layer_name: Name of the layer to use for Grad-CAM
    - class_idx: Index of the class to generate Grad-CAM for
    
    Returns:
    - Grad-CAM heatmap
    """
    grad_model = tf.keras.models.Model(
        inputs=[model.inputs],
        outputs=[model.get_layer(layer_name).output, model.output]
    )
    
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img)
        loss = predictions[:, class_idx]
    
    # Extract gradients
    grads = tape.gradient(loss, conv_outputs)
    
    # Global average pooling
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    
    # Weight output feature maps with gradients
    conv_outputs = conv_outputs[0]
    heatmap = tf.reduce_sum(tf.multiply(pooled_grads, conv_outputs), axis=-1)
    
    # Normalize heatmap
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    heatmap = heatmap.numpy()
    
    # Resize heatmap to match input image size
    heatmap = cv2.resize(heatmap, (img.shape[2], img.shape[1]))
    
    return heatmap

def train_skull_brain_model(images, masks, epochs=10):
    """
    Train a simple CNN to differentiate between skull and brain regions
    
    Parameters:
    - images: Training images
    - masks: Ground truth masks (0 for brain, 1 for skull)
    
    Returns:
    - Trained model
    """
    # Prepare data
    X = np.array(images)
    y = np.array([mask.astype(np.float32) for mask in masks])
    y = np.stack([1 - y, y], axis=-1)  # One-hot encode: [brain, skull]
    
    # Create and train model
    input_shape = X[0].shape
    model = create_simple_cnn(input_shape)
    model.fit(X, y, epochs=epochs, batch_size=4, verbose=1)
    
    return model

def skull_removal_with_gradcam(image, pretrained_model=None):
    """
    Advanced skull removal technique using Grad-CAM for hyperspectral brain images
    
    Parameters:
    - image: Input hyperspectral brain image
    - pretrained_model: Optional pretrained CNN model for Grad-CAM
    
    Returns:
    - Skull-removed brain image and brain mask
    """
    # Check image dimensions
    if len(image.shape) < 3:
        raise ValueError("Image should be a 3D hyperspectral array")
    
    # Create average intensity projection for visualization
    avg_intensity = np.mean(image, axis=-1)
    
    # Prepare image for CNN (add batch dimension and ensure channel dimension)
    if len(image.shape) == 3:
        cnn_input = np.transpose(image, (2, 0, 1))  # Channels -> samples
        cnn_input = np.array([cv2.resize(img, (224, 224)) for img in cnn_input])
        cnn_input = np.transpose(cnn_input, (1, 2, 0))[np.newaxis, ...]
    else:
        # Resize for CNN input
        cnn_input = cv2.resize(avg_intensity, (224, 224))[..., np.newaxis]
        cnn_input = np.expand_dims(cnn_input, axis=0)
    
    # Normalize input
    cnn_input = (cnn_input - cnn_input.min()) / (cnn_input.max() - cnn_input.min())
    
    # If no pretrained model, use traditional methods first to create a simple model
    if pretrained_model is None:
        # Apply traditional methods to get an initial mask
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply((avg_intensity * 255).astype(np.uint8))
        
        otsu_thresh = filters.threshold_otsu(enhanced)
        initial_mask = enhanced > otsu_thresh
        
        cleaned_mask = morphology.remove_small_objects(initial_mask, min_size=500)
        cleaned_mask = morphology.remove_small_holes(cleaned_mask, area_threshold=1000)
        
        kernel = np.ones((5, 5), np.uint8)
        refined_mask = cv2.morphologyEx(cleaned_mask.astype(np.uint8), cv2.MORPH_CLOSE, kernel)
        refined_mask = cv2.morphologyEx(refined_mask, cv2.MORPH_OPEN, kernel)
        
        # Generate synthetic training data
        synthetic_images = []
        synthetic_masks = []
        
        # Use the initial refined mask as a training example
        synthetic_images.append(cnn_input[0])
        synthetic_masks.append(refined_mask)
        
        # Add more synthetic examples with variations
        for _ in range(5):
            # Apply random noise and transformations for data augmentation
            noise = np.random.normal(0, 0.1, cnn_input[0].shape)
            noisy_img = cnn_input[0] + noise
            noisy_img = np.clip(noisy_img, 0, 1)
            
            # Apply random rotation
            angle = np.random.randint(-20, 20)
            rotated_img = ndimage.rotate(noisy_img, angle, reshape=False)
            rotated_mask = ndimage.rotate(refined_mask, angle, reshape=False)
            
            synthetic_images.append(rotated_img)
            synthetic_masks.append(rotated_mask > 0.5)
        
        # Train a simple model
        model = train_skull_brain_model(synthetic_images, synthetic_masks, epochs=5)
    else:
        model = pretrained_model
    
    # Generate Grad-CAM heatmap for skull class (class_idx=1)
    gradcam_heatmap = generate_gradcam(model, cnn_input, "final_conv", class_idx=1)
    
    # Resize heatmap to original image size
    original_size_heatmap = cv2.resize(gradcam_heatmap, (avg_intensity.shape[1], avg_intensity.shape[0]))
    
    # Threshold the heatmap to create a mask
    # Higher values indicate higher activation for skull class
    heatmap_threshold = 0.5  # Adjust based on your needs
    skull_mask = original_size_heatmap > heatmap_threshold
    
    # Combine with traditional method for better results
    # Apply traditional methods to get an additional mask
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply((avg_intensity * 255).astype(np.uint8))
    
    otsu_thresh = filters.threshold_otsu(enhanced)
    traditional_mask = enhanced > otsu_thresh
    
    # Combine masks (intersection of traditional brain region and inverse of Grad-CAM skull region)
    combined_skull_mask = np.logical_or(skull_mask, ~traditional_mask)
    brain_mask = ~combined_skull_mask
    
    # Apply morphological operations to clean up the mask
    cleaned_mask = morphology.remove_small_objects(brain_mask, min_size=500)
    cleaned_mask = morphology.remove_small_holes(cleaned_mask, area_threshold=1000)
    
    kernel = np.ones((5, 5), np.uint8)
    final_brain_mask = cv2.morphologyEx(cleaned_mask.astype(np.uint8), cv2.MORPH_CLOSE, kernel)
    final_brain_mask = cv2.morphologyEx(final_brain_mask, cv2.MORPH_OPEN, kernel)
    final_brain_mask = final_brain_mask.astype(bool)
    
    # Apply mask to original image
    brain_only = np.zeros_like(image)
    for i in range(image.shape[-1]):
        brain_only[..., i] = image[..., i] * final_brain_mask
    
    return brain_only, final_brain_mask, original_size_heatmap, model

def visualize_skull_removal_with_gradcam(original_image, brain_only_image, brain_mask, gradcam_heatmap):
    """
    Visualize skull removal process with Grad-CAM
    
    Parameters:
    - original_image: Original hyperspectral image
    - brain_only_image: Skull-removed image
    - brain_mask: Binary mask of brain region
    - gradcam_heatmap: Grad-CAM heatmap
    """
    plt.figure(figsize=(15, 10))
    
    # Original Average Intensity
    plt.subplot(2, 2, 1)
    plt.title('Original Average Intensity')
    plt.imshow(np.mean(original_image, axis=-1), cmap='gray')
    
    # Grad-CAM Heatmap
    plt.subplot(2, 2, 2)
    plt.title('Grad-CAM Heatmap (Skull Region)')
    plt.imshow(gradcam_heatmap, cmap='jet')
    plt.colorbar()
    
    # Brain Mask
    plt.subplot(2, 2, 3)
    plt.title('Brain Mask')
    plt.imshow(brain_mask, cmap='binary')
    
    # Skull Removed Image
    plt.subplot(2, 2, 4)
    plt.title('Skull Removed Average Intensity')
    plt.imshow(np.mean(brain_only_image, axis=-1), cmap='gray')
    
    plt.tight_layout()
    plt.show()

def main():
    # Option 1: Load from file (replace with your image loading method)
    # image = np.load('your_hyperspectral_image.npy')
    
    # Option 2: Simulate hyperspectral image from the provided images
    # Assuming first image is a multi-band hyperspectral representation
    image = plt.imread("C:\\Users\\admin\\Desktop\\CYI\\datasets\\ThirdCampaign\\050-01\\050-01\\image.jpg")  # Replace with actual file path
    
    # Normalize image
    image = (image - image.min()) / (image.max() - image.min())
    
    # Reshape if needed to ensure 3D array
    if len(image.shape) == 2:
        image = image[..., np.newaxis]
    
    # Perform skull removal with Grad-CAM
    brain_only_image, brain_mask, gradcam_heatmap, model = skull_removal_with_gradcam(image)
    
    # Visualize results
    visualize_skull_removal_with_gradcam(image, brain_only_image, brain_mask, gradcam_heatmap)
    
    return brain_only_image, brain_mask, model

if __name__ == "__main__":
    brain_image, mask, trained_model = main()
    
    # Save model for future use
    # trained_model.save('skull_brain_model.h5')
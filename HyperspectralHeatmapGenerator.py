import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import os
import cv2
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import scipy.ndimage as ndimage

class HyperspectralHeatmapGenerator:
    def __init__(self):
        """
        Initialize the hyperspectral heatmap generator
        """
        # Define custom colormaps for different tissue types
        self.tumor_cmap = plt.cm.hot
        self.brain_tissue_cmap = plt.cm.viridis
        self.vessel_cmap = plt.cm.cool
        
    def load_hyperspectral_image(self, file_path):
        """
        Load hyperspectral image data
        
        Parameters:
        - file_path: Path to the hyperspectral image file
        
        Returns:
        - Hyperspectral image as numpy array
        """
        # Detect file extension and load accordingly
        if file_path.endswith('.npy'):
            return np.load(file_path)
        elif file_path.endswith(('.png', '.jpg', '.jpeg', '.tiff')):
            # For demonstration with RGB images
            img = plt.imread(file_path)
            # If grayscale, expand to 3D
            if len(img.shape) == 2:
                img = img[..., np.newaxis]
            return img
        else:
            raise ValueError(f"Unsupported file format: {file_path}")
            
    def normalize_hyperspectral_data(self, hyperspectral_image):
        """
        Normalize hyperspectral data across all bands
        
        Parameters:
        - hyperspectral_image: Input hyperspectral image
        
        Returns:
        - Normalized hyperspectral image
        """
        # Reshape to 2D for normalization
        orig_shape = hyperspectral_image.shape
        if len(orig_shape) == 3:
            rows, cols, bands = orig_shape
            reshaped_img = hyperspectral_image.reshape(rows * cols, bands)
            
            # Normalize each spectral band
            scaler = StandardScaler()
            normalized_data = scaler.fit_transform(reshaped_img)
            
            # Reshape back to original dimensions
            normalized_img = normalized_data.reshape(orig_shape)
            return normalized_img
        else:
            # Handle 2D images
            return (hyperspectral_image - hyperspectral_image.min()) / (hyperspectral_image.max() - hyperspectral_image.min())
    
    def create_spectral_heatmap(self, hyperspectral_image, band_indices=None, enhancement_factor=1.5):
        """
        Create spectral heatmap from hyperspectral image
        
        Parameters:
        - hyperspectral_image: Input hyperspectral image
        - band_indices: Specific spectral bands to use (default: use all)
        - enhancement_factor: Factor to enhance contrast
        
        Returns:
        - Spectral heatmap
        """
        if len(hyperspectral_image.shape) < 3:
            raise ValueError("Input must be a 3D hyperspectral image")
            
        # Use specified bands or all available bands
        if band_indices is None:
            band_indices = range(hyperspectral_image.shape[2])
            
        # Extract relevant bands
        selected_bands = hyperspectral_image[:, :, band_indices]
        
        # Apply PCA to reduce dimensionality to 3 components for RGB visualization
        rows, cols, bands = selected_bands.shape
        reshaped_data = selected_bands.reshape(rows * cols, bands)
        
        # Apply PCA for dimensionality reduction
        pca = PCA(n_components=3)
        pca_result = pca.fit_transform(reshaped_data)
        
        # Reshape back to image dimensions
        heatmap = pca_result.reshape(rows, cols, 3)
        
        # Normalize to [0, 1] range
        heatmap = (heatmap - heatmap.min()) / (heatmap.max() - heatmap.min())
        
        # Enhance contrast
        heatmap = np.power(heatmap, 1.0/enhancement_factor)
        
        return heatmap
    
    def create_spectral_index_heatmap(self, hyperspectral_image, index_type='ndvi'):
        """
        Create heatmap based on spectral indices
        
        Parameters:
        - hyperspectral_image: Input hyperspectral image
        - index_type: Type of spectral index to use
        
        Returns:
        - Spectral index heatmap
        """
        # Ensure we have enough bands
        if hyperspectral_image.shape[2] < 4:
            raise ValueError(f"Not enough spectral bands for index: {index_type}")
            
        # Create different indices based on type
        if index_type == 'ndvi':
            # Example: Near-infrared and Red bands (adjust indices as needed)
            nir_band = hyperspectral_image[:, :, 3]  # Example NIR band
            red_band = hyperspectral_image[:, :, 2]  # Example Red band
            
            # Avoid division by zero
            denominator = nir_band + red_band
            denominator[denominator == 0] = 1e-10
            
            index_map = (nir_band - red_band) / denominator
            
        elif index_type == 'tumor':
            # Example: Custom index for tumor detection
            # Replace with actual spectral bands relevant for tumor detection
            band1 = hyperspectral_image[:, :, 0]
            band2 = hyperspectral_image[:, :, 1]
            band3 = hyperspectral_image[:, :, 2]
            
            # Example formula (to be replaced with actual tumor detection formula)
            index_map = (band1 + band2) / (band3 + 1e-10)
            
        else:
            raise ValueError(f"Unsupported index type: {index_type}")
            
        # Normalize the index map to [0, 1]
        index_map = (index_map - index_map.min()) / (index_map.max() - index_map.min() + 1e-10)
        
        return index_map
        
    def apply_tissue_specific_heatmap(self, hyperspectral_image, tissue_mask=None):
        """
        Apply tissue-specific colormaps for different regions
        
        Parameters:
        - hyperspectral_image: Input hyperspectral image
        - tissue_mask: Optional segmentation mask (if None, will attempt to segment)
        
        Returns:
        - Tissue-colored heatmap
        """
        # If no mask provided, attempt to segment the image
        if tissue_mask is None:
            # Simple clustering-based segmentation example
            # In practice, use more sophisticated segmentation methods
            avg_intensity = np.mean(hyperspectral_image, axis=2)
            
            # Simple thresholding for demonstration
            # Replace with actual tissue segmentation algorithm
            tumor_mask = avg_intensity > np.percentile(avg_intensity, 90)
            brain_mask = (avg_intensity > np.percentile(avg_intensity, 40)) & ~tumor_mask
            vessel_mask = (avg_intensity > np.percentile(avg_intensity, 70)) & ~tumor_mask & ~brain_mask
            
            tissue_mask = np.zeros_like(avg_intensity)
            tissue_mask[tumor_mask] = 1   # Tumor
            tissue_mask[brain_mask] = 2   # Brain tissue
            tissue_mask[vessel_mask] = 3  # Vessels
        
        # Create RGB heatmap
        heatmap = np.zeros((hyperspectral_image.shape[0], hyperspectral_image.shape[1], 3))
        
        # Apply spectral index or intensity for each tissue type
        intensity = np.mean(hyperspectral_image, axis=2)
        
        # Apply different colormaps for different tissues
        tumor_regions = tissue_mask == 1
        brain_regions = tissue_mask == 2
        vessel_regions = tissue_mask == 3
        
        # Apply colormaps
        if np.any(tumor_regions):
            heatmap[tumor_regions] = self.tumor_cmap(intensity[tumor_regions])[:, :3]
        
        if np.any(brain_regions):
            heatmap[brain_regions] = self.brain_tissue_cmap(intensity[brain_regions])[:, :3]
            
        if np.any(vessel_regions):
            heatmap[vessel_regions] = self.vessel_cmap(intensity[vessel_regions])[:, :3]
            
        return heatmap
    
    def visualize_heatmaps(self, original_image, heatmaps, titles):
        """
        Visualize original image and various heatmaps
        
        Parameters:
        - original_image: Original hyperspectral image
        - heatmaps: List of generated heatmaps
        - titles: List of titles for each heatmap
        """
        n_plots = len(heatmaps) + 1
        plt.figure(figsize=(4*n_plots, 4))
        
        # Display original image (average intensity)
        plt.subplot(1, n_plots, 1)
        plt.title("Original Image (Avg. Intensity)")
        plt.imshow(np.mean(original_image, axis=2), cmap='gray')
        plt.axis('off')
        
        # Display heatmaps
        for i, (heatmap, title) in enumerate(zip(heatmaps, titles)):
            plt.subplot(1, n_plots, i+2)
            plt.title(title)
            
            # Check dimensions of heatmap
            if len(heatmap.shape) == 2:
                plt.imshow(heatmap, cmap='jet')
            else:
                plt.imshow(heatmap)
                
            plt.axis('off')
            
        plt.tight_layout()
        plt.show()
        
    def save_heatmaps(self, output_dir, heatmaps, names):
        """
        Save generated heatmaps to disk
        
        Parameters:
        - output_dir: Directory to save heatmaps
        - heatmaps: List of generated heatmaps
        - names: List of filenames for each heatmap
        """
        os.makedirs(output_dir, exist_ok=True)
        
        for heatmap, name in zip(heatmaps, names):
            output_path = os.path.join(output_dir, name)
            
            # Normalize to 0-255 range for saving
            if len(heatmap.shape) == 2:
                # For 2D heatmaps, apply colormap
                colored_heatmap = plt.cm.jet(heatmap)
                heatmap_to_save = (colored_heatmap[:, :, :3] * 255).astype(np.uint8)
            else:
                # For RGB heatmaps
                heatmap_to_save = (heatmap * 255).astype(np.uint8)
                
            # Save using matplotlib (supports various formats)
            plt.imsave(output_path, heatmap_to_save)
            print(f"Saved heatmap to {output_path}")

def main():
    # Initialize heatmap generator
    heatmap_gen = HyperspectralHeatmapGenerator()
    
    # Load hyperspectral image
    # Replace with your hyperspectral image path
    image_path = "C:\\Users\\admin\\Desktop\\CYI\\datasets\\ThirdCampaign\\050-01\\050-01\\image.jpg"
    try:
        hyperspectral_image = heatmap_gen.load_hyperspectral_image(image_path)
    except FileNotFoundError:
        # For demonstration, generate synthetic hyperspectral data
        print("Sample file not found, generating synthetic data for demonstration...")
        # Create synthetic data (3 bands for demonstration)
        hyperspectral_image = np.random.rand(256, 256, 10)
        
        # Add some structure
        x, y = np.mgrid[0:256, 0:256]
        center_x, center_y = 128, 128
        radius = np.sqrt((x - center_x)**2 + (y - center_y)**2)
        
        # Add "tumor-like" structure
        hyperspectral_image[:, :, 0] = np.exp(-(radius - 50)**2 / 1000)
        # Add "vessel-like" structures
        hyperspectral_image[:, :, 1] = np.sin(x/10) * np.cos(y/10)
        hyperspectral_image[:, :, 2] = np.exp(-(radius - 80)**2 / 2000)
    
    # Normalize the data
    normalized_image = heatmap_gen.normalize_hyperspectral_data(hyperspectral_image)
    
    # Generate different types of heatmaps
    spectral_heatmap = heatmap_gen.create_spectral_heatmap(normalized_image)
    
    # Try to create spectral index map
    try:
        spectral_index_map = heatmap_gen.create_spectral_index_heatmap(normalized_image, 'tumor')
    except ValueError:
        # Fallback for images with fewer bands
        print("Not enough spectral bands for index, using alternative approach...")
        # Use average of available bands
        spectral_index_map = np.mean(normalized_image, axis=2)
    
    # Generate tissue-specific heatmap
    tissue_heatmap = heatmap_gen.apply_tissue_specific_heatmap(normalized_image)
    
    # Visualize results
    heatmap_gen.visualize_heatmaps(
        normalized_image,
        [spectral_heatmap, spectral_index_map, tissue_heatmap],
        ["PCA Visualization", "Spectral Index", "Tissue-Specific"]
    )
    
    # Save results
    output_dir = "heatmap_results"
    heatmap_gen.save_heatmaps(
        output_dir,
        [spectral_heatmap, spectral_index_map, tissue_heatmap],
        ["pca_visualization.png", "spectral_index.png", "tissue_specific.png"]
    )

if __name__ == "__main__":
    main()
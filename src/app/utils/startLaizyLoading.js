import imageCompression from "browser-image-compression";

/**
 * Starts lazy loading of images using Intersection Observer.
 * 
 * @todo: Cache the compressed images to avoid re-compressing the same image.
 */
export default function startLaizyLoading() {
  // Create an Intersection Observer
  const imageLoader = new IntersectionObserver(async (entries, observer) => {
    // For each entry in the intersection observer
    for (const entry of entries) {
      // If the entry is intersecting
      if (entry.isIntersecting) {
        // Get the image element
        const $img = entry.target;
        const imgURL = $img.dataset.src;
  
        // Fetch the image file
        const response = await fetch(imgURL);
        const file = await response.blob();
  
        // Compress the image
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);
  
        // Create a URL for the compressed image file
        const compressedURL = URL.createObjectURL(compressedFile);
  
        // Set the src of the image element to the compressed image
        $img.src = compressedURL;
  
        observer.unobserve($img);
      }
    }
  });

  // Get all the images with data-src attribute
  const $lazyImages = document.querySelectorAll("img[data-src]");
  if ($lazyImages.length) {
    // Observe each image
    $lazyImages.forEach((img) => {
      imageLoader.observe(img);
    });
  }
}
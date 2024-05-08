import '../index.css';
import { ImageGalleryItem } from './ImageGalleryItem';
export const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(image => (
        <div key={image.id}>
          <ImageGalleryItem image={image} />
        </div>
      ))}
    </ul>
  );
};

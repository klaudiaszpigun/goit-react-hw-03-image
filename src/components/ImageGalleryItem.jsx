import '../index.css';
export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(image => (
    <li key={image.id}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image)}
      />
    </li>
  ));
};

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

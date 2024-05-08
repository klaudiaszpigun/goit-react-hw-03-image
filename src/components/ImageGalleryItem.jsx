import { useState } from 'react';
import '../index.css';
import { Modal } from './Modal';
export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <li>
      <img src={image.webformatURL} alt="" onClick={handleClick} />
      {showModal ? <Modal imageUrl={image.largeImageUrl} /> : ''};
    </li>
  );
};

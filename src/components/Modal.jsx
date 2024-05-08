import { basicLightbox } from 'basiclightbox';
import { useEffect } from 'react';
import '../index.css';
export const Modal = ({ imageUrl }) => {
  useEffect(() => {
    const instance = basicLightbox.create(`
      <img src='${imageUrl}'/>
    `);
    instance.show();

    // Cleanup function to close the modal when the component unmounts
    return () => {
      instance.close();
    };
  }, [imageUrl]); // Re-run effect if imageUrl changes

  // Return null because this component doesn't render anything in the DOM directly
  return null;
};

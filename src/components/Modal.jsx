import { useEffect } from 'react';

export const Modal = ({ onClick, openModal }) => {
  //Close modal on Escape
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        onClick();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  //Close modal if clicked out of the image
  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  return (
    <div onClick={handleCloseModal}>
      <div>
        <img src={openModal} alt="" width="800" height="600" />
      </div>
    </div>
  );
};

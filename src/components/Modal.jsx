export const Modal = ({ imageUrl, onClose }) => {
  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleClose}>
      <div>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

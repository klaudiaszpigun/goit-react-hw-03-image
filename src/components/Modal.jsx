import { useEffect } from 'react';

export const Modal = ({ onClick, openModal }) => {
  // przy zmianie wartości stateu openModal
  useEffect(() => {
    // jeśli kod zdarzenia ma wartość 27 => escape to zamknij modal
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        onClick();
      }
    };
    // przy kliknięciu na escape wywołaj callback
    document.addEventListener('keydown', handleKeyDown);

    // czyszczenie useEffecta
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  // zamknięcie modalu jeśli kliknie się poza zdjęcie
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

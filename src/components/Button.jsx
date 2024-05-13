import '../index.css';
export const Button = ({ onClick, isDisabled }) => {
  return (
    <button className="button" onClick={onClick} disabled={isDisabled}>
      Load more
    </button>
  );
};

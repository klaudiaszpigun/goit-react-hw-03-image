import '../index.css';
export const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

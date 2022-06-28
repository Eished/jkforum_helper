import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      disabled={disabled}
      className={`mx-1 my-1 px-2 py-1 text-xs font-medium text-center text-white inline-block leading-tight uppercase rounded shadow-md ${
        disabled
          ? ' cursor-not-allowed bg-indigo-400 '
          : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      }`}
      onClick={onClick}>
      {text}
    </button>
  );
};

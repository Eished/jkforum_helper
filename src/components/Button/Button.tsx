import React from 'react';

// export const Button = () => {
//   return (
//     <button
//       type="submit"
//       className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//       Add to bag
//     </button>
//   );
// };

interface ButtonProps {
  text: string;
  onClick: () => void;
}
export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      className="mx-1 my-1 px-2 py-1 text-xs font-medium text-center text-white inline-block bg-indigo-600 leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}>
      {text}
    </button>
  );
};

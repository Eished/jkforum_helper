import React from 'react';

interface InputProps {
  text?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
}
export const Input: React.FC<InputProps> = ({ text, placeholder, onChange, value }) => {
  return (
    <>
      <label htmlFor={'input' + text} className="block m-1 text-xs font-medium text-gray-900 dark:text-gray-300">
        {text}
      </label>
      <input
        type="text"
        id={'input' + text}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="py-1 px-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </>
  );
};

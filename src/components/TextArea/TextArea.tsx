import React from 'react';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  rows?: number;
  cols?: number;
}
export const TextArea: React.FC<TextAreaProps> = ({ label, placeholder, onChange, value, rows = 3, cols }) => {
  return (
    <>
      <label htmlFor={'textarea' + label} className="block m-1 text-xs font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <textarea
        className="px-2 block w-full text-gray-900 bg-gray-50 rounded-lg border sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id={'textarea' + label}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}></textarea>
    </>
  );
};

import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  value: string;
  type?: string;
  autoComplete?: string;
}
export const Input: React.FC<InputProps> = ({ label, placeholder, autoComplete, value, type = 'text', ...args }) => {
  return (
    <>
      {label ? (
        <label htmlFor={'input' + label} className="block m-1 text-xs font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        {...args}
        autoComplete={autoComplete}
        type={type}
        id={label ? 'input' + label : ''}
        placeholder={placeholder}
        value={value}
        className="py-1 pl-2 block w-full text-gray-900 bg-gray-50 rounded-lg border sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
      />
    </>
  );
};

import React, { useEffect, useState } from 'react';

interface ToggleProps {
  label: string;
  onClick: (selected: boolean) => void;
  checked: boolean;
  mykey?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, mykey = '-', onClick }) => {
  const [selected, setSelected] = useState(checked);
  useEffect(() => {
    setSelected(checked);
  }, [checked]);

  return (
    <>
      <label
        key={label + mykey}
        htmlFor={'toggle-' + mykey + label}
        className="mx-1 my-1 flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          id={'toggle-' + mykey + label}
          className="sr-only"
          checked={selected}
          onClick={() => {
            onClick(!selected);
            setSelected(!selected);
          }}
          onChange={() => {
            return;
          }}
        />
        <div className="toggle-bg bg-gray-300 border-2 border-gray-200 h-4 w-7 rounded-full"></div>
        <span className="ml-1 text-gray-900 text-xs">{label}</span>
      </label>
    </>
  );
};

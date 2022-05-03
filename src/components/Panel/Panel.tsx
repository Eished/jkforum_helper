import React, { ReactElement } from 'react';

interface Panel {
  children: ReactElement[];
  title?: string;
}
export const Panel: React.FC<Panel> = ({ title, children }) => {
  return (
    <div className="border-b py-1">
      <p className="text-center mb-1 font-bold">{title}</p>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

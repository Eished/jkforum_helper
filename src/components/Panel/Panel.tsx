import React, { ReactNode } from 'react';

interface Panel {
  children: ReactNode;
  title?: string;
}
export const Panel: React.FC<Panel> = ({ title, children }) => {
  return (
    <div className="border-b py-1">
      <p className="text-center font-bold">{title}</p>
      <div className="flex flex-wrap">{children}</div>
    </div>
  );
};

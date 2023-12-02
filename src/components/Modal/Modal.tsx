import React, { FC, ReactElement, ReactNode } from 'react';

interface ModalProps {
  header: ReactElement;
  footer: ReactElement;
  isShow: boolean;
  children: ReactNode;
  width?: string;
  height?: string;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ header, footer, children, width, height, isShow = false, onClose }) => {
  if (!isShow) {
    return <></>;
  }
  return (
    <div className="fixed top-0 right-0 h-full w-full left-0 z-50 overflow-y-auto overflow-x-hidden items-center justify-center flex bg-gray-900 bg-opacity-50">
      <div className={`relative rounded-lg bg-white shadow m-4 flex flex-col ${width} ${height}`}>
        <div className="flex items-start justify-between rounded-t  border-gray-300 border-solid border-0 border-b p-5">
          <h3 className="text-xl font-medium text-gray-900 ">{header}</h3>
          <button
            aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
            type="button"
            onClick={onClose}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 h-full overflow-auto">{children}</div>
        <div className="flex items-center rounded-b p-6 border-gray-300 border-solid border-0 border-t">{footer}</div>
      </div>
    </div>
  );
};

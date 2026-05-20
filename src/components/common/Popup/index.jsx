import React from "react";

const Popup = ({ message, onClose, onConfirm }) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50 max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-lg bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-xl text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-fg-disabled w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 className="mb-6 text-lg">{message}</h3>

            <div className="flex items-center space-x-4 justify-center">
              <button
                type="button"
                className="cursor-pointer text-white bg-red-500 box-border border border-transparent hover:bg-red-700 focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
                onClick={onConfirm}
              >
                Yes, I'm sure
              </button>

              <button
                type="button"
                className="cursor-pointer font-lg box-border border border-gray-400 hover:bg-gray-200 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
                data-modal-hide="popup-modal"
                onClick={onClose}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

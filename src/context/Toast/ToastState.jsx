import React, { useState } from "react";
import ToastContext from "./ToastContext";
import { Toast } from "../../components/common";

const ToastState = (props) => {
  const [toasts, setToasts] = useState([]);
  const showToast = (message, icon) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, icon }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 3000);
  };
  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {props.children}
      {toasts && (
        <div className="fixed top-5 left-0 right-0 flex flex-col items-center gap-2 z-50 md:items-end md:right-5">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              message={t.message}
              icon={t.icon}
              onClose={() =>
                setToasts((prev) => prev.filter((item) => item.id !== t.id))
              }
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastState;

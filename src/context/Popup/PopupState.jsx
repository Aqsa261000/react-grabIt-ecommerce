import React, { useState } from "react";
import PopupContext from "./PopupContext";
import { Popup } from "../../components/common";

const PopupState = (props) => {
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);

  const showPopup = (message, onConfirmHandler) => {
    setPopup(true);
    setOnConfirm(() => onConfirmHandler);
    setPopupMessage(message);
  };
  return (
    <PopupContext.Provider value={{ showPopup }}>
      {props.children}
      {popup && (
        <Popup
          message={popupMessage}
          onClose={() => setPopup(false)}
          onConfirm={() => {
            if (onConfirm) {
              onConfirm();
            }
            setPopup(false);
          }}
        />
      )}
    </PopupContext.Provider>
  );
};

export default PopupState;

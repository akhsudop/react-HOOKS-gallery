import { useEffect } from "react";
import PropTypes from "prop-types";

import css from "../Modal/Modal.module.css";

export const MyModal = ({ onClose, clickedImg }) => {
  useEffect(() => {
    const closeByKey = (evt) => {
      if (evt.key === "Escape") {
        return onClose();
      }
    };

    window.addEventListener("keydown", closeByKey);

    return () => {
      window.removeEventListener("keydown", closeByKey);
    };
  }, []);

  const handleClose = (evt) => {
    if (evt.target.nodeName === "DIV") {
      return onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img
          src={clickedImg}
          alt="Large gallery image"
          loading="lazyload"
          width="850"
        />
      </div>
    </div>
  );
};

MyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  clickedImg: PropTypes.string.isRequired,
};

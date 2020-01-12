import ReactDOM from "react-dom";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./Tooltip.module.scss";

function Tooltip({ render, closeTooltip, triggerDimensions, className }) {
  const layoutRef = document.getElementById("tooltips-layout");
  const el = document.createElement("div");

  const ref = useRef(null);

  const handleOutsideClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeTooltip();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    layoutRef.appendChild(el);

    return () => {
      layoutRef.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={cx(styles["custom-tooltip__content"], className)}
      style={{
        left: triggerDimensions.left,
        top: triggerDimensions.top + triggerDimensions.height
      }}
    >
      {render()}
    </div>,
    el
  );
}

Tooltip.propTypes = {
  render: PropTypes.func.isRequired
};

export default Tooltip;

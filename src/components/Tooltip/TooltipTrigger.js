import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import TooltipContent from "./Tooltip";

import styles from "./Tooltip.module.scss";

function TooltipTrigger({
  children,
  on,
  defaultVisibility,
  render,
  classNames
}) {
  const [visible, setVisible] = useState(defaultVisibility);
  const [dimensions, setDimensions] = useState(null);
  const triggerEl = useRef(null);

  const toggleVisibillity = forceVisibillity => {
    const nextVisibillity =
      typeof forceVisibillity === "boolean" ? forceVisibillity : !visible;

    if (on === "click") {
      setDimensions(triggerEl.current.getBoundingClientRect());
      /*if (nextVisibillity)
        document.addEventListener("click", handleOutsideClick);
      else document.removeEventListener("click", handleOutsideClick);*/
    }

    setVisible(nextVisibillity);
  };

  const onClick = () => {
    if (on !== "click") return;

    toggleVisibillity();
  };

  const onEnter = () => {};

  const onLeave = () => {};

  return (
    <div className={cx("custom-tooltip", classNames.trigger)}>
      <div
        ref={triggerEl}
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={styles["custom-tooltip__trigger"]}
      >
        {children}
      </div>
      {visible && (
        <TooltipContent
          render={render}
          triggerDimensions={dimensions}
          className={classNames.content}
          closeTooltip={() => toggleVisibillity(false)}
        />
      )}
    </div>
  );
}

TooltipTrigger.propTypes = {
  on: PropTypes.oneOf(["hover", "click"]),
  defaultVisibility: PropTypes.bool,
  render: PropTypes.func.isRequired
};

TooltipTrigger.defaultProps = {
  on: "click",
  defaultVisibility: false
};

export default TooltipTrigger;

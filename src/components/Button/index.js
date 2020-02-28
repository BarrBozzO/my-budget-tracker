import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Button as BootstrapButton } from "react-bootstrap";

import styles from "./Button.module.scss";

function Button({ className, flat, secondary, link, children, ...props }) {
  const buttonClassName = cx(styles["primary-button"], className, {
    [styles["primary-button--flat"]]: flat,
    [styles["primary-button--secondary"]]: secondary,
    [styles["primary-button--link"]]: link
  });

  return (
    <BootstrapButton className={buttonClassName} {...props}>
      {children}
    </BootstrapButton>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  flat: PropTypes.bool,
  secondary: PropTypes.bool
};

Button.defaultProps = {
  className: "",
  flat: false,
  secondary: false
};

export default Button;

import React, { useState, useEffect } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import styles from "./Icon.module.scss";

function Icon({ name, className }) {
  const [icon, setIcon] = useState(null);

  async function getIcon() {
    try {
      const { default: importedIcon } = await import(
        `assets/icons/${name}.svg`
      );
      setIcon(importedIcon);
    } catch (e) {
      console.error("Unable to import icon");
    }
  }

  useEffect(() => {
    if (name) getIcon();
  }, [name]);

  if (icon) {
    return (
      <div className={cx(styles["icon"], className)}>
        <svg
          viewBox={icon.viewBox}
          dangerouslySetInnerHTML={{
            __html: `<use xlink:href="#${icon.id}"></use>`
          }}
        ></svg>
      </div>
    );
  }

  return null;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;

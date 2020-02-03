import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function AccountsControlsBar({ onCreate }) {
  return (
    <div>
      <Button onClick={onCreate}>create</Button>
    </div>
  );
}

AccountsControlsBar.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default AccountsControlsBar;
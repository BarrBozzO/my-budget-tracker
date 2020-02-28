import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import cx from "classnames";

import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <Nav className={cx(styles.sidebar, "flex-column")} activeKey="home">
      <Nav.Item className={styles.sidebar__brand}>
        <span>My Budget Tracker</span>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard">
          <Nav.Link eventKey="home" className={cx(styles.sidebar__item)}>
            Home
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard/accounts">
          <Nav.Link eventKey="accounts" className={cx(styles.sidebar__item)}>
            Accounts
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard/budgets">
          <Nav.Link eventKey="budgets" className={cx(styles.sidebar__item)}>
            Budgets
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard/bills">
          <Nav.Link eventKey="bills" className={cx(styles.sidebar__item)}>
            Bills
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}

export default Sidebar;

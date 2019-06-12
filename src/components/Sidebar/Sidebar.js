import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classNames from "classnames";

import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <Nav className={classNames(styles.sidebar, "flex-column")} activeKey="home">
      <Nav.Item className={classNames(styles.sidebar__brand, "mx-3", "mb-2")}>
        <span>My Budget Tracker</span>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard">
          <Nav.Link
            eventKey="home"
            className={classNames(styles.sidebar__item)}
          >
            Home
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard/accounts">
          <Nav.Link
            eventKey="accounts"
            className={classNames(styles.sidebar__item)}
          >
            Accounts
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard/budgets">
          <Nav.Link
            eventKey="budgets"
            className={classNames(styles.sidebar__item)}
          >
            Budgets
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/dashboard/bills">
          <Nav.Link
            eventKey="bills"
            className={classNames(styles.sidebar__item)}
          >
            Bills
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}

export default Sidebar;

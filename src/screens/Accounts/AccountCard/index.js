import React from "react";
import { Button } from "react-bootstrap";

import styles from "./AccountCard.module.scss";

function AccountCard({ data, statuses, currencies, onEdit }) {
  const { name, description, currencyId, statusId } = data;
  const currency =
    currencies.find(currency => currency.id === currencyId) || {};
  const status = statuses.find(status => status.id === statusId) || {};

  return (
    <div className="col-lg-4 col-md-6 col-sm-12" key={data.id}>
      <div className={styles.accounts__card}>
        <div className={styles["accounts__card-title"]}>{name}</div>
        <div className={styles["accounts__card-content"]}>{description}</div>
        <div>{currency.name}</div>
        <div>{status.value}</div>
        <div>
          <Button onClick={() => onEdit(data)}>Edit</Button>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;

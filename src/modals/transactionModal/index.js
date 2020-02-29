import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, ErrorMessage } from "formik";
import { Modal, Form } from "react-bootstrap";
import { Button } from "components";
import { transactionTypes as TRANSACTION_TYPES } from "constants";
import { capitalize } from "utils";
import { transactionCredit, transactionDebit } from "store/actions/transaction";

function TransactionModal({
  data,
  handleClose,
  handleLoading,
  transactionCredit,
  transactionDebit
}) {
  const { title, transaction, accountId } = data;

  const onSubmit = async (values, { setSubmitting }) => {
    const action =
      values.type === "credit" ? transactionCredit : transactionDebit;

    handleLoading(true);
    setSubmitting(true);
    try {
      const response = await action({ ...values, accountId });
      handleClose(response);
    } catch (e) {
      console.warn("shit, here we go again");
      setSubmitting(false);
    }
    handleLoading(false);
  };

  const renderForm = ({ isSubmitting, values, handleSubmit, handleChange }) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Row>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={values.name}
              onChange={handleChange}
            />
            <ErrorMessage name="name" component="div" />
          </Form.Row>
          <Form.Row>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={values.description}
              onChange={handleChange}
            />
            <ErrorMessage name="description" component="div" />
          </Form.Row>
          <Form.Row>
            <Form.Label>Sum</Form.Label>
            <Form.Control
              type="number"
              name="value"
              min="0"
              max="9999999"
              step="0.01"
              inputMode="decimal"
              defaultValue={values.value}
              onChange={handleChange}
            />
            <ErrorMessage name="value" component="div" />
          </Form.Row>
          <Form.Row>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              defaultValue={values.type}
              onChange={handleChange}
            >
              <option>Select type</option>
              {TRANSACTION_TYPES.map(t => (
                <option value={t.name} key={t.name}>
                  {capitalize(t.name)}
                </option>
              ))}
            </Form.Control>
            <ErrorMessage name="type" component="div" />
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            secondary
            onClick={handleClose}
            // disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    );
  };

  const validate = values => {
    let errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (typeof values.value === "undefined") {
      errors.value = "Sum is required";
    } else if (isNaN(values.value)) {
      errors.value = "Sum should be a number";
    } else if (values.value < 0 || values.value > 9999999) {
      errors.value = "Sum should be between 0 and  9999999";
    }

    if (!values.type) {
      errors.type = "Type is required";
    }

    return errors;
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={transaction}
        validate={validate}
        onSubmit={onSubmit}
        children={renderForm}
      />
    </React.Fragment>
  );
}

TransactionModal.propTypes = {
  data: PropTypes.object
};

TransactionModal.defaultProps = {
  data: {}
};

const mapDispatchToProps = {
  transactionCredit,
  transactionDebit
};

export default connect(null, mapDispatchToProps)(TransactionModal);

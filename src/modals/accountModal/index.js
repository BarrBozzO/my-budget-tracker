import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, ErrorMessage } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import { addAccount, updateAccount } from "store/actions/account";

function AccountModal({
  data,
  handleClose,
  currencies,
  statuses,
  addAccount,
  updateAccount
}) {
  const { title, account, edit } = data;

  const onSubmit = async (values, actions) => {
    const action = edit ? updateAccount : addAccount;

    try {
      await action(values);
      handleClose();
    } catch (e) {
      console.warn("shit, here we go again");
    }
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
              value={values.name}
              onChange={handleChange}
            />
            <ErrorMessage name="name" component="div" />
          </Form.Row>
          <Form.Row>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
            <ErrorMessage name="description" component="div" />
          </Form.Row>
          <Form.Row>
            <Form.Label>Currency</Form.Label>
            <Form.Control
              as="select"
              name="currencyId"
              value={values.currencyId}
              onChange={handleChange}
            >
              <option value="">Select currency</option>
              {currencies.map(currency => (
                <option value={currency.id}>{currency.isoCode}</option>
              ))}
            </Form.Control>
            <ErrorMessage name="currencyId" component="div" />
          </Form.Row>
          <Form.Row>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="statusId"
              value={values.statusId}
              onChange={handleChange}
            >
              {statuses.map(status => (
                <option value={status.id}>{status.value}</option>
              ))}
            </Form.Control>
            <ErrorMessage name="statusId" component="div" />
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

    if (!values.description) {
      errors.description = "Description is required";
    }

    if (!values.name) {
      errors.name = "Name is required";
    }

    return errors;
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={account}
        validate={validate}
        onSubmit={onSubmit}
        render={renderForm}
      />
    </React.Fragment>
  );
}

AccountModal.propTypes = {
  data: PropTypes.object,
  currencies: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired
};

AccountModal.defaultProps = {
  data: {},
  currencies: [],
  statuses: []
};

const mapStateToProps = state => ({
  currencies: state.currencies.data,
  statuses: state.statuses.data
});

const mapDispatchToProps = {
  addAccount,
  updateAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal);

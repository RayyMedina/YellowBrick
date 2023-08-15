import { React, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import toastr from "toastr";
import incomeSchemas from "schemas/incomeSchema";
import debug from "debug";
import clientIncomeService from "services/clientIncomeService";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

const ClientIncome = (props) => {
  const [toggle, setToggle] = useState(false);

  const defaultIncome = {
    additionalIncomeTypeId: "",
    amount: "",
  };

  const formData = {
    clientId: props.clientId,    
    // clientId: 9,

    annualIncome: "",
    bonus: "",
    taxRefund: "",
    commissions: "",

    spouseAnnualIncome: "",
    spouseBonus: "",
    spouseTaxRefund: "",
    spouseCommissions: "",

    hasAdditionalIncome: false,
    addIncome: [defaultIncome],
  };

  const _logger = debug.extend("ClientIncome");
  _logger("logger");

  const onFormSubmit = (payload) => {
    payload.bonus = payload.bonus || null;
    payload.taxRefund = payload.taxRefund || null;
    payload.commissions = payload.commissions || null;

    payload.spouseAnnualIncome = payload.spouseAnnualIncome || null;
    payload.spouseBonus = payload.spouseBonus || null;
    payload.spouseTaxRefund = payload.spouseTaxRefund || null;
    payload.spouseCommissions = payload.spouseCommissions || null;

    if (!toggle) {
      payload.hasAdditionalIncome = false;
      payload.addIncome = null;
    } else {
      payload.hasAdditionalIncome = true;
      payload.addIncome = payload.addIncome ? payload.addIncome : null;
    }

    _logger("Button working!", payload);

    clientIncomeService
      .createIncome(payload)
      .then(onSubmitSuccess)
      .catch(onSubmitError);
  };

  const onSubmitSuccess = (res) => {
    toastr.success("Income Information Completed");
    _logger(res);
    props.onNext();
  };

  const onSubmitError = (err) => {
    // toastr.error("Error form not submitted");
    _logger(err);
  };

  const handleSpouseToggle = () => {
    setToggle((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="py-6">
      <div className="card  p-3 mb-5 shadow-lg bg-white rounded col-11">
        <div className="card-header">
          <h1>Income Information</h1>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={formData}
          validationSchema={incomeSchemas}
          onSubmit={onFormSubmit}
        >
          {({ values }) => (
            <Form className="bg-gradient bg-white bg-gradient ">
              <div className="row">
                <div className="p-4 active show table-responsive bg-white">
                  <Table responsive bordered className="text-nowrap mt-4">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col" className="border border-secondary">
                          Annual Income
                        </th>
                        <th scope="col" className="border border-secondary">
                          Bonus
                        </th>
                        <th scope="col" className="border border-secondary">
                          Tax Refund
                        </th>
                        <th scope="col" className="border border-secondary">
                          Commissions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Annual Income"
                            className="form-control"
                            name="annualIncome"
                          />
                          <ErrorMessage
                            name="annualIncome"
                            html="annualIncome"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Bonus"
                            className="form-control"
                            name="bonus"
                          />
                          <ErrorMessage
                            name="bonus"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Tax Refund"
                            className="form-control"
                            name="taxRefund"
                          />
                          <ErrorMessage
                            name="taxRefund"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Commissions"
                            className="form-control"
                            name="commissions"
                          />
                          <ErrorMessage
                            name="commissions"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                      </tr>
                    </tbody>

                    <thead className="table-primary">
                      <tr>
                        <th scope="col" className="border border-secondary">
                          Spouses Annual Income
                        </th>
                        <th scope="col" className="border border-secondary">
                          Spouses Bonus
                        </th>
                        <th scope="col" className="border border-secondary">
                          Spouses Tax Refund
                        </th>
                        <th scope="col" className="border border-secondary">
                          Spouses Commissions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Spouses Annual Income"
                            className="form-control"
                            name="spouseAnnualIncome"
                          />
                          <ErrorMessage
                            name="spouseAnnualIncome"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Spouses Bonus"
                            className="form-control"
                            name="spouseBonus"
                          />
                          <ErrorMessage
                            name="spouseBonus"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Spouses Tax Refund"
                            className="form-control"
                            name="spouseTaxRefund"
                          />
                          <ErrorMessage
                            name="spouseTaxRefund"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>

                        <td className="p-1 border border-secondary">
                          <Field
                            placeholder="Spouses Commissions"
                            className="form-control"
                            name="spouseCommissions"
                          />
                          <ErrorMessage
                            name="spouseCommissions"
                            component="div"
                            className="has-error text-danger"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <div className="col text-dark">
                    <label className="form-check-label">
                      Additional Income? &nbsp;
                      <input
                        className="form-check-input border-secondary"
                        type="checkbox"
                        name="hasAdditionalIncome"
                        value={toggle}
                        onChange={handleSpouseToggle}
                      />
                    </label>
                  </div>
                  {toggle && (
                    <FieldArray name="addIncome">
                      {({ remove, push }) => {
                        return (
                          <>
                            <div className="row">
                              <Table responsive className="text-nowrap mt-3">
                                <thead className="table-primary">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="border border-secondary"
                                    >
                                      <strong>#</strong>
                                    </th>
                                    <th
                                      scope="col"
                                      className="border border-secondary"
                                    >
                                      Income Type
                                    </th>
                                    <th
                                      scope="col"
                                      className="border border-secondary"
                                    >
                                      Amount
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {values.addIncome.map((row, index) => (
                                    <tr key={index}>
                                      <th
                                        className="table-primary border border-secondary"
                                        scope="row"
                                      >
                                        {index + 1}
                                      </th>
                                      <td className="p-1 border border-secondary">
                                        <Field
                                          as="select"
                                          type="number"
                                          name={`addIncome.${index}.additionalIncomeTypeId`}
                                          className={`form-select w-100 ps-3 py-2 text-dark ${
                                            values.addIncome[index]
                                              .additionalIncomeTypeId
                                              ? "text-dark"
                                              : ""
                                          }`}
                                        >
                                          <option
                                            className="form-control  ps-3 py-2"
                                            value=""
                                          >
                                            Select...
                                          </option>
                                          <option value="1">
                                            Interest on Investments or Dividends
                                          </option>
                                          <option value="2">Real Estate</option>
                                          <option value="3">
                                            Social Security
                                          </option>
                                          <option value="4">Business</option>
                                          <option value="5">Other</option>
                                        </Field>
                                      </td>
                                      <td className="p-1 border border-secondary">
                                        <Field
                                          name={`addIncome[${index}].amount`}
                                          className="form-control w-100 ps-3 py-2"
                                          placeholder="Income Amount"
                                        />
                                        <ErrorMessage
                                          name={`addIncome[${index}].amount`}
                                          component="div"
                                          className="has-error text-danger"
                                        />
                                      </td>
                                      <td className="p-0 align-middle bg-transparent">
                                        <button
                                          type="button"
                                          className="btn btn-sm"
                                          onClick={() => push(defaultIncome)}
                                        >
                                          <i className="fa fa-plus" />
                                        </button>
                                       
                                        
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className="bg-white border-0"
                                            onClick={() => remove(index)}
                                          >
                                            <i
                                              className="p-0 fe fe-trash-2 dropdown-item-icon"
                                              style={{
                                                fontSize: "1rem",
                                              }}
                                            />
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </>
                        );
                      }}
                    </FieldArray>
                  )}
                </div>
              </div>

              {!props.isInStepper && (
                <button
                  type="submit"
                  className="btn btn-primary float-end mt-3"
                >
                  Submit
                </button>
              )}
              {props.isInStepper && (
                <>
                  <button
                    type="submit"
                    onClick={props.onBack}
                    className="btn btn-secondary me-3 mt-3"
                  >
                    {props.backLabel}
                  </button>
                  <button type="submit" className="btn btn-primary mt-3">
                    {props.nextLabel}
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

ClientIncome.propTypes = {
  clientId: PropTypes.number,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  isInStepper: PropTypes.bool,
  initialIncome: PropTypes.shape({
    clientId: PropTypes.number,

    annualIncome: PropTypes.string,
    bonus: PropTypes.string,
    taxRefund: PropTypes.string,
    commissions: PropTypes.string,

    spouseAnnualIncome: PropTypes.string,
    spouseBonus: PropTypes.string,
    spouseTaxRefund: PropTypes.string,
    spouseCommissions: PropTypes.string,
    hasAdditionalIncome: PropTypes.bool,
  }),
};

export default ClientIncome;

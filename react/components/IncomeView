import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clientIncomeService from "services/clientIncomeService";
import debug from "debug";
import { Table } from "react-bootstrap";
import commonFormater from "utils/commonFormater";
import { FaEdit } from "react-icons/fa";

const _logger = debug.extend("IncomeView");

const IncomeView = ({ id }) => {
  const [incomes, setIncomes] = useState({
    data: [],
    dataComp: [],
    additionalIncome: 0,
    totalIncome: 0,
  });

  useEffect(() => {
    clientIncomeService.GetById(id).then(onIncomeSuccess).catch(onError);
  }, [id]);

  const onIncomeSuccess = (response) => {
    _logger(response, "Success Response");

    const totalAdditionalIncome = response.item.addIncome?response.item.addIncome.reduce(
      (total, income) => total + income.amount,
      0
    ):0;

    const annualIncome = response.item.annualIncome || 0;
    const bonus = response.item.bonus || 0;
    const taxRefund = response.item.taxRefund || 0;
    const commissions = response.item.commissions || 0;
    const spouseAnnualIncome = response.item.spouseAnnualIncome || 0;
    const spouseBonus = response.item.spouseBonus || 0;
    const spouseTaxRefund = response.item.spouseTaxRefund || 0;
    const spouseCommissions = response.item.spouseCommissions || 0;

    const totalIncome =
      totalAdditionalIncome +
      annualIncome +
      bonus +
      taxRefund +
      commissions +
      spouseAnnualIncome +
      spouseBonus +
      spouseTaxRefund +
      spouseCommissions;
      
    setIncomes({
      ...response.item,
      annualIncome,
      bonus,
      taxRefund,
      commissions,
      spouseAnnualIncome,
      spouseBonus,
      spouseTaxRefund,
      spouseCommissions,
      totalAdditionalIncome,
      totalIncome,
    });
  };

  const onError = (error) => {
    _logger(error, "Error Response");
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between">
        <div className="col-auto">
          <h3 className="mb-1 ms-3 fw-bold pt-3 pb-2">Income Information</h3>
        </div>
        <div className="col d-flex align-items-center float-end">
            <FaEdit
              className="h3 m-0 ms-3"
              cursor={"pointer"}
            />
        </div>
        </div>
        <div className="col-sm">
          <div className="py-1 mt-2 ms-4">
            <span>Annual Income:</span>
            <span className="text-dark ps-2">
              {commonFormater.formatUsd(incomes.annualIncome || "N/A")}
            </span>
          </div>
          <div className="py-1 ms-4">
            <span>Bonus:</span>
            <span className="text-dark ps-2">
              {commonFormater.formatUsd(incomes.bonus || "N/A")}
            </span>
          </div>
          <div className="py-1 ms-4">
            <span>Tax Refund:</span>
            <span className="text-dark ps-2 ">
              {commonFormater.formatUsd(incomes.taxRefund || "N/A")}
            </span>
          </div>
          <div className=" py-1 ms-4">
            <span>Commissions: </span>
            <span  className="text-dark ps-1"> {commonFormater.formatUsd(incomes.commissions || "N/A")} </span>
          </div>
          <div className="py-1 ms-4">
            <span >Spouse Annual Income:</span>
            <span className="text-dark ps-2">
              {commonFormater.formatUsd(incomes.spouseAnnualIncome || "N/A")}
            </span>
          </div>

          <div className="py-1 ms-4">
            <span>Spouses Bonus:</span>
            <span className="text-dark ps-2">
              {commonFormater.formatUsd(incomes.spouseBonus || "N/A")}
            </span>
          </div>

          <div className="py-1 ms-4">
            <span>SpousesTax Refund:</span>
            <span className="text-dark ps-2">
              {commonFormater.formatUsd(incomes.spouseTaxRefund || "N/A")}
            </span>
          </div>
          <div className="py-1 ms-4">
            <span>SpousesTax Refund:</span>
            <span className="text-dark ps-2">
              {commonFormater.formatUsd(incomes.spouseCommissions || "N/A")}
            </span>
          </div>
          <div className="py-1 mb-4 ms-4">
            <span>Does Client Have Additional Income?</span>
            <span className="text-dark ps-2">
              {incomes.hasAdditionalIncome ? "Yes" : "No"}
            </span>
          </div>

        </div>
        <div className="col">
            <div className="py-1 d-flex justify-content-end pe-5 pt-2">
              <h3 className="text-secondary pe-1">Total Income:</h3>
              <span className="text-dark ps-1 h3">
                {incomes.totalIncome !== null &&
                incomes.totalIncome !== undefined
                  ? commonFormater.formatUsd(incomes.totalIncome)
                  : "N/A"}
              </span>
            </div>
          </div>
      </div>
      <div className="container-fluid bg-white px-4">
        <div className="row">
          <Table
            responsive
            bordered
            hover
            className="text-wrap text-center"
          >
            <thead className="table-primary">
              <tr className="table-primary">
                <th
                  scope="col"
                  className="table-primary col-1"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="col-5"
                >
                  Additional Income Types
                </th>
                <th
                  scope="col"
                  className="col-5"
                >
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="table-primary">
              {incomes.addIncome?.map((addIncome, index) => (
                <tr
                  className="table-light"
                  key={index}
                >
                  <td
                    scope="table primary col"
                    style={{ width: "20px" }}
                  >
                    {index + 1}
                  </td>
                  <td className="">{addIncome.additionalIncomeType.name}</td>
                  <td className="">
                    {commonFormater.formatUsd(addIncome.amount)}
                  </td>
                </tr>
              ))}
              <tr className="border-light table-light">
                <td
                  colSpan={2}
                  className="border-light table-light text-end"
                >
                  Total:
                </td>
                <td className="border-light table-light ">
                  {commonFormater.formatUsd(incomes.totalAdditionalIncome)}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

IncomeView.propTypes = {
  id: PropTypes.string.isRequired,
};

export default IncomeView;

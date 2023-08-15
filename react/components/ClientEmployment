import React, { useState, useEffect } from "react";
import debug from "debug";
import PropTypes from "prop-types";
import clientEmploymentService from "services/clientEmploymentService";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const _logger = debug.extend("EmploymentSummery");

function EmploymentView({ id }) {
  const [employment, setEmployment] = useState({
    clientOccupation: "",
    data: [],
    dataComp: [],
  });

  useEffect(() => {
    clientEmploymentService
      .GetById(id)
      .then(onEmploymentSuccess)
      .catch(onError);
  }, [id]);

  const onEmploymentSuccess = (response) => {
    setEmployment((prevState) => {
      const prev = { ...prevState };
      prev.data = [response.item];
      prev.dataComp = prev.data.map(arrayOfDataMapper);
      prev.clientOccupation = response.item.clientOccupation; 
      prev.isSelfEmployed = response.item.isSelfEmployed; 
      prev.jobTitle = response.item.jobTitle; 
      prev.yearsEmployed = response.item.yearsEmployed; 
      prev.employer = response.item.employer; 
      _logger(prev.data, prev.dataComp);
      return prev;
    });
  };

  const onError = (error) => {
    _logger(error, "Error Response");
  };

  const arrayOfDataMapper = (data) => {
    const dataEmployment = {
      clientOccupation: data.clientOccupation || null,
      isSelfEmployed: data.isSelfEmployed === true ? "Yes" : "No",
      employer: data.employer || null,
      jobTitle: data.jobTitle || null,
      yearsEmployed: data.yearsEmployed || null,
      isSpouseSelfEmployed: data.isSpouseSelfEmployed === true ? "Yes" : "No" ,
      spouseOccupation: data.spouseOccupation || null,
      spouseEmployer: data.spouseEmployer || null,
      spouseYearsEmployed: data.spouseYearsEmployed || null,
    };
    return dataEmployment;
  };

  const mapEmployment = (values, index) => {
    return (
      <tr key={`Div_${index}`}>
        <td>1</td>
        <td>{values.isSpouseSelfEmployed || "N/A"}</td>
        <td>{values.spouseOccupation || "N/A"}</td>
        <td>{values.spouseEmployer || "N/A"}</td>
        <td>{values.spouseYearsEmployed || "N/A"}</td>
      </tr>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between">
      <div className="col-auto">
          <h3 className="mb-1 ms-3 fw-bold pt-3 pb-2">Employment Information</h3>
        </div>
        <div className="col d-flex align-items-center float-end">
            <FaEdit
              className="h3 m-0 ms-3"
              cursor={"pointer"}
            />
        </div>

      </div>

      <div className="col">
        <div className="card-body py-0">
          <div className="py-1 mt-2">
            <span>Occupation:</span>
            <span className="text-dark ps-2">
              {employment?.clientOccupation || "N/A"}
            </span>
          </div>
          <div className="py-1">
            <span>Is Client Self Employed?:</span>
            <span className="text-dark ps-2">
              {employment?.isSelfEmployed === true ? "Yes" : "No"}
            </span>
          </div>          
          <div className="py-1">
            <span>Clients Employer:</span>
            <span className="text-dark ps-2">
              {employment?.employer || "N/A"}
            </span>
          </div>          
          <div className="py-1">
            <span>Clients Job Title:</span>
            <span className="text-dark ps-2">
              {employment?.jobTitle || "N/A"}
            </span>
          </div>          
          <div className="py-1 mb-1">
            <span>Years Employed:</span>
            <span className="text-dark ps-2">
              {employment?.yearsEmployed || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-white px-4 py-3">
        <div className="row">
          <div className="row d-flex align-items-center text-nowrap">
            <Table
              responsive
              bordered
              hover
              className="text-wrap text-center"
            >
              <thead className="table-primary">
                <tr className="align-middle">
                  <th
                    scope="col"
                    style={{ width: "15px" }}
                  >
                    #
                  </th>
                  <th scope="col">Is Spouse Self Employed?</th>
                  <th scope="col">Spouses Occupation?</th>
                  <th scope="col">Spouses Employer</th>
                  <th scope="col">Spouses Years Employed?</th>
                </tr>
              </thead>
              <tbody className="table-light align-middle text-nowrap">
                {employment.dataComp.map(mapEmployment)}
              </tbody>
            </Table>
          </div>
        </div>
    </div>
    </>
  );
}

EmploymentView.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EmploymentView;

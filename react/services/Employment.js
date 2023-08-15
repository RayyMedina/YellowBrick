import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}`;

const createEmployment = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/api/clients/employment`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};


const GetById = (id) => {

  const config = {
    method: "GET",
    url: `${endpoint}/api/clients/employment/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateEmployment = (payload,id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/api/clients/employment/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};


const clientEmploymentService = { createEmployment, GetById, updateEmployment };

export default clientEmploymentService;

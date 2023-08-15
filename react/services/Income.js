import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}`;

const createIncome = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/api/clients/income`,
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
    url: `${endpoint}/api/clients/income/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);

};

const clientIncomeService = { createIncome, GetById };

export default clientIncomeService;

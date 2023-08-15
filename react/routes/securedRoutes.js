import { lazy } from "react";

const ClientEmployment = lazy(() =>
  import("../components/clients/employment/ClientEmployment")
);
const ClientIncome = lazy(() =>
  import("../components/clients/income/ClientIncome")
);

const clients = [
  {
    path: "/clients/employment",
    name: "ClientEmployment",
    element: ClientEmployment,
    roles: ["x", "x", "x
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/income",
    name: "ClientIncome",
    element: ClientIncome,
    roles: ["x", "x", "x"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/clients/:id",
    name: "Clients",
    exact: true,
    element: Clients,
    roles: ["x", "x", "x"],
    isAnonymous: false,
  }
];

const allRoutes = [  ...clients ]


export default allRoutes;





    

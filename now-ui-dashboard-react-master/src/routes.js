import ClientDetail from "views/ClientDetail";
import Clients from "views/Clients";
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import UserPage from "views/UserPage.js";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Запросы на карты",
    icon: "files_paper",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/details/:id",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Список клиентов",
    icon: "users_single-02",
    component: Clients,
    layout: "/admin",
  },
  {
    path: "/client/:id",
    name: "Client",
    icon: "users_single-02",
    component: ClientDetail,
    layout: "/admin",
  },
];
export default dashRoutes;

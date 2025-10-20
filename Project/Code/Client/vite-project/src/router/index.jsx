import { createBrowserRouter, Outlet } from "react-router-dom";

import Home from "../pages/Home/HomePage.tsx";
import LoginPage from "../pages/Login/LoginPage.tsx";
import MentorRegistrationPage from "../pages/MentorRegistration/MentorRegistrationPage";



const Layout = () => {
    return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/mentor",
        element: <MentorRegistrationPage />,
      },
    ],
  },
]);
export default router;
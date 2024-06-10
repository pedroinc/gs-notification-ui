import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Components/ResponsiveAppBar";

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default Layout;

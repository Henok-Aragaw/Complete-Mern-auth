import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <header>Navbar Here</header>

      {/* THIS IS REQUIRED */}
      <Outlet />

      <footer>Footer here</footer>
    </div>
  );
};

export default Layout;

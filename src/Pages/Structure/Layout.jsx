import { Outlet, useLocation } from "react-router-dom"
import LogoComponent from "../../Components/LogoComponent"

const Layout = () => {
  let location = useLocation();

  const Display = () => {
    if (location.pathname === "/") return null;
    return <LogoComponent />;
  }

  return (
    <main className="App">
      <Display />
      <Outlet />
    </main>
  )
}

export default Layout
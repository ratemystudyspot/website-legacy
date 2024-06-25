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
      {/* <Display /> Double Logo*/}
      {/* TODO: refactoring: add the banner component here because it shows up on every page (becomes redundant to add every page) */}
      <Outlet />
    </main>
  )
}

export default Layout
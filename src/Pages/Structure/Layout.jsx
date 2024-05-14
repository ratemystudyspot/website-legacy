import { Outlet } from "react-router-dom"
import LogoComponent from "../../Components/LogoComponent"

const Layout = () => {
  return (
    <main className="App">
      <LogoComponent />
      <Outlet />
    </main>
  )
}

export default Layout
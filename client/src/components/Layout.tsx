import { Outlet } from 'react-router'
import Header from './Header'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </>

  )
}

export default Layout
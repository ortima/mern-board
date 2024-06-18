import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        {children}
      </Box>
    </CssVarsProvider>
  )
}

export default Layout
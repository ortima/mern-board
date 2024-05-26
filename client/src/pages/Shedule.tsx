import React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import Layout from '../components/Layout';
import Pallete from '../components/Charts/Pallete';
import { fetchTransactions } from '../store/transactionSlice';
import { RootState, useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import BasicModalDialog from '../components/Modal';

const Shedule = () => {
  const dispatch = useAppDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions)

  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <Layout>
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}
            >
              Shedule
            </Link>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography level="h2" component="h1">
            Shedule
          </Typography>
        </Box>
        {transactions.length > 0 ?
          <Pallete />
          :
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Typography level='h3'>
              You cant see anything, because you have not any transactions!
            </Typography>
            <Box>
              <BasicModalDialog />
            </Box>
          </Box>
        }
      </Box>
    </Layout>
  )
}

export default Shedule
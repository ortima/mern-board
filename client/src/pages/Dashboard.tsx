import { Box, Typography, Container, Paper } from "@mui/material";
import Layout from "../components/Layout";
import TableComponent from "../components/dashboard/Table";
import AddModal from "../components/dashboard/AddModal";
import CustomDeal from "../components/shared/CustomDeal";

export default function Dashboard() {
  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" gutterBottom>
                Transactions
              </Typography>

              <AddModal />
            </Box>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
                mt: 2,
              }}
            >
              <TableComponent />
            </Paper>

            <CustomDeal />
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}

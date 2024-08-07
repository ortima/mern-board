import { Box, Typography, Container, Paper } from "@mui/material";
import { TableComponent } from "../components/dashboard";
import { CustomDeal } from "../components/shared";
import { DashboardLayout } from "../components/layout";
import { TransactionModal } from "../components/modals";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 100 : 900],
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

              <TransactionModal isEdit={true} />
              <TransactionModal isEdit={false} />
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
    </DashboardLayout>
  );
}

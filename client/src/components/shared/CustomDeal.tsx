import { useState } from "react";
import {
  Box,
  SpeedDialAction,
  SpeedDial,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import { UploadFile, FileCopy } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { clearUploadStatus } from "../../store/transactionSlice";
import { UploadFileForm } from ".";
import { AddFileModal } from "../modals";

const actions = [
  { icon: <FileCopy />, name: "Download template", action: "download" },
  { icon: <UploadFile />, name: "Upload .xl file", action: "upload" },
];

export const CustomDeal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleActionClick = (action: string) => {
    if (action === "download") {
      const link = document.createElement("a");
      link.href = "/template.ods";
      link.download = "template.ods";
      link.click();
    } else if (action === "upload") {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearUploadStatus());
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "10px",
        right: "20px",
        height: 100,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 8, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.action)}
          />
        ))}
      </SpeedDial>

      <AddFileModal open={open} onClose={handleClose}>
        <Box sx={{ width: 400 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Upload .xl file
          </Typography>

          <UploadFileForm />
        </Box>
      </AddFileModal>
    </Box>
  );
};

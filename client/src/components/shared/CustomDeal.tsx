import React, { useState } from "react";
import {
  Box,
  SpeedDialAction,
  SpeedDial,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import { UploadFile, FileCopy } from "@mui/icons-material";
import CustomUploadFileForm from "./AddFileModal";
import UploadFileForm from "./UploadFileForm";

const actions = [
  { icon: <FileCopy />, name: "Download template", action: "download" },
  { icon: <UploadFile />, name: "Upload .xl file", action: "upload" },
];

const CustomDeal = () => {
  const [open, setOpen] = useState(false);

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

      <CustomUploadFileForm open={open} onClose={handleClose}>
        <Box sx={{ width: 400 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Upload .xl file
          </Typography>

          <UploadFileForm />
        </Box>
      </CustomUploadFileForm>
    </Box>
  );
};

export default CustomDeal;

import React, { useState, useCallback } from "react";
import { Box, Button, Chip, List, ListItem, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "../../store";
import { uploadFile, fetchTransactions } from "../../store/transactionSlice";
import { CustomAlert } from "./CustomAlert";
import { CustomAlertProps } from "../../@types/componentsInterfaces";

interface UploadStatus {
  record: number;
  error?: string;
}

export const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<CustomAlertProps>({
    open: false,
    severity: "info",
    message: "",
  });
  const [uploadErrors, setUploadErrors] = useState<UploadStatus[]>([]);
  const [successfulUploads, setSuccessfulUploads] = useState<UploadStatus[]>(
    [],
  );
  const dispatch = useAppDispatch();

  const handleAlertClose = useCallback(() => {
    setAlert((prevAlert) => ({ ...prevAlert, open: false }));
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setUploadErrors([]);
    setSuccessfulUploads([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = useCallback(async () => {
    if (!file) {
      setAlert({ open: true, message: "No file selected", severity: "error" });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        try {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

          const statuses = await dispatch(uploadFile(jsonData)).unwrap();
          const errors = statuses.filter(
            (status) => status.status === "failed",
          );
          const successes = statuses.filter(
            (status) => status.status === "success",
          );

          setUploadErrors(
            errors.map((status) => ({
              record: status.record,
              error: status.error || "Unknown error",
            })),
          );
          setSuccessfulUploads(
            successes.map((status) => ({ record: status.record })),
          );

          const alertMessage = statuses.every(
            (status) => status.status === "success",
          )
            ? "File uploaded successfully"
            : "File uploaded with errors";

          setAlert({
            open: true,
            message: alertMessage,
            severity: statuses.every((status) => status.status === "success")
              ? "success"
              : "warning",
          });
          await dispatch(fetchTransactions()).unwrap();
        } catch (error) {
          setAlert({
            open: true,
            message: `Error uploading file: ${error}`,
            severity: "error",
          });
        }
      }
    };

    reader.onerror = (error) => {
      setAlert({
        open: true,
        message: `Error uploading file: ${error}`,
        severity: "error",
      });
    };

    reader.readAsArrayBuffer(file);
  }, [file, dispatch]);

  return (
    <Box>
      <CustomAlert
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={handleAlertClose}
      />
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed grey",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Typography>Drag 'n' drop some files here</Typography>
        )}
      </Box>
      {file && (
        <Box mt={2}>
          <Typography variant="body1">Selected file: {file.name}</Typography>
        </Box>
      )}
      <Button
        onClick={handleUpload}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Upload
      </Button>
      <Box mt={2} sx={{ maxHeight: 300, overflowY: "auto" }}>
        {successfulUploads.length > 0 && (
          <Typography variant="h6">Successful Uploads</Typography>
        )}
        <List>
          {successfulUploads.map((status, index) => (
            <ListItem key={index}>
              <Chip
                label={`Record ${status.record}: Success`}
                variant="outlined"
                color="success"
              />
            </ListItem>
          ))}
        </List>
        {uploadErrors.length > 0 && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Upload Errors
          </Typography>
        )}
        <List>
          {uploadErrors.map((error, index) => (
            <ListItem key={index}>
              <Chip
                label={`Record ${error.record}: Failed (${error.error})`}
                variant="outlined"
                color="error"
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

import React, { useState, useCallback } from "react";
import { Box, Button, Chip, List, ListItem, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "../../store";
import { uploadFile, fetchTransactions } from "../../store/transactionSlice";
import { showAlert } from "../../store/alertSlice";

interface UploadStatus {
  record: number;
  error?: string;
}

export const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadErrors, setUploadErrors] = useState<UploadStatus[]>([]);
  const [successfulUploads, setSuccessfulUploads] = useState<UploadStatus[]>(
    [],
  );
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setUploadErrors([]);
    setSuccessfulUploads([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = useCallback(async () => {
    if (!file) {
      dispatch(
        showAlert({
          open: true,
          message: "No file selected",
          severity: "error",
        }),
      );
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
            successes.map(({ record }) => ({ record: record })),
          );

          const alertMessage = statuses.every(
            (status) => status.status === "success",
          )
            ? "File uploaded successfully"
            : "File uploaded with errors";

          dispatch(
            showAlert({
              open: true,
              severity: statuses.every(({ status }) => status === "success")
                ? "success"
                : "warning",
              message: alertMessage,
            }),
          );

          dispatch(fetchTransactions());
        } catch (error) {
          dispatch(
            showAlert({
              open: true,
              severity: "error",
              message: `Error uploading file: ${error}`,
            }),
          );
        }
      }
    };

    reader.onerror = (error) => {
      dispatch(
        showAlert({
          open: true,
          severity: "error",
          message: `Error uploading file: ${error}`,
        }),
      );
    };

    reader.readAsArrayBuffer(file);
  }, [file, dispatch]);

  return (
    <Box>
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
        <Typography>
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here"}
        </Typography>
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
          {successfulUploads.map((status) => (
            <ListItem key={status.record}>
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
          {uploadErrors.map((error) => (
            <ListItem key={error.record}>
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

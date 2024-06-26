/* eslint-disable no-console */
import React, { useState, useCallback } from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { RootState, useAppDispatch } from "../../store";
import { uploadFile, fetchTransactions } from "../../store/transactionSlice";
import { useSelector } from "react-redux";

const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadErrors, setUploadErrors] = useState<
    { record: number; error: string }[]
  >([]);

  const dispatch = useAppDispatch();
  const uploadStatus = useSelector(
    (state: RootState) => state.transactions.uploadStatus,
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setUploadErrors([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

        try {
          const statuses = await dispatch(uploadFile(jsonData)).unwrap();
          console.log("File uploaded successfully");
          console.log(statuses);
          await dispatch(fetchTransactions()).unwrap();
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
    };

    reader.readAsArrayBuffer(file);
  };

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
        <List>
          {uploadStatus.map((status) => (
            <ListItem key={status.record}>
              {`Record ${status.record}: ${
                status.status === "success"
                  ? "Success"
                  : `Failed (${status.error})`
              }`}
            </ListItem>
          ))}
          {uploadErrors.map((error, index) => (
            <ListItem key={index}>
              {`Record ${error.record}: Failed (${error.error})`}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default UploadFileForm;

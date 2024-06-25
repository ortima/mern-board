/* eslint-disable no-console */
// UploadFileForm.tsx

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button, Input } from "@mui/material";
import { getAuthToken } from "../../store/transactionSlice";

interface UploadStatus {
  record: number;
  status: string;
}

const UploadFileForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

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

        const chunkSize = 10;
        for (let i = 0; i < jsonData.length; i += chunkSize) {
          const chunk = jsonData.slice(i, i + chunkSize);

          try {
            const token = getAuthToken(); // Получение токена
            const response = await fetch("/api/transactions/upload-data", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Добавление токена в заголовок
              },
              body: JSON.stringify(chunk),
            });

            if (!response.ok) {
              throw new Error(`Server error: ${response.statusText}`);
            }

            const result = await response.json();
            const statusUpdate: UploadStatus[] = result.status.map(
              (status: string, index: number) => ({
                record: i + index + 1,
                status,
              }),
            );

            setUploadStatus((prevStatus) => [...prevStatus, ...statusUpdate]);
          } catch (error) {
            console.error("Error uploading data:", error);
            const errorStatus: UploadStatus[] = chunk.map((_, index) => ({
              record: i + index + 1,
              status: "Failed",
            }));
            setUploadStatus((prevStatus) => [...prevStatus, ...errorStatus]);
          }
        }
      }
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
      <div>
        {uploadStatus.map((status, index) => (
          <div key={index}>{`Record ${status.record}: ${status.status}`}</div>
        ))}
      </div>
    </div>
  );
};

export default UploadFileForm;

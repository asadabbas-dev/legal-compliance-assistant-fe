"use client";

import { fetchDocuments, uploadPdf } from "@/provider/features/documents/documents.slice";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useUpload() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { upload, list } = useSelector((state) => state.documents);

  const loadDocuments = useCallback(() => {
    dispatch(fetchDocuments({ successCallBack: () => {} }));
  }, [dispatch]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const response = await dispatch(
      uploadPdf({
        file: selectedFile,
        successCallBack: () => {
          enqueueSnackbar("Document uploaded. Processing in background.", { variant: "success" });
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          loadDocuments();
        },
      })
    );
    return response;
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const documents = list?.data?.documents || [];

  return {
    fileInputRef,
    selectedFile,
    handleFileSelect,
    handleUploadClick,
    handleSubmit,
    handleClearFile,
    loadDocuments,
    documents,
    uploadLoading: upload.isLoading,
    listLoading: list.isLoading,
    uploadError: upload.isError,
    uploadMessage: upload.message,
  };
}

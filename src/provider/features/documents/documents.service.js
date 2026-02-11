import api from "@/common/utils/api";
import { ENDPOINT } from "@/endpoints";

const uploadPdf = async (formData) => {
  const response = await api().post(ENDPOINT.rag.upload.path, formData, {
    timeout: 60000,
  });
  return response.data;
};

const getDocuments = async () => {
  const response = await api().get(ENDPOINT.rag.documents.path);
  return response.data;
};

const documentsService = {
  uploadPdf,
  getDocuments,
};

export default documentsService;

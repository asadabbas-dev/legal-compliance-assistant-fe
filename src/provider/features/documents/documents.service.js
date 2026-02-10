import ragApi from "@/common/utils/rag-api.util";
import { ENDPOINT } from "@/endpoints";

const uploadPdf = async (formData) => {
  const response = await ragApi.post(ENDPOINT.rag.upload.path, formData, {
    timeout: 60000,
  });
  return response.data;
};

const getDocuments = async () => {
  const response = await ragApi.get(ENDPOINT.rag.documents.path);
  return response.data;
};

const documentsService = {
  uploadPdf,
  getDocuments,
};

export default documentsService;

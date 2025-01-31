import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadDiagnosticImage } from "../store/diagnosticSlice";

const DiagnosticView = () => {
  const dispatch = useDispatch();
  const { diagnosticData, status, error } = useSelector((state) => state.diagnostic);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadDiagnosticImage(selectedFile));
    }
  };

  return (
    <div>
      <h2>Upload Diagnostic Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={status === "loading"}>
        {status === "loading" ? "Uploading..." : "Upload"}
      </button>

      {status === "failed" && <p>Error: {error}</p>}
      {diagnosticData && <p>Upload Successful: {diagnosticData.message}</p>}
    </div>
  );
};

export default DiagnosticView;

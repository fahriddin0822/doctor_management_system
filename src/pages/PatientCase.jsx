import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCaseDetails } from "../store/patientSlice";
import { useParams } from "react-router-dom";

const PatientCase = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { patientData, status, error } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchCaseDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Patient Details</h2>
      {patientData ? (
        <div>
          <p>Name: {patientData.name}</p>
          <p>Age: {patientData.age}</p>
          <p>Diagnosis: {patientData.diagnosis}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PatientCase;

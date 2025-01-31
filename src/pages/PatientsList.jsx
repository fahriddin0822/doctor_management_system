import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientsList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(savedPatients);
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex">
      {/* Patients List Column */}
      <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Patients List
        </h2>
        {patients.length === 0 ? (
          <p className="text-gray-600 text-center">No patients added yet.</p>
        ) : (
          patients.map((patient) => (
            <div 
              key={patient.id} 
              onClick={() => handlePatientSelect(patient)}
              className={`p-4 border-b cursor-pointer hover:bg-blue-50 transition-colors ${
                selectedPatient && selectedPatient.id === patient.id 
                  ? 'bg-blue-100' 
                  : 'bg-white'
              }`}
            >
              <p className="text-lg font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-600">{patient.diagnosis}</p>
            </div>
          ))
        )}
      </div>

      {/* Patient Details Column */}
      <div className="w-2/3 p-8">
        {selectedPatient ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Patient Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Patient Basic Info */}
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Personal Information
                </h3>
                <p><strong>Name:</strong> {selectedPatient.name}</p>
                <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
                <p><strong>Doctor's Comment:</strong> {selectedPatient.comment}</p>
              </div>

              {/* Patient Images */}
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Diagnostic Images
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedPatient.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`Patient Diagnostic ${index + 1}`} 
                      className="w-full h-40 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 pt-20">
            <p className="text-2xl">Select a patient to view details</p>
            <p className="text-sm mt-2">Click on a patient name from the list</p>
          </div>
        )}

        <div className="mt-6 text-center">
          {/* <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            Back to Dashboard
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
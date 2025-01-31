import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  ClipboardIcon,
  MessageCircleIcon,
  ImageIcon,
  PlusCircleIcon,
  XIcon,
  HeartIcon,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(savedPatients);
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [
            ...prev,
            { url: reader.result, name: file.name },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleViewPatientsList = () => {
    navigate("/patients");
  };

  const handleAddPatient = async () => {
    if (!name || !diagnosis || images.length === 0 || !comment) {
      return alert("Iltimos, barcha maydonlarni to'ldiring!");
    }

    setLoading(true);
    try {
      const newPatient = {
        id: Date.now(),
        name,
        diagnosis,
        images: images.map((img) => img.url),
        comment,
      };
      const updatedPatients = [...patients, newPatient];
      setPatients(updatedPatients);
      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      setName("");
      setDiagnosis("");
      setComment("");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 py-2 px-4">
      <div className="w-full max-w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">

          <div className="p-6 space-y-6 flex flex-col items-center">
            {/* Patient Name Input */}
            <div className="space-y-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Patient Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter patient name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Diagnosis Input */}
            <div className="space-y-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Diagnosis
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ClipboardIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Comment Input */}
            <div className="space-y-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Doctor Comment
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Enter your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700 text-center">
                Upload Images of test( Rentgen, Tomography and etc )
              </label>
              <div className="mt-1 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">
                        Upload a file
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 right-2 text-xs text-white bg-black bg-opacity-50 rounded px-2 py-1 truncate">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4 w-1/2">
              <button
                onClick={handleAddPatient}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                {loading ? "Adding Patient..." : "Add Patient"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <HeartIcon className="h-4 w-4 text-red-400" />
            <span>Made with care for healthcare professionals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
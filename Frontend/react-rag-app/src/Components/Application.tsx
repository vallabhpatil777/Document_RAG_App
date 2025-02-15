import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../store/fileSlice";
import { fetchModels, submitQuery } from "../store/querySlice";
import type { RootState, AppDispatch } from "../store/store";
import { useDispatch as useAppDispatch } from "react-redux";
import { Circles } from "react-loader-spinner"; // Import spinner for loading state

const Application: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [model, setModel] = useState("");

  const dispatch = useAppDispatch<AppDispatch>();
  const models = useSelector((state: RootState) => state.query.models);
  const response = useSelector((state: RootState) => state.query.response);
  const loading = useSelector((state: RootState) => state.query.loading);
  const fileStatus = useSelector((state: RootState) => state.file.status);
  const uploadMessage = useSelector((state: RootState) => state.file.uploadMessage);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  // Reset query state when a new file is uploaded
  const handleUpload = () => {
    if (file) {
      dispatch(uploadFile(file)); // Upload the new file
        // Reset previous query and response
      setQuery("");  // Clear previous query
      setModel("");  // Clear model selection
    }
  };

  const handleSubmit = () => {
    if (!model) {
        setModel(models[0] || "");  // Set it to the first model in the list, or empty if no models
      }
    if (query && model) {
      console.log("Submitting query:", query, "with model:", model);
      dispatch(submitQuery({ query, model }));
    } else {
      console.log("Query or model not selected.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-300 rounded-lg shadow w-full max-w-3xl h-auto">
      <h1 className="text-2xl font-bold mb-4">Document RAG App</h1>

      {/* File Upload */}
      <div className="mb-4">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-900">Upload Document</label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-2 block w-full text-sm text-gray-500 file:border file:rounded-lg file:px-4 file:py-2 file:bg-gray-50 file:text-sm file:text-gray-700"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-500">File selected: {file.name}</p>
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {fileStatus === "loading" ? (
            <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
          ) : (
            "Upload"
          )}
        </button>
        {uploadMessage && <p className="mt-2 text-sm text-gray-500">{uploadMessage}</p>}
      </div>

      {/* Query Input */}
      <div className="mb-4">
        <select onChange={(e) => setModel(e.target.value)} value = {model} className="border p-2 rounded w-full">
          <option>Select Model</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full"
        >
          {loading ? (
            <Circles height="20" width="20" color="#fff"  ariaLabel="loading" />
          ) : (
            "Submit"
          )}
        </button>
      </div>

      {/* Response Display */}
      {response && (
        <div className="p-4 bg-gray-100 rounded-lg mt-4">
          <h2 className="text-lg font-bold">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Application;

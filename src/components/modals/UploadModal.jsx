import { useState } from "react";

function UploadModal({ onClose, setDocs }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    if (!title || !file) return;

    setDocs((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        type: file.type,
        verified: false,
        fileName: file.name,
      },
    ]);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl">

        <h2 className="text-lg font-semibold mb-4">
          Upload Document
        </h2>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* DROP ZONE */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed rounded-lg p-6 text-center mb-4 cursor-pointer"
        >
          <p className="text-sm text-gray-600">
            Drag & drop file here
          </p>
          <p className="text-xs text-gray-400 mb-2">
            or
          </p>

          <label className="text-sm text-black font-medium cursor-pointer">
            Select File
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* FILE PREVIEW */}
        {file && (
          <p className="text-sm text-gray-600 mb-4">
            Selected: {file.name}
          </p>
        )}

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={!title || !file}
          className={`w-full p-3 rounded-lg ${
            title && file
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Upload
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full text-sm"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

export default UploadModal;
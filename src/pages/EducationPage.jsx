import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/modals/UploadModal";

function EducationPage({ onBack }) {
  const [docs, setDocs] = useState([
    { id: 1, title: "WAEC Result", type: "WAEC", verified: true },
    { id: 2, title: "JAMB Result", type: "JAMB", verified: true },
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">

      <div className="p-6 max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* HEADER (IDENTITY) */}
        <div className="bg-gray-100 rounded-2xl p-6 flex items-center gap-6 mb-8">

          <div className="w-20 h-20 bg-gray-300 rounded-full" />

          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>

            <p className="text-sm text-gray-600">
              JAMB Reg No: 202312345678AB
            </p>

            <p className="text-sm text-gray-600">
              WAEC No: 12345678
            </p>
          </div>
        </div>

        {/* DOCUMENT GRID */}
        <h3 className="text-lg font-semibold mb-4">
          Your Documents
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-100 p-4 rounded-xl"
            >
              <h4 className="font-medium">{doc.title}</h4>

              <p className="text-xs text-gray-500 mb-2">
                {doc.type}
              </p>

              {doc.verified && (
                <p className="text-xs text-green-600">
                  Verified ✅
                </p>
              )}
            </div>
          ))}

        </div>

      </div>

      {/* FLOATING ADD BUTTON */}
      <button
        onClick={() => setShowUpload(true)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg"
      >
        <Plus />
      </button>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          setDocs={setDocs}
        />
      )}

    </div>
  );
}

export default EducationPage;
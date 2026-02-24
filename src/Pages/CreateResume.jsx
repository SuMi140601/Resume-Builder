import { useState, useEffect } from "react";
import LeftPanel from "../Pages/LeftPanel";
import RightPanel from "../Pages/RightPanel";

function CreateResume() {
  const [blocks, setBlocks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [saved, setSaved] = useState(() => {
    const saved = localStorage.getItem("resumeBlock");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("resumeBlock", JSON.stringify(blocks));
  }, [blocks]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* send data and make editable content */}
      <LeftPanel
        blocks={blocks}
        setBlocks={setBlocks}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {/* display the preview on right act as parent */}
      <RightPanel
        blocks={blocks}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}

export default CreateResume;
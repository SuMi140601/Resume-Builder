import { useState, useEffect } from "react";  //useState - store data    // useEffect - side effect/local storage
import LeftPanel from "../Components/LeftPanel"; // add/edit-blocks 
import RightPanel from "../Components/RightPanel";// resume preview


function CreateResume() {
  const [blocks, setBlocks] = useState([]);  //state-block  has stored all resume sections... initial []  cuz no block
  const [selectedId, setSelectedId] = useState(null); // currently selected block  for editing

  const [saved, setSaved] = useState(() => {
    const saved = localStorage.getItem("resumeBlock");  //get storage from browser if exisit
    return saved ? JSON.parse(saved) : [];         //json.parse convert information into string  now no data so return empty
  });

  useEffect(() => {                   //auto change on change
    localStorage.setItem("resumeBlock", JSON.stringify(blocks));
  }, [blocks]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* send data and make editable content             prop passing P-C reusable*/}
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
//control pannel allow edit add delete section modify content

import { useState, useEffect } from "react";
import BlockEditor from "./BlockEditor";

const blockTypes = [                  //array    what section need to be in dropdown. 
  "H1","H2","H3","H4","H5","H6",
  "paragraph","ul","ol","table",
  "image","link","divider",
];

function LeftPanel({ blocks, setBlocks, selectedId, setSelectedId }) {
  //Props From Parents

  const [selectedType, setSelectedType] = useState("");
  const [currentBlock, setCurrentBlock] = useState(null);
// SelectedType control dropdown value and     current store temporary block before saving
// eg H1 Para, Table etc


  //  When block clicked - load into editor
  useEffect(() => {                          
    if (selectedId) {
      const block = blocks.find(b => b.id === selectedId);
      if (block) {
        setCurrentBlock(block);
        setSelectedType(block.type);
      }                                     
    }
  }, [selectedId, blocks]);


  //  Dropdown select      selected empty then go for reset purpose
  const handleSelect = (type) => {
  setSelectedType(type);

  if (!type) {
    setCurrentBlock(null);
    return;
  }



  let newBlock = {
    id: Date.now(),  //unique id get
    type,
    fontSize: 16,
    fontFamily: "Arial",
    // bold: false,
    // italic: false,
    // underline: false,
     textAlign: "Left"
  };


  if (type === "ul" || type === "ol") {
    newBlock.items = ["List item"];
  } 

  //
  else if (type === "table") {
    newBlock.rows = 2;
    newBlock.cols = 2;
    newBlock.data = Array(2)
      .fill()
      .map(() => Array(2).fill(""));
  } 
  
  
  else if (type === "link") {
  newBlock.label = "";
  newBlock.url = "";
}
  else {
    newBlock.content = "";
  }

  setCurrentBlock(newBlock);
};

  //ADD or UPDATE                   //prevent empty save 
  const handleSave = () => {
    if (!currentBlock) return;

    if (selectedId) {
      // UPDATE                  map to update specific block with disturbing other state
      setBlocks(prev =>
        prev.map(b =>
          b.id === selectedId ? currentBlock : b
        )
      );
    } else {
      
      // ADD
      setBlocks(prev => [...prev, currentBlock]);
    }

    // Reset after save
    setSelectedType("");
    setCurrentBlock(null);
    setSelectedId(null);
  };

  // DELETE
  const handleDelete = () => {
    if (!selectedId) return;

    setBlocks(prev => prev.filter(b => b.id !== selectedId));    //filter tp remove block of specific id
    setSelectedType("");
    setCurrentBlock(null);
    setSelectedId(null);
  };

  return (
    <div className="w-1/3 bg-white p-6 border-r overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Control Panel</h2>

      <select
        value={selectedType}
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full border p-2 mb-4"
      >
        <option value="">Add Section</option>
        {blockTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>


      {currentBlock && (
        <>
          <BlockEditor
            block={currentBlock}
            setBlock={setCurrentBlock}
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 cursor-pointer rounded-md py-1 w-s hover:shadow-4xl "
            >
              {selectedId ? "Update" : "Add"}
            </button>

            {selectedId && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded-md py-1 w-s hover:shadow-4xl  "
              >
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default LeftPanel;
import { useRef } from "react";                 //ref  get current value no page relode/ no re-render

function BlockEditor({ block, setBlock }) {
const editorRef = useRef(null);
  if (!block) return null;

  const updateBlock = (updated) => {
    setBlock(updated);           //block state update reusable
  };

  return (
    <div className="space-y-3">


      {/* TEXT / HEADINGS / PARAGRAPH */}
<>
      {block.content !== undefined && (
       <div
       ref={editorRef}
  contentEditable
  suppressContentEditableWarning      //silent console warning
  className="w-full border p-2 min-h-[100px ] text-left"
  style={{ whiteSpace: "pre-wrap", direction:"ltr", textAlign: "left"}}
  onBlur={(e) =>
    updateBlock({
      ...block,
      content: e.currentTarget.innerHTML //for bold and italic formating
    })
  }
  dangerouslySetInnerHTML={{ __html: block.content }}   //save html renders and store
/>
)}

<div className="flex gap-2 mb-2 ">

  <button
  onMouseDown={(e) => {
    e.preventDefault();   // stop brouser default behaviour
    editorRef.current?.focus();
document.execCommand("bold");//apply
  }}
    // onClick={() => 
    className="bg-blue-500 hover:bg-blue-800 active:bg-green-500 text-white font-bold py-2 px-4 rounded"
  >
    Bold
  </button>




  <button
onMouseDown={(e) => {
    e.preventDefault();
    editorRef.current?.focus();
document.execCommand("italic");
  }}
    // onClick={() => 
    className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 active:bg-green-500"
  >
    Italic
  </button>

      </div>

      
</>
      {/* UL / OL          stored as array*/}
      {(block.type === "ul" || block.type === "ol") && (
        <>
          {block.items.map((item, index) => (
            <input
              key={index}
              value={item}
              onChange={(e) => {
                const newItems = [...block.items];
                newItems[index] = e.target.value;
                updateBlock({ ...block, items: newItems });
              }}
              className="w-full border p-2"
            />
          ))}

          <button
            onClick={() =>
              updateBlock({
                ...block,
                items: [...block.items, "New Item"],
              })
            } 
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-800 active:bg-green-500 transition"
          >
            Add Item
          </button>
        </>
      )}
      

{/* LINK      store label and url separately*/}
{block.type === "link" && (
  <>
    <input
      type="text"
      placeholder="Enter label"
      value={block.label || ""}
      onChange={(e) =>
        updateBlock({ ...block, label: e.target.value })
      }
      className="w-full border p-2"
    />

    <input
      type="text"
      placeholder="Enter hyperlink (https://...)"
      value={block.url || ""}
      onChange={(e) =>
        updateBlock({ ...block, url: e.target.value })
      }
      className="w-full border p-2"
    />
    
  </>
)}
      {/* TABLE   managed for row column editing*/}
      {block.type === "table" && (
        <>
          {block.data.map((row, rIndex) => (
            <div key={rIndex} className="flex gap-2">
              {row.map((cell, cIndex) => (
                <input
                  key={cIndex}
                  value={cell}
                  onChange={(e) => {
                    const newData = block.data.map((r, ri) =>
                      ri === rIndex
                        ? r.map((c, ci) =>
                            ci === cIndex ? e.target.value : c
                          )
                        : r
                    );

                    updateBlock({ ...block, data: newData });
                  }}
                  className="border p-1 w-full"
                />
              ))}
            </div>
          ))}
<div className="flex gap-2">
          <button
            onClick={() => {
              const newRow = Array(block.cols).fill("");
              updateBlock({
                ...block,
                rows: block.rows + 1,
                data: [...block.data, newRow],
              });
            }}
            className="
            px-3 py-1px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 active:bg-green-500 transition"
          >
            Add Row
          </button>

          <button
            onClick={() => {
              updateBlock({
                ...block,
                cols: block.cols + 1,
                data: block.data.map((row) => [...row, ""]),
              });
            }}
            className="px-3 py-1px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 active:bg-green-500 transition"
          >
            Add Column
          </button>
          </div>
        </>
      )}
      

      {/* FONT SIZE */}
      <input
        type="number"
        value={block.fontSize}
        onChange={(e) =>
          updateBlock({ ...block, fontSize: Number(e.target.value) })
        }
        className="w-full border p-2"
      />

      {/* FONT FAMILY */}
      <select
        value={block.fontFamily}
        onChange={(e) =>
          updateBlock({ ...block, fontFamily: e.target.value })
        }
        className="w-full border p-2"
      >
        <option>Arial</option>
        <option>Times New Roman</option>
        <option>Courier New</option>
        <option>Calibri</option>
        <option>Georgia</option>
      </select>

<div className="flex gap-2">
  <button
    onClick={() => updateBlock({ ...block, textAlign: "left" })}
    className="px-3 py-1px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700  active:bg-green-500 transition"
  >
    Left
  </button>

  <button
    onClick={() => updateBlock({ ...block, textAlign: "center" })}
    className="px-3 py-1px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 active:bg-green-500 transition"
  >
    Center
  </button>

  <button
    onClick={() => updateBlock({ ...block, textAlign: "right" })}
    className="px-3 py-1px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-700 active:bg-green-500 transition"
  >
    Right
  </button>
</div>






    </div>
  );
}

export default BlockEditor;
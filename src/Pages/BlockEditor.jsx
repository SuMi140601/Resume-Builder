function BlockEditor({ block, setBlock }) {

  if (!block) return null;

  const updateBlock = (updated) => {
    setBlock(updated);
  };

  return (
    <div className="space-y-3">

      {/* TEXT / HEADINGS / PARAGRAPH */}
      {block.content !== undefined && (
        
       <>
       <div className="flex gap-2 mb-2 ">
  <button
    onClick={() => document.execCommand("bold")}
    className="bg-gray-300 px-2 py-1"
  >
    Bold
  </button>

  <button
    onClick={() => document.execCommand("italic")}
    className="bg-gray-300 px-2 py-1"
  >
    Italic
  </button>
</div>
       <div
  contentEditable
  className="w-full border p-2 min-h-[100px]"
  style={{ whiteSpace: "pre-wrap" }}
  onInput={(e) =>
    updateBlock({
      ...block,
      content: e.currentTarget.innerHTML
    })
  }
  dangerouslySetInnerHTML={{ __html: block.content }}
/>


</> 


      )}

      {/* UL / OL */}
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
            className="bg-blue-500 text-white px-3 py-1"
          >
            Add Item
          </button>
        </>
      )}
{/* LINK */}
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
      {/* TABLE */}
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

          <button
            onClick={() => {
              const newRow = Array(block.cols).fill("");
              updateBlock({
                ...block,
                rows: block.rows + 1,
                data: [...block.data, newRow],
              });
            }}
            className="bg-green-500 text-white px-3 py-1"
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
            className="bg-purple-500 text-white px-3 py-1 ml-2"
          >
            Add Column
          </button>
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
    className="bg-gray-300 px-2 py-1"
  >
    Left
  </button>

  <button
    onClick={() => updateBlock({ ...block, textAlign: "center" })}
    className="bg-gray-300 px-2 py-1"
  >
    Center
  </button>

  <button
    onClick={() => updateBlock({ ...block, textAlign: "right" })}
    className="bg-gray-300 px-2 py-1"
  >
    Right
  </button>
</div>






    </div>
  );
}

export default BlockEditor;
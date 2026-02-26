import ResumeBlock from "./ResumeBlock"



function RightPanel({ blocks, selectedId, setSelectedId }) {


  return (
    <div className="bg-gray-400 flex-1 flex shadow-xl justify-center items-start p-10 overflow-auto">
      <div className="bg-white w-[794px] min-h-[1123px] shadow-4xl p-10 text-center">



        {blocks.map((block) => (
          <div
            key={block.id}
            onClick={() => setSelectedId(block.id)}
            className="mb-4 cursor-pointer"
          >
            <ResumeBlock block={block} />
            
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default RightPanel;


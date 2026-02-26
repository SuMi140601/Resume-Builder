function ResumeBlock({ block }) {          

  const style = {               //set single style everywhere in block
  fontSize: `${block.fontSize}px`,
  fontFamily: block.fontFamily,
  textAlign: block.textAlign || "left",
  };

  switch (block.type) {                //rander clean and reduce issue
    case "H1":
      return (
        <h1 style={style}
        className="font-bold"
        dangerouslySetInnerHTML={{ __html: block.content }}  //for rendering formated html content
          
        />
      );

    case "H2":
      return (
        <h2 style={style}
          className="font-bold"
        dangerouslySetInnerHTML={{ __html: block.content }}
          
        />
      );
    case "H3":
      return (
       <h3 style={style}
                 className="font-bold"
        dangerouslySetInnerHTML={{ __html: block.content }}
          
        />
      //  >{block.content}</h3>;
       );
    case "H4":
      return <h4 style={style}>{block.content}</h4>;
    case "H5":
      return <h5 style={style}>{block.content}</h5>;
    case "H6":
      return <h6 style={style}>{block.content}</h6>;

    case "paragraph":
  return (
    <p
      style={style}
      dangerouslySetInnerHTML={{ __html: block.content }} //preserve formating....h1
    />
  );

    case "ul":                                        //map render eacy item into list
      return (
        <ul style={style} className="list-disc ml-5">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol style={style} className="list-decimal ml-5">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    case "table":
  return (
    <div style={{ textAlign: block.textAlign }}>
      <table className="border w-full">
<thead>
  <tr>
    {block.data[0].map((cell, c) =>
    (
      <th key={c} className="border p-2 font-bold bg-gray-300">
        {cell}
      </th>
    ))}
  </tr>
</thead>
        <tbody>
          {block.data?.slice(1).map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className="border p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
    case "image":
      return <img src={block.content} alt="" className="w-32" />;

    case "link":
      return (
        <p style={style}> 
        {block.label}       
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
          onClick={(e) => e.stopPropagation()}  //prevent click event
        >
{...block.url.replace("mailto:"," ")}
          </a>
          
         </p>
      );
      
    case "divider":
      return <hr className="my-4" />;

    default:
      return null;
  }
}

export default ResumeBlock;
function ResumeBlock({ block }) {
  const style = {
  fontSize: `${block.fontSize}px`,
  fontFamily: block.fontFamily,
  textAlign: block.textAlign || "left",
  };

  switch (block.type) {
    case "H1":
      return (
        <h1 style={style} className="font-bold">
          {block.content}
        </h1>
      );
    case "H2":
      return (
        <h2 style={style} className="font-semibold">
          {block.content}
        </h2>
      );
    case "H3":
      return <h3 style={style}>{block.content}</h3>;
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
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );

    case "ul":
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
        <tbody>
          {block.data?.map((row, r) => (
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
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={style}
          className="text-blue-600 underline"
        >
          {block.label}
        </a>
      );
    case "divider":
      return <hr className="my-4" />;

    default:
      return null;
  }
}

export default ResumeBlock;
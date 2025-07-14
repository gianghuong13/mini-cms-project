

const DynamicTable = ({ columns, data, onEdit, onDelete }) => {
    console.log('DynamicTable rendered with columns:', columns, 'and data:', data);
    if (!Array.isArray(columns) || columns.length === 0) {
        return <div>No columns defined</div>;
    }

    if (!Array.isArray(data) || data.length === 0) {
        return <div className="text-gray-500 italic">No data available</div>;
    }

    return (
        <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead className="bg-gray-100">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="border p-2 text-left">{column.title}</th>
                    ))}

                    {(onEdit || onDelete) && (<th className="border p-2 text-left">Actions</th>)}
                </tr>
            </thead>

            <tbody>
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="border p-2">{item[col.dataIndex]}</td>
                            ))}

                            {(onEdit || onDelete) && (
                                <td className="border p-2 space-x-2">
                                    {onEdit && (
                                        <button onClick={() => onEdit(item)} className="bg-green-400 hover:bg-green-700 p-1 rounded">
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button onClick={() => onDelete(item)} className="bg-red-400 hover:bg-red-700 ml-2 p-1 rounded">
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default DynamicTable
import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

const DynamicTable = ({ columns, data, onFilterChange, onEdit, onDelete }) => {
    // console.log('DynamicTable rendered with columns:', columns, 'and data:', data);
    if (!Array.isArray(columns) || columns.length === 0) {
        return <div>No columns defined</div>;
    }

    const [localFilters, setLocalFilters] = useState({});

    const handleInputChange = (key, value) => {
        const updated = { ...localFilters, [key]: value };
        setLocalFilters(updated);
        if (onFilterChange) {
            onFilterChange(updated);
        }
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

                <tr>
                    {columns.map(column => (
                        <th key={column.dataIndex} className="border p-2">
                            {column.allowFiltering ? (
                                <DebounceInput
                                    minLength={2}
                                    debounceTimeout={500}
                                    type={column.filterType || 'text'}
                                    value={localFilters[column.dataIndex] || ''}
                                    placeholder={`Filter ${column.title}`}
                                    className="border p-1 w-full rounded"
                                    onChange={(e) => handleInputChange(column.dataIndex, e.target.value)}
                                />
                            ) : null}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, rowIndex) => (
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
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center p-4">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DynamicTable
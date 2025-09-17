import { useMemo, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

const DynamicTable = ({ columns, data, onFilterChange, onAction, buttonConfig = [], userRoles = [] }) => {

    const [localFilters, setLocalFilters] = useState({});
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    const isViewer = useMemo(() => userRoles.includes('viewer'), [userRoles]);

    const filteredColumns = useMemo(() => {
        return columns.filter(col => col.dataIndex !== 'createdAt' || !isViewer);
    }, [columns, isViewer]);

    const actionRoleMap = {
        update: ['admin', 'editor'],
        delete: ['admin']
    }

    // const filteredButtonConfig = useMemo(() => {
    //     return isViewer ? [] : buttonConfig;
    // }, [buttonConfig, isViewer]);

    const filteredButtonConfig = useMemo(() => {
        if (isViewer) return [];
        return buttonConfig.filter(btn => {
            const allowedRoles = actionRoleMap[btn.action] || [];
            if (!allowedRoles.length) return true; 
            return allowedRoles.some(role => userRoles.includes(role));
        });
    }, [buttonConfig, isViewer, userRoles]);

    const handleInputChange = (key, value) => {
        const updated = { ...localFilters, [key]: value };
        setLocalFilters(updated);
        if (onFilterChange) {
            onFilterChange(updated);
        }
    }

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    }

    return (
        <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead className="bg-gray-100">
                <tr>
                    {filteredColumns.map((column, index) => (
                        <th key={index} className="border p-2 text-center">{column.title}</th>
                    ))}

                    {filteredButtonConfig.length > 0 && (
                        <th className='border p-2 text-center'>Actions</th>
                    )}
                </tr>

                <tr>
                    {filteredColumns.map(column => (
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
                    {filteredButtonConfig.length > 0 && <th></th>}
                </tr>
            </thead>

            <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {filteredColumns.map((col, colIndex) => (
                                <td key={colIndex} className="border p-2">{item[col.dataIndex]}</td>
                            ))}

                            {filteredButtonConfig.length > 0 && (
                                <td className="border p-2 relative text-center">
                                    <button
                                        onClick={() => toggleMenu(rowIndex)}
                                        className='px-2 py-1 border border-gray-700 hover:bg-gray-300'
                                    >
                                        Actions
                                    </button>

                                    {openMenuIndex === rowIndex && (
                                        <ul className='absolute bg-white border rounded shadow-lg right-0 z-10'>
                                            {filteredButtonConfig.map((btn, i) => (
                                                <li
                                                    key = {i}
                                                    onClick={() =>{
                                                        if (onAction) {
                                                            onAction(btn.action, item);
                                                        }
                                                        setOpenMenuIndex(null);
                                                    }}
                                                    className='px-2 py-1 hover:bg-gray-300 cursor-pointer'
                                                >
                                                    {btn.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + (filteredButtonConfig.length > 0 ? 1 : 0)} className="text-center p-4">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DynamicTable
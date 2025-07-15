import { useState } from 'react';
import { Trash } from 'lucide-react';

const defaultColumn = {
    title: '',
    dataIndex: ''
};

const GridConfigEditor = ({ gridConfig, onChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleColumnChange = (e, key) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updated = [...(gridConfig.columns || [])];
        updated[selectedIndex] = { ...updated[selectedIndex], [key]: value };
        onChange({ ...gridConfig, columns: updated });
    };

    const handleAddColumn = () => {
        const updated = [...(gridConfig.columns || []), { ...defaultColumn }];
        onChange({ ...gridConfig, columns: updated });
        setSelectedIndex(updated.length - 1);
    };

    const handleDeleteColumn = (index) => {
        const updated = (gridConfig.columns || []).filter((_, i) => i !== index);
        onChange({ ...gridConfig, columns: updated });

        if (index === selectedIndex) setSelectedIndex(null);
        else if (index < selectedIndex) setSelectedIndex(prev => prev - 1);
    };

    const selectedColumn = gridConfig.columns?.[selectedIndex];

    return (
        <div className="grid grid-cols-3 gap-6">
        
        <div className="border p-4 bg-white shadow-sm rounded">
            <h2 className="font-semibold mb-2">Columns</h2>
            <ul className="space-y-2">
            {gridConfig.columns?.map((col, index) => (
                <li
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex justify-between items-center cursor-pointer p-2 rounded ${
                        selectedIndex === index ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'
                    }`}
                >
                <span>
                    {col.dataIndex || `Column ${index + 1}`}
                </span>
                <button>
                    <Trash
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteColumn(index)}
                    />
                </button>
                </li>
            ))}
            </ul>

            <button
                onClick={handleAddColumn}
                className="mt-4 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 w-full"
            >
                + Column
            </button>
        </div>

        <div className="col-span-2 border p-4 bg-gray-50 shadow-sm rounded">
            {selectedColumn ? (
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium">Data Index</label>
                        <input
                            value={selectedColumn.dataIndex}
                            onChange={(e) => handleColumnChange(e, 'dataIndex')}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Title</label>
                        <input
                            value={selectedColumn.title}
                            onChange={(e) => handleColumnChange(e, 'title')}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Allow Filtering</label>
                        <input
                            type="checkbox"
                            checked={selectedColumn.allowFiltering || false}
                            onChange={(e) => handleColumnChange(e, 'allowFiltering')}
                            className="ml-2"
                        />
                    </div>
                </div>
            ) : (
            <div className="text-gray-500">
                <p>Select a column to edit or add a new one.</p>
            </div>
            )}
        </div>
        </div>
    );
};

export default GridConfigEditor;
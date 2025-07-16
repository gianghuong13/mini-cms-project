import { useState } from 'react';
import { Trash } from 'lucide-react';

const ApiConfigEditor = ({ apiConfig = {}, onChange }) => {
    const [selectedKey, setSelectedKey] = useState(Object.keys(apiConfig)[0] || null);

    const handleFieldChange = (field, value) => {
        const updated = { 
            ...apiConfig, 
            [selectedKey]:  {
                ...(apiConfig[selectedKey] || {}),
                [field]: value
            }
        };
        onChange(updated);
    };

    const handleAddKey = () => {
        const newKey = prompt('Enter new API key (e.g. list, create,..):');
        if (newKey && !apiConfig[newKey]) {
            const updated = { 
                ...apiConfig, 
                [newKey]: {
                    method: 'GET',
                    url: '',
                    type: '',
                } 
            };
            onChange(updated);
            setSelectedKey(newKey);
        }
    };

    const handleDeleteKey = (keyToDelete) => {
        if (window.confirm(`Delete API key "${keyToDelete}"?`)) {
            const updated = { ...apiConfig };
            delete updated[keyToDelete];
            onChange(updated);
            if (selectedKey === keyToDelete) {
                setSelectedKey(null);
            }
        }
    };

    const selectedConfig = apiConfig[selectedKey] || {};

    return (
        <div className="grid grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="border p-4 bg-white shadow-sm rounded">
                <h2 className="font-semibold mb-2">API Keys</h2>
                <ul className="space-y-2">
                    {Object.keys(apiConfig).map((key, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedKey(key)}
                            className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                                selectedKey === key ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'
                            }`}
                        >
                            <span>{key}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteKey(key);
                                }}
                            >
                                <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleAddKey}
                    className="mt-4 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 w-full"
                >
                    + Add API Key
                </button>
            </div>

            {/* Right Panel */}
            <div className="col-span-2 border p-4 bg-gray-50 shadow-sm rounded">
                {selectedKey ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium">Method</label>
                            <select
                                value={selectedConfig.method || ''}
                                onChange={(e) => handleFieldChange('method', e.target.value)}
                                className="border p-2 w-full rounded"
                            >
                                <option value="">-- Select --</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium">URL</label>
                            <input
                                value={selectedConfig.url || ''}
                                onChange={(e) => handleFieldChange('url', e.target.value)}
                                className="border p-2 w-full rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Type</label>
                            <input
                                value={selectedConfig.type || ''}
                                onChange={(e) => handleFieldChange('type', e.target.value)}
                                className="border p-2 w-full rounded"
                            />
                        </div>

                        {selectedConfig.method === 'GET' && (
                            <>
                                <div>
                                    <label className="block font-medium">Response Key</label>
                                    <input
                                        value={selectedConfig.responseKey || ''}
                                        onChange={(e) => handleFieldChange('responseKey', e.target.value)}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium">Total Key</label>
                                    <input
                                        value={selectedConfig.totalKey || ''}
                                        onChange={(e) => handleFieldChange('totalKey', e.target.value)}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="text-gray-500">Select or add an API key to edit</div>
                )}
            </div>
        </div>
    );
};

export default ApiConfigEditor;

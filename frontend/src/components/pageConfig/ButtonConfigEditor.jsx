import { useState } from 'react';
import { Trash } from 'lucide-react';

const ButtonConfigEditor = ({ buttonConfig = [], onChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(buttonConfig.length > 0 ? 0 : null);

    const handleFieldChange = (field, value) => {
        const updated = [...buttonConfig];
        if (selectedIndex !== null) {
        updated[selectedIndex] = {
            ...updated[selectedIndex],
            [field]: value,
        };
        onChange(updated);
        }
    };

    const handleAddButton = () => {
        const newButton = { label: '', action: '', apiEndpoint: '' };
        const updated = [...buttonConfig, newButton];
        onChange(updated);
        setSelectedIndex(updated.length - 1);
    };

    const handleDeleteButton = (indexToDelete) => {
        if (window.confirm(`Delete button at index ${indexToDelete + 1}?`)) {
        const updated = buttonConfig.filter((_, i) => i !== indexToDelete);
        onChange(updated);
        if (selectedIndex === indexToDelete) {
            setSelectedIndex(null);
        } else if (indexToDelete < selectedIndex) {
            setSelectedIndex(selectedIndex - 1);
        }
        }
    };

    const selectedButton = selectedIndex !== null ? buttonConfig[selectedIndex] : null;

    return (
        <div className="grid grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="border p-4 bg-white shadow-sm rounded">
            <h2 className="font-semibold mb-2">Buttons</h2>
            <ul className="space-y-2">
            {buttonConfig.map((btn, index) => (
                <li
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                    selectedIndex === index ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'
                }`}
                >
                <span>{btn.label || `Button ${index + 1}`}</span>
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteButton(index);
                    }}
                >
                    <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
                </button>
                </li>
            ))}
            </ul>

            <button
                onClick={handleAddButton}
                className="mt-4 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 w-full"
            >
            + Add Button
            </button>
        </div>

        {/* Right Panel */}
        <div className="col-span-2 border p-4 bg-gray-50 shadow-sm rounded">
            {selectedButton ? (
            <div className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Label</label>
                    <input
                        type="text"
                        value={selectedButton.label}
                        onChange={(e) => handleFieldChange('label', e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Button label"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Action</label>
                    <input
                        type="text"
                        value={selectedButton.action}
                        onChange={(e) => handleFieldChange('action', e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Action type (e.g. create, update)"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Call API</label>
                    <input
                        type="text"
                        value={selectedButton.callApi}
                        onChange={(e) => handleFieldChange('apiEndpoint', e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="API endpoint key from apiEndpoints config"
                    />
                </div>
            </div>
            ) : (
            <div className="text-gray-500">Select or add a button to edit</div>
            )}
        </div>
        </div>
    );
};

export default ButtonConfigEditor;
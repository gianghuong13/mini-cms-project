import { useState } from 'react';
import { Trash } from 'lucide-react';

const  defaultFields = {
    name: '',
    type: 'text',
    label: '',
    required: false,
    options: []
};

const FormConfigEditor = ({ formConfig, onChange }) => {

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleFieldChange = (e, key) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updatedFields = [...(formConfig.fields || [])];
        updatedFields[selectedIndex] = {...updatedFields[selectedIndex], [key]:value};
        onChange({ ...formConfig, fields: updatedFields });
    };

    const handleAddField = () => {
        const updatedFields = [...(formConfig.fields || []), { ...defaultFields }];
        onChange({ ...formConfig, fields: updatedFields });
        setSelectedIndex(updatedFields.length - 1);
    };

    const handleDeleteField = (index) => {
        if (!formConfig.fields) return;
        const updatedFields = (formConfig.fields || []).filter((_,i) => i !== index);
        onChange({ ...formConfig, fields: updatedFields });

        if (index === selectedIndex) {
            setSelectedIndex(null);
        } else if (index < selectedIndex) {
            setSelectedIndex((prev) => prev - 1);
        }
    };

    const selectedField = formConfig.fields?.[selectedIndex];

    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="border p-4 bg-white shadow-sm rounded">
                <h2 className="font-semibold mb-2">Fields</h2>
                <ul className="space-y-2">
                    {(formConfig.fields || []).map((field, index) => (  
                        <li
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`flex justify-between items-center cursor-pointer p-2 rounded ${selectedIndex === index ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'}`}
                        >
                            <span>
                                {field.name || `Field ${index + 1}`}
                            </span>
                        
                            <button>
                                <Trash
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteField(index)}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleAddField}
                    className="mt-4 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 w-full"
                >
                    + Field
                </button>
            </div>

            <div className="col-span-2 border p-4 bg-gray-50 shadow-sm rounded">
                {selectedIndex !== null && selectedField ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium">Name</label>
                            <input
                                value={formConfig.fields[selectedIndex].name}
                                onChange={(e) => handleFieldChange(e, 'name')}
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Label</label>
                            <input
                                value={formConfig.fields[selectedIndex].label}
                                onChange={(e) => handleFieldChange(e, 'label')}
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Type</label>
                            <select
                                value={formConfig.fields[selectedIndex].type}
                                onChange={(e) => handleFieldChange(e, 'type')}
                                className="border p-2 w-full rounded"
                            >
                                <option value="text">text</option>
                                <option value="email">email</option>
                                <option value="password">password</option>
                                <option value="select">select</option>
                            </select>
                            {formConfig.fields[selectedIndex].type === 'select' && (
                                <div>
                                    <label className='block font-medium'>Options (comma-seperated)</label>
                                    <input 
                                        value={(formConfig.fields[selectedIndex].options || []).join(', ')}
                                        onChange={(e) => {
                                            handleFieldChange(
                                                { target: {value: e.target.value.split(', ').map(opt => opt.trim()) } }, 
                                                'options'
                                            )
                                        }}
                                        className='border p-2 w-full rounded'
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formConfig.fields[selectedIndex].required || false}
                                onChange={(e) => handleFieldChange(e, 'required')}
                            />
                            <label className="font-medium">Required</label>
                        </div>
                    </div>
                ) : (
                    <div className="col-span-2 p-4 text-gray-500">
                        <p>Select a field to edit or add a new one.</p>
                    </div>
                )}
            </div>  
        </div>
    );
};

export default FormConfigEditor;

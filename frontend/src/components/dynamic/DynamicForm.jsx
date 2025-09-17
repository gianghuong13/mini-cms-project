import { useState, useEffect } from 'react';

const DynamicForm = ({ config, initialData = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(initialData || {});
    }, [JSON.stringify(initialData)]);

	const handleChange = (e, name) => {
		setFormData(prev => ({ ...prev, [name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log("Form submitted with data:", formData);
		onSubmit(formData);
		setFormData({});
	}

    return (
		<form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow-md">
			{config.fields.map((field, index) => (
				<div key={index}>
					<label className="block mb-1 font-medium">{field.label}</label>
					{field.type === 'select' ? (
						<select 
							required={field.required}
							value={formData[field.name] || ''} 
							onChange={(e) => handleChange(e, field.name)} 
							className="border p-2 rounded w-full mb-4"
						>
							<option value="">-- Select --</option>
							{field.options.map((option, idx) => (
								<option key={idx} value={option}>
									{option}
								</option>
							))}
						</select>
					) : (
						<input 
							type={field.type} 
							required={field.required}
							value={formData[field.name] || ''}
							onChange={(e) => handleChange(e, field.name)}
							className="border p-2 rounded w-full mb-4"
						/>
					)}
				</div>
			))}
			<div className="flex justify-end space-x-2">
				<button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
					{initialData?.id ? 'Update' : 'Create'}
				</button>
				{onCancel && (
					<button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}

export default DynamicForm
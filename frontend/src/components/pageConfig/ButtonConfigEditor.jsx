const ButtonConfigEditor = ({ buttonConfig, onChange }) => {
    const handleChange = (e, index, key) => {
        const updated = [...buttonConfig];
        updated[index][key] = e.target.value;
        onChange(updated);
    };

    return (
        <div>
        <h2 className="font-semibold mb-2">Buttons</h2>
        {buttonConfig?.map((btn, index) => (
            <div key={index} className="mb-2">
            <input
                className="border p-2 mr-2"
                value={btn.label}
                onChange={(e) => handleChange(e, index, 'label')}
                placeholder="Label"
            />
            <input
                className="border p-2 mr-2"
                value={btn.action}
                onChange={(e) => handleChange(e, index, 'action')}
                placeholder="Action"
            />
            <input
                className="border p-2"
                value={btn.apiEndpoint}
                onChange={(e) => handleChange(e, index, 'apiEndpoint')}
                placeholder="API Endpoint"
            />
            </div>
        ))}
        </div>
    );
};

export default ButtonConfigEditor;
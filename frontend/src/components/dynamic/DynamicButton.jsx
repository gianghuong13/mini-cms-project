const DynamicButton = ({ buttonConfig = [], onAction }) => {
    return (
        <div className="flex gap-2 mb-4 justify-end">
            {buttonConfig.map((btn, index) => (
                <button
                    key={index}
                    onClick={() => onAction(btn.action)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
};

export default DynamicButton;

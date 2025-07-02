const ModalConfirm = ({ isOpen, message, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md shadow-lg">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-red-500 px-3 py-1 text-white rounded" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
  );
};

export default ModalConfirm;

const Input = ({ value, onChange, onKeyDown, placeholder, type = "text", className = "" }) => {
    return (
        <input 
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`p-2 rounded-md bg-green-200 m-2 ${className}`} 
        />
    );
}

export default Input
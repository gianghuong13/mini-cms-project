const Input = ({ value, onChange, placeholder, type = "text", className = "" }) => {
    return (
        <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`p-2 rounded-md bg-green-200 m-2 ${className}`} 
        />
    );
}

export default Input
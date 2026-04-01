const Input = ({ label, id, className = '', ...props }) => {
  return (
    <label className="block">
      {label ? <span className="mb-2 block text-sm font-medium text-black">{label}</span> : null}
      <input id={id} className={`input-field ${className}`.trim()} {...props} />
    </label>
  );
};

export default Input;

const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
};

const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${variantMap[variant] || variantMap.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

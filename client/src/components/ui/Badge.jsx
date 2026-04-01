const toneMap = {
  red: 'bg-primary-red text-white',
  dark: 'bg-black text-white',
  light: 'bg-white text-black border border-black/10',
  success: 'bg-gold-100 text-gold-700 border border-gold-300',
  danger: 'bg-red-100 text-red-700',
};

const Badge = ({ children, tone = 'red', className = '' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${toneMap[tone] || toneMap.red} ${className}`.trim()}>
      {children}
    </span>
  );
};

export default Badge;

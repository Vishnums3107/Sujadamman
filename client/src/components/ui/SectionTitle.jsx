const SectionTitle = ({ title, subtitle, className = '' }) => {
  return (
    <div className={className}>
      <h2 className="section-title">{title}</h2>
      <div className="section-accent" />
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
};

export default SectionTitle;

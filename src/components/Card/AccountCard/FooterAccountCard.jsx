const FooterAccountCard = ({ onClick, className, hoverColor }) => {
  return (
    <div className={className}>
      <button
        onClick={onClick}
        className={`hover:${hoverColor} rounded-md   px-2`}
      >
        Privacy Policy
      </button>
      <div className="py-1">•</div>
      <button
        onClick={onClick}
        className={`hover:${hoverColor} rounded-md   px-2`}
      >
        Terms of Service
      </button>
    </div>
  );
};

export default FooterAccountCard;

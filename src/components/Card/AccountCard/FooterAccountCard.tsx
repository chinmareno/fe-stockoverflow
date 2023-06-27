interface FooterAccountCardProps {
  className?: string;
  hoverColor?: string;
}

const FooterAccountCard = ({
  className,
  hoverColor,
}: FooterAccountCardProps) => {
  return (
    <div className={className}>
      <button className={`hover:${hoverColor} rounded-md   px-2`}>
        Privacy Policy
      </button>
      <div className="py-1">•</div>
      <button className={`hover:${hoverColor} rounded-md   px-2`}>
        Terms of Service
      </button>
    </div>
  );
};

export default FooterAccountCard;

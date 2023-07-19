import { NumericFormat } from "react-number-format";

const RupiahInput = ({
  value,
  onChange,
}: {
  value: string | number;
  onChange: (value: number | string) => void;
}) => {
  return (
    <NumericFormat
      className="rounded-sm border-2 border-black bg-transparent text-black dark:border-white dark:text-white"
      required
      value={value}
      thousandSeparator={true}
      prefix="Rp "
      onValueChange={(values) => {
        onChange(values.value); // Update the value in the parent component
      }}
    />
  );
};

export default RupiahInput;

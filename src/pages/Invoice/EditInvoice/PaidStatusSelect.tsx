const PaidStatusSelect = ({
  isPaid,
  setIsPaid,
}: {
  isPaid: boolean;
  setIsPaid: (isPaid: boolean) => void;
}) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setIsPaid(true)}
        className={`rounded-md  px-6 py-2 font-extrabold hover:bg-green-500 dark:hover:bg-green-700 ${
          isPaid && "bg-green-500 dark:bg-green-700"
        }`}
      >
        PAID
      </button>
      <button
        onClick={() => setIsPaid(false)}
        className={`rounded-md px-4 py-2 font-extrabold hover:bg-red-500 dark:hover:bg-red-700 ${
          !isPaid && "bg-red-500 dark:bg-red-700"
        }`}
      >
        UNPAID
      </button>
    </div>
  );
};

export default PaidStatusSelect;

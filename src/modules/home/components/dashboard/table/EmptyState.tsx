import FullPageLoader from "../../../../common/components/FullPageLoader";

type SpinnerProps = {
  loading: boolean;
};

const EmptyState = ({ loading }: SpinnerProps) => {
  return (
    <tr>
      <td colSpan={5} className="text-center py-5 text-muted position-relative">
        {loading ? (
          <FullPageLoader loading={loading} />
        ) : (
          "No expenses found."
        )}
      </td>
    </tr>
  );
};

export default EmptyState;
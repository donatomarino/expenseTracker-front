import type { PaymentMethodFieldProps } from '../../../../../types/types';
import { paymentMethodOptions } from '../../dashboard/constants/paymenthMethodOptions';

const PaymentMethodField = ({
  htmlFor,
  id,
  value,
  onChange,
  disabled,
}: PaymentMethodFieldProps) => {
  
  return (
    <div className="mb-3">
      <label
        htmlFor={htmlFor}
        className="form-label fw-semibold text-dark mb-2"
      >
        Payment method
      </label>

      <div className="input-group">
        <span
          className="input-group-text bg-light border-end-0 text-primary"
          aria-hidden="true"
        >
          <i className="bi bi-credit-card fs-5" />
        </span>

        <select
          id={id}
          name="paymentMethod"
          className="form-select border-start-0 rounded-end-3"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {paymentMethodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaymentMethodField;

import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  const isNegativeAmount = amount < 0;

  const convertedAmount = useMemo(() => {
    if (isNegativeAmount) return "Wrong value..."; // Zwracamy komunikat bez konwersji
    if (from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if (from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount, isNegativeAmount]);

  const formattedAmount = useMemo(() => {
    if (isNegativeAmount) return "Wrong value..."; // Zwracamy komunikat bez formatowania
    return formatAmountInCurrency(amount, from);
  }, [amount, from, isNegativeAmount]);

  if (isNegativeAmount) {
    return <div className={styles.result} data-testid="output">Wrong value...</div>;
  }

  return (
    <div className={styles.result} data-testid="output">
      {formattedAmount} = {convertedAmount}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default ResultBox;

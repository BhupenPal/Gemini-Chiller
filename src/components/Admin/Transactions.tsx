import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import styles from '../../styles/components/Admin/AdminDash.module.scss';

export default function Transactions() {
  const [state, setState] = useState({
    details: [],
    refresh: false,
  });

  const getDetails = async () => {
    try {
      setState((prev) => ({ ...prev, refresh: true }));
      const response = await axios.get('/api/shop/getDetails');

      if (response.status === 200 || response.status === 304) {
        setState((prev) => ({ ...prev, details: response.data.details }));
      }
      setState((prev) => ({ ...prev, refresh: false }));
    } catch (err) {
      setState({
        details: [
          {
            _id: '0',
            fullName: 'Error',
            email: '',
            phoneNumber: 'Try Again',
            views: err,
          },
        ],
        refresh: false,
      });
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div className={styles.headFlex}>
        <h1>Transactions</h1>
        <button type="button" onClick={getDetails}>
          {state.refresh ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <table className={`${styles.Table} ${styles.transTable}`}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Amt. Currency</th>
            <th>Amt. Value</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {state.details.map((det) => (
            <tr key={det._id}>
              <td>{det.fullName}</td>
              <td>{det.email}</td>
              <td>{det.address}</td>
              <td>{det.amountCurrency}</td>
              <td>{det.amountValue}</td>
              <td>{det.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.details.length === 0 && (
        <p className={styles.noData}>
          {state.refresh ? 'Refreshing...' : 'No Data!'}
        </p>
      )}
    </>
  );
}

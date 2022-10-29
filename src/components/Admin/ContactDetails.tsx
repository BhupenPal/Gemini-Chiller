import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import styles from '../../styles/components/Admin/AdminDash.module.scss';

export default function ContactDetails() {
  const [state, setState] = useState({
    details: [],
    refresh: false,
  });

  const getDetails = async () => {
    try {
      setState((prev) => ({ ...prev, refresh: true }));
      const response = await axios.get('/api/contact/getDetails');

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
        <h1>Contact Details</h1>
        <button type="button" onClick={getDetails}>
          {state.refresh ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <table className={`${styles.Table} ${styles.contactTable}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {state.details.map((det) => (
            // eslint-disable-next-line no-underscore-dangle
            <tr key={det._id}>
              <td>{det.fullName}</td>
              <td>{det.email}</td>
              <td>{det.phoneNumber}</td>
              <td>{det.views}</td>
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

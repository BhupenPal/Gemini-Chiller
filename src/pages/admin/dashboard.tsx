import { useState, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminContext from '../../utils/context/AdminContext';
import DashNav from '../../components/Admin/DashNav';
import ContactDetails from '../../components/Admin/ContactDetails';
import Transactions from '../../components/Admin/Transactions';
import styles from '../../styles/components/Admin/AdminDash.module.scss';

export default function AdminDash() {
  const router = useRouter();
  const { isAdminAuth, isUpdatingAdminAuth } = useContext(AdminContext);
  const [navBtn, setNavBtn] = useState('Home');

  if (!isAdminAuth && !isUpdatingAdminAuth) {
    router.push('/admin');
  }
  if (isAdminAuth && !isUpdatingAdminAuth) {
    return (
      <>
        <Head>
          <title>Admin Dashboard</title>
        </Head>
        <main className={styles.dashboard}>
          <DashNav setNavBtn={setNavBtn} navBtn={navBtn} />
          <section className={styles.dashContent}>
            {navBtn === 'Home' && (
              <>
                <h1>Welcome To Dashboard!</h1>
              </>
            )}
            {navBtn === 'Contact Details' && <ContactDetails />}
            {navBtn === 'Transactions' && <Transactions />}
          </section>
        </main>
      </>
    );
  }
  return '';
}

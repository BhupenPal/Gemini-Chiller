import { useContext } from 'react';
import AdminContext from '../../utils/context/AdminContext';
import styles from '../../styles/components/Admin/DashNav.module.scss';

export default function DashNav({ setNavBtn, navBtn }: any) {
  const { signOut } = useContext(AdminContext);

  const navButtons = [
    { id: 0, name: 'Home' },
    { id: 1, name: 'Contact Details' },
    { id: 2, name: 'Transactions' },
  ];

  const handleNavBtn = (e: any) => {
    const { navId } = e.currentTarget.dataset;
    setNavBtn(navButtons[navId].name);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();

    const response = await signOut();
    if (response.success) console.log('Logout');
  };

  return (
    <nav className={styles.dashNav}>
      <img src="/images/logo-name.png" alt="Logo" />
      {navButtons.map((btn) => (
        <button
          key={btn.id}
          type="button"
          className={navBtn === btn.name ? styles.active : ''}
          data-nav-id={btn.id}
          onClick={handleNavBtn}
        >
          {btn.name}
        </button>
      ))}
      <div className={styles.divider} />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

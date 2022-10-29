import { useState, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminContext from '../../utils/context/AdminContext';
import styles from '../../styles/pages/Admin.module.scss';

export default function Admin() {
  const router = useRouter();
  const { adminSignIn, isAdminAuth, isUpdatingAdminAuth } =
    useContext(AdminContext);
  const [form, setForm] = useState({
    status: 'Log in',
    disabled: false,
  });

  const handleFormError = () => {
    setForm({
      status: 'Try Again!',
      disabled: false,
    });
    setTimeout(() => {
      setForm({
        status: 'Log in',
        disabled: false,
      });
    }, 5000);
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    setForm({
      status: 'Logging in..',
      disabled: true,
    });
    const formData = new FormData(e.target);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await adminSignIn(email, password);

      if (response.success) {
        setForm({
          status: 'Logged In',
          disabled: false,
        });
        router.push('/admin/dashboard');
      } else {
        handleFormError();
      }
    } catch (err) {
      handleFormError();
    }
  };

  if (isAdminAuth) {
    router.push('/admin/dashboard');
  }
  if (!isAdminAuth && isUpdatingAdminAuth) {
    return '';
  }

  return (
    <main className={styles.admin}>
      <Head>
        <title>Admin | Gemini Chiller</title>
      </Head>
      <h1>Gemini Chiller</h1>
      <form onSubmit={handleForm}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={form.disabled}>
          {form.status}
        </button>
      </form>
    </main>
  );
}

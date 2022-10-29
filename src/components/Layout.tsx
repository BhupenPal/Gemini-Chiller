import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import AdminProvider from './Admin';

export default function Layout({ children }) {
  const ifAdmin = window.location.href.includes('admin');

  return (
    <>
      <AdminProvider>
        {!ifAdmin && <Header />}
        {children}
        {!ifAdmin && <Footer />}
      </AdminProvider>
    </>
  );
}

// DEFINING PROP TYPES AND DEFAULT PROPS
Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

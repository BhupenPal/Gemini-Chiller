import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import AdminContext from '../../utils/context/AdminContext';
import { GetLSWithExpiry, SetLSWithExpiry } from '../../utils/helper';

export default function AdminProvider({ children }) {
  const [state, setState] = useState({
    user: { fullName: null, email: null },
    isAdminAuth: false,
    isUpdatingAdminAuth: true,
  });

  const adminSignIn = async (email: string, password: string) => {
    const response = await axios.post('api/admin/login', { email, password });

    if (response.status === 200 || response.status === 304) {
      setState((prevState) => ({
        ...prevState,
        user: response.data,
        isAdminAuth: true,
      }));
      SetLSWithExpiry('isAdminAuth', 'true', 2592000000);
      return {
        success: true,
        error: undefined,
        data: response,
      };
    }
    return {
      success: false,
      error: response.data,
    };
  };

  const signOutHelper = () => {
    window.localStorage.removeItem('isAdminAuth');
    setState({
      user: { fullName: null, email: null },
      isAdminAuth: false,
      isUpdatingAdminAuth: false,
    });
  };

  const signOut = async () => {
    try {
      const response = await axios.delete('api/admin/logout');

      if (response.status === 200 || response.status === 400) {
        signOutHelper();
        return {
          success: true,
          error: undefined,
          data: response.data,
        };
      }
      return {
        success: false,
        error: 'Unable to signout',
        data: response.data,
      };
    } catch (error) {
      signOutHelper();
      return {
        success: true,
        error: undefined,
        data: undefined,
      };
    }
  };

  const getRefreshToken = async () => {
    try {
      const refresh = await axios.get('api/refreshToken');

      if (refresh.status === 200 || refresh.status === 204 || refresh.status === 304) {
        setState((prevState) => ({
          ...prevState,
          user: refresh.data,
          isAdminAuth: true,
          isUpdatingAdminAuth: false,
        }));
      } else {
        signOut();
        window.localStorage.removeItem('isAdminAuth');
      }
    } catch (error) {
      signOut();
      window.localStorage.removeItem('isAdminAuth');
    }
  };

  useEffect(() => {
    const init = async () => {
      if (GetLSWithExpiry('isAdminAuth') === true || state.isAdminAuth) {
        setState((prevState) => ({ ...prevState, isAdminAuth: true }));
        getRefreshToken();
      } else {
        setState((prevState) => ({
          ...prevState,
          isAdminAuth: false,
          isUpdatingAdminAuth: false,
        }));
        window.localStorage.removeItem('isAdminAuth');
      }
    };
    init();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        ...state,
        adminSignIn,
        getRefreshToken,
        signOut,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// DEFINING PROP TYPES AND DEFAULT PROPS
AdminProvider.propTypes = {
  children: PropTypes.node,
};

AdminProvider.defaultProps = {
  children: null,
};

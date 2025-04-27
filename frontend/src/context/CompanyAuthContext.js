import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  company: null,
  error: null
};

// Create context
const CompanyAuthContext = createContext(initialState);

// Reducer
const companyAuthReducer = (state, action) => {
  switch (action.type) {
    case 'COMPANY_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        company: action.payload
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('accountType', 'company');
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'AUTH_ERROR':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('accountType');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        company: null,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Provider component
export const CompanyAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyAuthReducer, initialState);

  // Load company
  useEffect(() => {
    const loadCompany = async () => {
      if (localStorage.getItem('token') && localStorage.getItem('accountType') === 'company') {
        setAuthToken(localStorage.getItem('token'));

        try {
          const res = await axios.get('http://localhost:8000/api/companies/me');

          dispatch({
            type: 'COMPANY_LOADED',
            payload: res.data
          });
        } catch (err) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    loadCompany();
  }, []);

  // Set auth token
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Register company
  const registerCompany = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('http://localhost:8000/api/companies/register', formData, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadCompany();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Login company
  const loginCompany = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('http://localhost:8000/api/companies/login', formData, config);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadCompany();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Clear errors
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <CompanyAuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        company: state.company,
        error: state.error,
        registerCompany,
        loginCompany,
        logout,
        clearError
      }}
    >
      {children}
    </CompanyAuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useCompanyAuth = () => useContext(CompanyAuthContext);
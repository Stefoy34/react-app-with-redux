import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import { setIsPreloadActionCreator } from '../isPreload/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      dispatch(hideLoading());
      return true;
    } catch (error) {
      alert(error.message);
      dispatch(hideLoading());
      return false;
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      alert('Registrasi berhasil! Silakan login.');
      dispatch(hideLoading());
      return true;
    } catch (error) {
      alert(error.message);
      dispatch(hideLoading());
      return false;
    }
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch {
      dispatch(unsetAuthUserActionCreator());
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  asyncPreloadProcess,
};

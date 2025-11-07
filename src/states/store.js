import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar';
import authUserReducer from './auth/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardsReducer from './leaderboards/reducer';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

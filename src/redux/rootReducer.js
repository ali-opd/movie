import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import movieReduer from './slices/movies';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const moviePersistConfig = {
  key: 'movie',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  movie: persistReducer(moviePersistConfig, movieReduer),
});

export { rootReducer, rootPersistConfig };

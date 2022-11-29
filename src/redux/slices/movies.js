import { createSlice } from '@reduxjs/toolkit';

import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  movies: [],
  selectedMovie: null,
  favorites: [],
};

const slice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // Start loading
    startLoading(state) {
      state.isLoading = true;
    },

    // Has error
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Get movies
    getMoviesSuccess(state, action) {
      state.isLoading = false;
      state.movies = action.payload;
    },

    // Get selected movie
    getSelectedMovieSuccess(state, action) {
      state.isLoading = false;
      state.selectedMovie = action.payload;
    },

    // Add movie to favorites
    addToFavorites(state, action) {
      state.favorites = [action.payload, ...state.favorites];
    },

    // Remove movie from favorites
    removeToFavorites(state, action) {
      console.log({ action });
      state.favorites = state.favorites.filter(
        (item) => item.imdbID !== action.payload.imdbID
      );
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getMoviesSuccess,
  getSelectedMovieSuccess,
  addToFavorites,
  removeToFavorites,
} = slice.actions;

export function getMovies(s) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/', {
        params: { s },
      });
      dispatch(slice.actions.getMoviesSuccess(response.data.Search));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSelectedMovie(movie) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(``, {
        params: { i: movie.imdbID },
      });

      console.log({ response });

      dispatch(slice.actions.getSelectedMovieSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

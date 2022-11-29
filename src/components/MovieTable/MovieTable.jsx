import { useState } from 'react';
import { Table, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

import { useDispatch, useSelector } from '../../redux/store';
import {
  getSelectedMovie,
  addToFavorites,
  removeToFavorites,
} from '../../redux/slices/movies';

import Overlay from '../Overlay';
import Card from '../Card';
import LoveButton from '../LoveButton/LoveButton';

export default function MovieTable({ movies }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { selectedMovie, isLoading, favorites } = useSelector(
    (state) => state.movie
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFavoriteClick = (isFavoritedMovie, data) => {
    if (isFavoritedMovie > -1) {
      dispatch(removeToFavorites(data));
    } else {
      dispatch(addToFavorites(data));
    }
  };

  return (
    <>
      <Table hover size='sm'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>imDB ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((m, index) => (
            <TableRow
              movie={m}
              key={index}
              handleShow={handleShow}
              favorites={favorites}
              handleFavoriteClick={handleFavoriteClick}
            />
          ))}
        </tbody>
      </Table>

      <AnimatePresence>
        {show && selectedMovie && !isLoading && (
          <Overlay close={handleClose}>
            <Card data={selectedMovie} />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}

const RowAnimate = ({ children }) => (
  <motion.div
    initial={{ x: '200vw' }}
    animate={{
      x: 0,
      transition: {
        ease: [0.43, 0.13, 0.23, 0.96],
        type: 'spring',
        bounce: 0.4,
      },
    }}
    exit={{
      x: '200vw',
    }}
  >
    {children}
  </motion.div>
);

const TableRow = ({ movie, handleShow, handleFavoriteClick, favorites }) => {
  const dispatch = useDispatch();

  const isFavoritedMovie = favorites.findIndex(
    (f) => f.imdbID === movie.imdbID
  );

  const handleClick = () => {
    dispatch(getSelectedMovie(movie));
    handleShow();
  };

  return (
    <tr>
      <td>
        <RowAnimate>
          <Nav.Link onClick={handleClick} className='p-0'>
            {movie.Title}
          </Nav.Link>
        </RowAnimate>
      </td>
      <td>
        <RowAnimate>{movie.Year}</RowAnimate>
      </td>
      <td>
        <RowAnimate>{movie.imdbID}</RowAnimate>
      </td>
      <td>
        <RowAnimate>
          <LoveButton
            isActive={isFavoritedMovie > -1}
            onClick={() => handleFavoriteClick(isFavoritedMovie, movie)}
          />
        </RowAnimate>
      </td>
    </tr>
  );
};

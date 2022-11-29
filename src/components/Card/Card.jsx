import { motion } from 'framer-motion';
import ReactStars from 'react-rating-stars-component';
import { Rating } from 'react-simple-star-rating';
import { useDispatch, useSelector } from '../../redux/store';
import { addToFavorites, removeToFavorites } from '../../redux/slices/movies';

import './cardStyle.css';

export default function Card({ data }) {
  const { Poster, Title, Plot, Type, imdbRating, imdbID } = data;

  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state.movie);

  const isFavoritedMovie = favorites.findIndex((f) => f.imdbID === imdbID);

  console.log({ isFavoritedMovie });

  const articleVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  const pictureVariants = {
    open: { opacity: 1, y: '0vh' },
    closed: { opacity: 0, y: '-10vh' },
  };

  const movieInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.2 } },
    closed: { opacity: 0 },
  };

  const rowVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '10%' },
  };

  const handleClick = () => {
    if (isFavoritedMovie > -1) {
      dispatch(removeToFavorites(data));
    } else {
      dispatch(addToFavorites(data));
    }
  };

  return (
    <motion.div
      variants={articleVariants}
      className='article-container'
      onClick={(e) => e.stopPropagation()}
    >
      <motion.picture variants={pictureVariants}>
        <source media='(min-width: 616px)' srcSet={Poster} />
        <img src={Poster} alt='Photo of a bottle of Y Eau de Toilette<' />
      </motion.picture>
      <motion.div variants={movieInfoVariants} className='card-main-content'>
        <motion.span variants={rowVariants} className='card-category'>
          {Type?.toUpperCase()}
        </motion.span>
        <motion.h1 variants={rowVariants} className='card-heading'>
          {Title}
        </motion.h1>
        <motion.p variants={rowVariants} className='card-description'>
          {Plot}
        </motion.p>
        <motion.div variants={rowVariants} className='mb-4'>
          <ReactStars
            count={10}
            edit={false}
            value={Number(imdbRating)}
            isHalf
            size={24}
            activeColor='#ffd700'
          />
          <span>{Number(imdbRating)}</span>
        </motion.div>
        <motion.button className='btn btn-primary' onClick={handleClick}>
          {isFavoritedMovie > -1 ? 'Remove from Favorites' : 'Add to Favorites'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

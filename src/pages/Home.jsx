import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

import MovieTable from '../components/MovieTable/MovieTable';
import Searchbox from '../components/Searchbox';
import Section from '../components/Section';

export default function Home() {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState([]);
  const [debouncedText] = useDebounce(text, 500);

  console.log({ movies });

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (debouncedText) {
      fetchRecipes(debouncedText, source.token)
        .then(setMovies)
        .catch((e) => {
          if (axios.isCancel(source)) {
            return;
          }
          setMovies([]);
        });
    } else {
      setMovies([]);
    }

    return () => {
      source.cancel(
        'Canceled because of component unmounted or debounce Text changed'
      );
    };
  }, [debouncedText]);

  return (
    <Container>
      <Section>
        <Searchbox onChange={(e) => setText(e.target.value)} />

        <MovieTable movies={movies} />
      </Section>
    </Container>
  );
}

function fetchRecipes(text, token) {
  return axios
    .get('https://www.omdbapi.com/?apikey=12573023&s=' + text, {
      cancelToken: token,
    })
    .then(({ data }) => data.Search);
}

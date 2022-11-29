import { Container } from 'react-bootstrap';
import MovieTable from '../components/MovieTable/MovieTable';
import { useSelector } from '../redux/store';

export default function Favorites() {
  const { favorites } = useSelector((state) => state.movie);
  return (
    <Container className='py-4'>
      <MovieTable movies={favorites} />
    </Container>
  );
}

import { useRoutes } from 'react-router-dom';

import Main from '../layout/Main';

import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Main />,
      children: [
        { element: <Home />, index: true },
        { element: <Favorites />, path: '/favorites' },
      ],
    },
  ]);
}

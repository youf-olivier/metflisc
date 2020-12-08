import MoviesList from 'MoviesList';
import MovieDetail from 'MovieDetail';

export type RouteType = {
  name: string;
  component: React.ComponentType<any>;
  title: string;
  path: string;
};

const routes: RouteType[] = [
  {
    name: 'Home',
    path: '/',
    component: MoviesList,
    title: 'Movies',
  },
  {
    name: 'MovieDetail',
    path: '/detail/:id',
    component: MovieDetail,
    title: 'Details',
  },
];

export default routes;

import { BrowserRouter, Route } from 'react-router-dom';
import Header from 'shared/components/Header';

import routes, { RouteType } from './Routes.constants';

type GenericLayoutProps = {
  route: RouteType;
};

export const getRoutePath = (name: string) =>
  routes.find(p => p.name === name)?.path || '/';

const GenericLayout = ({ route }: GenericLayoutProps) => (
  <>
    <Header>{route.title}</Header>
    <route.component />
  </>
);

const Routes = () => {
  return (
    <BrowserRouter>
      {routes.map(route => (
        <Route key={route.name} exact path={route.path}>
          <GenericLayout route={route} />
        </Route>
      ))}
    </BrowserRouter>
  );
};

export default Routes;

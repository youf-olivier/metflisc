import { BrowserRouter, Route } from 'react-router-dom';

import routes, { RouteType } from './Routes.constants';

type GenericLayoutProps = {
  route: RouteType;
};

const GenericLayout = ({ route }: GenericLayoutProps) => (
  <>
    <h1>{route.title}</h1>
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

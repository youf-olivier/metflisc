import { BrowserRouter, Route } from 'react-router-dom';
import Header from 'shared/components/Header';

import routes, { RouteType } from './Routes.constants';

type GenericLayoutProps = {
  route: RouteType;
};

export const getRoutePath = (name: string, param?: string) => {
  const regex = /(\/:)\w+/g;
  let path = routes.find(p => p.name === name)?.path || '/';
  path = param ? path.replace(regex, `/${param}`) : path;
  return path;
};

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

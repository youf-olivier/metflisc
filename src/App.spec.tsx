import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import configuration from 'configuration.json';
import fixture from './Movies.fixture.json';
import App from './App';

const server = setupServer(
  rest.get(
    `${configuration.tmdbUrl}/${configuration.api.popularEnpoint}`,
    (req, res, ctx) => {
      return res(ctx.json(fixture.moviesList));
    },
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('App tests suite', () => {
  it('Should render without crashing', async () => {
    const { asFragment } = render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should list all movies ', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    expect(screen.getAllByRole('listitem')).toHaveLength(20);
  });
  it('Should go to detail when click on a movie', () => {});
  it('Should display filtered list when serach a movie', () => {});
  it('Should back to home when click on back button', async () => {
    render(<App />);
    const homeHeader = screen.getByRole('heading', { name: /Movie/i });
    expect(homeHeader).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    UserEvent.click(screen.getAllByRole('listitem')[0]);

    const detailHeader = screen.getByRole('heading', { name: /Détail/i });
    expect(
      screen.queryByRole('heading', { name: /Movie/i }),
    ).not.toBeInTheDocument();
    expect(detailHeader).toBeInTheDocument();
  });
});

import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';
import { StaticRouter } from 'react-router';
import ThemeProvider from 'shared/components/ThemeProvider';

import MoviesList from './MoviesList';

describe('MoviesList tests suite', () => {
  const wrapper: FC<{}> = ({ children }) => (
    <StaticRouter context={{}}>
      <ThemeProvider>{children}</ThemeProvider>
    </StaticRouter>
  );

  it('should render without crashing', () => {
    const { asFragment } = render(<MoviesList />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display list of films when search a movie', async () => {
    render(<MoviesList />, { wrapper });
    await waitForElementToBeRemoved(() =>
      screen.getByRole('alert', { name: /loader/i }),
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(20);

    userEvent.type(screen.getByRole('textbox'), 'babar');
    screen.getByRole('alert', { name: /loader/i });
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3),
    );
  });

  it('should reset search and field when click on clear button ', async () => {
    render(<MoviesList />, { wrapper });
    await waitForElementToBeRemoved(() =>
      screen.getByRole('alert', { name: /loader/i }),
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(20);
    userEvent.type(screen.getByRole('textbox'), 'babar');
    screen.getByRole('alert', { name: /loader/i });

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3),
    );

    userEvent.click(screen.getByRole('button', { name: /clear search/i }));

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(20),
    );
  });
});

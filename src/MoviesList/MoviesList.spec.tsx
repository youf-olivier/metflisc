import {
  render,
  screen,
  waitForElementToBeRemoved,
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
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    expect(screen.getAllByRole('listitem')).toHaveLength(20);
    userEvent.type(screen.getByRole('textbox'), 'Babar');
    expect(screen.getAllByRole('listitem')).toHaveLength(20);
    userEvent.type(screen.getByRole('textbox'), '{enter}');
    screen.getByText(/pending/i);
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});

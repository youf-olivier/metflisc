import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import { FC } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ThemeProvider from 'shared/components/ThemeProvider';
import MovieDetail from './MovieDetail';

describe('MovieDetail tests suite', () => {
  const history = createMemoryHistory({ initialEntries: ['/detail/1234'] });
  const wrapper: FC<{}> = ({ children }) => (
    <ThemeProvider>
      <Router history={history}>{children}</Router>
    </ThemeProvider>
  );

  it('should render without crashing', async () => {
    const { asFragment } = render(<MovieDetail />, { wrapper });
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    expect(asFragment()).toMatchSnapshot();
  });
});

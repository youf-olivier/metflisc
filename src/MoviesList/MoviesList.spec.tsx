import { render } from '@testing-library/react';
import { FC } from 'react';
import ThemeProvider from 'shared/components/ThemeProvider';

import MoviesList from './MoviesList';

describe('MoviesList tests suite', () => {
  const wrapper: FC<{}> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('should render without crashing', () => {
    const { asFragment } = render(<MoviesList />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});

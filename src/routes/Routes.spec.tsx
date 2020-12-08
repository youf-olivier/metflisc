import { render, screen } from '@testing-library/react';
import { FC } from 'react';
import ThemeProvider from 'shared/components/ThemeProvider';
import Routes, { getRoutePath } from './Routes';

describe('Router tests suite', () => {
  const wrapper: FC<{}> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );
  it('should render without crashing', () => {
    render(<Routes />, { wrapper });
    expect(screen.getByRole('heading')).toHaveTextContent(/Movies/i);
  });

  it('should find route by name', () => {
    expect(getRoutePath('Home')).toEqual('/');
    expect(getRoutePath('MovieDetail')).toEqual('/detail');
    expect(getRoutePath('Other')).toEqual('/');
  });
});

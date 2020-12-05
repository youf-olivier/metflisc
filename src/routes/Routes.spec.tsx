import { render, screen } from '@testing-library/react';
import Routes from './Routes';

describe('Router tests suite', () => {
  it('should render without crashing', () => {
    render(<Routes />);
    expect(screen.getByRole('heading')).toHaveTextContent(/Liste des films/i);
  });
});

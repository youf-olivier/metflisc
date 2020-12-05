import { render } from '@testing-library/react';

import MovieDetail from './MovieDetail';

describe('MovieDetail tests suite', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(<MovieDetail />);
    expect(asFragment()).toMatchSnapshot();
  });
});

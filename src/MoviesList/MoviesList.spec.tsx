import { render } from '@testing-library/react';

import MoviesList from './MoviesList';

describe('MoviesList tests suite', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(<MoviesList />);
    expect(asFragment()).toMatchSnapshot();
  });
});

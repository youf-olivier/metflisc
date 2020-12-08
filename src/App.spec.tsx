import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import App from './App';

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
  it('Should go to detail when click on a movie', async () => {
    render(<App />);
    const homeHeader = screen.getByRole('heading', { name: /Movie/i });
    expect(homeHeader).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    UserEvent.click(screen.getAllByRole('listitem')[0]);

    const detailHeader = screen.getByRole('heading', { name: /Detail/i });
    expect(
      screen.queryByRole('heading', { name: /Movie/i }),
    ).not.toBeInTheDocument();
    expect(detailHeader).toBeInTheDocument();
  });

  it('Should back to home when click on back button', async () => {
    render(<App />);
    const homeHeader = screen.getByRole('heading', { name: /Movie/i });
    expect(homeHeader).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    UserEvent.click(screen.getAllByRole('listitem')[0]);
    await waitForElementToBeRemoved(() => screen.getByText(/pending/i));
    UserEvent.click(screen.getByRole('link', { name: /back link/ }));
    const homeHeaderbck = screen.getByRole('heading', { name: /Movie/i });
    expect(homeHeaderbck).toBeInTheDocument();
  });
});

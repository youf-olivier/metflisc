import styled from 'styled-components';
import { render, screen } from '@testing-library/react';
import { FC, useContext } from 'react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, { ThemeContext } from './ThemeProvider';

const StyledDiv = styled.div`
  background-color: ${props => props.theme.colors.header};
  color: ${props => props.theme.colors.background};
`;

beforeEach(() => {
  localStorage.clear();
});

const AppTest: FC<{}> = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
      <StyledDiv data-testid="styleddiv">Application test</StyledDiv>
    </>
  );
};

describe('ThemeProvider tests suite', () => {
  const wrapper: FC<{}> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );
  it('should apply global theme with light mode', () => {
    render(<AppTest />, { wrapper });
    const styleddiv = screen.getByTestId('styleddiv');
    expect(styleddiv).toHaveStyleRule('background-color', '#60A5FA');
    expect(styleddiv).toHaveStyleRule('color', '#FFFFF');
  });

  it('should apply global theme with dark mode', () => {
    localStorage.setItem('theme', 'dark');
    render(<AppTest />, { wrapper });
    const styleddiv = screen.getByTestId('styleddiv');
    expect(styleddiv).toHaveStyleRule('background-color', '#1F2937');
    expect(styleddiv).toHaveStyleRule('color', '#4B5563');
  });

  it('should apply global theme with dark mode when toggle theme', () => {
    render(<AppTest />, { wrapper });
    expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'light');
    userEvent.click(screen.getByText(/toggle theme/i));
    expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'dark');
    const styleddiv = screen.getByTestId('styleddiv');
    expect(styleddiv).toHaveStyleRule('background-color', '#1F2937');
    expect(styleddiv).toHaveStyleRule('color', '#4B5563');
  });

  it('should apply global theme with light mode when click twice on button', () => {
    render(<AppTest />, { wrapper });
    const styleddiv0 = screen.getByTestId('styleddiv');
    expect(styleddiv0).toHaveStyleRule('background-color', '#60A5FA');
    expect(styleddiv0).toHaveStyleRule('color', '#FFFFF');
    userEvent.click(screen.getByText(/toggle theme/i));
    const styleddiv = screen.getByTestId('styleddiv');
    expect(styleddiv).toHaveStyleRule('background-color', '#1F2937');
    expect(styleddiv).toHaveStyleRule('color', '#4B5563');
    userEvent.click(screen.getByText(/toggle theme/i));
    const styleddiv2 = screen.getByTestId('styleddiv');
    expect(styleddiv2).toHaveStyleRule('background-color', '#60A5FA');
    expect(styleddiv2).toHaveStyleRule('color', '#FFFFF');
  });
});

import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeModeSelector from './ThemeModeSelector';

const StyledHeader = styled.h1`
  color: #fff;
  font-size: 1.4em;
  font-weight: 500;
  flex-grow: 1;
  text-align: center;
  display: inline-block;
`;

const StyledDiv = styled.div`
  background-color: ${props => props.theme.colors.header};
  text-align: center;
  position: relative;
`;

const CustomBackLink = styled(Link)`
  color: #ffffff;
  align-items: center;
  display: inline-block;
  text-decoration: none;
  position: absolute;
  left: 0.5em;
  top: 50%;
  transform: translate(0, -50%);
`;

type HeaderType = {
  children: string;
};

const Header: FC<HeaderType> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  return (
    <StyledDiv>
      {!isHome && (
        <CustomBackLink to="/">
          <i className="material-icons">arrow_back_ios_new</i>
        </CustomBackLink>
      )}
      <StyledHeader>{children}</StyledHeader>
      <ThemeModeSelector />
    </StyledDiv>
  );
};

export default Header;

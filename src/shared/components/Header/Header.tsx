import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomBackLink, StyledDiv, StyledHeader } from './Header.styled';
import ThemeModeSelector from './ThemeModeSelector';

type HeaderType = {
  children: string;
};

const Header: FC<HeaderType> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  return (
    <StyledDiv>
      {!isHome && (
        <CustomBackLink to="/" aria-label="back link">
          <i className="material-icons">arrow_back_ios_new</i>
        </CustomBackLink>
      )}
      <StyledHeader>{children}</StyledHeader>
      <ThemeModeSelector />
    </StyledDiv>
  );
};

export default Header;

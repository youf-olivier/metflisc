import { FC, useContext } from 'react';

import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';
import { ThemeContext } from 'shared/components/ThemeProvider';

const StyleSwitch = styled(Switch)``;

const StyledIcon = styled.i`
  color: #ffffff;
  vertical-align: middle;
`;

const StyledContainer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0.5em;
  top: 50%;
  transform: translate(0, -50%);
`;

const ThemeModeSelector: FC = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <StyledContainer>
      <StyledIcon className="material-icons">wb_sunny</StyledIcon>
      <StyleSwitch
        defaultChecked
        size="small"
        color="default"
        className="material-icons"
        onClick={toggleTheme}
      />
      <StyledIcon className="material-icons">brightness_3</StyledIcon>
    </StyledContainer>
  );
};

export default ThemeModeSelector;

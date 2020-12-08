import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.h1`
  color: #fff;
  font-size: 1.4em;
  font-weight: 500;
  flex-grow: 1;
  text-align: center;
  display: inline-block;
`;

export const StyledDiv = styled.div`
  background-color: ${props => props.theme.colors.header};
  text-align: center;
  position: relative;
  margin-bottom: 0.5em;
`;

export const CustomBackLink = styled(Link)`
  color: #ffffff;
  align-items: center;
  display: inline-block;
  text-decoration: none;
  position: absolute;
  left: 0.5em;
  top: 50%;
  transform: translate(0, -50%);
`;

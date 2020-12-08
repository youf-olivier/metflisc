import { device } from 'shared/utilities/devise.constants';
import styled from 'styled-components';

export const StyledImage = styled.img`
  width: 48%;
  margin: 0.1em;
  @media ${device.tablet} {
    width: 24%;
  }

  @media ${device.laptop} {
    width: 18%;
  }
`;

export const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  padding: 1em 0.2em;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  color: ${props => props.theme.colors.font};
  @media ${device.tablet} {
    align-items: flex-start;
    flex-direction: row;
    max-width: 950px;
    margin: auto;
  }
`;

export const StyledSection = styled.section`
  margin: 1em;
  @media ${device.tablet} {
    width: 70%;
  }
`;

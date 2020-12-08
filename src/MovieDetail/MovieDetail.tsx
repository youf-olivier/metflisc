import { MovieType } from 'Movie.type';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useXhr } from 'shared/utilities/fetch';
import configuration from 'configuration.json';
import styled from 'styled-components';
import { device } from 'shared/utilities/devise.constants';

const StyledImage = styled.img`
  width: 48%;
  margin: 0.1em;
  @media ${device.tablet} {
    width: 24%;
  }

  @media ${device.laptop} {
    width: 18%;
  }
`;

const StyledArticle = styled.article`
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

const StyledSection = styled.section`
  margin: 1em;
  @media ${device.tablet} {
    width: 70%;
  }
`;

const MovieDetail: FC<{}> = () => {
  const { id } = useParams<{ id: string }>();

  const { get, data, status } = useXhr();
  const movie = data as MovieType;
  useEffect(() => {
    get(`${configuration.api.getEnpoint}/${id}`);
  }, [get, id]);
  return status === 'RESOLVED' ? (
    <StyledArticle>
      <StyledSection>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>{`${movie.vote_average}/10`}</p>
      </StyledSection>
      <StyledImage src={`${configuration.imageTmdbUrl}/${movie.poster_path}`} />
    </StyledArticle>
  ) : (
    <span>Pending...</span>
  );
};

export default MovieDetail;

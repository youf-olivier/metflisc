import { MovieType } from 'Movie.type';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useXhr } from 'shared/utilities/fetch';
import configuration from 'configuration.json';
import {
  StyledArticle,
  StyledImage,
  StyledSection,
} from './MovieDetail.styled';

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

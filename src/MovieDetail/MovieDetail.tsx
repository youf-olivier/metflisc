import { MovieType } from 'Movie.types';
import { FC } from 'react';

type MovieDetailProps = MovieType;

const MovieDetail: FC<MovieDetailProps> = ({
  title,
  overview,
  popularity,
  posterPath,
  releaseDate,
}) => (
  <>
    <span>Page Détail</span>
    <span>{title}</span>
    <span>{overview}</span>
    <span>{popularity}</span>
    <span>{posterPath}</span>
    <span>{releaseDate}</span>
  </>
);

export default MovieDetail;

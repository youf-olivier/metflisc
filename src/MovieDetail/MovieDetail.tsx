import { FC } from 'react';

type MovieDetailProps = {
  title: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: Date;
};

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

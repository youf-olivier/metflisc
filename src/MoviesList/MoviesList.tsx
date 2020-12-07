import { FC, useEffect } from 'react';
import { useXhr } from 'shared/fetch';
import configuration from 'configuration.json';
import { MovieType } from 'Movie.types';

type MoviesListProps = {};

const MoviesList: FC<MoviesListProps> = () => {
  const { get, data, status } = useXhr();
  useEffect(() => {
    get(configuration.api.popularEnpoint);
  }, [get]);

  return status === 'RESOLVED' ? (
    <ul>
      {data?.results?.map((movie: MovieType) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  ) : (
    <span>Pending...</span>
  );
};

export default MoviesList;

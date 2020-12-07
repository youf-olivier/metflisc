import configuration from 'configuration.json';
import { useCallback } from 'react';
import { useAsync } from './asyncHook';

const extendedFetch = (
  token: string,
  tmdbUrl: string,
  fetchInjected: typeof fetch,
) => {
  const headers = new Headers({
    accept: 'aplication/json',
  });

  headers.set('Authorization', `Bearer ${token}`);

  return (method: 'GET' | 'POST') => async (apiUrl: string) =>
    fetchInjected(`${tmdbUrl}/${apiUrl}`, {
      headers,
      method,
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
        if (data) {
          return data;
        }
        return Promise.reject(new Error('Auncun résultat'));
      }

      return Promise.reject(
        new Error(response?.statusText ?? 'Une erreur est survenue'),
      );
    });
};

export const useXhr = (
  tmdbUrlInjected = configuration.tmdbUrl,
  tokenInjected = configuration.V4BearerToken,
  fetchInjected = fetch,
) => {
  const { error, status, data, run } = useAsync();

  const get = useCallback(
    url =>
      run(
        extendedFetch(tokenInjected, tmdbUrlInjected, fetchInjected)('GET')(
          url,
        ),
      ),
    [fetchInjected, run, tmdbUrlInjected, tokenInjected],
  );
  return { get, error, status, data };
};

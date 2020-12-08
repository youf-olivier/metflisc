/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-styled-components';
import 'jest-localstorage-mock';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import configuration from 'configuration.json';
import fixture from './Movies.fixture.json';

const server = setupServer(
  rest.get(
    `${configuration.tmdbUrl}/${configuration.api.popularEnpoint}`,
    (req, res, ctx) => {
      return res(ctx.json(fixture.moviesList));
    },
  ),
  rest.get(
    `${configuration.tmdbUrl}/${configuration.api.getEnpoint}/*`,
    (req, res, ctx) => {
      return res(ctx.json(fixture.moviesList.results[0]));
    },
  ),
  rest.get(
    `${configuration.tmdbUrl}/${configuration.api.popularEnpoint}`,
    (req, res, ctx) => {
      return res(ctx.json(fixture.moviesList));
    },
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

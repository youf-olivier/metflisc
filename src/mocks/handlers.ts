import { rest } from 'msw';

export const handlers = [
  rest.get('/api/subscriber*', (req, res, ctx) => res(ctx.status(200))),
  rest.get('/api/entreprises*', (req, res, ctx) => res(ctx.status(200))),
];

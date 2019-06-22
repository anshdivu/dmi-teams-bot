import express from 'express';
import request from 'supertest';
import indexRouter from './index';

describe('index route', () => {
  it('returns title', async () => {
    const app = express().use('/', indexRouter);

    const response = await request(app).get('/');

    expect(response.body).toEqual({ title: 'Express' });
  });
});

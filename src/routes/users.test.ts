import express from 'express';
import request from 'supertest';
import usersRouter from './users';

describe('users route', () => {
  it('returns "respond with a resource"', async () => {
    const app = express().use('/', usersRouter);

    const response = await request(app).get('/');

    expect(response.text).toEqual('respond with a resource');
  });
});

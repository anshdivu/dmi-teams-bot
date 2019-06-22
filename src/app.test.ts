import express from 'express';
import request from 'supertest';
import app from './app';

describe('express app', () => {
  it('has a root route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });

  it('has a `/users` route', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });
});

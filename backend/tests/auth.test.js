const request = require('supertest');
const app = require('../server');  

describe('Auth Routes', () => {
  it('should signup a new user', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      username: 'testuser',
      password: 'testpass',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpass',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

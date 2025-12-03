// test/integration/localServer.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const app = require('../../src/localServer');
const { expect } = chai;
chai.use(chaiHttp);

const DB_PATH = path.join(__dirname, '..', '..', 'db.json');

describe('Local JSON API integration tests', () => {
  let originalDB;

  before(() => {
    originalDB = fs.readFileSync(DB_PATH, 'utf8');
  });

  afterEach(() => {
    fs.writeFileSync(DB_PATH, originalDB); // restaura o conteúdo original após cada teste
  });

  it('GET /api/users should return array of users', async () => {
    const res = await chai.request(app).get('/api/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('name');
  });

  it('POST /api/posts should create a new post', async () => {
    const newPost = { userId: 1, title: 'Novo Post', body: 'Corpo' };
    const res = await chai.request(app).post('/api/posts').send(newPost);
    expect(res).to.have.status(201);
    expect(res.body).to.include.keys('id', 'title', 'userId');
  });

  it('GET /api/posts/:id/comments should return comments for a post', async () => {
    const res = await chai.request(app).get('/api/posts/1/comments');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('PATCH /api/todos/:id should update todo completion status', async () => {
    const res = await chai.request(app)
      .patch('/api/todos/1')
      .send({ completed: true });

    expect(res).to.have.status(200);
    expect(res.body.completed).to.be.true;
  });
});

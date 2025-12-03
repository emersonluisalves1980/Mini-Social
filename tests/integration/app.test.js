// test/integration/app.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const axios = require('axios');
const app = require('../../src/app');
const { expect } = chai;
chai.use(chaiHttp);

describe('App integration tests (routes)', () => {
  afterEach(() => sinon.restore());

  it('GET /health should return ok', async () => {
    const res = await chai.request(app).get('/health');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ ok: true });
  });

  it('GET /users should return users (stubbed axios)', async () => {
    const fake = [{ id: 1, name: 'Stub User' }];
    sinon.stub(axios, 'get').resolves({ data: fake });

    const res = await chai.request(app).get('/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].name).to.equal('Stub User');
  });

  it('POST /posts/fake should create a fake post', async () => {
    const postData = { userId: 3, title: 'Hi', body: 'x' };
    const res = await chai.request(app).post('/posts/fake').send(postData);
    expect(res).to.have.status(201);
    expect(res.body).to.include.keys('id', 'userId', 'title');
    expect(res.body.userId).to.equal(3);
  });
});

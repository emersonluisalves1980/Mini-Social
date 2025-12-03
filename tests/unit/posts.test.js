// test/unit/posts.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const posts = require('../../src/posts');

describe('Posts module - unit', () => {
  afterEach(() => sinon.restore());

  it('createFakePost returns object with userId and title', () => {
    const p = posts.createFakePost(5, 'hello', 'body');
    expect(p).to.include.keys('userId', 'title', 'id');
    expect(p.userId).to.equal(5);
  });

  it('postsByUser calls axios.get with params', async () => {
    const fake = [{ id: 1, userId: 2 }];
    const stub = sinon.stub(axios, 'get').resolves({ data: fake });
    const res = await posts.postsByUser(2);
    expect(res).to.deep.equal(fake);
    expect(stub.calledOnce).to.be.true;
  });
});

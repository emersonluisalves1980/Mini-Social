// test/unit/users.test.js
const { assert, expect, should } = require('chai');
should();
const sinon = require('sinon');
const axios = require('axios');
const usersModule = require('../../src/users');

describe('Users module - unit', () => {
  afterEach(() => sinon.restore());

  it('fetchAllUsers should call axios.get and return array', async () => {
    const fake = [{ id: 1, name: 'A' }];
    const stub = sinon.stub(axios, 'get').resolves({ data: fake });

    const res = await usersModule.fetchAllUsers();
    assert.isArray(res);
    expect(res).to.have.lengthOf(1);
    stub.calledOnce.should.be.true;
  });

  it('filterUsersByCity should filter correctly', () => {
    const users = [
      { id: 1, address: { city: 'Gotham' } },
      { id: 2, address: { city: 'Metropolis' } }
    ];
    const filtered = usersModule.filterUsersByCity(users, 'Gotham');
    filtered.should.have.lengthOf(1);
    filtered[0].id.should.equal(1);
  });

  it('filterUsersByCity throws if not array', () => {
    expect(() => usersModule.filterUsersByCity(null, 'X')).to.throw();
  });
});

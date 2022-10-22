const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../../../src/app');
const { Task, User } = require('../../../src/models');
const {
  TOKEN,
  USER_WITHOUT_PASSWORD,
  TOKEN_PAYLOAD,
  UNORDERED_TASKS,
} = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a GET request to /tasks', () => {
  let response;

  describe('when it is a success', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
      sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
      sinon.stub(Task, 'findAll').resolves(UNORDERED_TASKS);

      response = await chai.request(app)
        .get('/tasks')
        .set('Authorization', TOKEN);
    });

    after(() => {
      jwt.verify.restore();
      User.findOne.restore();
      Task.findAll.restore();
    });

    it('should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return all the tasks without ordenation', () => {
      expect(response.body).to.deep.equal(UNORDERED_TASKS);
    });
  });

  describe('when an unexpected error happens', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
      sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
      sinon.stub(Task, 'findAll').rejects();

      response = await chai.request(app)
        .get('/tasks')
        .set('Authorization', TOKEN);
    });

    after(() => {
      jwt.verify.restore();
      User.findOne.restore();
      Task.findAll.restore();
    });

    it('should return status 500', () => {
      expect(response).to.have.status(500);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return an object with the message "Internal server error"', () => {
      expect(response.body).to.have.own.property('message', 'Internal server error');
    });
  });

  describe('when the token is not sent', () => {
    before(async () => {
      response = await chai.request(app)
        .get('/tasks');
    });

    it('should return status 401', () => {
      expect(response).to.have.status(401);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return an object with the message "Token not found"', () => {
      expect(response.body).to.have.own.property('message', 'Token not found');
    });
  });

  describe('when an invalid token is sent', () => {
    before(async () => {
      sinon.stub(jwt, 'verify').throws(new Error('jwt malformed'));

      response = await chai.request(app)
        .get('/tasks')
        .set('Authorization', 'Invalid token');
    });

    after(() => {
      jwt.verify.restore();
    });

    it('should return status 401', () => {
      expect(response).to.have.status(401);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return an object with the message "Unauthorized"', () => {
      expect(response.body).to.have.own.property('message', 'Unauthorized');
    });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../../../src/app');
const { Task, User } = require('../../../src/models');
const {
  FIFTH_TASK,
  TOKEN,
  USER_WITHOUT_PASSWORD,
  TOKEN_PAYLOAD,
} = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a DELETE request to /tasks/:id', () => {
  let response;

  describe('when the task to delete is found', () => {
    const existingTaskId = 5;

    before(async () => {
      sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
      sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
      sinon.stub(Task, 'findOne').resolves(FIFTH_TASK);
      sinon.stub(Task, 'destroy').resolves();

      response = await chai.request(app)
        .delete(`/tasks/${existingTaskId}`)
        .set('Authorization', TOKEN);
    });

    after(() => {
      jwt.verify.restore();
      User.findOne.restore();
      Task.findOne.restore();
      Task.destroy.restore();
    });

    it('should return status 204', () => {
      expect(response).to.have.status(204);
    });

    it('should return an empty body response', () => {
      expect(response.body).to.be.empty;
    });
  });

  describe('when the task to delete is not found', () => {
    const notExistingTaskId = 100;

    before(async () => {
      sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
      sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
      sinon.stub(Task, 'findOne').resolves(null);

      response = await chai.request(app)
        .delete(`/tasks/${notExistingTaskId}`)
        .set('Authorization', TOKEN);
    });

    after(() => {
      jwt.verify.restore();
      User.findOne.restore();
      Task.findOne.restore();
    });

    it('should return status 404', () => {
      expect(response).to.have.status(404);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return an object with the message "Task not found"', () => {
      expect(response.body).to.have.own.property('message', 'Task not found');
    });
  });

  describe('when an unexpected error happens', () => {
    const existingTaskId = 5;

    before(async () => {
      sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
      sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
      sinon.stub(Task, 'findOne').rejects();

      response = await chai.request(app)
        .delete(`/tasks/${existingTaskId}`)
        .set('Authorization', TOKEN);
    });

    after(() => {
      jwt.verify.restore();
      User.findOne.restore();
      Task.findOne.restore();
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
});

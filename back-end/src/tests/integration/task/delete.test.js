const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../app');
const { Task } = require('../../../models');
const { FIFTH_TASK } = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a DELETE request to /tasks/:id', () => {
  let response;

  describe('when the task to delete is found', () => {
    const existingTaskId = 5;

    before(async () => {
      sinon.stub(Task, 'findByPk').resolves(FIFTH_TASK);
      sinon.stub(Task, 'destroy').resolves();

      response = await chai.request(app)
        .delete(`/tasks/${existingTaskId}`);
    });

    after(() => {
      Task.findByPk.restore();
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
      sinon.stub(Task, 'findByPk').resolves(null);

      response = await chai.request(app)
        .delete(`/tasks/${notExistingTaskId}`);
    });

    after(() => {
      Task.findByPk.restore();
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
      sinon.stub(Task, 'findByPk').rejects();

      response = await chai.request(app)
        .delete(`/tasks/${existingTaskId}`);
    });

    after(() => {
      Task.findByPk.restore();
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

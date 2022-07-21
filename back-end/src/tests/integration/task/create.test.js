const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../app');
const { Task } = require('../../../models');
const { FIFTH_TASK } = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a POST request to /tasks', () => {
  let response;

  describe('sending the new task name', () => {
    describe('with valid value', () => {
      before(async () => {
        sinon.stub(Task, 'create').resolves(FIFTH_TASK);
  
        response = await chai.request(app)
          .post('/tasks')
          .send({
            name: FIFTH_TASK.name,
          });
      });
  
      after(() => {
        Task.create.restore();
      });

      it('should return status 201', () => {
        expect(response).to.have.status(201);
      });

      it('should return a json response', () => {
        expect(response).to.be.json;
      });

      it('should return the created task', () => {
        expect(response.body).to.deep.equal(FIFTH_TASK);
      });
    });

    describe('with empty value', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/tasks')
          .send({
            name: '',
            status: FIFTH_TASK.status,
          });
      });

      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('should return a json response', () => {
        expect(response).to.be.json;
      });

      it('should return an object with the message "\"name\" is not allowed to be empty"', () => {
        expect(response.body).to.have.own.property('message', '\"name\" is not allowed to be empty');
      });
    });
  });

  describe('not sending the new task name', () => {
    before(async () => {
      response = await chai.request(app)
        .post('/tasks')
        .send({});
    });

    it('should return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return an object with the message "\"name\" is required"', () => {
      expect(response.body).to.have.own.property('message', '\"name\" is required');
    });
  });

  describe('when an unexpected error happens', () => {
    before(async () => {
      sinon.stub(Task, 'create').rejects();

      response = await chai.request(app)
        .post('/tasks')
        .send({
          name: FIFTH_TASK.name,
          status: FIFTH_TASK.status,
        });
    });

    after(() => {
      Task.create.restore();
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

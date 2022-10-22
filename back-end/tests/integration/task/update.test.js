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
  FIFTH_TASK,
  UPDATED_FIFTH_TASK,
} = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a PUT request to /tasks/:id', () => {
  let response;

  describe('when the task to update is found', () => {
    const existingTaskId = 5;

    describe('sending valid name and status', () => {
      before(async () => {
        sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
        sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
        sinon.stub(Task, 'findOne').resolves(FIFTH_TASK);
        sinon.stub(Task, 'update').resolves();
  
        response = await chai.request(app)
          .put(`/tasks/${existingTaskId}`)
          .send({
            name: UPDATED_FIFTH_TASK.name,
            status: UPDATED_FIFTH_TASK.status,
          })
          .set('Authorization', TOKEN);
      });
  
      after(() => {
        jwt.verify.restore();
        User.findOne.restore();
        Task.findOne.restore();
        Task.update.restore();
      });
  
      it('should return status 200', () => {
        expect(response).to.have.status(200);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "Task succesfully updated"', () => {
        expect(response.body).to.have.own.property('message', 'Task succesfully updated');
      });
    });

    describe('sending a status different of "Pending", "Done" or "In progress"', () => {
      before(async () => {
        sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
        sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);

        response = await chai.request(app)
          .put(`/tasks/${existingTaskId}`)
          .send({
            name: FIFTH_TASK.name,
            status: 'invalid status',
          })
          .set('Authorization', TOKEN);
      });

      after(() => {
        jwt.verify.restore();
        User.findOne.restore();
      });

      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });

      it('should return a json response', () => {
        expect(response).to.be.json;
      });

      it('should return an object with the message "\"status\" must be one of [Pending, In progress, Done]"', () => {
        expect(response.body).to.have.own.property('message', '\"status\" must be one of [Pending, In progress, Done]');
      });
    });

    describe('not sending the task new name', () => {
      before(async () => {
        sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
        sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);

        response = await chai.request(app)
          .put(`/tasks/${existingTaskId}`)
          .send({
            status: FIFTH_TASK.status,
          })
          .set('Authorization', TOKEN);
      });

      after(() => {
        jwt.verify.restore();
        User.findOne.restore();
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

    describe('not sending the task new status', () => {
      before(async () => {
        sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
        sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);

        response = await chai.request(app)
          .put(`/tasks/${existingTaskId}`)
          .send({
            name: FIFTH_TASK.name,
          })
          .set('Authorization', TOKEN);
      });

      after(() => {
        jwt.verify.restore();
        User.findOne.restore();
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"status\" is required"', () => {
        expect(response.body).to.have.own.property('message', '\"status\" is required');
      });
    });
  });

  describe('when the task to update is not found', () => {
    const notExistingTaskId = 100;

    before(async () => {
      sinon.stub(jwt, 'verify').returns(TOKEN_PAYLOAD);
      sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
      sinon.stub(Task, 'findOne').resolves(null);

      response = await chai.request(app)
        .put(`/tasks/${notExistingTaskId}`)
        .send({
          name: UPDATED_FIFTH_TASK.name,
          status: UPDATED_FIFTH_TASK.status,
        })
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
        .put(`/tasks/${existingTaskId}`)
        .send({
          name: UPDATED_FIFTH_TASK.name,
          status: UPDATED_FIFTH_TASK.status,
        })
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

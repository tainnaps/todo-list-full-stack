const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../app');
const { Task } = require('../../models');
const {
  UNORDERED_TASKS,
  ORDERED_TASKS_BY_NAME_ASC,
  ORDERED_TASKS_BY_STATUS_ASC,
  ORDERED_TASKS_BY_DATE_DESC,
  FIFTH_TASK,
  UPDATED_FIFTH_TASK,
} = require('../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('tasks route', () => {
  let response;

  describe('when making a GET request to /tasks', () => {
    describe('without query strings', () => {
      before(async () => {
        sinon.stub(Task, 'findAll').resolves(UNORDERED_TASKS);
  
        response = await chai.request(app)
          .get('/tasks');
      });
  
      after(() => {
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

    describe('with query strings', () => {
      describe('passing only orderBy="name" query', () => {
        before(async () => {
          sinon.stub(Task, 'findAll').resolves(ORDERED_TASKS_BY_NAME_ASC);
    
          response = await chai.request(app)
            .get('/tasks')
            .query({ orderBy: 'name' });
        });
    
        after(() => {
          Task.findAll.restore();
        });
  
        it('should return status 200', () => {
          expect(response).to.have.status(200);
        });
  
        it('should return a json response', () => {
          expect(response).to.be.json;
        });
  
        it('should return all the tasks in ascending name order', () => {
          expect(response.body).to.deep.equal(ORDERED_TASKS_BY_NAME_ASC);
        });
      });

      describe('passing orderBy and direction queries', () => {
        describe('for orderBy="status" direction="asc"', () => {
          before(async () => {
            sinon.stub(Task, 'findAll').resolves(ORDERED_TASKS_BY_STATUS_ASC);
      
            response = await chai.request(app)
              .get('/tasks')
              .query({ orderBy: 'status', direction: 'asc' });
          });
      
          after(() => {
            Task.findAll.restore();
          });
    
          it('should return status 200', () => {
            expect(response).to.have.status(200);
          });
    
          it('should return a json response', () => {
            expect(response).to.be.json;
          });
    
          it('should return all the tasks in ascending status order', () => {
            expect(response.body).to.deep.equal(ORDERED_TASKS_BY_STATUS_ASC);
          });
        });

        describe('for orderBy="createdAt" direction="DESC"', () => {
          before(async () => {
            sinon.stub(Task, 'findAll').resolves(ORDERED_TASKS_BY_DATE_DESC);
      
            response = await chai.request(app)
              .get('/tasks')
              .query({ orderBy: 'createdAt', direction: 'DESC' });
          });
      
          after(() => {
            Task.findAll.restore();
          });
    
          it('should return status 200', () => {
            expect(response).to.have.status(200);
          });
    
          it('should return a json response', () => {
            expect(response).to.be.json;
          });
    
          it('should return all the tasks in descending createdAt order', () => {
            expect(response.body).to.deep.equal(ORDERED_TASKS_BY_DATE_DESC);
          });
        });
      });
    });
  });

  describe('when making a PUT request to /tasks/:id', () => {
    describe('and finding the task to update', () => {
      const existingTaskId = 5;
  
      before(async () => {
        sinon.stub(Task, 'findByPk').resolves(FIFTH_TASK);
        sinon.stub(Task, 'update').resolves();
  
        response = await chai.request(app)
          .put(`/tasks/${existingTaskId}`)
          .send({
            name: UPDATED_FIFTH_TASK.name,
            status: UPDATED_FIFTH_TASK.status,
          });
      });
  
      after(() => {
        Task.findByPk.restore();
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

    describe('and not finding the task to update', () => {
      const notExistingTaskId = 100;
  
      before(async () => {
        sinon.stub(Task, 'findByPk').resolves(null);
  
        response = await chai.request(app)
          .put(`/tasks/${notExistingTaskId}`)
          .send({
            name: UPDATED_FIFTH_TASK.name,
            status: UPDATED_FIFTH_TASK.status,
          });
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
  });

  describe('when making a DELETE request to /tasks/:id', () => {
    describe('and finding the task to delete', () => {
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

    describe('and not finding the task to delete', () => {
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
  });

  describe('when making a POST request to /tasks', () => {
    describe('sending new task\'s name and status', () => {
      describe('with valid values', () => {
        before(async () => {
          sinon.stub(Task, 'create').resolves(FIFTH_TASK);
    
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

      describe('with status value different of "pendente", "pronto" or "em andamento"', () => {
        before(async () => {
          response = await chai.request(app)
            .post('/tasks')
            .send({
              name: FIFTH_TASK.name,
              status: 'status invalid value',
            });
        });

        it('should return status 400', () => {
          expect(response).to.have.status(400);
        });
  
        it('should return a json response', () => {
          expect(response).to.be.json;
        });
  
        it('should return an object with the message "\"status\" must be one of [pendente, em andamento, pronto]"', () => {
          expect(response.body).to.have.own.property('message', '\"status\" must be one of [pendente, em andamento, pronto]');
        });
      });

      describe('with empty name', () => {
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

    describe('sending only new task\'s name', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/tasks')
          .send({
            name: FIFTH_TASK.name,
          });
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

    describe('sending only new task\'s status', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/tasks')
          .send({
            status: FIFTH_TASK.status,
          });
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
  });

  describe('when an unexpected error happens', () => {
    before(async () => {
      sinon.stub(Task, 'findAll').rejects();

      response = await chai.request(app)
        .get('/tasks');
    });

    after(() => {
      Task.findAll.restore();
    });

    it('should return status 500', () => {
      expect(response).to.have.status(500);
    });

    it('should return a json response', () => {
      expect(response).to.be.json;
    });

    it('should return an object with the message "Internal server error', () => {
      expect(response.body).to.have.own.property('message', 'Internal server error');
    });
  });
});

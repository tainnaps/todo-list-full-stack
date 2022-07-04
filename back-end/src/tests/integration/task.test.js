const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../app');
const { Task } = require('../../models');
const {
  UNORDERED_TASKS,
  ORDERED_TASKS_BY_NAME_ASC,
  ORDERED_TASKS_BY_STATUS_ASC,
  ORDERED_TASKS_BY_DATE_DESC,
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

      it('should return status 200', async () => {
        expect(response).to.have.status(200);
      });

      it('should return a json response', async () => {
        expect(response).to.be.json;
      });

      it('should return all the tasks without ordenation', async () => {
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
  
        it('should return status 200', async () => {
          expect(response).to.have.status(200);
        });
  
        it('should return a json response', async () => {
          expect(response).to.be.json;
        });
  
        it('should return all the tasks in ascending name order', async () => {
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
    
          it('should return status 200', async () => {
            expect(response).to.have.status(200);
          });
    
          it('should return a json response', async () => {
            expect(response).to.be.json;
          });
    
          it('should return all the tasks in ascending status order', async () => {
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
    
          it('should return status 200', async () => {
            expect(response).to.have.status(200);
          });
    
          it('should return a json response', async () => {
            expect(response).to.be.json;
          });
    
          it('should return all the tasks in descending createdAt order', async () => {
            expect(response.body).to.deep.equal(ORDERED_TASKS_BY_DATE_DESC);
          });
        });
      });
    });
  });

});

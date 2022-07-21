const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../app');
const { Task } = require('../../../models');
const {
  UNORDERED_TASKS,
  ORDERED_TASKS_BY_DATE_DESC,
  ORDERED_TASKS_BY_NAME_ASC,
  ORDERED_TASKS_BY_STATUS_ASC
} = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a GET request to /tasks', () => {
  let response;

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
      describe('for orderBy="status" and direction="asc"', () => {
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

      describe('for orderBy="createdAt" and direction="DESC"', () => {
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

    it('should return an object with the message "Internal server error"', () => {
      expect(response.body).to.have.own.property('message', 'Internal server error');
    });
  });
});

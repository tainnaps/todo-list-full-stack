const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../../../src/app');
const { User } = require('../../../src/models');
const {
  TOKEN,
  USER_WITH_PASSWORD,
  USER_WITH_TOKEN,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  VALID_PASSWORD,
  INVALID_NAME,
} = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a POST request to /users', () => {
  let response;

  describe('sending valid data', () => {
    describe('when the user email is not registered yet', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves();
        sinon.stub(User, 'create').resolves(USER_WITH_PASSWORD);
        sinon.stub(jwt, 'sign').returns(TOKEN);
  
        response = await chai.request(app)
          .post('/users')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: VALID_PASSWORD,
            name: USER_WITH_PASSWORD.name,
          });
      });
  
      after(() => {
        User.findOne.restore();
        User.create.restore();
        jwt.sign.restore();
      });
  
      it('should return status 201', () => {
        expect(response).to.have.status(201);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the user data and access token', () => {
        expect(response.body).to.deep.equal(USER_WITH_TOKEN);
      });
    });

    describe('when the user email is already registered', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves(USER_WITH_PASSWORD);
  
        response = await chai.request(app)
          .post('/users')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: VALID_PASSWORD,
            name: USER_WITH_PASSWORD.name,
          });
      });
  
      after(() => {
        User.findOne.restore();
      });
  
      it('should return status 409', () => {
        expect(response).to.have.status(409);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "Email already registered"', () => {
        expect(response.body).to.have.own.property('message', 'Email already registered');
      });
    });
  });

  describe('sending an email with', () => {
    describe('invalid value', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users')
          .send({
            email: INVALID_EMAIL,
            password: VALID_PASSWORD,
            name: USER_WITH_PASSWORD.name,
          });
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"email\" must be a valid email"', () => {
        expect(response.body).to.have.own.property('message', '"email" must be a valid email');
      });
    });

    describe('empty value', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users')
          .send({
            email: '',
            password: VALID_PASSWORD,
            name: USER_WITH_PASSWORD.name,
          });
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"email\" is not allowed to be empty"', () => {
        expect(response.body).to.have.own.property('message', '"email" is not allowed to be empty');
      });
    });
  });

  describe('sending a password with', () => {
    describe('invalid length', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: INVALID_PASSWORD,
            name: USER_WITH_PASSWORD.name,
          });
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"password\" length must be at least 6 characters long', () => {
        expect(response.body).to.have.own.property('message', '"password" length must be at least 6 characters long');
      });
    });

    describe('empty value', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: '',
            name: USER_WITH_PASSWORD.name,
          });
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"password\" is not allowed to be empty', () => {
        expect(response.body).to.have.own.property('message', '"password" is not allowed to be empty');
      });
    });
  });

  describe('sending a name with', () => {
    describe('invalid length', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: VALID_PASSWORD,
            name: INVALID_NAME,
          });
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"name\" length must be at least 2 characters long', () => {
        expect(response.body).to.have.own.property('message', '"name" length must be at least 2 characters long');
      });
    });

    describe('empty value', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: VALID_PASSWORD,
            name: '',
          });
      });
  
      it('should return status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "\"name\" is not allowed to be empty', () => {
        expect(response.body).to.have.own.property('message', '"name" is not allowed to be empty');
      });
    });
  });
});

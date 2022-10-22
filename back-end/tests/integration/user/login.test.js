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
  USER_WITHOUT_PASSWORD,
} = require('../../mocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('Making a POST request to /users/login', () => {
  let response;

  describe('sending valid data', () => {
    describe('when the user is found', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves(USER_WITHOUT_PASSWORD);
        sinon.stub(jwt, 'sign').returns(TOKEN);
  
        response = await chai.request(app)
          .post('/users/login')
          .send({
            email: USER_WITHOUT_PASSWORD.email,
            password: VALID_PASSWORD,
          });
      });
  
      after(() => {
        User.findOne.restore();
        jwt.sign.restore();
      });
  
      it('should return status 200', () => {
        expect(response).to.have.status(200);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the user data and access token', () => {
        expect(response.body).to.deep.equal(USER_WITH_TOKEN);
      });
    });

    describe('when the user is not found', () => {
      before(async () => {
        sinon.stub(User, 'findOne').resolves();
  
        response = await chai.request(app)
          .post('/users/login')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: VALID_PASSWORD,
          });
      });
  
      after(() => {
        User.findOne.restore();
      });
  
      it('should return status 404', () => {
        expect(response).to.have.status(404);
      });
  
      it('should return a json response', () => {
        expect(response).to.be.json;
      });
  
      it('should return an object with the message "Wrong email or password"', () => {
        expect(response.body).to.have.own.property('message', 'Wrong email or password');
      });
    });
  });

  describe('sending an email with', () => {
    describe('invalid value', () => {
      before(async () => {
        response = await chai.request(app)
          .post('/users/login')
          .send({
            email: INVALID_EMAIL,
            password: VALID_PASSWORD,
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
          .post('/users/login')
          .send({
            email: '',
            password: VALID_PASSWORD,
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
          .post('/users/login')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: INVALID_PASSWORD,
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
          .post('/users/login')
          .send({
            email: USER_WITH_PASSWORD.email,
            password: '',
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
});

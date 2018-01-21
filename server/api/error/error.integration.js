'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newError;

describe('Error API:', function() {
  describe('GET /api/errors', function() {
    var errors;

    beforeEach(function(done) {
      request(app)
        .get('/api/errors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          errors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(errors).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/errors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/errors')
        .send({
          name: 'New Error',
          info: 'This is the brand new error!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newError = res.body;
          done();
        });
    });

    it('should respond with the newly created error', function() {
      expect(newError.name).to.equal('New Error');
      expect(newError.info).to.equal('This is the brand new error!!!');
    });
  });

  describe('GET /api/errors/:id', function() {
    var error;

    beforeEach(function(done) {
      request(app)
        .get(`/api/errors/${newError._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          error = res.body;
          done();
        });
    });

    afterEach(function() {
      error = {};
    });

    it('should respond with the requested error', function() {
      expect(error.name).to.equal('New Error');
      expect(error.info).to.equal('This is the brand new error!!!');
    });
  });

  describe('PUT /api/errors/:id', function() {
    var updatedError;

    beforeEach(function(done) {
      request(app)
        .put(`/api/errors/${newError._id}`)
        .send({
          name: 'Updated Error',
          info: 'This is the updated error!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedError = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedError = {};
    });

    it('should respond with the updated error', function() {
      expect(updatedError.name).to.equal('Updated Error');
      expect(updatedError.info).to.equal('This is the updated error!!!');
    });

    it('should respond with the updated error on a subsequent GET', function(done) {
      request(app)
        .get(`/api/errors/${newError._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let error = res.body;

          expect(error.name).to.equal('Updated Error');
          expect(error.info).to.equal('This is the updated error!!!');

          done();
        });
    });
  });

  describe('PATCH /api/errors/:id', function() {
    var patchedError;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/errors/${newError._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Error' },
          { op: 'replace', path: '/info', value: 'This is the patched error!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedError = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedError = {};
    });

    it('should respond with the patched error', function() {
      expect(patchedError.name).to.equal('Patched Error');
      expect(patchedError.info).to.equal('This is the patched error!!!');
    });
  });

  describe('DELETE /api/errors/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/errors/${newError._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when error does not exist', function(done) {
      request(app)
        .delete(`/api/errors/${newError._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});

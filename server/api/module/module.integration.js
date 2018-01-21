'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newModule;

describe('Modules API:', function() {
  describe('GET /api/modules', function() {
    var modules;

    beforeEach(function(done) {
      request(app)
        .get('/api/modules')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          modules = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(modules).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/modules', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/modules')
        .send({
          name: 'New Module',
          info: 'This is the brand new module!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newModule = res.body;
          done();
        });
    });

    it('should respond with the newly created module', function() {
      expect(newModule.name).to.equal('New Module');
      expect(newModule.info).to.equal('This is the brand new module!!!');
    });
  });

  describe('GET /api/modules/:id', function() {
    var module;

    beforeEach(function(done) {
      request(app)
        .get(`/api/modules/${newModule._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          module = res.body;
          done();
        });
    });

    afterEach(function() {
      module = {};
    });

    it('should respond with the requested module', function() {
      expect(module.name).to.equal('New Module');
      expect(module.info).to.equal('This is the brand new module!!!');
    });
  });

  describe('PUT /api/modules/:id', function() {
    var updatedModule;

    beforeEach(function(done) {
      request(app)
        .put(`/api/modules/${newModule._id}`)
        .send({
          name: 'Updated Module',
          info: 'This is the updated module!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedModule = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedModule = {};
    });

    it('should respond with the updated module', function() {
      expect(updatedModule.name).to.equal('Updated Module');
      expect(updatedModule.info).to.equal('This is the updated module!!!');
    });

    it('should respond with the updated module on a subsequent GET', function(done) {
      request(app)
        .get(`/api/modules/${newModule._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let module = res.body;

          expect(module.name).to.equal('Updated Module');
          expect(module.info).to.equal('This is the updated module!!!');

          done();
        });
    });
  });

  describe('PATCH /api/modules/:id', function() {
    var patchedModule;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/modules/${newModule._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Module' },
          { op: 'replace', path: '/info', value: 'This is the patched module!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedModule = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedModule = {};
    });

    it('should respond with the patched module', function() {
      expect(patchedModule.name).to.equal('Patched Module');
      expect(patchedModule.info).to.equal('This is the patched module!!!');
    });
  });

  describe('DELETE /api/modules/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/modules/${newModule._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when module does not exist', function(done) {
      request(app)
        .delete(`/api/modules/${newModule._id}`)
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

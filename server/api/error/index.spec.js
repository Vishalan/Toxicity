'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var errorCtrlStub = {
  index: 'errorCtrl.index',
  show: 'errorCtrl.show',
  create: 'errorCtrl.create',
  upsert: 'errorCtrl.upsert',
  patch: 'errorCtrl.patch',
  destroy: 'errorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var errorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './error.controller': errorCtrlStub
});

describe('Error API Router:', function() {
  it('should return an express router instance', function() {
    expect(errorIndex).to.equal(routerStub);
  });

  describe('GET /api/errors', function() {
    it('should route to error.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'errorCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/errors/:id', function() {
    it('should route to error.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'errorCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/errors', function() {
    it('should route to error.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'errorCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/errors/:id', function() {
    it('should route to error.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'errorCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/errors/:id', function() {
    it('should route to error.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'errorCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/errors/:id', function() {
    it('should route to error.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'errorCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});

'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var moduleCtrlStub = {
  index: 'moduleCtrl.index',
  show: 'moduleCtrl.show',
  create: 'moduleCtrl.create',
  upsert: 'moduleCtrl.upsert',
  patch: 'moduleCtrl.patch',
  destroy: 'moduleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moduleIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './module.controller': moduleCtrlStub
});

describe('Module API Router:', function() {
  it('should return an express router instance', function() {
    expect(moduleIndex).to.equal(routerStub);
  });

  describe('GET /api/modules', function() {
    it('should route to module.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moduleCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/modules/:id', function() {
    it('should route to module.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moduleCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/modules', function() {
    it('should route to module.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moduleCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/modules/:id', function() {
    it('should route to module.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moduleCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/modules/:id', function() {
    it('should route to module.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moduleCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/modules/:id', function() {
    it('should route to module.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moduleCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});

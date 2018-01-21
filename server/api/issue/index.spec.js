'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var issueCtrlStub = {
  index: 'issueCtrl.index',
  show: 'issueCtrl.show',
  create: 'issueCtrl.create',
  upsert: 'issueCtrl.upsert',
  patch: 'issueCtrl.patch',
  destroy: 'issueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var issueIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './issue.controller': issueCtrlStub
});

describe('Issue API Router:', function() {
  it('should return an express router instance', function() {
    expect(issueIndex).to.equal(routerStub);
  });

  describe('GET /api/issues', function() {
    it('should route to issue.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'issueCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/issues/:id', function() {
    it('should route to issue.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'issueCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/issues', function() {
    it('should route to issue.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'issueCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/issues/:id', function() {
    it('should route to issue.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'issueCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/issues/:id', function() {
    it('should route to issue.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'issueCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/issues/:id', function() {
    it('should route to issue.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'issueCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});

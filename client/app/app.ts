'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');


const ngRoute = require('angular-route');

const uiBootstrap = require('angular-ui-bootstrap');



import {routeConfig} from './app.config';


import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';



import './app.css';

angular.module('toxicityApp', [
  ngCookies,
  ngResource,
  ngSanitize,


  ngRoute,
  uiBootstrap,
  navbar,
  footer,
  main,
  constants,

  util
])
  .config(routeConfig)
;

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['toxicityApp'], {
      strictDi: true
    });
  });

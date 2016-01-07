/// <reference path="../angular2/typings/node/node.d.ts" />
/// <reference path="../angular2/typings/es6-shim/es6-shim.d.ts/" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
require('reflect-metadata');
var assert = require('assert');
var di = require('../target/src/core/di');
//import { Injector, Injectable, Inject } from '../target/src/core/di';
var Engine = (function () {
    function Engine() {
    }
    return Engine;
})();
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car = __decorate([
        di.Injectable(),
        __param(0, di.Inject(Engine))
    ], Car);
    return Car;
})();
var injector = di.Injector.resolveAndCreate([
    Engine,
    Car
]);
var car = injector.get(Car);
assert(car instanceof Car);
assert(car.engine instanceof Engine);

/// <reference path="../angular2/typings/node/node.d.ts" />
/// <reference path="../angular2/typings/es6-shim/es6-shim.d.ts/" />

import 'reflect-metadata';

import assert = require('assert');
import di     = require('../target/src/core/di');


//import { Injector, Injectable, Inject } from '../target/src/core/di';

class Engine {
}

@di.Injectable()
class Car {
  constructor(@di.Inject(Engine) public engine : Engine) {
  }
}

var injector = di.Injector.resolveAndCreate([
  Engine,
  Car
]);

var car = injector.get(Car);

assert(car instanceof Car);
assert(car.engine instanceof Engine);

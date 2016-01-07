import 'reflect-metadata';
import assert from 'assert';
import { Injector, Injectable, InjectMetadata } from '../';

class Engine {
}

@Injectable()
@Reflect.metadata('parameters', [ new InjectMetadata(Engine) ])
class Car {
  constructor(engine : Engine) {
    this.engine = engine;
  }
}

var injector = Injector.resolveAndCreate([
  Engine,
  Car
]);

var car = injector.get(Car);

assert(car instanceof Car);
assert(car.engine instanceof Engine);

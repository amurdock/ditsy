# ditsy

A shameless extract of the [dependency injection](https://github.com/angular/angular/tree/master/modules/angular2/src/core/di) module used within the [angular2](https://angular.io/) development platform.

**Motivation**: both [node-di](https://github.com/vojtajina/node-di) and [di.js](https://github.com/angular/di.js) have been deprecated.

**Note**: The discussion [here](https://github.com/angular/di.js/issues/108) says the Angular2 dependency injector has superseded [di.js](https://github.com/angular/di.js) but ...

> There is a plan to extract DI library from the angular2 repo in the future, but this is not the case today.

Therefore I strongly advise you to move to the supported angular2 dependency injection module if and when it's extracted by the angular team.

## Install

`npm install ditsy`

## Build

`npm run build`

> Be aware the build scripts were a couple of hours work spent seeing if the extraction was even possible. They haven't been tested thoroughly and to be honest I'd be suprised if they worked on anything other that my laptop. I will be keeping an eye on changes in the angular2 di module and releasing as they become available. If I miss any ping me and I'll do a build as soon as I can.

> I've purposely left out dependencies on *typescript* and *tsd* so you'll need to install these globally yourself for the time being.

`npm install -g typescript`
`npm install -g tsd`

## Examples

**es6** `./node_modules/.bin/babel-node examples/es6.js`

**typescript** `coming soon`

<sub><sup>Why ditsy ... **d**enendency**i**injection**t**ype**s**cripty, not good with names ;)</sup></sub>

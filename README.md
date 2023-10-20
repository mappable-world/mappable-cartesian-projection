# @mappable-world/mappable-cartesian-projection package

---

Mappable JS API package

[![npm version](https://badge.fury.io/js/@mappable-world%2Fmappable-cartesian-projection.svg)](https://badge.fury.io/js/@mappable-world%2Fmappable-cartesian-projection)
[![npm](https://img.shields.io/npm/dm/@mappable-world/mappable-cartesian-projection.svg)](https://www.npmjs.com/package/@mappable-world/mappable-cartesian-projection)
[![Build Status](https://github.com/mappable-world/mappable-cartesian-projection/workflows/Run%20tests/badge.svg)](https://github.com/mappable-world/mappable-cartesian-projection/actions/workflows/tests.yml)

## Install

Install Cartesian projection package to be used in your project with

```bash
npm install --save @mappable-world/mappable-cartesian-projection
```

## How use

The package is located in the `dist` folder:

- `dist/types` TypeScript types
- `dist/esm` es6 modules for direct connection in your project
- `dist/index.js` Mappable JS Module

To use Cartesian projection, just import

```js
import {Cartesian} from '@mappable-world/mappable-cartesian-projection';

const projection = new Cartesian([
    // these boundaries define the limits of the world map in the Cartesian coordinate system.
    [-400, -600],
    [400, 600],
]);

console.log(projection.toWorldCoordinates([-400, 600])) // {x: -1, y: 1}
console.log(projection.toWorldCoordinates([200, 0])) // {x: 0.5, y: 0}
console.log(projection.toWorldCoordinates([0, -75])) // {x: 0, y: -0.125}

console.log(projection.fromWorldCoordinates({x: -1, y: 1})) // [-400, 600]
console.log(projection.fromWorldCoordinates({x: 0.5, y: 0})) // [200, 0]
console.log(projection.fromWorldCoordinates({x: 0, y: -0.125})) // [0, -75]
```

![projection scheme]( https://github.com/mappable-world/mappable-tiles-generator/blob/main/projection_scheme.png?raw=true)


### Usage without npm

You can use CDN with module loading handler in JS API on your page.

Just use `mappable.import`:

```js
const pkg = await mappable.import('@mappable-world/mappable-cartesian-projection')
```

By default `mappable.import` can load self modules.
If you want also load your package, should add `loader`:

```js
// Add loader at start loaders array
mappable.import.loaders.unshift(async (pkg) => {
    // Process only your package
    if (!pkg.includes('@mappable-world/mappable-cartesian-projection')) return;

    // Load script directly. You can use another CDN
    await mappable.import.script(`https://unpkg.com/${pkg}/dist/index.js`);

    // Return result object
    return window['@mappable-world/mappable-cartesian-projection'];
});
```

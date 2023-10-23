# @mappable-world/mappable-cartesian-projection package

Mappable JS API package

[![npm version](https://badge.fury.io/js/@mappable-world%2Fmappable-cartesian-projection.svg)](https://badge.fury.io/js/@mappable-world%2Fmappable-cartesian-projection)
[![npm](https://img.shields.io/npm/dm/@mappable-world/mappable-cartesian-projection.svg)](https://www.npmjs.com/package/@mappable-world/mappable-cartesian-projection)
[![Build Status](https://github.com/mappable-world/mappable-cartesian-projection/workflows/Run%20tests/badge.svg)](https://github.com/mappable-world/mappable-cartesian-projection/actions/workflows/tests.yml)

This package will project your cartesian dimensions to Mappable JS API world representation (see scheme of work below). Then you can use it as `MMap` `location` property, in `MMapListener` handlers, etc.

![projection scheme](https://github.com/mappable-world/mappable-tiles-generator/blob/main/projection_scheme.png?raw=true)

## Install

You can install this package via npm:

```bash
npm install --save @mappable-world/mappable-cartesian-projection
```

## How use

To use Cartesian projection, just import it:

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

### Usage without npm

You can use some CDN with `mappable.import` JS API module loading handler on your page:

```js
const pkg = await mappable.import('@mappable-world/mappable-cartesian-projection');
```

**_NOTE:_**
By default `mappable.import` can load self modules, scripts or style.
To make the code above work, you should add a loader:

```js
// Add loader at the beginning of the loader queue
mappable.import.loaders.unshift(async (pkg) => {
    // Process only this package
    if (!pkg.includes('@mappable-world/mappable-cartesian-projection')) return;

    // Load script directly. You can use another CDN
    await mappable.import.script(`https://unpkg.com/${pkg}/dist/index.js`);

    // Return result object
    return window['@mappable-world/mappable-cartesian-projection'];
});
```

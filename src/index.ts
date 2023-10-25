import type {Projection, LngLat, WorldCoordinates} from '@mappable-world/mappable-types';

function cycleRestrict(value: number, min: number, max: number): number {
    return value - Math.floor((value - min) / (max - min)) * (max - min);
}

/**
 * Creates a projection of a rectangular coordinate area into world coordinates.
 * The area size in world is always 2*2.
 *
 * @name Cartesian
 * @class Cartesian projection of a rectangular area.
 * @augments Projection
 * @param {[[Number, Number], [Number, Number]]} bounds An array of two points -
 * coordinates of the lower left and upper right corners of the rectangular coordinate area.
 * @param {Boolean[]} [cycled=[false, false]] An array of signs of map looping by x and y.
 * @example
 * ```js
 * mappable.ready.then(async () => {
 *     const {MMaps} = mappable;
 *     // Calculate the size of all tiles at the maximum zoom.
 *     const worldSize = Math.pow(2, MAX_ZOOM) * 256;
 *     const PIC_WIDTH = 2526;
 *     const PIC_HEIGHT = 1642;
 *
 *     const {Cartesian} = await mappable.import('@mappable-world/mappable-cartesian-projection');
 *     // We set as a projection Cartesian. With this calculation, the center of the image will lie in the coordinates [0, 0].
 *     const projection = new Cartesian([
 *         [-PIC_WIDTH / 2, PIC_HEIGHT / 2 - worldSize],
 *         [worldSize - PIC_WIDTH / 2, PIC_HEIGHT / 2],
 *     ]);
 *
 *     const map = new MMaps(container, {
 *         //...,
 *         projection: projection
 *     });
 * });
 * ```
 */
export class Cartesian implements Projection {
    private _bounds!: [LngLat, LngLat];
    private _cycled!: [boolean, boolean];
    private _xRange!: number;
    private _yRange!: number;
    private _worldSize!: number;

    type: 'cartesian';

    constructor(bounds: [LngLat, LngLat], cycled: [boolean, boolean] = [false, false]) {
        this._bounds = bounds;
        this._cycled = cycled;
        this._xRange = bounds[1][0] - bounds[0][0];
        this._yRange = bounds[1][1] - bounds[0][1];
        this._worldSize = 2;
    }

    toWorldCoordinates(point: LngLat): WorldCoordinates {
        const bounds = this._bounds;
        const x = point[0];
        const y = point[1];

        return {
            x: ((x - bounds[0][0]) / this._xRange) * this._worldSize - 1,
            y: ((y - bounds[0][1]) / this._yRange) * this._worldSize - 1
        };
    }

    fromWorldCoordinates(point: WorldCoordinates): LngLat {
        const bounds = this._bounds;

        const geoPoint: LngLat = [
            ((point.x + 1) / this._worldSize) * this._xRange + bounds[0][0],
            ((point.y + 1) / this._worldSize) * this._yRange + bounds[0][1]
        ];

        return [
            this._cycled[0] ? cycleRestrict(geoPoint[0], bounds[0][0], bounds[1][0]) : geoPoint[0],
            this._cycled[1] ? cycleRestrict(geoPoint[1], bounds[0][1], bounds[1][1]) : geoPoint[1]
        ];
    }
}

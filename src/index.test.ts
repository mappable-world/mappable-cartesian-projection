import {Cartesian} from './index';

describe('cartesian transformations', () => {
    const IMG = {width: 450, height: 500};
    const HALF_IMG = {width: IMG.width / 2, height: IMG.height / 2};

    const projection = new Cartesian([
        [-IMG.width / 2, -IMG.height / 2],
        [IMG.width / 2, IMG.height / 2],
    ]);

    const xWorld: [number, number][] = [];
    for (let x = -HALF_IMG.width; x <= HALF_IMG.width; x += 5) {
        xWorld.push([x, x / HALF_IMG.width]);
    }

    const yWorld: [number, number][] = [];
    for (let y = -HALF_IMG.height; y <= HALF_IMG.height; y += 5) {
        yWorld.push([y, y / HALF_IMG.height]);
    }

    it('check toWorldCoordinates', () => {
        xWorld.map(([x, worldX]) => {
            yWorld.map(([y, worldY]) => {
                const world = projection.toWorldCoordinates([x, y]);
                // console.error({c: [x, y], world});
                expect(world.x).toBeCloseTo(worldX, 9);
                expect(world.y).toBeCloseTo(worldY, 9);
            });
        });
    });

    it('check fromWorldCoordinates', () => {
        xWorld.map(([x, worldX]) => {
            yWorld.map(([y, worldY]) => {
                const coords = projection.fromWorldCoordinates({x: worldX, y: worldY});
                expect(coords[0]).toBeCloseTo(x, 9);
                expect(coords[1]).toBeCloseTo(y, 9);
            });
        });
    });

    it('check toWorldCoordinates and fromWorldCoordinates accuracy', () => {
        for (let x = -HALF_IMG.width; x < HALF_IMG.width; x++) {
            for (let y = -HALF_IMG.height; y < HALF_IMG.height; y++) {
                const world = projection.toWorldCoordinates([x, y]);
                const coordsAfter = projection.fromWorldCoordinates(world);
                expect(x).toBeCloseTo(coordsAfter[0], 9);
                expect(y).toBeCloseTo(coordsAfter[1], 9);
            }
        }
    });
});

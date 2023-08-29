mappable.import.loaders.unshift(async (pkg) => {
    if (!pkg.includes('@mappable-world/mappable-cartesian-projection')) {
        return;
    }

    if (location.href.includes('localhost')) {
        await mappable.import.script(`/dist/index.js`);
    } else {
        await mappable.import.script(`https://unpkg.com/${pkg}/dist/index.js`);
    }

    Object.assign(mappable, window[`${pkg}`]);
    return window[`${pkg}`];
})

const TILE_SIZE = 256;
const IMG = {width: 14575, height: 8441};
const ZOOM_RANGE = {min: 0, max: 6};
const WORLD_SIZE = Math.pow(2, ZOOM_RANGE.max) * TILE_SIZE;
const RESTRICT_AREA = [
    [-IMG.width / 2, -IMG.height / 2],
    [IMG.width / 2, IMG.height / 2],
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMapProps(Cartesian) {
    // This image is located in the upper left corner of the tile grid. With this calculation, the center of the image will lie in the coordinates [0, 0].
    const projection = new Cartesian([
        [-IMG.width / 2, IMG.height / 2 - WORLD_SIZE],
        [WORLD_SIZE - IMG.width / 2, IMG.height / 2],
    ]);

    return {
        location: {center: [0, 0], zoom: ZOOM_RANGE.max - 1},
        zoomRange: ZOOM_RANGE,
        projection: projection,
        mode: 'raster',
        restrictMapArea: RESTRICT_AREA,
        // Do not copy the world along the axes
        worldOptions: { cycledX: false, cycledY: false },
    };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const SOURCE = {
    id: 'image',
    copyrights: ['© NASA', '© ESA', '© CSA', '© STScI', '© CC-BY-SA'],
    raster: {
        type: 'tile',
        fetchTile: 'https://static.mappable.world/s3/front-maps-static/maps-front-jsapi-3/examples/images/cartesian-projection/tiles/{{z}}/{{y}}-{{x}}.png'
    }
}
const LAYER = {source: 'image', type: 'tile'};
const MARKERS = [
    {coordinates: [0, 0], title: 'center'},
    {coordinates: [-IMG.width / 2, -IMG.height / 2], title: 'left bottom'},
    {coordinates: [IMG.width / 2, -IMG.height / 2], title: 'right bottom'},
    {coordinates: [IMG.width / 2, IMG.height / 2], title: 'right top'},
    {coordinates: [-IMG.width / 2, IMG.height / 2], title: 'left bottom'}
]

const game = (snapshot, id) => ({
    player: id,
    snapshot: snapshot
});
const snapshot = (players, asteroids, bullets) => ({
    players: players,
    asteroids: asteroids,
    bullets: bullets
});
const entity = (id, x, y, z, sprite) => ({
    id: id,
    x: x,
    y: y,
    z: z,
    sprite: sprite
});

export default {
    id: "GAME",
    data: game,
    util: {
        snapshot: snapshot,
        entity: entity
    }
};

Keyboard.initialize();

var app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
var player = PIXI.Sprite.fromImage('https://pixijs.io/examples/required/assets/bunny.png');

// center the sprite's anchor point
player.anchor.set(0.5);

// move the sprite to the center of the screen
player.x = app.screen.width / 2;
player.y = app.screen.height / 5 * 4;

app.stage.addChild(player);

// draw the trailing line 

let trail = new PIXI.Graphics();
app.stage.addChild(trail);

let points = [new Victor(player.x, player.y)]

Input.on('right', () => { player.rotation += Math.PI * 0.5; })
Input.on('left', () => { player.rotation -= Math.PI * 0.5; })

app.ticker.add(function (deltaTime) {

    trail.clear();

    let newPoint = new Victor(player.x, player.y)

    if (newPoint.distance(points.slice(-1)[0]) > 4) {
        points.push(newPoint)
    }

    let first = true;

    for ({ x, y } of points) {
        trail.lineStyle(3, 0xFFAABB);

        if (!first) { trail.lineTo(x, y); }

        trail.moveTo(x, y)

        first = false;
    }

    let speed = 4 * deltaTime;

    let rad = degrees2radian(player.rotation)

    let v = new Victor(0, -1).rotate(player.rotation).multiplyScalar(speed)

    player.x += v.x;
    player.y += v.y;

    // detect a collision with your own trail
    for (point of points.slice(0, -5)) {
        let playerPosition = new Victor(player.x, player.y)
        if (playerPosition.distance(new Victor(point.x, point.y)) < 10)
            location.reload()
    }

    // detect a collision with the edge of the screen
    if (player.x < 0 || player.y < 0 || player.x > app.screen.width || player.y > app.screen.height)
        location.reload()
});

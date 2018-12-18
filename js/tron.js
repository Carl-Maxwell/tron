
Keyboard.initialize();

var app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
var bunny = PIXI.Sprite.fromImage('https://pixijs.io/examples/required/assets/bunny.png');

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 5 * 4;

app.stage.addChild(bunny);

// draw the trailing line 

let trail = new PIXI.Graphics();
app.stage.addChild(trail);

let points = [new Victor(bunny.x, bunny.y)]

Input.on('right', () => { bunny.rotation += Math.PI * 0.5; })
Input.on('left', () => { bunny.rotation -= Math.PI * 0.5; })

app.ticker.add(function (deltaTime) {

    trail.clear();

    let newPoint = new Victor(bunny.x, bunny.y)

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

    let rad = degrees2radian(bunny.rotation)

    let v = new Victor(0, -1).rotate(bunny.rotation).multiplyScalar(speed)

    bunny.x += v.x;
    bunny.y += v.y;

    // detect a collision with your own trail
    for (point of points.slice(0, -5)) {
        let playerPosition = new Victor(bunny.x, bunny.y)
        if (playerPosition.distance(new Victor(point.x, point.y)) < 10)
            location.reload()
    }

    // detect a collision with the edge of the screen
    if (bunny.x < 0 || bunny.y < 0 || bunny.x > app.screen.width || bunny.y > app.screen.height)
        location.reload()
});

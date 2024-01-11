const canvas = document.querySelector("canvas"),
    c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const X_CENTER_OF_CANVAS = canvas.width / 2;
const Y_CENTER_OF_CANVAS = canvas.height / 2;

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill()
    }
}

class Projectile extends Player {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color);
        this.velocity = velocity;
    }
    update() {
        this.draw()
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Enemy extends Projectile {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color, velocity)
    }
}



const player = new Player(X_CENTER_OF_CANVAS, Y_CENTER_OF_CANVAS, 30, "white");

let projectile;
const projectiles = [];
const enemies = [];

addEventListener("click", (event) => {

    let angle = Math.atan2(event.clientY - Y_CENTER_OF_CANVAS, event.clientX - X_CENTER_OF_CANVAS);

    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }



    projectiles.push(
        new Projectile(
            X_CENTER_OF_CANVAS, Y_CENTER_OF_CANVAS, 5, "red", velocity
        )
    )
    spawnEnemies()
    animate()
});

function spawnEnemies() {
    setInterval(() => {
        // ! WHEN YOU ARE GETTING A DISTANCE BETWWEN TWO POINTS YOU ALWAYS WANT TO SUBSTRACT FROM THE DESTINATION

        const x = Math.random() * canvas.width,
            y = Math.random() * canvas.height,
            radius = 30,
            color = "green";

        let angle = Math.atan2(Y_CENTER_OF_CANVAS - y, X_CENTER_OF_CANVAS - x);

        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate);

    projectiles.forEach(prjectile => {
        prjectile.update();
    })
    enemies.forEach(enemy => {
        enemy.update();
    })
    player.draw()
}
player.draw()

const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 500;
let gameSpeed = 5;

const range = document.querySelector('input');
const gameSpeedSpan = document.querySelector('span');

range.addEventListener('change', (event) => {
    gameSpeedSpan.innerHTML = event.target.value;
    gameSpeed = Number(event.target.value);
})

class Layer {
    constructor(imagePath, speedModifier) {
        this.backgroundImage = new Image();
        this.backgroundImage.src = imagePath;
        this.speedModifier = speedModifier;
        this.speed = this.speedModifier * gameSpeed;
        this.imageWidth = 1667;
        this.imageHeight = 500;
        this.x = 0;
        this.y = 0;
        this.x2 = this.imageWidth;
        this.y2 = 0;
    }

    update() {
        this.speed = this.speedModifier * gameSpeed;
        if (this.x > -this.imageWidth) {
            this.x -= this.speed;
        } else {
            this.x = Math.floor(this.imageWidth + this.x2 - this.speed);
        }
        if (this.x2 > -this.imageWidth) {
            this.x2 -= this.speed;
        } else {
            this.x2 = Math.floor(this.imageWidth + this.x - this.speed);
        }
    }

    draw() {
        context.drawImage(this.backgroundImage, this.x, this.y, this.imageWidth, this.imageHeight);
        context.drawImage(this.backgroundImage, this.x2, this.y2, this.imageWidth, this.imageHeight);
    }
}


let layers = [
    new Layer('/images/layer-1.png', 0.6),
    new Layer('/images/layer-2.png', 0.55),
    new Layer('/images/layer-3.png', 0.65),
    new Layer('/images/layer-4.png', 0.5),
    new Layer('/images/layer-5.png', 0.4),
]

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach((layer) => {
        layer.update();
        layer.draw();
    })
    requestAnimationFrame(animate);
}

animate()
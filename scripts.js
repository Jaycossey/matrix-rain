// GLOBALS --------------
// get canvas and context listing
const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const dropArray = [];
const MAX_DROPS = 50;

// tickCount for iteration
let tickCount = 0;

// colors
const black = "#162517"; // rgb(137, 0, 161)
const black2 = "rgb(137, 0, 161)";
const darkGreen = "rgb(200, 0, 200)";
const lightGreen = "rgb(255, 0, 255)";

// set and assign canvas width and height
const width = 900;
const height = 600;
console.log(600 / 20)
canvas.width = width;
canvas.height = height;

// grid pixel size
const pixelWidth = 20;
const pixelHeight = 20;
const trailHeight = 20;

// canvas styles
canvas.style.backgroundImage = `radial-gradient(closest-side, ${black2}, ${black})`;
// canvas.style.textAlign = `center`;
ctx.font = "20px monospace";
ctx.fillStyle = lightGreen;
// ctx.shadowColor = darkGreen;
ctx.shadowBlur = 5;

// assign random character
const getRandomCharacter = () => {
    // const range = 33 + 126;
    const asciiValue = Math.floor(Math.random() * (96 - 33) + 33);
    const strChar = String.fromCharCode(asciiValue);
    // console.log(`randomAscii: ${asciiValue}\ntoString: ${strChar}`)
    return strChar;
}

// console.log(`function return: ${getRandomCharacter()}`);
// Random Character that is left behind
class Trail {
    constructor(x, y) {
        this.x = x,
            this.y = y,
            this.width = pixelWidth,
            this.height = pixelHeight * trailHeight,
            this.characters = [],
            this.ctx = ctx
    }

    // generate trail characters
    generateCharacters(trailLength) {
        // populate array with random characters
        for (let i = 0; i < trailLength; i++) {
            this.characters[i] = getRandomCharacter();
        }
        // console.log(this.characters);
    }

    draw() {
        // TODO: Update the scope of this gradient and assignment, bit messy here but will work for now
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + width, this.y - height);
        gradient.addColorStop(0, lightGreen);
        gradient.addColorStop(0.2, darkGreen);
        gradient.addColorStop(0.8, "rgba(72, 152, 78, 0)");
        ctx.fillStyle = gradient;

        // draw this on screen after tick
        this.characters.forEach((character, i) => {
            // would be easiest to create some funky maths here to keep track of each characters x and y
            ctx.fillText(character, this.x, this.y - (pixelHeight * i));
        })
    }
    update() {
        // update the y position of the trail
        if (this.y >= height) {
            this.y = 0;
        }
        this.y += pixelHeight;

        // update the offset window count
        if (this.y <= pixelHeight * trailHeight) {
            // total height of trail divided by y gives single numeric offset in grid
            let offset = Math.floor((pixelHeight * trailHeight) / this.y);

            ctx.clearRect(this.x, height - (pixelHeight * offset), pixelWidth, pixelHeight);
        }

        ctx.clearRect(this.x, this.y - (pixelHeight * trailHeight), pixelWidth, pixelHeight);

        ctx.fillText(getRandomCharacter(), this.x, this.y - pixelHeight)
    }
}
// The Actual Drops of 'rain'
class LetterDrop {
    constructor(x, y) {
        this.x = x,
            this.y = y,
            this.width = pixelWidth,
            this.height = pixelHeight,
            this.trail = new Trail(this.x, this.y - pixelHeight)
        // console.log(this.trail);
    }

    // draw at new location
    draw(x, y) {
        // new character each iteration
        let newChar = getRandomCharacter();
        this.character = newChar;

        // print text on canvas
        ctx.fillText(this.character, x, y);
        // console.log(this.character);
    }

    // clear current position and tick down, use y * tick counter
    update() {
        // change current frame and drop down 
        ctx.clearRect(this.x, this.y - 16, this.width, this.height);
        // console.log(this.y);
        if (this.y >= height) {
            this.y = 0;
        } else {
            this.y += 16;
        }

        this.draw(this.x, this.y);
    }
}

// assign random position of character drops
const randomPos = (value) => {
    if (value === 'x') {
        return Math.floor(Math.random() * (900 - 1) + 1);
    }

    return Math.floor(Math.random() * (600 - 1) + 1);
}

// populate array
for (let i = 0; i <= MAX_DROPS; i++) {
    dropArray.push(new LetterDrop(randomPos('x'), randomPos('y')));
}
dropArray.forEach((drop) => {
    drop.trail.generateCharacters(10);
    drop.trail.draw();
})


// update each element
setInterval(() => {
    dropArray.forEach((drop) => {
        drop.update();
        drop.trail.update();
    })
}, 100);




// TESTING !!!!
// const testLetter = new LetterDrop(100, 400);
// testLetter.trail.generateCharacters(trailHeight);
// testLetter.trail.draw();

// setInterval(() => {
//     testLetter.update();
//     testLetter.trail.update();
// }, 200)


// TEXT OVERLAY --------------------------
const container = document.getElementById('text');

const hello = "Hello, World...";
const myName = "My name is Ian"
const job = " Software Developer";
const job2 = " Penetration Tester";
const job3 = " Father";
const job4 = " Husband";
const job5 = " Biker";
const egg = "Wake up Neo...";
const egg2 = "Follow the white rabbit...";

const textArr = [hello, myName, job, job2, job3, job4, job5, egg, egg2];

let currentIterationTimer = (150 * job.length) * 1.25;

const writeText = (text, prefix) => {
    container.textContent = prefix;
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            container.innerHTML += text[i];
        }, 150 * i);
    }
}

for (let i = 0; i < textArr.length; i++) {
    setTimeout(() => {
        if (i < 2 || i >= textArr.length - 2) {
            writeText(textArr[i], "");
        } else {
            writeText(textArr[i], "I am a ")
        }
    }, currentIterationTimer * i);
}

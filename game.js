const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Bird properties
const bird = {
    x: 50,
    y: canvas.height / 2,
    size: 20,
    gravity: 0.5,
    lift: -10,
    velocity: 0
};

// Pipes array
let pipes = [];
let frame = 0;
let score = 0;

// Handle bird jump (for desktop)
document.addEventListener("keydown", () => {
    bird.velocity = bird.lift;
});

// Handle bird jump (for mobile)
document.addEventListener("touchstart", () => {
    bird.velocity = bird.lift;
});

// Game loop
function update() {
    ctx.fillStyle = "#111"; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw bird
    ctx.fillStyle = "#22FFCC"; // Solana cyan
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
    
    // Gravity effect
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Prevent bird from falling off
    if (bird.y + bird.size >= canvas.height) {
        bird.y = canvas.height - bird.size;
        bird.velocity = 0;
    }
    
    // Pipe movement
    if (frame % 90 === 0) {
        let gap = 150;
        let topHeight = Math.random() * (canvas.height / 2);
        let bottomHeight = canvas.height - topHeight - gap;

        pipes.push({ x: canvas.width, y: 0, width: 50, height: topHeight });
        pipes.push({ x: canvas.width, y: canvas.height - bottomHeight, width: 50, height: bottomHeight });
    }

    ctx.fillStyle = "#8833FF"; // Solana purple
    pipes.forEach((pipe, index) => {
        pipe.x -= 2;
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);

        // Collision detection
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.size > pipe.x &&
            bird.y < pipe.y + pipe.height &&
            bird.y + bird.size > pipe.y
        ) {
            alert("Game Over! Your Score: " + score);
            document.location.reload();
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });

    frame++;
    requestAnimationFrame(update);
}

// Start game
update();

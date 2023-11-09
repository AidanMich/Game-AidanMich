const gameContainer = document.getElementById("game-container");
const enemy = document.getElementById("enemy");
const path = [
  { x: 100, y: 100 },
  { x: 300, y: 100 },
  { x: 300, y: 300 },
  { x: 100, y: 300 },
];
let currentWaypointIndex = 0; // Initialize the current waypoint index

// Adjust the enemy's initial position to the first waypoint
enemy.style.left = path[0].x + "px";
enemy.style.top = path[0].y + "px";

let enemySpeed = 2; // Adjust this value for the enemy's movement speed

let selectedTower = null;

// Event listeners for tower selection buttons
document.getElementById("place-tower1").addEventListener("click", function () {
  selectedTower = "Tower1.png";
  // to-do: make the button actually "add" the tower to the canvas
});

document.getElementById("place-tower2").addEventListener("click", function () {
  selectedTower = "Tower2.png";
});

document.getElementById("place-tower3").addEventListener("click", function () {
  selectedTower = "Tower3.png";
});

// Event listener for placing towers on the canvas
gameContainer.addEventListener("click", function (event) {
  if (selectedTower) {
    const tower = new Image();
    tower.src = selectedTower;
    tower.classList.add("placed-tower");
    tower.style.position = "absolute";
    tower.style.left =
      event.clientX - gameContainer.getBoundingClientRect().left + "px";
    tower.style.top =
      event.clientY - gameContainer.getBoundingClientRect().top + "px";

    // You may need to adjust the position and size of the tower
    // based on the image dimensions and game grid.
    tower.style.width = "50px";
    tower.style.height = "50px";

    // Append the tower image to the game container
    gameContainer.appendChild(tower);

    selectedTower = null;
  }
});

// Create a game loop
function gameLoop() {
  // Update game logic here

  // Check if the enemy has reached the current waypoint
  const currentWaypoint = path[currentWaypointIndex];
  const enemyX = parseFloat(enemy.style.left);
  const enemyY = parseFloat(enemy.style.top);
  const dx = currentWaypoint.x - enemyX;
  const dy = currentWaypoint.y - enemyY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > enemySpeed) {
    const newX = enemyX + (dx / distance) * enemySpeed;
    const newY = enemyY + (dy / distance) * enemySpeed;
    enemy.style.left = newX + "px";
    enemy.style.top = newY + "px";
  } else {
    // The enemy reached the current waypoint, move to the next waypoint
    currentWaypointIndex++;
    if (currentWaypointIndex < path.length) {
      // Update the enemy's position to the next waypoint
      enemy.style.left = path[currentWaypointIndex].x + "px";
      enemy.style.top = path[currentWaypointIndex].y + "px";
    } else {
      // The enemy reached the end of the path
      // You can handle what happens when the enemy reaches the end here
    }
  }

  // Check for game conditions and handle enemy interactions here

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

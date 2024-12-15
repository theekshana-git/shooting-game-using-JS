# Shooting Game

This is a 2-player shooting game where each player can control a character and shoot at the opponent to score points. The game features AI-controlled opponents that can be toggled on or off for each player. The game is built using HTML5 Canvas and JavaScript.

## Files

- `index.html`: The main HTML file that sets up the game canvas and controls.
- `game.js`: The JavaScript file that contains the game logic, including player movement, shooting, AI behavior, and collision detection.

## Features

- **Two players**: The game supports two players, where each player controls a character that can move and shoot.
- **AI control**: Both players can be controlled by AI. The AI can be toggled on or off by clicking the respective button for each player.
- **Player controls**:
  - **Player 1**: Arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) to move, `Space` to shoot.
  - **Player 2**: WASD keys (`W`, `A`, `S`, `D`) to move, `C` to shoot.
- **Game mechanics**: The goal is to shoot your opponent and avoid getting hit. Each player has a cooldown period between shots.
- **Game over**: The game ends when a player reaches 25 points, and the winner is declared.

## How to Play

1. Open the `index.html` file in your browser.
2. Click the "Turn On Player 1" and "Turn On Player 2" buttons to toggle AI for each player.
3. Player 1 uses the arrow keys to move and spacebar to shoot.
4. Player 2 uses the WASD keys to move and the `C` key to shoot.
5. The game continues until one player reaches 25 points, at which point the game ends and the winner is displayed.

## Controls

- **Player 1 (Red)**:
  - Move: Arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`)
  - Shoot: `Space` bar
  - Toggle AI: "Turn On Player 1" button
- **Player 2 (Blue)**:
  - Move: WASD keys (`W`, `A`, `S`, `D`)
  - Shoot: `C` key
  - Toggle AI: "Turn On Player 2" button

## Game Logic

### AI Behavior
- **Player 1 and Player 2**: AI behavior can be toggled for both players using the respective buttons. When the AI is enabled, it will randomly move the player and shoot at the opponent. The AI's movement and shooting patterns are random and the AI tries to dodge the incoming bullets while shooting at its target.

### Collision Detection
- **Bullets**: Bullets fired by the players will move across the canvas and collide with the opposing player. When a bullet hits a player, the opponent player gains a point.
- **Game Over**: The game ends when a player's score reaches 25 points.

## Restart Game
After the game ends, you can restart it by clicking the "Restart Game" button that appears on the screen.

## Requirements
- Modern browser with JavaScript and HTML5 support.


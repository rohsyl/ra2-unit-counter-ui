# ra2-unit-counter-ui

RA2 Unit Counter UI is a simple tool that provide a web UI to show units count taken from the RA2Values.exe. 
The maain

## Features

- Show units count in real time
- Show money amount in real time
- Show "Low power" signal in real time
- 1v1 mode
- Scoreboard

## Dependencies

- RA2Values.exe by Sneer
- Node.js

## Installation

Clone repository    
```bash
git clone git@github.com:rohsyl/ra2-unit-counter-ui.git
```

Install dependencies
```bash
npm install
```

## Configuration

Copy .env.example to .env and edit it to match your configuration

```bash
cp .env.example .env
```

Set the path to your Red Alert 2 installation directory
```bash
GAME_DIR="C:\Program Files (x86)\Origin Games\Command and Conquer Red Alert II"
```

## Usage

Start the server
```bash
npm start
```

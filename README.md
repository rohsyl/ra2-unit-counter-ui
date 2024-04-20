# ra2-unit-counter-ui

RA2 Unit Counter UI is a simple tool that provide a web UI to show a units counter. 
It is using the integrated Unit Counter of the CnCNet QM Client.

## Features

- Show units count in real time
- Show money amount in real time
- Show "Low power" signal in real time
- 1v1 and 2v2 mode
- Scoreboard
- API to interact with scroreboard and get data

## Dependencies

- CnCNet QM Client

## Installation

- Download the latest release from [here](https://github.com/rohsyl/ra2-unit-counter-ui/releases/latest/download/ra2-ui-win.exe)
- Move the file to the RA2 game folder.

## Usage

- Start the CnCNet QM Client and start the unit counter feature
- Run the `ra2-ui-win.exe`
- Open the dashboard in your browser (link shown in the console)

## API

Some endpoints are exposed to allow user to interact with the ui and/or get some data.

The base url is the same as shown in the console window.
```
RA2 - UI by wushaolin v0.4.0
Server successfully running on port 8081
Open : http://localhost:8081/ra2 in your browser
```

Take the `http://localhost:8081` part and append the endpoint like `/api/v1/...`.

### Status code

Api will return different status code if there is any errors :
- `200 OK` : when everything is okay
- `425 Too Early` : when there is not data. the main reason is when you didn't opened the dashboard before starting to request. Make sure to open the dashboard in your browser and keep it open all the time. If the same error persist even with the dashboard open, just reload the page.
- `500` : unhandler error. Please contact me.

### Get players

This endpoint will return you the list of all players with their colors. The response will vary depends if you are in 1v1 more or 
2v2 mode.

Endpoint :
```
GET:/api/v1/players
```

Response when 1v1 mode
```
{
    "data": {
        "gameMode": "1v1",
        "players": [
            {
                "player": "Player 1",
                "color": "red"
            },
            {
                "player": "Player 2",
                "color": "blue"
            }
        ]
    }
}
```
> With Status 200 OK

Response when 2v2 mode
```
{
    "data": {
        "gameMode": "2v2",
        "players": [
            {
                "player": "Player 1",
                "color": "red",
                "team": 0
            },
            {
                "player": "Player 2",
                "color": "blue",
                "team": 0
            },
            {
                "player": "Player 3",
                "color": "yellow",
                "team": 1
            },
            {
                "player": "Player 4",
                "color": "green",
                "team": 1
            },
        ]
    }
}
```
> With Status 200 OK



### Get score

This endpoint will return the actual score. it will return the score of the current game mode (1v1 or 2v2)

Endpoint :
```
GET:/api/v1/score
```

Response :
```
{
    "data": {
        "gameMode": "1v1|2v2",
        "score": {
            "score1": 1,
            "score2": 1
        }
    }
}
```
> With Status 200 OK

### Update score

This endpoint will let you increment or decrement the score for any of the teams/players. It will also update the score for the current game mode (1v1 or 2v2)

Endpoint :
```
PUT:/api/v1/score
```

with body : 
```
{
    "action": "increment",
    "target": 0
}
```

and make sure to send the headers :
```
Content-Type: application/json
```

**action**

parameter action can be `increment` or `decrement`.

**target**

parameter target can be `0` or `1`.
- `0` -> will change the score of the player/team 1
- `1` -> will change the score of the player/team 2

### Clear score

This endpoint will reset the score to **0 - 0**.

Endpoint: 
```
DELETE:/api/v1/score
```


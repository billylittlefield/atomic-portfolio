\[ In Development \]

Morado is a web-app implementation of a popular tile-laying board game. Players alternate pulling tiles from "factories" and placing them in available staging rows, before they are ultimately transferred to the final tile board and scored. Tile theme aside, this is a fun multiplayer abstract game with a simple set of rules.

This project began as, more than anything, an excuse to play around with some new technologies. I'm using `React` with `Redux` to handle state (+ `Immer`, which I've found is is a wonderful way to reduce boilerplate). I wanted the game to be playable online, so I use `Socket.IO` to setup websocket rooms for active games. 

The reducers used to perform these state updates live in a `shared` package that gets imported in both the `client` and `server`. Therefore, the client can optimistically update state prior to server validation & persistence - it's all using the same logic.

Morado's back-end is a simple Node.js (`Express`) server with both websocket services for live games and an HTTP RESTful API for game lobby & authentication. `Knex` hooks up to a `MySQL` database, and `Redis` covers session management. The UI itself uses `Tether` to slide tiles around by changing tile anchors, which allows for a more dynamic-feeling gameplay. I built custom SVGs + rotation logic to create the "3D-ish" spinning tiles. My 10th grade trig teacher would've been proud for my usage of *SOH-CAH-TOA* to make those tiles spin.

The project is not yet live, but will be soon!

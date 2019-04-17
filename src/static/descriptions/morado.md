Morado is a web-app implementation of a popular tile-laying board game. Players alternate pulling tiles from "factories" and placing them in staging rows on their board, before they are ultimately transferred to a final tile board and scored. Tile theme aside, this is a fun multiplayer abstract game with a simple set of rules.

This project began as, more than anything, an excuse to play around with some new technologies. I built the game using `React` components and handle state changes with `Redux` (+ `Immer`, which is a great way to reduce boilerplate). I wanted the game to be playable online, so I used `Socket.IO` to setup websocket rooms for all active games. When a player makes a move, the action is broadcasted to all socket clients in the game.

The reducers used to perform these state updates belong to a `shared` package imported in both the `client` and `server` code. Therefore, the clients can optimistically update state prior to server validation & persistence because it's all using the same logic. 

Morado's back-end is a simple Node.js (`Express`) server with both websocket services for live games and standard HTTP RESTful routes for the game lobby & authentication. I use `Knex` to hook up to a `MySQL` database, and `Redis` for session management. The UI itself uses `Tether` to slide tiles around, which was a fun little hijacking of functionality to create dynamic gameplay. I built custom SVGs + rotation logic to create the "3D-ish" spinning tiles. My 10th grade trig teacher would've been proud for my usage of *SOH-CAH-TOA* to make those tiles spin.

This game is not yet live, but will be soon!

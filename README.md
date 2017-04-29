# TicTacToeChallenge

This is a demo Tic Tac Toe for a coding challenge.  Technologies used: 

- Webpack to serve up scripts 
- ES6 throughout

Notable features: 

- Stringifigies a JS object to send as JSON 
- Handles win/lose/draw board states 
- Throttles AJAX requests by setting an instance variable, `this.fetchingMove`

Things that need improvement:

- Handles game loop with a `setInterval`, where a `while` loop would be preferable 
- Does not do error handling for incoming `getmove` requests 


const mock_rl = {
    prompt: ()=>{},
    close: ()=>{}
};


let game = require('./TTT.js')(3);
game.ai = true;
game.print_gird();
console.log(game.onInput(mock_rl,"play 1 1"));
console.log(game.onInput(mock_rl,"play 2 1"));
console.log(game.onInput(mock_rl,"play 2 2"));
console.log(game.onInput(mock_rl,"play 2 3"));
console.log(game.onInput(mock_rl,"play 3 3"));
console.log(game);
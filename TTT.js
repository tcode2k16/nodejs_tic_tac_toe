module.exports = (width) => {

    let board = [];
    for (let i = 0; i<width; i++) {
        board.push([]);
        for (let j=0; j<width; j++)
            board[i].push(0);
    }

    const obj = {
        ai: false,
        count: 0,
        turn: 1,
        board,
        width,
        check_win,
        print_gird,
        set_play,
        start,
        onInput,
        clearT
    };
    const welcome = 'Welcome to the TTT game. Start by typing "play x y" where x y is your location.';


    
    
    function onInput(rl,line) {
        clearT.bind(obj)();
        
        let cmd = line.split(' ');

        switch (cmd[0]) {
            case 'play':
                switch (set_play.bind(obj)(cmd[1],cmd[2])) {
                    case -1:
                        console.log('invalid location');
                        break;
                    case -2:
                        console.log('already taken');
                    default:
                        this.count++;
                        let winner = check_win.bind(obj)();
                        if (winner !== -1) {
                            console.log((winner===1?"X":"O")+' is the winner!!! :)');
                            rl.close();
                            return winner;
                        }
                        else if (this.count >= Math.pow(width,2)) {
                            console.log('draw >___< (try again)');
                            rl.close();
                            return 0;
                        }
                }
                break;
            default:
                console.log('invalid command!!! :(');
                break;
        }
        print_gird.bind(obj)();
        rl.prompt();
        return -1;
    }


    function clearT() {
        if (!this.ai)
            process.stdout.write('\u001B[2J\u001B[0;0f');
    }

    function start() {
        // rl
        const readline = require('readline');
        const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'T__T : '
        });
        rl.on('line', onInput.bind(obj,rl));

        // setup
        clearT();
        console.log("\n"+welcome);
        this.print_gird();
        rl.prompt();
    }

    function check_win() {
        // check row
        for (let i = 0; i < width; i++) {
            let val = this.board[i][0];
            for (let j  = 1; j < width; j++)
                if (this.board[i][j] !== val)
                    val = -1;
            if (val !== -1 && val !== 0) return val;
        }

        // check col
        for (let i = 0; i < width; i++) {
            let val = this.board[0][i];
            for (let j  = 1; j < width; j++)
                if (this.board[j][i] !== val)
                    val = -1;
            if (val !== -1 && val !== 0) return val;
        }

        // check dia
        let val = this.board[0][0];
        for (let i=1; i<width; i++)
            if (this.board[i][i] !== val)
                val = -1;
        if (val !== -1 && val !== 0) return val;
        

        val = this.board[0][width-1];
        for (let i=width-2; i>=0; i--)
            if (this.board[width-1-i][i] !== val)
                val = -1;
        if (val !== -1 && val !== 0) return val;

        return -1;
    }

    function print_gird() {
        let divider = "";
        for (let i = 0; i<width*2; i++)
            divider += "- ";
        divider += "-";
            
        process.stdout.write(divider+'\n');
        for (let row of this.board) {

            process.stdout.write('| ');
            for (let item of row) {
                let symb = "";
                switch (item) {
                    case 1: symb = "X"; break;
                    case 2: symb = "O"; break;
                    default: symb = " "; break;
                }
                process.stdout.write(symb+' | ');
            }
            
            process.stdout.write('\n'+divider+'\n');
        }
        console.log("It is "+(this.turn===1 ? "X":"O")+"'s turn.");
        console.log('count: '+this.count);
        console.log("\n");
    }

    function set_play(x,y) {
        // -1 invalid location
        // -2 already played
        // 1 success
        x--; y--;
        if (x<0 || x>width-1 || y<0 || y>width-1)
            return -1;
        
        if (this.board[y][x] !== 0)
            return -2;
        
        this.board[y][x] = this.turn;
        this.turn = this.turn === 1 ? 2 : 1;
        return 1;
    }
    return obj;
}
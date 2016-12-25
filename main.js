const width = 3;

let game = ((width) => {
    let board = [];
    for (let i = 0; i<width; i++) {
        board.push([]);
        for (let j=0; j<width; j++)
            board[i].push(0);
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
    }

    function set_play(x,y) {
        // -1 invalid location
        // -2 already played
        // 1 success
        x--; y--;
        if (x<0 || x>width-1 || y<0 || y>width-1)
            return -1;
        
        if (this.board[x][y] !== 0)
            return -2;
        
        this.board[x][y] = this.turn;
        this.turn = this.turn === 1 ? 2 : 1;
        return 1;
    }


    return {
        turn: 1,
        board,
        width,
        check_win,
        print_gird,
        set_play
    };
})(width);


// game.board = [[1,2,1,2],
//               [0,0,2,0],
//               [1,2,1,0],
//               [2,2,1,0]];

game.print_gird();
game.set_play(0,0);
game.set_play(1,1);
game.set_play(2,2);
game.print_gird();
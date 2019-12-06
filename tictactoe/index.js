(function(){
    document.getElementById('floating-info').style.visibility = "visible";
    
    const root = document.getElementById('root');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    root.appendChild(canvas);
    
    const state = {
        animation:{
            lines:{
                x0: 0, // x = progresses
                x1: 0,
                x2: 0,
                x3: 0,
                y1: 0, // y = positions
                y2: 0,
                ticks: 40,
                thickness: 100,
                texture: document.createElement('img')
            }
        },
        game:{
            board: [],
            player1: true,
            moves: 0
        },
        screen:{
            size: 0,
            sh: 0, // height spacing
            sw: 0 // width spacing
        }
    }

    function createBoard(){
        const board = state.game.board;
        for(let i = 0; i < 3; i++){ // rows
            board.push([]);
            for(let j = 0; j < 3; j++){ // colls
                board[i].push({obj: null, ani: false});
            }
        }
    }

    function restartGame(){
        const lines = state.animation.lines;

        state.game.board = [];
        createBoard();
        state.game.moves = 0;
        state.game.player1 = true;
        lines.x0 = lines.x1 = lines.x2 = lines.x3 = 0;
    }

    function whosWinner(){
        if(state.game.player1){
            console.log("X won!");
        }else{
            console.log("O won!");
        }

        restartGame();
    }

    function draw(){
        console.log("Draw!");

        restartGame();
    }

    function logicLoop(){
        const game = state.game;

        game.moves++;

        // Col check
        for(let i = 0; i < 3; i++){
            if(game.board[i][0].obj === game.board[i][1].obj && game.board[i][1].obj === game.board[i][2].obj && game.board[i][0].obj !== null)
                return whosWinner();
        }

        // Row check
        for(let i = 0; i < 3; i++){
            if(game.board[0][i].obj === game.board[1][i].obj && game.board[1][i].obj === game.board[2][i].obj && game.board[0][i].obj !== null)
                return whosWinner();
        }

        // Diagonal
        if(game.board[0][0].obj === game.board[1][1].obj && game.board[1][1].obj === game.board[2][2].obj && game.board[0][0].obj !== null){
            return whosWinner();
        }else if(game.board[2][0].obj === game.board[1][1].obj && game.board[1][1].obj === game.board[0][2].obj && game.board[2][0].obj !== null){
            return whosWinner();
        }

        if(game.moves >= 9)
            return draw();

        game.player1 = !game.player1;
    }

    function drawPieces(){
        const board = state.game.board;
        const s = state.screen.size;
        const sw = state.screen.sw;
        const sh = state.screen.sh;

        board.map((col, j)=>{
            col.map(({obj, ani}, i)=>{
                if(obj === "X"){
                    ctx.fillStyle = "blue";
                    ctx.fillRect(sw+(j*s/3+(s/9)), sh+(i*s/3+(s/9)), 100, 100);
                }else if(obj === "O"){
                    ctx.fillStyle = "red";
                    ctx.fillRect(sw+(j*s/3+(s/9)), sh+(i*s/3+(s/9)), 100, 100);
                }
            })
        })
    }

    function drawLines(){
        const lines = state.animation.lines;
        const sw = state.screen.sw;
        const sh = state.screen.sh;
        const s = state.screen.size;

        lines.y1 = s/3;
        lines.y2 = 2*s/3;

        ctx.fillStyle = 'black'; //ctx.createPattern(lines.texture, 'repeat');

        ctx.fillRect(sw, lines.y1+sh, lines.x0, s/lines.thickness);
        ctx.fillRect(lines.y1+sw, sh, s/lines.thickness, lines.x1);
        ctx.fillRect(sw, lines.y2+sh, lines.x2, s/lines.thickness);
        ctx.fillRect(lines.y2+sw, sh, s/lines.thickness, lines.x3);

        // To make the first time animation
        if(lines.x0 < s){
            lines.x0 = lines.x0 + (lines.x0 + s/lines.ticks > s ? s - lines.x0 : s/lines.ticks);
            return;
        }else if(lines.x1 < s){
            lines.x1 = lines.x1 + (lines.x1 + s/lines.ticks > s ? s - lines.x1 : s/lines.ticks);
            return;
        }else if(lines.x2 < s){
            lines.x2 = lines.x2 + (lines.x2 + s/lines.ticks > s ? s - lines.x2 : s/lines.ticks);
            return;
        }else if(lines.x3 < s){
            lines.x3 = lines.x3 + (lines.x3 + s/lines.ticks > s ? s - lines.x3 : s/lines.ticks);
            return;
        }else if(lines.x1 > s || lines.x3 > s){ // corrects bad placement when resizing
            lines.x1 = lines.x3 = s;
        }
        // Bad code, i know. The second ternary '?' is only checking how much do i need to sum to have the perfect line
    }

    function play(col, row){
        const game = state.game;
        if(game.player1){
            game.board[col][row].obj = "X";
        }else{
            game.board[col][row].obj = "O";
        }
        logicLoop();
    }

    canvas.addEventListener("mousedown", e =>{ // mouse click
        const screen = state.screen;
        const game = state.game;

        const col = Math.floor((e.offsetX-screen.sw)/(screen.size/3));
        const row = Math.floor((e.offsetY-screen.sh)/(screen.size/3));

        if(col >= 0 && col < 3 && row >= 0 && row < 3){
            if(e.button === 0 && game.board[col][row].obj === null){
                play(col, row);
                canvas.style.cursor = 'default';
            }
        }
    });
    canvas.addEventListener("mousemove", e =>{
        const screen = state.screen;
        const game = state.game;

        const col = Math.floor((e.offsetX-screen.sw)/(screen.size/3));
        const row = Math.floor((e.offsetY-screen.sh)/(screen.size/3));

        if(col >= 0 && col < 3 && row >= 0 && row < 3){
            if(game.board[col][row].obj === null){
                canvas.style.cursor = 'pointer';
            }else{
                canvas.style.cursor = 'default'; 
            }
        }else{
            canvas.style.cursor = 'default';
        }
    });

    function update(){
        if(canvas.width !== root.clientWidth || canvas.height !== root.clientHeight){
            // Clears the canvas!
            canvas.width = root.clientWidth;
            canvas.height = root.clientHeight;
        }

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const game = state.game;
        const screen = state.screen;

        screen.sw = (w > h ? (w-h)/2 : 0); // Width spacing
        screen.size = (w > h ? h : w);
        screen.sh = (w > h ? 0 : (h-w)/2); // Height spacing

        ctx.fillStyle = 'lightgray';
        ctx.fillRect(screen.sw, screen.sh, screen.size, screen.size);

        drawLines();

        drawPieces();
        
        requestAnimationFrame(update);
    }

    update();
    restartGame();
})();
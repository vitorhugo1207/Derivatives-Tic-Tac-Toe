// Global variables
var result;
var randKey;
var cont = 0;

// Main
var TicTacToe = {
    init: function () {
        TicTacToe.symbols = ["❌", "⭕"];
        TicTacToe.WINNING_SETS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        TicTacToe.squares = Array.from(document.querySelectorAll(".square"));
        TicTacToe.board = document.querySelector(".board");
        TicTacToe.turnIndicator = document.querySelector(".turn-indicator");
        TicTacToe.newGameButton = document.querySelector(".new-game");
        TicTacToe.newGame();
        TicTacToe.addEventListeners();
    },

    newGame: function () {
        this.currentPlayer = 0;
        this.squares.forEach(function (x) {
            x.innerText = "";
            x.classList.remove("player0");
            x.classList.remove("player1");
        })
        this.setTurnIndicator();
        this.board.classList.remove("game-over");
        this.gameOver = false;
        this.newGameButton.classList.remove("show");
    },

    setTurnIndicator: function () {
        this.turnIndicator.innerText = "Vez do " + this.symbols[this.currentPlayer] + ". Pronto?"
        this.turnIndicator.classList.remove("player"+(1-this.currentPlayer));
        this.turnIndicator.classList.add("player"+this.currentPlayer);
    },

    addEventListeners: function () {
        var ttt = this;
        this.squares.forEach(function (x) {
            x.addEventListener("click", function() {
                ttt.play(this);
            });
        })
        this.newGameButton.firstElementChild.addEventListener("click", function () {
            if (ttt.gameOver) {
                ttt.newGame();
            }
        })
    },

    play: function (el) {
        if (!this.gameOver && el.innerText.length == 0) {
            // set text
            el.innerText = this.symbols[this.currentPlayer];
            el.classList.add("player" + this.currentPlayer);
            // check for win
            
            if (this.checkWin()) {                
               
                var winningText = this.symbols[this.currentPlayer] + " venceu!";
                this.endGame(winningText);
                
            }
            // check if draw
            else if (this.draw()) {
                var winningText = "Deu Velha!";
                this.endGame(winningText);
            }
            // next player
            else {
                this.nextTurn();
            }
           
        }
    },

    Question: function(){
        try{
            // Avoid refresh page
            event.preventDefault();
        }
        catch(e){};
        
        // Geting content radio
        const radioA = document.getElementById('radioA');
        const radioB = document.getElementById('radioB');
        const radioC = document.getElementById('radioC');
        const radioD = document.getElementById('radioD');
        
        // Opening Question.json
        const getResponse = response => response.json();
        const processJSON = json => {
            const listradiosInputs = [radioA, radioB, radioC, radioD]; 
            // Setting question when reload page
            if(radioA == null && radioB == null && radioC == null && radioD == null){
                // Board Block
                document.getElementById("boardId").style.cursor = 'not-allowed';
                for(var i = 1; i < 10; i++){
                    document.getElementById("squareSWAP".replace("SWAP", i)).style.pointerEvents = 'none';
                };

                // Getting random question
                const keys = Object.keys(json);
                const randIndex = Math.floor(Math.random() * keys.length);
                randKey = keys[randIndex];
                
                // Updating question
                document.querySelector("#textQuestion").innerText = json[randKey].question;
                document.querySelector("#radioContentA").innerText = json[randKey].alternatives.A;
                document.querySelector("#radioContentB").innerText = json[randKey].alternatives.B;
                document.querySelector("#radioContentC").innerText = json[randKey].alternatives.C;
                document.querySelector("#radioContentD").innerText = json[randKey].alternatives.D;
                result = json[randKey].result;
            }
            else{
                // Get which radio was chosen (player response)
                var radioValue;
                var item;
                

                for(var item of listradiosInputs){
                    if (item.checked == true){
                        radioValue = item.value;
                    }
                };
                
                // If player response was right
                if(radioValue == result){
                    // unblock board
                    document.getElementById("boardId").style.cursor = 'default';
                    for(var i = 1; i < 10; i++){
                        document.getElementById("squareSWAP".replace("SWAP", i)).style.pointerEvents = 'all';
                    };
                    // Show responses right and wrong
                    this.turnIndicator.innerText = this.symbols[this.currentPlayer] + " joga.\n Você acertou, faça sua jogada...";

                    // Getting random question
                    const keys = Object.keys(json);
                    const randIndex = Math.floor(Math.random() * keys.length);
                    randKey = keys[randIndex];

                    var board = this.board;
                    board.addEventListener('click', function boardClick(){
                        board.removeEventListener('click', boardClick);

                        // Updating question
                        document.querySelector("#textQuestion").innerText = json[randKey].question;
                        document.querySelector("#radioContentA").innerText = json[randKey].alternatives.A;
                        document.querySelector("#radioContentB").innerText = json[randKey].alternatives.B;
                        document.querySelector("#radioContentC").innerText = json[randKey].alternatives.C;
                        document.querySelector("#radioContentD").innerText = json[randKey].alternatives.D;
                        result = json[randKey].result;

                        // Board Block
                        document.getElementById("boardId").style.cursor = 'not-allowed';
                        for(var i = 1; i < 10; i++){
                            document.getElementById("squareSWAP".replace("SWAP", i)).style.pointerEvents = 'none';
                        };
                        // Reset radiosInputs
                        document.getElementById('radiosInputs').reset();
                    });

                    cont++;
                    console.log('Resposta certa!');
                    console.log(cont);
                    document.getElementById("contador").innerHTML = cont;  
                   
                }
                // If player response was wrong
                else{
                    // Block buttom "confirma"
                    document.getElementById("abc456").style.cursor = 'not-allowed';
                    document.getElementById("abc123").style.pointerEvents = 'none';
                    // Show responses right and wrong
                    // Pass player time
                    function sleep(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                    };
                    this.turnIndicator.innerText = this.symbols[this.currentPlayer] + " joga.\n Você errou, passando a vez..."
                    sleep(4000).then(() => {
                        this.nextTurn();
                        // Getting random question
                        const keys = Object.keys(json);
                        const randIndex = Math.floor(Math.random() * keys.length);
                        randKey = keys[randIndex];
                        
                        // Updating question
                        document.querySelector("#textQuestion").innerText = json[randKey].question;
                        document.querySelector("#radioContentA").innerText = json[randKey].alternatives.A;
                        document.querySelector("#radioContentB").innerText = json[randKey].alternatives.B;
                        document.querySelector("#radioContentC").innerText = json[randKey].alternatives.C;
                        document.querySelector("#radioContentD").innerText = json[randKey].alternatives.D;
                        result = json[randKey].result;
                        
                        // Board Block
                        document.getElementById("boardId").style.cursor = 'not-allowed';
                        for(var i = 1; i < 10; i++){
                            document.getElementById("squareSWAP".replace("SWAP", i)).style.pointerEvents = 'none';
                        };
                        // Reset radiosInputs
                        document.getElementById('radiosInputs').reset();

                        // unblock buttom "confirma"
                        document.getElementById("abc456").style.cursor = 'default';
                        document.getElementById("abc123").style.pointerEvents = 'all';
                    });
                };
            }
        };
        // Opening Question.json
        fetch("questions.json", {cache: "no-store"})
            .then(getResponse) 
            .then(processJSON) 
    },

    nextTurn: function () {
        this.currentPlayer = 1 - this.currentPlayer;
        this.setTurnIndicator();
    },

    checkWin: function () {
        var ttt = this;
        return TicTacToe.WINNING_SETS.some(function (x) {
            return x.every(function (i) {
                return ttt.squares[i].innerText == ttt.symbols[ttt.currentPlayer];
            });
        })
    },

    draw: function () {
        return this.squares.every(function (x) {
            return x.innerText.length > 0;
        })
    },

    endGame: function (winningText) {
        this.gameOver = true;
        this.turnIndicator.innerText = winningText;
        this.turnIndicator.classList.remove("player"+(1-this.currentPlayer));
        this.turnIndicator.classList.add("player"+this.currentPlayer);
        this.board.classList.add("game-over");
        this.newGameButton.classList.add("show");
    },
}

function newStart() {
    document.getElementById("contador").innerHTML = "0";
    cont = 0;
    console.log(cont);
}

window.onload = TicTacToe.init();
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
        this.turnIndicator.innerText = this.symbols[this.currentPlayer] + " joga."
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
            el.classList.add("player"+this.currentPlayer);
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

    newQuestion: function(){
        fetch("questions.json")
            .then(response => response.json())
            .then(data => {
                console.log(data.one.question)
                document.querySelector("#textQuestion").innerText = data.one.question
            })


        // const question = fetch('./questions.json').then(results => results.json());
    },

    questionVerification: function(){
        event.preventDefault();
        this.newQuestion();
        const buttonA = document.getElementById('buttonA').checked;
        const buttonB = document.getElementById('buttonB').checked;
        const buttonC = document.getElementById('buttonC').checked;
        const buttonD = document.getElementById('buttonD').checked;
        document.getElementById('buttons').reset();
        if(buttonA == true){
            
        };
        if(buttonB == true){

        };
        if(buttonC == true){

        };
        if(buttonD == true){

        };
        
        // if(buttonA == true){
        //     document.querySelector('#radioContentA').innerHTML = 'aa';
        //     this.nextTurn();
        // }
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
    }
}

window.onload = TicTacToe.init();
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

    Question: function(){
        // Avoid refresh page
        try{
            event.preventDefault();
        }
        catch(e){};

        // Opening Question.json
        const getResponse = response => response.json();
        const processJSON = json => {
            // Getting random question
            const keys = Object.keys(json);
            const randIndex = Math.floor(Math.random() * keys.length);
            const randKey = keys[randIndex];
            const result = json[randKey].result;
            
            // Setting question when reload page
            if(buttonA == null && buttonB == null && buttonC == null && buttonD == null){
                // Updating question
                document.querySelector("#textQuestion").innerText = json[randKey].question;
                document.querySelector("#radioContentA").innerText = json[randKey].alternatives.A;
                document.querySelector("#radioContentB").innerText = json[randKey].alternatives.B;
                document.querySelector("#radioContentC").innerText = json[randKey].alternatives.C;
                document.querySelector("#radioContentD").innerText = json[randKey].alternatives.D;
                console.log(result);
            }
            else{
                console.log(result);
                // Geting content buttom
                const buttonA = document.getElementById('buttonA').checked;
                const buttonB = document.getElementById('buttonB').checked;
                const buttonC = document.getElementById('buttonC').checked;
                const buttonD = document.getElementById('buttonD').checked;
                
                // Reset radios
                document.getElementById('buttons').reset();

                if(buttonA == true){
                    console.log('a')
                    // this.nextTurn()
                }
                else if(buttonB == true){
                    console.log('b')
                }
                else if(buttonC == true){
                    console.log('c')
                }
                else if(buttonD == true){
                    console.log('d')
                };

                // Updating question
                document.querySelector("#textQuestion").innerText = json[randKey].question;
                document.querySelector("#radioContentA").innerText = json[randKey].alternatives.A;
                document.querySelector("#radioContentB").innerText = json[randKey].alternatives.B;
                document.querySelector("#radioContentC").innerText = json[randKey].alternatives.C;
                document.querySelector("#radioContentD").innerText = json[randKey].alternatives.D;
            };

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
    }
}

window.onload = TicTacToe.init();
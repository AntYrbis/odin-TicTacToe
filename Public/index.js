/* Setting theme change */
function setColorTheme(theme) {
    const root = document.documentElement;
    root.className = theme;

    const toggle = document.getElementById('slider');
    toggle.className = theme;
}

/* Checking system theme preference on load */
window.onload = function () {
    let newTheme = 'light';
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
        newTheme = 'dark';
    }
    setColorTheme(newTheme);
};

/* Checking changes in prefered theme */
const setColorScheme = e => {
    let newTheme = 'light';
    if (e.matches) {
        newTheme = 'dark';
    }
    setColorTheme(newTheme);
}


/* Setting theme change on toggle switch */
function setToggleTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;
    setColorTheme(newTheme);
}

/* Checking system preference on change and passes it's state to the listener */
const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
setColorScheme(colorSchemeQueryList);
colorSchemeQueryList.addEventListener('change', setColorScheme);

/*The tic tac toe game*/
const gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const setField = (index, sign) => {
        board[index] = sign;
    };
    const getField = (index) => {
        return board[index];
    };
    const reset = () => {
        board.length = 0;
        board.push("", "", "", "", "", "", "", "", "");
    };

    return { setField, getField, reset };
})();

const displayController = (function () {
    const fieldElements = document.querySelectorAll(".game-case");
    const resetButton = document.getElementById("reset-btn");
    const playerOne = document.getElementById("player-one");
    const playerTwo = document.getElementById("player-two");
    const messageContainer = document.getElementById("message");

    const updateGameboard = () => {
        let index = 0;
        fieldElements.forEach(element => {
            element.textContent = gameboard.getField(index);
            index++;
        });
    };

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    );

    resetButton.addEventListener("click", (e) => {
        gameboard.reset();
        gameController.reset();
        updateGameboard();
        changePlayer("Player One");
    });

    const changePlayer = (currentplayer) => {
        if (currentplayer == "Player One") {
            playerOne.style.backgroundColor = 'rgba(157, 160, 162, 0.6)';
            playerTwo.style.backgroundColor = 'var(--secondary)';
        }
        else {
            playerOne.style.backgroundColor = 'var(--secondary)';
            playerTwo.style.backgroundColor = 'rgba(157, 160, 162, 0.6)';
        }
    };

    const setResult = (message) => {
        messageContainer.textContent = message;
    }
    return { changePlayer, setResult };
})();

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};

const gameController = (() => {
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let round = 1;
    let isOver = false;

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
        displayController.setResult("");
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerOne.getSign() : playerTwo.getSign();
    };

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? "Player One" : "Player Two";
    };

    const playRound = (caseIndex) => {
        console.log(caseIndex);
        gameboard.setField(caseIndex, getCurrentPlayerSign());
        if (checkWinner()) {
            displayController.setResult("Winner is " + getCurrentPlayer() + " !");
            isOver = true;
            return;
        }
        if (round == 9) {
            displayController.setResult("It's a Draw !");
            isOver = true;
            return;
        }
        round++;
        displayController.changePlayer(getCurrentPlayer());
    };

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let number = 0; number < winConditions.length; number++) {
            if (gameboard.getField(winConditions[number][0]) == gameboard.getField(winConditions[number][1]) && gameboard.getField(winConditions[number][1]) == gameboard.getField(winConditions[number][2])) {
                if (gameboard.getField(winConditions[number][0]) != "") {
                    console.log("win");
                    return true;
                }
            }
        }
        return false;
    };

    return { playRound, getIsOver, reset };
})();

function createUser(name) {
    const discordName = "@" + name;

    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;

    return { name, discordName, getReputation, giveReputation };
}
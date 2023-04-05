function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let words = ["un", "deux", "trois", "quatre"]; //liste de mots à deviner;
let tabLetter = []; // tableau des lettres utilisées;
let wordDisplay = ""; //variable pour l'affichage du mot à deviner AVANT DE JOUER;
let word = ""; //variable désignant le mot à deviner et qui est issu d'un index aléatoire du tableau words;
let wordDisplayed = ""; //variable pour l'affichage du mot à deviner PENDANT LE JEU;
let turn = 6;
let letter; //variable servant à récupérer la valeur de la lettre saisie par le joueur;
let img = document.querySelector("#hangerMan");
let imgs = ["hanger-cinq", "hanger-quatre", "hanger-trois", "hanger-deux", "hanger-un", "hanger-zero"]
let imgExt = ".png"
let imgIndex = 0 //sert à parcourir le tableau d'image pour le pendu;
let gameOver = false;
let win = document.querySelector("#winP");
let lose = document.querySelector("#loseP");
let score = 0;
let scoreDisplay = document.querySelector(".score-display");


function continueGame() {
    wordRandom()
    turn = 6;
    document.querySelector("#turn").innerHTML = turn;
    gameOver = false;
    wordDisplay = "";
    document.querySelector("#letterUsed").innerHTML = "";
    tabLetter = [];
    imgIndex = 0;
    img.querySelector('img').src = "./assets/img/hanger-six.png";
    win.style.display = "none";
    lose.style.display = "none";
    document.querySelector("#letter").value = "";
}

function reload() {
    wordRandom()
    turn = 6;
    document.querySelector("#turn").innerHTML = turn;
    gameOver = false;
    wordDisplay = "";
    document.querySelector("#letterUsed").innerHTML = "";
    tabLetter = [];
    imgIndex = 0;
    img.querySelector('img').src = "./assets/img/hanger-six.png";
    win.style.display = "none";
    lose.style.display = "none";
    document.querySelector("#letter").value = "";
    score = 0;
    document.querySelector(".score-display").innerHTML = score + " DECANEWTON";
}

function wordRandom() {
    let indexRandom = random(0, words.length - 1);
    word = words[indexRandom];
    wordDisplay = " - ";
    for (let i = 0; i < word.length - 1; i++) {
        wordDisplay += " - "
    }
    document.querySelector("#word").innerHTML = wordDisplay
    console.log(word);
}
wordRandom()


function submit() {
    letter = document.querySelector("#letter").value;
    document.querySelector("#letter").value = "";
    if (gameOver == false) {
        if (tabLetter.indexOf(letter) == -1) {
            tabLetter.push(letter);
            document.querySelector("#letterUsed").innerHTML += letter;
            compare()
        }
    }
}

function compare() {
    let isLetterFind = false;
    wordDisplayed = "";
    if (word.indexOf(letter) == -1 && turn > 0) {
        turn--;
        img.querySelector('img').src = "./assets/img/" + imgs[imgIndex] + imgExt
        imgIndex++
        document.querySelector("#turn").innerHTML = turn;
    }

    for (let i = 0; i < word.length; i++) {
        if (tabLetter.includes(word[i]) == true) {
            wordDisplayed += word[i];
            console.log(isLetterFind);
        } else {
            wordDisplayed += " - ";
        }
    }
    vrf();
    document.querySelector("#word").innerHTML = wordDisplayed;

}

function vrf() {
    if (wordDisplayed == word) {
        gameOver = true;
        win.style.display = "block";
        score++;
        document.querySelector(".score-display").innerHTML = score + " DECANEWTON";
    }
    if (turn == 0) {
        lose.style.display = "block";
        gameOver = true;
    }
    if (score == 10) {
        gameOver = true;
    }
}

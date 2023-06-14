function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let words = ["meurtre", "cadavre", "sang", "massacre", "éviscération", "pendaison", "horreur"]; //liste de mots à deviner;
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
let button = document.querySelector("#button");

window.addEventListener("keyup",(event)=>{
    if(event.keyCode === 13){
        button.click();
    }
})

function continueGame() {//passer à la partie suivante
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

function reload() {//recommencer une partie
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

async function wordRandom() {//sélectionner un mot au hasard
    // let indexRandom = random(0, words.length - 1);
    // word = words[indexRandom];
    let response = await fetch("https://trouve-mot.fr/api/random")
    response = await response.json()
    word = response[0].name
    wordDisplay = " - ";
    for (let i = 0; i < word.length - 1; i++) {
        wordDisplay += " - "
    }
    document.querySelector("#word").innerHTML = wordDisplay
    console.log(word);

}
wordRandom()


function submit() {//saisir une lettre et voir si elle est dans le mot
    letter = document.querySelector("#letter").value;//valeur de la lettre saisie par le joueur
    document.querySelector("#letter").value = "";//input vide
    if (gameOver == false) {
        if (tabLetter.indexOf(letter) == -1) {//vérifie si la lettre saisie dans l'input par le joueur a déjà été utilisée
            tabLetter.push(letter);//si non, on push la lettre dans le tableau
            document.querySelector("#letterUsed").innerHTML += letter;//on affiche le tableau de lettres utilisées dans le html
            compare()
        }
    }
}


function compare() {
    let isLetterFind = false;
    wordDisplayed = "";
    if (word.indexOf(letter) == -1 && turn > 0) {//vérifie si la lettre saisie dans l'input par le joueur existe dans le mot à deviner
        turn--;//si non, on perd un tour
        img.querySelector('img').src = "./assets/img/" + imgs[imgIndex] + imgExt//on affiche le pendu au fur et à mesure
        imgIndex++ //on change l'image du pendu
        document.querySelector("#turn").innerHTML = turn;//on affiche les tours restants
    }

    for (let i = 0; i < word.length; i++) {//on parcours le mot à deviner
        if (tabLetter.includes(word[i]) == true) {//si la lettre utilisée(saisie par le joueur) existe dans le mot
            wordDisplayed += word[i];//le mot affiché affiche la lettre
            console.log(isLetterFind);
        } else {
            wordDisplayed += " - ";//si non, la variable affiche un nouveau tiret
        }
    }
    vrf();
    document.querySelector("#word").innerHTML = wordDisplayed; //on affiche le mot à deviner dans le html

}

function vrf() { //vérification de victoire
    console.log(word);
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

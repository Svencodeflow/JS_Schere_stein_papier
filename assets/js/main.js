const option = ["stein", "papier", "schere"];


let numRunden = document.querySelector("#chekcmck");


let spielerscore = 0;
let computerscore = 0;
let fullround = 0;


const steinBtn = document.querySelector("button[name='stein']");
const papierBtn = document.querySelector("button[name='papier']");
const schereBtn = document.querySelector("button[name='schere']");


const rundenergebniss = document.querySelector("#round-ergeniss");
const spielergebniss = document.querySelector("#game-ergeniss");





function computerPlay() {
    const randommandom = Math.floor(Math.random() * option.length);
    return option[randommandom];
}


function play(spielerauswahl) {
    const computerauswahl = computerPlay();
    let ergeniss = "";

    
    if (spielerauswahl === computerauswahl) {
        ergeniss = "Unentschieden!";
        fullround++
    } else if (
        (spielerauswahl === "stein" && computerauswahl === "schere") ||
        (spielerauswahl === "papier" && computerauswahl === "stein") ||
        (spielerauswahl === "schere" && computerauswahl === "papier")
    ) {
        ergeniss = "Du gewinnst diese Runde!";
        spielerscore++;
        fullround++
    } else {
        ergeniss = "Der Computer gewinnt diese Runde!";
        computerscore++;
        fullround++
    }

    
    rundenergebniss.textContent = `Du hast ${spielerauswahl} gewählt und der Computer hat ${computerauswahl} gewählt. ${ergeniss}`;
    updateScoreboard();

    
    // if (spielerscore + computerscore === numRunden) {
    //     endGame();
    // }
    
    if (fullround === numRunden) {
        endGame()
    }
    console.log(fullround);
}


function updateScoreboard() {
    document.querySelector("#spieler-score").textContent = spielerscore;
    document.querySelector("#computer-score").textContent = computerscore;
}


function endGame() {
    
    if (spielerscore > computerscore) {
        spielergebniss.textContent = "Du hast das Spiel gewonnen!";
    } else if (computerscore > spielerscore) {
        spielergebniss.textContent = "Der Computer hat das Spiel gewonnen!";
    } else {
        spielergebniss.textContent = "Das Spiel endet unentschieden!";
    }

    
    if (spielerscore >= Math.ceil(numRunden / 2)) {
        const trophy = document.createElement("img");
        trophy.src = "assets/img/pokal.png";
        trophy.alt = "Pokal";
        trophy.style.cssText = "width:150px;height:150px;"
        spielergebniss.appendChild(trophy);
    }

    
    steinBtn.disabled = true;
    papierBtn.disabled = true;
    schereBtn.disabled = true;
}


function reset() {

    spielerscore = 0;
    computerscore = 0;
    fullround = 0;
    updateScoreboard();

    rundenergebniss.textContent = "";
    spielergebniss.textContent = "";


    const trophy = document.querySelector("img");
    if (trophy) {
        trophy.remove();

    }
    
    steinBtn.disabled = false;
    papierBtn.disabled = false;
    schereBtn.disabled = false;
    
}


document.querySelector("#runden").addEventListener("change", function() {
    numRunden = parseInt(this.value);
    reset();
});
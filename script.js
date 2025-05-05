let chars = ["salvini", "meloni", "stalin", "papa", "vader", "mystery"];        
const quotes = [
    "preferisce la pasta Rummo",
    "una grande statista",
    "Trotskij si è suicidato",
    "la frociaggine dilaga",
    "https://www.youtube.com/watch?v=AFA-rOls8YA",
    "fff"
];

const portraits = {
    "salvini": "media/salvini1.jpg",
    "meloni": "media/meloni1.jpg",
    "stalin": "media/stalin1.jpg",
    "papa": "media/papa1.jpg",
    "vader": "media/vader1.jpg",
    "mystery": "media/mystery1.jpg"
};

const boxes = document.getElementsByClassName('box');
let select = document.getElementById("select-button");
let start = document.getElementById("start-button");
let subtitle = document.getElementById("subtitle");
let chose = false;

let currentPage = null;
if (select) {
    currentPage = "player1Select"; //cerca i pulsanti
} else if (start) {
    currentPage = "player2Select";
} else {
    currentPage = "battle";
}
console.log("pagina ora:", currentPage);


if (boxes.length > 0) { //run solo se in questa pagina ci sono le box dei chars
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', function () {

            //rimuove selezione dalle altre 
            for (let j = 0; j < boxes.length; j++) {
                boxes[j].classList.remove('selected');
            }

            //accentua selezionata
            this.classList.add('selected');
            document.getElementById("quoteDisplay").innerText = quotes[i];

            //ricorda i chars in localStorage
            if (currentPage === "player1Select") {
                localStorage.setItem('player1Character', chars[i]); //in chars[i] i è il posto nell'array a cui corrisponde il char selezionato
            } else if (currentPage === "player2Select") {
                localStorage.setItem('player2Character', chars[i]);
            }

            chose = true;

            if (chose) {
                if (select) select.style.backgroundColor = "red";
                if (start) start.style.backgroundColor = "red";
            }
        });
    }
}

if (select) { //se pulsante select esiste, allora...
    select.addEventListener("click", function() {
        if (chose) {
            window.location.href = 'player2select.html'; //se p ha scelto vai a scelta p2
        } else {
            subtitle.style.color = "red"; //altrimenti evidenzia sottotitolo
        }
    });
}

if (start) {
    start.addEventListener("click", function() {
        if (chose) {
            window.location.href = 'battle.html';
        } else {
            subtitle.style.color = "red";
        }
    });
}

// BATTLE LOGIC
document.addEventListener('DOMContentLoaded', function() {
    // solo se sulla pagina battle
    if (currentPage !== "battle") return;
    
    let gameActive = false;
    let p1Health = 150;
    let p2Health = 150;
    let noteSpeed = 3; // secondi perché la nota arrivi alla fine
    let noteInterval = 1500; // ms tra note
    
    // DOM
    const p1HealthBar = document.getElementById("p1-health");
    const p2HealthBar = document.getElementById("p2-health");
    const name1 = document.getElementById("name1");
    const name2 = document.getElementById("name2");
    const icon1 = document.getElementById("icon1");
    const icon2 = document.getElementById("icon2");
    const battleStatus = document.getElementById("battle-status");
    const battleMessage = document.getElementById("battle-message");
    const restartButton = document.getElementById("restart-button");
    const laneP1 = document.getElementById("lane-p1");
    const laneP2 = document.getElementById("lane-p2");
    
    // prende i chars
    const player1 = localStorage.getItem('player1Character');
    const player2 = localStorage.getItem('player2Character');

    name1.textContent = player1;
    icon1.innerHTML = `<img src="${portraits[player1]}" alt="${player1}" class="portrait-img">`;
    
    name2.textContent = player2;
    icon2.innerHTML = `<img src="${portraits[player2]}" alt="${player2}" class="portrait-img">`;

    // inizializza vita
    p1HealthBar.style.width = '100%';
    p2HealthBar.style.width = '100%';
   
    // pulsante restart
    restartButton.style.display = 'block';
    
    // countdown
    setTimeout(function() {
        const countdown = document.getElementById('countdown');
        countdown.style.display = 'block';
        let count = 3;
        
        const countInterval = setInterval(function() {
            count--;
            countdown.textContent = count;
            
            if (count <= 0) {
                clearInterval(countInterval);
                countdown.style.display = 'none';
                battleStatus.textContent = 'fight!';
                
                startGame();
            }
        }, 1000);
    }, 1000);
    
    // restart
    restartButton.addEventListener('click', function() {
        window.location.href = 'player1select.html';
    });
});
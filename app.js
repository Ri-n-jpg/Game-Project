let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let idx = 0;  // Track the current index in the sequence
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    console.log(btn);
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    console.log(btn);
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    // Reset user sequence and index when advancing to a new level
    userSeq = [];
    idx = 0;

    let randIx = Math.floor(Math.random() * 4);
    let randColor = btns[randIx];
    let ranbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(ranbtn);
}

// Check if the user's input matches the sequence
function checkAns() {
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Same value");
        // If the entire sequence is correct
        if (userSeq.length === gameSeq.length) {
            // Wait for the next level
            setTimeout(function () {
                levelUp();
            }, 1000);
        }
    } else {
        h2.innerText = `Game Over! Press any key to Start.`;
        console.log("Game Over");
        started = false;  
        gameSeq = []; 
        level = 0; 
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

const holes = document.querySelectorAll(".hole")
const rows = document.querySelectorAll(".row")
const startGameBtn = document.getElementsByTagName("button")[0]
const restarttGameBtn = document.getElementsByTagName("button")[1]
const allMoles = document.querySelectorAll(".mole")
const counter = document.getElementById("points")
const spawnedMoles = document.getElementById("spawned-moles")
const levelsBtn = document.querySelector(".level-section").querySelectorAll("button")
const whackSound = new Audio("sounds/whack-sound.mp3")
const whistle = new Audio("sounds/whistle.mp3")

let startGame;
let points = 0
let molesCounter = 0
let isGameOn = false
let speed = 600

levelsBtn.forEach(button =>{
    button.addEventListener('click', () =>{
        levelsBtn.forEach(button => {
            button.classList.remove("activeBtn")
        })
        button.classList.add("activeBtn")
        speed = button.value
    })
})

startGameBtn.addEventListener("click", () => {
    if(isGameOn == false){
        startGame = setInterval(showMole, speed)
        isGameOn = true
        counter.innerHTML = points
        spawnedMoles.innerHTML = molesCounter

        allMoles.forEach(mole => {
            mole.classList.remove("active")
        })
    }
})

restarttGameBtn.addEventListener("click", () =>{
    isGameOn = false
    clearInterval(startGame)
    allMoles.forEach(mole => {
        mole.classList.add("active")
    })
    points = 0
    molesCounter = 0
})



//Show mole in random hole
function showMole(){
    let {currentRow, currentHole} = getRandomHole()
    let currentMole = rows[currentRow].querySelectorAll(".hole")[currentHole].querySelector(".mole")
    //Clear Moles
    allMoles.forEach(mole => {
        mole.classList.remove("active")
    })
    whistle.play()
    //Show Current Mole
    currentMole.classList.add("active")
    currentMole.addEventListener("click", smashMole)
    
    //Count spawned moles
    molesCounter ++
    spawnedMoles.innerHTML = molesCounter
}

//Smash the mole
function smashMole(){
    whackSound.play()
    this.classList.remove("active")
    points ++
    counter.innerHTML = points
}

//Get a random hole
function getRandomHole(){
    let currentRow = getRandomInt(rows.length)
    let currentHole = getRandomInt(rows[currentRow].querySelectorAll(".hole").length)
    return {"currentRow": currentRow, "currentHole" : currentHole}
}

//Get random number function
function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

//Set Difficulty Level





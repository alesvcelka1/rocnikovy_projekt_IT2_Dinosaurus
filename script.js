// Importování funkcí pro manipulaci se zemí, dinosaurem a kaktusy z externích modulů
import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

// Konstanty určující rozměry herního světa a nárůst rychlosti hry
const SIRKA_SVETA = 100
const VYSKA_SVETA = 30
const NARUST_RYCHLOSTI = 0.00001

// Elementy herního prostoru a skóre
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

// Nastavení škály mezi pixely a herním světem
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

// Proměnné sledující čas od poslední aktualizace, rychlost hry a skóre
let lastTime
let speedScale
let score

// Hlavní funkce pro aktualizaci stavu hry v každém snímku
function update(time) {
  // Inicializace lastTime při prvním spuštění hry
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }

  // Výpočet rozdílu času od poslední aktualizace
  const delta = time - lastTime

  // Aktualizace stavu země, dinosaura, kaktusů, rychlosti a skóre
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  // Kontrola prohry
  if (checkLose()) return handleLose()

  // Aktualizace času poslední aktualizace a vyvolání další aktualizace
  lastTime = time
  window.requestAnimationFrame(update)
}

// Funkce pro kontrolu kolize mezi dinosaurem a kaktusem
function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

// Funkce pro zjištění, zda dochází ke kolizi mezi dvěma obdélníky
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

// Funkce pro aktualizaci rychlosti hry na základě času
function updateSpeedScale(delta) {
  speedScale += delta * NARUST_RYCHLOSTI
}

// Funkce pro aktualizaci skóre na základě času
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

// Funkce pro obsluhu stisku klávesy pro začátek hry
function handleStart() {
  // Resetování proměnných a nastavení herních prvků
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()

  // Skrytí úvodní obrazovky a spuštění hlavní aktualizační smyčky
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

// Funkce pro obsluhu prohry
function handleLose() {
  // Nastavení obrázku dinosaura pro prohru a zobrazení úvodní obrazovky po chvíli
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

// Funkce pro nastavení škály mezi pixely a herním světem
function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < SIRKA_SVETA / VYSKA_SVETA) {
    worldToPixelScale = window.innerWidth / SIRKA_SVETA
  } else {
    worldToPixelScale = window.innerHeight / VYSKA_SVETA
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

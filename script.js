// Importuj potřebné funkce pro aktualizaci pozadí, dinosaura a kaktusů
import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

// Konstanty pro šířku a výšku světa, a zvýšení rychlosti pohybu
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

// Element světa, skóre a úvodní obrazovky
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

// Nastav poměr pixelů k světu při načtení stránky a při změně velikosti okna
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
// Přidej posluchač klávesnice pro spuštění hry, ale pouze jednou
document.addEventListener("keydown", handleStart, { once: true })

// Proměnné pro sledování času, rychlosti a skóre
let lastTime
let speedScale
let score

// Hlavní aktualizační funkce
function update(time) {
  // Pokud je lastTime null, nastav ho a požádej o další snímek animace
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }

  // Výpočet rozdílu času od poslední aktualizace
  const delta = time - lastTime

  // Aktualizace pozemní plochy, dinosaura, kaktusů, rychlosti a skóre
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  // Kontrola pro prohru
  if (checkLose()) return handleLose()

  // Nastav lastTime na aktuální čas a požádej o další snímek animace
  lastTime = time
  window.requestAnimationFrame(update)
}

// Funkce pro kontrolu kolize mezi dinosaurem a kaktusem
function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

// Funkce pro detekci kolize dvou obdélníků
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

// Funkce pro zvýšení rychlosti pohybu
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

// Funkce pro aktualizaci skóre
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

// Funkce pro obsluhu stisku klávesy na začátku hry
function handleStart() {
  // Resetuj hodnoty, nastav svět, dinosaura a kaktusy
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()

  // Skryj úvodní obrazovku
  startScreenElem.classList.add("hide")

  // Požádej o první snímek animace
  window.requestAnimationFrame(update)
}

// Funkce pro obsluhu prohry
function handleLose() {
  // Nastav obrázek pro prohru
  setDinoLose()

  // Počkej krátkou dobu a přidej posluchač pro restart hry
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

// Funkce pro nastavení poměru pixelů k světu
function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}


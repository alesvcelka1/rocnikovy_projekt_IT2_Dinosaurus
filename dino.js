// Importování funkcí manipulace vlastními vlastnostmi z externího modulu
import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// Herní prvek reprezentující dinosaura
const dinoElem = document.querySelector("[data-dino]")

// Konstanty ovlivňující pohyb a skoky dinosaura
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

// Proměnné sledující stav dinosaura
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

// Funkce pro inicializaci dinosaura na začátku hry
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

// Funkce pro aktualizaci stavu dinosaura v každém snímku
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

// Funkce pro získání obdélníkových informací o dinosaurovi
export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

// Funkce pro nastavení stavu dinosaura na prohru
export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png"
}

// Funkce pro zpracování pohybu dinosaura (běh)
function handleRun(delta, speedScale) {
  if (isJumping) {
    // Dinosaurus stojí na místě při skoku
    dinoElem.src = `imgs/dino-stationary.png`
    return
  }

  // Přepínání snímků dinosaura během běhu
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

// Funkce pro zpracování skoku dinosaura
function handleJump(delta) {
  if (!isJumping) return

  // Aktualizace vlastnosti --bottom během skoku
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  // Kontrola dosažení země při skoku
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  // Aplikace gravitace na rychlost dinosaura během skoku
  yVelocity -= GRAVITY * delta
}

// Obsluha události stisku klávesy pro skok
function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  // Nastavení počáteční rychlosti skoku a indikace skoku
  yVelocity = JUMP_SPEED
  isJumping = true
}


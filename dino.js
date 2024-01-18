// Importuj potřebné funkce pro manipulaci s vlastnostmi prvku
import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// Element reprezentující dinosaura na obrazovce
const dinoElem = document.querySelector("[data-dino]")

// Konstanty pro rychlost skoku, gravitaci a animaci běhu dinosaura
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

// Globální proměnné sledující stav skoku dinosaura
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

// Inicializační funkce pro nastavení dinosaura na začátku
export function setupDino() {
  // Nastav počáteční hodnoty proměnných
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  // Nastav počáteční pozici dinosaura
  setCustomProperty(dinoElem, "--bottom", 0)
  // Zruš starý posluchač klávesnice a přidej nový pro reakci na skok
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

// Funkce pro aktualizaci stavu dinosaura
export function updateDino(delta, speedScale) {
  // Zpracuj běh dinosaura
  handleRun(delta, speedScale)
  // Zpracuj skok dinosaura
  handleJump(delta)
}

// Funkce pro získání obdélníku reprezentujícího dinosaura (pro detekci kolizí)
export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

// Funkce pro nastavení stavu pro prohru dinosaura
export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png"
}

// Funkce pro zpracování animace běhu dinosaura
function handleRun(delta, speedScale) {
  // Pokud dinosaurus skáče, zobraz obrázek v klidu
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`
    return
  }

  // Pokud uplynul dostatečný čas od poslední změny snímku, přepni na další snímek běhu
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  // Aktualizuj čas pro další změnu snímku
  currentFrameTime += delta * speedScale
}

// Funkce pro zpracování skoku dinosaura
function handleJump(delta) {
  // Pokud dinosaurus neskáče, není co dělat
  if (!isJumping) return

  // Inkrementuj vlastnost "--bottom" podle rychlosti skoku
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  // Pokud dinosaurus dosáhl nebo překročil zem, zastav skok
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  // Sníž rychlost skoku vlivem gravitace
  yVelocity -= GRAVITY * delta
}

// Funkce reagující na stisknutí klávesy pro skok
function onJump(e) {
  // Pokud není stisknuta mezerník nebo dinosaurus už skáče, ignoruj událost
  if (e.code !== "Space" || isJumping) return

  // Nastav rychlost skoku a označ, že dinosaurus skáče
  yVelocity = JUMP_SPEED
  isJumping = true
}


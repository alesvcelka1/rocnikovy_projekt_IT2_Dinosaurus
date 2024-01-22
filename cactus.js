// Importuj potřebné funkce pro manipulaci s vlastnostmi prvku
import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// Konstanty pro nastavení rychlosti a intervalu mezi kaktusy
const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 650
const CACTUS_INTERVAL_MAX = 2000

// Element světa, kde se kaktusy zobrazují
const worldElem = document.querySelector("[data-world]")

// Globální proměnná pro sledování času do vytvoření dalšího kaktusu
let nextCactusTime

// Inicializační funkce pro nastavení kaktusů na začátku
export function setupCactus() {
  // Nastav počáteční hodnotu pro vytvoření prvního kaktusu
  nextCactusTime = CACTUS_INTERVAL_MIN
  // Odstraň všechny existující kaktusy
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

// Funkce pro aktualizaci polohy kaktusů
export function updateCactus(delta, speedScale) {
  // Pro každý kaktus na obrazovce
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    // Inkrementuj vlastnost "--left" podle aktuální rychlosti
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    // Pokud je kaktus mimo obrazovku, odstraň ho
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  })

  // Pokud je čas vytvořit další kaktus
  if (nextCactusTime <= 0) {
    // Vytvoř nový kaktus
    createCactus()
    // Nastav čas do vytvoření dalšího kaktusu s náhodným intervalem
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  // Sníž čas do vytvoření dalšího kaktusu o uplynulý čas
  nextCactusTime -= delta
}

// Funkce pro získání obdélníků kaktusů (pro detekci kolizí)
export function getCactusRects() {
  // Získání obdélníků všech kaktusů na obrazovce
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

// Funkce pro vytvoření nového kaktusu
function createCactus() {
  const cactus = document.createElement("img")
  // Nastav dataset pro identifikaci kaktusu
  cactus.dataset.cactus = true
  // Nastav obrázek pro kaktus
  cactus.src = "imgs/cactus.png"
  // Přidej CSS třídu pro stylování
  cactus.classList.add("cactus")
  // Nastav počáteční levou pozici
  setCustomProperty(cactus, "--left", 100)
  // Přidej kaktus do světa
  worldElem.append(cactus)
}

// Funkce pro generování náhodného čísla v daném rozmezí
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}



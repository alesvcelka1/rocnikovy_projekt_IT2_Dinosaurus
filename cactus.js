// Importování funkcí manipulace vlastními vlastnostmi z externího modulu
import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

// Konstanty definující vlastnosti kaktusů a herního světa
const RYCHLOST = 0.05
const INTERVAL_MIN_KAKTUS = 500
const INTERVAL_MAX_KAKTUS = 2000
const svetElem = document.querySelector("[data-world]")

// Proměnná pro uchování času do vytvoření dalšího kaktusu
let casDoDalsihoKaktusu

// Funkce pro nastavení herního prvku kaktusu
export function nastavitKaktusy() {
  // Inicializace času do dalšího kaktusu
  casDoDalsihoKaktusu = INTERVAL_MIN_KAKTUS
  document.querySelectorAll("[data-cactus]").forEach(kaktus => {
    kaktus.remove()
  })
}

// Funkce pro aktualizaci kaktusů na základě času a rychlosti
export function aktualizovatKaktusy(delta, mierkaRychlosti) {
  document.querySelectorAll("[data-cactus]").forEach(kaktus => {
    incrementCustomProperty(kaktus, "--left", delta * mierkaRychlosti * RYCHLOST * -1)
    if (getCustomProperty(kaktus, "--left") <= -100) {
      kaktus.remove()
    }
  })

  if (casDoDalsihoKaktusu <= 0) {
    vytvoritKaktus()
    casDoDalsihoKaktusu =
      nahodneCisloMezi(INTERVAL_MIN_KAKTUS, INTERVAL_MAX_KAKTUS) / mierkaRychlosti
  }
  casDoDalsihoKaktusu -= delta
}

// Funkce pro získání obdélníkových informací o kaktusech
export function ziskatObdelnikyKaktusu() {
  return [...document.querySelectorAll("[data-cactus]")].map(kaktus => {
    return kaktus.getBoundingClientRect()
  })
}

// Funkce pro vytvoření kaktusu
function vytvoritKaktus() {
  const kaktus = document.createElement("img")
  kaktus.dataset.cactus = true
  kaktus.src = "imgs/kaktus.png"
  kaktus.classList.add("kaktus")
  setCustomProperty(kaktus, "--left", 100)
  svetElem.append(kaktus)
}

// Funkce pro generování náhodného čísla v zadaném rozmezí
function nahodneCisloMezi(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Importování funkcí manipulace vlastními vlastnostmi z externího modulu
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

// Konstanta určující rychlost pohybu pozadí (země)
const RYCHLOST = 0.05

// Seznam prvků reprezentujících země v herním prostoru
const groundElems = document.querySelectorAll("[data-ground]")

// Funkce pro nastavení počáteční polohy zemí
export function setupGround() {
  // Nastavení počátečních hodnot vlastnosti --left pro jednotlivé země
  setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems[1], "--left", 300)
}

// Funkce pro aktualizaci pohybu zemí v každém snímku
export function updateGround(delta, speedScale) {
  // Iterace přes všechny prvky reprezentující země
  groundElems.forEach(ground => {
    // Inkrementace hodnoty vlastnosti --left pro pohyb země
    incrementCustomProperty(ground, "--left", delta * speedScale * RYCHLOST * -1)

    // Kontrola přesunu země mimo obrazovku, a případné vrácení země na začátek
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600)
    }
  })
}


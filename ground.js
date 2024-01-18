// Importuj potřebné funkce pro manipulaci s vlastnostmi prvku
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

// Konstanta pro rychlost pohybu pozadí
const SPEED = 0.05

// Seznam prvků reprezentujících zem (pozemní plochy)
const groundElems = document.querySelectorAll("[data-ground]")

// Inicializační funkce pro nastavení pozadí na začátku
export function setupGround() {
  // Nastav počáteční levou pozici první pozemní plochy
  setCustomProperty(groundElems[0], "--left", 0)
  // Nastav počáteční levou pozici druhé pozemní plochy
  setCustomProperty(groundElems[1], "--left", 300)
}

// Funkce pro aktualizaci pohybu pozadí
export function updateGround(delta, speedScale) {
  // Pro každý prvek reprezentující pozemní plochu
  groundElems.forEach(ground => {
    // Inkrementuj vlastnost "--left" podle aktuální rychlosti pohybu
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    // Pokud prvek přesáhl levou hranici obrazovky
    if (getCustomProperty(ground, "--left") <= -300) {
      // Přesuň prvek zpět za pravou hranici obrazovky
      incrementCustomProperty(ground, "--left", 600)
    }
  })
}



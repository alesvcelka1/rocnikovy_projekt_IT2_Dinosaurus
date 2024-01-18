// Získá číselnou hodnotu vlastnosti CSS nebo vrací 0, pokud není nastavena.
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

// Nastaví hodnotu vlastnosti CSS pro prvek.
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

// Inkrementuje hodnotu vlastnosti CSS pro prvek o zadanou hodnotu.
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}


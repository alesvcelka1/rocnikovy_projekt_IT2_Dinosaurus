// Získá číselnou hodnotu vlastnosti CSS nebo vrací 0, pokud není nastavena.
export function getCustomProperty(elem, prop) {
  // Používá se metoda getComputedStyle pro získání aktuálních stylů prvku.
  // getProperty(prop) získá hodnotu konkrétní vlastnosti pro daný prvek.
  // parseFloat se používá k převedení hodnoty z řetězce na číslo. 
  // Pokud hodnota nemůže být převedena, vrátí se 0.
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

// Nastaví hodnotu vlastnosti CSS pro prvek.
export function setCustomProperty(elem, prop, value) {
  // Metoda setProperty nastavuje hodnotu vlastnosti pro daný prvek.
  elem.style.setProperty(prop, value);
}

// Inkrementuje hodnotu vlastnosti CSS pro prvek o zadanou hodnotu.
export function incrementCustomProperty(elem, prop, inc) {
  // getCustomProperty získá aktuální hodnotu vlastnosti.
  // Tato hodnota je pak zvýšena o inkrement (inc).
  // Nová hodnota je poté nastavena pomocí setCustomProperty.
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}



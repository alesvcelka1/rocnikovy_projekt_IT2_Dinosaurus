// Funkce pro získání hodnoty vlastní CSS vlastnosti (proměnné) daného elementu
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
  // Získání stylu elementu a následně hodnoty specifikované vlastnosti (proměnné)
  // Převod na desetinné číslo, pokud je hodnota textová
  // V případě neplatné hodnoty vrací 0
}

// Funkce pro nastavení hodnoty vlastní CSS vlastnosti (proměnné) danému elementu
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
  // Nastavení hodnoty specifikované vlastnosti (proměnné) pro daný element
}

// Funkce pro inkrementaci hodnoty vlastní CSS vlastnosti (proměnné) daného elementu
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
  // Získání aktuální hodnoty, přičtení hodnoty increment a nastavení nové hodnoty
}


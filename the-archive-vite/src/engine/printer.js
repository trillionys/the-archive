let logElement = null;

export function initPrinter(element) {
  logElement = element;
}

export function print(message) {
  if (!logElement) return;

  logElement.innerHTML += `<p>${message}</p>`;
  logElement.scrollTop = logElement.scrollHeight;
}
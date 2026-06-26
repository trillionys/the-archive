let elements = {};

export function initUI(domElements) {
  elements = domElements;
}

export function setTitle(text) {
  elements.title.textContent = text;
}

export function setDescription(text) {
  elements.text.textContent = text;
}

export function hideStartButton() {
  elements.startBtn.style.display = "none";
}

export function showLog() {
  elements.log.classList.remove("hidden");
}

export function showCommandArea() {
  elements.commandArea.classList.remove("hidden");
}
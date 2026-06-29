export function parseCommand(input) {
  const cleanInput = input.trim().toLowerCase();
  const parts = cleanInput.split(/\s+/);

  const verb = parts[0] || "";
  let object = parts.slice(1).join(" ");

  if (object.startsWith("at ")) {
    object = object.slice(3);
  }

  if (object.startsWith("to ")) {
    object = object.slice(3);
  }

  return {
    raw: cleanInput,
    verb,
    object,
  };
}
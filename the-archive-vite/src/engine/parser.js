export function parseCommand(input) {
  const parts = input.trim().toLowerCase().split(/\s+/);

  return {
    verb: parts[0] || "",
    object: parts.slice(1).join(" "),
  };
}

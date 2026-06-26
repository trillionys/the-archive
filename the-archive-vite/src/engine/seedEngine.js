export function createSeedEngine(seed) {
  let currentSeed = Number(seed);

  function random() {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  }

  function pick(list) {
    const index = Math.floor(random() * list.length);
    return list[index];
  }

  return {
    random,
    pick,
  };
}
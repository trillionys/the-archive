export const archiveHall = {
  id: "archiveHall",
  name: "Archive Hall",
  description:
    "거대한 기록 선반이 끝없이 이어진다. 모든 기록은 완성된 것처럼 보이지만, 일부 문장은 비어 있다.",
  exits: {
    north: "observatory",
    east: "sealedGate",
  },
  events: {
    firstLook:
      "선반 사이에서 희미한 금속성 빛이 반짝인다.",
  },
};
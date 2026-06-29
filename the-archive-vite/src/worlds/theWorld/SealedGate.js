export const sealedGate = {
  id: "sealedGate",
  name: "Sealed Gate",
  description:
    "거대한 문이 닫혀 있다. 문 위에는 원형의 문양이 새겨져 있다. 아직 열 수 없다.",
  exits: {
    west: "archiveHall",
  },
  locked: true,
  requiredItem: "brassKey",
  unlocksTo: "endingChamber",

  interactions: {
    gate: [
      "문 가까이 다가가자 원형 문양이 희미하게 빛난다.",
      "그 문양은 황동 열쇠의 손잡이에 새겨진 것과 같다.",
    ],
    door: [
      "문은 단순한 문이 아니다.",
      "이 세계가 닫힌 이유 그 자체처럼 보인다.",
    ],
  },
};
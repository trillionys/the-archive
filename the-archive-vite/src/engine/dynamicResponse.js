const templates = [
  "{object}은(는) 아무 반응이 없다.",
  "{object}은(는) 당신의 행동을 기억한 것 같다.",
  "{verb}하려 했지만 시스템이 거부했다.",
  "{object}에서 이상한 소리가 들린다.",
  "기록에는 '{verb}'라는 행동이 남았다.",
  "{object}은(는) 존재하지만 이해할 수 없다.",
];

export function createDynamicResponse(parsed) {
  const template =
    templates[Math.floor(Math.random() * templates.length)];

  return template
    .replaceAll("{verb}", parsed.verb)
    .replaceAll("{object}", parsed.object || "그것");
}
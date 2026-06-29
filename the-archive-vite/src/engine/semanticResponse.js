const verbGroups = {
  destructive: ["break", "destroy", "burn", "kill", "smash", "tear", "cut", "부수다", "태우다", "죽이다"],
  gentle: ["touch", "hold", "kiss", "pray", "sing", "listen", "쓰다듬다", "기도하다", "노래하다", "듣다"],
  search: ["inspect", "examine", "search", "look", "read", "조사하다", "살피다", "읽다"],
  consume: ["eat", "drink", "swallow", "먹다", "마시다"],
};

const objectGroups = {
  reflective: ["mirror", "glass", "water", "거울", "유리", "물"],
  archive: ["archive", "record", "book", "page", "file", "기록", "책", "페이지", "문서"],
  passage: ["door", "gate", "path", "exit", "문", "문", "출구", "길"],
  self: ["me", "myself", "name", "memory", "나", "이름", "기억"],
  machine: ["terminal", "system", "server", "machine", "터미널", "시스템", "기계"],
};

const templates = {
  destructive: [
    "{object}을(를) 파괴하려는 순간, 기록보관소 전체가 아주 짧게 숨을 멈췄다.",
    "{object}은(는) 부서지지 않았다. 대신 당신의 손끝에 금이 갔다.",
    "폭력은 기록된다. {object}도 그것을 기억했다.",
  ],
  gentle: [
    "{object}에 닿자, 아주 오래된 온기가 되돌아왔다.",
    "당신의 행동은 너무 조용해서, 기록조차 잠시 그것을 놓쳤다.",
    "{object}은(는) 대답하지 않았지만, 거절하지도 않았다.",
  ],
  search: [
    "{object}을(를) 살피자, 보이지 않던 문장이 잠깐 떠올랐다.",
    "{object}의 표면 아래에서 삭제된 기록의 흔적이 보인다.",
    "조사는 끝나지 않았다. 다만 {object}이(가) 먼저 당신을 조사하기 시작했다.",
  ],
  consume: [
    "{object}을(를) 삼키려 했지만, 이 세계는 그런 방식으로 들어갈 수 없다.",
    "입 안에 남은 것은 맛이 아니라 문장 조각이었다.",
    "{object}은(는) 먹을 수 없다. 하지만 무언가가 당신 안으로 들어왔다.",
  ],
  unknown: [
    "{verb} {object}. 시스템은 그 행동을 해석하지 못했지만 기록했다.",
    "{object}은(는) 잠시 존재하는 법을 잊었다.",
    "그 행동은 규칙 밖에 있었다. 그래서 기록보관소는 그것을 더 오래 바라보았다.",
  ],
};

function findGroup(word, groups) {
  for (const [group, words] of Object.entries(groups)) {
    if (words.includes(word)) return group;
  }

  return "unknown";
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function createSemanticResponse(parsed, room) {
  const verbType = findGroup(parsed.verb, verbGroups);
  const objectType = findGroup(parsed.object, objectGroups);

  let pool = templates[verbType] || templates.unknown;

  if (objectType === "reflective" && verbType === "destructive") {
    pool = [
      "거울은 깨지지 않았다. 대신 그 안의 당신이 산산조각났다.",
      "표면에 금이 갔다. 그러나 금이 간 쪽은 이쪽 세계였다.",
    ];
  }

  if (objectType === "archive") {
    pool = [
      "{object}은(는) 당신보다 오래된 방식으로 침묵했다.",
      "기록은 저항하지 않는다. 다만 모든 시도를 남긴다.",
      "{object}의 여백에 방금 입력한 단어가 희미하게 새겨졌다.",
    ];
  }

  const roomName = room?.name || "이곳";

  return pick(pool)
    .replaceAll("{verb}", parsed.verb || "그 행동")
    .replaceAll("{object}", parsed.object || "그것")
    .replaceAll("{room}", roomName);
}
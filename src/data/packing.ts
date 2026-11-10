export type Season = 'summer' | 'winter';

export const clothing = [
  { id: 'hat', number: '①', label: '帽子', shortLabel: '帽子', summer: '日差しから頭を守る帽子。', winter: '冬も帽子をかぶりましょう。', side: 'left', top: 1, target: [39, 24] },
  { id: 'long-sleeves', number: '②', label: '長袖の服', shortLabel: '長袖', summer: '夏も薄手の長袖Tシャツで。', winter: '長袖の服に、防寒上着も重ねて。', side: 'left', top: 32, target: [34, 48] },
  { id: 'long-trousers', number: '③', label: '長ズボン', shortLabel: '長ズボン', summer: '足を覆う、動きやすい長ズボン。', winter: '暖かく、動きやすい長ズボン。', side: 'left', top: 61, target: [35, 65] },
  { id: 'gloves', number: '④', label: '軍手・手袋', shortLabel: '軍手', summer: '子ども用は持参。大人用は主催者が用意します。', winter: '子ども用は持参。大人用は主催者が用意します。', side: 'right', top: 43, target: [73, 60] },
  { id: 'socks', number: '⑤', label: '靴下', shortLabel: '靴下', summer: '長靴の中にも靴下を。', winter: '暖かい靴下で足元を守りましょう。', side: 'left', top: 85, target: [39, 71] },
  { id: 'boots', number: '⑥', label: '長靴', shortLabel: '長靴', summer: '子ども用は持参。大人用の貸出は事前相談。', winter: '子ども用は持参。大人用の貸出は事前相談。', side: 'right', top: 84, target: [70, 76] },
] as const;

export const householdItems = [
  { id: 'towel', label: 'タオル', detail: '汗や手を拭くために。' },
  { id: 'change-of-clothes', label: '帰りの着替え', detail: '土で汚れても安心です。' },
  { id: 'sun-protection', label: '日焼け止めなど', detail: 'ご家庭で必要な日差し対策を。' },
] as const;

export const optionalItems = [
  { id: 'harvest-bag', label: '収穫物用の丈夫な袋', detail: 'お土産の芋を持ち帰るために。' },
  { id: 'dirty-clothes-bag', label: '汚れ物を入れる袋', detail: '着替えや長靴を分けられます。' },
  { id: 'spare-socks', label: '替えの靴下', detail: '濡れたり汚れたりしたときに。' },
] as const;

export const checklistIds = [...clothing, ...householdItems, ...optionalItems].map((item) => item.id);

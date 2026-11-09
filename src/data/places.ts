export type PlaceCategory = 'food' | 'grocery' | 'supplies';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  address: string;
  officialUrl: string;
  checkedAt: string;
  hours: string;
  roadKm: number | null;
  carMinutes: number | null;
  distanceSource: { status: 'confirmed' | 'unavailable'; checkedAt: string };
}

export const places: Place[] = [
  {
    "id": "tsujiya",
    "name": "手作りサンドイッチの店 つじや",
    "category": "food",
    "description": "サンドイッチ、ドッグパン、飲み物を販売。",
    "address": "茨城県土浦市真鍋6-7-2",
    "officialUrl": "https://tsujiya.biz/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "7:00～17:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "ichiban-tsuchiura-manabe",
    "name": "熟成焼肉いちばん 土浦真鍋店",
    "category": "food",
    "description": "焼肉を提供するお店。",
    "address": "茨城県土浦市真鍋新町17-9",
    "officialUrl": "https://maps.jukusei-ichiban.jp/jp/detail/4646.html",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "10:00～24:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "katsuya-ibaraki-tsuchiura",
    "name": "かつや 茨城土浦店",
    "category": "food",
    "description": "カツ丼やとんかつ定食。お持ち帰りにも対応。",
    "address": "茨城県土浦市東真鍋町1-32",
    "officialUrl": "https://shop.arclandservice.co.jp/ae-shop/spot/detail?code=308",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "10:30～23:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "marugame-tsuchiura",
    "name": "丸亀製麺土浦",
    "category": "food",
    "description": "うどん・天ぷら。お持ち帰り専用窓口あり。",
    "address": "茨城県土浦市真鍋新町19-13",
    "officialUrl": "https://stores.marugame.com/110269",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "10:30～21:30",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "mcdonalds-manabe-shinmachi",
    "name": "マクドナルド 真鍋新町店",
    "category": "food",
    "description": "バーガーやサイドメニュー、飲み物。",
    "address": "茨城県土浦市真鍋新町20-36",
    "officialUrl": "https://map.mcdonalds.co.jp/map/08012",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "店内5:00～翌2:00、ドライブスルー24時間",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "cocos-tsuchiura",
    "name": "ココス 土浦店",
    "category": "food",
    "description": "ハンバーグ、パスタ、和膳などのファミリーレストラン。",
    "address": "茨城県土浦市真鍋1-17-16",
    "officialUrl": "https://maps.cocos-jpn.co.jp/jp/detail/2577.html",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "7:00～翌2:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "yumean-tsuchiura-manabe",
    "name": "夢庵 土浦真鍋店",
    "category": "food",
    "description": "そば・天ぷらなどの和食レストラン。",
    "address": "茨城県土浦市真鍋1-15-9",
    "officialUrl": "https://store-info.skylark.co.jp/yumean/map/130050/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "10:30～23:30",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "bandotaro-tsuchiura-otsuno",
    "name": "坂東太郎 土浦おおつ野店",
    "category": "food",
    "description": "うどん・そば・丼・寿司・御膳などの和食。",
    "address": "茨城県土浦市手野町字新堀4001-1",
    "officialUrl": "https://shop.bandotaro.co.jp/detail/419/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "11:00～21:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "yamashin-tsuchiura",
    "name": "ホームセンター 山新土浦店",
    "category": "supplies",
    "description": "日用品・園芸用品などを扱うホームセンター。",
    "address": "茨城県土浦市東真鍋町3-4",
    "officialUrl": "https://www.yamashin-grp.co.jp/shop/tsuchiura/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:00～20:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "nishimatsuya-tsuchiura-kandatsu",
    "name": "西松屋 土浦神立店",
    "category": "supplies",
    "description": "ベビー服・子ども服、育児用品。着替えなどの買い足しに。",
    "address": "茨城県土浦市中神立町19-1",
    "officialUrl": "https://www.24028.jp/tenpo/detail.php?cid=&doc=780",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "10:00～19:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "workman-tsuchiura-kandatsu",
    "name": "ワークマン 土浦神立店",
    "category": "supplies",
    "description": "作業着を扱うお店。",
    "address": "茨城県土浦市神立町3617-1",
    "officialUrl": "https://www.workman.co.jp/store/土浦神立店",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "7:00～20:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "workman-plus-tsuchiura-namiki",
    "name": "WORKMAN Plus 土浦並木店",
    "category": "supplies",
    "description": "作業着とカジュアル衣料を扱うお店。",
    "address": "茨城県土浦市並木3-1-5",
    "officialUrl": "https://www.workman.co.jp/store/土浦並木店",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "7:00～20:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "sunfresh-hasunosato",
    "name": "サンフレッシュはすの里",
    "category": "grocery",
    "description": "れんこんや地元の野菜・果物、加工品を販売する農産物直売所。",
    "address": "茨城県土浦市木田余3140",
    "officialUrl": "https://sunfure.com/hasunosato/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:30～17:30",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "kasumi-tsuchiura-piatown",
    "name": "カスミ フードスクエア土浦ピアタウン店",
    "category": "grocery",
    "description": "食料品を扱うスーパーマーケット。",
    "address": "茨城県土浦市真鍋新町18-13",
    "officialUrl": "https://www.kasumi.co.jp/tenpotop/ibaraki-south/tsuchiura/261/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:00～22:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "taiyo-tsuchiura",
    "name": "タイヨー 土浦店",
    "category": "grocery",
    "description": "生鮮食品や一般食品を扱うスーパーマーケット。",
    "address": "茨城県土浦市東真鍋町4-1",
    "officialUrl": "https://www.super-taiyo.com/shop/2176",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:00～21:45",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "yorkbenimaru-tsuchiura-manabe",
    "name": "ヨークベニマル 土浦真鍋店",
    "category": "grocery",
    "description": "食料品と店内で当日焼き上げたパン。",
    "address": "茨城県土浦市真鍋新町20-19",
    "officialUrl": "https://yorkbenimaru.com/store/details/tsuchiuramanabe/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:30～21:30",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "cooky-tsuchiura",
    "name": "クック-Y 土浦店",
    "category": "grocery",
    "description": "業務用食材、調味料・冷凍食材・お菓子など。一般家庭も利用可能。",
    "address": "茨城県土浦市湖北2-2-1 新鮮市場土浦内",
    "officialUrl": "https://www.yasuno-cc.com/store/cooky.html",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:30～19:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "bestliquor-tsuchiura-kita",
    "name": "ベストリカー土浦北店",
    "category": "grocery",
    "description": "タイヨー系列の食品・酒類のお店。",
    "address": "茨城県土浦市真鍋4-2277-2",
    "officialUrl": "https://www.super-taiyo.com/shop/2185",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "10:00～20:45",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  },
  {
    "id": "kasumi-namiki",
    "name": "カスミ 並木店",
    "category": "grocery",
    "description": "食料品を扱うスーパーマーケット。",
    "address": "茨城県土浦市並木3-8-1",
    "officialUrl": "https://www.kasumi.co.jp/tenpotop/ibaraki-south/tsuchiura/262/",
    "checkedAt": "2026-11-08",
    "roadKm": null,
    "carMinutes": null,
    "hours": "9:00～22:00",
    "distanceSource": {
      "status": "unavailable",
      "checkedAt": "2026-11-08"
    }
  }
];

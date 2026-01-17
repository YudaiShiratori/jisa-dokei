export interface City {
  id: string;
  name: string;
  nameEn: string;
  country: string;
  countryCode: string;
  timezone: string;
  flag: string;
}

export const CITIES: City[] = [
  {
    id: "tokyo",
    name: "東京",
    nameEn: "Tokyo",
    country: "日本",
    countryCode: "JP",
    timezone: "Asia/Tokyo",
    flag: "🇯🇵",
  },
  {
    id: "new-york",
    name: "ニューヨーク",
    nameEn: "New York",
    country: "アメリカ",
    countryCode: "US",
    timezone: "America/New_York",
    flag: "🇺🇸",
  },
  {
    id: "london",
    name: "ロンドン",
    nameEn: "London",
    country: "イギリス",
    countryCode: "GB",
    timezone: "Europe/London",
    flag: "🇬🇧",
  },
  {
    id: "paris",
    name: "パリ",
    nameEn: "Paris",
    country: "フランス",
    countryCode: "FR",
    timezone: "Europe/Paris",
    flag: "🇫🇷",
  },
  {
    id: "singapore",
    name: "シンガポール",
    nameEn: "Singapore",
    country: "シンガポール",
    countryCode: "SG",
    timezone: "Asia/Singapore",
    flag: "🇸🇬",
  },
  {
    id: "sydney",
    name: "シドニー",
    nameEn: "Sydney",
    country: "オーストラリア",
    countryCode: "AU",
    timezone: "Australia/Sydney",
    flag: "🇦🇺",
  },
  {
    id: "los-angeles",
    name: "ロサンゼルス",
    nameEn: "Los Angeles",
    country: "アメリカ",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    flag: "🇺🇸",
  },
  {
    id: "shanghai",
    name: "上海",
    nameEn: "Shanghai",
    country: "中国",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    flag: "🇨🇳",
  },
  {
    id: "dubai",
    name: "ドバイ",
    nameEn: "Dubai",
    country: "アラブ首長国連邦",
    countryCode: "AE",
    timezone: "Asia/Dubai",
    flag: "🇦🇪",
  },
  {
    id: "hong-kong",
    name: "香港",
    nameEn: "Hong Kong",
    country: "香港",
    countryCode: "HK",
    timezone: "Asia/Hong_Kong",
    flag: "🇭🇰",
  },
  {
    id: "seoul",
    name: "ソウル",
    nameEn: "Seoul",
    country: "韓国",
    countryCode: "KR",
    timezone: "Asia/Seoul",
    flag: "🇰🇷",
  },
  {
    id: "berlin",
    name: "ベルリン",
    nameEn: "Berlin",
    country: "ドイツ",
    countryCode: "DE",
    timezone: "Europe/Berlin",
    flag: "🇩🇪",
  },
  {
    id: "bangkok",
    name: "バンコク",
    nameEn: "Bangkok",
    country: "タイ",
    countryCode: "TH",
    timezone: "Asia/Bangkok",
    flag: "🇹🇭",
  },
  {
    id: "mumbai",
    name: "ムンバイ",
    nameEn: "Mumbai",
    country: "インド",
    countryCode: "IN",
    timezone: "Asia/Kolkata",
    flag: "🇮🇳",
  },
  {
    id: "moscow",
    name: "モスクワ",
    nameEn: "Moscow",
    country: "ロシア",
    countryCode: "RU",
    timezone: "Europe/Moscow",
    flag: "🇷🇺",
  },
  {
    id: "sao-paulo",
    name: "サンパウロ",
    nameEn: "São Paulo",
    country: "ブラジル",
    countryCode: "BR",
    timezone: "America/Sao_Paulo",
    flag: "🇧🇷",
  },
  {
    id: "toronto",
    name: "トロント",
    nameEn: "Toronto",
    country: "カナダ",
    countryCode: "CA",
    timezone: "America/Toronto",
    flag: "🇨🇦",
  },
  {
    id: "vancouver",
    name: "バンクーバー",
    nameEn: "Vancouver",
    country: "カナダ",
    countryCode: "CA",
    timezone: "America/Vancouver",
    flag: "🇨🇦",
  },
  {
    id: "amsterdam",
    name: "アムステルダム",
    nameEn: "Amsterdam",
    country: "オランダ",
    countryCode: "NL",
    timezone: "Europe/Amsterdam",
    flag: "🇳🇱",
  },
  {
    id: "zurich",
    name: "チューリッヒ",
    nameEn: "Zurich",
    country: "スイス",
    countryCode: "CH",
    timezone: "Europe/Zurich",
    flag: "🇨🇭",
  },
];

export function getCityById(id: string): City | undefined {
  return CITIES.find((city) => city.id === id);
}

export function searchCities(query: string): City[] {
  const lowerQuery = query.toLowerCase();
  return CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerQuery) ||
      city.nameEn.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery),
  );
}

export function getCitiesByCountryCode(countryCode: string): City[] {
  return CITIES.filter(
    (city) => city.countryCode.toLowerCase() === countryCode.toLowerCase(),
  );
}

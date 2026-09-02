export type NavigationItem = {
  label: string;
  href: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};

export const site = {
  name: 'ユリーカ・ティロドス',
  englishName: 'Eureka Telodos',
  title: 'Eureka Telodos Official Website | ユリーカ・ティロドス 公式サイト',
  description:
    'ユリーカ・ティロドス（Eureka Telodos）の公式ウェブサイト。配信、VRChatでの創作、最新のお知らせや公式リンクを掲載しています。',
  url: 'https://telodos.com',
  locale: 'ja_JP',
  themeColor: '#08060b',
} as const;

export const navigation: NavigationItem[] = [
  { label: 'NEWS', href: '#news' },
  { label: 'ACTIVITY', href: '#activity' },
  { label: 'PROFILE', href: '#profile' },
  { label: 'LINKS', href: '#links' },
  { label: 'GUIDELINES', href: '#guidelines' },
  { label: 'DESIGN', href: '#design' },
];

export const socialLinks: ExternalLink[] = [
  { label: 'X', href: 'https://x.com/eureka_td' },
  { label: 'Twitch', href: 'https://twitch.tv/eureka_td' },
  { label: 'YouTube', href: 'https://www.youtube.com/@eureka_td' },
];

export const profile = {
  catchphrase: 'まだまだ夜はこれから…だよね？',
  englishCatchphrase: 'Will you stay up late with me tonight?',
  introduction:
    '黒と緑を纏う吸血鬼VTuber。Twitchでのゲーム配信を中心に、VRChatでの写真・映像表現や、Unityを使った制作と解説を届けています。',
  facts: [
    { label: '真名', englishLabel: 'Name', value: 'ユリーカ・ティロドス' },
    { label: '種族', englishLabel: 'Race', value: '吸血鬼 / Vampire', accent: true },
    { label: '誕生日', englishLabel: 'Birthday', value: '1414年 8月16日（612歳）' },
    { label: '身長', englishLabel: 'Height', value: '163 cm' },
    { label: '体重', englishLabel: 'Weight', value: '4X kg' },
    { label: 'ファンマーク', englishLabel: 'Fan mark', value: '⚜️🦇', accent: true },
  ],
  tags: [
    { label: '配信', value: '#ゆりーみんぐ' },
    { label: '創作', value: '#ゆりー画' },
  ],
} as const;

export const activities = [
  {
    id: 'twitch',
    index: '01',
    kicker: 'LIVE STREAM',
    title: 'Twitch',
    description:
      '対戦ゲームやアクションゲームを中心にリアルタイム配信。サブスク特典として、眷属ちゃん向けDiscordにも参加できます。',
    note: '配信と眷属ちゃんとの交流の中心',
    href: 'https://twitch.tv/eureka_td',
    linkLabel: 'Twitchを開く',
    tone: 'green',
  },
  {
    id: 'youtube',
    index: '02',
    kicker: 'VIDEOS & TUTORIALS',
    title: 'YouTube',
    description:
      'VRChat向けUnity解説、配信アーカイブ、歌ってみたや踊ってみたなど、残して届けたい映像をまとめています。',
    note: 'Unity解説動画は5万回以上再生',
    href: 'https://www.youtube.com/@eureka_td',
    linkLabel: 'YouTubeを開く',
    tone: 'red',
  },
] as const;

export const officialLinks = [
  {
    label: 'Fantia',
    category: 'FAN CLUB',
    title: 'ユリーカのお城',
    description:
      'Xでは見られない写真や動画、アーカイブ写真集、VRChatで実際に会えるコミッションなどを公開しています。',
    href: 'https://fantia.jp/fanclubs/474012',
    cta: 'Fantiaに加入する',
    tone: 'fantia',
  },
  {
    label: 'pixivFANBOX',
    category: 'FAN CLUB',
    title: 'FANBOX出張版',
    description:
      'Fantiaと同系統の写真・動画を公開。FANBOXとDiscordを連携すると、眷属ちゃん向けサーバーにも参加できます。',
    href: 'https://eureka-td.fanbox.cc/',
    cta: 'FANBOXに加入する',
    tone: 'fanbox',
  },
  {
    label: 'BOOTH',
    category: 'TOOLS & MERCH',
    title: 'Principaleka BOOTH',
    description:
      'アバター改変やUnity制作を助ける自作ツールと、ユリーカのリアルグッズを販売しています。',
    href: 'https://principaleka.booth.pm/',
    cta: 'BOOTHストアへ',
    tone: 'booth',
  },
] as const;

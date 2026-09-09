import { publishedVideos, previewVideos } from './videos';

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
  { label: 'ACTIVITY', href: '#activity' },
  { label: 'NEWS', href: '#news' },
  { label: 'PROFILE', href: '#profile' },
  { label: 'LINKS', href: '#links' },
  { label: 'GUIDELINES', href: '#guidelines' },
  ...(publishedVideos.length || previewVideos ? [{ label: 'VIDEOS', href: '#videos' }] : []),
  { label: 'CONTACT', href: '#contact' },
];

export const contact = {
  handle: '@eureka_td',
  href: 'https://x.com/eureka_td',
  description: 'お仕事・コラボ・掲載についてのご相談は、X（@eureka_td）のDMへご連絡ください。',
} as const;

export const socialLinks: ExternalLink[] = [
  { label: 'X', href: 'https://x.com/eureka_td' },
  { label: 'Twitch', href: 'https://twitch.tv/eureka_td' },
  { label: 'YouTube', href: 'https://www.youtube.com/@eureka_td' },
];

export const profile = {
  catchphrase: 'まだまだ夜はこれから…だよね？',
  englishCatchphrase: 'Will you stay up late with me tonight?',
  introduction:
    '黒と緑を纏う吸血鬼。',
  facts: [
    { label: '真名', englishLabel: 'Name', value: 'ユリーカ・ティロドス' },
    { label: '種族', englishLabel: 'Race', value: '吸血鬼 (Vampire)', accent: true },
    { label: '誕生日', englishLabel: 'Birthday', value: '1414年 8月16日(612歳)' },
    { label: '身長', englishLabel: 'Height', value: '163 cm' },
    { label: '体重', englishLabel: 'Weight', value: '4X kg' },
    { label: 'ファンマーク', englishLabel: 'Fan Mark', value: '⚜️🦇', accent: true },
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
      '対戦ゲームやアクションゲームを中心に、Twitchでリアルタイム配信を行っています。',
    href: 'https://twitch.tv/eureka_td',
    linkLabel: 'WATCH LIVE',
    tone: 'green',
  },
  {
    id: 'youtube',
    index: '02',
    kicker: 'VIDEOS & TUTORIALS',
    title: 'YOUTUBE',
    description:
      'VRChat・Unityの解説動画、配信アーカイブ、歌や映像作品などを公開しています。',
    href: 'https://www.youtube.com/@eureka_td',
    linkLabel: 'WATCH VIDEOS',
    tone: 'red',
  },
] as const;

export const officialLinks = [
  { label: 'Fantia', description: 'Photos / Videos / Commission', href: 'https://fantia.jp/fanclubs/474012', cta: 'JOIN FANTIA', tone: 'fantia' },
  { label: 'FANBOX', description: 'Photos / Videos / Discord', href: 'https://eureka-td.fanbox.cc/', cta: 'JOIN FANBOX', tone: 'fanbox' },
  { label: 'BOOTH', description: 'Unity Tools / Goods', href: 'https://principaleka.booth.pm/', cta: 'VISIT BOOTH', tone: 'booth' },
] as const;

export const twitchSupport = 'Twitchのサブスクでは特別なバッジ・エモートを利用できます。TwitchとDiscordを連携すると専用サーバーに参加でき、限定写真やUnity用無料ツール、チャット交流を楽しめます。';

export const linkDirectory = [
  { label: 'TWITCH', note: 'Live Streaming', href: 'https://twitch.tv/eureka_td' },
  { label: 'YOUTUBE', note: 'Videos', href: 'https://www.youtube.com/@eureka_td' },
  { label: 'X', note: 'Social', href: 'https://x.com/eureka_td' },
  { label: 'VRCHAT', note: 'Profile', href: 'https://vrchat.com/home/user/usr_bbdc1b8e-a493-40dd-bb16-a3db994e8a16' },
  { label: 'FANTIA', note: 'Fan Club', href: 'https://fantia.jp/fanclubs/474012' },
  { label: 'FANBOX', note: 'Fan Club', href: 'https://eureka-td.fanbox.cc/' },
  { label: 'BOOTH', note: 'Tools & Goods', href: 'https://principaleka.booth.pm/' },
] as const;

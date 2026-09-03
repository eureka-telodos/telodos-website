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
      '主に対戦ゲームやアクションゲームの実況配信をリアルタイムで届けています。チャンネルをサブスクライブしていただくと、特別なバッジや様々なエモートが使えるだけでなく、後述するDiscordサーバーにも参加できます。',
    note: 'サブスクライブし、TwitchとDiscordを連携することで、自動的に専用サーバーへ参加できます。特別なお写真やUnity用無料ツールの限定公開のほか、クローズドな空間での特別なチャット交流を行っています。',
    href: 'https://twitch.tv/eureka_td',
    linkLabel: 'Twitchへアクセス',
    tone: 'green',
  },
  {
    id: 'youtube',
    index: '02',
    kicker: 'VIDEOS & TUTORIALS',
    title: 'YOUTUBE',
    description:
      'YouTubeでは5万回以上再生されている「VRchat向けのUnity解説動画」のほか、ライブ配信のアーカイブなどを見ることが出来ます。さらに「歌ってみた」や「踊ってみた」などへの挑戦も行っています。',
    note: '【VRChat】まばたきが潰れる時の修正方法【FaceEmo】— VRchat初心者の人に向けたあるあるを解決するチュートリアル。',
    href: 'https://www.youtube.com/@eureka_td',
    linkLabel: 'Youtubeへアクセス',
    tone: 'red',
  },
] as const;

export const officialLinks = [
  {
    label: 'Fantia',
    category: 'PORTRAITS',
    title: 'ユリーカのお城',
    description:
      'Xで見れない写真や動画を公開。更にFantiaではコミッションでVRChatで実際に会えるチケットやアーカイブ写真集などを販売しています。',
    href: 'https://fantia.jp/fanclubs/474012',
    cta: 'Fantiaに加入する',
    tone: 'fantia',
  },
  {
    label: 'Pixiv FANBOX',
    category: 'PORTRAITS',
    title: 'FANBOX出張版',
    description:
      '基本的にはFantiaと同一内容を投稿しています。ただし、過去の写真は随時上位プランへと移されます。ほかにも、FANBOXとDiscordを連携することでファンサーバーに参加も可能です。',
    href: 'https://eureka-td.fanbox.cc/',
    cta: 'FANBOXに加入する',
    tone: 'fanbox',
  },
  {
    label: 'BOOTH Store',
    category: 'TOOLS & MERCH',
    title: 'Principaleka BOOTH',
    description:
      '私自身が開発したアバター改変用のUnityツールのオンライン販売や、リアルグッズを通販で入手可能。お気軽に覗いてみてください。',
    href: 'https://principaleka.booth.pm/',
    cta: 'BOOTHストアへ',
    tone: 'booth',
  },
] as const;

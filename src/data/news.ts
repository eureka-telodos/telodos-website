export type NewsItem = {
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
};

// 新しい項目をいちばん上に追加すると、トップページへ自動で反映されます。
export const news: NewsItem[] = [
  {
    title: 'お誕生日を迎えました🌟',
    date: '2026.08.16',
    category: 'ANNIVERSARY',
    description:
      '無事今年もお誕生日を迎えることができました🌟 VRChatインスタンスや記念配信で、とても幸せな時間を過ごせました！',
    image: '/images/hero/character-main.webp',
    imageAlt: 'ユリーカ・ティロドス誕生日記念',
  },
  {
    title: '活動4周年❣ありがとうございます💕',
    date: '2026.05.29',
    category: 'ANNIVERSARY',
    description:
      '5月29日で活動4周年を迎えました。これからもユリーカ・ティロドスをよろしくね…💕',
    image: '/images/news/fourth-anniversary.jpg',
    imageAlt: 'ユリーカ・ティロドス活動4周年記念配信',
    href: 'https://youtube.com/live/wwr18mcPcOQ?feature=share',
  },
  {
    title: 'VRCイベント「Older Maide」に所属しました',
    date: '2026.05.18',
    category: 'VRCHAT',
    description:
      '「Older Maide」に所属しました。みんなと定期的に会える機会が増えました💕',
    image: '/images/news/older-maide.webp',
    imageAlt: 'VRCイベント Older Maide',
    href: 'https://x.com/OlderMaideVRC',
  },
];

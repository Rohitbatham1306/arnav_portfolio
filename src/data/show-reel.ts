export interface showReelI {
  title: string;
  category?: string;
  videoUrl: string;
  vimeoId?: string;
  thumbnail: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    repost: number;
  };
}

export const showRealData: showReelI[] = [
  {
    title: "AI Creative Direction",
    category: "01. AI Creative Direction ⭐",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Ai%20Transation.mp4",
    thumbnail: "/portfolio/banner-1.png",
    stats: {
      views: 345000,
      likes: 42000,
      comments: 1240,
      repost: 3850,
    },
  },
  {
    title: "Coca-Cola UGC Campaign",
    category: "02. Creative & Advertising",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Coco%20cola%20UGC.mp4",
    thumbnail: "/portfolio/image-2.png",
    stats: {
      views: 520000,
      likes: 68500,
      comments: 2150,
      repost: 7400,
    },
  },
  {
    title: "Banana Viral 3D Reel",
    category: "03. Social, UGC & Influencer",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/BANANA.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
    stats: {
      views: 890000,
      likes: 114000,
      comments: 3420,
      repost: 14200,
    },
  },
  {
    title: "Cinematic Film & Motion",
    category: "04. Film & Production",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/1%20(1).MP4",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop",
    stats: {
      views: 410000,
      likes: 53900,
      comments: 1580,
      repost: 4900,
    },
  },
  {
    title: "Experiential Brand Activation",
    category: "05. Experiential & Event Production",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/3%20(1).MP4",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    stats: {
      views: 295000,
      likes: 36300,
      comments: 910,
      repost: 2800,
    },
  },
  {
    title: "Creative Tech & AI Automation",
    category: "06. Creative Technology",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/7.mp4",
    thumbnail: "/portfolio/banner-1.png",
    stats: {
      views: 630000,
      likes: 82000,
      comments: 2640,
      repost: 9100,
    },
  },
];

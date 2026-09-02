export interface showReelI {
  title: string;
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
    thumbnail: "/portfolio/banner-1.png",
    stats: {
      views: 145000,
      likes: 18200,
      comments: 340,
      repost: 1250,
    },
  },
  {
    title: "Brand Architecture",
    thumbnail: "/portfolio/image-2.png",
    stats: {
      views: 220000,
      likes: 24500,
      comments: 520,
      repost: 2100,
    },
  },
  {
    title: "Viral Social & UGC",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
    stats: {
      views: 480000,
      likes: 56000,
      comments: 1120,
      repost: 6400,
    },
  },
  {
    title: "Film & 3D Production",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop",
    stats: {
      views: 310000,
      likes: 38900,
      comments: 780,
      repost: 3400,
    },
  },
  {
    title: "Experiential & Tech",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    stats: {
      views: 195000,
      likes: 21300,
      comments: 410,
      repost: 1800,
    },
  },
];

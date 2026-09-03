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
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/4%20(1).mp4",
    thumbnail: "/portfolio/banner-1.png",
    stats: {
      views: 345000,
      likes: 42000,
      comments: 1240,
      repost: 3850,
    },
  },
  {
    title: "CGI Reel Works",
    category: "02. CGI & 3D Visuals",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Cgi%20reel%20works.mp4",
    thumbnail: "/portfolio/image-2.png",
    stats: {
      views: 520000,
      likes: 68500,
      comments: 2150,
      repost: 7400,
    },
  },
  {
    title: "Pardesi X Arnav",
    category: "03. Film & Direction",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Pardesi%20X%20Arnav.mp4",
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
    title: "Mehman Production",
    category: "04. Creative Production",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Mehman.mp4",
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
    title: "Delgro Animated Video",
    category: "05. Motion & Animation",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/Delgro%20Animated%20Video.mp4",
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
    title: "ELIE SAAB Launch",
    category: "06. Experiential & Event Launch",
    videoUrl:
      "https://pub-9a22c893ce8d4e1cab539cc82cbb08c2.r2.dev/ELIE%20SAAB%20LAUNCH.mp4",
    thumbnail: "/portfolio/banner-1.png",
    stats: {
      views: 630000,
      likes: 82000,
      comments: 2640,
      repost: 9100,
    },
  },
];

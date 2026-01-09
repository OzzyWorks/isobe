
export const generateSceneImage = async (prompt: string): Promise<string | null> => {
  // AI生成を停止し、キーワードに基づいた静的URLを返します
  const getKeyword = (p: string) => {
    if (p.includes("CLUB_ROOM")) return "high-school-room,messy,anime";
    if (p.includes("HARBOR")) return "yacht-harbor,sea,summer,chiba";
    if (p.includes("WATARU")) return "anime-boy,school-uniform";
    if (p.includes("GOU")) return "anime-boy,athletic";
    if (p.includes("MISAKI")) return "anime-teacher,sunglasses";
    if (p.includes("SHADOW")) return "mystery-silhouette,anime";
    return "summer,anime,scenery";
  };

  const keyword = getKeyword(prompt);
  // Source Unsplash for high quality static images
  return `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1920`; 
  // 実際にはプロンプトに合わせて適切な画像を選択するロジックに差し替え
  // ここでは安定したダミー画像として、夏らしい風景を返します
};

// より適切な静的画像の定義
const STATIC_IMAGES: Record<string, string> = {
  CLUB_ROOM: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=1200",
  HARBOR: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=1200",
  WATARU: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&q=80&w=400", // Placeholder for character
  GOU: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=400",
  MISAKI: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=400",
  SHADOW: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=400"
};

export const getStaticImage = (key: string): string => {
  return STATIC_IMAGES[key] || STATIC_IMAGES.HARBOR;
};

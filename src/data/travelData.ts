import heroBg from "@/assets/hero-santorini.jpg";
import destBali from "@/assets/dest-bali.jpg";
import destKyoto from "@/assets/dest-kyoto.jpg";
import destPatagonia from "@/assets/dest-patagonia.jpg";
import destMarrakech from "@/assets/dest-marrakech.jpg";
import destIceland from "@/assets/dest-iceland.jpg";
import postAlps from "@/assets/post-alps.jpg";
import postThaiFood from "@/assets/post-thai-food.jpg";

export { heroBg };

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  tags: string[];
  lat: number;
  lon: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  tags: string[];
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Bali",
    country: "Indonesia",
    image: destBali,
    description: "Lush rice terraces, ancient temples, and vibrant culture await on this island paradise.",
    tags: ["adventure", "culture", "nature"],
    lat: -8.3405,
    lon: 115.092,
  },
  {
    id: "2",
    name: "Kyoto",
    country: "Japan",
    image: destKyoto,
    description: "Timeless beauty where cherry blossoms frame centuries-old temples and tea houses.",
    tags: ["culture", "food", "history"],
    lat: 35.0116,
    lon: 135.7681,
  },
  {
    id: "3",
    name: "Patagonia",
    country: "Argentina",
    image: destPatagonia,
    description: "Dramatic peaks, turquoise lakes, and untouched wilderness at the end of the world.",
    tags: ["adventure", "nature", "hiking"],
    lat: -50.3418,
    lon: -72.2646,
  },
  {
    id: "4",
    name: "Marrakech",
    country: "Morocco",
    image: destMarrakech,
    description: "A sensory feast of spice markets, ornate riads, and the pulse of North Africa.",
    tags: ["culture", "food", "shopping"],
    lat: 31.6295,
    lon: -7.9811,
  },
  {
    id: "5",
    name: "Iceland",
    country: "Iceland",
    image: destIceland,
    description: "Northern lights, volcanic landscapes, and hot springs in the land of fire and ice.",
    tags: ["adventure", "nature", "photography"],
    lat: 64.1466,
    lon: -21.9426,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "hidden-villages-swiss-alps",
    title: "Hidden Villages of the Swiss Alps",
    summary: "Discover charming mountain hamlets where time stands still, wooden chalets dot emerald meadows, and the Alps reveal their quieter side.",
    content: `The Swiss Alps are more than just ski resorts and chocolate shops. Venture beyond the well-trodden paths of Zermatt and Interlaken, and you'll find a Switzerland that feels almost forgotten by time.

## Gimmelwald: The Car-Free Wonder

Perched on a cliff above the Lauterbrunnen Valley, Gimmelwald is accessible only by cable car. With a population of barely 100, this tiny village offers some of the most dramatic views in all of Switzerland. Wake up to the sight of the Jungfrau massif painted in morning gold, and spend your days hiking trails that wind through wildflower meadows.

## Guarda: The Painted Village

In the Lower Engadine, the village of Guarda sits at 1,653 meters, its traditional Engadine houses decorated with intricate sgraffito artwork. Walking through its narrow lanes feels like stepping into a storybook—every facade tells a tale, every fountain whispers of centuries past.

## Practical Tips

- **Best time to visit:** June to September for hiking; December to March for snow
- **Getting around:** Swiss Rail passes work brilliantly; local PostBus services reach most villages
- **Budget tip:** Mountain huts (SAC hütten) offer affordable overnight stays with incredible views
- **Pack layers:** Mountain weather changes rapidly, even in summer`,
    image: postAlps,
    date: "2026-01-15",
    readTime: "6 min read",
    author: "Wanderlust Team",
    category: "Adventure",
    tags: ["hiking", "europe", "mountains"],
  },
  {
    id: "2",
    slug: "bangkok-street-food-guide",
    title: "The Ultimate Bangkok Street Food Guide",
    summary: "From sizzling pad thai on Yaowarat Road to hidden curry stalls in old town—a food lover's map to Bangkok's best bites.",
    content: `Bangkok's street food scene is legendary, and for good reason. The city's sidewalks transform into open-air kitchens every evening, filling the air with the aroma of lemongrass, chili, and coconut.

## Yaowarat Road: Chinatown Magic

Start your journey in Chinatown, where Yaowarat Road comes alive after dark. The neon signs reflect off steaming woks as vendors serve up everything from crispy pork belly to fresh oyster omelets. Don't miss the legendary Nai Ek Roll Noodles—a Michelin Bib Gourmand recipient still serving from a humble street cart.

## Old Town Favorites

Cross the river to the old town area near Wat Pho, where family-run stalls have been perfecting their craft for generations. Try the boat noodles at Thip Samai, where the pad thai is cooked over charcoal and wrapped in a delicate egg net.

## Essential Tips

- **Eat where locals eat:** Long queues at a street stall are the best recommendation
- **Timing matters:** Many famous stalls only operate from 5 PM to midnight
- **Stay adventurous:** Point and order—the best discoveries come from curiosity
- **Budget:** Most street meals cost 40-80 baht (about $1-2 USD)`,
    image: postThaiFood,
    date: "2026-01-08",
    readTime: "5 min read",
    author: "Wanderlust Team",
    category: "Food",
    tags: ["food", "asia", "budget"],
  },
  {
    id: "3",
    slug: "northern-lights-iceland-guide",
    title: "Chasing the Northern Lights in Iceland",
    summary: "A complete guide to witnessing the aurora borealis—best locations, timing, and photography tips for Iceland's most magical spectacle.",
    content: `There are few natural phenomena as humbling as watching the northern lights dance across an Arctic sky. Iceland, with its dark winters and accessible landscapes, offers one of the best stages on Earth for this celestial performance.

## When to Go

The aurora season runs from September through March, with peak activity around the equinoxes. But the lights are unpredictable—even during peak season, you need clear skies and solar activity to align.

## Best Locations

- **Thingvellir National Park:** Dark skies just 45 minutes from Reykjavik
- **Vik:** The black sand beach creates a dramatic foreground
- **Snaefellsnes Peninsula:** Less crowded, equally stunning

## Photography Tips

- Use a sturdy tripod and set your ISO between 1600-3200
- Wide-angle lens (14-24mm) works best
- Shutter speed of 8-15 seconds captures the movement beautifully
- Shoot in RAW for maximum post-processing flexibility`,
    image: destIceland,
    date: "2025-12-20",
    readTime: "7 min read",
    author: "Wanderlust Team",
    category: "Adventure",
    tags: ["photography", "europe", "nature"],
  },
  {
    id: "4",
    slug: "bali-beyond-beaches",
    title: "Bali Beyond the Beaches",
    summary: "Step away from the tourist crowds and explore Bali's spiritual heartland—ancient temples, sacred springs, and rice terrace walks.",
    content: `Most visitors to Bali never venture beyond the beach clubs of Seminyak or the surf breaks of Uluwatu. But the island's true magic lies in its interior—a world of emerald rice paddies, mist-shrouded temples, and profound spiritual traditions.

## Ubud and Beyond

While Ubud itself has become quite touristy, the villages surrounding it remain authentic. Rent a scooter and ride north to Tegallalang, where the rice terraces cascade down the hillside in perfect symmetry.

## Sacred Water Temples

Visit Tirta Empul, where Balinese Hindus come to purify themselves in sacred spring water. The experience of participating in the purification ritual—stepping through each fountain as water cascades over you—is profoundly moving.

## Tips for Respectful Travel

- Always wear a sarong when visiting temples
- Ask before photographing ceremonies
- Support local warungs (family restaurants) over chain establishments
- Learn a few words of Bahasa Indonesia—locals appreciate the effort`,
    image: destBali,
    date: "2025-12-10",
    readTime: "5 min read",
    author: "Wanderlust Team",
    category: "Culture",
    tags: ["culture", "asia", "spiritual"],
  },
  {
    id: "5",
    slug: "marrakech-medina-guide",
    title: "Getting Lost in the Marrakech Medina",
    summary: "Embrace the beautiful chaos of Marrakech's ancient walled city—souks, riads, and the art of getting wonderfully lost.",
    content: `The Marrakech Medina is not a place you navigate—it's a place that navigates you. This UNESCO World Heritage site is a labyrinth of narrow alleys, bustling souks, and hidden courtyards that rewards those who surrender to its rhythm.

## Jemaa el-Fnaa: The Heart of It All

The famous square transforms throughout the day. Morning brings fresh orange juice vendors; afternoon sees snake charmers and henna artists; evening unveils rows of food stalls serving everything from snail soup to lamb tagine.

## The Souks

Each section of the souk specializes in different crafts—leather goods in one alley, metalwork in another, spices in yet another. The colors, textures, and scents create an overwhelming sensory tapestry.

## Survival Tips

- **Bargaining is expected:** Start at about a third of the asking price
- **Stay oriented:** The minaret of Koutoubia Mosque is your compass
- **Riad life:** Stay in a traditional riad for the full experience
- **Best time:** October to April offers pleasant temperatures`,
    image: destMarrakech,
    date: "2025-11-28",
    readTime: "6 min read",
    author: "Wanderlust Team",
    category: "Culture",
    tags: ["culture", "africa", "food"],
  },
];

export const categories = ["All", "Adventure", "Culture", "Food", "Nature"];

/**
 * Kaarani Learning — Sample Data Seed Script
 *
 * Generates:
 *   public/data/combined/   ← star schema CSVs for Power BI
 *   public/data/practice/   ← per-flavor messy + model CSVs for learners
 *   src/data/practice-data/ ← TypeScript files for portal screens
 *
 * Run: npx tsx scripts/generate-data.ts
 */

import * as fs from "fs";
import * as path from "path";

// ─── Seed RNG (deterministic) ─────────────────────────────────────────────────
let seed = 42;
function rand(): number {
  seed = (seed * 1664525 + 1013904223) & 0xffffffff;
  return (seed >>> 0) / 0xffffffff;
}
function randInt(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Date utilities ───────────────────────────────────────────────────────────
function dateKey(d: Date): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}
function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function daysBetween(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / 86400000);
}

// ─── Flavor definitions ───────────────────────────────────────────────────────
interface FlavorDef {
  id: string;
  label: string;
  entities: { key: string; name: string; role: string; categoryKey: string; debutYear: number }[];
  categories: { key: string; name: string; type: string; region: string; foundedYear: number }[];
  locations: { key: string; name: string; city: string; state: string; type: string; capacity: number }[];
  metric1Label: string;
  metric2Label: string;
  activityType: string;
  statusValues: string[];
  /** date ranges when games/activity happen */
  seasons: { start: string; end: string }[];
  metric1Range: [number, number];
  metric2Range: [number, number];
  grain: "game" | "week";
}

const FLAVORS: FlavorDef[] = [
  {
    id: "baseball",
    label: "Baseball (MLB)",
    metric1Label: "hits",
    metric2Label: "home_runs",
    activityType: "game",
    statusValues: ["Played", "Played", "Played", "Played", "Postponed", "Played"],
    seasons: [
      { start: "2022-04-07", end: "2022-10-05" },
      { start: "2023-03-30", end: "2023-10-01" },
      { start: "2024-03-20", end: "2024-10-01" },
    ],
    metric1Range: [0, 5],
    metric2Range: [0, 2],
    grain: "game",
    entities: [
      { key: "ohtani", name: "Shohei Ohtani", role: "Designated Hitter / Pitcher", categoryKey: "lad", debutYear: 2018 },
      { key: "betts", name: "Mookie Betts", role: "Right Fielder", categoryKey: "lad", debutYear: 2014 },
      { key: "freeman", name: "Freddie Freeman", role: "First Baseman", categoryKey: "lad", debutYear: 2010 },
      { key: "judge", name: "Aaron Judge", role: "Center Fielder", categoryKey: "nyy", debutYear: 2016 },
      { key: "acuna", name: "Ronald Acuña Jr.", role: "Right Fielder", categoryKey: "atl", debutYear: 2018 },
      { key: "alvarez", name: "Yordan Alvarez", role: "Designated Hitter", categoryKey: "hou", debutYear: 2019 },
      { key: "soto", name: "Juan Soto", role: "Left Fielder", categoryKey: "nyy", debutYear: 2018 },
    ],
    categories: [
      { key: "lad", name: "LA Dodgers", type: "NL West", region: "Los Angeles, CA", foundedYear: 1883 },
      { key: "nyy", name: "NY Yankees", type: "AL East", region: "New York, NY", foundedYear: 1903 },
      { key: "atl", name: "Atlanta Braves", type: "NL East", region: "Atlanta, GA", foundedYear: 1871 },
      { key: "hou", name: "Houston Astros", type: "AL West", region: "Houston, TX", foundedYear: 1962 },
      { key: "bos", name: "Boston Red Sox", type: "AL East", region: "Boston, MA", foundedYear: 1901 },
    ],
    locations: [
      { key: "dodger", name: "Dodger Stadium", city: "Los Angeles", state: "CA", type: "Stadium", capacity: 56000 },
      { key: "yankee", name: "Yankee Stadium", city: "New York", state: "NY", type: "Stadium", capacity: 47309 },
      { key: "truist", name: "Truist Park", city: "Atlanta", state: "GA", type: "Stadium", capacity: 41084 },
      { key: "minute", name: "Minute Maid Park", city: "Houston", state: "TX", type: "Stadium", capacity: 41168 },
    ],
  },
  {
    id: "nfl",
    label: "American Football (NFL)",
    metric1Label: "pass_yards",
    metric2Label: "touchdowns",
    activityType: "game",
    statusValues: ["Played", "Played", "Played", "Played", "Played", "Cancelled"],
    seasons: [
      { start: "2022-09-08", end: "2023-01-08" },
      { start: "2023-09-07", end: "2024-01-07" },
      { start: "2024-09-05", end: "2025-01-05" },
    ],
    metric1Range: [150, 420],
    metric2Range: [0, 5],
    grain: "game",
    entities: [
      { key: "mahomes", name: "Patrick Mahomes", role: "Quarterback", categoryKey: "kc", debutYear: 2017 },
      { key: "jackson", name: "Lamar Jackson", role: "Quarterback", categoryKey: "bal", debutYear: 2018 },
      { key: "allen", name: "Josh Allen", role: "Quarterback", categoryKey: "buf", debutYear: 2018 },
      { key: "hurts", name: "Jalen Hurts", role: "Quarterback", categoryKey: "phi", debutYear: 2020 },
      { key: "stroud", name: "CJ Stroud", role: "Quarterback", categoryKey: "hou", debutYear: 2023 },
      { key: "prescott", name: "Dak Prescott", role: "Quarterback", categoryKey: "dal", debutYear: 2016 },
      { key: "tua", name: "Tua Tagovailoa", role: "Quarterback", categoryKey: "mia", debutYear: 2020 },
    ],
    categories: [
      { key: "kc", name: "Kansas City Chiefs", type: "AFC West", region: "Kansas City, MO", foundedYear: 1960 },
      { key: "bal", name: "Baltimore Ravens", type: "AFC North", region: "Baltimore, MD", foundedYear: 1996 },
      { key: "buf", name: "Buffalo Bills", type: "AFC East", region: "Buffalo, NY", foundedYear: 1960 },
      { key: "phi", name: "Philadelphia Eagles", type: "NFC East", region: "Philadelphia, PA", foundedYear: 1933 },
      { key: "hou", name: "Houston Texans", type: "AFC South", region: "Houston, TX", foundedYear: 2002 },
      { key: "dal", name: "Dallas Cowboys", type: "NFC East", region: "Dallas, TX", foundedYear: 1960 },
      { key: "mia", name: "Miami Dolphins", type: "AFC East", region: "Miami, FL", foundedYear: 1966 },
    ],
    locations: [
      { key: "arrowhead", name: "Arrowhead Stadium", city: "Kansas City", state: "MO", type: "Stadium", capacity: 76416 },
      { key: "mandt", name: "M&T Bank Stadium", city: "Baltimore", state: "MD", type: "Stadium", capacity: 71008 },
      { key: "highmark", name: "Highmark Stadium", city: "Orchard Park", state: "NY", type: "Stadium", capacity: 71608 },
      { key: "lincoln", name: "Lincoln Financial Field", city: "Philadelphia", state: "PA", type: "Stadium", capacity: 69796 },
    ],
  },
  {
    id: "soccer",
    label: "Soccer (MLS)",
    metric1Label: "goals",
    metric2Label: "assists",
    activityType: "match",
    statusValues: ["Played", "Played", "Played", "Played", "Postponed"],
    seasons: [
      { start: "2023-02-25", end: "2023-11-05" },
      { start: "2024-02-24", end: "2024-11-03" },
    ],
    metric1Range: [0, 3],
    metric2Range: [0, 2],
    grain: "game",
    entities: [
      { key: "messi", name: "Lionel Messi", role: "Forward", categoryKey: "mia", debutYear: 2023 },
      { key: "insigne", name: "Lorenzo Insigne", role: "Winger", categoryKey: "tor", debutYear: 2022 },
      { key: "cucho", name: "Cucho Hernandez", role: "Striker", categoryKey: "col", debutYear: 2022 },
      { key: "puig", name: "Riqui Puig", role: "Midfielder", categoryKey: "lag", debutYear: 2022 },
      { key: "shaqiri", name: "Xherdan Shaqiri", role: "Winger", categoryKey: "chi", debutYear: 2022 },
      { key: "nani", name: "Nani", role: "Winger", categoryKey: "orl", debutYear: 2021 },
    ],
    categories: [
      { key: "mia", name: "Inter Miami CF", type: "Eastern Conference", region: "Miami, FL", foundedYear: 2018 },
      { key: "tor", name: "Toronto FC", type: "Eastern Conference", region: "Toronto, ON", foundedYear: 2006 },
      { key: "col", name: "Columbus Crew", type: "Eastern Conference", region: "Columbus, OH", foundedYear: 1995 },
      { key: "lag", name: "LA Galaxy", type: "Western Conference", region: "Los Angeles, CA", foundedYear: 1996 },
      { key: "chi", name: "Chicago Fire FC", type: "Eastern Conference", region: "Chicago, IL", foundedYear: 1997 },
      { key: "orl", name: "Orlando City SC", type: "Eastern Conference", region: "Orlando, FL", foundedYear: 2011 },
    ],
    locations: [
      { key: "chase", name: "Chase Stadium", city: "Fort Lauderdale", state: "FL", type: "Stadium", capacity: 21550 },
      { key: "bmo", name: "BMO Field", city: "Toronto", state: "ON", type: "Stadium", capacity: 30000 },
      { key: "lower", name: "Lower.com Field", city: "Columbus", state: "OH", type: "Stadium", capacity: 20371 },
      { key: "dignity", name: "Dignity Health Sports Park", city: "Carson", state: "CA", type: "Stadium", capacity: 27000 },
    ],
  },
  {
    id: "music",
    label: "Music & Streaming",
    metric1Label: "streams_millions",
    metric2Label: "chart_position",
    activityType: "stream",
    statusValues: ["Active", "Active", "Active", "Active", "Inactive", "Active"],
    seasons: [
      { start: "2022-01-01", end: "2024-12-28" },
    ],
    metric1Range: [2, 95],
    metric2Range: [1, 100],
    grain: "week",
    entities: [
      { key: "swift", name: "Taylor Swift", role: "Pop", categoryKey: "pop", debutYear: 2006 },
      { key: "drake", name: "Drake", role: "Hip-Hop/Rap", categoryKey: "hiphop", debutYear: 2006 },
      { key: "bunny", name: "Bad Bunny", role: "Latin Trap/Reggaeton", categoryKey: "latin", debutYear: 2016 },
      { key: "weeknd", name: "The Weeknd", role: "R&B/Pop", categoryKey: "rnb", debutYear: 2010 },
      { key: "eilish", name: "Billie Eilish", role: "Alternative/Pop", categoryKey: "alt", debutYear: 2015 },
      { key: "wallen", name: "Morgan Wallen", role: "Country", categoryKey: "country", debutYear: 2014 },
      { key: "sza", name: "SZA", role: "R&B/Soul", categoryKey: "rnb", debutYear: 2012 },
    ],
    categories: [
      { key: "pop", name: "Pop", type: "Genre", region: "Global", foundedYear: 1950 },
      { key: "hiphop", name: "Hip-Hop/Rap", type: "Genre", region: "Global", foundedYear: 1970 },
      { key: "latin", name: "Latin", type: "Genre", region: "Global", foundedYear: 1950 },
      { key: "rnb", name: "R&B/Soul", type: "Genre", region: "Global", foundedYear: 1940 },
      { key: "alt", name: "Alternative/Indie", type: "Genre", region: "Global", foundedYear: 1980 },
      { key: "country", name: "Country", type: "Genre", region: "USA", foundedYear: 1920 },
    ],
    locations: [
      { key: "spotify", name: "Spotify", city: "Stockholm", state: "Global", type: "Platform", capacity: 600000000 },
      { key: "apple", name: "Apple Music", city: "Cupertino", state: "Global", type: "Platform", capacity: 100000000 },
      { key: "youtube", name: "YouTube Music", city: "San Bruno", state: "Global", type: "Platform", capacity: 80000000 },
      { key: "amazon", name: "Amazon Music", city: "Seattle", state: "Global", type: "Platform", capacity: 55000000 },
    ],
  },
  {
    id: "netflix",
    label: "TV & Streaming",
    metric1Label: "hours_watched_millions",
    metric2Label: "rating",
    activityType: "episode",
    statusValues: ["Active", "Active", "Active", "Active", "Cancelled", "Active"],
    seasons: [
      { start: "2022-01-01", end: "2024-12-28" },
    ],
    metric1Range: [1, 80],
    metric2Range: [6, 10],
    grain: "week",
    entities: [
      { key: "stranger", name: "Stranger Things", role: "Sci-Fi/Horror", categoryKey: "scifi", debutYear: 2016 },
      { key: "wednesday", name: "Wednesday", role: "Comedy/Horror", categoryKey: "drama", debutYear: 2022 },
      { key: "squid", name: "Squid Game", role: "Thriller/Drama", categoryKey: "thriller", debutYear: 2021 },
      { key: "bridgerton", name: "Bridgerton", role: "Romance/Drama", categoryKey: "romance", debutYear: 2020 },
      { key: "ozark", name: "Ozark", role: "Crime/Thriller", categoryKey: "crime", debutYear: 2017 },
      { key: "crown", name: "The Crown", role: "Historical Drama", categoryKey: "drama", debutYear: 2016 },
      { key: "beef", name: "Beef", role: "Dark Comedy/Drama", categoryKey: "drama", debutYear: 2023 },
    ],
    categories: [
      { key: "scifi", name: "Sci-Fi", type: "Genre", region: "Global", foundedYear: 1950 },
      { key: "drama", name: "Drama", type: "Genre", region: "Global", foundedYear: 1930 },
      { key: "thriller", name: "Thriller", type: "Genre", region: "Global", foundedYear: 1920 },
      { key: "romance", name: "Romance", type: "Genre", region: "Global", foundedYear: 1930 },
      { key: "crime", name: "Crime", type: "Genre", region: "Global", foundedYear: 1930 },
    ],
    locations: [
      { key: "netflix", name: "Netflix", city: "Los Gatos", state: "CA", type: "Platform", capacity: 260000000 },
      { key: "hulu", name: "Hulu", city: "Santa Monica", state: "CA", type: "Platform", capacity: 50000000 },
      { key: "hbo", name: "Max (HBO)", city: "New York", state: "NY", type: "Platform", capacity: 95000000 },
      { key: "prime", name: "Prime Video", city: "Seattle", state: "WA", type: "Platform", capacity: 200000000 },
    ],
  },
  {
    id: "shopping",
    label: "Online Shopping",
    metric1Label: "revenue_usd",
    metric2Label: "returns",
    activityType: "order",
    statusValues: ["Delivered", "Delivered", "Delivered", "Delivered", "Returned", "Cancelled"],
    seasons: [{ start: "2022-01-01", end: "2024-12-28" }],
    metric1Range: [50, 1200],
    metric2Range: [0, 40],
    grain: "week",
    entities: [
      { key: "iphone", name: "iPhone 15 Pro", role: "Smartphone", categoryKey: "electronics", debutYear: 2023 },
      { key: "airpods", name: "AirPods Pro 2", role: "Audio", categoryKey: "audio", debutYear: 2022 },
      { key: "nike", name: "Nike Air Max 270", role: "Footwear", categoryKey: "clothing", debutYear: 2018 },
      { key: "sony", name: "Sony WH-1000XM5", role: "Headphones", categoryKey: "audio", debutYear: 2022 },
      { key: "ipad", name: "iPad Air 5", role: "Tablet", categoryKey: "electronics", debutYear: 2022 },
      { key: "samsung", name: "Samsung 65\" 4K TV", role: "Television", categoryKey: "electronics", debutYear: 2023 },
      { key: "instantpot", name: "Instant Pot Duo", role: "Kitchen", categoryKey: "kitchen", debutYear: 2019 },
    ],
    categories: [
      { key: "electronics", name: "Electronics", type: "Category", region: "USA", foundedYear: 1950 },
      { key: "audio", name: "Audio", type: "Category", region: "USA", foundedYear: 1960 },
      { key: "clothing", name: "Clothing & Shoes", type: "Category", region: "USA", foundedYear: 1900 },
      { key: "kitchen", name: "Kitchen & Home", type: "Category", region: "USA", foundedYear: 1900 },
      { key: "fitness", name: "Fitness", type: "Category", region: "USA", foundedYear: 1970 },
    ],
    locations: [
      { key: "amazon", name: "Amazon", city: "Seattle", state: "WA", type: "Platform", capacity: 300000000 },
      { key: "ebay", name: "eBay", city: "San Jose", state: "CA", type: "Platform", capacity: 135000000 },
      { key: "walmart", name: "Walmart.com", city: "Bentonville", state: "AR", type: "Platform", capacity: 120000000 },
      { key: "target", name: "Target.com", city: "Minneapolis", state: "MN", type: "Platform", capacity: 50000000 },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    metric1Label: "units_sold",
    metric2Label: "margin_usd",
    activityType: "sale",
    statusValues: ["Sold", "Sold", "Sold", "Sold", "Returned", "Sold"],
    seasons: [{ start: "2022-01-01", end: "2024-12-28" }],
    metric1Range: [10, 500],
    metric2Range: [5, 800],
    grain: "week",
    entities: [
      { key: "milk", name: "Organic Whole Milk", role: "Dairy", categoryKey: "grocery", debutYear: 2010 },
      { key: "tv4k", name: "65\" 4K Smart TV", role: "Electronics", categoryKey: "electronics", debutYear: 2020 },
      { key: "shoes", name: "Men's Running Shoes", role: "Footwear", categoryKey: "clothing", debutYear: 2018 },
      { key: "keurig", name: "Keurig K-Elite", role: "Kitchen Appliance", categoryKey: "kitchen", debutYear: 2017 },
      { key: "desk", name: "Standing Desk Converter", role: "Office Furniture", categoryKey: "office", debutYear: 2019 },
      { key: "jacket", name: "Winter Down Jacket", role: "Outerwear", categoryKey: "clothing", debutYear: 2020 },
      { key: "yogamat", name: "Yoga Mat Premium", role: "Fitness", categoryKey: "fitness", debutYear: 2018 },
    ],
    categories: [
      { key: "grocery", name: "Grocery", type: "Department", region: "USA", foundedYear: 1900 },
      { key: "electronics", name: "Electronics", type: "Department", region: "USA", foundedYear: 1950 },
      { key: "clothing", name: "Clothing & Shoes", type: "Department", region: "USA", foundedYear: 1900 },
      { key: "kitchen", name: "Kitchen", type: "Department", region: "USA", foundedYear: 1900 },
      { key: "office", name: "Office Supplies", type: "Department", region: "USA", foundedYear: 1950 },
      { key: "fitness", name: "Fitness & Sports", type: "Department", region: "USA", foundedYear: 1970 },
    ],
    locations: [
      { key: "walmart", name: "Walmart Supercenter", city: "Bentonville", state: "AR", type: "Store", capacity: 150000 },
      { key: "target", name: "Target", city: "Minneapolis", state: "MN", type: "Store", capacity: 80000 },
      { key: "costco", name: "Costco Wholesale", city: "Issaquah", state: "WA", type: "Store", capacity: 120000 },
      { key: "kroger", name: "Kroger", city: "Cincinnati", state: "OH", type: "Store", capacity: 50000 },
    ],
  },
];

// ─── Date dimension ───────────────────────────────────────────────────────────
function generateDimDate(): string[][] {
  const rows: string[][] = [["date_key", "date", "day", "month_num", "month_name", "quarter", "year", "day_of_week", "is_weekend", "season"]];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const seasons = (m: number) => m >= 3 && m <= 5 ? "Spring" : m >= 6 && m <= 8 ? "Summer" : m >= 9 && m <= 11 ? "Fall" : "Winter";

  let d = new Date("2022-01-01");
  const end = new Date("2024-12-31");
  while (d <= end) {
    const m = d.getMonth();
    const dow = d.getDay();
    rows.push([
      String(dateKey(d)),
      formatDate(d),
      String(d.getDate()),
      String(m + 1),
      months[m],
      String(Math.floor(m / 3) + 1),
      String(d.getFullYear()),
      days[dow],
      dow === 0 || dow === 6 ? "1" : "0",
      seasons(m),
    ]);
    d = addDays(d, 1);
  }
  return rows;
}

// ─── Dimension tables ─────────────────────────────────────────────────────────
function generateDimEntity(): string[][] {
  const rows: string[][] = [["entity_key", "flavor_id", "name", "role", "category_key", "debut_year"]];
  for (const f of FLAVORS) {
    for (const e of f.entities) {
      rows.push([e.key, f.id, e.name, e.role, e.categoryKey, String(e.debutYear)]);
    }
  }
  return rows;
}

function generateDimCategory(): string[][] {
  const rows: string[][] = [["category_key", "flavor_id", "name", "type", "region", "founded_year"]];
  for (const f of FLAVORS) {
    for (const c of f.categories) {
      rows.push([c.key, f.id, c.name, c.type, c.region, String(c.foundedYear)]);
    }
  }
  return rows;
}

function generateDimLocation(): string[][] {
  const rows: string[][] = [["location_key", "flavor_id", "name", "city", "state", "type", "capacity"]];
  for (const f of FLAVORS) {
    for (const l of f.locations) {
      rows.push([l.key, f.id, l.name, l.city, l.state, l.type, String(l.capacity)]);
    }
  }
  return rows;
}

function generateDimFlavor(): string[][] {
  const rows: string[][] = [["flavor_id", "label", "metric1_label", "metric2_label", "activity_type"]];
  for (const f of FLAVORS) {
    rows.push([f.id, f.label, f.metric1Label, f.metric2Label, f.activityType]);
  }
  return rows;
}

// ─── Fact table ───────────────────────────────────────────────────────────────
interface FactRow {
  activity_id: string;
  flavor_id: string;
  date_key: string;
  date: string;
  entity_key: string;
  category_key: string;
  location_key: string;
  metric1: string;
  metric2: string;
  status: string;
  notes: string;
}

function generateFactRows(flavor: FlavorDef): FactRow[] {
  const rows: FactRow[] = [];
  let idCounter = FLAVORS.indexOf(flavor) * 1000 + 1;

  if (flavor.grain === "game") {
    // Generate game dates across seasons
    for (const season of flavor.seasons) {
      const start = new Date(season.start);
      const end = new Date(season.end);
      const total = daysBetween(start, end);
      const gamesPerSeason = flavor.id === "baseball" ? 120 : flavor.id === "nfl" ? 18 : 28;

      for (let g = 0; g < gamesPerSeason; g++) {
        const offset = Math.floor((g / gamesPerSeason) * total);
        const gameDate = addDays(start, offset);
        const entity = pick(flavor.entities);
        const cat = flavor.categories.find(c => c.key === entity.categoryKey) ?? flavor.categories[0];
        const loc = pick(flavor.locations);
        const status = pick(flavor.statusValues);
        const m1 = status === "Postponed" || status === "Cancelled" ? 0 : randInt(flavor.metric1Range[0], flavor.metric1Range[1]);
        const m2null = rand() < 0.08;
        const m2 = m2null ? "" : String(randInt(flavor.metric2Range[0], flavor.metric2Range[1]));

        rows.push({
          activity_id: String(idCounter++),
          flavor_id: flavor.id,
          date_key: String(dateKey(gameDate)),
          date: formatDate(gameDate),
          entity_key: entity.key,
          category_key: cat.key,
          location_key: loc.key,
          metric1: String(m1),
          metric2: m2,
          status,
          notes: "",
        });
      }
    }
  } else {
    // Weekly grain
    const start = new Date(flavor.seasons[0].start);
    const end = new Date(flavor.seasons[0].end);
    let current = new Date(start);

    while (current <= end) {
      for (const entity of flavor.entities) {
        const cat = flavor.categories.find(c => c.key === entity.categoryKey) ?? flavor.categories[0];
        const loc = pick(flavor.locations);
        const status = pick(flavor.statusValues);
        const m1 = status === "Inactive" || status === "Cancelled" ? 0 : randInt(flavor.metric1Range[0], flavor.metric1Range[1]);
        const m2null = rand() < 0.08;
        const m2 = m2null ? "" : String(randInt(flavor.metric2Range[0], flavor.metric2Range[1]));

        rows.push({
          activity_id: String(idCounter++),
          flavor_id: flavor.id,
          date_key: String(dateKey(current)),
          date: formatDate(current),
          entity_key: entity.key,
          category_key: cat.key,
          location_key: loc.key,
          metric1: String(m1),
          metric2: m2,
          status,
          notes: "",
        });
      }
      current = addDays(current, 7);
    }
  }

  return rows;
}

// ─── Messy practice CSV ───────────────────────────────────────────────────────
function generateMessyCsv(flavor: FlavorDef, cleanRows: FactRow[]): string[][] {
  // Flat denormalized file with intentional quality issues
  const entityMap = new Map(flavor.entities.map(e => [e.key, e]));
  const catMap = new Map(flavor.categories.map(c => [c.key, c]));

  const header = [
    "id", "date", "player_name", "team_name", flavor.metric1Label, flavor.metric2Label, "status", "notes"
  ];

  let rows: string[][] = cleanRows.slice(0, 80).map(r => {
    const entity = entityMap.get(r.entity_key);
    const cat = catMap.get(r.category_key);
    return [
      r.activity_id,
      r.date,
      entity?.name ?? r.entity_key,
      cat?.name ?? r.category_key,
      r.metric1,
      r.metric2,
      r.status,
      "",
    ];
  });

  // Issue 1: Wrong data type — add " units" text to metric1 in ~10 rows
  let typeErrorCount = 0;
  for (let i = 0; i < rows.length && typeErrorCount < 10; i++) {
    if (rand() < 0.15 && rows[i][4] !== "0" && rows[i][4] !== "") {
      rows[i][4] = rows[i][4] + (flavor.id === "baseball" ? " hits" : flavor.id === "music" ? "M streams" : " units");
      typeErrorCount++;
    }
  }

  // Issue 2: Exact duplicates — duplicate 4 rows
  const todup = shuffle(rows.slice(5, 30)).slice(0, 4);
  rows = [...rows, ...todup];

  // Issue 3: Blank key field — add 3 rows with empty player_name
  for (let i = 0; i < 3; i++) {
    const base = { ...rows[randInt(0, 10)] };
    rows.push(["", base[1], "", base[3], base[4], base[5], base[6], "missing data"]);
  }

  // Issue 4: Rows to filter — status already has "Postponed"/"Cancelled"/"TEST" from generation
  // Add a few explicit TEST rows
  const testEntity = flavor.entities[0];
  const testCat = catMap.get(testEntity.categoryKey);
  for (let i = 0; i < 3; i++) {
    rows.push([
      String(9000 + i),
      "2023-01-01",
      testEntity.name,
      testCat?.name ?? "",
      "0",
      "",
      "TEST",
      "do not include in production",
    ]);
  }

  return [header, ...rows];
}

// ─── Model CSVs (clean split for M3 practice) ─────────────────────────────────
function generateModelCsvs(flavor: FlavorDef, cleanRows: FactRow[]): Record<string, string[][]> {
  const entityMap = new Map(flavor.entities.map(e => [e.key, e]));
  const catMap = new Map(flavor.categories.map(c => [c.key, c]));

  // fact table
  const factHeader = ["activity_id", "entity_key", "category_key", "date", flavor.metric1Label, flavor.metric2Label, "status"];
  const factRows = cleanRows.slice(0, 100).map(r => [
    r.activity_id, r.entity_key, r.category_key, r.date, r.metric1, r.metric2 || "0", r.status
  ]);

  // dim_entities
  const entityHeader = ["entity_key", "name", "role", "category_key", "debut_year"];
  const entityRows = flavor.entities.map(e => [e.key, e.name, e.role, e.categoryKey, String(e.debutYear)]);

  // dim_categories
  const catHeader = ["category_key", "name", "type", "region", "founded_year"];
  const catRows = flavor.categories.map(c => [c.key, c.name, c.type, c.region, String(c.foundedYear)]);

  return {
    fact: [factHeader, ...factRows],
    dim_entities: [entityHeader, ...entityRows],
    dim_categories: [catHeader, ...catRows],
  };
}

// ─── TypeScript practice-data file ───────────────────────────────────────────
function generateTsFile(flavor: FlavorDef, cleanRows: FactRow[]): string {
  const entityMap = new Map(flavor.entities.map(e => [e.key, e]));
  const catMap = new Map(flavor.categories.map(c => [c.key, c]));

  const toRow = (r: FactRow) => ({
    date: r.date,
    entity_name: entityMap.get(r.entity_key)?.name ?? r.entity_key,
    category_name: catMap.get(r.category_key)?.name ?? r.category_key,
    metric1: r.metric1 === "" ? null : Number(r.metric1),
    metric2: r.metric2 === "" ? null : Number(r.metric2),
    status: r.status,
    notes: r.notes,
  });

  // Pick 10 diverse raw rows (mix of entities)
  const rawRows = [];
  const seen = new Set<string>();
  for (const r of cleanRows) {
    if (!seen.has(r.entity_key) && r.metric1 !== "0" && r.metric2 !== "") {
      rawRows.push(toRow(r));
      seen.add(r.entity_key);
    }
    if (rawRows.length >= 10) break;
  }

  // Group by category
  const grouped = new Map<string, { total1: number; total2: number; count: number; count2: number }>();
  for (const r of cleanRows) {
    if (r.metric1 === "0" || r.status === "TEST" || r.status === "Postponed" || r.status === "Cancelled") continue;
    const cat = catMap.get(r.category_key)?.name ?? r.category_key;
    const g = grouped.get(cat) ?? { total1: 0, total2: 0, count: 0, count2: 0 };
    g.total1 += Number(r.metric1) || 0;
    if (r.metric2 !== "") { g.total2 += Number(r.metric2) || 0; g.count2++; }
    g.count++;
    grouped.set(cat, g);
  }
  const groupedRows = Array.from(grouped.entries()).map(([cat, g]) => ({
    category_name: cat,
    total_metric1: g.total1,
    avg_metric2: g.count2 > 0 ? Math.round((g.total2 / g.count2) * 10) / 10 : null,
    row_count: g.count,
  })).slice(0, 5);

  // Insights — top entity, completion rate, trend
  const entityTotals = new Map<string, number>();
  for (const r of cleanRows) {
    if (r.metric1 === "0") continue;
    const name = entityMap.get(r.entity_key)?.name ?? r.entity_key;
    entityTotals.set(name, (entityTotals.get(name) ?? 0) + (Number(r.metric1) || 0));
  }
  const topEntity = Array.from(entityTotals.entries()).sort((a, b) => b[1] - a[1])[0];
  const nullPct = Math.round((cleanRows.filter(r => r.metric2 === "").length / cleanRows.length) * 100);
  const zeroPct = Math.round((cleanRows.filter(r => r.metric1 === "0").length / cleanRows.length) * 100);

  const insightRows = [
    {
      label: `Top ${flavor.metric1Label.replace(/_/g, " ")} — ${topEntity?.[0] ?? "N/A"}`,
      value: `${topEntity?.[1] ?? 0} total`,
      interpretation: `Highest cumulative ${flavor.metric1Label.replace(/_/g, " ")} across all activity in the dataset`,
    },
    {
      label: `Missing ${flavor.metric2Label.replace(/_/g, " ")} data`,
      value: `${nullPct}% of rows`,
      interpretation: `${nullPct}% of records have no ${flavor.metric2Label.replace(/_/g, " ")} value — these need to be handled in Power Query`,
    },
    {
      label: "Zero / inactive rows",
      value: `${zeroPct}% of rows`,
      interpretation: `${zeroPct}% of rows have ${flavor.metric1Label} = 0. These are likely postponed or cancelled events that should be filtered out`,
    },
  ];

  // Anomaly rows — rows with obvious problems
  const anomalyRows = cleanRows
    .filter(r => r.metric2 === "" || r.metric1 === "0" || r.status === "Postponed" || r.status === "Cancelled")
    .slice(0, 6)
    .map(toRow);

  // Drill rows — normal rows for a specific entity
  const topEntityKey = Array.from(entityTotals.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topKey = flavor.entities.find(e => entityMap.get(e.key)?.name === topEntityKey)?.key;
  const drillRows = cleanRows
    .filter(r => r.entity_key === topKey && r.metric1 !== "0" && r.metric2 !== "")
    .slice(0, 8)
    .map(toRow);

  const serialize = (v: unknown): string => JSON.stringify(v, null, 2);

  return `import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: ${serialize(flavor.id)},
  columns: ["date", "player_name", "team_name", ${serialize(flavor.metric1Label)}, ${serialize(flavor.metric2Label)}, "status"],
  rawRows: ${serialize(rawRows)},
  groupedRows: ${serialize(groupedRows)},
  insightRows: ${serialize(insightRows)},
  anomalyRows: ${serialize(anomalyRows)},
  drillRows: ${serialize(drillRows)},
  downloadFileName: ${serialize(flavor.id + "_messy.csv")},
  downloadLabel: ${serialize(flavor.label + " practice dataset")},
};

export default data;
`;
}

// ─── CSV helpers ──────────────────────────────────────────────────────────────
function toCsv(rows: string[][]): string {
  return rows.map(r => r.map(cell => {
    const s = String(cell ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(",")).join("\n");
}

function writeFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ ${filePath}`);
}

// ─── README for Power BI ──────────────────────────────────────────────────────
function generateReadme(): string {
  return `# Kaarani Sample Dataset — Power BI Setup Guide

## Files

| File | Description | Rows |
|------|-------------|------|
| fact_activity.csv | Main fact table — all flavors combined | ~2,500 |
| dim_date.csv | Date dimension (2022–2024) | 1,096 |
| dim_entity.csv | Players/artists/products per flavor | ~50 |
| dim_category.csv | Teams/genres/departments per flavor | ~40 |
| dim_location.csv | Stadiums/platforms/stores per flavor | ~28 |
| dim_flavor.csv | Flavor lookup | 7 |

## Star Schema Relationships

\`\`\`
fact_activity.date_key      → dim_date.date_key
fact_activity.entity_key    → dim_entity.entity_key
fact_activity.category_key  → dim_category.category_key
fact_activity.location_key  → dim_location.location_key
fact_activity.flavor_id     → dim_flavor.flavor_id
dim_entity.category_key     → dim_category.category_key
\`\`\`

## Loading in Power BI Desktop

1. Home → Get Data → Text/CSV
2. Load each of the 5 CSV files (select "Transform Data" each time)
3. In Power Query: verify column types, Close & Apply
4. Go to Model View
5. Create relationships using the keys above
6. To filter by flavor: add a slicer on \`dim_flavor[label]\` or \`fact_activity[flavor_id]\`

## Embedding Filter

To embed a flavor-filtered report:
\`\`\`
?filter=fact_activity/flavor_id eq 'baseball'
\`\`\`
`;
}

// ─── Index file for practice-data ─────────────────────────────────────────────
function generateIndexFile(flavorIds: string[]): string {
  const imports = flavorIds.map(id => `import ${id}Data from "./${id}";`).join("\n");
  const map = flavorIds.map(id => `  ${id}: ${id}Data,`).join("\n");
  return `import { PracticeData } from "./types";
${imports}

const PRACTICE_DATA: Record<string, PracticeData> = {
${map}
};

export function getPracticeData(flavorId: string): PracticeData {
  return PRACTICE_DATA[flavorId] ?? PRACTICE_DATA["baseball"];
}

export type { PracticeData, RawRow, GroupedRow, InsightRow } from "./types";
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main(): void {
  const root = path.resolve(__dirname, "..");
  const combinedDir = path.join(root, "public/data/combined");
  const practiceDir = path.join(root, "public/data/practice");
  const tsDir = path.join(root, "src/data/practice-data");

  console.log("\n📊 Generating Kaarani sample data...\n");

  // 1. Date dimension
  console.log("Generating dimensions...");
  writeFile(path.join(combinedDir, "dim_date.csv"), toCsv(generateDimDate()));
  writeFile(path.join(combinedDir, "dim_entity.csv"), toCsv(generateDimEntity()));
  writeFile(path.join(combinedDir, "dim_category.csv"), toCsv(generateDimCategory()));
  writeFile(path.join(combinedDir, "dim_location.csv"), toCsv(generateDimLocation()));
  writeFile(path.join(combinedDir, "dim_flavor.csv"), toCsv(generateDimFlavor()));

  // 2. Fact table (all flavors combined)
  console.log("\nGenerating fact table...");
  const allFactRows: FactRow[] = [];
  for (const flavor of FLAVORS) {
    const rows = generateFactRows(flavor);
    allFactRows.push(...rows);
    console.log(`  ${flavor.id}: ${rows.length} rows`);
  }
  const factHeader = ["activity_id", "flavor_id", "date_key", "date", "entity_key", "category_key", "location_key", "metric1", "metric2", "status", "notes"];
  const factCsv = [factHeader, ...allFactRows.map(r => [r.activity_id, r.flavor_id, r.date_key, r.date, r.entity_key, r.category_key, r.location_key, r.metric1, r.metric2, r.status, r.notes])];
  writeFile(path.join(combinedDir, "fact_activity.csv"), toCsv(factCsv));
  console.log(`  Total: ${allFactRows.length} rows`);

  // 3. README
  writeFile(path.join(combinedDir, "README.md"), generateReadme());

  // 4. Practice CSVs + TS files per flavor
  console.log("\nGenerating per-flavor practice files...");
  const factByFlavor = new Map<string, FactRow[]>();
  for (const r of allFactRows) {
    const arr = factByFlavor.get(r.flavor_id) ?? [];
    arr.push(r);
    factByFlavor.set(r.flavor_id, arr);
  }

  for (const flavor of FLAVORS) {
    const rows = factByFlavor.get(flavor.id) ?? [];
    console.log(`\n  ${flavor.label}:`);

    // Messy CSV
    const messy = generateMessyCsv(flavor, rows);
    writeFile(path.join(practiceDir, `${flavor.id}_messy.csv`), toCsv(messy));

    // Model CSVs
    const model = generateModelCsvs(flavor, rows);
    writeFile(path.join(practiceDir, `${flavor.id}_model`, "fact_activity.csv"), toCsv(model.fact));
    writeFile(path.join(practiceDir, `${flavor.id}_model`, "dim_entities.csv"), toCsv(model.dim_entities));
    writeFile(path.join(practiceDir, `${flavor.id}_model`, "dim_categories.csv"), toCsv(model.dim_categories));

    // TypeScript file
    const tsContent = generateTsFile(flavor, rows);
    writeFile(path.join(tsDir, `${flavor.id}.ts`), tsContent);
  }

  // 5. Index file
  writeFile(path.join(tsDir, "index.ts"), generateIndexFile(FLAVORS.map(f => f.id)));

  console.log("\n✅ Done! Summary:");
  console.log(`   ${combinedDir} — Power BI star schema CSVs`);
  console.log(`   ${practiceDir} — per-flavor practice downloads`);
  console.log(`   ${tsDir} — TypeScript data for portal screens`);
  console.log("\n📋 Next step: open Power BI Desktop and load public/data/combined/ files");
  console.log("   See public/data/combined/README.md for relationship setup guide\n");
}

main();

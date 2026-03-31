// Flavor-aware examples for Module 1: What is Data Analytics?
// Perspective: YOU, the learner, are the subject of the data — not a business owner.

export interface AnalyticsExample {
  descriptive: {
    headline: string;    // bold stat or finding
    detail: string;      // supporting context
    metric: string;      // e.g. "44 home runs"
    dimension: string;   // e.g. "your team"
    period: string;      // e.g. "2023 season"
  };
  diagnostic: {
    problem: string;     // something unexpected in the data
    finding: string;     // the root cause
    drillDown: string;   // what dimension revealed it
  };
  predictive: {
    question: string;    // what are we predicting?
    prediction: string;  // the forecast
    confidence: string;  // e.g. "74% likely"
  };
  prescriptive: {
    question: string;    // what should be done?
    recommendation: string;
    expectedImpact: string;
  };
}

export const FLAVOR_ANALYTICS_EXAMPLES: Record<string, AnalyticsExample> = {
  baseball: {
    descriptive: {
      headline: "Aaron Judge hit 62 home runs across 157 games in 2022 — a new AL record",
      detail: "the Yankees scored 807 runs that season; Judge drove in 131 of them (16%) despite playing in 96% of games",
      metric: "62 home runs",
      dimension: "NY Yankees",
      period: "2022 season",
    },
    diagnostic: {
      problem: "Shohei Ohtani's hits dropped 31% in August 2023 — what happened?",
      finding: "Filtering by opponent pitcher type shows he faced left-handed starters in 7 of 9 August games — his average drops from .304 to .198 vs lefties",
      drillDown: "Splitting game rows by 'pitcher_handedness' surfaced the pattern instantly",
    },
    predictive: {
      question: "Which players are likely to lead home runs in the 2024 season?",
      prediction: "Based on 3 seasons of launch-angle and exit-velocity data, Yordan Alvarez is predicted to hit 40+ home runs with 82% confidence",
      confidence: "Based on 2022–2024 stat trends and ballpark factors",
    },
    prescriptive: {
      question: "How should a manager set the batting order to maximize runs?",
      recommendation: "Put your highest OBP player at #1 and highest SLG at #4 — historical lineup data shows this combination scores 0.4 more runs per game on average",
      expectedImpact: "Estimated +65 runs per 162-game season vs a randomly set lineup",
    },
  },

  nfl: {
    descriptive: {
      headline: "Patrick Mahomes threw for 5,250 passing yards across 17 games in the 2022 season",
      detail: "he led the league in touchdowns (41) while only throwing 12 interceptions — a 3.4:1 TD-to-INT ratio",
      metric: "5,250 passing yards",
      dimension: "Kansas City Chiefs",
      period: "2022 season",
    },
    diagnostic: {
      problem: "Josh Allen's touchdown count fell 38% in the final 4 weeks of the season — why?",
      finding: "Filtering by 'game temperature' shows all 4 low-scoring games were in temperatures below 20°F — his completion rate drops 14% in cold weather",
      drillDown: "Joining game stats with weather data and filtering by temperature revealed the pattern",
    },
    predictive: {
      question: "Which QBs are most likely to reach the Super Bowl next season?",
      prediction: "Lamar Jackson has an 84% win rate in games where he rushes 8+ times — when his rushing is suppressed, the Ravens win only 52%",
      confidence: "Based on 3 seasons of game-level rushing and passing splits",
    },
    prescriptive: {
      question: "How can an offense maximize red-zone touchdowns?",
      recommendation: "Use play-action passes inside the 10-yard line — NFL data shows a 23% higher TD rate vs. non-play-action in that zone",
      expectedImpact: "Teams averaging 4+ red-zone PA passes per game score 6 more touchdowns per season",
    },
  },

  soccer: {
    descriptive: {
      headline: "Lionel Messi scored 11 goals and 14 assists in his first MLS season with Inter Miami",
      detail: "he averaged a goal or assist every 71 minutes — the best rate of any player in MLS that season",
      metric: "11 goals, 14 assists",
      dimension: "Inter Miami",
      period: "2023 MLS season",
    },
    diagnostic: {
      problem: "Inter Miami scored 42% fewer goals in away games — why the drop?",
      finding: "Drilling into away match data reveals they concede the ball more in the first 15 minutes away — leading to fewer attacking possessions overall",
      drillDown: "Splitting goal counts by 'home vs away' and 'match minute' exposed the early defensive vulnerability",
    },
    predictive: {
      question: "Which MLS teams are most likely to qualify for the playoffs?",
      prediction: "Teams with 6+ goals per month in the first half of the season go on to qualify 78% of the time — Columbus is currently on that pace",
      confidence: "Based on 5 years of MLS first-half pace vs. final standings",
    },
    prescriptive: {
      question: "How can a club improve scoring in away matches?",
      recommendation: "Defensive pressing in the first 15 minutes of away games reduces opponent counterattacks by 31% — adopt a high press to start",
      expectedImpact: "Expected +0.4 goals per away game — roughly 4 extra points in the standings per season",
    },
  },

  music: {
    descriptive: {
      headline: "Taylor Swift's 'Anti-Hero' logged 142 million streams in its first week — the most in 2022",
      detail: "she held 6 of the top 10 chart positions simultaneously — the first artist to do so in Spotify history",
      metric: "142M streams in week 1",
      dimension: "Midnights album",
      period: "October 2022",
    },
    diagnostic: {
      problem: "Drake's weekly streams dropped 44% across 3 consecutive weeks — what caused it?",
      finding: "Filtering by release calendar shows no new music dropped in those weeks AND two major competing artists released albums — stream share split 3 ways",
      drillDown: "Joining weekly stream data with the release schedule revealed the cannibalization effect",
    },
    predictive: {
      question: "Which genre will top the charts in the coming quarter?",
      prediction: "Latin pop has grown 28% quarter-over-quarter for 4 straight quarters — it is predicted to overtake hip-hop as the #1 genre by streams next quarter",
      confidence: "Based on 3 years of weekly chart data and genre tagging",
    },
    prescriptive: {
      question: "When should an artist drop a new single for maximum streams?",
      recommendation: "Release on Friday at midnight EST — Spotify data shows Friday drops average 34% more first-week streams than mid-week releases",
      expectedImpact: "An artist with 5M monthly listeners can expect ~800K extra streams per release by choosing Friday",
    },
  },

  netflix: {
    descriptive: {
      headline: "Stranger Things Season 4 logged 1.35 billion hours watched in its first 28 days",
      detail: "that made it the most-watched English-language series in Netflix history — surpassing Bridgerton Season 1",
      metric: "1.35B hours watched",
      dimension: "Netflix originals",
      period: "May–June 2022",
    },
    diagnostic: {
      problem: "Wednesday dropped from #1 to #8 in the weekly rankings in just 3 weeks — why the fall?",
      finding: "Filtering by week and comparing to completion rate data shows 68% of viewers stopped before episode 6 — the story lost momentum after the mid-season reveal",
      drillDown: "Comparing weekly hours against episode completion percentages revealed the drop-off point",
    },
    predictive: {
      question: "Which shows are most likely to be renewed based on their viewing data?",
      prediction: "Shows that reach the top 10 in 5+ countries in their first week have an 89% renewal rate — Beef qualifies on this metric",
      confidence: "Based on 4 years of Netflix top-10 and renewal announcement data",
    },
    prescriptive: {
      question: "How should Netflix schedule a new season to maximize viewership?",
      recommendation: "Drop all episodes at once for drama, but weekly for reality — data shows drama binge-completion rates are 2.1× higher; reality shows generate 3× the social conversation with weekly drops",
      expectedImpact: "Full-season drops for dramas reduce churn by 18% in the month of release",
    },
  },

  shopping: {
    descriptive: {
      headline: "iPhone 15 Pro generated $2.1M in revenue in its first week of availability",
      detail: "it had the lowest return rate (3.1%) of any electronics product that quarter — buyers were satisfied",
      metric: "$2.1M revenue in week 1",
      dimension: "Electronics category",
      period: "Q4 2023",
    },
    diagnostic: {
      problem: "Sony WH-1000XM5 headphones had a return rate of 14% in December — double the normal rate. Why?",
      finding: "Filtering returns by 'reason_code' shows 71% cited 'poor fit/comfort' — the product page was missing sizing guidance added in the updated listing",
      drillDown: "Joining return records with reason codes and return dates exposed the content gap",
    },
    predictive: {
      question: "Which products are most likely to sell out before the holiday weekend?",
      prediction: "AirPods Pro 2 are trending at 340% of their normal weekly velocity — stock is predicted to run out 4 days before Christmas at the current rate",
      confidence: "Based on rolling 4-week sales velocity and current inventory levels",
    },
    prescriptive: {
      question: "How can we reduce return rates for high-value electronics?",
      recommendation: "Add a 60-second 'Is this right for you?' quiz before checkout on products with >8% returns — similar implementations reduced returns by 22% on average",
      expectedImpact: "Reducing returns from 14% to 9% on Sony headphones saves ~$180K annually in reverse logistics",
    },
  },

  retail: {
    descriptive: {
      headline: "Standing desks sold 3,200 units in Q1 2024 — a 41% increase year-over-year",
      detail: "the Home Office department now accounts for 18% of total store revenue, up from 11% two years ago",
      metric: "3,200 units in Q1",
      dimension: "Home Office department",
      period: "Q1 2024",
    },
    diagnostic: {
      problem: "Yoga Mat sales dropped 28% in February — despite strong January numbers. What happened?",
      finding: "Filtering by store location shows the drop was isolated to 3 stores — all three had the Yoga Mats moved to a back aisle during a floor reset",
      drillDown: "Segmenting sales by store ID and joining with planogram change dates pinpointed the cause",
    },
    predictive: {
      question: "Which departments are likely to see the biggest sales lift next quarter?",
      prediction: "Outdoor & Garden products historically spike 55% in weeks 10–16 — based on 4 years of seasonal data, this spring will follow the same pattern",
      confidence: "Based on 4-year seasonal trend analysis by department",
    },
    prescriptive: {
      question: "How should we set promotional discounts to maximize margin?",
      recommendation: "Discount slow-moving items (>60 days in stock) by 15% rather than 30% — data shows 15% clears 80% of the same volume while protecting $12 more margin per unit",
      expectedImpact: "Estimated $45K additional margin per quarter vs. the current blanket 30% clearance strategy",
    },
  },
};

export function getAnalyticsExample(flavorId: string): AnalyticsExample {
  return FLAVOR_ANALYTICS_EXAMPLES[flavorId] ?? FLAVOR_ANALYTICS_EXAMPLES.baseball;
}

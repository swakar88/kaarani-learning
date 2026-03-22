// Flavor-aware examples for Module 1: What is Data Analytics?

export interface AnalyticsExample {
  descriptive: {
    headline: string;    // bold stat or finding
    detail: string;      // supporting context
    metric: string;      // e.g. "847 runs"
    dimension: string;   // e.g. "Rohit Sharma"
    period: string;      // e.g. "IPL 2023"
  };
  diagnostic: {
    problem: string;     // what went wrong / what to explore
    finding: string;     // the root cause
    drillDown: string;   // what dimension revealed it
  };
  predictive: {
    question: string;    // what are we predicting?
    prediction: string;  // the forecast
    confidence: string;  // e.g. "72% likely"
  };
  prescriptive: {
    question: string;    // what should we do?
    recommendation: string;
    expectedImpact: string;
  };
}

export const FLAVOR_ANALYTICS_EXAMPLES: Record<string, AnalyticsExample> = {
  cricket: {
    descriptive: {
      headline: "Rohit Sharma scored 847 runs in IPL 2023",
      detail: "averaging 42.35 per innings across 22 games",
      metric: "847 runs",
      dimension: "Rohit Sharma",
      period: "IPL 2023",
    },
    diagnostic: {
      problem: "Mumbai Indians lost 6 matches — why?",
      finding: "All 6 losses happened when the powerplay (overs 1–6) conceded 60+ runs",
      drillDown: "Filtering by 'phase = powerplay' revealed the pattern instantly",
    },
    predictive: {
      question: "Which batters are likely to score 500+ runs next season?",
      prediction: "Virat Kohli scores 22% more runs on flat pitches — flagged as high-scorer for flat venues",
      confidence: "74% confidence based on 5 seasons of data",
    },
    prescriptive: {
      question: "When should you bowl your spinner?",
      recommendation: "Deploy spinners in overs 15–19: teams score 18% fewer runs off spin in that phase",
      expectedImpact: "Reduces opposition total by ~12 runs on average",
    },
  },

  football: {
    descriptive: {
      headline: "Manchester City scored 94 Premier League goals in 2022–23",
      detail: "Haaland alone scored 36, more than 17 of the other 19 clubs",
      metric: "94 goals",
      dimension: "Manchester City",
      period: "PL 2022–23",
    },
    diagnostic: {
      problem: "Arsenal lost 5 of their last 8 away games — why?",
      finding: "All 5 losses included goals conceded in the 75–90 minute window",
      drillDown: "Segmenting by 'match minute' exposed the late-game defensive drop",
    },
    predictive: {
      question: "Which teams are likely to finish in the top 4?",
      prediction: "Liverpool predicted 68% chance of top 4 based on current form and fixture difficulty",
      confidence: "Based on last 10 match rolling average",
    },
    prescriptive: {
      question: "When to press high?",
      recommendation: "High press in first 20 minutes — teams using it score 40% more goals in that window",
      expectedImpact: "Increases early-goal probability from 22% to 36%",
    },
  },

  movies: {
    descriptive: {
      headline: "Pathaan earned ₹1,050 crore at the worldwide box office",
      detail: "making it the highest-grossing Bollywood film of 2023",
      metric: "₹1,050 crore",
      dimension: "Pathaan",
      period: "Jan–Mar 2023",
    },
    diagnostic: {
      problem: "3 big-budget films flopped despite A-list stars — why?",
      finding: "All 3 had weak opening weekends in South Indian markets",
      drillDown: "Splitting revenue by 'region' revealed the South India underperformance",
    },
    predictive: {
      question: "Which upcoming films are likely to cross ₹500 crore?",
      prediction: "Action films with known IP are predicted to earn 2.3× more than original scripts",
      confidence: "Based on genre + IP analysis of last 50 films",
    },
    prescriptive: {
      question: "When should a film release?",
      recommendation: "Thursday release before a long weekend — 28% higher first-week collections on average",
      expectedImpact: "For a ₹200 crore budget film, this could mean ₹40–50 crore additional opening",
    },
  },

  ecommerce: {
    descriptive: {
      headline: "₹4.2 crore in sales across 12,400 orders in Q3",
      detail: "Electronics drove 38% of revenue despite being only 12% of SKUs",
      metric: "₹4.2 crore",
      dimension: "Electronics category",
      period: "Q3 FY24",
    },
    diagnostic: {
      problem: "Cart abandonment jumped 24% in October — why?",
      finding: "All abandoned carts had at least one item out of stock at checkout",
      drillDown: "Joining order data with inventory data revealed the stock timing mismatch",
    },
    predictive: {
      question: "Which products will run out of stock before Diwali?",
      prediction: "15 SKUs in Electronics predicted to hit zero stock 9 days before the sale",
      confidence: "Based on last 3 festive seasons + current sales velocity",
    },
    prescriptive: {
      question: "Which customers should get discount codes?",
      recommendation: "Send 15% coupon to customers who haven't purchased in 60–90 days — highest reactivation rate",
      expectedImpact: "Expected 19% reactivation vs 6% for non-targeted sends",
    },
  },

  food: {
    descriptive: {
      headline: "Biryani House delivered 8,420 orders in March",
      detail: "Rating improved from 3.9 to 4.3 after switching to insulated packaging",
      metric: "8,420 orders",
      dimension: "Biryani House",
      period: "March 2024",
    },
    diagnostic: {
      problem: "Ratings dropped 0.6 stars on weekends — why?",
      finding: "Weekend delivery times were 22 minutes longer on average",
      drillDown: "Filtering by 'day of week' and 'delivery time' surfaced the pattern",
    },
    predictive: {
      question: "Which areas will see peak demand on Friday evenings?",
      prediction: "Koramangala and Indiranagar predicted to need 40% more delivery partners on Fridays 7–9 PM",
      confidence: "Based on 18 months of demand patterns",
    },
    prescriptive: {
      question: "How to reduce delivery time?",
      recommendation: "Pre-position 3 extra delivery partners in high-demand zones before 6 PM on Fridays",
      expectedImpact: "Reduces average delivery time by 11 minutes, expected rating increase of 0.3 stars",
    },
  },

  stocks: {
    descriptive: {
      headline: "Reliance Industries stock rose 18.4% in FY2023–24",
      detail: "average daily trading volume of 8.2 million shares",
      metric: "18.4% return",
      dimension: "Reliance Industries",
      period: "FY2023–24",
    },
    diagnostic: {
      problem: "IT sector fell 12% in Q2 — why?",
      finding: "Rising US interest rates triggered FII (foreign investor) outflows",
      drillDown: "Correlating 'FII flow data' with 'sector returns' revealed the link",
    },
    predictive: {
      question: "Which sectors are likely to outperform next quarter?",
      prediction: "FMCG and Pharma predicted to outperform when inflation is above 5% — both flagged as buys",
      confidence: "Based on 10-year historical correlation",
    },
    prescriptive: {
      question: "When to rebalance the portfolio?",
      recommendation: "Trim IT holdings by 8% when Nifty IT P/E exceeds 28 — historically a peak signal",
      expectedImpact: "Reduced drawdown by 14% on average in back-tests",
    },
  },

  healthcare: {
    descriptive: {
      headline: "City General had 14,200 OPD visits in Q1 2024",
      detail: "Cardiology saw 28% growth — highest across all departments",
      metric: "14,200 visits",
      dimension: "City General Hospital",
      period: "Q1 2024",
    },
    diagnostic: {
      problem: "ER wait times increased 35% in January — why?",
      finding: "Staff shortages on night shifts coincided with a respiratory illness spike",
      drillDown: "Cross-referencing 'shift rosters' with 'admission volumes' revealed the gap",
    },
    predictive: {
      question: "When will the next flu season peak?",
      prediction: "High flu case volumes predicted for weeks 6–10, ~22% above last year",
      confidence: "Based on climate and last 5-year admission cycles",
    },
    prescriptive: {
      question: "How to reduce readmission rates?",
      recommendation: "Discharge patients with a 48-hour follow-up SMS — reduces 30-day readmission by 19%",
      expectedImpact: "Saves ~₹80 lakh annually in readmission costs for a 500-bed hospital",
    },
  },

  music: {
    descriptive: {
      headline: "Arijit Singh's songs streamed 4.8 billion times in 2023",
      detail: "his top 10 songs account for 62% of his total streams",
      metric: "4.8 billion streams",
      dimension: "Arijit Singh",
      period: "2023",
    },
    diagnostic: {
      problem: "A new artist's album had 80% drop-off after track 3 — why?",
      finding: "Track 4 was 40% longer than typical skip-threshold length",
      drillDown: "Comparing 'track duration' vs 'skip rate' surfaced the pattern",
    },
    predictive: {
      question: "Which new songs are likely to trend in the next 30 days?",
      prediction: "Tracks with 50K+ streams in first 6 hours have 78% chance of entering top charts",
      confidence: "Based on 2 years of Spotify India chart data",
    },
    prescriptive: {
      question: "When should an artist release a new single?",
      recommendation: "Release on Friday at 6 PM IST — streams in first 24 hours are 31% higher than midweek drops",
      expectedImpact: "Friday releases drive 2.1× more playlist additions in week 1",
    },
  },

  travel: {
    descriptive: {
      headline: "IndiGo operated 2,100 flights per day in peak season 2024",
      detail: "Delhi–Mumbai was the busiest route with 240 daily seats sold on average",
      metric: "2,100 flights/day",
      dimension: "IndiGo",
      period: "Peak season 2024",
    },
    diagnostic: {
      problem: "Hotel bookings in Goa dropped 32% vs last year — why?",
      finding: "Monsoon arrived 2 weeks early; most hotel cancellations were within a 3-day window of arrival",
      drillDown: "Joining 'booking dates' with 'weather data' showed the cancellation trigger",
    },
    predictive: {
      question: "Which routes will have demand surge in the next quarter?",
      prediction: "Bengaluru–Hyderabad demand predicted to rise 28% during conference season in September",
      confidence: "Based on 4 years of booking lead-time data",
    },
    prescriptive: {
      question: "How to increase ancillary revenue per passenger?",
      recommendation: "Offer seat upgrade at ₹499 to passengers who check in online 8–12 hours before departure — highest uptake window",
      expectedImpact: "22% conversion vs 8% for at-airport offers",
    },
  },

  gaming: {
    descriptive: {
      headline: "BGMI had 70 million registered players in India in 2023",
      detail: "average session length of 42 minutes, 4.2 sessions per week",
      metric: "70 million players",
      dimension: "BGMI",
      period: "2023",
    },
    diagnostic: {
      problem: "Player churn increased 18% after patch v2.5 — why?",
      finding: "Weapon balance changes made 3 top-used guns weaker — veteran players quit",
      drillDown: "Segmenting churn by 'player level' and 'main weapon' revealed the segment",
    },
    predictive: {
      question: "Which players are at risk of churning this month?",
      prediction: "Players with <2 sessions in the last 14 days have 71% churn probability",
      confidence: "Retention model trained on 6 months of session logs",
    },
    prescriptive: {
      question: "How to re-engage lapsing players?",
      recommendation: "Send exclusive in-game skin offer to at-risk players — 34% reactivation vs 9% generic push",
      expectedImpact: "Recovers ~3.2% of monthly active users who would have churned",
    },
  },
};

export function getAnalyticsExample(flavorId: string): AnalyticsExample {
  return FLAVOR_ANALYTICS_EXAMPLES[flavorId] ?? FLAVOR_ANALYTICS_EXAMPLES.cricket;
}

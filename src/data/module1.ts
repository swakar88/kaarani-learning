// Flavor-aware examples for Module 1: What is Data Analytics?
// Perspective: YOU, the learner, are the subject of the data — not a business owner.

export interface AnalyticsExample {
  descriptive: {
    headline: string;    // bold stat or finding
    detail: string;      // supporting context
    metric: string;      // e.g. "847 runs"
    dimension: string;   // e.g. "your team"
    period: string;      // e.g. "this season"
  };
  diagnostic: {
    problem: string;     // something unexpected in YOUR data
    finding: string;     // the root cause
    drillDown: string;   // what dimension revealed it
  };
  predictive: {
    question: string;    // what are we predicting — for YOU?
    prediction: string;  // the forecast
    confidence: string;  // e.g. "74% likely"
  };
  prescriptive: {
    question: string;    // what should YOU do?
    recommendation: string;
    expectedImpact: string;
  };
}

export const FLAVOR_ANALYTICS_EXAMPLES: Record<string, AnalyticsExample> = {
  cricket: {
    descriptive: {
      headline: "Your fantasy team scored 847 points across 22 IPL match days",
      detail: "you picked Rohit Sharma in 18 of those matches — he was your most selected player",
      metric: "847 fantasy points",
      dimension: "your fantasy team",
      period: "IPL 2023",
    },
    diagnostic: {
      problem: "Your team lost the most points in 6 consecutive match days — why?",
      finding: "All 6 bad weeks, you picked Rohit Sharma as captain in chasing innings — his average drops by 40% when chasing",
      drillDown: "Filtering your selections by 'match situation = chase' revealed the pattern instantly",
    },
    predictive: {
      question: "Which players should you pick for the next match day?",
      prediction: "Virat Kohli is predicted to score 22% more runs on flat pitches — perfect for your team on Sunday's venue",
      confidence: "Based on 5 seasons of player-venue data",
    },
    prescriptive: {
      question: "How can you improve your fantasy points this week?",
      recommendation: "Pick spinners in overs 15–19: opposition teams score 18% fewer runs off spin in that phase — great for differential picks",
      expectedImpact: "Expected +12 points per match day compared to your current selection pattern",
    },
  },

  football: {
    descriptive: {
      headline: "Your Fantasy Premier League team scored 1,840 points this season",
      detail: "Haaland was your most-transferred-in player — and scored 36 goals, outscoring 17 full clubs",
      metric: "1,840 FPL points",
      dimension: "your FPL team",
      period: "PL 2022–23",
    },
    diagnostic: {
      problem: "Your FPL rank dropped in 5 consecutive gameweeks — what went wrong?",
      finding: "In all 5 bad weeks, you captained Arsenal defenders in away fixtures — they conceded in 75–90 minutes every time",
      drillDown: "Segmenting your captain picks by 'home vs away' and 'match minute of concession' exposed the pattern",
    },
    predictive: {
      question: "Which players are worth buying before the next gameweek?",
      prediction: "Liverpool have a 68% chance of top 4 — their defenders are predicted to keep 3 clean sheets in the next 5 games",
      confidence: "Based on fixture difficulty and last 10-match rolling average",
    },
    prescriptive: {
      question: "Who should you captain this weekend?",
      recommendation: "Triple-captain Haaland in home fixtures — he scores 40% of City's goals and blanks only 2 in 8 home games",
      expectedImpact: "Increases expected points from 6.2 to 9.8 per gameweek when captaining at home",
    },
  },

  movies: {
    descriptive: {
      headline: "You watched 94 films on OTT this year — Action is your top genre at 38%",
      detail: "you rated 12 films 5 stars — all were action films with a known franchise or sequel",
      metric: "94 films watched",
      dimension: "your watch history",
      period: "this year",
    },
    diagnostic: {
      problem: "You stopped 3 films halfway — what made you quit?",
      finding: "All 3 had weak second acts with slow pacing — your watch data shows you drop off if nothing happens in minutes 30–50",
      drillDown: "Splitting your watch-time data by 'genre' and 'drop-off minute' revealed the pacing problem",
    },
    predictive: {
      question: "Which upcoming films are you most likely to enjoy?",
      prediction: "Action films with known IP are predicted to earn your 5-star rating 2.3× more than original scripts",
      confidence: "Based on genre and IP analysis of your last 50 watched films",
    },
    prescriptive: {
      question: "When should you watch that new blockbuster?",
      recommendation: "Watch on its opening weekend — the buzz and discussions enhance your enjoyment; your ratings for first-week watches are 0.8 stars higher on average",
      expectedImpact: "Better experience and 31% less chance of getting spoiled before watching",
    },
  },

  ecommerce: {
    descriptive: {
      headline: "You placed 47 orders worth ₹28,400 on Amazon this year",
      detail: "Electronics is your top category — 3 orders drove 52% of your total spend",
      metric: "₹28,400 spent",
      dimension: "your order history",
      period: "this year",
    },
    diagnostic: {
      problem: "You abandoned 8 carts in October — what stopped you from buying?",
      finding: "All 8 abandoned carts had at least one item that went out-of-stock while you were still browsing",
      drillDown: "Joining your cart data with product availability timestamps revealed the timing mismatch",
    },
    predictive: {
      question: "Which products are you likely to reorder in the next 30 days?",
      prediction: "Based on your purchase rhythm, your skincare products are predicted to run out in 12 days — you usually reorder 8 days before running out",
      confidence: "Based on your last 3 purchase cycles for this product",
    },
    prescriptive: {
      question: "How can you save money on your regular orders?",
      recommendation: "Switch your top 3 repeat purchases to Subscribe & Save — your spending pattern shows you'd save ₹1,200/year",
      expectedImpact: "19% savings vs one-off purchases, plus guaranteed stock availability",
    },
  },

  food: {
    descriptive: {
      headline: "You ordered food delivery 89 times this year — Biryani is your #1 dish",
      detail: "you rated 73% of orders 4 stars or higher, but gave 3-star or below to 14 orders",
      metric: "89 orders placed",
      dimension: "your Swiggy account",
      period: "this year",
    },
    diagnostic: {
      problem: "You gave 3-star ratings on 14 orders — what did those orders have in common?",
      finding: "All 14 low-rated orders were placed on weekend evenings after 7 PM — delivery took 49+ minutes on average",
      drillDown: "Filtering your orders by 'day of week' and 'delivery time' surfaced the pattern immediately",
    },
    predictive: {
      question: "What will you most likely order this Friday evening?",
      prediction: "Based on your pattern, 78% chance you'll order Biryani from Behrouz — you've done it 11 Fridays in a row",
      confidence: "Based on 18 months of your order history",
    },
    prescriptive: {
      question: "How can you get better food and ratings you deserve?",
      recommendation: "Order before 6 PM on weekends — your data shows delivery is 22 minutes faster and your own satisfaction ratings jump by 0.6 stars",
      expectedImpact: "You'd save ~40 minutes in total delivery time per month and enjoy your food hot",
    },
  },

  stocks: {
    descriptive: {
      headline: "Your portfolio grew 18.4% this year — Reliance was your best performer",
      detail: "your IT stocks make up 42% of your portfolio, with average daily trading volume of 8.2M shares",
      metric: "18.4% return",
      dimension: "your portfolio",
      period: "FY2023–24",
    },
    diagnostic: {
      problem: "Your IT stocks fell 12% in Q2 — why when the rest of the market was up?",
      finding: "US interest rate hikes triggered foreign investor outflows — your IT holdings absorbed the full impact",
      drillDown: "Correlating your portfolio returns with 'US Fed rate decisions' and 'FII flow data' revealed the link",
    },
    predictive: {
      question: "Which sectors in your watchlist are likely to outperform next quarter?",
      prediction: "FMCG and Pharma stocks in your watchlist are predicted to outperform when inflation stays above 5% — both looking strong",
      confidence: "Based on 10-year historical sector correlation with inflation data",
    },
    prescriptive: {
      question: "Should you rebalance your portfolio right now?",
      recommendation: "Trim IT holdings by 8% when Nifty IT P/E exceeds 28 — your portfolio back-test shows this reduced drawdown by 14%",
      expectedImpact: "Reduces your portfolio volatility by 14% on average while keeping long-term returns intact",
    },
  },

  healthcare: {
    descriptive: {
      headline: "You visited the clinic 14 times this year — Cardiology was your most visited department",
      detail: "your average appointment wait time was 22 minutes in Q1, rising to 41 minutes in January",
      metric: "14 clinic visits",
      dimension: "your health record",
      period: "this year",
    },
    diagnostic: {
      problem: "Your ER wait time jumped to 41 minutes in January — up from 22 in October. Why?",
      finding: "January had both a respiratory illness spike AND 3 night-shift staff on leave simultaneously — your arrival time (10 PM) hit the worst window",
      drillDown: "Cross-referencing your visit time with 'shift rosters' and 'admission volumes' on that date revealed the double whammy",
    },
    predictive: {
      question: "When is the best time to book your next appointment?",
      prediction: "High flu case volumes predicted for weeks 6–10 — your Cardiology department gets 22% busier; book week 5 to beat the rush",
      confidence: "Based on 5-year seasonal admission patterns at your hospital",
    },
    prescriptive: {
      question: "How can you get faster care and shorter waits?",
      recommendation: "Book morning slots on Tuesdays or Wednesdays — your own visit data shows average wait of 18 minutes vs 41 minutes on weekend evenings",
      expectedImpact: "Save 23 minutes per visit on average — and get seen by a less-rushed doctor",
    },
  },

  music: {
    descriptive: {
      headline: "You streamed 2,847 songs this year — Arijit Singh is your #1 artist",
      detail: "your top 10 artists account for 68% of your total listening time",
      metric: "2,847 songs played",
      dimension: "your Spotify account",
      period: "this year",
    },
    diagnostic: {
      problem: "You stopped listening to a new album after Track 3 — why did you drop off?",
      finding: "Tracks 4 and 5 were both over 5 minutes — your skip data shows you abandon 76% of tracks that exceed 5 minutes",
      drillDown: "Comparing 'track duration' against your personal 'skip rate' surfaced the pattern instantly",
    },
    predictive: {
      question: "Which new releases this Friday are you most likely to love?",
      prediction: "Based on your history, tracks combining Arijit Singh's vocals with soft piano have a 78% chance of making it onto your repeat plays",
      confidence: "Based on 2 years of your personal listening patterns",
    },
    prescriptive: {
      question: "How can your Focus playlist work better for you?",
      recommendation: "Your data shows you skip songs over 3:30 during work sessions — refresh your Focus playlist with shorter tracks",
      expectedImpact: "Estimated playlist completion rate improves from your current 34% to 71%",
    },
  },

  travel: {
    descriptive: {
      headline: "You took 8 flights this year — Delhi–Mumbai was your most flown route",
      detail: "your average fare was ₹5,100 but 3 last-minute bookings cost you ₹7,200 each",
      metric: "8 flights taken",
      dimension: "your booking history",
      period: "this year",
    },
    diagnostic: {
      problem: "Your Goa trip in June was disrupted and cost you ₹12,000 in cancellation fees — why?",
      finding: "The monsoon arrived 2 weeks early; your booking was within 3 days of arrival — the highest-risk cancellation window",
      drillDown: "Joining your 'booking lead time' with 'historical weather data' for June showed the cancellation risk was 67%",
    },
    predictive: {
      question: "Will Bengaluru–Hyderabad fares rise before your planned September trip?",
      prediction: "Demand predicted to surge 28% during conference season in September — fares will spike; book in the next 10 days",
      confidence: "Based on 4 years of booking lead-time and event calendar data",
    },
    prescriptive: {
      question: "How can you stop overpaying for flights?",
      recommendation: "Book 14+ days ahead — your own history shows you paid 31% less on pre-planned trips vs last-minute ones",
      expectedImpact: "You'd have saved ₹6,300 this year alone if you'd booked 14+ days out every time",
    },
  },

  gaming: {
    descriptive: {
      headline: "You played 4.2 BGMI sessions per week this month — your top kill game was 8 frags",
      detail: "your win rate is 12%, highest with M416 as your primary weapon",
      metric: "4.2 sessions/week",
      dimension: "your BGMI account",
      period: "this month",
    },
    diagnostic: {
      problem: "Your win rate dropped from 12% to 7% after patch v2.5 — what happened?",
      finding: "The M416 — your main weapon — was nerfed by 22% damage in that patch. Your kill rate dropped exactly in line.",
      drillDown: "Segmenting your match results by 'primary weapon used' before and after the patch date made the damage clear",
    },
    predictive: {
      question: "Are you at risk of losing your winning streak this month?",
      prediction: "Based on your session frequency dropping below 2 in the last 14 days, your churn probability is currently 71%",
      confidence: "Based on a retention model trained on 6 months of session logs",
    },
    prescriptive: {
      question: "How can you get your win rate back up?",
      recommendation: "Switch to Shotgun as your secondary — it wasn't nerfed, and your stats show a 24% higher close-range win rate when you use it",
      expectedImpact: "Expected win rate recovery from 7% back to 10–11% within 2 weeks",
    },
  },
};

export function getAnalyticsExample(flavorId: string): AnalyticsExample {
  return FLAVOR_ANALYTICS_EXAMPLES[flavorId] ?? FLAVOR_ANALYTICS_EXAMPLES.cricket;
}

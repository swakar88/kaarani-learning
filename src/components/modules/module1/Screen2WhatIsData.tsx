"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Raw data alone tells you nothing. But the moment you start asking questions — What happened? Why? What should we do? — data becomes your most powerful tool.";

const KAARANI_HINT =
  "Think of it like this: data is the ingredients, information is the recipe, insight is the chef's intuition, and the decision is the dish you serve.";

// ── YOUR raw data (personal activity log — one row per event) ──
const RAW_DATA_TABLES: Record<string, { headers: string[]; rows: (string | number)[][] }> = {
  music: {
    headers: ["Date", "Song", "Artist", "Duration", "Skipped?"],
    rows: [
      ["12 Mar", "Tum Hi Ho", "Arijit Singh", "4:22", "No"],
      ["12 Mar", "Kesariya", "Arijit Singh", "4:28", "No"],
      ["13 Mar", "Raataan Lambiyan", "Jubin Nautiyal", "3:18", "No"],
      ["13 Mar", "As It Was", "Harry Styles", "5:08", "Yes ⚠️"],
      ["14 Mar", "Apna Bana Le", "Arijit Singh", "3:24", "No"],
    ],
  },
  cricket: {
    headers: ["Match Day", "Your Pick", "Role", "Points Earned", "Captain?"],
    rows: [
      ["GW 1", "Rohit Sharma", "Batsman", 54, "Yes"],
      ["GW 2", "Rohit Sharma", "Batsman", 12, "Yes"],
      ["GW 3", "Virat Kohli", "Batsman", 78, "Yes"],
      ["GW 4", "Rohit Sharma", "Batsman", 6, "Yes ⚠️"],
      ["GW 5", "KL Rahul", "Batsman", 44, "No"],
    ],
  },
  football: {
    headers: ["Gameweek", "Your Captain", "Fixture", "Pts Scored", "Home/Away"],
    rows: [
      ["GW 10", "Haaland", "City vs Chelsea", 18, "Home ✓"],
      ["GW 11", "Salah", "Liverpool vs Arsenal", 12, "Home ✓"],
      ["GW 12", "Saka", "City vs Arsenal", 2, "Away ⚠️"],
      ["GW 13", "White", "Wolves vs Arsenal", 1, "Away ⚠️"],
      ["GW 14", "Haaland", "City vs Spurs", 20, "Home ✓"],
    ],
  },
  movies: {
    headers: ["Date", "Film", "Genre", "Your Rating", "% You Watched"],
    rows: [
      ["5 Jan", "Pathaan", "Action", "⭐⭐⭐⭐⭐", "100%"],
      ["12 Jan", "Jawan", "Action", "⭐⭐⭐⭐", "100%"],
      ["19 Jan", "Tu Jhoothi…", "Romance", "⭐⭐⭐", "62% ⚠️"],
      ["26 Jan", "Bholaa", "Action", "⭐⭐", "38% ⚠️"],
      ["2 Feb", "Drishyam 2", "Thriller", "⭐⭐⭐⭐⭐", "100%"],
    ],
  },
  ecommerce: {
    headers: ["Order ID", "Date", "Item", "Amount (₹)", "Category"],
    rows: [
      ["#1041", "3 Oct", "Noise Earbuds", 1299, "Electronics"],
      ["#1042", "8 Oct", "Shirt", 499, "Apparel"],
      ["#1043", "15 Oct", "Python Book", 399, "Books"],
      ["#1044", "21 Oct", "USB Hub", 849, "Electronics"],
      ["#1045", "28 Oct", "Desk Lamp", 699, "Home"],
    ],
  },
  food: {
    headers: ["Date", "Restaurant", "Placed", "Delivered", "Your Rating"],
    rows: [
      ["Mon 6 Mar", "Biryani Blues", "12:30", "12:58", "⭐⭐⭐⭐⭐"],
      ["Wed 8 Mar", "Pizza Hut", "19:15", "19:47", "⭐⭐⭐⭐"],
      ["Sat 11 Mar", "Behrouz Biryani", "20:04", "20:53", "⭐⭐ ⚠️"],
      ["Sun 12 Mar", "McDonald's", "19:30", "20:21", "⭐⭐ ⚠️"],
      ["Tue 14 Mar", "Biryani Blues", "13:00", "13:24", "⭐⭐⭐⭐⭐"],
    ],
  },
  stocks: {
    headers: ["Stock", "You Bought", "Buy Price", "Today", "Your Return"],
    rows: [
      ["RELIANCE", "Jan 2023", "₹2,480", "₹2,910", "+17.3% ✓"],
      ["TCS", "Jan 2023", "₹3,340", "₹3,230", "−3.3% ⚠️"],
      ["INFY", "Jan 2023", "₹1,540", "₹1,380", "−10.4% ⚠️"],
      ["HDFC", "Mar 2023", "₹1,580", "₹1,920", "+21.5% ✓"],
      ["WIPRO", "Jan 2023", "₹410", "₹360", "−12.2% ⚠️"],
    ],
  },
  healthcare: {
    headers: ["Your Visit", "Dept", "Arrived", "Seen At", "Your Wait"],
    rows: [
      ["3 Oct", "General", "09:15", "09:33", "18 min ✓"],
      ["18 Nov", "Cardiology", "10:00", "10:22", "22 min ✓"],
      ["7 Dec", "General", "16:30", "17:04", "34 min"],
      ["14 Jan", "Cardiology", "22:10", "22:51", "41 min ⚠️"],
      ["22 Jan", "General", "21:45", "22:34", "49 min ⚠️"],
    ],
  },
  travel: {
    headers: ["Flight", "Route", "Booked", "Days Ahead", "Fare Paid (₹)"],
    rows: [
      ["6E-204", "BLR→DEL", "1 Jan", 21, "3,800 ✓"],
      ["AI-302", "BOM→DEL", "10 Feb", 18, "4,200 ✓"],
      ["6E-410", "DEL→BOM", "2 Mar", 3, "7,100 ⚠️"],
      ["SG-101", "HYD→BOM", "5 Apr", 1, "8,400 ⚠️"],
      ["6E-204", "BLR→DEL", "20 May", 16, "3,900 ✓"],
    ],
  },
  gaming: {
    headers: ["Date", "Match", "Kills", "Won?", "Weapon Used"],
    rows: [
      ["1 Oct", "Match 41", 5, "Yes ✓", "M416"],
      ["1 Oct", "Match 42", 3, "No", "M416"],
      ["2 Oct", "Match 43", 7, "Yes ✓", "M416"],
      ["2 Oct", "Match 44", 1, "No ⚠️", "AKM"],
      ["3 Oct", "Match 45", 2, "No ⚠️", "AKM"],
    ],
  },
};

// ── YOUR information table (same data grouped — patterns emerge) ──
const INFO_TABLES: Record<string, { headers: string[]; rows: (string | number)[][] }> = {
  music: {
    headers: ["Your Top Artist", "Times You Played", "Avg Length", "% You Completed"],
    rows: [
      ["Arijit Singh", 340, "3:48", "91% ✓"],
      ["Jubin Nautiyal", 112, "3:55", "88% ✓"],
      ["Harry Styles", 43, "5:12", "31% ⚠️"],
    ],
  },
  cricket: {
    headers: ["Player You Picked", "Times Captained", "Avg Points", "Best Week"],
    rows: [
      ["Rohit Sharma", 18, 38, 54],
      ["Virat Kohli", 9, 62, 78],
      ["KL Rahul", 5, 41, 52],
    ],
  },
  football: {
    headers: ["Your Captain Pick", "Times Chosen", "Avg Pts", "Home Avg / Away Avg"],
    rows: [
      ["Haaland", 12, 15.2, "18.4 / 6.1"],
      ["Salah", 7, 11.8, "14.2 / 8.4"],
      ["Saka", 5, 6.4, "9.2 / 2.1 ⚠️"],
    ],
  },
  movies: {
    headers: ["Genre You Watch", "Films", "Avg Your Rating", "% You Finish"],
    rows: [
      ["Action", 36, "4.4 ⭐", "97% ✓"],
      ["Thriller", 18, "4.1 ⭐", "89% ✓"],
      ["Romance", 14, "3.2 ⭐", "54% ⚠️"],
    ],
  },
  ecommerce: {
    headers: ["Your Category", "Your Orders", "Your Spend (₹)", "Avg Order (₹)"],
    rows: [
      ["Electronics", 8, "14,800", "1,850"],
      ["Apparel", 12, "6,200", "517"],
      ["Books", 9, "3,100", "344"],
    ],
  },
  food: {
    headers: ["When You Order", "Avg Wait (min)", "Your Avg Rating"],
    rows: [
      ["Weekday lunch", 26, "4.4 ✓"],
      ["Weekday dinner", 32, "4.1 ✓"],
      ["Weekend evening", 51, "2.8 ⚠️"],
    ],
  },
  stocks: {
    headers: ["Your Sector", "Your Holdings", "Your Return", "% of Portfolio"],
    rows: [
      ["Energy", "RELIANCE", "+17.3% ✓", "28%"],
      ["Banking", "HDFC", "+21.5% ✓", "24%"],
      ["IT", "TCS, INFY, WIPRO", "−8.6% ⚠️", "42%"],
    ],
  },
  healthcare: {
    headers: ["Time You Visited", "Your Avg Wait", "Staff on Shift"],
    rows: [
      ["Morning (9–12)", "20 min ✓", "10–12"],
      ["Afternoon (12–5)", "28 min", "8–10"],
      ["Evening / Night ⚠️", "45 min ⚠️", "5–7"],
    ],
  },
  travel: {
    headers: ["Days Ahead You Booked", "Trips", "Avg Fare (₹)"],
    rows: [
      ["15+ days ✓", 5, "3,960"],
      ["7–14 days", 2, "5,800"],
      ["Under 7 days ⚠️", 3, "7,967 ⚠️"],
    ],
  },
  gaming: {
    headers: ["Weapon You Used", "Matches", "Avg Kills", "Your Win Rate"],
    rows: [
      ["M416", 38, 4.8, "18% ✓"],
      ["AKM", 14, 2.1, "7% ⚠️"],
      ["Shotgun", 6, 5.2, "22% ✓"],
    ],
  },
};

// ── YOUR insight table (the "why" pattern in your own data) ──
const INSIGHT_TABLES: Record<string, { headers: string[]; rows: (string | number)[][] }> = {
  music: {
    headers: ["Track Length", "Your Completion Rate", "What This Means"],
    rows: [
      ["Under 3:30 ✓", "94%", "You always finish these"],
      ["3:30 – 5:00", "61%", "Hit or miss"],
      ["Over 5:00 ⚠️", "31%", "You skip most of these"],
    ],
  },
  cricket: {
    headers: ["Match Situation", "Your Avg Points (Rohit)", "Result"],
    rows: [
      ["Batting First ✓", 62, "Consistent scorer"],
      ["Chasing ⚠️", 18, "Big points drain"],
    ],
  },
  football: {
    headers: ["Captain Fixture Type", "Your Avg Points", "Verdict"],
    rows: [
      ["Home fixture ✓", 16.8, "Captain here always"],
      ["Away fixture ⚠️", 4.2, "Never captain away"],
    ],
  },
  movies: {
    headers: ["Film Type", "Your Avg Rating", "% You Finish"],
    rows: [
      ["Sequel / Known IP ✓", "4.6 ⭐", "98%"],
      ["Original script ⚠️", "3.1 ⭐", "49%"],
    ],
  },
  ecommerce: {
    headers: ["Cart Status at Checkout", "What Happened", "Times"],
    rows: [
      ["All items in stock ✓", "Purchased", "39"],
      ["1+ item out of stock ⚠️", "Abandoned", "8"],
    ],
  },
  food: {
    headers: ["Your Delivery Time", "Your Rating", "Pattern"],
    rows: [
      ["Under 40 min ✓", "4.3 avg", "Happy customer"],
      ["Over 40 min ⚠️", "2.7 avg", "Low rating every time"],
    ],
  },
  stocks: {
    headers: ["When US Rates Rose ≥0.5%", "Your IT Return", "Your Energy Return"],
    rows: [
      ["Q2 2023 (2 hikes) ⚠️", "−12.1%", "+6.4%"],
      ["Q3 2023 (no hike) ✓", "+4.8%", "+9.1%"],
    ],
  },
  healthcare: {
    headers: ["Your Visit Time", "Your Wait", "vs Your Best"],
    rows: [
      ["Morning weekday ✓", "20 min", "best"],
      ["Weekend evening ⚠️", "45 min", "+125% longer"],
    ],
  },
  travel: {
    headers: ["Your Booking Lead Time", "Avg Fare You Paid", "vs Best Price"],
    rows: [
      ["15+ days ahead ✓", "₹3,960", "best price"],
      ["Under 7 days ⚠️", "₹7,967", "+101% more!"],
    ],
  },
  gaming: {
    headers: ["Pre / Post Patch v2.5", "Your Win Rate", "Your Avg Kills"],
    rows: [
      ["Before patch ✓", "18%", "4.8 (M416)"],
      ["After patch ⚠️", "7%", "2.1 (M416 nerfed)"],
    ],
  },
};

const FLAVOR_LADDER: Record<
  string,
  { information: string; insight: string; decision: string }
> = {
  cricket: {
    information: "You picked Rohit Sharma 18 times — he averaged 42.3 in your fantasy team",
    insight: "Your team lost points every week you picked Rohit as captain in chasing innings",
    decision: "Only captain Rohit in batting-first matches — your data proves he's 60% more effective",
  },
  football: {
    information: "Your FPL team averaged 68 points per gameweek — Haaland scored in 14 of 20 weeks",
    insight: "Your rank crashes every time you captain a defender in an away fixture",
    decision: "Switch to Haaland as captain for all home fixtures — guaranteed upside",
  },
  movies: {
    information: "You watched 94 films — Action is your #1 genre with 38% of your watch time",
    insight: "You finish 94% of action sequels but only 41% of original scripts",
    decision: "Prioritise sequels and franchise films on your watchlist — you'll actually finish them",
  },
  ecommerce: {
    information: "You spent ₹28,400 this year — Electronics drove 52% of your total in just 3 orders",
    insight: "All 8 of your abandoned carts had at least one out-of-stock item at checkout",
    decision: "Enable wishlist alerts — buy Electronics when they're back in stock, not when they sell out on you",
  },
  food: {
    information: "You ordered 89 times — Biryani is your #1 dish, ordered 23 times this year",
    insight: "Every time you rated less than 3 stars, the order arrived after 7 PM on a weekend",
    decision: "Order before 6 PM on weekends — you'll get food 22 minutes faster and actually enjoy it",
  },
  stocks: {
    information: "Your portfolio grew 18.4% — Reliance was your best performer at +22%",
    insight: "Every time US interest rates rose 0.5%+, your IT stocks dropped 12%+ within 2 weeks",
    decision: "Trim IT holdings by 8% whenever the Fed signals a rate hike — your own data backs this",
  },
  healthcare: {
    information: "Your average wait time is 22 minutes on weekdays — but 41 minutes in January",
    insight: "Every long wait you experienced was on a weekend evening with fewer than 6 night-shift staff",
    decision: "Book morning slots on Tuesdays or Wednesdays — you'll wait 23 minutes less on average",
  },
  music: {
    information: "You played 2,847 songs — Arijit Singh topped your chart with 340 plays",
    insight: "You skip 76% of tracks over 5 minutes — but complete 94% of tracks under 3:30",
    decision: "Build your Focus playlist from tracks under 3:30 — your completion rate jumps from 34% to 71%",
  },
  travel: {
    information: "You took 8 flights — Delhi–Mumbai was your most flown route at 3 times",
    insight: "Your 3 last-minute bookings cost you ₹2,100 more each than your pre-planned trips",
    decision: "Book 14+ days ahead — you'd have saved ₹6,300 this year based on your own booking history",
  },
  gaming: {
    information: "You average 4.2 sessions/week — your best kill game was 8 frags with M416",
    insight: "Your win rate dropped from 12% to 7% the week the M416 was nerfed in patch v2.5",
    decision: "Switch to Shotgun as your secondary — it wasn't nerfed and your close-range stats are strong",
  },
};

const DEFAULT_LADDER = FLAVOR_LADDER.cricket;

export default function Screen2WhatIsData({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const ladder = FLAVOR_LADDER[selectedFlavor] ?? DEFAULT_LADDER;
  const rawTable = RAW_DATA_TABLES[selectedFlavor] ?? RAW_DATA_TABLES.cricket;
  const infoTable = INFO_TABLES[selectedFlavor] ?? INFO_TABLES.cricket;
  const insightTable = INSIGHT_TABLES[selectedFlavor] ?? INSIGHT_TABLES.cricket;

  // 6 blocks: header(0) + 4 steps(1-4) + callout(5)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(6);

  const narrationScript = [
    `Here is the most important idea in this entire course. Every app you use is recording your behaviour. But recorded data alone is useless. Let me show you the four steps that turn it into something powerful.`,
    `This is your raw ${flavor.label} data. Rows and columns — dates, numbers, IDs. You could stare at this for an hour and still not know what to do. This is called raw data — the starting point of every analytics journey.`,
    `Now I group it, count it, sort it. Same data — totally different picture: ${ladder.information}. This is called information. The data now answers a question: what happened?`,
    `Information is great. But the question that changes everything is why. ${ladder.insight}. You just went from knowing the result to understanding the reason. That is an insight.`,
    `Insight without action is just trivia. So what do you actually do? ${ladder.decision}. A pile of rows just became a personal decision you can act on today.`,
    `Data. Information. Insight. Decision. That four-step journey is data analytics. And Power B.I. is the tool that lets you walk that journey visually — no coding, no formulas, no guesswork.`,
  ];

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Show me the 4 types →", onClick: onNext }
          : { label: "Show me the 4 types →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
            Module 1 · Screen 2
          </span>
          <h1 className="text-3xl font-black mt-1" style={{ color: "#111827" }}>
            From Raw Numbers to Real Decisions
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            We'll take real {flavor.label} data and walk through exactly how it becomes something you can act on.
          </p>
        </div>

        {/* Shared card style helper — all 4 steps look the same */}
        {/* Block 1 — Raw Data (table) */}
        <div className={`${blockClass(1)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>1</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Raw Data</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Just numbers — no meaning yet. Can you make a decision from this alone?</p>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {rawTable.headers.map(h => (
                      <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rawTable.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px dashed #E5E7EB" }}>
                    <td colSpan={rawTable.headers.length} className="px-3 py-2 text-center text-xs" style={{ color: "#9CA3AF" }}>
                      … hundreds more rows just like these
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Block 2 — Information */}
        <div className={`${blockClass(2)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>2</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Information</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>We group, count, and sort — watch the same data answer "What happened?"</p>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {infoTable.headers.map(h => (
                      <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {infoTable.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t" style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
              <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>📊 {ladder.information}</p>
            </div>
          </div>
        </div>

        {/* Block 3 — Insight */}
        <div className={`${blockClass(3)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>3</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Insight</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Now we ask "why" — compare groups to find the pattern</p>
              </div>
            </div>
            <div className="overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {insightTable.headers.map(h => (
                      <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {insightTable.rows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t" style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}>
              <p className="text-sm font-semibold" style={{ color: "#1E40AF" }}>💡 {ladder.insight}</p>
            </div>
          </div>
        </div>

        {/* Block 4 — Decision */}
        <div className={`${blockClass(4)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>4</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Decision</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Insight without action is just trivia — here's what you actually do</p>
              </div>
            </div>
            <div className="px-5 py-4" style={{ backgroundColor: "#FFFFFF" }}>
              <p className="text-base font-semibold" style={{ color: "#1E40AF" }}>
                ✅ {ladder.decision}
              </p>
            </div>
          </div>
        </div>

        {/* Block 5 — Definition callout */}
        <div className={`${blockClass(5)} mb-6`}>
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}>
            <p className="font-bold text-base mb-2" style={{ color: "#1E40AF" }}>So what is Data Analytics?</p>
            <p className="text-sm leading-relaxed" style={{ color: "#1E40AF" }}>
              Data analytics is exactly this four-step journey — taking raw numbers and
              turning them into decisions. Power B.I. is the tool that lets you do this
              visually, with drag-and-drop. No coding, no formulas in Excel, no guessing.
            </p>
          </div>
        </div>

        {/* Tap to reveal */}
        {!isComplete && (
          <button
            type="button"
            onClick={() => {
              unlockVoice();
              if (narrationScript[step + 1]) speak(narrationScript[step + 1]);
              next();
            }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}

      </div>
    </ModuleLayout>
  );
}

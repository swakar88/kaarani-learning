import { PracticeData } from "./types";
import baseballData from "./baseball";
import nflData from "./nfl";
import soccerData from "./soccer";
import musicData from "./music";
import netflixData from "./netflix";
import shoppingData from "./shopping";
import retailData from "./retail";

const PRACTICE_DATA: Record<string, PracticeData> = {
  baseball: baseballData,
  nfl: nflData,
  soccer: soccerData,
  music: musicData,
  netflix: netflixData,
  shopping: shoppingData,
  retail: retailData,
};

export function getPracticeData(flavorId: string): PracticeData {
  return PRACTICE_DATA[flavorId] ?? PRACTICE_DATA["baseball"];
}

export type { PracticeData, RawRow, GroupedRow, InsightRow } from "./types";

import type { City } from "@/lib/cities";

export interface UserCity extends City {
  order: number;
  addedAt: Date;
}

export interface TimeFormat {
  use24Hour: boolean;
}

export interface AppSettings {
  timeFormat: TimeFormat;
  localTimezone: string;
}

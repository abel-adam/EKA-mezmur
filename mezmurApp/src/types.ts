/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = "am" | "en";

export interface Song {
  id: string;
  number: number;
  title: {
    am: string;
    en: string;
  };
  lyrics: {
    am: string;
    en: string;
  };
  category: {
    am: string;
    en: string;
  };
  author?: {
    am: string;
    en: string;
  };
  album?: {
    am: string;
    en: string;
  };
  audioUrl?: string;
  melodyIndex: number;
}

export interface AppSettings {
  theme: "light" | "dark";
  language: Language;
}

import { atomone } from "./atomone";
import { aura } from "./aura";
import { bbedit } from "./bbedit";
import { dracula } from "./dracula";
import { duotoneDark, duotoneLight } from "./duotone";
import { githubDark, githubLight } from "./github";
import { tokyoNight } from "./tokyo-night";
import { tokyoNightStorm } from "./tokyo-night-storm";
import { EditorTheme } from "@/lib/types/editor-theme";
import { vsCode } from "./vs-code";
import { xCodeDark, xCodeLight } from "./xcode";
import { solarizedLight } from "./solarizedLight";
import { coolGlow } from "./coolGlow";
import { cobalt } from "./cobalt";
import { tomorrow } from "./tomorrow";
import { barf } from "./barf";
import { birdsOfParadise } from "./birdsOfParadise";
import { ayuLight } from "./ayuLight";
import { andromeda } from "./andromeda";

export const themes: Record<string, EditorTheme> = {
  aura,
  atomone,
  tokyoNight,
  tokyoNightStorm,
  dracula,
  bbedit,
  duotoneLight,
  duotoneDark,
  githubLight,
  githubDark,
  vsCode,
  xCodeLight,
  xCodeDark,
  barf,
  birdsOfParadise,
  tomorrow,
  cobalt,
  solarizedLight,
  coolGlow,
  ayuLight,
  andromeda,
};

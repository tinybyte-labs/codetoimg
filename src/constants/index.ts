export const SITE_NAME = "CodeToImg";
export const GITHUB_REPO = "https://github.com/tinybyte-labs/codetoimg";
export const BUY_ME_A_COFFEE_URL = "https://www.buymeacoffee.com/rohid";
export const TWITTER_URL = "https://twitter.com/codetoimg";
export const TINYBYTE_LABS_URL = "https://tinybytelabs.com";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://codetoimg.com"
    : "http://localhost:3000";

export const gradients: string[] = [
  "linear-gradient(180deg, #2af598 0%, #009efd 100%)",
  "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
  "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
  "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
  "linear-gradient(to top, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%)",
  "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%)",
  "linear-gradient(to right, #da22ff, #9733ee)",
  "linear-gradient(to right, #00467f, #a5cc82)",
  "linear-gradient(to right, #9796f0, #fbc7d4)",
  "linear-gradient(to right, #bbd2c5, #536976, #292e49",
];

export const colors: string[] = [
  "#FFFFFF",
  "#CCCCCC",
  "#B3B3B3",
  "#999999",
  "#808080",
  "#666666",
  "#4D4D4D",
  "#333333",
  "#000000",
  "#F44E3B",
  "#D33115",
  "#9F0500",
  "#FE9200",
  "#E27300",
  "#C45100",
  "#FCDC00",
  "#FCC400",
  "#FB9E00",
  "#DBDF00",
  "#B0BC00",
  "#808900",
  "#68CCCA",
  "#16A5A5",
  "#0C797D",
  "#73D8FF",
  "#009CE0",
  "#0062B1",
  "#AEA1FF",
  "#7B64FF",
  "#653294",
  "#FDA1FF",
  "#FA28FF",
  "#AB149E",
];

export const images = [
  `${BASE_URL}/images/backgrounds/background-01.png`,
  `${BASE_URL}/images/backgrounds/background-02.png`,
  `${BASE_URL}/images/backgrounds/background-03.png`,
  `${BASE_URL}/images/backgrounds/background-04.png`,
  `${BASE_URL}/images/backgrounds/background-05.png`,
  `${BASE_URL}/images/backgrounds/background-06.png`,
  `${BASE_URL}/images/backgrounds/background-07.png`,
  `${BASE_URL}/images/backgrounds/background-08.png`,
  `${BASE_URL}/images/backgrounds/background-09.png`,
  `${BASE_URL}/images/backgrounds/background-10.png`,
  `${BASE_URL}/images/backgrounds/background-11.png`,
  `${BASE_URL}/images/backgrounds/background-12.png`,
];

export type Shadow = {
  id: string;
  name: string;
  boxShadow: string;
};

export const shadows: Shadow[] = [
  {
    id: "none",
    name: "None",
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
  },
  {
    id: "soft",
    name: "Soft",
    boxShadow: "hsla(217,33%,15%,.8) 0px 20px 30px -10px",
  },
  {
    id: "normal",
    name: "Normal",
    boxShadow: "hsla(217,33%,15%,0.9) 0px 24px 34px -11px",
  },
  {
    id: "hard",
    name: "Hard",
    boxShadow: "hsla(217,33%,15%,1) 0px 26px 36px -12px",
  },
];

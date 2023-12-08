import { Background } from "../atoms/settings";

export const backgroundStyle = (background: Background) =>
  background.type === "color"
    ? {
        backgroundColor: background.color,
      }
    : background.type === "gradient"
      ? {
          backgroundImage: background.gradient,
        }
      : background.type === "image"
        ? {
            backgroundImage: `url(${background.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : {};

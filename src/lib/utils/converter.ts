import { toBlob, toJpeg, toPng, toSvg } from "html-to-image";
import { Options } from "html-to-image/lib/types";

export type ExportSettings = {
  scale: number;
  format: "png" | "jpeg" | "svg";
  title?: string;
};

const filter = (node: HTMLElement) => {
  const exclusionClasses = ["remove-me", "secret-div"];
  return !exclusionClasses.some(
    (classname) => node.classList?.contains(classname),
  );
};

export const downloadHtmlElement = async (
  node: HTMLElement,
  settings: ExportSettings = { format: "png", scale: 1 },
) => {
  let imgUrl: string | undefined;

  const options: Options = {
    pixelRatio: settings.scale,
    cacheBust: true,
    quality: 1,
    filter,
  };

  switch (settings.format) {
    case "png":
      imgUrl = await toPng(node, options);
      break;
    case "jpeg":
      imgUrl = await toJpeg(node, {
        ...options,
        quality: 1,
        backgroundColor: "white",
      });
      break;
    case "svg":
      imgUrl = await toSvg(node, options);
      break;
    default:
      break;
  }

  const date = new Date(Date.now());
  let title =
    settings.title && settings.title.length
      ? settings.title
      : `untitled-${Math.floor(date.getTime() / 1000)}`;

  if (imgUrl) {
    const filename = `${title}.${settings.format}`;
    const link = document.createElement("a");
    link.hidden = true;
    link.download = filename;
    link.href = imgUrl;
    link.click();
    link.remove();
  }
};

export const copyNodeAsImage = async (node: HTMLElement, scale = 2) => {
  const options: Options = {
    pixelRatio: scale,
    cacheBust: true,
    quality: 1,
    filter,
  };
  const blob = await toBlob(node, options);

  if (blob) {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  }
};

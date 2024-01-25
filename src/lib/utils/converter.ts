import {
  domToPng,
  domToJpeg,
  domToSvg,
  Options,
  domToBlob,
} from "modern-screenshot";

export type ExportSettings = {
  format: "png" | "jpeg" | "svg";
  scale?: number;
  filename?: string;
  quality?: number;
};

const filter = (node: any) => {
  const exclusionClasses = ["remove-me", "secret-div"];
  return !exclusionClasses.some(
    (classname) => node?.classList?.contains(classname),
  );
};

export const downloadHtmlElement = async (
  node: HTMLElement,
  settings: ExportSettings = { format: "png", scale: 1 },
) => {
  let imgUrl: string | undefined;

  const options: Options = {
    scale: settings.scale,
    filter,
  };

  switch (settings.format) {
    case "png":
      imgUrl = await domToPng(node, options);
      break;
    case "jpeg":
      imgUrl = await domToJpeg(node, {
        ...options,
        quality: settings.quality,
        backgroundColor: "white",
      });
      break;
    case "svg":
      imgUrl = await domToSvg(node, options);
      break;
    default:
      break;
  }

  const date = new Date(Date.now());
  let title =
    settings.filename && settings.filename.length
      ? settings.filename
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

export const copyNodeAsImage = async (node: HTMLElement, scale = 1) => {
  const options: Options = {
    scale,
    filter,
  };
  const blob = await domToBlob(node, options);

  if (blob) {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  }
};

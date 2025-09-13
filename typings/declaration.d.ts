declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.jpg" {
  export default "" as string;
}

declare module "*.jpeg" {
  export default "" as string;
}

declare module "*.png" {
  export default "" as string;
}

declare module "*.svg" {
  export default "" as string;
}

declare module "*.wav" {
  export default "" as string;
}

declare module "*.ogg" {
  export default "" as string;
}

declare module "*.otf" {
  export default "" as string;
}

declare module "url:*" {
  export default string;
}

type ProjectCardDetail = {
  name: string;
  img: string;
  blurb: string;
  hash: string;
};

interface AppPage {
  attach(el: Element | string): Element | null,
  render(): void,
}
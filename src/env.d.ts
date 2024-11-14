type StringObject = { [key: string]: string };

type ProjectCardDetail = {
  name: string;
  blurb: string;
  hash: string;
};

interface AppPage {
  attach(el: Element | string): Element | null,
  render(): void,
}

type AppPageRenderFunction = () => AppPage;
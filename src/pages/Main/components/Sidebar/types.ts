export type MenuType = {
  id: string;
  title: string;
  icon: () => JSX.Element;
  link?: string;
};

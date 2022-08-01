import { PAGES } from "../../../../constant/pages";
import {
  CoincilIcon,
  DaoIcon,
  HomeIcon,
  NftIcon,
  PaperIcon,
  TokenIcon,
} from "./SvgIcons";
import { MenuType } from "./types";

const Menus: MenuType[] = [
  {
    id: PAGES.DASHBOARD,
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    id: PAGES.TOKENCHECKER,
    title: "$PunkDrop Checker",
    icon: TokenIcon,
  },
  {
    id: PAGES.PUNKNFT,
    title: "Punk NFT",
    icon: NftIcon,
  },
  {
    id: PAGES.DAO,
    title: "DAO",
    icon: DaoIcon,
    link: "https://v1.daodao.zone/dao/juno1xl6cnw8j8gpfyk9lchulxjym83kvlznv8farsnnlwrf2sh5m5sgs9stqn6",
  },
  {
    id: PAGES.PUNKCOINCIL,
    title: "Punks Coincil",
    icon: CoincilIcon,
  },
  {
    id: PAGES.PUNKPAPER,
    title: "Punks Paper",
    icon: PaperIcon,
    link: "https://docs.google.com/document/d/1dNmjcDIkfpTRTriz-V9xtXY1AVmjwmmst67asc79rpk",
  },
];

export default Menus;

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
    id: "dashboard",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    id: "punkToken",
    title: "$Punk Token",
    icon: TokenIcon,
  },
  {
    id: "punkNft",
    title: "Punk NFT",
    icon: NftIcon,
  },
  {
    id: "dao",
    title: "DAO",
    icon: DaoIcon,
    link: "https://v1.daodao.zone/dao/juno1xl6cnw8j8gpfyk9lchulxjym83kvlznv8farsnnlwrf2sh5m5sgs9stqn6",
  },
  {
    id: "punksCoincil",
    title: "Punks Coincil",
    icon: CoincilIcon,
  },
  {
    id: "punksPaper",
    title: "Punks Paper",
    icon: PaperIcon,
    link: "https://docs.google.com/document/d/1dNmjcDIkfpTRTriz-V9xtXY1AVmjwmmst67asc79rpk",
  },
];

export default Menus;

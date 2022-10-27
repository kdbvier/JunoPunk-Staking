const chainPresets = {
  "juno-mainnet": {
    chainName: "Juno Mainnet",
    chainId: "juno-1",
    rpcEndpoint: "https://rpc-juno.itastakers.com/",
    restEndpoint: "https://lcd-juno.itastakers.com/",
    faucetEndpoint: "",
    addressPrefix: "juno",
    microDenom: "ujuno",
    coinDecimals: "6",
    gasPrice: "0.025",
  },
  "juno-uni": {
    chainName: "Juno Testnet - Uni",
    chainId: "uni-2",
    rpcEndpoint: "https://rpc.uni.juno.deuslabs.fi",
    restEndpoint: "https://lcd.uni.juno.deuslabs.fi",
    addressPrefix: "juno",
    microDenom: "ujunox",
    coinDecimals: "6",
    gasPrice: "0.025",
  },
  "juno-local-test": {
    chainName: "Juno Local Test",
    chainId: "testing",
    rpcEndpoint: "http://localhost:26657",
    restEndpoint: "http://localhost:1317",
    faucetEndpoint: "http://localhost:8000",
    addressPrefix: "juno",
    microDenom: "ujunox",
    coinDecimals: "6",
    gasPrice: "0.025",
  },
};

export default chainPresets["juno-mainnet"];

export type ContractType = {
  [P in "genisis" | "martians"]: string;
};

export const Contracts: {
  [P in
    | "nftContracts"
    | "stakingContracts"
    | "marketplaceContracts"]: ContractType;
} = {
  nftContracts: {
    genisis: "juno1e229el8t4lu4rx7xeekc77zspxa2gz732ld0e6a5q0sr0l3gm78stuvc5g",
    martians: "juno10u3st6w8tx95ejtq6drffk6zy68z76m32lapq9m5shj7gu0y5mxswj6we0",
  },
  stakingContracts: {
    genisis: "juno1m7uwvetjxr2efmlenvk2pzgsyzpnetlta95lx4rmmest6y0x8nvqh5he5k",
    martians: "juno1s0tewcu485syneth968n7hz3vx23t24k904j26ae3lw75vzv7d3qtg8sp3",
  },
  marketplaceContracts: {
    genisis: "juno1smf3u3qd4dc20cgsu7hsh95awxea0usw0q0jj2f3vmrykpk3ua4qn738hz",
    martians: "",
  },
};

export const MarketplaceContract =
  "juno14umelpxlujja7lysyhufqdp2rlzyuvlek3lgz0v54wp0gyvwnp4s7f3sgs";

export const AirdropContract =
  "juno1g9luc4282gx9mdexpfzx94xd9tr223wa8jemm77gmjtmrywq2mgsvpm0mz";

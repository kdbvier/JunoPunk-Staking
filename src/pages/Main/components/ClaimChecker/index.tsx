import React, { useState } from "react";
import { toast } from "react-toastify";

import { Contracts } from "../../../../constant/config";
import { PAGES } from "../../../../constant/pages";
import useContract from "../../../../hooks/useContract";
import { TokenIcon } from "../Sidebar/SvgIcons";
import {
  ClaimCheckerContainer,
  ClaimCheckerContent,
  ClaimCheckerHeader,
  ClaimCheckerItem,
  ClaimCheckerTitle,
  NftItem,
  NftItemContent,
  NftItemContents,
  NftItemImage,
  StyledSvg,
  TokenIdInputer,
  TokenIdInputerContainer,
  Wrapper,
} from "./styled";

const ClaimCheckOption = [
  {
    title: "Find your Genesis Punks",
    tokenId: "JunoPunks",
    nftAddress: Contracts.nftContracts.genisis,
    stakingAddress: Contracts.stakingContracts.genisis,
    imageBaseUrl:
      "https://hopegalaxy.mypinata.cloud/ipfs/Qmbsmj4q3cAZdqkFvFBq4zBrHtzXf4FzDTMQQm9MHcB2yb",
    maxCount: 500,
  },
  {
    title: "Find your Martians Punks",
    tokenId: "JunoPunks2",
    nftAddress: Contracts.nftContracts.martians,
    stakingAddress: Contracts.stakingContracts.martians,
    imageBaseUrl:
      "https://hopegalaxy.mypinata.cloud/ipfs/QmWFWZh2cqGPrCpsMeqvsxrjZjKz8WckbuRmmq9hRAXfFe",
    maxCount: 1000,
    forbiddenIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 30, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47,
      49, 51, 53, 54, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71,
      72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 104, 105, 106, 108, 111, 112,
      113, 114, 115, 120, 121, 122, 123, 124, 126, 128, 129, 130, 131, 132, 134,
      135, 136, 137, 138, 139, 140, 142, 144, 145, 149, 151, 152, 153, 156, 157,
      161, 163, 165, 166, 167, 168, 171, 173, 175, 176, 177, 178, 179, 180, 181,
      184, 185, 186, 187, 188, 190, 191, 192, 193, 195, 196, 197, 198, 199, 201,
      203, 204, 205, 206, 208, 209, 210, 211, 212, 213, 214, 216, 218, 219, 220,
      222, 223, 224, 225, 226, 227, 228, 230, 232, 233, 234, 235, 236, 237, 238,
      239, 240, 241, 243, 244, 245, 246, 247, 248, 249, 250, 252, 253, 258, 260,
      261, 262, 264, 265, 266, 268, 271, 272, 273, 274, 275, 276, 278, 279, 280,
      281, 282, 283, 284, 285, 286, 287, 290, 291, 292, 293, 295, 296, 297, 298,
      300, 301, 302, 303, 304, 305, 306, 308, 309, 310, 311, 312, 313, 315, 316,
      317, 318, 319, 320, 321, 323, 324, 325, 326, 328, 329, 330, 331, 332, 333,
      334, 335, 337, 338, 339, 342, 343, 344, 346, 347, 348, 349, 350, 351, 352,
      353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 364, 365, 368, 369, 371,
      372, 373, 374, 375, 377, 378, 379, 380, 381, 383, 384, 385, 387, 388, 389,
      390, 391, 394, 395, 396, 397, 400, 402, 404, 405, 406, 407, 409, 410, 411,
      412, 413, 414, 416, 417, 418, 419, 420, 421, 423, 424, 426, 427, 428, 429,
      430, 432, 433, 434, 435, 436, 437, 439, 440, 441, 443, 444, 445, 448, 449,
      450, 451, 452, 453, 454, 457, 458, 461, 462, 463, 465, 466, 469, 471, 472,
      473, 474, 475, 476, 477, 478, 479, 480, 481, 484, 485, 488, 489, 491, 492,
      493, 494, 495, 496, 497, 499, 501, 504, 505, 506, 507, 509, 510, 511, 512,
      513, 515, 516, 517, 520, 521, 522, 523, 526, 529, 531, 533, 534, 535, 536,
      537, 538, 539, 541, 542, 544, 545, 546, 548, 549, 550, 552, 553, 554, 556,
      557, 559, 561, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 574, 575,
      576, 577, 578, 579, 581, 582, 583, 585, 586, 588, 589, 590, 591, 593, 594,
      596, 598, 599, 601, 604, 605, 606, 607, 609, 610, 611, 612, 613, 615, 616,
      617, 618, 619, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 634, 635,
      636, 637, 638, 639, 640, 642, 644, 645, 646, 647, 648, 649, 650, 651, 652,
      653, 654, 655, 660, 661, 662, 663, 665, 667, 669, 671, 672, 674, 675, 677,
      678, 680, 681, 682, 686, 687, 688, 689, 691, 692, 693, 694, 695, 697, 698,
      699, 701, 702, 704, 705, 707, 709, 710, 711, 713, 714, 716, 717, 718, 719,
      721, 722, 723, 724, 727, 729, 730, 732, 733, 734, 735, 736, 737, 738, 739,
      742, 744, 745, 746, 747, 748, 750, 751, 752, 754, 755, 757, 758, 759, 761,
      763, 766, 767, 769, 770, 772, 773, 774, 775, 776, 777, 779, 780, 784, 787,
      788, 789, 790, 791, 792, 793, 794, 795, 796, 798, 803, 806, 807, 809, 810,
      811, 812, 813, 815, 816, 819, 821, 822, 824, 828, 831, 832, 834, 835, 837,
      838, 839, 840, 841, 842, 843, 844, 845, 846, 850, 851, 854, 855, 858, 859,
      860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 872, 873, 875, 876,
      877, 879, 880, 881, 882, 883, 884, 886, 887, 888, 889, 890, 891, 892, 893,
      895, 898, 900, 901, 902, 904, 907, 909, 910, 911, 912, 913, 914, 915, 916,
      917, 918, 919, 920, 921, 923, 924, 925, 926, 927, 929, 930, 931, 932, 933,
      934, 936, 937, 939, 940, 941, 943, 944, 946, 947, 948, 949, 951, 953, 954,
      955, 957, 958, 960, 961, 962, 963, 964, 965, 967, 968, 969, 970, 972, 973,
      974, 975, 976, 977, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 990,
      992, 994, 998, 1000,
    ],
  },
];

const SearchIcon = ({ ...props }) => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
  </StyledSvg>
);

const ClaimChecker: React.FC = () => {
  const [tokenIdNumber, setTokenIdNumber] = useState<{ [key: string]: string }>(
    {}
  );
  const [claimCheckResult, setClaimCheckResult] = useState<{
    [key: string]: { id: string; claimStatus: boolean };
  }>({});
  const { runQuery } = useContract();

  const claimChecker = async (
    tokenId: string,
    {
      nftAddress,
      stakingAddress,
    }: { nftAddress: string; stakingAddress: string }
  ): Promise<boolean> => {
    if (!nftAddress || !stakingAddress) return false;
    const tokens: any = await runQuery(nftAddress, {
      all_nft_info: {
        token_id: tokenId,
      },
    });
    const address = tokens?.access?.owner;
    const claimAmount = await runQuery(stakingAddress, {
      get_claim_amount: {
        id: [tokenId],
        address,
      },
    });
    return Number(claimAmount) === 0;
  };

  const handleChangeSearchTokenId = (
    e: any,
    nftAddress: string,
    maxCount: number
  ) => {
    const { value } = e.target;
    const number = Number(value.split(".").pop());
    if (isNaN(number)) return;
    setTokenIdNumber((prev) => ({
      ...prev,
      [nftAddress]: number ? "" + Math.min(number, maxCount) : "",
    }));
  };

  const handleCheckClaim = async (
    nftAddress: string,
    stakingAddress: string,
    forbiddenIds: number[]
  ) => {
    if (
      forbiddenIds &&
      forbiddenIds.length &&
      forbiddenIds.includes(Number(tokenIdNumber[nftAddress]))
    ) {
      toast.error("That nft does not exist!");
      return;
    }
    try {
      const tokenId =
        nftAddress === Contracts.nftContracts.genisis
          ? `JunoPunks.${tokenIdNumber[nftAddress]}`
          : `JunoPunks2.${tokenIdNumber[nftAddress]}`;
      const claimResult = await claimChecker(tokenId, {
        nftAddress,
        stakingAddress,
      });
      setClaimCheckResult((prev) => ({
        ...prev,
        [nftAddress]: {
          id: tokenIdNumber[nftAddress],
          claimStatus: claimResult,
        },
      }));
    } catch (err) {
      console.error("check error", err);
    }
  };

  const handleKeyUp = (
    e: any,
    nftAddress: string,
    stakingAddress: string,
    forbiddenIds: number[]
  ) => {
    if (e.key === "Enter" && tokenIdNumber) {
      handleCheckClaim(nftAddress, stakingAddress, forbiddenIds);
    }
  };
  return (
    <Wrapper id={PAGES.TOKENCHECKER}>
      <ClaimCheckerHeader>
        <TokenIcon /> PUNKDROP CHECKER
      </ClaimCheckerHeader>
      <ClaimCheckerContainer>
        {ClaimCheckOption.map((item, index) => {
          const url = `${item.imageBaseUrl}/${
            claimCheckResult?.[item.nftAddress]?.id
          }.png`;
          return (
            <ClaimCheckerItem key={index}>
              <ClaimCheckerTitle>{item.title}</ClaimCheckerTitle>
              <ClaimCheckerContent>
                <TokenIdInputerContainer>
                  <TokenIdInputer
                    value={`${item.tokenId}.${
                      tokenIdNumber[item.nftAddress] || ""
                    }`}
                    onChange={(e) =>
                      handleChangeSearchTokenId(
                        e,
                        item.nftAddress,
                        item.maxCount
                      )
                    }
                    onKeyUp={(e) =>
                      handleKeyUp(
                        e,
                        item.nftAddress,
                        item.stakingAddress,
                        item.forbiddenIds || []
                      )
                    }
                    placeholder="Please input token id"
                  />
                  <SearchIcon
                    onClick={() =>
                      handleCheckClaim(
                        item.nftAddress,
                        item.stakingAddress,
                        item.forbiddenIds || []
                      )
                    }
                  />
                </TokenIdInputerContainer>
                {claimCheckResult[item.nftAddress] && (
                  <NftItem>
                    <NftItemImage src={url} alt="" />
                    <NftItemContents>
                      <NftItemContent>{`JunoPunks.${
                        claimCheckResult?.[item.nftAddress]?.id
                      }`}</NftItemContent>
                      <NftItemContent
                        backgroundColor={
                          claimCheckResult[item.nftAddress].claimStatus
                            ? "#4062FF"
                            : "#66C24F"
                        }
                      >
                        {claimCheckResult[item.nftAddress].claimStatus
                          ? "Claimed"
                          : "Claimable"}
                      </NftItemContent>
                    </NftItemContents>
                  </NftItem>
                )}
              </ClaimCheckerContent>
            </ClaimCheckerItem>
          );
        })}
      </ClaimCheckerContainer>
    </Wrapper>
  );
};

export default ClaimChecker;

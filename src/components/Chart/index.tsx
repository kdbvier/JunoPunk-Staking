import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../app/hooks";
import {
  setHistoryOption,
  TokenHistoryPeriod,
} from "../../app/tokenPricesSlice";

import {
  Wrapper,
  ControlPanel,
  ChartContainer,
  StyledSelect as Select,
  TokenTypeContainer,
  TokenImage,
  TokenName,
} from "./styled";

type PeriodOptionType = {
  value: any;
  label: string;
};

type TokenTypeOptionType = {
  label: string;
  id: string;
  imageUrl: string;
};

const TokenOptions = {
  juno: {
    id: "juno",
    label: "JUNO",
    imageUrl:
      "https://assets.coingecko.com/coins/images/19249/large/juno.png?1642838082",
  },
  punk: {
    id: "punk",
    label: "PUNK",
    imageUrl:
      "https://assets.coingecko.com/coins/images/17859/large/unnamed_%282%29.gif?1629683073",
  },
};

const SelectOptions: PeriodOptionType[] = [
  {
    value: TokenHistoryPeriod.DAILY,
    label: "Daily",
  },
  {
    value: TokenHistoryPeriod.WEEKLY,
    label: "Weekly",
  },
  {
    value: TokenHistoryPeriod.MONTHLY,
    label: "Monthly",
  },
  {
    value: TokenHistoryPeriod.YEARLY,
    label: "Yearly",
  },
];

const Chart: React.FC = () => {
  const [period, setPeriod] = useState<PeriodOptionType>(SelectOptions[1]);
  const [
    tokenType,
    //  setTokenType
  ] = useState<TokenTypeOptionType>(TokenOptions.juno);

  const dispatch = useDispatch();
  const tokenPrices = useAppSelector((state) => state.tokenPrices);
  const priceHistory = tokenPrices.priceHistory;
  // const historyOption = tokenPrices.historyOption;

  useEffect(() => {
    dispatch(
      setHistoryOption({
        historyPeriod: period.value,
        priceType: tokenType.id as "juno" | "punk",
      })
    );
  }, [dispatch, tokenType, period]);

  const handleChangePeriodOption = (option: any) => {
    setPeriod(option);
  };

  const handleChangeTokenType = () => {
    // setTokenType((prev) =>
    //   prev.id === "juno" ? TokenOptions.punk : TokenOptions.juno
    // );
  };

  return (
    <Wrapper>
      <ControlPanel>
        <TokenTypeContainer onClick={handleChangeTokenType}>
          <TokenImage key={tokenType.id} alt="" src={tokenType.imageUrl} />
          <TokenName>{tokenType.label}</TokenName>
        </TokenTypeContainer>
        <Select
          value={period}
          options={SelectOptions}
          onChange={handleChangePeriodOption}
        />
      </ControlPanel>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={priceHistory}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(64, 186, 255)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="rgb(64, 186, 255)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis width={2} dataKey="label" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4062FF"
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Wrapper>
  );
};

export default Chart;

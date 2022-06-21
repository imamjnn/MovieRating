type ResponseAPI<R = any> = Promise<R | null>;

export type MarketResults = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  market_cap_rank: string;
};

export type MarketData = MarketResults[];

export type MarketResponse = ResponseAPI<MarketData>;

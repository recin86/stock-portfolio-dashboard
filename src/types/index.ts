export interface Stock {
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  averagePrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Account {
  id: string;
  name: string;
  brokerName: string;
  accountNumber: string;
  totalBalance: number;
  cashBalance: number;
  stockValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  stocks: Stock[];
  lastUpdated: Date;
}

export interface PortfolioSummary {
  totalBalance: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  accounts: Account[];
  topPerformingStocks: Stock[];
  lastUpdated: Date;
}

export type BrokerType = 'kiwoom' | 'meritz';
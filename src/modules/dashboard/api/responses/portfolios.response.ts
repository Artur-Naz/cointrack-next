export interface PortfoliosResponse {
    rates:     Rates;
    exchanges: ExchangeElement[];
    wallets:   WalletElement[];
}

export interface ExchangeElement {
    rates:    Rates;
    id:       string;
    name:     string;
    items:    ExchangeItem[];
    exchange: ExchangeExchange;
}

export interface ExchangeExchange {
    slug:  string;
    name:  string;
    image: string;
}

export interface ExchangeItem {
    rates:        Rates;
    id:           string;
    itemName:     string;
    name:         string;
    holdings:     Holding[];
    transactions: any[];
    positions:    Position[];
}

export interface Holding {
    id:       string;
    currency: string;
    slug:     null | string;
    balance:  number;
    coin:     Coin | null;
}

export interface Coin {
    name:                                string;
    image:                               string;
    currentPrice:                        number;
    marketCap:                           number;
    priceChange24H:                      number;
    priceChangePercentage24H:            number;
    priceChangePercentage14DInCurrency:  number | null;
    priceChangePercentage1HInCurrency:   number | null;
    priceChangePercentage1YInCurrency:   number | null;
    priceChangePercentage200DInCurrency: number | null;
    priceChangePercentage24HInCurrency:  number;
    priceChangePercentage30DInCurrency:  number;
    priceChangePercentage7DInCurrency:   number | null;
}

export interface Position {
    id:               string;
    positionAmt:      number;
    entryPrice:       number;
    unRealizedProfit: number;
    liquidationPrice: number;
}

export type Rates = number[][][]

export interface WalletElement {
    rates:  Rates;
    id:     string;
    name:   string;
    items:  WalletItem[];
    wallet: WalletWallet;
}

export interface WalletItem {
    rates:         Rates;
    id:            string;
    name:          string;
    image:         null;
    walletChainId: string;
    holdings:      Holding[];
    transactions:  Transaction[];
}

export interface Transaction {
    id:       string;
    type:     Type;
    currency: string;
    slug:     null;
    amount:   number;
    fee:      number;
    date:     Date;
}

export enum Type {
    Fill = "fill",
}

export interface WalletWallet {
    name:  string;
    image: string;
}

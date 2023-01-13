import { Network, Alchemy } from 'alchemy-sdk'

export function buildAlchemy() {
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  return new Alchemy(settings);
}
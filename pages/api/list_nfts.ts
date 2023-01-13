import type { NextApiRequest, NextApiResponse } from 'next'
import { buildAlchemy } from '../../utils/buildAlchemy'
import { contractAddress } from '../../utils/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address } = req.query
  if (typeof address !== "string") {
    res.status(400).json({ message: "Invalid address" })
    return
  }
  const alchemy = buildAlchemy()
  const nfts = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [contractAddress]
  });
  res.status(200).json(nfts.ownedNfts.map(nft => {
    return {
      title: nft.title,
      tokenId: nft.tokenId,
      imageUrl: nft.rawMetadata?.image
    }
  }) as any)
}

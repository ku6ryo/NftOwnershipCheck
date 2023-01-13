import type { NextApiRequest, NextApiResponse } from 'next'
import { contractAddress } from '../../utils/constants'
import { buildAlchemy } from '../../utils/buildAlchemy'
import { buildAddressVerificationTokenIssuer } from '../../utils/buildTokenIssuer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" })
  }
  const { addressVerificationToken, nftId, sign } = req.body
  if (typeof addressVerificationToken !== "string") {
    res.status(400).json({ message: "Invalid address" })
    return
  }
  if (typeof sign !== "string") {
    res.status(400).json({ message: "Invalid sign" })
    return
  }
  if (typeof nftId !== "string") {
    res.status(400).json({ message: "Invalid tokenId" })
    return
  }
  const issuer = buildAddressVerificationTokenIssuer()
  try {
    const address = await issuer.verifyAndGetSignerAddress(addressVerificationToken, sign)
    const alchemy = buildAlchemy()
    const { owners } = await alchemy.nft.getOwnersForNft(contractAddress, nftId)
    res.status(200).json({ isOwner: owners.map(a => a.toLowerCase()).includes(address.toLowerCase()) })
  } catch (e) {
    res.status(400).json({ message: "Invalid address verification token" })
  }
}

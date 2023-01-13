import type { NextApiRequest, NextApiResponse } from 'next'
import { isAddress } from 'ethers/lib/utils'
import { buildAddressVerificationTokenIssuer } from '../../utils/buildTokenIssuer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address } = req.query
  if (typeof address !== "string") {
    res.status(400).json({ message: "Invalid address" })
    return
  }
  if (!isAddress(address)) {
    res.status(400).json({ message: "Invalid address" })
    return
  }
  const issuer = buildAddressVerificationTokenIssuer()
  res.status(200).json({
    token: issuer.issueToken(address, new Date(new Date().getTime() + 10_000))
  })
}

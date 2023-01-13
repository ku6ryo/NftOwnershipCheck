import { AddressVerificationTokenIssuer } from "./AddressVerificationTokenIssuer";

export function buildAddressVerificationTokenIssuer() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("Secret is not set")
  }
  return new AddressVerificationTokenIssuer(secret)
}
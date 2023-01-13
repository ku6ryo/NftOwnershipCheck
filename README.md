NFT ownership check with Alchemy API.

# Checking flow
* FE: Requests an address verification token (JWT). The verification token has address in it.
* FE: Signs the token
* FE: Sends the verification token, the signature and a tokenId of a NFT to the BE.
* BE: Verifies the signature and resolves the signer address. 
* BE: Compare the signer address and the address in JWT.
* BE: Check if the address has the specified NFT or not. 
NFT ownership check with Alchemy API. This is the example project to implement a frontend / backend system to check ownerships of NFTs. This can be used for cases that people gives some goods to NFT owners depending on which NFT accessers have.

# Checking flow
* FE: Requests an address verification token (JWT). The verification token has address in it.
* FE: Signs the token (by metamask)
* FE: Sends the verification token, the signature and a tokenId of a NFT to the BE.
* BE: Verifies the signature and resolves the signer address. 
* BE: Compare the signer address and the address in JWT.
* BE: Check if the address has the specified NFT or not. 

# Setup
Please create a .env or .env.development file to make the server work. Please check sample.env the variable details.
import axios from "axios"

export type Nft = {
  tokenId: string
  title: string
  imageUrl: string
}

export class ApiClient {

  async getMyNfts(address: string) {
    const res = await axios.get<Nft[]>(`/api/list_nfts?address=${address}`)
    return res.data
  }

  async getAddressVerificationToken(address: string) {
    const res = await axios.get<{ token: string }>(`/api/get_address_verification_token?address=${address}`)
    return res.data.token
  }

  async verifyNftOwnership(addressVerificationToken: string, sign: string, nftId: string) {
    const res = await axios.post<{ isOwner: boolean }>(`/api/verify_nft_ownership`, {
      addressVerificationToken,
      sign,
      nftId
    })
    return res.data.isOwner
  }
}

import React, { useEffect, useState } from "react"
import style from "./index.module.scss"
import { Nft, ApiClient } from "../utils/ApiClient"
import { providers } from "ethers"

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState<Nft[]>([])
  const [hasMetamask, setHasMetamask] = useState(false)

  useEffect(() => {
    const hasMetamask = !!window.ethereum
    setHasMetamask(hasMetamask)
    if (hasMetamask) {
      setLoading(true)
      try {
        ;(async () => {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
          })
          const address = accounts[0]
          const nfts = await new ApiClient().getMyNfts(address)
          setNfts(nfts)
        })()
      } catch (e) {
        // pass
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const onCheckClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const tokenId = e.currentTarget.dataset.tokenId
    console.log(tokenId)
    if (!tokenId) {
      throw new Error("Token ID is not set")
    }
    checkOwnership(tokenId)
  }
  const checkOwnership = async (tokenId: string) => {
    const client = new ApiClient()
    const provider = new providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    const verificationToken = await client.getAddressVerificationToken(address)
    const signature = await signer.signMessage(verificationToken)
    const isOwner = await client.verifyNftOwnership(verificationToken, signature, tokenId)
    alert(`You are ${isOwner ? "" : "not "}the owner.`)
  }
  return (
    <>
      <main>
        {nfts.map(n => {
          return (
            <div key={n.tokenId} className={style.nft}>
              <div>{n.title}</div>
              <div>
                <img src={n.imageUrl} />
              </div>
              <div>
                <button data-token-id={n.tokenId} onClick={onCheckClick}>check ownership</button>
              </div>
            </div>
          )
        })}
      </main>
    </>
  )
}

import { ChainId } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import invariant from 'tiny-invariant'

export const OVERLAY_READY = 'OVERLAY_READY'

type FormaticSupportedChains = Extract<ChainId, ChainId.MATIC | ChainId.MUMBAI>

interface FortmaticConnectorArguments {
  apiKey: string
  chainId: number
  rpcUrl: string
}

const CHAIN_ID_NETWORK_ARGUMENT: { readonly [chainId in FormaticSupportedChains]: string | undefined } = {
  [ChainId.MUMBAI]: undefined,
  [ChainId.MATIC]: 'mumbai'
}

export class FortmaticConnector extends AbstractConnector {
  private readonly apiKey: string
  private readonly rpcUrl: string
  private readonly chainId: number

  public fortmatic: any

  constructor({ apiKey, chainId, rpcUrl }: FortmaticConnectorArguments) {
    invariant(Object.keys(CHAIN_ID_NETWORK_ARGUMENT).includes(chainId.toString()), `Unsupported chainId ${chainId}`)
    super({ supportedChainIds: [chainId] })

    this.apiKey = apiKey
    this.chainId = chainId
    this.rpcUrl = rpcUrl
  }

  async activate() {
    if (!this.fortmatic) {
      const { default: Fortmatic } = await import('fortmatic')

      if (this.chainId in CHAIN_ID_NETWORK_ARGUMENT) {
        this.fortmatic = new Fortmatic(this.apiKey, {
          rpcUrl: this.rpcUrl,
          chainId: this.chainId
        })
      } else {
        throw new Error(`Unsupported network ID: ${this.chainId}`)
      }
    }

    const provider = this.fortmatic.getProvider()

    const pollForOverlayReady = new Promise(resolve => {
      const interval = setInterval(() => {
        if (provider.overlay.overlayReady) {
          clearInterval(interval)
          this.emit(OVERLAY_READY)
          resolve()
        }
      }, 200)
    })

    const [account] = await Promise.all([
      provider.enable().then((accounts: string[]) => accounts[0]),
      pollForOverlayReady
    ])

    return { provider: this.fortmatic.getProvider(), chainId: (this as any).chainId, account }
  }

  public async getProvider(): Promise<any> {
    return this.fortmatic.getProvider()
  }

  public async getChainId(): Promise<number | string> {
    return this.chainId
  }

  public async getAccount(): Promise<null | string> {
    return this.fortmatic
      .getProvider()
      .send('eth_accounts')
      .then((accounts: string[]): string => accounts[0])
  }

  public deactivate() {}

  public async close() {
    await this.fortmatic.user.logout()
    this.emitDeactivate()
  }
}

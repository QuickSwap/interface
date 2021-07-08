import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import detectEthereumProvider from '@metamask/detect-provider'
import warning from 'tiny-warning'

type SendReturnResult = { result: any }
type SendReturn = any

type Send = (method: string, params?: any[]) => Promise<SendReturnResult | SendReturn>
type SendOld = ({ method }: { method: string }) => Promise<SendReturnResult | SendReturn>

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}

export class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Ethereum provider was found on window.ethereum.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class MetamaskConnector extends AbstractConnector {
  public provider: any
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs)

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  private handleChainChanged(chainId: string | number): void {
    this.emitUpdate({ chainId, provider: this.provider })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleClose(code: number, reason: string): void {
    this.emitDeactivate()
  }

  private handleNetworkChanged(networkId: string | number): void {
    this.emitUpdate({ chainId: networkId, provider: window.ethereum })
  }

  public async activate(): Promise<ConnectorUpdate> {
    this.provider = await detectEthereumProvider()

    if (!this.provider) {
      throw new NoEthereumProviderError()
    }

    if (this.provider.on) {
      this.provider.on('chainChanged', this.handleChainChanged)
      this.provider.on('accountsChanged', this.handleAccountsChanged)
      this.provider.on('close', this.handleClose)
      this.provider.on('networkChanged', this.handleNetworkChanged)
    }

    if ((this.provider as any).isMetaMask) {
      ;(this.provider as any).autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via eth_requestAccounts
    let account
    try {
      account = await (this.provider.send as Send)('eth_requestAccounts').then(
        sendReturn => parseSendReturn(sendReturn)[0]
      )
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await this.provider.enable().then((sendReturn:any) => sendReturn && parseSendReturn(sendReturn)[0])
    }

    return { provider: window.ethereum, ...(account ? { account } : {}) }
  }

  public async getProvider(): Promise<any> {
    return this.provider
  }

  public async getChainId(): Promise<number | string> {
    if (!window.ethereum) {
      throw new NoEthereumProviderError()
    }

    let chainId
    try {
      chainId = await (this.provider.send as Send)('eth_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'eth_chainId was unsuccessful, falling back to net_version')
    }

    if (!chainId) {
      try {
        chainId = await (this.provider.send as Send)('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }

    if (!chainId) {
      try {
        chainId = parseSendReturn((this.provider.send as SendOld)({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }

    if (!chainId) {
      if (this.provider.isDapper) {
        chainId = parseSendReturn(this.provider.cachedResults.net_version)
      } else {
        chainId =
          this.provider.chainId || this.provider.netVersion || this.provider.networkVersion || this.provider._chainId
      }
    }

    return chainId
  }

  public async getAccount(): Promise<null | string> {
    if (!this.provider) {
      throw new NoEthereumProviderError()
    }

    let account
    try {
      account = await (this.provider.send as Send)('eth_accounts').then(sendReturn => parseSendReturn(sendReturn)[0])
    } catch {
      warning(false, 'eth_accounts was unsuccessful, falling back to enable')
    }

    if (!account) {
      try {
        account = await this.provider.enable().then((sendReturn: any) => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to eth_accounts v2')
      }
    }

    if (!account) {
      account = parseSendReturn((this.provider.send as SendOld)({ method: 'eth_accounts' }))[0]
    }

    return account
  }

  public deactivate() {
    if (this.provider && this.provider.removeListener) {
      this.provider.removeListener('chainChanged', this.handleChainChanged)
      this.provider.removeListener('accountsChanged', this.handleAccountsChanged)
      this.provider.removeListener('close', this.handleClose)
      this.provider.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }

  public async isAuthorized(): Promise<boolean> {
    if (!this.provider) {
      return false
    }

    try {
      return await (this.provider.send as Send)('eth_accounts').then(sendReturn => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true
        } else {
          return false
        }
      })
    } catch {
      return false
    }
  }
}
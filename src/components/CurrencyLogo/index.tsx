import { Currency, ETHER, Token } from '@uniswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/matic.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) => {
    let uri;
    if (address?.toLowerCase() === '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270') {
      address = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
    }
    if (address?.toLowerCase() === '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063') {
      address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    }
    if (address?.toLowerCase() === '0xc2132d05d31c914a87c6611c10748aeb04b58e8f') {
      address = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    }
    if (address?.toLowerCase() === '0x2791bca1f2de4661ed88a30c99a7a9449aa84174') {
      address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    }
  
    if (address?.toLowerCase() === '0xb33eaad8d922b1083446dc23f610c2567fb5180f') {
      address = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
    }
  
    if (address?.toLowerCase() === '0xdb3b3b147a030f032633f6c4bebf9a2fb5a882b5') {
      uri = 'https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/assets/easyfi-token.png'
    }
  
    if (address?.toLowerCase() === '0x831753dd7087cac61ab5644b308642cc1c33dc13') {
      uri = 'https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/public/favicon.jpeg'
    }
  
    if (address?.toLowerCase() === '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6') {
      address = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
    }
  
    if (address?.toLowerCase() === '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7') {
      uri = 'https://etherscan.io/token/images/AavegotchiGHST_32.png'
    }
  
    if (address?.toLowerCase() === '0x4ebde54ba404be158262ede801744b92b9878c61') {
      uri = 'https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/assets/easyfi-token.png'
    }
  
    if (address?.toLowerCase() === '0xa1c09c8f4f5d03fcc27b456475d53d988e98d7c5') {
      uri = 'https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/assets/easyfi-token.png'
    }
  
    if (address?.toLowerCase() === '0xfc39742fe9420a7af23757fc7e78d1c3ae4a9474') {
      uri = 'https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/assets/easyfi-token.png'
    }
  
    if (address?.toLowerCase() === '0x9f5755d47fb80100e7ee65bf7e136fca85dd9334') {
      uri = 'https://etherscan.io/token/images/om_32.png'
    }
  
    if (address?.toLowerCase() === '0xe6fc6c7cb6d2c31b359a49a33ef08ab87f4de7ce') {
      uri = 'https://assets.coingecko.com/coins/images/7697/small/N7aEdYrY_400x400.png?1561587437'
    }
  
    if (address?.toLowerCase() === '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39') {
      address = '0x514910771AF9Ca656af840dff83E8264EcF986CA'
    }
  
    if (address?.toLowerCase() === '0x71b821aa52a49f32eed535fca6eb5aa130085978') {
      address = '0xB6eD7644C69416d67B522e20bC294A9a9B405B31'
    }
  
    if (address?.toLowerCase() === '0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4') {
      address = '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942'
    }
  
    if (address?.toLowerCase() === '0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c') {
      address = '0xc00e94Cb662C3520282E6f5717214004A7f26888'
    }
  
    if (address?.toLowerCase() === '0x313d009888329c9d1cf4f75ca3f32566335bd604') {
      address = '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03'
    }
  
    if (address?.toLowerCase() === '0xda537104d6a5edd53c6fbba9a898708e465260b6') {
      address = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'
    }

    if (address?.toLowerCase() === '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619') {
      address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    }

    if (!uri) {
      uri = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
    }

    return uri;
}
  

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}

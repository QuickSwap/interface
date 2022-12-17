import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { ExternalLink } from '../../theme'
import { RowFixed } from '../Row'

const HeaderRow = styled(RowFixed)`
  padding: 1rem 1rem 0;
  width: 100%;
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
`

const activeClassName = 'ACTIVE'

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export default function BetaBanner() {
  return (
    <HeaderRow>
	    <Title>The new Beta interface is out. You can check out.</Title>
	    <StyledExternalLink id={`beta-nav-link`} href={'https://beta.quickswap.exchange'}>
	      Go to Beta
	    </StyledExternalLink>
  	</HeaderRow>
  )
}

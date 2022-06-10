import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { useLairInfo, useNewLairInfo } from '../../state/stake/hooks'
import { TYPE } from '../../theme'
import LairCard from '../../components/QuickLair/LairCard'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'

import StakeUpdater from '../../state/stake/updater'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: calc(100% - 228px);
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.primary1};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`

export default function QuickLair() {

  const lairInfo = useLairInfo();
  const newLairInfo = useNewLairInfo();

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `

  return (
    <PageWrapper gap="lg" justify="center">
      <StakeUpdater />
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Dragon's Lair</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Unstake your old QUICK from old Dragon's lair, convert it to new QUICK and stake it in new Dragon's lair
                </TYPE.white>
                
              </RowBetween>{' '}
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>
      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>New Dragon's Lair</TYPE.mediumHeader>
        </DataRow>

        <PoolSection>
          <LairCard lairInfo={newLairInfo} isNew={true}/>
        </PoolSection>
      </AutoColumn>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Old Dragon's Lair</TYPE.mediumHeader>
        </DataRow>

        <PoolSection>
          <LairCard lairInfo={lairInfo} isNew={false}/>
        </PoolSection>
      </AutoColumn>

    </PageWrapper>
  )
}

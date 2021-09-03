import React, { RefObject, useRef, useEffect, useState, useCallback } from 'react'

import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { SYRUP_REWARDS_INFO, useSyrupInfo } from '../../state/stake/hooks'
import { TYPE/*, ExternalLink*/} from '../../theme'
//import { isMobile } from 'react-device-detect'
import SyrupCard from '../../components/syrup/SyrupCard'
import { RowBetween } from '../../components/Row'
//import { ButtonPrimary } from '../../components/Button'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'

function thousands_separators(num:any)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts[0]
  }

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

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.primary1};
  padding: 0 20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: calc(100% - 188px);
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

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FilterButtons = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  min-width: 180px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    margin-top: 8px;
    height: 48px;
  `};
`

const FilterItem = styled.div<{active: boolean}>`
  width: 48%;
  border: 1px solid ${({ theme }) => theme.primary1};
  background: ${({ theme, active }) => active ? theme.primary1 : 'transparent'};
  color: ${({ theme, active }) => active ? 'white' : 'black'};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
`


export default function Syrup() {

  // pagination
  const [page, setPage] = useState(1)
  const [ searchQuery, setSearchQuery] = useState<string>('')
  
  // const [searchedPools, setPools] = useState<SyrupInfo[]>([]);
  //const [ empty, setEmpty ] = useState(true);

  const { chainId } = useActiveWeb3React()
  const syrupInfos = useSyrupInfo();
  const[totalDepositedUSD, setTotalDeposittedUSD] = useState<any>(0);


  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `
  var poolsToShow = syrupInfos;

  /**if (!empty) {
    poolsToShow = searchedPools;
  }*/

  //@ts-ignore
  const maxPage = poolsToShow.length <= 10 ? 1 : Math.ceil(poolsToShow.length / 10);
  const ITEMS_PER_PAGE = 11;

  const handleInput = useCallback(event => {
    const input = event.target.value
    setSearchQuery(input)
    // if (!input || input.trim() === '') {
    //   setPools([]);
    //   setEmpty(true);
    //   return;
    // }
    // var searchedPools:any[] = [];
    // for(var i = 0; i < pools.length; i++) {
    //   if (
    //     pools[i].token.name?.toLowerCase().includes(input.toLowerCase()) || 
    //     pools[i].token.symbol?.toLowerCase().includes(input.toLowerCase())
    //   )
    //   {
    //     searchedPools.push(pools[i]);
    //   }
    // }
    // searchedPools?.sort((a,b) => {
    //   if(Boolean(a.stakedAmount.greaterThan('0')) && Boolean(b.stakedAmount.greaterThan('0'))) {
    //     return 1;
    //   }
    //   if(!Boolean(a.stakedAmount.greaterThan('0')) && Boolean(b.stakedAmount.greaterThan('0'))) {
    //     return 1;
    //   }
    //   if(Boolean(a.stakedAmount.greaterThan('0')) && !Boolean(b.stakedAmount.greaterThan('0'))) {
    //     return -1;
    //   }
    //   else {
    //     return 1;
    //   }
    // })
    // setPools(searchedPools);
    // setEmpty(false);
  }, [])

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (SYRUP_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  poolsToShow?.sort((a,b) => {
    if(Boolean(a.stakedAmount.greaterThan('0')) && Boolean(b.stakedAmount.greaterThan('0'))) {
      return 1;
    }
    if(!Boolean(a.stakedAmount.greaterThan('0')) && Boolean(b.stakedAmount.greaterThan('0'))) {
      return 1;
    }
    if(Boolean(a.stakedAmount.greaterThan('0')) && !Boolean(b.stakedAmount.greaterThan('0'))) {
      return -1;
    }
    else {
      return 1;
    }
  })

  useEffect(() => {

    if(syrupInfos.length > 0) {

     var aTotaldepositsUSD:any = syrupInfos?.reduce((sum, current, currentIndex)=>{
        if(currentIndex === 1)
          //@ts-ignore
          return sum.valueOfTotalStakedAmountInUSDC + current.valueOfTotalStakedAmountInUSDC;
  
        else
          //@ts-ignore
          return sum + current.valueOfTotalStakedAmountInUSDC
      })
      setTotalDeposittedUSD(aTotaldepositsUSD)
    }    
    },[syrupInfos]
  )

  const inputRef = useRef<HTMLInputElement>()

  const [filterIndex, setFilterIndex] = useState(-1)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Dragon's Syrup</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your dQUICK tokens to earn more.
                </TYPE.white>
                
              </RowBetween>{' '}
              {/**<RowBetween>
              <ExternalLink id={`old-pools-link`} href={'https://quickswap.exchange/#/archive'} style={{width: isMobile?'50%':'25%'}}>
              
                  <ButtonPrimary padding="8px" borderRadius="8px">
                    Archived Pools
                  </ButtonPrimary>
                  </ExternalLink>
              </RowBetween>*/}
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>


      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating tokens</TYPE.mediumHeader>
        </DataRow>
        <FilterWrapper>
          <SearchInput
            type="text"
            id="pools-search-input"
            placeholder='Search name or symbol'
            value={searchQuery}
            ref={inputRef as RefObject<HTMLInputElement>}
            onChange={handleInput}
          />
          <FilterButtons>
            <FilterItem active={filterIndex === 0} onClick={() => filterIndex === 0 ? setFilterIndex(-1) : setFilterIndex(0)}>APY</FilterItem>
            <FilterItem active={filterIndex === 1} onClick={() => filterIndex === 1 ? setFilterIndex(-1) : setFilterIndex(1)}>Deposit</FilterItem>
          </FilterButtons>
        </FilterWrapper>
        <TopSection gap="md">
        <DataCard>
        <CardNoise />
        <StatContainer>
        <RowBetween style={{marginTop: "10px"}}>
          <TYPE.white> Total Deposits</TYPE.white>
          <TYPE.white>
            ${thousands_separators(totalDepositedUSD)}
          </TYPE.white>
        </RowBetween>
      </StatContainer>
          </DataCard>
          </TopSection>
        <PoolSection>


          {stakingRewardsExist && poolsToShow?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            poolsToShow?.slice(
              page === 1 ? 0 : (page - 1) * ITEMS_PER_PAGE,
              (page * ITEMS_PER_PAGE) < poolsToShow.length ? (page * ITEMS_PER_PAGE): poolsToShow.length  
            ).map(syrupInfo => {
              // need to sort by added liquidity here
              return <SyrupCard key={syrupInfo.stakingRewardAddress} syrupInfo={syrupInfo} isOld={false}/>
            })
          )}
          <PageButtons>
        <div
          onClick={(e) => {
            setPage(page === 1 ? page : page - 1)
          }}
        >
          <Arrow>←</Arrow>
        </div>
        <TYPE.body>{'Page ' + page + ' of ' + maxPage}</TYPE.body>
        <div
          onClick={(e) => {
            setPage(page === maxPage ? page : page + 1)
          }}
        >
          <Arrow>→</Arrow>
        </div>
      </PageButtons>
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}

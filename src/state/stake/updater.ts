import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useActiveWeb3React } from "../../hooks"
import { useBlockNumber } from "../application/hooks"
import { updateLairInfo, updateOldStakingInfo, updateStakingInfo, updateSyrupInfo, updateVeryOldStakingInfo } from "./actions"
import { useLairInfo, useOldStakingInfo, useStakingInfo, useSyrupInfo, useVeryOldStakingInfo } from "./hooks"

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()
  const blockNumber = useBlockNumber()
  const stakingInfos = useStakingInfo()
  const veryoldstakingInfos = useVeryOldStakingInfo()
  const oldstakingInfos = useOldStakingInfo()
  const lairInfo = useLairInfo()
  const syrupInfo = useSyrupInfo()

  useEffect(() => {
    if (!library || !chainId)
      return;

    dispatch(updateStakingInfo(stakingInfos))
    dispatch(updateOldStakingInfo(oldstakingInfos))
    dispatch(updateVeryOldStakingInfo(veryoldstakingInfos))
    dispatch(updateLairInfo(lairInfo))
    dispatch(updateSyrupInfo(syrupInfo))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])
  return null
}
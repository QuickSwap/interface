import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useActiveWeb3React } from "../../hooks"
import { useBlockNumber } from "../application/hooks"
import { updateStakingInfo } from "./actions"

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    if (!library || !chainId)
      return;
    dispatch(updateStakingInfo([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])
  return null
}
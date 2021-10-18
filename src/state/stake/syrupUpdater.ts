import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useActiveWeb3React } from "../../hooks"
import { useBlockNumber } from "../application/hooks"
import { updateSyrupInfo } from "./actions"
import { useSyrupInfo } from "./hooks"

export default function SyrupUpdater(): null {
  const { library, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()
  const blockNumber = useBlockNumber()
  const syrupInfos = useSyrupInfo()

  useEffect(() => {
    if (!library || !chainId)
      return;
    dispatch(updateSyrupInfo(syrupInfos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])
  return null
}
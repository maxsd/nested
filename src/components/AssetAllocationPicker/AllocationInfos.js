import { roundWithDecimal } from '../../utils/functions'
import { useQuery } from 'react-query'
import { selectedAssets } from '../../constants'
import { LinearProgress, withStyles } from '@material-ui/core'
import { AllocationState } from '../Allocation/Allocation'
import { Lock, LockOpen } from '@material-ui/icons'

const GradientLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
    background: 'linear-gradient(to right, #2bd4db, #e78ecb, #fdb84a)',
  },
}))(LinearProgress)

const AllocationInfos = ({ allocation, toggleLock, budget }) => {
  const { id, short } = selectedAssets.find(asset => asset.name === allocation.asset)

  // TODO configure staleTime depending on price validity so price is refreshed
  const { isLoading, error, data } = useQuery(`${id}-details`, () =>
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`).then(res =>
      res.json()
    )
  )

  if (isLoading) return <GradientLinearProgress />

  // TODO: develop a prettier error handling :)
  if (error) return <>An error occured</>

  const price = data.market_data.current_price['usd']
  const decimals = 4
  const { asset, amount, state } = allocation
  const fiatAmount = ( amount / 100 ) * budget
  const cryptoAmount = fiatAmount / price
  const isLocked = state === AllocationState.LOCKED

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 w-40">
        <div>{data.image && <img src={data.image.small} alt={`${asset} logo`}/>}</div>
        <div>
          <div className="font-sbold text-base">{short}</div>
          <div className="font-sregular text-sm text-darkGrey">{asset}</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="font-sbold text-base">{roundWithDecimal(amount, 2)} %</div>
        <div
          className={`cursor-pointer font-sregular text-sm ${isLocked ? 'text-orange' : 'text-darkGrey'} flex gap-1.5`}
          onClick={toggleLock}
        >
          {state}
          {isLocked ? <Lock style={{ fontSize: 16 }} /> : <LockOpen style={{ fontSize: 16 }} />}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[120px]">
        <div className="font-sregular text-base">{roundWithDecimal(cryptoAmount, decimals)} {short}</div>
        <div className="font-smedium text-sm cursor-pointer text-darkGrey">≈ ${roundWithDecimal(fiatAmount, 2)}</div>
      </div>
    </div>
  )
}

export default AllocationInfos

import { withStyles } from '@material-ui/core/styles'
import { Divider, IconButton, Slider } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { AllocationState } from '../Allocation/Allocation'
import AllocationInfos from './AllocationInfos'

const CustomSlider = withStyles({
  root: {
    color: '#2bd4db',
    height: 8,
    padding: 0,
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: '6px solid currentColor',
    marginTop: -8,
    marginLeft: -15,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 14,
    borderRadius: 10,
  },
  rail: {
    height: 14,
    borderRadius: 10,
    backgroundColor: '#EAEDF3',
    opacity: 1,
  },
})(Slider)

const AssetAllocationPicker = ({ allocation, onChangeAllocation, limit, toggleLock, shouldBeDisabled, onDelete, budget }) => {
  const { asset, amount, state } = allocation

  const changeAllocation = (event, value) => {
    // do not modify allocation amounts if allocation has been locked or non possible value comparing to the other allocations
    if (shouldBeDisabled || state === AllocationState.LOCKED || (value >= limit && amount === limit)) return
    return onChangeAllocation({ asset, amount: value >= limit ? limit : value, state: AllocationState.UNLOCKED })
  }

  const handleToggleLock = () => toggleLock(asset)

  const handleDelete = () => onDelete(allocation)

  return (
    <div className="bg-veryPaleGrey w-[500px] px-3.5 py-2.5 flex">
      <div className="flex-1">
        <AllocationInfos allocation={allocation} toggleLock={handleToggleLock} budget={budget}/>
        <CustomSlider
          aria-label="allocation slider"
          value={amount}
          onChange={changeAllocation}
          max={100}
          min={0}
          step={0.01}
          style={allocation.state === AllocationState.LOCKED ? { color: '#FDB84A' } : {}}
        />
      </div>
      <Divider className="bg-paleGrey" variant="middle" orientation="vertical" />
      <IconButton style={{ padding: 0 }} onClick={handleDelete}><DeleteIcon /></IconButton>
    </div>
  )
}

export default AssetAllocationPicker

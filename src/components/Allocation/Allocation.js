import { useState } from 'react'
import { Button, Divider } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import CustomStepper from '../CustomStepper/CustomStepper'
import AssetAllocationPicker from '../AssetAllocationPicker/AssetAllocationPicker'
import { roundWithDecimal } from '../../utils/functions'
import { selectedAssets } from '../../constants'

export const AllocationState = {
  UNLOCKED: 'Unlocked',
  LOCKED: 'Locked',
}

const Allocation = ({ steps, selectedStep, onChangeStep, allocatedBudget }) => {
  const [allocations, setAllocations] = useState(selectedAssets.map(asset => ({ asset: asset.name, amount: 100 / selectedAssets.length, state: AllocationState.UNLOCKED })))

  const lockedAssets = allocations.filter(allocation => allocation.state === AllocationState.LOCKED)
  const lockedAssetsShares = 100 - (lockedAssets.length ? lockedAssets.reduce((acc, alloc) => acc + alloc.amount, 0) : 0)

  const changeAllocation = assetToModify => setAllocations(
    previousValues => {
      const unlockedValues = previousValues.filter(allocation => allocation.state === AllocationState.UNLOCKED)
      const newValues = previousValues
        .map(allocation => allocation.asset === assetToModify.asset
          ? assetToModify
          : allocation.state === AllocationState.UNLOCKED ?
            {
              ...allocation,
              // we could compute values differently to respect better user changes, based on previous values,
              // but the locked system seems to cover the need like this and ensure reasonable performances
              amount: +roundWithDecimal((lockedAssetsShares - assetToModify.amount) / (unlockedValues.length - 1), 2),
            }
            : allocation)
      return [...newValues]
    }
  )

  // toggle lock state of the clicked allocation
  const toggleLock = assetToLockOrUnlock => setAllocations(
    previousValues => previousValues
      .map(allocation => allocation.asset === assetToLockOrUnlock
        ? { ...allocation, state: allocation.state === AllocationState.LOCKED ? AllocationState.UNLOCKED : AllocationState.LOCKED }
        : allocation)
  )

  // delete an allocation and redistribute the amount between unlocked allocations if any
  const onDelete = allocationToDelete => {
    // delete allocation from the list
    const filteredAllocations = allocations.filter(allocation => allocation.asset !== allocationToDelete.asset)
    // count the number of unlocked allocations to dispatch the amount of the allocation to delete between unlocked ones
    const unlockedAllocationsNumber = filteredAllocations.filter(allocation => allocation.state === AllocationState.UNLOCKED).length
    const updatedAllocations = filteredAllocations.map(
      allocation => allocation.state === AllocationState.UNLOCKED || !unlockedAllocationsNumber ?
        {
          ...allocation,
          // if every allocation is locked, still share the amount of deleted allocation, else share it between unlocked allocations only
          amount: allocation.amount + (allocationToDelete.amount / (unlockedAllocationsNumber ? unlockedAllocationsNumber : filteredAllocations.length)) }
      :
        allocation
    )
    setAllocations(updatedAllocations)
  }

  const shouldBeDisabled = allocations.length - lockedAssets.length <= 1
  return (
  <div className="flex flex-col items-center w-full gap-[15px]">
    <CustomStepper steps={steps} selectedStep={selectedStep} onChangeStep={onChangeStep} />
    <div className="font-sbold text-[40px]">Set assets allocations</div>
    <div className="w-full text-darkGrey font-slight text-sm">Our smart contracts will never rebalance your portfolio.<br />
      Don't worry, you will be able to update you portfolio at any time once created.</div>
    <div className="flex flex-col gap-4 w-full">
      {
        allocations.map(allocation =>
          <AssetAllocationPicker
            key={allocation.asset}
            allocation={allocation}
            onChangeAllocation={changeAllocation}
            toggleLock={toggleLock}
            limit={lockedAssetsShares}
            shouldBeDisabled={shouldBeDisabled}
            onDelete={onDelete}
            budget={allocatedBudget}
          />
        )
      }
    </div>
    <Divider className="h-px w-full bg-gradient-to-r from-blue via-violet to-orange" />
    <div className="flex items-center justify-between w-full">
      {/* as mentioned earlier we can't use tailwind styling or we would have to use important which is worse ? */}
      <Button style={{ textTransform: 'none', fontFamily: 'SofiaProRegular', fontSize: 18 }} variant="text" startIcon={<ArrowBackIos />}>
        Back to selection
      </Button>
      <Button style={{ backgroundColor: '#2bd4db', color: 'white', textTransform: 'none', width: 200, fontFamily: 'SofiaProRegular', fontSize: 18 }}>
        Continue
      </Button>
    </div>
  </div>
)}

export default Allocation

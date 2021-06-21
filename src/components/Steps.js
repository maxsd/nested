import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import Allocation from './Allocation/Allocation'
import { useState } from 'react'

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: 20,
    margin: 0,
    gridColumn: 1,
    gridRow: 1,
    width: 550,
    display: 'flex',
    justifyContent: 'center',
  },
}))

const portfolioCreationSteps = ['Settings', 'Selection', 'Allocation', 'Mint']

const Steps = () => {
  const classes = useStyles()

  const [selectedStep, setSelectedStep] = useState(2)
  const allocatedBudget = 10000

  return (
    <div className="grid">
      {/* Keep inline style for material components as material styles are overiding the rest */}
      <Paper classes={classes} style={{ transform: 'scaleY(0.9) translate(-72px)', backgroundColor: '#f9fafc' }} elevation={3}>Card 1</Paper>
      <Paper classes={classes} style={{ transform: 'scaleY(0.95) translate(-36px)', backgroundColor: '#f9fafc' }} elevation={3}>Card 2</Paper>
      <Paper classes={classes} style={{ zIndex: 2 }} elevation={3}>
        <Allocation
          steps={portfolioCreationSteps}
          selectedStep={selectedStep}
          onChangeStep={setSelectedStep}
          allocatedBudget={allocatedBudget}
        />
      </Paper>
      <Paper classes={classes} style={{ transform: 'scaleY(0.95) translate(36px)', backgroundColor: '#f9fafc' }} elevation={3}>Card 4</Paper>
    </div>
  )
}

export default Steps

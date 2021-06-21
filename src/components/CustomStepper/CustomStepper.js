import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import { Step, StepConnector, StepLabel, Stepper, SvgIcon } from '@material-ui/core'
import clsx from 'clsx'

const Connector = withStyles({
  active: {
    '& $line': {
      borderColor: '#2bd4db',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#2bd4db',
    },
  },
  line: {
    borderColor: '#eaedf3',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)

const useStepIconStyles = makeStyles({
  root: {
    color: '#eaedf3',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 16,
    border: '1px solid white',
    // to prevent connector to overlap the step circle
    zIndex: 2,
  },
  active: {
    color: 'white',
    borderRadius: 16,
    border: '1px solid #2bd4db',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#2bd4db',
  },
})

const stepperStyles = makeStyles(() => createStyles({
  root: {
    width: '100%',
    padding: 18,
    cursor: 'pointer',
  },
  alternativeLabel: {
    fontFamily: 'SofiaProMedium',
    fontSize: 18,
    color: '#eaedf3',
    '& $active': {
      color: '#2bd4db',
    },
    '& $completed': {
      color: '#969FB9',
    },
  },
  // fires a warning but is the only solution to make the & $active tag work
  active: {},
  completed: {},
}))

const StepIcon = ({ active, completed, icon }) => {
  const classes = useStepIconStyles()

  const className = clsx(classes.root, {
    [classes.active]: active,
    [classes.completed]: completed,
  })
  return (
    <div
      className={clsx(className, "transform scale-[1.7]")}
    >
      <SvgIcon className={className}>
        <circle cx="12" cy="12" r="12" />
        <text className={`text-xs ${active ? 'text-blue' : 'text-white'}`} x="12" y="16" textAnchor="middle">
          {icon}
        </text>
      </SvgIcon>
    </div>
  )
}

const CustomStepper = ({ steps, selectedStep, onChangeStep }) => {
  const stepperClasses = stepperStyles()
  return (
    <Stepper classes={stepperClasses} activeStep={selectedStep} alternativeLabel connector={<Connector />}>
      {steps.map((label, index) => (
        <Step key={label} onClick={() => onChangeStep(index)}>
          <StepLabel
            classes={{
              alternativeLabel: stepperClasses.alternativeLabel,
              active: stepperClasses.active,
              completed: stepperClasses.completed,
            }}
            StepIconComponent={StepIcon}
            icon={index + 1}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CustomStepper

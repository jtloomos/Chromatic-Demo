import React from 'react'
import { useForm, useStep } from 'react-hooks-helper'

import Names from './Names'
import Address from './Address'
import Submit from './Submit'

const steps = ['names', 'address', 'submit']

const defaultData = {
  firstName: 'Jane',
  lastName: 'Doe',
  nickName: 'Jannie',
  address: '200 South Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '90505',
  email: 'email@domain.com',
  phone: '+61 4252 454 332',
}

const getCurrentStep = (step: string, props: any) => {
  switch (step) {
    case 'names':
      return <Names {...props} />
    case 'address':
      return <Address {...props} />
    case 'submit':
      return <Submit {...props} />
    default:
      return null
  }
}

const StepIndicator = ({ index, amount }: any) => {
  const progress = `${(index / amount) * 100}%`
  console.log(amount)
  return (
    <div style={{ marginBottom: '2rem' }}>
      <small>
        Step {index} of {amount}
      </small>
      <div
        style={{
          width: '100%',
          background: 'grey',
          height: '2px',
        }}
      >
        <div
          style={{
            width: progress,
            background: 'black',
            height: '2px',
            transition: 'width .5s ease-in-out',
          }}
        />
      </div>
    </div>
  )
}

const MultiStepForm = () => {
  const [formData, setForm] = useForm(defaultData)
  const { step, navigation, index } = useStep({ initialStep: 0, steps })

  const props = { formData, setForm, navigation }
  const currentIndex = index + 1
  const hasReachedLastStep = currentIndex >= steps.length
  return (
    <div>
      {!hasReachedLastStep && (
        <StepIndicator index={currentIndex} amount={steps.length} />
      )}
      {getCurrentStep(step.toString(), props)}
    </div>
  )
}

export default MultiStepForm

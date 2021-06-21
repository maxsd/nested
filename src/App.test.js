import { render, screen } from '@testing-library/react'
import App from './App'

test('renders continue button', () => {
  render(<App />)
  const continueButton = screen.getByText('Continue')
  expect(continueButton).toBeInTheDocument()
})

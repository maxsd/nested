import './App.css'
import Steps from './components/Steps'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex p-5 flex-col items-center">
        <Steps />
      </div>
    </QueryClientProvider>
  )
}

export default App

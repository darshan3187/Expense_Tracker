import { Outlet } from 'react-router-dom'
import './App.css'
import { Header, SlideBar } from './components'
import Expenses from './pages/Expense'

function App() {

  return (
    <div className='w-full'>
      <Header />
      <SlideBar />
      <Expenses />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatScreen from './screens/ChatScreen'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path='/chat' element={<ChatScreen />} />
      </Routes>
    </Router>
  )
}

export default App
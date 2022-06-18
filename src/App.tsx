import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Box} from "@mui/material";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <p className={'text-red-500'}>Hello</p>
    </Box>
  )
}

export default App

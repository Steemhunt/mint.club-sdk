import React from 'react'
import { useMyHook } from 'mint.club-sdk'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
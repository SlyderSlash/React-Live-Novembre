import './App.css'
import { useState } from 'react'
import Papillon from './Components/Papillon'

function App() {
  const [favoriteAdvice, setFavoriteAdvice] = useState([])

  const addFavoriteAdvice = idAdvice => idAdvice  || !favoriteAdvice.includes(idAdvice)
      ? setFavoriteAdvice([idAdvice, ...favoriteAdvice])
      : false

  const removeFavoriteAdvice = (idAdvice) => {
    if(!idAdvice) return false
    setFavoriteAdvice(favoriteAdvice.splice(favoriteAdvice.findIndex(idAdvice),1))
  }

  const getFavoriteAdvice = (index) => {
    if(!index) return favoriteAdvice
    return (favoriteAdvice.length - 1) >= index 
      ? favoriteAdvice[index]
      : false
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello le monde
        </p>
        <Papillon 
          baseButterfly={42} 
          aFA={addFavoriteAdvice} 
          rFA={removeFavoriteAdvice} 
          gFA={getFavoriteAdvice} 
          favoriteAdvice={favoriteAdvice}
        />
      </header>
    </div>
  );
}

export default App;
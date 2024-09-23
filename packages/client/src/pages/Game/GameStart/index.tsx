import React from 'react'
import './gameStart.css'

interface GameStartProps {
  onStart: () => void
  onBackToMenu: () => void
}

const GameStart: React.FC<GameStartProps> = ({ onStart, onBackToMenu }) => {
  React.useEffect(() => {
    window.addEventListener('keypress', onStart)
    return () => {
      window.removeEventListener('keypress', onStart)
    }
  }, [])

  return (
    <section className="game-start">
      <div className="game-start-wrap">
        <h2 className="game-start-title">Начать игру</h2>
        <p className="blinking-text">
          Нажмите любую клавишу, чтобы начать игру
        </p>
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          Выйти в главное меню
        </button>
      </div>
    </section>
  )
}

export default GameStart

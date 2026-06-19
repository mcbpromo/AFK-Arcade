import { useCallback } from 'react'
import { GameProvider, useGame } from '@/lib/gameState'
import StreamerBanner from '@/components/game/StreamerBanner'
import LandscapeLayout from '@/components/game/LandscapeLayout'
import MobileLayout from '@/components/game/MobileLayout'
import { useTikTokChat } from '@/hooks/useTikTokChat'

function GameWithChat() {
  const { submitWord } = useGame()

  const onWord = useCallback((word, username) => {
    submitWord(word, username)
  }, [submitWord])

  useTikTokChat(onWord)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f1a', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <StreamerBanner />
       </div>
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'flex-start',
        overflowX: 'auto',
      }}>
        <LandscapeLayout />
        <MobileLayout />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <GameWithChat />
    </GameProvider>
  )
}
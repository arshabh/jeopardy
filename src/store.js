import { Store } from 'pullstate'
import data from './questions.json'

export const store = new Store({
  data: data,
  players: [
    { name: 'tanvi', score: 0 },
    { name: 'amit', score: 0 },
    { name: 'vrinda', score: 0 },
    { name: 'vinay', score: 0 }
  ]
});


store.createReaction(s => s.players, (players, draft, original) => {
  const maxScore = Math.max(...players.map(p => p.score))
  draft.players.forEach(player => {
    player.king = player.score == maxScore
  })
})

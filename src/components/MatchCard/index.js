import './index.css'

const MatchCard = props => {
  const {recentMatches} = props
  const {competingTeam, matchStatus, result, competingTeamLogo} = recentMatches

  return (
    <li>
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

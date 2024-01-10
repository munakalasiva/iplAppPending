import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {name, id, teamImageUrl} = teamCardDetails

  return (
    <li className="list-item">
      <Link to={`/team-matches/${id}`} className="adj">
        <img src={teamImageUrl} alt={name} className="card-img" />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard

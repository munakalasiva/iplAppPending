import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getFormattedData = latest => ({
    umpires: latest.umpires,
    result: latest.result,
    manOfTheMatch: latest.man_of_the_match,
    id: latest.id,
    date: latest.date,
    venue: latest.venue,
    competingTeam: latest.competing_team,
    competingTeamLogo: latest.competing_team_logo,
    firstInnings: latest.first_innings,
    secondInnings: latest.second_innings,
    matchStatus: latest.match_status,
  })

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachItem =>
        this.getFormattedData(eachItem),
      ),
    }
    this.setState({teamData: formattedData, isLoading: false})
  }

  renderRecentMatches = () => {
    const {teamData} = this.state
    const {recentMatches} = teamData
    return (
      <ul>
        {recentMatches.map(eachOne => (
          <MatchCard key={eachOne.id} recentMatches={eachOne} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamData
    return (
      <div>
        <img src={teamBannerUrl} alt="team" />

        <LatestMatch
          key={latestMatchDetails.id}
          latestMatchDetails={latestMatchDetails}
        />
        {this.renderRecentMatches()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderTeamMatches()}</div>
    )
  }
}
export default TeamMatches

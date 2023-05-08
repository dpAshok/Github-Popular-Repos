import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstant = {
  success: 'initial',
  failure: 'failure',
  inProcess: 'inProcess',
  initial: 'initial',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    respositoryList: [],
    ActiveLangaugeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstant.initial,
  }

  activeLanguage = activeId => {
    this.setState({ActiveLangaugeId: activeId}, this.getData)
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {ActiveLangaugeId} = this.state
    this.setState({apiStatus: apiStatusConstant.inProcess})

    const url = `https://apis.ccbp.in/popular-repos?language=${ActiveLangaugeId}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const UpdatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        respositoryList: UpdatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
      console.log('ashok')
    }
  }

  renderSuccessView = () => {
    const {respositoryList} = this.state
    return (
      <ul className="cards_container">
        {respositoryList.map(eachItem => (
          <RepositoryItem eachRepository={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderfailureView = () => (
    <div className="failure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderfailureView()
      case apiStatusConstant.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {ActiveLangaugeId} = this.state
    return (
      <>
        <div className="githubContainer">
          <h1 className="header">Popular</h1>
          <ul className="language_container">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                eachLanguage={eachLanguage}
                key={eachLanguage.id}
                activeLanguage={this.activeLanguage}
                isClicked={eachLanguage.id === ActiveLangaugeId}
              />
            ))}
          </ul>
          {this.renderDetails()}
        </div>
      </>
    )
  }
}

export default GithubPopularRepos

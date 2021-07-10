import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConst = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: 'ALL',
    apiStatus: apiStatusConst.initial,
    productsData: [],
  }

  componentDidMount() {
    this.getLanguages()
  }

  onChangeLanguage = language => {
    this.setState({activeLanguage: language}, this.getLanguages)
  }

  onRepoFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="repo-fail-image"
        alt="failure view"
      />
    </div>
  )

  onRenderSuccess = () => {
    const {productsData} = this.state
    return (
      <ul className="repository-container">
        {productsData.map(eachItem => (
          <RepositoryItem key={eachItem.id} item={eachItem} />
        ))}
      </ul>
    )
  }

  onLoading = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderLanguages = () => {
    const {activeLanguage} = this.state
    return (
      <div className="language-container">
        <ul className="language-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              item={eachLanguage}
              onChangeLanguage={this.onChangeLanguage}
              activeLanguageId={activeLanguage}
            />
          ))}
        </ul>
      </div>
    )
  }

  getLanguages = async () => {
    this.setState({apiStatus: apiStatusConst.loading})
    const {activeLanguage} = this.state

    const response = await fetch(`${apiUrl}${activeLanguage}`)
    const data = await response.json()

    if (response.ok) {
      const formattedData = data.popular_repos.map(item => ({
        id: item.id,
        imageUrl: item.avatar_url,
        name: item.name,
        starsCount: item.stars_count,
        forksCount: item.forks_count,
        issuesCount: item.issues_count,
      }))

      this.setState({
        apiStatus: apiStatusConst.success,
        productsData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failed})
    }
  }

  onRenderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.success:
        return this.renderSuccess()
      case apiStatusConst.failed:
        return this.onRepoFailure()
      case apiStatusConst.loading:
        return this.onLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-repos-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguages()}
        {this.onRenderRepository()}
      </div>
    )
  }
}
export default GithubPopularRepos

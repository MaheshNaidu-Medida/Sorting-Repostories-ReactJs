import './index.css'

const RepositoryItem = props => {
  const {item} = props

  return (
    <li className="language-item">
      <img src={item.imageUrl} className="language-image" alt={item.name} />
      <h1 className="language">{item.name}</h1>
      <div className="language-status-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="status-icon"
          alt="stars"
        />
        <p className="language-status">{item.starsCount} stars</p>
      </div>
      <div className="language-status-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="status-icon"
          alt="forks"
        />
        <p className="language-status">{item.forksCount} forks</p>
      </div>
      <div className="language-status-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="status-icon"
          alt="open-issues"
        />
        <p className="language-status">{item.issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

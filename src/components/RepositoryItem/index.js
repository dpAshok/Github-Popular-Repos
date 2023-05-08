// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepository} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = eachRepository
  return (
    <>
      <li className="card_container">
        <img src={avatarUrl} alt={name} />
        <h1>{name}</h1>
        <div className="information_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="information_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="information_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </li>
    </>
  )
}

export default RepositoryItem

// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, activeLanguage, isClicked} = props
  const {language, id} = eachLanguage
  const btnClassName = isClicked ? 'btn-style' : 'activeButton'

  const onClickButton = () => {
    activeLanguage(id)
  }
  return (
    <>
      <li className="list_Items">
        <button type="button" className={btnClassName} onClick={onClickButton}>
          {language}
        </button>
      </li>
    </>
  )
}

export default LanguageFilterItem

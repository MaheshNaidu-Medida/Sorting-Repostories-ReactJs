import './index.css'

const LanguageFilterItem = props => {
  const {item, activeLanguageId, onChangeLanguage} = props

  const onClickButton = () => onChangeLanguage(item.id)
  const activeLangStyle = activeLanguageId === item.id ? 'selected' : 'lang-btn'
  return (
    <li>
      <button className={activeLangStyle} type="button" onClick={onClickButton}>
        {item.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

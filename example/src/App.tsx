import React,{useState} from 'react'
import LanguageSelector, {languageType} from '@kekalma/language-selector'
import { languageContext } from './context'
import Info from './Info'

const languages: languageType[] = [
  {
    "code": "hu","name": "Hungarian"
  },
  {
    "code": "de","name": "German"
  },
  {
    "code": "en","name": "English","flag": "gb"
  },
  {
    "code": "fr","name": "French","flag": "fr"
  },
  {
    "code": "es","name": "Spanish","flag": "es"
  }
]

export default function App() {
  const emptyLanguage: languageType = {
    code: "",
    name: "",
    flag: ""
  }
  const [selectedLanguage, setSelectedLanguage] = useState(emptyLanguage);

  return (
    <React.Fragment>
      <languageContext.Provider value={{language: selectedLanguage, setLanguage: setSelectedLanguage}}>
      <h1>This is an Example project for @kekalma/language-selector development</h1>
      <ul>
        <LanguageSelector
            languages={languages}
            selectedLanguageCode="hu"
            context={languageContext}
            menuFormat="|Flag| |Name|"
            titleFormat="|Flag| |Name|"
            format="horizontal"
            align="left"

        />
      </ul>
        <Info/>
      </languageContext.Provider>
    </React.Fragment>
  ) 
}
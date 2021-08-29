import React,{useState} from 'react'
import LanguageSelector, {languageType} from '@kekalma/language-selector'
import { languageContext } from './context'
import Info from './Info'

const languages: languageType[] = [
  {
    "code": "hu",
    "name": "Magyar"
  },
  {
    "code": "de",
    "name": "Deutsch"
  },
  {
    "code": "en",
    "name": "English",
    "flag": "gb"
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
          menuFormat="|Flag| |Name| (|Code|)"
          titleFormat="|Flag| |Name|"
          format="linear"
          align="left"
            
        />
      </ul>
        <Info/>
      </languageContext.Provider>
    </React.Fragment>
  ) 
}
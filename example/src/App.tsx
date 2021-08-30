import React,{useState} from 'react'
import LanguageSelector, { emptyLanguage } from '@kekalma/language-selector'
import type {languageType} from '@kekalma/language-selector'
import { languageContext } from './context'
import Info from './Info'
import { languages } from './languageList'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(emptyLanguage);
  const switchHandler = (newLang: languageType, oldLang: languageType) => {
    console.log("The language has been changed: ", oldLang.name, " -> ", newLang.flag)
  }
  return (
    <languageContext.Provider value={{language: selectedLanguage, setLanguage: setSelectedLanguage}}>
    <h1>This is an Example project for @kekalma/language-selector development</h1>
    <ul>
      <LanguageSelector
          languages={languages}
          selectedLanguageFlag="hu"
          context={languageContext}
          titleFormat="|Flag| |Name|"
          menuFormat="|Flag| |Name|"
          format="dropdown-ordered"
          align="left"
          onLanguageChange={switchHandler}
      />
    </ul>
      
    </languageContext.Provider>
  ) 
}
import React,{useState} from 'react'
import {LanguageSelector as Language, emptyLanguage} from '@kekalma/language-selector'
import type { languageType } from '@kekalma/language-selector'
import { languageContext } from './context'
import Info from './Info'
import { languages } from './languageList'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<languageType>(emptyLanguage)
  const changeHandler = (newLang: languageType, oldLang: languageType):void => {
    console.log(`The language has been changed:  ${oldLang.name}(${oldLang.flag}) -> ${newLang.name}(${newLang.flag})`)
  }
  return (
    <languageContext.Provider value={{language: selectedLanguage, setLanguage: setSelectedLanguage}}>
      <h1>This is an Example project for @kekalma/language-selector development</h1>
      <Info context={languageContext}/>
      <ul>
        <Language
            languages={languages}
            selectedLanguageFlag="us"
            context={languageContext}
            onLanguageChange={changeHandler}
        />
      </ul>
      
    </languageContext.Provider>
  ) 
}
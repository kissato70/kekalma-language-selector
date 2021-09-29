import React, {useContext} from 'react'
import { languageContext } from './context'
import {languageContextType} from '@kekalma/language-selector'

type myProps = { context: React.Context<languageContextType> }

export default function Info(props : myProps) {
  const { language : selectedLanguage } = useContext(props.context)
  return (
    <span style={{margin: "0 5px"}}>Selected language: {selectedLanguage.name} ({selectedLanguage.code}_{selectedLanguage.flag})</span>
  )
}
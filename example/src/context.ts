import React from 'react'
import type {languageType, languageContextType } from '@kekalma/language-selector'
import {emptyLanguage } from '@kekalma/language-selector'

export const languageContext = React.createContext<languageContextType<languageType, () => {}>>({
  language: emptyLanguage,
  setLanguage: (value: languageType):void =>{}
})

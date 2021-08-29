import React from 'react'
import type {languageType, languageContextType } from '@kekalma/language-selector'

export const languageContext = React.createContext<languageContextType<languageType, () => {}>>({
  language: {
    code: "",
    name: "",
    flag: ""
  },
  setLanguage: (value: languageType):void =>{}
})

import React, {useContext} from 'react'
import {languageContext}  from './context'

export default function Info()
{
  const lang = useContext(languageContext)
  return (
    <React.Fragment>
      <span style={{margin: "0 5px"}}>Selected language: {lang.language.name}</span>
    </React.Fragment>
  )
}
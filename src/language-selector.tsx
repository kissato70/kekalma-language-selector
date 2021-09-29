import React, { CSSProperties, useContext, useState, useEffect } from "react";
import './Menu.css'
import Flag from 'national-flag-icons';
import type { flagCodeType } from "national-flag-icons";

export type languageType = {
  code: string,
  name: string,
  flag?: string
}

export type { flagCodeType }

export const emptyLanguage: languageType = {
  code: "",
  name: "",
  flag: ""
}

export type languageContextType = {
  language : languageType,
  setLanguage : (T: languageType) => void
}

export type languageProps = {
  languages: languageType[],
  selectedLanguageFlag?: flagCodeType,
  context?: React.Context<languageContextType>,
  onLanguageChange?: (N: languageType, O: languageType) => void,
  menuFormat?: string,
  titleFormat?: string,
  align?: "left" | "right" | "center" | "auto" | "center auto",
  format?: "dropdown" | "dropdown-ordered" | "flat" | "flat-reverse" | "linear" | "linear-ordered" | "horizontal" | "horizontal-reverse" ,
  titleFont?: string,
  titleFontColor?: string,
  titleFontColorHover?: string,
  titleBgColor?: string,
  titleBgColorHover?: string,
  titleFlagSize?: number,
  menuFont?: string,
  menuFontColor?: string,
  menuFontColorHover?: string,
  menuFontColorSelected?: string,
  menuBgColor?: string,
  menuBgColorHover?: string,
  menuBgColorSelected?: string,
  menuFlagSize?: number,
  menuStyleSelected?: CSSProperties,
  titleStyle?: CSSProperties,
  menuStyle?: CSSProperties,
  style?: CSSProperties
}
type myState = {
  selectedLanguage: languageType,
  languages: languageType[]
}

export function  getLanguageByCode (languages: languageType[], code : flagCodeType): languageType { 
  let selectedLanguage = languages.filter((language) => (language.flag === code as string || language.code === code as string))
  return selectedLanguage[0] || emptyLanguage
}


// =====================================================================================
export function LanguageSelector(props: languageProps) {
  let [_language, _setLanguage] = useState(emptyLanguage)
  let setLanguage: languageContextType['setLanguage']
  if (props.context) {
    ({ setLanguage } = useContext(props.context))
  }
  const languages = props.languages;

  

  useEffect(() => {
    const initLang = getLanguageByCode(props.languages, props.selectedLanguageFlag as flagCodeType || props.languages[0].flag as flagCodeType || props.languages[0].code as flagCodeType)
    _setLanguage(initLang)
    if (props.context) setLanguage(initLang)
  }, [props.selectedLanguageFlag])

  const changeHandler = (newLanguage: languageType) => {
    let oldLanguage = _language;
    _setLanguage(newLanguage)
    if (props.context )setLanguage(newLanguage)
    if (props.onLanguageChange && newLanguage !== oldLanguage) props.onLanguageChange(newLanguage, oldLanguage)
  }

  const menuItemFormatter = (formatString: string, langItem: languageType, keyString: string, flagSize: number) => {
    if (langItem.flag === undefined) langItem.flag = langItem.code;
    let formatArray = formatString.split("|");
    let jsxArray: JSX.Element[] = [];
    if (langItem.flag) {
      formatArray.map((f, fn) => {
        let flagCode = langItem.flag as flagCodeType || langItem.code as flagCodeType
        if (f.toUpperCase() === "FLAG") {
          jsxArray.push(<Flag key={keyString + "-flag" + fn.toString()} flagCode={flagCode} height={flagSize} />); return f;
        }
        if (f.toUpperCase() === "CODE") { jsxArray.push(<span key={keyString + "-langCode" + fn.toString()}>{langItem.code}</span>); return f; }
        if (f.toUpperCase() === "FLAGCODE") { jsxArray.push(<span key={keyString + "-flagCode" + fn.toString()}>{langItem.flag}</span>); return f; }
        if (f.toUpperCase() === "NAME") { jsxArray.push(<span key={keyString + "-langName" + fn.toString()}>{langItem.name}</span>); return f; }
        if (f !== "") jsxArray.push(<span key={keyString + "-langSpan" + fn.toString()}>{f}</span>);
        return f;
      });
    }
    return jsxArray;
  }

  const selectedLanguageTitle = menuItemFormatter(
    props.titleFormat || props.menuFormat || "|Flag|",
    _language,
    "selectedLanguage",
    props.titleFlagSize || 14
  );
  let orderedList: Array<JSX.Element> = []
  let languageList = languages.map((langItem: languageType, ln) => {
    let ln_key = "LM" + ln.toString();
    let lmi = menuItemFormatter(
      props.menuFormat || "|Flag| |Name|",
      langItem,
      ln_key,
      props.menuFlagSize || 14
    );
    const selected = langItem.flag === _language.flag ? "selected" : ""
    let languageMenuItem =
      <div key={"lmenus_" + ln_key}>
        {lmi}
      </div>;
    const selectedStyle = langItem.code === _language.code ? props.menuStyleSelected : {}
    const item = <li key={"langMenuItems_" + ln_key} onClick={() => changeHandler(langItem)} className={selected} style={{ ...selectedStyle }} >{languageMenuItem}</li>;
    if (selected === "selected") {
      orderedList = Array(item).concat(orderedList)
    } else {
      orderedList.push(item)
    }
    if (props.format && props.format.split("-")[1] === "ordered" && selected === "selected") {
      return null
    } else {
      return item
    }
  });

  let menuFormatStyle: CSSProperties
  switch (props.format) {
    case "flat": menuFormatStyle = { flexFlow: "row" }; break;
    case "flat-reverse": menuFormatStyle = { flexFlow: "row-reverse", left: "initial", right: 0 }; break;
    case "horizontal": menuFormatStyle = { flexFlow: "row", top: 0 }; break;
    case "horizontal-reverse": menuFormatStyle = { flexFlow: "row-reverse", top: 0, left: "initial", right: 0 }; break;
    default: menuFormatStyle = { flexFlow: "column" };
  }

  let titleVisible: CSSProperties = { }
  let menuVisible: CSSProperties = { }
  
  if (props.format && props.format.split("-")[0] === "linear") {
    titleVisible = { display: "none" }
    menuVisible = {display: "flex", flexFlow: "row" }
  }

  const titleStyle = {
    font: props.titleFont || "initial",
    "--titleFontColor": `${props.titleFontColor || ""}`,
    "--titleFontColorHover": `${props.titleFontColorHover || ""}`,
    "--titleBgColor": `${props.titleBgColor || ""}`,
    "--titleBgColorHover": `${props.titleBgColorHover || ""}`
  }

  const menuStyle = {
    font: props.menuFont || "initial",
    "--menuFontColor": `${props.menuFontColor || ""}`,
    "--menuFontColorHover": `${props.menuFontColorHover || ""}`,
    "--menuFontColorSelected": `${props.menuFontColorSelected || ""}`,
    "--menuBgColor": `${props.menuBgColor || ""}`,
    "--menuBgColorHover": `${props.menuBgColorHover || ""}`,
    "--menuBgColorSelected": `${props.menuBgColorSelected || ""}`
  }

  if (props.format && (props.format === "linear-ordered" || props.format.split("-")[0] === "horizontal")) {
    languageList = orderedList
  }

  return (
    <React.Fragment>
      <li key={"languagelist"} className={"languageList " + props.align || "left"} style={{ ...titleStyle, ...props.style }}>
        <section style={{ ...props.titleStyle, ...titleVisible}}>{selectedLanguageTitle}</section>
        <ul className={"submenu"} style={{ ...menuFormatStyle,...menuStyle, ...props.menuStyle, ...menuVisible  }}>{languageList}</ul>
      </li>
    </React.Fragment>
  );
}
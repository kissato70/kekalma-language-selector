import React, { CSSProperties, useContext, useState, useEffect } from "react";
import './Menu.css'
import Flag from 'national-flag-icons';
import type { flagCodeType } from "national-flag-icons";

export type languageType = {
  code: string,
  name: string,
  flag?: string
}

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
  selectedLanguageFlag?: string,
  context: React.Context<languageContextType>,
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
  style?: CSSProperties,
  onLanguageChange?: (N: languageType, O: languageType) => void
}
type myState = {
  selectedLanguage: languageType,
  languages: languageType[]
}


// =====================================================================================
export function LanguageSelector(props: languageProps) {
  const { language, setLanguage } = useContext(props.context)

  const languages = props.languages;
  if (!props.selectedLanguageFlag) {
    props.selectedLanguageFlag = languages[0].flag || languages[0].code;
  }
  let selectedLang: languageType[] = languages.filter((lang: languageType) => {
    return lang.flag === props.selectedLanguageFlag || lang.code === props.selectedLanguageFlag ;
  });

  useEffect(() => {
    setLanguage(selectedLang[0])
  }, [setLanguage, props.selectedLanguageFlag])
  
  const [selectedLanguage, setSelectedLanguage] = useState<myState["selectedLanguage"]>(selectedLang[0]);

  const languageChange = (newLanguage: languageType) => {
    let oldLanguage = selectedLanguage;
    setLanguage(newLanguage)
    setSelectedLanguage(newLanguage);
    if (props.onLanguageChange && newLanguage !== oldLanguage) {
      props.onLanguageChange(newLanguage, oldLanguage);
    }
  }

  const menuItemFormatter = (formatString: string, langItem: languageType, keyString: string, flagSize: number) => {
    if (langItem.flag === undefined) langItem.flag = langItem.code;
    let formatArray = formatString.split("|");
    let jsxArray: any[] = [];
    formatArray.map((f, fn) => {
      let flagCode = langItem.flag as flagCodeType;
      if (f.toUpperCase() === "FLAG") {    
        jsxArray.push(<Flag key={keyString + "-flag" + fn.toString()} flagCode={flagCode} height={flagSize} />); return f;
      }
      if (f.toUpperCase() === "CODE") { jsxArray.push(<span key={keyString + "-langCode" + fn.toString()}>{langItem.code}</span>); return f; }
      if (f.toUpperCase() === "FLAGCODE") { jsxArray.push(<span key={keyString + "-flagCode" + fn.toString()}>{langItem.flag}</span>); return f; }
      if (f.toUpperCase() === "NAME") { jsxArray.push(<span key={keyString + "-langName" + fn.toString()}>{langItem.name}</span>); return f; }
      if (f !== "") jsxArray.push(<span key={keyString + "-langSpan" + fn.toString()}>{f}</span>);
      return f;
    });
    return jsxArray;
  }

  const selectedLanguageTitle = menuItemFormatter(
    props.titleFormat || props.menuFormat || "|Flag|",
    selectedLanguage,
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
    const selected = langItem.flag === selectedLanguage.flag ? "selected" : ""
    let languageMenuItem =
      <div key={"lmenus_" + ln_key}>
        {lmi}
      </div>;
    const selectedStyle = langItem.code === selectedLanguage.code ? props.menuStyleSelected : {}
    const item = <li key={"langMenuItems_" + ln_key} onClick={() => languageChange(langItem)} className={selected} style={{ ...selectedStyle }} >{languageMenuItem}</li>;
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
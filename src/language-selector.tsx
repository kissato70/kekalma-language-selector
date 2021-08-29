import React, { CSSProperties, FC, useState } from "react";
import './Menu.css'
import Flag from 'national-flag-icons';
import type { flagCodeType } from "national-flag-icons";

export type languageType = {
  code: string,
  name: string,
  flag?: string
}

export type languageContextType<T, F> = {
  language : T,
  setLanguage : (value: T) => void
}

export type languageProps = {
  languages: languageType[],
  selectedLanguageCode?: string,
  context: React.Context<languageContextType<languageType, ()=>{}>>,
  menuFormat?: string,
  titleFormat?: string,
  align?: "left" | "right" | "center" | "auto" | "center auto",
  format?: "dropdown" | "flat" | "flat-reverse" | "linear" | "linear-place",
  switchHandler?: Function,
  titleFont?: string,
  titleFontColor?: string,
  titleFontColorHover?: string,
  titleBgColor?: string,
  titleBgColorHover?: string,
  titleFlagSize?: number,
  menuFont?: string,
  menuFontColor?: string,
  menuFontColorHover?: string,
  menuBgColor?: string,
  menuBgColorHover?: string,
  menuFlagSize?: number,
  titleStyle?: CSSProperties,
  menuStyle?: CSSProperties,
  style?: CSSProperties
}
type myState = {
  selectedLanguage: languageType,
  languages: languageType[]
}

type myProps = languageProps &
{
  onLanguageChange?: Function,
  languages: languageType[]   // Overloaded. Reason: it is not optional here!
};


// =====================================================================================
export default function LanguageSelector(props: myProps) {
  const languages = props.languages;
  if (!props.selectedLanguageCode) {
    props.selectedLanguageCode = languages[0].code;
  }
  let selectedLang: languageType[] = languages.filter((lang: languageType) => {
    return lang.code === props.selectedLanguageCode;
  });
  
  const [selectedLanguage, setSelectedLanguage] = useState<myState["selectedLanguage"]>(selectedLang[0]);

  const languageChange = (newLanguage: languageType) => {
    let oldLanguage = selectedLanguage;
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
      if (f.toUpperCase() === "FLAG") {
        let flagCode = langItem.flag as flagCodeType;
        jsxArray.push(<Flag key={keyString + "-flag" + fn.toString()} flagCode={flagCode} height={flagSize} />); return f;
      }
      if (f.toUpperCase() === "CODE") { jsxArray.push(<span key={keyString + "-langCode" + fn.toString()}>{langItem.code}</span>); return f; }
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
  const langMenus = languages.map((langItem: languageType, ln) => {
    let lns = "languageMenus" + ln.toString();
    let lmi = menuItemFormatter(
      props.menuFormat || "|Flag| |Name| (|Code|)",
      langItem,
      lns,
      props.menuFlagSize || 14
    );
    let languageMenuItem =
      <div key={"lmenus" + lns}>
        {lmi}
      </div>;
    return <li key={"langMenuItems" + lns} onClick={() => languageChange(langItem)}>{languageMenuItem}</li>;
  });

  let menuFormatStyle: CSSProperties
  switch (props.format) {
    case "flat": menuFormatStyle = { flexFlow: "row" }; break;
    case "flat-reverse": menuFormatStyle = { flexFlow: "row-reverse" }; break;
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
    "--menuBgColor": `${props.menuBgColor || ""}`,
    "--menuBgColorHover": `${props.menuBgColorHover || ""}`
  }

  return (
    <React.Fragment>
      <li key={"languagelist"} className={"languageList " + props.align || "left"} style={{ ...titleStyle, ...props.style }}>
        <section style={{ ...props.titleStyle, ...titleVisible}}>{selectedLanguageTitle}</section>
        <ul className={"submenu"} style={{ ...menuFormatStyle,...menuStyle, ...props.menuStyle, ...menuVisible  }}>{langMenus}</ul>
      </li>
    </React.Fragment>
  );
}
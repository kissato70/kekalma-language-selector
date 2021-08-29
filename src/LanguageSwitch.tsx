import React from 'react';
import { RouteProps, Switch, Router, LinkProps, RouterProps } from 'react-router-dom';

type myProps = {
  
}

type rProps = {

}

const languageCode = "hu";

export const LanguageSwitch: React.FC<myProps> = ( {children }) =>
{
  return (
    <Switch>
      {
        React.Children.map(children, child =>
          React.isValidElement<RouteProps>(child) ?
            React.cloneElement(child, {
              ...child.props,
              path: localizedRouterPath(languageCode, child.props.path)
            })
            : child
        )}
    </Switch>
  );
  function localizedRouterPath(languageCode: string, path?: string | readonly string[])
  {
    switch (typeof path)
    {
      case 'undefined':
        return undefined;
      case 'object':
        return path.map(p => `/${languageCode}` + p);
      default:
        const isFallbackRoute = path === '*';
        let result = isFallbackRoute ?
          path
          : `/${languageCode}` + path;
        //console.log(path," ====> ",result);
        return result;
    }
  }
};

export const LinkSwitch: React.FC = ({ children }) =>
{
  return (
    <>
      {
        React.Children.map(children, child =>
          React.isValidElement<LinkProps>(child) ?
            React.cloneElement(child, {
              ...child.props,
              to: localizedLinkPath(languageCode, child.props.to)
            })
            : child
        )}
    </>
  );
  function localizedLinkPath(languageCode: string, path?: any)
  {
    switch (typeof path)
    {
      case 'undefined':
        return undefined;
      default:
        const isFallbackRoute = path === '*';
        let result = isFallbackRoute ?
          path
          : `/${languageCode}` + path;
        //console.log(path," -----> ",result);
        return result;
    }
  }

}
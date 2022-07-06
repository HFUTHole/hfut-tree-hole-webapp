import { matchPath } from 'react-router-dom'

export function getActive(path: string, pathname: string) {
  return path ? !!matchPath({ path, end: false }, pathname) : false
}

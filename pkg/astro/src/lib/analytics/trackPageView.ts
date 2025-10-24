import { detectBrowser, detectOS, getSizeBallpark } from './browserUtils'
import { getSessionId } from './getSessionId'

export function trackPageView() {
  fetch('/api/view.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getInfo()),
    mode: 'no-cors',
  })
}

export type PageViewInfo = ReturnType<typeof getInfo>

export function getInfo() {
  return {
    browser: detectBrowser(window.navigator.userAgent),
    os: detectOS(window.navigator.platform, window.navigator.userAgent),
    screenWidth: getSizeBallpark(window.screen?.width || window.innerWidth),
    screenHeight: getSizeBallpark(window.screen?.height || window.innerHeight),
    pixelDensity: window.devicePixelRatio,
    sessionId: getSessionId(window),
    pathname: window.location.pathname,
    referrer: document.referrer,
  }
}

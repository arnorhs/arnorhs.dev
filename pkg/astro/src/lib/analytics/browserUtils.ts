// Note: these are pretty shitty and I don't remember if chat gpt made them or if I
// found them on stack overflow etc.. if you find out, please let me know and I can
// give proper credit where it's due!

export function detectBrowser(userAgent: string) {
  // Order is important
  if (/Edg\//.test(userAgent)) {
    return 'Edge'
  } else if (/OPR\//.test(userAgent)) {
    return 'Opera'
  } else if (/Chrome\//.test(userAgent)) {
    return 'Chrome'
  } else if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) {
    return 'Safari'
  } else if (/Firefox\//.test(userAgent)) {
    return 'Firefox'
  } else if (/MSIE |Trident\//.test(userAgent)) {
    return 'Internet Explorer'
  }
  return 'Unknown'
}

export function detectOS(platform: string, userAgent: string) {
  if (/Win/.test(platform)) {
    return 'Windows'
  } else if (/Mac/.test(platform)) {
    return 'MacOS'
  } else if (/Linux/.test(platform)) {
    return 'Linux'
  } else if (/Android/.test(userAgent)) {
    return 'Android'
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    return 'iOS'
  }
  return 'Unknown'
}

export function getSizeBallpark(size: number) {
  return Math.round(size / 100) * 100
}

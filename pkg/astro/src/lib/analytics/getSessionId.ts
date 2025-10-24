let id: string | undefined | null

const MAX_AGE = 1000 * 60 * 60
const MAX_AGE_BUMP = MAX_AGE * 0.3
const SESSION_KEY = 'arnorhs_ses'

type SessionInfo = {
  id: string
  createdAt: number
}

/**
 * This creates an anonymous session ID, only used for identifying the same user
 * during a single tab browsing session. If they open a new tab or window, that
 * will create a new session ID - so this basically allows me to count sort-of-unique
 * page views, without needing a cookie consent etc.
 *
 * The session has a max age of MAX_AGE, after which a new ID will be created. If you
 * navigate within that time frame, however, we will keep the same session ID but
 * bump the createdAt timestamp.
 */
export function getSessionId(window: typeof globalThis) {
  const str = window.sessionStorage.getItem(SESSION_KEY)

  let session = parseAndValidateSessionInfo(str)

  if (!session || session.createdAt + MAX_AGE < Date.now()) {
    session = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } else if (session.createdAt + MAX_AGE_BUMP < Date.now()) {
    session = {
      ...session,
      createdAt: Date.now(),
    }
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }

  return session.id
}

function parseAndValidateSessionInfo(str: string | null) {
  if (!str) {
    return null
  }

  try {
    const data = JSON.parse(str) as unknown

    return isValidSessionObject(data) ? data : null
  } catch (e) {
    return null
  }
}

function isValidSessionObject(data: unknown): data is SessionInfo {
  if (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    typeof data.id === 'string' &&
    'createdAt' in data &&
    typeof data.createdAt === 'number'
  ) {
    return true
  }
  return false
}

export interface UserSession {
  username: string
  email: string
  loginTime: string
  isAuthenticated: boolean
}

export interface SessionValidation {
  isValid: boolean
  session?: UserSession
  error?: string
}

export class SessionManager {
  private static readonly SESSION_KEY = "user_session"
  private static readonly LOGIN_SUCCESS_KEY = "loginSuccess"

  static createSession(username: string, email: string): UserSession {
    const session: UserSession = {
      username,
      email,
      loginTime: new Date().toISOString(),
      isAuthenticated: true,
    }

    // Store in localStorage for persistence
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))

    // Store login success flag in sessionStorage
    sessionStorage.setItem(this.LOGIN_SUCCESS_KEY, "true")

    return session
  }

  static validateSession(): SessionValidation {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY)

      if (!sessionData) {
        return {
          isValid: false,
          error: "No session found",
        }
      }

      const session: UserSession = JSON.parse(sessionData)

      // Check if session is valid (you can add more validation logic here)
      if (!session.isAuthenticated || !session.username) {
        return {
          isValid: false,
          error: "Invalid session data",
        }
      }

      // Check if session is not too old (optional - 24 hours)
      const loginTime = new Date(session.loginTime)
      const now = new Date()
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

      if (hoursDiff > 24) {
        this.clearSession()
        return {
          isValid: false,
          error: "Session expired",
        }
      }

      return {
        isValid: true,
        session,
      }
    } catch (error) {
      return {
        isValid: false,
        error: "Session validation error",
      }
    }
  }

  static getSession(): UserSession | null {
    const validation = this.validateSession()
    return validation.isValid ? validation.session! : null
  }

  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY)
    sessionStorage.removeItem(this.LOGIN_SUCCESS_KEY)
  }

  static isLoginSuccessful(): boolean {
    return sessionStorage.getItem(this.LOGIN_SUCCESS_KEY) === "true"
  }

  static clearLoginSuccess(): void {
    sessionStorage.removeItem(this.LOGIN_SUCCESS_KEY)
  }
}

export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isStagingEnv(): boolean {
  // This is set in vercel builds and deploys from releases/staging.
  return Boolean(process.env.REACT_APP_STAGING)
}

export function isProductionEnv(): boolean {
  return process.env.NODE_ENV === 'production' && !isStagingEnv()
}

export function isAppUniswapOrg({ hostname }: { hostname: string }): boolean {
  return hostname === 'app.uniswap.org'
}

export function isAppUniswapStagingOrg({ hostname }: { hostname: string }): boolean {
  return hostname === 'app.uniswap-staging.org'
}

export function isBrowserRouterEnabled(): boolean {
  if (isProductionEnv()) {
    if (
      isAppUniswapOrg(window.location) ||
      isAppUniswapStagingOrg(window.location) ||
      // Cypress tests
      isLocalhost(window.location)
    ) {
      return true
    }
    return false
  }
  return true
}

function isLocalhost({ hostname }: { hostname: string }): boolean {
  return hostname === 'localhost'
}

export function isSentryEnabled(): boolean {
  // Disable in e2e test environments
  if (isStagingEnv() && !isAppUniswapStagingOrg(window.location)) return false
  if (isProductionEnv() && !isAppUniswapOrg(window.location)) return false
  return process.env.REACT_APP_SENTRY_ENABLED === 'true'
}

export function getEnvName(): 'production' | 'staging' | 'development' {
  if (isStagingEnv()) {
    return 'staging'
  }
  if (isProductionEnv()) {
    return 'production'
  }
  return 'development'
}

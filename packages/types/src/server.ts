import type { FoundBrowser } from './browser'
import type { PlatformName } from './platform'

export interface LaunchOpts {
  browser?: FoundBrowser
  url?: string
  automationMiddleware?: AutomationMiddleware
  projectRoot?: string
  onBrowserClose?: (...args: unknown[]) => void
  onBrowserOpen?: (...args: unknown[]) => void
  onError?: (err: Error) => void
}

export interface LaunchArgs {
  _?: [string] // Cypress App binary location
  config?: Record<string, unknown>
  cwd: string
  browser?: string
  configFile?: string
  // Global mode is triggered by CLI via `--global` or when there is no `projectRoot` (essentially when the Cypress Config file can't be found)
  global: boolean
  project: string // projectRoot
  /**
   * in run mode, the path of the project run
   * path is relative if specified with --project,
   * absolute if implied by current working directory
   */
  runProject?: string
  projectRoot: string // same as above
  testingType?: Cypress.TestingType
  invokedFromCli: boolean
  os: PlatformName
  exit?: boolean
}

type NullableMiddlewareHook = (() => void) | null

export type OnRequestEvent = (eventName: string, data: any) => void

export interface AutomationMiddleware {
  onPush?: NullableMiddlewareHook
  onBeforeRequest?: OnRequestEvent | null
  onRequest?: OnRequestEvent | null
  onResponse?: NullableMiddlewareHook
  onAfterResponse?: NullableMiddlewareHook
}

type WebSocketOptionsCallback = (...args: any[]) => any

export interface OpenProjectLaunchOptions {
  args?: LaunchArgs
  configFile?: string | false
  browsers?: Cypress.Browser[]

  // Optional callbacks used for triggering events via the web socket
  onChange?: WebSocketOptionsCallback

  [key: string]: any
}

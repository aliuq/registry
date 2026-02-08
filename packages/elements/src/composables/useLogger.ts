/**
 * @description: 打印日志相关
 * @file: useLogger.ts
 * @example:
 * ```ts
 * const { logger, c } = useLogger({ aq: 'aq:debug' })
 * logger.aq.enabled = true
 *
 * logger.aq('hello %s', 'world)
 * ```
 */
import debug from 'debug'
import c from 'picocolors'

export function useLogger<T extends string>(name?: T | T[]): UseLoggerReturns<T>
export function useLogger<T extends Record<string, string>>(names?: T): UseLoggerReturns<T extends undefined ? never : keyof T>
export function useLogger(names?: any) {
  let instances = {} as any
  const createLogger = (name: string) => debug(name)

  if (names) {
    if (Array.isArray(names) || typeof names === 'string') {
      names = Array.isArray(names) ? names : [names]
      instances = names.reduce((acc: any, name: any) => {
        const logger = createLogger(name)
        acc[name] = logger
        return acc
      }, {})
    }
    else if (typeof names === 'object') {
      const nameAlias = Object.keys(names)
      if (nameAlias?.length) {
        nameAlias.forEach((key) => {
          instances[key] = createLogger(names[key])
        })
      }
    }
  }

  return {
    logger: instances,
    createLogger,
    color: c,
    c,
  }
}

type Picocolors = typeof c

export type UseLoggerReturns<T extends string> = Picocolors & {
  createLogger: (name: string) => debug.Debugger
  logger: Record<T, debug.Debugger>
  color: Picocolors
  /** Alias fro color */
  c: Picocolors
}

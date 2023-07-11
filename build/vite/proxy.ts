import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

export function createProxy(): ProxyTargetList {
  return {
    // '^/api': {
    //   target: 'http://localhost:3000'
    // }
  }
}

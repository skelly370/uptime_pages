import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "keldo's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://gitea.keldo.uk/skelly', label: 'Gitea' },
    { link: 'https://keldo.uk', label: 'Blog' },
    //{ link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
  // [OPTIONAL] Group your monitors
  // If not specified, all monitors will be shown in a single list
  // If specified, monitors will be grouped and ordered, not-listed monitors will be invisble (but still monitored)
  group: {
    'Homelab': ['vault', 'gitea', 'passbolt', 'immich'],
    'Benchmark': ['google'],
  },
  // [OPTIONAL] Set the path to your favicon, default to '/favicon.ico' if not specified
  favicon: '/favicon.ico',
  // [OPTIONAL] Maintenance related settings
}

const workerConfig: WorkerConfig = {
  // Write KV at most every 3 minutes unless the status changed
  kvWriteCooldownMinutes: 3,
  // Enable HTTP Basic auth for status page & API by uncommenting the line below, format `<USERNAME>:<PASSWORD>`
  // passwordProtection: 'username:password',
  // Define all your monitors here
  monitors: [
    // Example HTTP Monitor
    {
      // `id` should be unique, history will be kept if the `id` remains constant
      id: 'vault',
      // `name` is used at status page and callback message
      name: 'vault',
      // `method` should be a valid HTTP Method
      method: 'POST',
      // `target` is a valid URL
      target: 'https://vault.keldo.uk',
      // [OPTIONAL] `tooltip` is ONLY used at status page to show a tooltip
      tooltip: 'A secret store',
      // [OPTIONAL] `statusPageLink` is ONLY used for clickable link at status page
      statusPageLink: 'https://vault.keldo.uk',
      // [OPTIONAL] `hideLatencyChart` will hide status page latency chart if set to true
      hideLatencyChart: false,
      // [OPTIONAL] `expectedCodes` is an array of acceptable HTTP response codes, if not specified, default to 2xx
      expectedCodes: [200],
      // [OPTIONAL] `timeout` in millisecond, if not specified, default to 10000
      timeout: 10000,
      // [OPTIONAL] headers to be sent
      //headers: {
      //  'User-Agent': 'Uptimeflare',
      //  Authorization: 'Bearer YOUR_TOKEN_HERE',
      //},
      // [OPTIONAL] body to be sent
      //body: 'Hello, world!',
      // [OPTIONAL] if specified, the response must contains the keyword to be considered as operational.
      //responseKeyword: 'success',
      // [OPTIONAL] if specified, the response must NOT contains the keyword to be considered as operational.
      responseForbiddenKeyword: 'bad gateway',
      // [OPTIONAL] if specified, will call the check proxy to check the monitor, mainly for geo-specific checks
      // refer to docs https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup before setting this value
      // currently supports `worker://` and `http(s)://` proxies
      checkProxy: 'https://xxx.example.com OR worker://weur',
      // [OPTIONAL] if true, the check will fallback to local if the specified proxy is down
      checkProxyFallback: true,
    },
     {
      id: 'gitea',
      name: 'gitea',
      method: 'GET',
      target: 'https://gitea.keldo.uk',
      statusPageLink: 'https://gitea.keldo.uk',
      hideLatencyChart: false,
      expectedCodes: [200],
    },
    {
      id: 'passbolt',
      name: 'passbolt',
      method: 'GET',
      target: 'https://passbolt.keldo.uk',
      statusPageLink: 'https://passbolt.keldo.uk',
      hideLatencyChart: false,
      expectedCodes: [200],
    },
    {
      id: 'immich',
      name: 'immich',
      method: 'GET',
      target: 'https://immich.keldo.uk',
      statusPageLink: 'https://immich.keldo.uk',
      hideLatencyChart: false,
      expectedCodes: [200],
    },
        {
      id: 'google',
      name: 'google',
      method: 'GET',
      target: 'https://www.google.com/generate_204',
      statusPageLink: 'https://www.google.com/generate_204',
      hideLatencyChart: false,
      expectedCodes: [204],
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    appriseApiServer: 'https://apprise.example.com/notify',
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    recipientUrl: 'tgram://bottoken/ChatID',
    timeZone: 'Europe/London',
    gracePeriod: 5,
    // [Optional] disable notification for monitors with specified ids
    skipNotificationIds: [],
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any TypeScript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any TypeScript code here
    },
  },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature
// const maintenances: MaintenanceConfig[] = []

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig, maintenances }

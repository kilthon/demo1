export const adminMenu = [
  {
    overview: [
      'dashboard',
      'node',
      'resource',
      { network_traffic: ['health-check', 'web', 'flow'] },
    ],
  },
  {
    log: ['app', 'network', 'access', 'slow-attack', 'operation', 'subscription', 'report'],
  },
  {
    policy: [
      {
        generic_policy: ['generic-template', 'threat', 'protocol', 'generic'],
      },
      {
        service_policy: [
          'service-template',
          'vpatch',
          'cookie',
          'tracking',
          'assoc-control-tracking',
        ],
      },
      {
        custom_rule: ['control', 'assoc-control-basic', 'custom', 'l7modify'],
      },
    ],
  },
  'admin-test',
];

export const userMenu = [
  { station: ['service-topology', 'virtual-station', 'cert-management', 'system-appidentify'] },
  { network: ['interface', 'firewall', 'vrrp'] },
  {
    system: ['data', 'config', 'sync', 'ha', 'parameter', 'service', 'taskmgr'],
  },
  'user1-test',
];

const adminMenu = [
  {
    overview: [
      'overview-dashboard',
      'overview-node',
      'overview-resource',
      { network_traffic: ['overview-health-check', 'overview-web', 'overview-flow'] },
    ],
  },
  {
    log: [
      'log-app',
      'log-network',
      'log-access',
      'log-slow-attack',
      'log-operation',
      'log-subscription',
      'log-report',
    ],
  },
  {
    policy: [
      {
        generic_policy: [
          'policy-generic-template',
          'policy-threat',
          'policy-protocol',
          'policy-generic',
        ],
      },
      {
        service_policy: [
          'policy-service-template',
          'policy-vpatch',
          'policy-cookie',
          'policy-tracking',
          'policy-assoc-control-tracking',
        ],
      },
      {
        custom_rule: [
          'policy-control',
          'policy-assoc-control-basic',
          'policy-custom',
          'policy-l7modify',
        ],
      },
    ],
  },
];

const userMenu = [
  { station: ['service-topology', 'virtual-station', 'cert-management', 'system-appidentify'] },
  { network: ['network-interface', 'network-firewall', 'network-vrrp'] },
  {
    system: [
      'system-data',
      'system-config',
      'system-sync',
      'system-ha',
      'system-parameter',
      'system-service',
      'system-taskmgr',
    ],
  },
];

export default { adminMenu, userMenu };

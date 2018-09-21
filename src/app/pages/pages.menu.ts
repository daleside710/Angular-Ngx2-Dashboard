export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'devices',
        data: {
          menu: {
            title: 'general.menu.devices.devices',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'authorized',
            data: {
              menu: {
                title: 'general.menu.devices.authenticated',
              }
            }
          },
          {
            path: 'unauthorized',
            data: {
              menu: {
                title: 'general.menu.devices.unauthenticated',
              }
            }
          },
          {
            path: 'blocked',
            data: {
              menu: {
                title: 'general.menu.devices.blocked',
              }
            }
          }
        ]
      },
      // {
      //   path: 'monitoring',
      //   data: {
      //     menu: {
      //       title: 'general.menu.monitoring',
      //       icon: 'ion-android-home',
      //       selected: false,
      //       expanded: false,
      //       order: 200
      //     }
      //   }
      // },
      {
        path: 'leaflet',
        data: {
          menu: {
            title: 'general.menu.monitoring',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 200
          }
        }
      },
      {
        path: 'gwdashboard',
        data: {
          menu: {
            title: 'general.menu.gwdashboard',
            icon: 'ion-flag',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
    ]
  }
];

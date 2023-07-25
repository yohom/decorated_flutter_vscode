void runMyApp() {
  // runDecoratedApp(
  //   zoned: false,
  //   statusBarColor: Colors.transparent,

  //   /// runApp前
  //   beforeApp: () async {
  //     await initComponentData(
  //       onUserExpired: () {
  //         if (gLoggedIn) {
  //           UserBLoC.instance.performLogout().thenPop(until: Routes.home);
  //         }
  //       },
  //     );
  //     initComponentUI();

  //     await initModuleCore();
  //     initModuleCommunity();
  //     await initModuleIndex();
  //   },

  //   /// runApp
  //   appRunner: () => runApp(const VideoApp()),

  //   /// runApp后
  //   afterApp: () async {
  //     initComponentVendor();
  //   },
  // );
}

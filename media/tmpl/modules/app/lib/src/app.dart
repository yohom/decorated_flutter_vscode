import 'package:flutter/cupertino.dart';
import 'package:module_index/module_index.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return DecoratedApp<AppBLoC>(
      rootBLoC: AppBLoC.instance,
      // theme: _gLightTheme,
      // darkTheme: _gDarkTheme,
      scrollBehavior: const CupertinoScrollBehavior(),
      onGenerateRoute: _onGenerateRoute,
      localizationsDelegates: const [],
      // 处理初始路由有多级的时候, 多次调用onGenerateRoute的问题, 参考信息 https://github.com/flutter/flutter/issues/71786
      onGenerateInitialRoutes: (initialRoute) {
        L.i('初始路由: $initialRoute');
        return [
          // _onGenerateRoute(RouteSettings(name: initialRoute)) ??
          //     HomeScreen.route({})
        ];
      },
      // supportedLocales: S.delegate.supportedLocales,
      navigatorObservers: const [
        // AppAnalyzer.instance,
      ],
    );
  }

  Route? _onGenerateRoute(RouteSettings settings) {
    final redirection = _redirect(settings);
    L.d('重定向前: ${settings.path}, 重定向后: ${redirection.path}');

    final path = redirection.path!;
    final arguments = redirection.availableArguments;
    return null;

    // if (path.startsWith('/community')) {
    //   return CommunityRouter.instance.onGenerateRoute(redirection);
    // } else if (path.startsWith('/user')) {
    //   return UserRouter.instance.onGenerateRoute(redirection);
    // } else if (path.startsWith('/game')) {
    //   return GameRouter.instance.onGenerateRoute(redirection);
    // } else if (path.startsWith('/index')) {
    //   return IndexRouter.instance.onGenerateRoute(redirection);
    // } else if (path.startsWith('/shortvideo')) {
    //   return ShortVideoRouter.instance.onGenerateRoute(redirection);
    // } else if (path.startsWith('/core')) {
    //   return CoreRouter.instance.onGenerateRoute(redirection);
    // } else {
    //   switch (path) {
    //     // 主页
    //     case Routes.home:
    //       return HomeScreen.route(arguments);
    //     // 通用列表
    //     case Routes.list_screen:
    //       return ListScreen.route(arguments);
    //     // 开屏广告
    //     case Routes.splash_ads:
    //       return SplashAdsScreen.route(arguments);
    //     default:
    //       L.w('未找到目标路由 $path, 将重定向到主页');
    //       return HomeScreen.route(arguments);
    //   }
    // }
  }

  RouteSettings _redirect(RouteSettings settings) {
    // if (settings.path == Routes.root) {
    //   return RouteSettings(
    //     name: Routes.splash_ads,
    //     arguments: settings.availableArguments,
    //   );
    // } else if (_needLogin(settings)) {
    //   return settings.copyWith(name: '${Routes.home}?action=login');
    // } else {
    return settings;
    // }
  }
// 由于navigator1.0无法拦截push事件(能重定向但是不能阻断), 这里先在MineScreen逐个拦截了
// 后面研究下GoRouter是否能实现
// bool _needLogin(RouteSettings settings) {
//   return settings.name?.startsWith('/user') == true && !gLoggedIn;
// }
}

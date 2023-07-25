import 'package:module_core/module_core.dart';

class AppBLoC extends RootBLoC {
  static AppBLoC instance = const AppBLoC._();

  const AppBLoC._() : super('App全局BLoC');

  @override
  List<GlobalBLoC> get disposeBag => [
      ];
}

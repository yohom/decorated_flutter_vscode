import 'package:component_data/component_data.dart';

class HomeHubBLoC extends GlobalBLoC with _ComponentMixin {
  static HomeHubBLoC? _instance;
  static HomeHubBLoC get instance => _instance ??= HomeHubBLoC._();

  HomeHubBLoC._() : super('首页公共事件 BLoC');

  @override
  void dispose() {
    _instance = null;
    super.dispose();
  }
}

mixin _ComponentMixin on GlobalBLoC {
  @override
  List<dynamic> get disposeBag => [];
}

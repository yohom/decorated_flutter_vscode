import 'package:component_data/component_data.dart';
import 'package:flutter/widgets.dart';
import 'package:module_core/module_core.dart';

class RemoteConfigBLoC extends GlobalBLoC with _ComponentMixin {
  static RemoteConfigBLoC? _instance;
  static RemoteConfigBLoC get instance => _instance ??= RemoteConfigBLoC._();

  RemoteConfigBLoC._() : super('远程系统配置 BLoC');

  @override
  void dispose() {
    _instance = null;
    super.dispose();
  }
}

mixin _ComponentMixin on GlobalBLoC {
  @override
  List<dynamic> get disposeBag => [
      ];
}

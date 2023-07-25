import 'dart:async';

import 'package:flutter/material.dart';
import 'package:module_core/module_core.dart';

class UserBLoC extends GlobalBLoC with _ComponentMixin {
  static UserBLoC? _instance;

  static UserBLoC get instance => _instance ??= UserBLoC._();

  UserBLoC._() : super('用户信息 BLoC');

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

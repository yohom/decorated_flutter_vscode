import 'dart:async';

import 'local/devices.dart';
import 'local/packages.dart';
import 'local/paths.dart';
import 'local/prefs.dart';
import 'remote/api.dart';

class DataSource {
  /// 远程数据源
  static Api remote = Api.instance;

  /// 本地数据源
  static Prefs prefs = Prefs.instance;

  DataSource._();

  static Future<void> init() async {
    await prefs.init();
  }
}

// ignore_for_file: non_constant_identifier_names

import 'package:component_constant/component_constant.dart';
import 'package:component_data/src/model/domain_object.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:uuid/uuid.dart';

class Prefs {
  static Prefs instance = Prefs._();

  Prefs._();

  Future<void> init() async {
  }
}

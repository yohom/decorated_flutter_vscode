// ignore_for_file: constant_identifier_names, non_constant_identifier_names
import 'package:decorated_flutter/decorated_flutter.dart';
import 'resource/r.dart';

const kEnv = String.fromEnvironment('APP_ENV', defaultValue: 'prod');
const kProduction = kEnv == 'prod'; // 是否生产环境

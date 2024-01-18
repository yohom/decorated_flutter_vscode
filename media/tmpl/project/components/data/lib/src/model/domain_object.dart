// // ignore_for_file: non_constant_identifier_names, unused_local_variable, unused_element
// import 'dart:convert';
// import 'dart:math';
// import 'dart:ui';

// import 'package:component_constant/component_constant.dart';
// import 'package:component_data/src/utils/functions.dart';
// import 'package:cross_file/cross_file.dart';
// import 'package:flutter/material.dart';

// part 'view_object.dart';

// /// 消息壳
// class Bean {
//   static final success = Bean._()
//     ..code = 200
//     ..message = '成功';

//   static final error = Bean._()
//     ..code = 400
//     ..message = '失败';

//   /// 请求结果消息
//   int? code;

//   /// 请求结果消息
//   String? message;

//   /// body可能为对象或者列表
//   dynamic data;

//   Bean._({this.code, this.message, this.data});

//   static Bean fromJson(Map<String, dynamic> json) {
//     return Bean._()
//       ..code = json['code']
//       ..message = json['msg'] ?? json['message']
//       ..data = json['data'];
//   }

//   Map<String, dynamic> toJson() {
//     return {
//       'code': code,
//       'msg': message,
//       'data': data,
//     };
//   }

//   bool get isSuccess => code == 0 || code == 200;

//   @override
//   String toString() {
//     return const JsonEncoder.withIndent('  ').convert(toJson());
//   }
// }

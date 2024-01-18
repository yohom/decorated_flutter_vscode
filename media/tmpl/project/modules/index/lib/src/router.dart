import 'package:flutter/material.dart';
import 'package:module_core/module_core.dart';

class IndexRouter {
  static IndexRouter instance = IndexRouter._();

  IndexRouter._();

  Route? onGenerateRoute(RouteSettings settings) {
    final path = settings.path!;
    final arguments = settings.availableArguments;

    switch (path) {
      default:
        return null;
    }
  }
}

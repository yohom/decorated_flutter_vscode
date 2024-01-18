import 'package:flutter/material.dart';
import 'package:module_core/module_core.dart';

class CoreRouter {
  static CoreRouter instance = CoreRouter._();

  CoreRouter._();

  Route? onGenerateRoute(RouteSettings settings) {
    final path = settings.path!;
    final arguments = settings.availableArguments;

    switch (path) {
      default:
        return null;
    }
  }
}

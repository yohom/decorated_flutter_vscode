import 'package:flutter/material.dart';
import 'package:module_core/module_core.dart';

class #__name__#Router {
  static #__name__#Router instance = #__name__#Router._();

  #__name__#Router._();

  Route? onGenerateRoute(RouteSettings settings) {
    final path = settings.path!;
    final arguments = settings.availableArguments;

    switch (path) {
      default:
        return null;
    }
  }
}

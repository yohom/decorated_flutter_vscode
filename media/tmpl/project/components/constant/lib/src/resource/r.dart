import 'package:decorated_flutter/decorated_flutter.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

part 'colors.dart';
part 'constants.dart';
part 'drawables.dart';
part 'styles.dart';

class R {
  R._();

  static final drawable = _DrawableReference();
  static const color = _ColorReference();
  static final style = _StyleReference();
}

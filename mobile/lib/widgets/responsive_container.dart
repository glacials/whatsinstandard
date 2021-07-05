import 'package:flutter/widgets.dart';

class ResponsiveContainer extends StatelessWidget {
  final Widget phone;
  final Widget tablet;

  ResponsiveContainer({required this.phone, required this.tablet});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
      if (constraints.maxWidth > 800) {
        return this.tablet;
      }
      return this.phone;
    });
  }
}

import 'package:flutter/widgets.dart';

class ResponsiveContainer extends StatelessWidget {
  final Widget narrow;
  final Widget wide;

  const ResponsiveContainer({required this.narrow, required this.wide});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
      if (constraints.maxWidth > 600) {
        return this.wide;
      }
      return this.narrow;
    });
  }
}

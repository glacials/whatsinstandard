import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:flutter_svg/svg.dart';
import 'package:whatsinstandard/widgets/navigation_container.dart';

class SetIcon extends StatelessWidget {
  final StandardSet set;

  const SetIcon(this.set);

  @override
  Widget build(BuildContext context) {
    if (this.set.exactEnterDate == null ||
        this.set.exactEnterDate!.isAfter(DateTime.now())) {
      return Icon(Icons.date_range, color: Colors.grey);
    } else {
      try {
        return SvgPicture.network(
            "https://raw.githubusercontent.com/andrewgioia/keyrune/master/svg/${set.code.toString().toLowerCase()}.svg",
            height: 40,
            width: 40,
            placeholderBuilder: (BuildContext context) => Icon(
                  Icons.question_mark,
                  color: Colors.grey,
                ));
      } catch (_) {
        return PlatformText("error getting icons");
      }
    }
  }
}

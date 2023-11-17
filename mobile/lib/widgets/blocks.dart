
import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:whatsinstandard/widgets/set_icon.dart';

import 'block_box.dart';
import 'navigation_container.dart';

class Blocks extends StatelessWidget {
  final List<StandardSet> sets;

  const Blocks({required this.sets});

  @override
  Widget build(BuildContext context) {
    final DateTime now = new DateTime.now();

    if (this.sets.isEmpty) {
      return PlatformCircularProgressIndicator();
    }
    var undropped = sets.where(
        (set) => set.exactExitDate == null || set.exactExitDate!.isAfter(now));
    var upcoming = undropped
        .where((set) =>
            set.exactEnterDate == null || set.exactEnterDate!.isAfter(now))
        .take(4);
    var standard = undropped.where((s) {
      return s.exactEnterDate != null && now.isAfter(s.exactEnterDate!);
    });

    List<Block> blocks = Block.fromSets(standard.toList() + upcoming.toList());

    return ListView(
        children: blocks
            .map((block) => BlockBox(
                  child: Column(
                      children: block.sets
                          .map((set) => PlatformListTile(
                                leading: SetIcon(set),
                                title: PlatformText(set.name),
                                subtitle: set.isReleased()
                                    ? null
                                    : PlatformText(
                                        "Releases ${set.friendlyEnterDate(context)}"),
                              ))
                          .toList()),
                  title: "Until ${block.roughExitDate}",
                ))
            .toList());
  }
}

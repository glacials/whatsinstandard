import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';

import 'block_box.dart';
import 'navigation_container.dart';

class Blocks extends StatelessWidget {
  final List<StandardSet> sets;

  const Blocks({required this.sets});

  @override
  Widget build(BuildContext context) {
    if (this.sets.isEmpty) {
      return Text("loading");
    }
    final DateTime now = new DateTime.now();
    this.sets.removeWhere((s) {
      if (s.exactEnterDate == null) {
        return true;
      }

      if (s.exactEnterDate!.isAfter(now)) {
        return true;
      }

      if (s.exactExitDate != null && s.exactExitDate!.isBefore(now)) {
        return true;
      }

      return false;
    });

    List<Block> blocks = Block.fromSets(sets);

    return ListView(
      children: blocks
          .map((block) => BlockBox(
                title: "Until ${block.roughExitDate}",
                child: Column(
                    children: block.sets
                        .map((set) => PlatformListTile(
                              leading: Image.network(
                                set.symbol.toString(),
                                height: 40,
                                width: 40,
                              ),
                              title: PlatformText(set.name),
                            ))
                        .toList()),
              ))
          .toList(),
    );
  }
}

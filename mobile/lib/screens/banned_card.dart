import 'package:flutter/material.dart';

import 'package:whatsinstandard/screens/bans.dart';
import 'package:whatsinstandard/widgets/banned_card_image.dart';
import 'package:whatsinstandard/widgets/banned_card_reason.dart';
import 'package:whatsinstandard/widgets/navigation_container.dart';
import 'package:whatsinstandard/widgets/responsive_container.dart';

class BannedCardScreen extends StatelessWidget {
  final BannedCard bannedCard;
  final StandardSet set;

  BannedCardScreen(
      {required Key key, required this.bannedCard, required this.set})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ResponsiveContainer(
          narrow: ListView(
            children: [
              BannedCardReason(bannedCard: bannedCard, set: set),
              BannedCardImage(bannedCard: bannedCard),
            ],
          ),
          wide: Row(
            children: [
              Expanded(
                child: BannedCardReason(bannedCard: bannedCard, set: set),
                flex: 2,
              ),
              Expanded(child: BannedCardImage(bannedCard: bannedCard), flex: 1)
            ],
          )),
    );
  }
}

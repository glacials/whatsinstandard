import 'package:flutter/material.dart';
import 'package:whatsinstandard/screens/bans.dart';

class BannedCardImage extends StatelessWidget {
  BannedCardImage({
    Key? key,
    required this.bannedCard,
  }) : super(key: key);

  final BannedCard bannedCard;

  @override
  Widget build(BuildContext context) {
    return Padding(
      child: Image.network(
        bannedCard.imageUrl,
      ),
      padding: EdgeInsets.only(left: 2, right: 2),
    );
  }
}

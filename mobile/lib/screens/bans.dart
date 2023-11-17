import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:http/http.dart' as http;

import 'package:whatsinstandard/screens/banned_card.dart';
import 'package:whatsinstandard/widgets/navigation_container.dart';

class BannedCard {
  final String name;
  final String imageUrl;
  final String setCode;
  final String reason;
  final String announcementUrl;

  BannedCard(
      {required this.name,
      required this.imageUrl,
      required this.setCode,
      required this.reason,
      required this.announcementUrl});

  factory BannedCard.fromJson(Map<String, dynamic> json) {
    return BannedCard(
      name: json['cardName'],
      imageUrl: json['cardImageUrl'],
      setCode: json['setCode'],
      reason: json['reason'],
      announcementUrl: json['announcementUrl'],
    );
  }

  static List<BannedCard> fetch(http.Response response) {
    List<BannedCard> bannedCards = [];

    if (response.statusCode == 200) {
      final bansJson = JsonDecoder().convert(response.body)['bans'];

      for (var i = 0; i < bansJson.length; i++) {
        bannedCards.add(BannedCard.fromJson(bansJson[i]));
      }
      return bannedCards;
    } else {
      // If that response was not OK, throw an error.
      throw Exception('Failed to load bans');
    }
  }
}

class BansScreen extends StatefulWidget {
  final http.Response response;

  BansScreen({required this.response});

  @override
  _BansScreenState createState() => _BansScreenState();
}

class _BansScreenState extends State<BansScreen> {
  List<BannedCard> _bans = [];
  List<StandardSet> _sets = [];

  @override
  void initState() {
    super.initState();
    _sets = StandardSet.fetch(widget.response);
    final DateTime now = new DateTime.now();
    _sets.removeWhere((s) {
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

    _bans = BannedCard.fetch(widget.response)
        .where((ban) => _sets.map((set) => set.code).contains(ban.setCode))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> cards = [];

    for (var i = 0; i < _bans.length; i++) {
      // Only show bans for standard sets
      if (!_sets.map((set) => set.code).contains(_bans[i].setCode)) {
        continue;
      }

      cards.add(Material(
        child: GridTile(
          child: InkResponse(
            child: Image.network(_bans[i].imageUrl),
            onTap: () {
              showPlatformModalSheet(
                context: context,
                builder: (context) => PlatformScaffold(
                  appBar: PlatformAppBar(
                    leading: PlatformTextButton(
                      child: Icon(CupertinoIcons.chevron_down),
                      onPressed: () => Navigator.pop(context),
                      padding: EdgeInsets.only(bottom: 0),
                    ),
                    title: PlatformText("Banned Card Details"),
                  ),
                  body: PageView(
                    children: _bans
                        .map((card) => BannedCardScreen(
                            key: Key(card.name),
                            bannedCard: card,
                            set: _sets
                                .firstWhere((set) => set.code == card.setCode)))
                        .toList(),
                    controller:
                        PageController(initialPage: i, viewportFraction: 0.9),
                    padEnds: true,
                  ),
                ),
              );
            },
          ),
        ),
      ));
    }

    return Padding(
        child: GridView.count(
          childAspectRatio: .71,
          children: cards,
          crossAxisCount: 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        padding: EdgeInsets.all(10));
  }
}

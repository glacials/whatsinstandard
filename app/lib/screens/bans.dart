import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:whatsinstandard/screens/hero_card.dart';

class BannedCard {
  final String name;
  final String imageUrl;
  final String setCode;
  final String reason;
  final String announcementUrl;

  BannedCard({this.name, this.imageUrl, this.setCode, this.reason, this.announcementUrl});

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

      for(var i = 0; i < bansJson.length; i++) {
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

  BansScreen({this.response});

  @override
  _BansScreenState createState() => _BansScreenState();
}

class _BansScreenState extends State<BansScreen> {
  List<BannedCard> _bans;

  @override
  void initState() {
    super.initState();
    _bans = BannedCard.fetch(widget.response);
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> cards = [];

    for(var i = 0; i < _bans.length; i++) {
      cards.add(GridTile(
        child: InkResponse(
          child: Hero(
            child: Image.network(_bans[i].imageUrl),
            tag: _bans[i].name,
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => HeroCardScreen(bannedCard: _bans[i]),
              ),
            );
          },
        ),
      ));
    }
    cards.add(Padding(padding: EdgeInsets.only(bottom: 150)));
    return GridView.count(
      childAspectRatio: .71,
      children: cards,
      crossAxisCount: 2,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      padding: EdgeInsets.all(10),
    );
  }
}

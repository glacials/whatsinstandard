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

  static Future<List<BannedCard>> fetch() async {
    final response = await http.get('https://whatsinstandard.com/api/v6/standard.json');
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
  @override
  _BansScreenState createState() => _BansScreenState();
}

class _BansScreenState extends State<BansScreen> {
  Future<List<BannedCard>> _bans;

  @override
  void initState() {
    super.initState();
    _bans = BannedCard.fetch();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<BannedCard>>(
        future: _bans,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<Widget> cards = [];

            for(var i = 0; i < snapshot.data.length; i++) {
              cards.add(GridTile(
                      child: InkResponse(
                          child: Hero(
                              child: Image.network(snapshot.data[i].imageUrl),
                              tag: snapshot.data[i].name,
                          ),
                          onTap: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => HeroCardScreen(bannedCard: snapshot.data[i]),
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
          } else if (snapshot.hasError) {
            return Text("${snapshot.error}");
          }


          return Center(child: Column(
                  children: [
                    CircularProgressIndicator(),
                    Padding(padding: EdgeInsets.all(20)),
                    Text('Fetching current banned cards', style: TextStyle(color: Colors.white)),
                    Padding(padding: EdgeInsets.all(20)),
                  ],
                  mainAxisAlignment: MainAxisAlignment.center,
          ));
        },
        );
  }
}

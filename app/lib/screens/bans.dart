import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

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
    return ListView(
        children: [
          Container(
              alignment: Alignment.center,
              child: Text('Banned cards', style: TextStyle(color: Colors.white, fontSize: 20)),
              padding: EdgeInsets.only(bottom: 25),
          ),
          FutureBuilder<List<BannedCard>>(
              future: _bans,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  List<Widget> cards = [];

                  for(var i = 0; i < snapshot.data.length; i++) {
                    cards.add(GridTile(child: Image.network(
                            snapshot.data[i].imageUrl,
                    )));
                  }
                  return GridView.count(children: cards, crossAxisCount: 1, shrinkWrap: true, mainAxisSpacing: 20, crossAxisSpacing: 0);
                } else if (snapshot.hasError) {
                  return Text("${snapshot.error}");
                }


                return Center(
                    child: Column(
                        children: [
                          CircularProgressIndicator(),
                          Padding(padding: EdgeInsets.all(20)),
                          Text('Fetching current banned cards', style: TextStyle(color: Colors.white)),
                          Padding(padding: EdgeInsets.all(20)),
                        ],
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                    ),
                );
              },
              ),
    ],
    shrinkWrap: true,
    );
  }
}

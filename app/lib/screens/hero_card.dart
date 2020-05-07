import 'dart:convert';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';


import 'package:whatsinstandard/screens/bans.dart';

class HeroCardScreen extends StatelessWidget {
  final BannedCard bannedCard;
  final Widget background;

  HeroCardScreen({Key key, @required this.bannedCard, @required this.background}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(bannedCard.name)),
      body: ListView(
        children: [
          Hero(
            child: Padding(
              child: Image.network(bannedCard.imageUrl),
              padding: EdgeInsets.all(10),
            ),
            tag: bannedCard.name,
          ),
          Card(
            child: Card(
              child: Column(
                children: [
                  ListTile(
                    isThreeLine: true,
                    leading: Icon(Icons.content_cut),
                    subtitle: Text(bannedCard.reason),
                    title: Text(bannedCard.name),
                    trailing: Text(bannedCard.setCode),
                  ),
                  ButtonBar(
                    children: [
                      FlatButton(
                        child: const Text('Scryfall'),
                        onPressed: () async {
                          String url = "https://scryfall.com/search?q=${bannedCard.name}";
                          if (await canLaunch(url)) {
                            await launch(url);
                          } else {
                            throw 'Could not launch ban announcement URL';
                          }
                        },
                      ),
                      FlatButton(
                        child: const Text('Announcement'),
                        onPressed: () async {
                          String url = bannedCard.announcementUrl;
                          if (await canLaunch(url)) {
                            await launch(url);
                          } else {
                            throw 'Could not launch ban announcement URL';
                          }
                        }
                      )
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

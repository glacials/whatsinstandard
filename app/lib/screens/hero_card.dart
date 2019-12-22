import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:whatsinstandard/screens/bans.dart';

class HeroCardScreen extends StatelessWidget {
  final BannedCard bannedCard;

  HeroCardScreen({Key key, @required this.bannedCard}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: Center(
            child: Hero(
                child: Padding(
                    child: Image.network(bannedCard.imageUrl),
                    padding: EdgeInsets.all(10),
                ),
                tag: bannedCard.name,
            ),
        ),
    );
  }
}

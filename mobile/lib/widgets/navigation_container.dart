import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../screens/bans.dart';
import 'responsive_container.dart';

import 'blocks.dart';

class StandardSet {
  final String name;
  final String? codename;
  final String? code;
  final Uri symbol;
  final DateTime? exactEnterDate;
  final DateTime? exactExitDate;
  final String roughExitDate;

  StandardSet(
      {required this.name,
      required this.codename,
      required this.code,
      required this.symbol,
      required this.exactEnterDate,
      required this.exactExitDate,
      required this.roughExitDate});

  factory StandardSet.fromJson(Map<String, dynamic> json) {
    return StandardSet(
      name: json['name'],
      codename: json['codename'],
      code: json['code'],
      symbol: Uri.parse(json['symbol']['common']).replace(scheme: 'https'),
      exactEnterDate: json['enterDate']['exact'] != null
          ? DateTime.parse(json['enterDate']['exact'])
          : null,
      exactExitDate: json['exitDate']['exact'] != null
          ? DateTime.parse(json['exitDate']['exact'])
          : null,
      roughExitDate: json['exitDate']['rough'],
    );
  }

  static List<StandardSet> fetch(http.Response response) {
    List<StandardSet> standardSets = [];

    if (response.statusCode == 200) {
      final setsJson = JsonDecoder().convert(response.body)['sets'];

      for (var i = 0; i < setsJson.length; i++) {
        standardSets.add(StandardSet.fromJson(setsJson[i]));
      }
      return standardSets;
    } else {
      // If that response was not OK, throw an error.
      throw Exception('Failed to load sets');
    }
  }
}

class Block {
  final Iterable<StandardSet> sets;
  final String roughExitDate;

  Block({required this.sets, required this.roughExitDate});

  static List<Block> fromSets(Iterable<StandardSet> sets) {
    List<List<StandardSet>> blocks = [];

    String roughExitDate = "Loading";
    sets.forEach((set) {
      if (set.roughExitDate != roughExitDate) {
        blocks.add([]);
        roughExitDate = set.roughExitDate;
      }
      blocks.last.add(set);
    });

    return blocks
        .map((block) =>
            Block(sets: block, roughExitDate: block[0].roughExitDate))
        .toList();
  }
}

class NavigationContainer extends StatefulWidget {
  final http.Response response;

  NavigationContainer({required this.response});

  @override
  _NavigationContainerState createState() => _NavigationContainerState();
}

class _NavigationContainerState extends State<NavigationContainer> {
  int _currentScreenIndex = 0;

  List<StandardSet> _sets = [];

  @override
  void initState() {
    super.initState();
    _sets = StandardSet.fetch(widget.response);
  }

  void _onBottomBarTap(int index) {
    setState(() {
      _currentScreenIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget _setsScreen;
    if (this._sets.isEmpty) {
      _setsScreen = Text("loading");
    } else {
      _setsScreen = Blocks(sets: this._sets);
    }

    final Widget _bansScreen = BansScreen(response: widget.response);

    return ResponsiveContainer(
      phone: Scaffold(
        appBar: AppBar(
          title: _currentScreenIndex == 0
              ? Text('Standard Sets')
              : Text('Banned Cards'),
        ),
        body: _currentScreenIndex == 0 ? _setsScreen : _bansScreen,
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentScreenIndex,
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.category),
              label: 'Standard Sets',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.content_cut),
              label: 'Banned Cards',
            ),
          ],
          onTap: _onBottomBarTap,
          enableFeedback: true,
        ),
      ),
      tablet: Scaffold(
        appBar: AppBar(title: Text("What's in Standard?")),
        body: Row(children: [
          Expanded(
              flex: 1,
              child: Column(children: [
                Padding(
                  padding: EdgeInsets.all(10),
                ),
                Text('Standard Sets', style: TextStyle(fontSize: 25)),
                Padding(
                  padding: EdgeInsets.all(10),
                ),
                Expanded(flex: 1, child: _setsScreen)
              ])),
          Expanded(
              flex: 1,
              child: Column(children: [
                Padding(
                  padding: EdgeInsets.all(10),
                ),
                Text('Banned Cards', style: TextStyle(fontSize: 25)),
                Padding(
                  padding: EdgeInsets.all(10),
                ),
                Expanded(flex: 1, child: _bansScreen)
              ]))
        ]),
      ),
    );
  }
}

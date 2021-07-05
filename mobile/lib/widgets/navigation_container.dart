import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:whatsinstandard/screens/bans.dart';
import 'package:whatsinstandard/widgets/responsive_container.dart';

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

class NavigationContainer extends StatefulWidget {
  final http.Response response;

  NavigationContainer({required this.response});

  @override
  _NavigationContainerState createState() => _NavigationContainerState();
}

class _NavigationContainerState extends State<NavigationContainer> {
  bool _timelineView = false;
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

    List<Widget> cards = [];
    cards.add(
      AnimatedContainer(
        child: Text(
          'Until ' + _sets[0].roughExitDate,
          style: TextStyle(fontSize: 20),
        ),
        curve: Curves.fastOutSlowIn,
        duration: Duration(milliseconds: 500),
        height: _timelineView ? 80 : 0,
        padding: EdgeInsets.only(left: 20, top: 30),
      ),
    );
    for (var i = 0; i < _sets.length; i++) {
      cards.add(Card(
          child: ListTile(
        leading: Image.network(
          _sets[i].symbol.toString(),
          height: 40,
          width: 40,
        ),
        title: Text(_sets[i].name),
      )));
      if (i + 1 < _sets.length &&
          _sets[i].roughExitDate != _sets[i + 1].roughExitDate) {
        cards.add(
          AnimatedContainer(
            child: Text(
              'Until ' + _sets[i + 1].roughExitDate,
              style: TextStyle(fontSize: 20),
            ),
            curve: Curves.fastOutSlowIn,
            duration: Duration(milliseconds: 500),
            height: _timelineView ? 80 : 0,
            padding: EdgeInsets.only(left: 20, top: 30),
          ),
        );
      }
    }

    final Widget _setsScreen = ListView(children: cards);
    final Widget _bansScreen = BansScreen(response: widget.response);

    return ResponsiveContainer(
      phone: Scaffold(
        appBar: AppBar(
          title: _currentScreenIndex == 0
              ? Text('Standard-legal sets')
              : Text('Banned cards'),
        ),
        body: _currentScreenIndex == 0 ? _setsScreen : _bansScreen,
        bottomNavigationBar: BottomAppBar(
          child: BottomNavigationBar(
            currentIndex: _currentScreenIndex,
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.category),
                label: 'Standard sets',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.content_cut),
                label: 'Banned cards',
              ),
            ],
            onTap: _onBottomBarTap,
          ),
          clipBehavior: Clip.antiAlias,
          notchMargin: 6,
          shape: CircularNotchedRectangle(),
        ),
        floatingActionButton: _currentScreenIndex == 0
            ? FloatingActionButton(
                tooltip:
                    _timelineView ? 'Show as a list' : 'Show as a timeline',
                child:
                    _timelineView ? Icon(Icons.menu) : Icon(Icons.date_range),
                onPressed: () {
                  setState(() {
                    _timelineView ^= true;
                  });
                },
              )
            : null,
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
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
                Text('Cards Banned from Standard',
                    style: TextStyle(fontSize: 25)),
                Padding(
                  padding: EdgeInsets.all(10),
                ),
                Expanded(flex: 1, child: _bansScreen)
              ]))
        ]),
        floatingActionButton: _currentScreenIndex == 0
            ? FloatingActionButton(
                tooltip:
                    _timelineView ? 'Show as a list' : 'Show as a timeline',
                child:
                    _timelineView ? Icon(Icons.menu) : Icon(Icons.date_range),
                onPressed: () {
                  setState(() {
                    _timelineView ^= true;
                  });
                },
              )
            : null,
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      ),
    );
  }
}

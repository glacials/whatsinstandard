import 'dart:convert';
import 'package:expandable_card/expandable_card.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:whatsinstandard/screens/bans.dart';

class StandardSet {
  final String name;
  final String codename;
  final String code;
  final String symbol;
  final DateTime exactEnterDate;
  final DateTime exactExitDate;
  final String roughExitDate;

  StandardSet({this.name, this.codename, this.code, this.symbol, this.exactEnterDate, this.exactExitDate, this.roughExitDate});

  factory StandardSet.fromJson(Map<String, dynamic> json) {
    return StandardSet(
        name: json['name'],
        codename: json['codename'],
        code: json['code'],
        symbol: json['symbol']['common'],
        exactEnterDate: json['enterDate']['exact'] != null ? DateTime.parse(json['enterDate']['exact']) : null,
        exactExitDate: json['exitDate']['exact'] != null ? DateTime.parse(json['exitDate']['exact']) : null,
        roughExitDate: json['exitDate']['rough'],
    );
  }

  static Future<List<StandardSet>> fetch() async {
    final response = await http.get('https://whatsinstandard.com/api/v6/standard.json');
    List<StandardSet> standardSets = [];

    if (response.statusCode == 200) {
      final setsJson = JsonDecoder().convert(response.body)['sets'];

      for(var i = 0; i < setsJson.length; i++) {
        standardSets.add(StandardSet.fromJson(setsJson[i]));
      }
      return standardSets;
    } else {
      // If that response was not OK, throw an error.
      throw Exception('Failed to load sets');
    }
  }
}

class SetsScreen extends StatefulWidget {
  @override
  _SetsScreenState createState() => _SetsScreenState();
}

class _SetsScreenState extends State<SetsScreen> {
  bool _timelineView = false;
  int _currentScreenIndex = 0;

  Future<List<StandardSet>> _sets;

  @override
  void initState() {
    super.initState();
    _sets = StandardSet.fetch();
  }

  void _onBottomBarTap(int index) {
    setState(() {
      _currentScreenIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget _setsScreen = FutureBuilder<List<StandardSet>>(
        future: _sets,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final DateTime now = new DateTime.now();
            snapshot.data.removeWhere((s) {
              if (s.exactEnterDate == null) {
                return true;
              }

              if (s.exactEnterDate.isAfter(now)) {
                return true;
              }

              if (s.exactExitDate != null && s.exactExitDate.isBefore(now)) {
                return true;
              }

              return false;
            });

            List<Widget> cards = [];
            cards.add(
                AnimatedContainer(
                    child: Text(
                        'Until ' + snapshot.data[0].roughExitDate,
                        style: TextStyle(fontSize: 20),
                    ),
                    curve: Curves.fastOutSlowIn,
                    duration: Duration(milliseconds: 500),
                    height: _timelineView ? 80 : 0,
                    padding: EdgeInsets.only(left: 20, top: 30),
                ),
            );
            for(var i = 0; i < snapshot.data.length; i++) {
              cards.add(Card(child: ListTile(
                          leading: Image.network(
                              snapshot.data[i].symbol,
                              height: 40,
                              width: 40,
                          ),
                          title: Text(snapshot.data[i].name),
                          subtitle: Text(
                              snapshot.data[i].exactExitDate != null ? snapshot.data[i].exactExitDate : snapshot.data[i].roughExitDate
                          ),
              )));
              if (i+1 < snapshot.data.length && snapshot.data[i].roughExitDate != snapshot.data[i+1].roughExitDate) {
                cards.add(
                    AnimatedContainer(
                        child: Text(
                            'Until ' + snapshot.data[i].roughExitDate,
                            style: TextStyle(fontSize: 20),
                        ),
                        curve: Curves.fastOutSlowIn,
                        duration: Duration(milliseconds: 500),
                        height: _timelineView ? 80: 0,
                        padding: EdgeInsets.only(left: 20, top: 30),
                    ),
                );
              }
            }
            return ListView(children: cards);
          } else if (snapshot.hasError) {
            return Text("${snapshot.error}");
          }

          // By default, show a loading spinner.
          return Center(
              child: Column(
                  children: [
                    CircularProgressIndicator(),
                    Padding(padding: EdgeInsets.all(20)),
                    Text('Fetching current sets'),
                    Padding(padding: EdgeInsets.all(20)),
                  ],
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
              ),
          );
        },
        );

    Widget _bansScreen = BansScreen();

    return Scaffold(
        appBar: AppBar(
            title: _currentScreenIndex == 0 ? Text('Standard-legal sets') : Text('Banned cards'),
        ),
        body: _currentScreenIndex == 0 ? _setsScreen : _bansScreen,
        bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentScreenIndex,
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                  icon: Icon(Icons.category),
                  title: Text('Standard sets'),
              ),
              BottomNavigationBarItem(
                  icon: Icon(Icons.content_cut),
                  title: Text('Banned cards'),
              ),
            ],
            onTap: _onBottomBarTap,
        ),
        floatingActionButton: _currentScreenIndex == 0 ? FloatingActionButton(
            tooltip: _timelineView ? 'Show as a list' : 'Show as a timeline',
            child: _timelineView ? Icon(Icons.menu) : Icon(Icons.date_range),
            onPressed: () {
              setState(() {
                _timelineView ^= true;
              });
            },
        ) : null,
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
        );
  }
}

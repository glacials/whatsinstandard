import 'package:flutter/material.dart';
import 'package:timeline_list/timeline.dart';
import 'package:timeline_list/timeline_model.dart';
import 'package:http/http.dart' as http;

import 'package:whatsinstandard/screens/bans.dart';
import 'package:whatsinstandard/screens/info.dart';
import 'package:whatsinstandard/screens/sets.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  static final home = '/';
  static final bans = '/bans';
  static final info = '/info';
  static final Map<int, String> pageNums = {
    0: home,
    1: bans,
    2: info,
  };

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "What's in Standard?",
      theme: ThemeData(
        primarySwatch: Colors.pink,
      ),
      routes: {
        MyApp.home: (context) {
          return FutureBuilder<http.Response>(
            future: http.get('https://whatsinstandard.com/api/v6/standard.json'),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return SetsScreen(response: snapshot.data);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              return Scaffold(
                appBar: AppBar(
                  title: Text('Standard-legal sets'),
                ),
                body: Center(child: Column(
                  children: [
                    CircularProgressIndicator(),
                    Padding(padding: EdgeInsets.all(19)),
                    Text('Fetching current Standard info'),
                    Padding(padding: EdgeInsets.all(19)),
                  ],
                  mainAxisAlignment: MainAxisAlignment.center,
                )),
                bottomNavigationBar: BottomAppBar(
                  child: BottomNavigationBar(
                    currentIndex: 0,
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
                  ),
                  clipBehavior: Clip.antiAlias,
                  notchMargin: 6,
                  shape: CircularNotchedRectangle(),
                ),
              );
            },
          );
        },
      },
    );
  }
}

class HomeScreen extends StatefulWidget {
  HomeScreen({Key key, this.title, this.dates}) : super(key: key);

  final String title;
  final bool dates;

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int activeTab = 0;
  bool _timelineView = false;
  static List<Widget> _widgetOptions = <Widget>[
    SetsScreen(),
    BansScreen(),
    InfoScreen(),
  ];

  void _toggleDropDates() {
    setState(() {
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
  }

  void _updateTab(int index) {
    setState(() {
      activeTab = index;
    });
  }
}

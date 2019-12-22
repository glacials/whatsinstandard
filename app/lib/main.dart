import 'package:flutter/material.dart';
import 'package:timeline_list/timeline.dart';
import 'package:timeline_list/timeline_model.dart';

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
          return SetsScreen();
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

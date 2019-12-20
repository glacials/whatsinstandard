import 'package:flutter/material.dart';
import 'package:timeline_list/timeline.dart';
import 'package:timeline_list/timeline_model.dart';

import 'package:whatsinstandard/screens/bans.dart';
import 'package:whatsinstandard/screens/info.dart';
import 'package:whatsinstandard/screens/sets.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  static final home = '/';
  static final setsWithDates = '/timeline';
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
        MyApp.bans: (context) {
          return BansScreen();
        },
        MyApp.info: (context) {
          return InfoScreen();
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
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: AnimatedContainer(
        child: _widgetOptions.elementAt(activeTab),
        curve: Curves.bounceIn,
        duration: Duration(seconds: 1),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.hourglass_empty),
            title: Text('Legal sets'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.content_cut),
            title: Text('Banned cards'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.info_outline),
            title: Text('Standard info'),
          ),
        ],
        currentIndex: activeTab,
        selectedItemColor: Colors.pink[800],
        onTap: (int index) => Navigator.pushNamed(context, MyApp.pageNums[index])
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggleDropDates,
        tooltip: 'Toggle drop dates',
        child: activeTab == 0 ? Icon(Icons.menu) : Icon(Icons.date_range),
      ),
    );
  }

  void _updateTab(int index) {
    setState(() {
      activeTab = index;
    });
  }
}

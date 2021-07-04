import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:desktop_window/desktop_window.dart';

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
    DesktopWindow.setMinWindowSize(Size(300, 600));
    DesktopWindow.setMaxWindowSize(Size(500, 1000));
    DesktopWindow.setWindowSize(Size(500, 1000));
    return MaterialApp(
      title: "What's in Standard?",
      theme: ThemeData(
        primarySwatch: Colors.pink,
      ),
      darkTheme: ThemeData(
        accentColor: Colors.pink[300],
        brightness: Brightness.dark,
        primarySwatch: Colors.pink,
      ),
      routes: {
        MyApp.home: (context) {
          return FutureBuilder<http.Response>(
            future: http
                .get(Uri.https('whatsinstandard.com', '/api/v6/standard.json')),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return SetsScreen(response: snapshot.data!);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              return Scaffold(
                appBar: AppBar(
                  title: Text('Standard-legal sets'),
                ),
                body: Center(
                    child: Column(
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
                        label: 'Standard sets',
                      ),
                      BottomNavigationBarItem(
                        icon: Icon(Icons.content_cut),
                        label: 'Banned cards',
                      ),
                    ],
                  ),
                  clipBehavior: Clip.antiAlias,
                  notchMargin: 6,
                  shape: CircularNotchedRectangle(),
                ),
                floatingActionButton: FloatingActionButton(
                  child: Icon(Icons.date_range),
                  onPressed: () {
                    // Do nothing, this button is only here while loading
                  },
                ),
                floatingActionButtonLocation:
                    FloatingActionButtonLocation.centerDocked,
              );
            },
          );
        },
      },
    );
  }
}

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:whatsinstandard/widgets/navigation_container.dart';

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
      darkTheme: ThemeData(
        colorScheme:
            ColorScheme.fromSwatch(primarySwatch: Colors.pink).copyWith(
          secondary: Colors.pink[300],
          brightness: Brightness.dark,
        ),
      ),
      debugShowCheckedModeBanner: false,
      routes: {
        MyApp.home: (context) {
          return FutureBuilder<http.Response>(
            future: http
                .get(Uri.https('whatsinstandard.com', '/api/v6/standard.json')),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return NavigationContainer(response: snapshot.data!);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }

              return Scaffold(
                appBar: AppBar(
                  title: Text('Standard Sets'),
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
                        label: 'Standard Sets',
                      ),
                      BottomNavigationBarItem(
                        icon: Icon(Icons.content_cut),
                        label: 'Banned Cards',
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

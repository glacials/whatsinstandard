import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:http/http.dart' as http;
import 'package:relative_time/relative_time.dart';

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
    return PlatformProvider(
      builder: (context) => PlatformTheme(
        materialLightTheme: ThemeData(
          colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.pink)
              .copyWith(
                  brightness: Brightness.light, secondary: Colors.pink[300]),
          primarySwatch: Colors.pink,
        ),
        materialDarkTheme: ThemeData(
          colorScheme:
              ColorScheme.fromSwatch(primarySwatch: Colors.pink).copyWith(
            brightness: Brightness.dark,
            secondary: Colors.pink[300],
          ),
        ),
        builder: (context) => PlatformApp(
          debugShowCheckedModeBanner: false,
          localizationsDelegates: <LocalizationsDelegate<dynamic>>[
            RelativeTimeLocalizations.delegate,
            DefaultMaterialLocalizations.delegate,
            DefaultWidgetsLocalizations.delegate,
            DefaultCupertinoLocalizations.delegate,
          ],
          routes: {
            MyApp.home: (context) {
              return FutureBuilder<http.Response>(
                future: http.get(
                    Uri.https('whatsinstandard.com', '/api/v6/standard.json')),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return NavigationContainer(response: snapshot.data!);
                  } else if (snapshot.hasError) {
                    return Text("${snapshot.error}");
                  }

                  return PlatformScaffold(
                    appBar: PlatformAppBar(
                      title: Text('Standard Sets'),
                    ),
                    body: SafeArea(
                      child: Center(
                          child: Column(
                        children: [
                          CircularProgressIndicator(),
                          Padding(padding: EdgeInsets.all(19)),
                          Text('Fetching current Standard info'),
                          Padding(padding: EdgeInsets.all(19)),
                        ],
                        mainAxisAlignment: MainAxisAlignment.center,
                      )),
                    ),
                    bottomNavBar: PlatformNavBar(
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
                  );
                },
              );
            },
          },
          title: "What's in Standard?",
        ),
      ),
    );
  }
}

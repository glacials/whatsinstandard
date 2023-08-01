import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:http/http.dart' as http;
import 'package:relative_time/relative_time.dart';
import '../screens/bans.dart';
import 'responsive_container.dart';

import 'blocks.dart';

class StandardSet {
  final String name;
  final String? codename;
  final String? code;
  final Uri symbol;
  final DateTime? exactEnterDate;
  final String roughEnterDate;
  final DateTime? exactExitDate;
  final String roughExitDate;

  StandardSet(
      {required this.name,
      required this.codename,
      required this.code,
      required this.symbol,
      required this.exactEnterDate,
      required this.roughEnterDate,
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
      roughEnterDate: json['enterDate']['rough'],
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

  String friendlyEnterDate(BuildContext context) {
    if (this.exactEnterDate == null) {
      return this.roughEnterDate;
    }
    return RelativeTime(context).format(this.exactEnterDate!);
  }

  bool isReleased() {
    return this.exactEnterDate != null &&
        DateTime.now().isAfter(this.exactEnterDate!);
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
      _setsScreen = PlatformCircularProgressIndicator();
    } else {
      _setsScreen = Blocks(sets: this._sets);
    }

    final Widget _bansScreen = BansScreen(response: widget.response);

    return ResponsiveContainer(
      narrow: PlatformScaffold(
        appBar: PlatformAppBar(
          title: _currentScreenIndex == 0
              ? PlatformText('Standard Sets')
              : PlatformText('Banned Cards'),
        ),
        body: SafeArea(
          child: _currentScreenIndex == 0 ? _setsScreen : _bansScreen,
        ),
        bottomNavBar: PlatformNavBar(
          currentIndex: _currentScreenIndex,
          height: 60,
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
          itemChanged: _onBottomBarTap,
        ),
      ),
      wide: PlatformScaffold(
        body: Row(children: [
          Expanded(
            child: Column(children: [
              PlatformAppBar(title: PlatformText("What's in Standard?")),
              Expanded(
                  flex: 1,
                  child: SafeArea(
                    child: _setsScreen,
                    right: false,
                  ))
            ]),
            flex: 1,
          ),
          Expanded(
            child: Column(children: [
              PlatformAppBar(title: PlatformText("Banned Cards")),
              Expanded(
                  flex: 1, child: SafeArea(child: _bansScreen, left: false))
            ]),
            flex: 1,
          )
        ]),
      ),
    );
  }
}

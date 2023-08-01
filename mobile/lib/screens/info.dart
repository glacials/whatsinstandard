import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';

class InfoScreen extends StatefulWidget {
  @override
  _InfoScreenState createState() => _InfoScreenState();
}

class _InfoScreenState extends State<InfoScreen> {
  @override
  Widget build(BuildContext context) {
    return PlatformScaffold(
      appBar: PlatformAppBar(
        title: Text('What is Standard?'),
      ),
      body: SafeArea(
        child: Text.rich(
          TextSpan(
            text: 'What ',
            children: <TextSpan>[
              TextSpan(
                text: 'is',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
              TextSpan(text: ' Standard?')
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';

class InfoScreen extends StatefulWidget {
  @override
  _InfoScreenState createState() => _InfoScreenState();
}

class _InfoScreenState extends State<InfoScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text('What is Standard?'),
        ),
        body: Text.rich(
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
    );
  }
}

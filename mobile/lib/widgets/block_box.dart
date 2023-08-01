import 'package:flutter/material.dart';

class BlockBox extends StatelessWidget {
  final String title;
  final Widget child;

  const BlockBox({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Row(children: <Widget>[
        Expanded(
          child: new Container(
              margin: const EdgeInsets.only(left: 10.0, right: 20.0),
              child: Divider(
                color: Colors.grey,
                height: 36,
              )),
        ),
        Text(this.title),
        Expanded(
          child: new Container(
              margin: const EdgeInsets.only(left: 20.0, right: 10.0),
              child: Divider(
                color: Colors.grey,
                height: 36,
              )),
        ),
      ]),
      Container(
          child: Container(child: this.child, margin: EdgeInsets.only(top: 10)),
          transform: Matrix4.translationValues(0, -17, 0.0),
          decoration: BoxDecoration(
              border: Border(
            right: BorderSide(color: Colors.grey),
            left: BorderSide(color: Colors.grey),
          )),
          margin: EdgeInsets.only(
            right: 10,
            bottom: 10,
            left: 10,
          ),
          padding: EdgeInsets.only(right: 10, bottom: 10, left: 10)),
    ]);
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:url_launcher/url_launcher.dart';

import 'package:whatsinstandard/screens/bans.dart';

class HeroCardScreen extends StatelessWidget {
  final BannedCard bannedCard;

  HeroCardScreen({required Key key, required this.bannedCard})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PlatformScaffold(
      appBar: PlatformAppBar(
          leading: PlatformTextButton(
            child: Icon(Icons.expand_more),
            onPressed: () => Navigator.pop(context),
          ),
          title: PlatformText("Banned Cards")),
      body: ListView(
        children: [
          Column(
            children: [
              PlatformListTile(
                leading: Icon(
                  Icons.block,
                  color: Colors.grey,
                ),
                title: PlatformText(bannedCard.name),
                trailing: PlatformText(bannedCard.setCode),
              ),
              Padding(
                  child: Align(
                      alignment: Alignment.topLeft,
                      child: PlatformText(bannedCard.reason)),
                  padding: EdgeInsets.only(left: 23, right: 23)),
              ButtonBar(
                alignment: MainAxisAlignment.start,
                children: [
                  PlatformTextButton(
                    child: PlatformText('Scryfall'),
                    onPressed: () async {
                      Uri uri = Uri.https(
                          'scryfall.com', '/search', {"q": bannedCard.name});
                      if (await canLaunch(uri.toString())) {
                        await launch(uri.toString());
                      } else {
                        throw 'Could not launch ban announcement URL';
                      }
                    },
                  ),
                  PlatformTextButton(
                      child: PlatformText('Announcement'),
                      onPressed: () async {
                        String url = bannedCard.announcementUrl;
                        if (await canLaunch(url)) {
                          await launch(url);
                        } else {
                          throw 'Could not launch ban announcement URL';
                        }
                      }),
                ],
              ),
            ],
          ),
          Hero(
            child: Padding(
              child: Image.network(bannedCard.imageUrl, fit: BoxFit.fitHeight),
              padding: EdgeInsets.all(10),
            ),
            tag: bannedCard.name,
          ),
        ],
      ),
    );
  }
}

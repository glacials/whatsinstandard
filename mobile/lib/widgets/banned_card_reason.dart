import 'package:flutter/material.dart';
import 'package:flutter_platform_widgets/flutter_platform_widgets.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:whatsinstandard/screens/bans.dart';
import 'package:whatsinstandard/widgets/navigation_container.dart';

class BannedCardReason extends StatelessWidget {
  const BannedCardReason({
    Key? key,
    required this.bannedCard,
    required this.set,
  }) : super(key: key);

  final BannedCard bannedCard;
  final StandardSet set;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(padding: EdgeInsets.only(bottom: 10)),
        PlatformListTile(
          title: PlatformText(bannedCard.name),
          subtitle: Row(children: [
            Padding(
              padding: const EdgeInsets.only(right: 7),
              child: Icon(
                Icons.block,
                color: Colors.grey,
                size: 15,
              ),
            ),
            PlatformText(set.name)
          ]),
        ),
        Padding(
            child: Align(
                alignment: Alignment.topLeft,
                child: Container(
                  child: PlatformText(bannedCard.reason),
                  constraints: BoxConstraints(minHeight: 60),
                )),
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
    );
  }
}

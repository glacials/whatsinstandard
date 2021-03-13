# Firebase

This directory holds the Firebase Function `maybeTweet`, which checks periodically against the _What's in Standard?_ API for changes to Standard, then tweets those changes from [@whatsinstandard][@whatsinstandard].

## Development

To test locally, you need `firebase-tools `installed.
```sh
firebase emulators:start
```

Hit the function from a different terminal:
```sh
curl -i http://127.0.0.1:5001/whats-in-standard/us-central1/maybeTweet
```

To actually test tweeting, you will need some config variables set:
```sh
firebase functions:config:set twitter.access_token=CHANGEME twitter.access_token_secret=CHANGEME twitter.api_key=CHANGEME twitter.api_secret=CHANGEME
firebase functions:config:get > functions/.runtimeconfig.json
```

To see the database state, you can use the Firebase emualator UI. It should
boot with the emulators, and give you a link to access it.

### Architecture
The cron architecture is embedded in the Firebase function; there is no
separate architecture that pings it. Look for the `functions.pubsub.schedule`
call.

### Deploying
```sh
firebase deploy
```

[@whatsinstandard]: https://twitter.com/whatsinstandard

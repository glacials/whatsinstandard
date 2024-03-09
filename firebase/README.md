# Firebase

This directory holds the Firebase Function `detectRotations`,
which checks periodically against the _What's in Standard?_ API for changes to Standard,
then tweets the changes to Twitter from [@whatsinstandard][@whatsinstandard]
and toots them to Mastodon from [@whatsinstandard@mas.to][@whatsinstandard@mas.to].

## Development

To test locally, you need `firebase-tools` installed.

```sh
npm install -g firebase-tools
firebase emulators:start
```

Hit the function from a different terminal:

```sh
curl -i http://127.0.0.1:5001/whats-in-standard/us-central1/toot -d '{}'
```

To actually test tweeting, you will need some config variables set.

**WARNING: If you are hooked up to a Firebase project already,
you may be using production without realizing it.
However you will be using a development (read: empty) Firestore database,
so testing this will actually send a tweet when the function thinks it hasn't tweeted a past change yet.**

```sh
firebase functions:config:set twitter.bearer_token=CHANGEME
firebase functions:config:set mastodon.server.url=CHANGEME mastodon.access_token=CHANGEME
firebase functions:config:get > functions/.runtimeconfig.json
```

To see the database state, you can use the Firebase emualator UI. It should
boot with the emulators, and give you a link to access it.

### Architecture

The cron architecture is embedded in the Firebase function; there is no
separate architecture that pings it. Look for the `functions.pubsub.schedule`
call.

### Deploying

Edit `.firebaserc` to point `projects.default` to `whats-in-standard` if needed.

```sh
npm --prefix functions run build
firebase use whats-in-standard # Or your project name
firebase deploy
firebase use whats-in-standard-beta # Or your non-production project name
```

Then revert `.firebaserc`.

[@whatsinstandard]: https://twitter.com/whatsinstandard
[@whatsinstandard@mas.to]: https://mas.to/@whatsinstandard

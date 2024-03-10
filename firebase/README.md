# Firebase

This directory holds the Firebase Function `detectRotations`,
which checks periodically against the _What's in Standard?_ API for changes to Standard,
then tweets the changes to Twitter from [@whatsinstandard][@whatsinstandard]
and toots them to Mastodon from [@whatsinstandard@mas.to][@whatsinstandard@mas.to].

## Development

To test locally, you need `firebase-tools` installed.

```sh
npm install -g firebase-tools
firebase functions:shell
```

To actually test tweeting and tooting,
you will need to set these secrets in Google Cloud Secret Manager:

```plain
MASTODON_ACCESS_TOKEN
TWITTER_BEARER_TOKEN
```

Now, visit the Firebase console and add the following structure to Firestore manually:

```plain
twitterbot      (collection)
  last-known    (document)
    sets        (collection)
      deleteme  (document)
mastodonbot     (collection)
  last-known    (document)
    sets        (collection)
      deleteme  (document)
```

In the new Firebase shell:

```sh
detectRotations()
```

### Architecture

The cron architecture is embedded in the Firebase function; there is no
separate architecture that pings it. Look for the `functions.pubsub.schedule`
call.

### Deploying

```sh
npm --prefix functions run build
firebase use whats-in-standard # Or your production project name
firebase deploy
firebase use whats-in-standard-beta # Or your non-production project name
```

Then revert `.firebaserc`.

[@whatsinstandard]: https://twitter.com/whatsinstandard
[@whatsinstandard@mas.to]: https://mas.to/@whatsinstandard

# Firebase

This directory holds the Firebase Function `detectRotations`,
which checks periodically against the _What's in Standard?_ API for changes to Standard,
then tweets the changes to Twitter from [@whatsinstandard][@whatsinstandard]
and toots them to Mastodon from [@whatsinstandard@mas.to][@whatsinstandard@mas.to].

## Development

To test locally, you need `firebase-tools` installed.

```sh
npm install -g firebase-tools
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

Open a Firebase shell:

```sh
firebase use whats-in-standard-beta # Or your non-production project name
firebase functions:shell # Note that changes to .env require rerunning this
```

and invoke the function:

```sh
detectRotations()
```

### Architecture

The cron architecture is embedded in the Firebase function; there is no
separate architecture that pings it. Look for the `functions.pubsub.schedule`
call.

### Deploying

```sh
mv functions/.env ~/.env.firebase.tmp

# Make sure the following command prints "Now using project whats-in-standard"
firebase use whats-in-standard

firebase deploy
firebase use whats-in-standard-beta
mv ~/.env.firebase.tmp functions/.env
```

Then revert `.firebaserc`.

[@whatsinstandard]: https://twitter.com/whatsinstandard
[@whatsinstandard@mas.to]: https://mas.to/@whatsinstandard

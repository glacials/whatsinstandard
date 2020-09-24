#!/bin/sh

GITHUB_USERNAME="glacials"          # The user $GITHUB_TOKEN belongs to
GITHUB_ORGANIZATION="glacials"      # Organization that holds the repository
GITHUB_REPOSITORY="whatsinstandard" # Repository name (e.g. test-js-app)
BUILD_DIR="."                       # Where the application gets built into

# This is the author and message information YourBase will use on each deploy
# commit. These commits will only appear on gh-pages, not on master, and will
# be overwritten by each new deploy.
COMMITTER_NAME="YourBase"
COMMITTER_EMAIL="qhiiyr@gmail.com"
COMMIT_MESSAGE="Automatic deploy by YourBase"

mkdir -p ${BUILD_DIR}

# Replace these lines with any steps necessary to get your application ready for
# deploy.
npm install

cd ${BUILD_DIR}

# Create the "pages" remote if it doesn't exist. This might be the same
# destination as origin, but we're going to use our credentials for this one.
git config remote.pages.url >&- || git remote add pages https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_ORGANIZATION}/${GITHUB_REPOSITORY}

git checkout -b gh-pages
git add .
git -c "user.name=${COMMITTER_NAME}" -c "user.email=${COMMITTER_EMAIL}" commit --allow-empty -am "${COMMIT_MESSAGE}"
git push --force pages gh-pages

# CDK + localstack tester

## Requirements

- Docker
- cdk: `npm i -g aws-cdk`
- aws-cdk-local: `npm i -g aws-cdk-local`

## Running

In a terminal in `cdk`
- `docker-compose up`
- wait for `Ready` to be shown

In another terminal in `cdk`
- `cdk synth` (checks everything & preps `cdk.out` directory)
- `cdklocal bootstrap` (checks for changes in stack. Required when changing infra)
- `cdklocal deploy` (pushes changes to local docker)

API can be reached via the URL outputted to console (`CDKStack.Endpoint`)
- GET requests return the message stored in the DB
- POST requests set the message stored in the DB
  - body should be of the form `{"message":"Some message goes here"}`
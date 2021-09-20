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
- `npm run build` (compiles TS to JS)
- `cdk synth` (checks everything & preps `cdk.out` directory)
- `cdklocal bootstrap` (first time only?)
- `cdklocal deploy` (pushes changes to local docker)

API can be reached via the URL outputted to console (`CDKStack.Endpoint`)

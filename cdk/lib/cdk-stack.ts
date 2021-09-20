import * as cdk from '@aws-cdk/core';
import {Function,Code, Runtime} from "@aws-cdk/aws-lambda";
import { LambdaIntegration, RestApi} from "@aws-cdk/aws-apigateway";
import {CfnOutput} from "@aws-cdk/core";
import {AttributeType, Table} from "@aws-cdk/aws-dynamodb";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new Table(this, 'hello-world-datastore', {
      tableName: 'hw-data',
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING,
      },
    });

    const getHelloWorldLambda = new Function(this, 'getHelloWorldLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda'),
      handler: 'helloWorld.get',
    });

    const postHelloWorldLambda = new Function(this, 'postHelloWorldLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda'),
      handler: 'helloWorld.post',
    });

    const api = new RestApi(this, 'myapi', {});
    const getHelloWorldLambdaIntegration = new LambdaIntegration(getHelloWorldLambda);
    const postHelloWorldLambdaIntegration = new LambdaIntegration(postHelloWorldLambda);
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod("GET", getHelloWorldLambdaIntegration);
    helloResource.addMethod("POST", postHelloWorldLambdaIntegration);
    new CfnOutput(this, "Endpoint", { value: `http://localhost:4566/restapis/${api.restApiId}/prod/_user_request_${helloResource.path}` })
  }
}

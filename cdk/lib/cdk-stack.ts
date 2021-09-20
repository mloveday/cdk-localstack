import * as cdk from '@aws-cdk/core';
import {Function,Code, Runtime} from "@aws-cdk/aws-lambda";
import { LambdaIntegration, RestApi} from "@aws-cdk/aws-apigateway";
import {CfnOutput} from "@aws-cdk/core";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloWorldLambda = new Function(this, 'helloWorld', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('lambda'),
      handler: 'helloWorld.handler',
    });

    const api = new RestApi(this, 'myapi', {});
    const helloWorldLambdaIntegration = new LambdaIntegration(helloWorldLambda);
    const helloResource = api.root.addResource('hello')
    helloResource.addMethod("GET", helloWorldLambdaIntegration)
    new CfnOutput(this, "Endpoint", { value: `http://localhost:4566/restapis/${api.restApiId}/prod/_user_request_${helloResource.path}` })
  }
}

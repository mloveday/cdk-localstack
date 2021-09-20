import {DynamoDB} from 'aws-sdk';
import {APIGatewayProxyHandler} from "aws-lambda/trigger/api-gateway-proxy";

const db = new DynamoDB.DocumentClient({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: 'us-east-1'
});

export const get: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  const data = await db.get({
    TableName: 'hw-data',
    Key: {
      PK: '1',
    }
  }).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: data.Item?.message ?? 'Hello world!',
  };
};

export const post: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  const newMessage = JSON.parse(event.body ?? '');
  if (typeof newMessage?.message !== 'string') return {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  await db.update({
    TableName: 'hw-data',
    Key: {PK: '1'},
    UpdateExpression: "set message = :message",
    ExpressionAttributeValues: {
      ':message': newMessage.message,
    }
  }).promise();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(true),
  }
};
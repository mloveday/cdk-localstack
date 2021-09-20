import {DynamoDB} from 'aws-sdk';
import {APIGatewayProxyHandler} from "aws-lambda/trigger/api-gateway-proxy";

const db = new DynamoDB.DocumentClient({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: 'us-east-1'
});

const tableName = 'hw-data';
const helloWorldKey = '1';

const respondWith = (statusCode: number, body: string) => ({
  statusCode,
  body,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export const get: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  try {
    const data = await db.get({
      TableName: tableName,
      Key: { PK: helloWorldKey }
    }).promise();
    return respondWith(200, data.Item?.message ?? 'Hello world!');
  } catch (e) {
    return respondWith(500, JSON.stringify(e));
  }
};

export const post: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<any> => {
  const newMessage = JSON.parse(event.body ?? '');

  if (typeof newMessage?.message !== 'string') {
    return respondWith(400, 'request body must be of form { message: string }');
  }

  try {
    await db.update({
      TableName: tableName,
      Key: {PK: helloWorldKey},
      UpdateExpression: "set message = :message",
      ExpressionAttributeValues: {
        ':message': newMessage.message,
      }
    }).promise();
  } catch (e) {
    return respondWith(500, JSON.stringify(e));
  }

  return respondWith(200, 'Successfully updated');
};
import {DynamoDB} from 'aws-sdk';

const db = new DynamoDB.DocumentClient({
  endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  region: 'us-east-1'
});

export const handler: any = async (
  event: any,
  context: any,
  callback: any
): Promise<any> => {
  await db.put({
    TableName: 'hw-data',
    Item: {
        PK: '1',
        data: 'Hello World!',
      }
    }).promise();

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
    body: JSON.stringify(data.Item),
  };
};
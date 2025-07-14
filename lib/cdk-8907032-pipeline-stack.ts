import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class Cdk8907032PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ✅ Create S3 Bucket
    const myBucket = new s3.Bucket(this, 'Bucket8907032', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Good for dev
    });

    // ✅ Create Lambda Function
    const myLambda = new lambda.Function(this, 'Lambda8907032', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log("Lambda invoked with event:", JSON.stringify(event));
          return { statusCode: 200, body: "Hello from Lambda 8907032!" };
        };
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
      },
    });

    // ✅ Create DynamoDB Table
    const myTable = new dynamodb.Table(this, 'DynamoTable8907032', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'MyTable8907032',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}

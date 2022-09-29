import boto3
from botocore.config import Config
from os import environ
import dotenv

dotenv.load_dotenv()

aws_access_key_id = environ.get('AWS_ACCESS_KEY_ID')
aws_secret_access_key = environ.get('AWS_SECRET_ACCESS_KEY')
aws_region_name = environ.get('AWS_REGION_NAME')
aws_bucket_name = environ.get('AWS_BUCKET_NAME')


def upload_file_to_s3(file, file_name) -> str:
    s3 = boto3.client(
        's3',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=aws_region_name,
        config=Config(signature_version='s3v4')
    )
    s3.upload_fileobj(
        file,
        aws_bucket_name,
        file_name,
        ExtraArgs={
            "ACL": "public-read"
        }
    )
    s3.close()
    return f"https://{aws_bucket_name}.s3.amazonaws.com/{file_name}"



def save_data_to_dynamodb(data: dict) -> bool:
    dynamodb = boto3.resource(
        'dynamodb',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=aws_region_name,
        config=Config(signature_version='s3v4')
    )
    table = dynamodb.Table('bezen')
    table.put_item(
        Item=data
    )
    return True


def filter_data_from_dynamodb(filter_string: str) -> list:
    dynamodb = boto3.resource(
        'dynamodb',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=aws_region_name,
        config=Config(signature_version='s3v4')
    )
    table = dynamodb.Table('bezen')
    response = table.scan()
    data = response['Items']
    output = []
    for i in data:
        for j in i['subtitles']:
            if filter_string.lower() in j['text'].lower():
                output.append(i)
                break
    return output
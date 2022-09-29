from django.core.files import File
from django.core.files.storage import FileSystemStorage
from pathlib import Path
import os
from celery import shared_task
from ccextractor import CCExtractor
from aws import upload_file_to_s3, save_data_to_dynamodb


BASE_DIR = Path(__file__).resolve().parent.parent


@shared_task
def extract_subtitles_and_save_to_s3(video_path: str, video_name: str):
    print(video_path)
    extract_subtitles = CCExtractor(video_name, video_path).extract_time_text_from_srt()
    storage = FileSystemStorage()
    print(video_path)
    path_object = Path(video_path)
    
    with path_object.open(mode='rb') as file:
        video = File(file, name=path_object.name)
        save_to_s3 = upload_file_to_s3(video, video_name)
        
        # save data to dynamodb
        save_data_to_dynamodb({
            "video_name": video.name,
            "subtitles": extract_subtitles,
            "url": save_to_s3
        })
    
    storage.delete(video_name)
    
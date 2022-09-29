from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage
from django.core.files import File
from aws import filter_data_from_dynamodb
from .tasks import extract_subtitles_and_save_to_s3


class UploadVideoView(APIView):
    
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):    
        video = request._request.FILES['video']
        storage = FileSystemStorage()
        
        video.name = storage.get_available_name(video)

        storage.save(video.name.replace(" ", "_"), File(video))
        extract_subtitles_and_save_to_s3.delay(storage.path(video.name.replace(" ", "_")), video.name.replace(" ", "_"))
        
        return Response({
            "meta": {
                "video_name": str(video.name),
            },
            "status": "success"
        }, status=201)


class SearchSubtitlesView(APIView):

    def get(self, request):
        search_text = request.GET.get("q")
        data = filter_data_from_dynamodb(search_text)
        for i in data:
            text_location = {}
            for j in i["subtitles"]:
                print(j)
                if search_text.lower() in j["text"].lower():
                    text_location = j
                    break
            i["text_location"] = text_location
        return Response({
            "data": data
        }, status=200)


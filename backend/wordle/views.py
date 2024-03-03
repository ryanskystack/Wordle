from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .utils.guess import Guesser
import json

g = Guesser()

def index(request):
    return HttpResponse("Hello world. This is the API endpoint for the Wordle-Helper.")

@csrf_exempt
@require_http_methods(["POST"])
def guess(request):
    if request.body:
        data = json.loads(request.body)['data']
        result = g.batch_filter(data)
        return JsonResponse(result, safe=False)
    else:
        return HttpResponse('No data provided', status=400)

@require_http_methods(["GET"])
def new_word(request):
    normal = request.GET.get('normal', 'TRUE')
    is_normal = normal.upper() == 'TRUE'
    result = g.get_new_word(is_normal)
    return JsonResponse(result, safe=False)
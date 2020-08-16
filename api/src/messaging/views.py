from django.shortcuts import render

# Todo: Remove this file later
def index(request):
    return render(request, 'index.html')


def room(request, room_id):
    return render(request, 'room.html', {
        'room_id': room_id
    })
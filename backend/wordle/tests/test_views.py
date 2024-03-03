from django.test import TestCase, Client
from django.urls import reverse
from ..views import index, guess, new_word
import json

class ViewTestCase(TestCase):
    # This method is called before each test. It sets up the test environment.
    def setUp(self):
        # Create a client instance. The client is a dummy web browser for simulating GET and POST requests.
        self.client = Client()

    # This is a test case for the index view.
    def test_index_view(self):
        # Send a GET request to the index view.
        response = self.client.get(reverse('index'))  
        # Check if the status code of the response is 200 (HTTP OK).
        self.assertEqual(response.status_code, 200)
        # Check if the content of the response is the expected string.
        self.assertEqual(response.content.decode(), "Hello world. This is the API endpoint for the Wordle-Helper.")

    # This is a test case for the guess view.
    def test_guess_view(self):
        # Define the data to be sent in the POST request.
        data = {'data': [['HELLO', '...Y.']]}  
        # Send a POST request to the guess view with the defined data.
        response = self.client.post(reverse('guess'), data=json.dumps(data), content_type='application/json') 
        # Check if the status code of the response is 200 (HTTP OK).
        self.assertEqual(response.status_code, 200)

    # This is a test case for the new_word view.
    def test_new_word_view(self):
        # Send a GET request to the new_word view.
        response = self.client.get(reverse('new_word'))  
        # Check if the status code of the response is 200 (HTTP OK).
        self.assertEqual(response.status_code, 200)

from django.test import TestCase
import unittest
import responses
from ..utils.word_lib import request_content, words_big, words_small, WORD_BIG_URL, WORD_SMALL_URL
from ..utils.guess import Guesser

# Test the request_content function
class RequestContentTest(TestCase):
    @responses.activate
    def test_request_content(self):
        # Mock the HTTP request
        responses.add(responses.GET, 'http://test.com', body='abcde\nfghij\n', status=200)

        # Call the function with the mocked request
        result = request_content('http://test.com')

        # Check the result
        self.assertEqual(result, ['abcde', 'fghij'])

    @responses.activate
    def test_words_big(self):
        # Mock the HTTP request
        responses.add(responses.GET, WORD_BIG_URL, body='abcde\nfghij\n', status=200)

        # Call the function with the mocked request
        result = words_big()

        # Check the result
        self.assertEqual(result, ['abcde', 'fghij'])

    @responses.activate
    def test_words_small(self):
        # Mock the HTTP request
        responses.add(responses.GET, WORD_SMALL_URL, body='klmno\npqrst\n', status=200)

        # Call the function with the mocked request
        result = words_small()

        # Check the result
        self.assertEqual(result, ['klmno', 'pqrst'])
        
# Test the Guesser class
class TestGuesser(unittest.TestCase):
    # This method is called before each test. It sets up the test environment.
    def setUp(self):
        # Create an instance of the Guesser class.
        self.guesser = Guesser()

    # This is a test case for the reply method of the Guesser class.
    def test_reply(self):
        # Define the guess and target words.
        guess = 'HELLO'
        target = 'WORLD'
        # Define the expected reply.
        expected_reply = '...GY'
        # Call the reply method of the Guesser instance and get the actual reply.
        actual_reply = self.guesser.reply(guess, target)
        # Check if the expected reply is equal to the actual reply.
        self.assertEqual(expected_reply, actual_reply)

    # This is a test case for the get_new_word method of the Guesser class.
    def test_get_new_word(self):
        # Get the lists of big and small words.
        big_words = list(map(lambda w: w.upper(), words_big()))
        small_words = list(map(lambda w: w.upper(), words_small()))
        # Call the get_new_word method of the Guesser instance with True and get a word.
        word = self.guesser.get_new_word(True)
        # Check if the word is in the list of small words.
        self.assertIn(word, small_words)

        # Call the get_new_word method of the Guesser instance with False and get a word.
        word = self.guesser.get_new_word(False)
        # Check if the word is in the list of big words.
        self.assertIn(word, big_words)

    # This is a test case for the filter_candidate method of the Guesser class.
    def test_filter_candidate(self):
        # Define the info and the list of candidates.
        info = ('HELLO', '...Y.')
        candidates = ['WORLD', 'HELLO', 'APPLE']
        # Define the expected result.
        expected_result = []
        # Call the filter_candidate method of the Guesser instance and get the actual result.
        actual_result = self.guesser.filter_candidate(info, candidates)
        # Check if the expected result is equal to the actual result.
        self.assertEqual(expected_result, actual_result)
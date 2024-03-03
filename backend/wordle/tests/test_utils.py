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
   
    def setUp(self):
        self.guesser = Guesser()

    def test_reply(self):
        guess = 'HELLO'
        target = 'WORLD'
        expected_reply = '...GY'
        actual_reply = self.guesser.reply(guess, target)
        self.assertEqual(expected_reply, actual_reply)

    def test_get_new_word(self):
        big_words = list(map(lambda w: w.upper(), words_big()))
        small_words = list(map(lambda w: w.upper(), words_small()))
        word = self.guesser.get_new_word(True)
        self.assertIn(word, small_words)

        word = self.guesser.get_new_word(False)
        self.assertIn(word, big_words)

    def test_filter_candidate(self):
        info = ('HELLO', '...Y.')
        candidates = ['WORLD', 'HELLO', 'APPLE']
        expected_result = []
        actual_result = self.guesser.filter_candidate(info, candidates)
        self.assertEqual(expected_result, actual_result)
'''
This module is responsible for providing the words for the guess program.
'''
import requests

WORD_BIG_URL    = 'https://raw.githubusercontent.com/salaschen/heroku/main/wordle-big.txt'
WORD_SMALL_URL  = 'https://raw.githubusercontent.com/salaschen/heroku/main/wordle-small.txt'

# read the word list from the remote server.
def request_content(url: str) -> [str]:
    resp = requests.get(url)
    if resp.status_code != 200:
        print(f'HTTP request failed. status code is {resp.status_code}')
        return []

    # now, the contents are 5-letter words divided by '\n', in bytes. 
    # I have to convert it into strings and stored into a list.
    # multithreading in the future?
    wordLength = 5
    result = []
    for i in range(0, len(resp.content), 6):
        # read the first 5 letters 
        word = ''
        for j in range(5):
            ch = chr(resp.content[i+j])
            word += ch
        result.append(word)
    return result

def words_big() -> [str]:
     return request_content(WORD_BIG_URL)

def words_small() -> [str]:
     return request_content(WORD_SMALL_URL)
            


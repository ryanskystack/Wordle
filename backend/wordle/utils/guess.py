'''
Prog: guess.py
Note:
    1) Guess the word by using the given information.
'''
from collections import Counter 
from .word_lib import words_big, words_small

GREEN, YELLOW, MISS = 'GY.'
REPLY = str # A reply is a 5 letter words like 'GY..G'
WORD  = str
INFO  = (WORD, REPLY) # a piece of info is the guess you made and the feedback. e.g., ('HELLO', '.GYGG')

# the best initial 4 guesses suggested by Peter Norvig
INITIAL_GUESSES = ['HANDY', 'SWIFT', 'GLOVE', 'CRUMP', 'BRUTE', 'CHANT', 'FILET', 'BALMY', 'PITCH','SWUNG', 'DROVE' ]

# get the list of words from the word library
# make them in upper cases

big_words = list(map(lambda w: w.upper(), words_big()))
small_words = list(map(lambda w: w.upper(), words_small()))

class Guesser:
    def __init__(self):
        # start with the big words list first.
        self.words = big_words 
        print('guesser loaded') # debug

    # for the wordle game: give a new word to the user when replay.
    def get_new_word(self, isNormal: bool) -> str:
        import random
        if isNormal:
            return random.choice(small_words)
        else:
            return random.choice(big_words)


    # given the target of the word, and a guess, calculate the wordle reply.
    def reply(self, guess, target) -> REPLY:
        result = ['.' for i in range(5)]
        counter = Counter(target)
        # print(counter) # debug
        for i in range(len(guess)):
            if guess[i] == target[i]:
                result[i] = GREEN
                counter[guess[i]] -= 1
    
        for i in range(len(guess)):
            if result[i] == '.' and counter[guess[i]] > 0:
                result[i] = YELLOW
                counter[guess[i]] -= 1
    
        return ''.join(result)
        
    
    def filter_candidate(self, info: INFO, candidates: [WORD]) -> [WORD]:
        guess, rep = info
        guess, rep = guess.upper(), rep.upper()
        result = [w for w in candidates if (self.reply(guess, w) == rep)]
        return result
        
    def batch_filter(self, infoList: [INFO], candidates: [WORD] = []) -> [WORD]:
        import random
        if len(candidates) == 0:
            candidates = self.words
            
        # if no feedback is given (at the beginning of the game), just give one of the *win* words.
        # win words were obtained by Peter Norvig
        if len(infoList) == 0:
            return random.choice(INITIAL_GUESSES)

        for info in infoList:
            candidates = self.filter_candidate(info, candidates)

        return self.get_only_normal_words(candidates)
    
    # when the number of candidates are too many, pick the normal words only
    def get_only_normal_words(self, words: [WORD], threshold: int = 50) -> [WORD]:
        if len(words) < threshold:
            return words

        result = []
        for w in words:
            if w in small_words:
                result.append(w)

        if len(result) == 0:
            return words
        else:
            return result

    # user interacting function.
    # allows user to manually 
    def guess(self):
        candidates = self.words[:]

        # keep asking the users for the feedback
        while True:
            response = input('input your guess and the feedback, separated by space, -1 to exit: ')
            if response == '-1':
                break

            # make sure the guess and game feedback are in upper cases.
            guess, rep = response.upper().split(' ')
            candidates = self.filterCandidate((guess, rep), candidates)
            if len(candidates) >= 10:
                candidates = self.get_only_normal_words(candidates)

            if len(candidates) >= 10:
                 candidates = self.get_only_normal_words(candidates)
            print(candidates)

            if len(candidates) <= 1:
                break

        print('game finished')


### test ###
'''
g = Guesser()
infos = [['amber', '...g.']]
# print(words)
g.guess()
'''

class Master:
    def __init__(self, secret, wordlist):
        self.secret = secret
        self.wordlist = wordlist

    def guess(self, word: str) -> int:
        match = 0
        if word not in self.wordlist:
            return -1
        for i, val in enumerate(word):
            if (val == self.secret[i]):
                match += 1

        return match


def runUserScript(func, params, paramTypes):
    if (len(params) != len(paramTypes)):
        onParameterError()

    newParams = []
    for i, val in enumerate(params):
        newParams.append(parseParameter(i, paramTypes[i], val))

    func(newParams[1], Master(newParams[0], newParams[1]))


def parseSpecialParameter(index, paramType, param):
    return None

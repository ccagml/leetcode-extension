def runUserScript(func, params, paramTypes):
    if (len(params) != len(paramTypes)):
        onParameterError()

    func(parseParameter(0, 'number', params[1]), parseParameter(
        1, 'MountainArray', params[0]))


def parseSpecialParameter(index, paramType, param):
    return None

import importlib.util
import sys
from pathlib import Path
import json
import re
import socket
import codecs

testString = str(sys.argv[2])
funcName = str(sys.argv[3])
paramTypes = str(sys.argv[4]).split(",")
problemNum = int(sys.argv[6])
debugServerPort = int(sys.argv[7])


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


def onParameterError():
    raise Exception(
        "Parameters parsing error, please check the format of the input parameters")


def onParameterTypeError(t):
    raise Exception("Unsupported parameter type: {}".format(t))


def isNumber(num):
    return isinstance(num, int)


def isString(s):
    return isinstance(s, str)


def isCharacter(s):
    return isString(s) and len(s) == 1


def isList(li):
    return isinstance(li, list)


def parseNumber(param):
    if (not isNumber(param)):
        onParameterError()
    return param


def parseNumberArray(param):
    if (not isList(param)):
        onParameterError()

    for i in param:
        if (not isNumber(i)):
            onParameterError()
    return param


def parseNumberArrayArray(param):
    if (not isList(param)):
        onParameterError()
    for i in param:
        parseNumberArray(i)
    return param


def parseString(param):
    if (not isString(param)):
        onParameterError()

    return param


def parseStringArray(param):
    if (not isList(param)):
        onParameterError()

    for i in param:
        parseString(i)

    return param


def parseStringArrayArray(param):
    if (not isList(param)):
        onParameterError()

    for i in param:
        parseStringArray(i)

    return param


def parseListNode(param):
    if (not isList(param)):
        onParameterError()

    head = None
    tail = None

    for i in param:
        node = ListNode(i)
        if (head == None):
            tail = node
            head = node
        else:
            tail.next = node
            tail = node

    return head


def parseListNodeArray(param):
    if (not isList(param)):
        onParameterError()

    res = []
    for i in param:
        res.append(parseListNode(i))

    return res


def parseCharacter(param):
    if (not isCharacter(param)):
        onParameterError()

    return param


def parseCharacterArray(param):
    if (not isList(param)):
        onParameterError()

    for i in param:
        parseCharacter(i)

    return param


def parseCharacterArrayArray(param):
    if (not isList(param)):
        onParameterError()

    for i in param:
        parseCharacterArray(i)

    return param


class NestedInteger:
    def __init__(self, ni):
        nested = []
        if (isList(ni)):
            for i, val in enumerate(ni):
                nested.append(NestedInteger(val))
        self.nested = nested
        self.ni = ni

    def isInteger(self) -> bool:
        """
        @return True if this NestedInteger holds a single integer, rather than a nested list.
        """
        if (isList(self.ni)):
            return False
        return True

    def getInteger(self) -> int:
        """
        @return the single integer that this NestedInteger holds, if it holds a single integer
        Return None if this NestedInteger holds a nested list
        """
        if (isList(self.ni)):
            return None
        return self.ni

    def getList(self):
        """
        @return the nested list that this NestedInteger holds, if it holds a nested list
        Return None if this NestedInteger holds a single integer
        """
        if (isList(self.ni)):
            return self.nested
        return None


def parseNestedIntegerArray(param):
    arr = []
    for i, val in enumerate(param):
        arr.append(NestedInteger(val))
    return arr


class MountainArray:
    def __init__(self, param):
        self.param = param

    def get(self, index: int) -> int:
        return self.param[index]

    def length(self) -> int:
        return len(self.param)


def parseMountainArray(param):
    return MountainArray(param)


def parseTreeNode(param):
    if (not isList(param)):
        onParameterError()

    root = None
    fifo = []
    i = 0
    while (i < len(param)):
        if (i == 0):
            root = TreeNode(param[i])
            i += 1
            fifo.append(root)
            continue

        parent = fifo.pop(0)
        if (param[i] != None):
            left = TreeNode(param[i])
            parent.left = left
            fifo.append(left)

        if (i + 1 < len(param) and param[i + 1] != None):
            right = TreeNode(param[i + 1])
            parent.right = right
            fifo.append(right)

        i = i + 2
    return root


def parseParameter(index, paramType, param):
    switch = {
        "number": lambda x: parseNumber(x),
        "number[]": lambda x: parseNumberArray(x),
        "number[][]": lambda x: parseNumberArrayArray(x),
        "string": lambda x: parseString(x),
        "string[]": lambda x: parseStringArray(x),
        "string[][]": lambda x: parseStringArrayArray(x),
        "ListNode": lambda x: parseListNode(x),
        "ListNode[]": lambda x: parseListNodeArray(x),
        "character": lambda x: parseCharacter(x),
        "character[]": lambda x: parseCharacterArray(x),
        "character[][]": lambda x: parseCharacterArrayArray(x),
        "NestedInteger[]": lambda x: parseNestedIntegerArray(x),
        "MountainArray": lambda x: parseMountainArray(x),
        "TreeNode": lambda x: parseTreeNode(x),
    }
    switchfun = switch.get(paramType, 0)

    if switchfun is 0:
        result = parseSpecialParameter(index, paramType, param)
        if result is None:
            onParameterTypeError(paramType)
        return result
    else:
        return switchfun(param)


def loadModule():
    # add module to search path
    parsedPath = Path(sys.argv[1])
    sys.path.append(parsedPath.parent)

    # load module
    spec = importlib.util.spec_from_file_location(parsedPath.stem, sys.argv[1])
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


// @@stub-for-code@@


def start():
    lines = testString.split("\\n")
    params = []
    for i, val in enumerate(lines):
        params.append(json.loads(codecs.getdecoder("unicode_escape")(val)[0]))

    module = loadModule()

    if (problemNum == 341):
        newParams = []
        for i, val in enumerate(params):
            newParams.append(parseParameter(i, paramTypes[i], val))

        i, v = module.NestedIterator(newParams[0]), []
        while i.hasNext():
            v.append(i.next())
    else:
        solution = module.Solution()
        func = getattr(solution, funcName)

        runUserScript(func, params, paramTypes)


def makeMessage(ty, message):
    return json.dumps({
        "type": ty,
        "message": message,
        "problemNum": problemNum,
        "filePath": sys.argv[1],
        "testString": testString,
        "language": "python",
    }).encode("utf-8")


if __name__ == "__main__":
    sock = socket.socket()
    sock.connect(("127.0.0.1", debugServerPort))
    try:
        start()
        sock.send(makeMessage("success", ""))
    except Exception as identifier:
        sock.send(makeMessage("error", str(identifier)))
        raise identifier
    finally:
        sock.close()

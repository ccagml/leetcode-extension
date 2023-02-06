function runUserScript(userFunm, params, paramTypes) {
    if (params.length !== paramTypes.length) {
        onParameterError();
    }

    const parsedParams = params.map((param, index) => {
        const type = paramTypes[index];
        return parseParameter(index, type, param);
    });

    const i = new userFunm(parsedParams[0]);
    const a = [];
    while (i.hasNext()) a.push(i.next());
}

function parseSpecialParameter(index, type, param) {
    return null;
}

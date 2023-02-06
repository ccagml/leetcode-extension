#include <iostream>
#include <vector>
#include <queue>
#include <string>
#include <cstring>

#include "cJSON.h"

using namespace std;

// @@stub-for-include-code@@

int main(int argc, char **argv)
{
    for (int i = 0; i < argc; i++)
    {
        cout << "Argument " << i << " is " << argv[i] << endl;
    }

    // @@stub-for-body-code@@

    // for (int i = 0; i < params.size(); i++)
    // {
    //     string param = params[i];
    //     string paramType = paramsType[i];
    //     cJSON *item = cJSON_Parse(param.c_str());
    //     if (paramType == "number")
    //     {
    //         int num = parseNumber(item);
    //         res.push_back(&num);
    //     }
    //     else if (paramType == "number[]")
    //     {
    //         vector<int> vint = parseNumberArray(item);
    //         res.push_back(&vint);
    //     }
    // }

    return 0;
}

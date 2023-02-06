Node *parseValueElement(cJSON *node)
{
    int size = cJSON_GetArraySize(node);
    if (node->type != cJSON_Array && size == 2)
    {
        throw "Parse parameter error, expect NumberArray with length: 2";
    }
    int value = parseNumber(cJSON_GetArrayItem(node, 0));
    return new Node(value);
}

int parseRandomElement(cJSON *node)
{
    cJSON *child = cJSON_GetArrayItem(node, 1);

    if (child->type != cJSON_Number)
    {
        return -1;
    }
    return child->valueint;
}

Node *parseNode(vector<cJSON *> vec)
{
    vector<Node *> arr{};
    int i = 0;
    for (i = 0; i < vec.size(); i++)
    {
        arr.push_back(parseValueElement(vec[i]));
    }
    for (i = 0; i < vec.size(); i++)
    {
        if (i != vec.size())
        {
            arr[i]->next = arr[i + 1];
        }
        int el = parseRandomElement(vec[i]);
        if (el != -1)
        {
            arr[i]->random = arr[el];
        }
    }

    return arr[0];
}

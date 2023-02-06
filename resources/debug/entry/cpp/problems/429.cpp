Node *parseNodeElement(cJSON *node)
{
    if (node->type != cJSON_Number)
    {
        return nullptr;
    }
    vector<Node *> child{};
    return new Node(node->valueint, child);
}

Node *parseNode(const cJSON *node)
{
    if (node->type != cJSON_Array)
    {
        throw "Parse parameter error, expect NumberArray";
    }

    int size = cJSON_GetArraySize(node);

    if (size == 0)
    {
        return nullptr;
    }

    int i = 0;
    int isLeft = true;
    Node *first = parseNodeElement(cJSON_GetArrayItem(node, i));
    queue<Node *> q;
    q.push(first);

    for (i = 2; i < size; i++)
    {
        Node *top = q.front();
        Node *child = parseNodeElement(cJSON_GetArrayItem(node, i));
        if (child == nullptr)
        {
            q.pop();
        }
        else
        {
            top->children.push_back(child);
            q.push(child);
        }
    }

    return first;
}

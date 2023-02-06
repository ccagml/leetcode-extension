Node *parseNodeElement(cJSON *node)
{
    if (node->type != cJSON_Number)
    {
        return nullptr;
    }
    return new Node(node->valueint);
}

Node *parseNode(const cJSON *node)
{
    if (node->type != cJSON_Array)
    {
        throw "Parse parameter error, expect NumberArray";
    }

    int i = 0;
    int isLeft = true;
    Node *first = parseNodeElement(cJSON_GetArrayItem(node, i));
    queue<Node *> q;
    q.push(first);
    int size = cJSON_GetArraySize(node);

    for (i = 1; i < size; i++)
    {
        Node *top = q.front();
        Node *child = parseNodeElement(cJSON_GetArrayItem(node, i));
        if (isLeft)
        {
            top->left = child;
            isLeft = false;
        }
        else
        {
            top->right = child;
            isLeft = true;
            q.pop();
        }
        if (child != nullptr)
        {
            q.push(child);
        }
    }

    return first;
}

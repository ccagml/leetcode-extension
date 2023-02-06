Node *parseNode(const vector<vector<int>> vec)
{
    vector<Node *> arr{};
    int i = 0;
    int j = 0;
    for (i = 0; i < vec.size(); i++)
    {
        vector<Node *> nei{};
        arr.push_back(new Node(i + 1, nei));
    }
    for (i = 0; i < vec.size(); i++)
    {
        for (j = 0; j < vec[i].size(); j++)
        {
            arr[i]->neighbors.push_back(arr[vec[i][j] - 1]);
        }
    }
    return arr[0];
}

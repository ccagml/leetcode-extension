string secret = "";

int Master::guess(string word)
{
    int match = 0;
    for (int i = 0; i < word.length(); i++)
    {
        if (word[i] == secret[i])
        {
            match += 1;
        }
    }
    if (match == 0)
    {
        return -1;
    }
    return match;
}

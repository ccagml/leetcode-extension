int badVersion = 0;

bool isBadVersion(int version)
{
    if (version >= badVersion)
    {
        return true;
    }
    return false;
}

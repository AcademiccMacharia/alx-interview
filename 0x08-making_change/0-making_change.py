#!/usr/bin/python3

def makeChange(coins, total):
    """
    Determines the fewest number of coins needed to meet a given total.

    :param coins: List of integers representing coin denominations.
    :param total: Integer representing the total amount to be made.
    :return: Fewest number of coins needed to meet the total. Returns -1 if not possible.
    """
    if total <= 0:
        return 0
    
    dp = [float('inf')] * (total + 1)
    dp[0] = 0
    
    for coin in coins:
        for amount in range(coin, total + 1):
            if dp[amount - coin] != float('inf'):
                dp[amount] = min(dp[amount], dp[amount - coin] + 1)
    
    return dp[total] if dp[total] != float('inf') else -1

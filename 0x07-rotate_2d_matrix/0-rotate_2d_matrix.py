#!/usr/bin/python3

def rotate_2d_matrix(matrix):
    """
    Rotates an nxn matrix in place

    Args:
        matrix(): The matrix to be rotated

    Returns:
        None: The matrix is rotated in place.
    """

    n = len(matrix)

    # Transpose the matrix
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for i in range(n):
        matrix[i] = matrix[i][::-1]

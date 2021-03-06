export class Gauss {
    static array_fill(i: number, n: number, v: number) {
        var a = [];
        for (; i < n; i++) {
            a.push(v);
        }
        return a;
    }

    /**
     * Gaussian elimination
     * @param  array A matrix
     * @param  array x vector
     * @return array x solution vector
     */
    public static solve(A: number[][], x: number[]) {
        var i: number, k: number, j: number;

        // Just make a single matrix
        for (i = 0; i < A.length; i++) {
            A[i].push(x[i]);
        }
        var n: number = A.length;

        for (i = 0; i < n; i++) {
            // Search for maximum in this column
            var maxEl: number = Math.abs(A[i][i]),
                maxRow: number = i;
            for (k = i + 1; k < n; k++) {
                if (Math.abs(A[k][i]) > maxEl) {
                    maxEl = Math.abs(A[k][i]);
                    maxRow = k;
                }
            }


            // Swap maximum row with current row (column by column)
            for (k = i; k < n + 1; k++) {
                var tmp: number = A[maxRow][k];
                A[maxRow][k] = A[i][k];
                A[i][k] = tmp;
            }

            // Make all rows below this one 0 in current column
            for (k = i + 1; k < n; k++) {
                var c: number = -A[k][i] / A[i][i];
                for (j = i; j < n + 1; j++) {
                    if (i === j) {
                        A[k][j] = 0;
                    } else {
                        A[k][j] += c * A[i][j];
                    }
                }
            }
        }

        // Solve equation Ax=b for an upper triangular matrix A
        x = Gauss.array_fill(0, n, 0);
        for (i = n - 1; i > -1; i--) {
            x[i] = A[i][n] / A[i][i];
            for (k = i - 1; k > -1; k--) {
                A[k][n] -= A[k][i] * x[i];
            }
        }

        return x;
    }
}

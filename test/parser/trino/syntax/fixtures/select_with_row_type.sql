SELECT col1.f1, col2, col3.f1.f2.f3 FROM table1;
SELECT col1.f1[0], col2, col3[2].f2.f3, col4[4] FROM table1;
SELECT CAST(ROW(11, 12) AS ROW(COL0 INTEGER, COL1 INTEGER)).col0;
-- ALL COLUMNS
SELECT ROW (1, 'a', true).*;
SELECT ROW (1, 'a', true).* AS (f1, f2, f3);

SELECT CAST(DATE '2024-01-30' AS TIMESTAMP)
SELECT CAST(DATE '2024-01-30' AS TIMESTAMP(6))
SELECT CAST(DATE '2024-01-30' AS TIMESTAMP(6) WITHOUT TIME ZONE)
SELECT CAST(DATE '2024-01-30' AS TIMESTAMP(6) WITH TIME ZONE)

SELECT CAST(DATE '2024-01-30' AS TIME)
SELECT CAST(DATE '2024-01-30' AS TIME(6))
SELECT CAST(DATE '2024-01-30' AS TIME(6) WITHOUT TIME ZONE)
SELECT CAST(DATE '2024-01-30' AS TIME(6) WITH TIME ZONE)
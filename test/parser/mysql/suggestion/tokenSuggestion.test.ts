import fs from 'fs';
import path from 'path';
import { MySQL } from 'src/parser/mysql';
import { CaretPosition } from 'src/parser/common/types';
import { commentOtherLine } from 'test/helper';

const tokenSql = fs.readFileSync(path.join(__dirname, 'fixtures', 'tokenSuggestion.sql'), 'utf-8');

describe('MySQL Token Suggestion', () => {
    const mysql = new MySQL();

    test('After ALTER', () => {
        const pos: CaretPosition = {
            lineNumber: 1,
            column: 7,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary([
            'RESOURCE',
            'USER',
            'VIEW',
            'SQL',
            'DEFINER',
            'ALGORITHM',
            'TABLESPACE',
            'UNDO',
            'TABLE',
            'SERVER',
            'PROCEDURE',
            'LOGFILE',
            'INSTANCE',
            'FUNCTION',
            'EVENT',
            'DATABASE',
            'SCHEMA',
        ]);
    });

    test('After CREATE', () => {
        const pos: CaretPosition = {
            lineNumber: 3,
            column: 8,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary([
            'RESOURCE',
            'USER',
            'ROLE',
            'VIEW',
            'SQL',
            'DEFINER',
            'ALGORITHM',
            'OR',
            'TRIGGER',
            'IF',
            'TABLESPACE',
            'UNDO',
            'TABLE',
            'TEMPORARY',
            'SERVER',
            'FUNCTION',
            'AGGREGATE',
            'PROCEDURE',
            'LOGFILE',
            'INDEX',
            'FULLTEXT',
            'SPATIAL',
            'UNIQUE',
            'OFFLINE',
            'ONLINE',
            'EVENT',
            'DATABASE',
            'SCHEMA',
        ]);
    });

    test('After DELETE', () => {
        const pos: CaretPosition = {
            lineNumber: 5,
            column: 8,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary(['FROM', 'IGNORE', 'QUICK', 'LOW_PRIORITY']);
    });

    test('After DESCRIBE', () => {
        const pos: CaretPosition = {
            lineNumber: 7,
            column: 10,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary([
            'ANALYZE',
            'SELECT',
            'DELETE',
            'INSERT',
            'REPLACE',
            'UPDATE',
            'FOR',
            'FORMAT',
            'PARTITIONS',
            'EXTENDED',
        ]);
    });

    test('After DROP', () => {
        const pos: CaretPosition = {
            lineNumber: 9,
            column: 6,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary([
            'RESOURCE',
            'USER',
            'PREPARE',
            'ROLE',
            'VIEW',
            'TRIGGER',
            'TABLESPACE',
            'UNDO',
            'TABLE',
            'TEMPORARY',
            'SPATIAL',
            'SERVER',
            'FUNCTION',
            'PROCEDURE',
            'LOGFILE',
            'INDEX',
            'EVENT',
            'DATABASE',
            'SCHEMA',
        ]);
    });

    test('After INSERT', () => {
        const pos: CaretPosition = {
            lineNumber: 11,
            column: 8,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary([
            'INTO',
            'IGNORE',
            'DELAYED',
            'HIGH_PRIORITY',
            'LOW_PRIORITY',
        ]);
    });

    test('After LOAD', () => {
        const pos: CaretPosition = {
            lineNumber: 13,
            column: 6,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary(['INDEX', 'XML', 'DATA']);
    });

    test('After SHOW', () => {
        const pos: CaretPosition = {
            lineNumber: 15,
            column: 6,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, pos.lineNumber),
            pos
        )?.keywords;

        expect(suggestion).toMatchUnorderedArrary([
            'REPLICAS',
            'REPLICA',
            'SLAVE',
            'PROFILE',
            'OPEN',
            'INDEX',
            'KEYS',
            'INDEXES',
            'EXTENDED',
            'GRANTS',
            'FUNCTION',
            'PROCEDURE',
            'EVENTS',
            'TABLE',
            'FULL',
            'TABLES',
            'TRIGGERS',
            'COUNT',
            'ERRORS',
            'WARNINGS',
            'STORAGE',
            'ENGINES',
            'MASTER',
            'PLUGINS',
            'PRIVILEGES',
            'PROCESSLIST',
            'PROFILES',
            'AUTHORS',
            'CONTRIBUTORS',
            'ENGINE',
            'CREATE',
            'COLUMNS',
            'FIELDS',
            'CHARACTER',
            'CHARSET',
            'COLLATION',
            'DATABASES',
            'SCHEMAS',
            'GLOBAL',
            'SESSION',
            'STATUS',
            'VARIABLES',
            'BINLOG',
            'RELAYLOG',
            'BINARY',
        ]);
    });

    test('Suggestion in new line', () => {
        const pos: CaretPosition = {
            lineNumber: 19,
            column: 2,
        };
        const suggestion = mysql.getSuggestionAtCaretPosition(
            commentOtherLine(tokenSql, [18, 20]),
            pos
        )?.keywords;
        expect(suggestion.length).not.toBe(0);
    });
});

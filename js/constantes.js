'use strict';

const Coluna = 10;
const Linha = 20;
const Tam_Bloco = 30;
const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
}

Object.freeze(KEY);

const movimento = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1})
};
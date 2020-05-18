"use strict";
/**
 * @since 2.2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = void 0;
/**
 * Defines the fold over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is false, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from 'fp-ts/lib/Option'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import { fold } from 'fp-ts/lib/boolean'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    some(true),
 *    map(fold(() => 'false', () => 'true'))
 *  ),
 *  some('true')
 * )
 *
 * @since 2.2.0
 */
function fold(onFalse, onTrue) {
    return function (value) { return (value ? onTrue() : onFalse()); };
}
exports.fold = fold;
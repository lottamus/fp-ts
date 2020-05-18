"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separate = exports.compact = exports.reduceRight = exports.reduce = exports.partitionMap = exports.partition = exports.foldMap = exports.filterMap = exports.filter = exports.record = exports.elem = exports.some = exports.every = exports.fromFoldableMap = exports.fromFoldable = exports.filterWithIndex = exports.filterMapWithIndex = exports.partitionWithIndex = exports.partitionMapWithIndex = exports.sequence = exports.traverse = exports.traverseWithIndex = exports.singleton = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.map = exports.mapWithIndex = exports.empty = exports.lookup = exports.getMonoid = exports.getEq = exports.isSubrecord = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.hasOwnProperty = exports.insertAt = exports.toUnfoldable = exports.toArray = exports.collect = exports.keys = exports.isEmpty = exports.size = exports.getShow = exports.URI = void 0;
var pipeable_1 = require("./pipeable");
var RR = require("./ReadonlyRecord");
/**
 * @since 2.0.0
 */
exports.URI = 'Record';
/**
 * @since 2.0.0
 */
exports.getShow = RR.getShow;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
exports.size = RR.size;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
exports.isEmpty = RR.isEmpty;
/**
 * @since 2.0.0
 */
exports.keys = RR.keys;
/**
 * Map a record into an array
 *
 * @example
 * import {collect} from 'fp-ts/lib/Record'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 2.0.0
 */
exports.collect = RR.collect;
/**
 * @since 2.0.0
 */
exports.toArray = RR.toReadonlyArray;
function toUnfoldable(U) {
    return RR.toUnfoldable(U);
}
exports.toUnfoldable = toUnfoldable;
function insertAt(k, a) {
    return RR.insertAt(k, a);
}
exports.insertAt = insertAt;
/**
 * @since 2.0.0
 */
exports.hasOwnProperty = RR.hasOwnProperty;
function deleteAt(k) {
    return RR.deleteAt(k);
}
exports.deleteAt = deleteAt;
/**
 * @since 2.0.0
 */
exports.updateAt = RR.updateAt;
/**
 * @since 2.0.0
 */
exports.modifyAt = RR.modifyAt;
function pop(k) {
    return RR.pop(k);
}
exports.pop = pop;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
exports.isSubrecord = RR.isSubrecord;
function getEq(E) {
    return RR.getEq(E);
}
exports.getEq = getEq;
function getMonoid(S) {
    return RR.getMonoid(S);
}
exports.getMonoid = getMonoid;
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
exports.lookup = RR.lookup;
/**
 * @since 2.0.0
 */
exports.empty = {};
function mapWithIndex(f) {
    return RR.mapWithIndex(f);
}
exports.mapWithIndex = mapWithIndex;
function map(f) {
    return RR.map(f);
}
exports.map = map;
function reduceWithIndex(b, f) {
    return RR.reduceWithIndex(b, f);
}
exports.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(M) {
    return RR.foldMapWithIndex(M);
}
exports.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(b, f) {
    return RR.reduceRightWithIndex(b, f);
}
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
exports.singleton = RR.singleton;
function traverseWithIndex(F) {
    return RR.traverseWithIndex(F);
}
exports.traverseWithIndex = traverseWithIndex;
function traverse(F) {
    return RR.traverse(F);
}
exports.traverse = traverse;
function sequence(F) {
    return RR.sequence(F);
}
exports.sequence = sequence;
function partitionMapWithIndex(f) {
    return RR.partitionMapWithIndex(f);
}
exports.partitionMapWithIndex = partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return RR.partitionWithIndex(predicateWithIndex);
}
exports.partitionWithIndex = partitionWithIndex;
function filterMapWithIndex(f) {
    return RR.filterMapWithIndex(f);
}
exports.filterMapWithIndex = filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return RR.filterWithIndex(predicateWithIndex);
}
exports.filterWithIndex = filterWithIndex;
function fromFoldable(M, F) {
    return RR.fromFoldable(M, F);
}
exports.fromFoldable = fromFoldable;
function fromFoldableMap(M, F) {
    return RR.fromFoldableMap(M, F);
}
exports.fromFoldableMap = fromFoldableMap;
/**
 * @since 2.0.0
 */
exports.every = RR.every;
/**
 * @since 2.0.0
 */
exports.some = RR.some;
/**
 * @since 2.0.0
 */
exports.elem = RR.elem;
/**
 * @since 2.0.0
 */
exports.record = 
/*@__PURE__*/
(function () { return Object.assign({}, RR.readonlyRecord, { URI: exports.URI }); })();
var pipeables = /*@__PURE__*/ pipeable_1.pipeable(exports.record);
var filter = /*@__PURE__*/ (function () { return pipeables.filter; })();
exports.filter = filter;
var filterMap = /*@__PURE__*/ (function () { return pipeables.filterMap; })();
exports.filterMap = filterMap;
var foldMap = /*@__PURE__*/ (function () { return pipeables.foldMap; })();
exports.foldMap = foldMap;
var partition = /*@__PURE__*/ (function () { return pipeables.partition; })();
exports.partition = partition;
var partitionMap = /*@__PURE__*/ (function () { return pipeables.partitionMap; })();
exports.partitionMap = partitionMap;
var reduce = /*@__PURE__*/ (function () { return pipeables.reduce; })();
exports.reduce = reduce;
var reduceRight = /*@__PURE__*/ (function () { return pipeables.reduceRight; })();
exports.reduceRight = reduceRight;
var compact = /*@__PURE__*/ (function () { return pipeables.compact; })();
exports.compact = compact;
var separate = /*@__PURE__*/ (function () { return pipeables.separate; })();
exports.separate = separate;
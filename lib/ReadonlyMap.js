"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.separate = exports.compact = exports.partitionMap = exports.partition = exports.map = exports.filterMap = exports.filter = exports.readonlyMap = exports.getWitherable = exports.getFilterableWithIndex = exports.fromFoldable = exports.singleton = exports.getMonoid = exports.getEq = exports.empty = exports.isSubmap = exports.lookup = exports.lookupWithKey = exports.pop = exports.modifyAt = exports.updateAt = exports.deleteAt = exports.insertAt = exports.toUnfoldable = exports.toReadonlyArray = exports.collect = exports.values = exports.keys = exports.elem = exports.member = exports.isEmpty = exports.size = exports.getShow = exports.toMap = exports.fromMap = exports.URI = void 0;
var Either_1 = require("./Either");
var Eq_1 = require("./Eq");
var Option_1 = require("./Option");
var pipeable_1 = require("./pipeable");
/**
 * @since 2.5.0
 */
exports.URI = 'ReadonlyMap';
/**
 * @since 2.5.0
 */
function fromMap(m) {
    return new Map(m);
}
exports.fromMap = fromMap;
/**
 * @since 2.5.0
 */
function toMap(m) {
    return new Map(m);
}
exports.toMap = toMap;
/**
 * @since 2.5.0
 */
function getShow(SK, SA) {
    return {
        show: function (m) {
            var elements = '';
            m.forEach(function (a, k) {
                elements += "[" + SK.show(k) + ", " + SA.show(a) + "], ";
            });
            if (elements !== '') {
                elements = elements.substring(0, elements.length - 2);
            }
            return "new Map([" + elements + "])";
        }
    };
}
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.5.0
 */
function size(d) {
    return d.size;
}
exports.size = size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.5.0
 */
function isEmpty(d) {
    return d.size === 0;
}
exports.isEmpty = isEmpty;
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.5.0
 */
function member(E) {
    var lookupE = lookup(E);
    return function (k, m) { return Option_1.isSome(lookupE(k, m)); };
}
exports.member = member;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.5.0
 */
function elem(E) {
    return function (a, m) {
        var values = m.values();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = values.next()).done) {
            var v = e.value;
            if (E.equals(a, v)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.5.0
 */
function keys(O) {
    return function (m) { return Array.from(m.keys()).sort(O.compare); };
}
exports.keys = keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.5.0
 */
function values(O) {
    return function (m) { return Array.from(m.values()).sort(O.compare); };
}
exports.values = values;
/**
 * @since 2.5.0
 */
function collect(O) {
    var keysO = keys(O);
    return function (f) { return function (m) {
        // tslint:disable-next-line: readonly-array
        var out = [];
        var ks = keysO(m);
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            out.push(f(key, m.get(key)));
        }
        return out;
    }; };
}
exports.collect = collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.5.0
 */
function toReadonlyArray(O) {
    return collect(O)(function (k, a) { return [k, a]; });
}
exports.toReadonlyArray = toReadonlyArray;
function toUnfoldable(O, U) {
    var toArrayO = toReadonlyArray(O);
    return function (d) {
        var arr = toArrayO(d);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? Option_1.some([arr[b], b + 1]) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.5.0
 */
function insertAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (Option_1.isNone(found)) {
            var r = new Map(m);
            r.set(k, a);
            return r;
        }
        else if (found.value[1] !== a) {
            var r = new Map(m);
            r.set(found.value[0], a);
            return r;
        }
        return m;
    }; };
}
exports.insertAt = insertAt;
/**
 * Delete a key and value from a map
 *
 * @since 2.5.0
 */
function deleteAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (Option_1.isSome(found)) {
            var r = new Map(m);
            r.delete(found.value[0]);
            return r;
        }
        return m;
    }; };
}
exports.deleteAt = deleteAt;
/**
 * @since 2.5.0
 */
function updateAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (Option_1.isNone(found)) {
            return Option_1.none;
        }
        var r = new Map(m);
        r.set(found.value[0], a);
        return Option_1.some(r);
    }; };
}
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
function modifyAt(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, f) { return function (m) {
        var found = lookupWithKeyE(k, m);
        if (Option_1.isNone(found)) {
            return Option_1.none;
        }
        var r = new Map(m);
        r.set(found.value[0], f(found.value[1]));
        return Option_1.some(r);
    }; };
}
exports.modifyAt = modifyAt;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.5.0
 */
function pop(E) {
    var lookupE = lookup(E);
    var deleteAtE = deleteAt(E);
    return function (k) {
        var deleteAtEk = deleteAtE(k);
        return function (m) { return Option_1.option.map(lookupE(k, m), function (a) { return [a, deleteAtEk(m)]; }); };
    };
}
exports.pop = pop;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.5.0
 */
function lookupWithKey(E) {
    return function (k, m) {
        var entries = m.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, ka = _a[0], a = _a[1];
            if (E.equals(ka, k)) {
                return Option_1.some([ka, a]);
            }
        }
        return Option_1.none;
    };
}
exports.lookupWithKey = lookupWithKey;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.5.0
 */
function lookup(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, m) { return Option_1.option.map(lookupWithKeyE(k, m), function (_a) {
        var _ = _a[0], a = _a[1];
        return a;
    }); };
}
exports.lookup = lookup;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.5.0
 */
function isSubmap(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return function (d1, d2) {
        var entries = d1.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], a = _a[1];
            var d2OptA = lookupWithKeyS(k, d2);
            if (Option_1.isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubmap = isSubmap;
/**
 * @since 2.5.0
 */
exports.empty = new Map();
/**
 * @since 2.5.0
 */
function getEq(SK, SA) {
    var isSubmap_ = isSubmap(SK, SA);
    return Eq_1.fromEquals(function (x, y) { return isSubmap_(x, y) && isSubmap_(y, x); });
}
exports.getEq = getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.5.0
 */
function getMonoid(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return {
        concat: function (mx, my) {
            if (mx === exports.empty) {
                return my;
            }
            if (my === exports.empty) {
                return mx;
            }
            var r = new Map(mx);
            var entries = my.entries();
            var e;
            // tslint:disable-next-line: strict-boolean-expressions
            while (!(e = entries.next()).done) {
                var _a = e.value, k = _a[0], a = _a[1];
                var mxOptA = lookupWithKeyS(k, mx);
                if (Option_1.isSome(mxOptA)) {
                    r.set(mxOptA.value[0], SA.concat(mxOptA.value[1], a));
                }
                else {
                    r.set(k, a);
                }
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @since 2.5.0
 */
function singleton(k, a) {
    return new Map([[k, a]]);
}
exports.singleton = singleton;
function fromFoldable(E, M, F) {
    return function (fka) {
        var lookupWithKeyE = lookupWithKey(E);
        return F.reduce(fka, new Map(), function (b, _a) {
            var k = _a[0], a = _a[1];
            var bOpt = lookupWithKeyE(k, b);
            if (Option_1.isSome(bOpt)) {
                b.set(bOpt.value[0], M.concat(bOpt.value[1], a));
            }
            else {
                b.set(k, a);
            }
            return b;
        });
    };
}
exports.fromFoldable = fromFoldable;
var _mapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, key = _a[0], a = _a[1];
        m.set(key, f(key, a));
    }
    return m;
};
var _partitionMapWithIndex = function (fa, f) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var ei = f(k, a);
        if (Either_1.isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
var _partitionWithIndex = function (fa, p) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            right.set(k, a);
        }
        else {
            left.set(k, a);
        }
    }
    return {
        left: left,
        right: right
    };
};
var _filterMapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var o = f(k, a);
        if (Option_1.isSome(o)) {
            m.set(k, o.value);
        }
    }
    return m;
};
var _filterWithIndex = function (fa, p) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            m.set(k, a);
        }
    }
    return m;
};
/**
 * @since 2.5.0
 */
function getFilterableWithIndex() {
    return __assign(__assign({}, exports.readonlyMap), { _E: undefined, mapWithIndex: _mapWithIndex, partitionMapWithIndex: _partitionMapWithIndex, partitionWithIndex: _partitionWithIndex, filterMapWithIndex: _filterMapWithIndex, filterWithIndex: _filterWithIndex });
}
exports.getFilterableWithIndex = getFilterableWithIndex;
/**
 * @since 2.5.0
 */
function getWitherable(O) {
    var keysO = keys(O);
    var reduceWithIndex = function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa.get(k));
        }
        return out;
    };
    var foldMapWithIndex = function (M) { return function (fa, f) {
        var out = M.empty;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = M.concat(out, f(k, fa.get(k)));
        }
        return out;
    }; };
    var reduceRightWithIndex = function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa.get(k), out);
        }
        return out;
    };
    var traverseWithIndex = function (F) {
        return function (ta, f) {
            var fm = F.of(exports.empty);
            var entries = ta.entries();
            var e;
            var _loop_1 = function () {
                var _a = e.value, key = _a[0], a = _a[1];
                fm = F.ap(F.map(fm, function (m) { return function (b) { return new Map(m).set(key, b); }; }), f(key, a));
            };
            // tslint:disable-next-line: strict-boolean-expressions
            while (!(e = entries.next()).done) {
                _loop_1();
            }
            return fm;
        };
    };
    var traverse = function (F) {
        var traverseWithIndexF = traverseWithIndex(F);
        return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
    };
    var sequence = function (F) {
        var traverseWithIndexF = traverseWithIndex(F);
        return function (ta) { return traverseWithIndexF(ta, function (_, a) { return a; }); };
    };
    return __assign(__assign({}, exports.readonlyMap), { _E: undefined, reduce: function (fa, b, f) { return reduceWithIndex(fa, b, function (_, b, a) { return f(b, a); }); }, foldMap: function (M) {
            var foldMapWithIndexM = foldMapWithIndex(M);
            return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
        }, reduceRight: function (fa, b, f) { return reduceRightWithIndex(fa, b, function (_, a, b) { return f(a, b); }); }, traverse: traverse,
        sequence: sequence, mapWithIndex: _mapWithIndex, reduceWithIndex: reduceWithIndex,
        foldMapWithIndex: foldMapWithIndex,
        reduceRightWithIndex: reduceRightWithIndex,
        traverseWithIndex: traverseWithIndex, wilt: function (F) {
            var traverseF = traverse(F);
            return function (wa, f) { return F.map(traverseF(wa, f), exports.readonlyMap.separate); };
        }, wither: function (F) {
            var traverseF = traverse(F);
            return function (wa, f) { return F.map(traverseF(wa, f), exports.readonlyMap.compact); };
        } });
}
exports.getWitherable = getWitherable;
/**
 * @since 2.5.0
 */
exports.readonlyMap = {
    URI: exports.URI,
    map: function (fa, f) { return _mapWithIndex(fa, function (_, a) { return f(a); }); },
    compact: function (fa) {
        var m = new Map();
        var entries = fa.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], oa = _a[1];
            if (Option_1.isSome(oa)) {
                m.set(k, oa.value);
            }
        }
        return m;
    },
    separate: function (fa) {
        var left = new Map();
        var right = new Map();
        var entries = fa.entries();
        var e;
        // tslint:disable-next-line: strict-boolean-expressions
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], ei = _a[1];
            if (Either_1.isLeft(ei)) {
                left.set(k, ei.left);
            }
            else {
                right.set(k, ei.right);
            }
        }
        return {
            left: left,
            right: right
        };
    },
    filter: function (fa, p) { return _filterWithIndex(fa, function (_, a) { return p(a); }); },
    filterMap: function (fa, f) { return _filterMapWithIndex(fa, function (_, a) { return f(a); }); },
    partition: function (fa, predicate) {
        return _partitionWithIndex(fa, function (_, a) { return predicate(a); });
    },
    partitionMap: function (fa, f) { return _partitionMapWithIndex(fa, function (_, a) { return f(a); }); }
};
var pipeables = /*@__PURE__*/ pipeable_1.pipeable(exports.readonlyMap);
var filter = /*@__PURE__*/ (function () { return pipeables.filter; })();
exports.filter = filter;
var filterMap = /*@__PURE__*/ (function () { return pipeables.filterMap; })();
exports.filterMap = filterMap;
var map = /*@__PURE__*/ (function () { return pipeables.map; })();
exports.map = map;
var partition = /*@__PURE__*/ (function () { return pipeables.partition; })();
exports.partition = partition;
var partitionMap = /*@__PURE__*/ (function () { return pipeables.partitionMap; })();
exports.partitionMap = partitionMap;
var compact = /*@__PURE__*/ (function () { return pipeables.compact; })();
exports.compact = compact;
var separate = /*@__PURE__*/ (function () { return pipeables.separate; })();
exports.separate = separate;
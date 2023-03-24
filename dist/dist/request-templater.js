/*!
 * Request Templater v1.0.0
 *
 * Copyright (C) 2012-2023 Pavel Kuz`min (@s00d).
 *
 * Date: Fri, 24 Mar 2023 12:39:16 GMT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.RequestTemplater = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$e =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$i = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$h = fails$i;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$h(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$g = fails$i;

	var functionBindNative = !fails$g(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var call$9 = Function.prototype.call;

	var functionCall = NATIVE_BIND$4 ? call$9.bind(call$9) : function () {
	  return call$9.apply(call$9, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var call$8 = FunctionPrototype$3.call;
	var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$8, call$8);

	var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$8.apply(fn, arguments);
	  };
	};

	var uncurryThis$n = functionUncurryThis;

	var toString$9 = uncurryThis$n({}.toString);
	var stringSlice$6 = uncurryThis$n(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$6(toString$9(it), 8, -1);
	};

	var uncurryThis$m = functionUncurryThis;
	var fails$f = fails$i;
	var classof$8 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$m(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$f(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$8(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$4 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$3 = isNullOrUndefined$4;

	var $TypeError$9 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$7 = function (it) {
	  if (isNullOrUndefined$3(it)) throw $TypeError$9("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$6 = requireObjectCoercible$7;

	var toIndexedObject$5 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$6(it));
	};

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$e = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$d = isCallable$e;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$9 = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$d(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$d(it);
	};

	var global$d = global$e;
	var isCallable$c = isCallable$e;

	var aFunction = function (argument) {
	  return isCallable$c(argument) ? argument : undefined;
	};

	var getBuiltIn$4 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$d[namespace]) : global$d[namespace] && global$d[namespace][method];
	};

	var uncurryThis$l = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$l({}.isPrototypeOf);

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$c = global$e;
	var userAgent = engineUserAgent;

	var process$1 = global$c.process;
	var Deno = global$c.Deno;
	var versions = process$1 && process$1.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$2 = engineV8Version;
	var fails$e = fails$i;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$e(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$3 = getBuiltIn$4;
	var isCallable$b = isCallable$e;
	var isPrototypeOf = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$3('Symbol');
	  return isCallable$b($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
	};

	var $String$3 = String;

	var tryToString$1 = function (argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$a = isCallable$e;
	var tryToString = tryToString$1;

	var $TypeError$8 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$4 = function (argument) {
	  if (isCallable$a(argument)) return argument;
	  throw $TypeError$8(tryToString(argument) + ' is not a function');
	};

	var aCallable$3 = aCallable$4;
	var isNullOrUndefined$2 = isNullOrUndefined$4;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$3 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$2(func) ? undefined : aCallable$3(func);
	};

	var call$7 = functionCall;
	var isCallable$9 = isCallable$e;
	var isObject$8 = isObject$9;

	var $TypeError$7 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$9(fn = input.toString) && !isObject$8(val = call$7(fn, input))) return val;
	  if (isCallable$9(fn = input.valueOf) && !isObject$8(val = call$7(fn, input))) return val;
	  if (pref !== 'string' && isCallable$9(fn = input.toString) && !isObject$8(val = call$7(fn, input))) return val;
	  throw $TypeError$7("Can't convert object to primitive value");
	};

	var sharedExports = {};
	var shared$4 = {
	  get exports(){ return sharedExports; },
	  set exports(v){ sharedExports = v; },
	};

	var global$b = global$e;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$2 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$2(global$b, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$b[key] = value;
	  } return value;
	};

	var global$a = global$e;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$a[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.29.1',
	  mode: 'global',
	  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.29.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible$5 = requireObjectCoercible$7;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$6 = function (argument) {
	  return $Object$1(requireObjectCoercible$5(argument));
	};

	var uncurryThis$k = functionUncurryThis;
	var toObject$5 = toObject$6;

	var hasOwnProperty = uncurryThis$k({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$5(it), key);
	};

	var uncurryThis$j = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$8 = uncurryThis$j(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$8(++id + postfix, 36);
	};

	var global$9 = global$e;
	var shared$3 = sharedExports;
	var hasOwn$7 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$1 = global$9.Symbol;
	var WellKnownSymbolsStore = shared$3('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$a = function (name) {
	  if (!hasOwn$7(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$7(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$6 = functionCall;
	var isObject$7 = isObject$9;
	var isSymbol$1 = isSymbol$2;
	var getMethod$2 = getMethod$3;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$9 = wellKnownSymbol$a;

	var $TypeError$6 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$7(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$6(exoticToPrim, input, pref);
	    if (!isObject$7(result) || isSymbol$1(result)) return result;
	    throw $TypeError$6("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$8 = global$e;
	var isObject$6 = isObject$9;

	var document$1 = global$8.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$8 = descriptors;
	var fails$d = fails$i;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$8 && !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$7 = descriptors;
	var call$5 = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$4 = toIndexedObject$5;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$6 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$4(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$6(O, P)) return createPropertyDescriptor$2(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$6 = descriptors;
	var fails$c = fails$i;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$6 && fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$5 = isObject$9;

	var $String$2 = String;
	var $TypeError$5 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$8 = function (argument) {
	  if (isObject$5(argument)) return argument;
	  throw $TypeError$5($String$2(argument) + ' is not an object');
	};

	var DESCRIPTORS$5 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$7 = anObject$8;
	var toPropertyKey$1 = toPropertyKey$3;

	var $TypeError$4 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$5 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$7(O);
	  P = toPropertyKey$1(P);
	  anObject$7(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$7(O);
	  P = toPropertyKey$1(P);
	  anObject$7(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$4('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$4 = DESCRIPTORS$4 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltInExports = {};
	var makeBuiltIn$3 = {
	  get exports(){ return makeBuiltInExports; },
	  set exports(v){ makeBuiltInExports = v; },
	};

	var DESCRIPTORS$3 = descriptors;
	var hasOwn$5 = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$3 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$5(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$3 || (DESCRIPTORS$3 && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$i = functionUncurryThis;
	var isCallable$8 = isCallable$e;
	var store$1 = sharedStore;

	var functionToString$1 = uncurryThis$i(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$8(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var global$7 = global$e;
	var isCallable$7 = isCallable$e;

	var WeakMap$1 = global$7.WeakMap;

	var weakMapBasicDetection = isCallable$7(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$2 = sharedExports;
	var uid = uid$2;

	var keys = shared$2('keys');

	var sharedKey$2 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$6 = global$e;
	var isObject$4 = isObject$9;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
	var hasOwn$4 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global$6.TypeError;
	var WeakMap = global$6.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$4(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$3(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$4(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$4(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$h = functionUncurryThis;
	var fails$b = fails$i;
	var isCallable$6 = isCallable$e;
	var hasOwn$3 = hasOwnProperty_1;
	var DESCRIPTORS$2 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState$1 = InternalStateModule.get;
	var $String$1 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;
	var stringSlice$5 = uncurryThis$h(''.slice);
	var replace$2 = uncurryThis$h(''.replace);
	var join$1 = uncurryThis$h([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$2 && !fails$b(function () {
	  return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$5($String$1(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$2($String$1(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$3(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$2) defineProperty$1(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$3(options, 'arity') && value.length !== options.arity) {
	    defineProperty$1(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$3(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$2) defineProperty$1(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$3(state, 'source')) {
	    state.source = join$1(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$6(this) && getInternalState$1(this).source || inspectSource$1(this);
	}, 'toString');

	var isCallable$5 = isCallable$e;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltInExports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$3 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$5(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$3.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$4 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

	var max$1 = Math.max;
	var min$4 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$3(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$4(integer, length);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

	var min$3 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$5 = function (argument) {
	  return argument > 0 ? min$3(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$4 = toLength$5;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$4 = function (obj) {
	  return toLength$4(obj.length);
	};

	var toIndexedObject$3 = toIndexedObject$5;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$3 = lengthOfArrayLike$4;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$3 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = lengthOfArrayLike$3(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$3(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$3(false)
	};

	var uncurryThis$g = functionUncurryThis;
	var hasOwn$2 = hasOwnProperty_1;
	var toIndexedObject$2 = toIndexedObject$5;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$2 = uncurryThis$g([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$2(hiddenKeys$2, key) && hasOwn$2(O, key) && push$2(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$2(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$2(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$2 = getBuiltIn$4;
	var uncurryThis$f = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$6 = anObject$8;

	var concat$2 = uncurryThis$f([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$6(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$1 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$1(target, key) && !(exceptions && hasOwn$1(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$a = fails$i;
	var isCallable$4 = isCallable$e;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$4(detection) ? fails$a(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$5 = global$e;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
	var defineBuiltIn$2 = defineBuiltIn$3;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$5;
	  } else if (STATIC) {
	    target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$5[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$2(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$2(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$2(target, key, sourceProperty, options);
	  }
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$e = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$e(fn);
	};

	var wellKnownSymbol$8 = wellKnownSymbol$a;

	var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$3 = isCallable$e;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$7 = wellKnownSymbol$a;

	var TO_STRING_TAG = wellKnownSymbol$7('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$7 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$3(O.callee) ? 'Arguments' : result;
	};

	var classof$6 = classof$7;

	var $String = String;

	var toString$7 = function (argument) {
	  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};

	var isObject$3 = isObject$9;
	var classof$5 = classofRaw$2;
	var wellKnownSymbol$6 = wellKnownSymbol$a;

	var MATCH$1 = wellKnownSymbol$6('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$3(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
	};

	var isRegExp = isRegexp;

	var $TypeError$3 = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw $TypeError$3("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$5 = wellKnownSymbol$a;

	var MATCH = wellKnownSymbol$5('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$a = _export;
	var uncurryThis$d = functionUncurryThisClause;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var toLength$3 = toLength$5;
	var toString$6 = toString$7;
	var notARegExp$1 = notARegexp;
	var requireObjectCoercible$4 = requireObjectCoercible$7;
	var correctIsRegExpLogic$1 = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-startswith -- safe
	var nativeStartsWith = uncurryThis$d(''.startsWith);
	var stringSlice$4 = uncurryThis$d(''.slice);
	var min$2 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$1('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
	  var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$a({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$6(requireObjectCoercible$4(this));
	    notARegExp$1(searchString);
	    var index = toLength$3(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = toString$6(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith(that, search, index)
	      : stringSlice$4(that, index, index + search.length) === search;
	  }
	});

	var $$9 = _export;
	var uncurryThis$c = functionUncurryThisClause;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var toLength$2 = toLength$5;
	var toString$5 = toString$7;
	var notARegExp = notARegexp;
	var requireObjectCoercible$3 = requireObjectCoercible$7;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-endswith -- safe
	var nativeEndsWith = uncurryThis$c(''.endsWith);
	var slice = uncurryThis$c(''.slice);
	var min$1 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.endsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.endswith
	$$9({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = toString$5(requireObjectCoercible$3(this));
	    notARegExp(searchString);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = that.length;
	    var end = endPosition === undefined ? len : min$1(toLength$2(endPosition), len);
	    var search = toString$5(searchString);
	    return nativeEndsWith
	      ? nativeEndsWith(that, search, end)
	      : slice(that, end - search.length, end) === search;
	  }
	});

	var uncurryThis$b = functionUncurryThisClause;
	var aCallable$2 = aCallable$4;
	var NATIVE_BIND$2 = functionBindNative;

	var bind$2 = uncurryThis$b(uncurryThis$b.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$2(fn);
	  return that === undefined ? fn : NATIVE_BIND$2 ? bind$2(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$4 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$2 = Array.isArray || function isArray(argument) {
	  return classof$4(argument) == 'Array';
	};

	var uncurryThis$a = functionUncurryThis;
	var fails$9 = fails$i;
	var isCallable$2 = isCallable$e;
	var classof$3 = classof$7;
	var getBuiltIn$1 = getBuiltIn$4;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$1 = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$a(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$2(argument)) return false;
	  try {
	    construct$1(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$2(argument)) return false;
	  switch (classof$3(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct$1 || fails$9(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$1 = isArray$2;
	var isConstructor = isConstructor$1;
	var isObject$2 = isObject$9;
	var wellKnownSymbol$4 = wellKnownSymbol$a;

	var SPECIES$2 = wellKnownSymbol$4('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$1(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray$1(C.prototype))) C = undefined;
	    else if (isObject$2(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$1 = functionBindContext;
	var uncurryThis$9 = functionUncurryThis;
	var IndexedObject$2 = indexedObject;
	var toObject$4 = toObject$6;
	var lengthOfArrayLike$2 = lengthOfArrayLike$4;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;

	var push$1 = uncurryThis$9([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$4($this);
	    var self = IndexedObject$2(O);
	    var boundFunction = bind$1(callbackfn, that);
	    var length = lengthOfArrayLike$2(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$1;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$1(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$1(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$2(7)
	};

	var fails$8 = fails$i;

	var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$8(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

	var STRICT_METHOD = arrayMethodIsStrict$2('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$8 = _export;
	var forEach$1 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$8({ target: 'Array', proto: true, forced: [].forEach != forEach$1 }, {
	  forEach: forEach$1
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$2 = classof$7;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$2(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$1 = defineBuiltIn$3;
	var toString$4 = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$1(Object.prototype, 'toString', toString$4, { unsafe: true });
	}

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement$1 = documentCreateElement$2;

	var classList = documentCreateElement$1('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var global$4 = global$e;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(global$4[COLLECTION_NAME] && global$4[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	var fails$7 = fails$i;
	var wellKnownSymbol$3 = wellKnownSymbol$a;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$1 = wellKnownSymbol$3('species');

	var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$7(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$7 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$7({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var anObject$5 = anObject$8;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$5(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$6 = fails$i;
	var global$3 = global$e;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$3.RegExp;

	var UNSUPPORTED_Y$1 = fails$6(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$6(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$6(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$1
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$1 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$1 = objectDefineProperty;
	var anObject$4 = anObject$8;
	var toIndexedObject$1 = toIndexedObject$5;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$4(O);
	  var props = toIndexedObject$1(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn = getBuiltIn$4;

	var html$1 = getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$3 = anObject$8;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$2;
	var sharedKey = sharedKey$2;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$3(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var fails$5 = fails$i;
	var global$2 = global$e;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$2.RegExp;

	var regexpUnsupportedDotAll = fails$5(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$4 = fails$i;
	var global$1 = global$e;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$1.RegExp;

	var regexpUnsupportedNcg = fails$4(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$4 = functionCall;
	var uncurryThis$8 = functionUncurryThis;
	var toString$3 = toString$7;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = sharedExports;
	var create = objectCreate;
	var getInternalState = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$3 = uncurryThis$8(''.charAt);
	var indexOf = uncurryThis$8(''.indexOf);
	var replace$1 = uncurryThis$8(''.replace);
	var stringSlice$3 = uncurryThis$8(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$4(nativeExec, re1, 'a');
	  call$4(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString$3(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$4(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = call$4(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$1(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$3(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$4(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$3(match.input, charsAdded);
	        match[0] = stringSlice$3(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$4(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$6 = _export;
	var exec = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$6({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$1 = FunctionPrototype$1.apply;
	var call$3 = FunctionPrototype$1.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$3.bind(apply$1) : function () {
	  return call$3.apply(apply$1, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$7 = functionUncurryThisClause;
	var defineBuiltIn = defineBuiltIn$3;
	var regexpExec$1 = regexpExec$2;
	var fails$3 = fails$i;
	var wellKnownSymbol$2 = wellKnownSymbol$a;
	var createNonEnumerableProperty = createNonEnumerableProperty$4;

	var SPECIES = wellKnownSymbol$2('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$2(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$3(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$3(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$7(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$7(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn(String.prototype, KEY, methods[0]);
	    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var uncurryThis$6 = functionUncurryThis;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
	var toString$2 = toString$7;
	var requireObjectCoercible$2 = requireObjectCoercible$7;

	var charAt$2 = uncurryThis$6(''.charAt);
	var charCodeAt = uncurryThis$6(''.charCodeAt);
	var stringSlice$2 = uncurryThis$6(''.slice);

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$2(requireObjectCoercible$2($this));
	    var position = toIntegerOrInfinity$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$2(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$2(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$2 = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var uncurryThis$5 = functionUncurryThis;
	var toObject$3 = toObject$6;

	var floor = Math.floor;
	var charAt = uncurryThis$5(''.charAt);
	var replace = uncurryThis$5(''.replace);
	var stringSlice$1 = uncurryThis$5(''.slice);
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$3(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$1(str, 0, position);
	      case "'": return stringSlice$1(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var call$2 = functionCall;
	var anObject$2 = anObject$8;
	var isCallable$1 = isCallable$e;
	var classof$1 = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$2 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$1(exec)) {
	    var result = call$2(exec, R, S);
	    if (result !== null) anObject$2(result);
	    return result;
	  }
	  if (classof$1(R) === 'RegExp') return call$2(regexpExec, R, S);
	  throw $TypeError$2('RegExp#exec called on incompatible receiver');
	};

	var apply = functionApply;
	var call$1 = functionCall;
	var uncurryThis$4 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var fails$2 = fails$i;
	var anObject$1 = anObject$8;
	var isCallable = isCallable$e;
	var isNullOrUndefined$1 = isNullOrUndefined$4;
	var toIntegerOrInfinity = toIntegerOrInfinity$4;
	var toLength$1 = toLength$5;
	var toString$1 = toString$7;
	var requireObjectCoercible$1 = requireObjectCoercible$7;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var getMethod$1 = getMethod$3;
	var getSubstitution = getSubstitution$1;
	var regExpExec$2 = regexpExecAbstract;
	var wellKnownSymbol$1 = wellKnownSymbol$a;

	var REPLACE = wellKnownSymbol$1('replace');
	var max = Math.max;
	var min = Math.min;
	var concat$1 = uncurryThis$4([].concat);
	var push = uncurryThis$4([].push);
	var stringIndexOf = uncurryThis$4(''.indexOf);
	var stringSlice = uncurryThis$4(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$1(this);
	      var replacer = isNullOrUndefined$1(searchValue) ? undefined : getMethod$1(searchValue, REPLACE);
	      return replacer
	        ? call$1(replacer, searchValue, O, replaceValue)
	        : call$1(nativeReplace, toString$1(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$1(this);
	      var S = toString$1(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable(replaceValue);
	      if (!functionalReplace) replaceValue = toString$1(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec$2(rx, S);
	        if (result === null) break;

	        push(results, result);
	        if (!global) break;

	        var matchStr = toString$1(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$1(result[0]);
	        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$1([matched], captures, position, S);
	          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
	          var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var makeBuiltIn = makeBuiltInExports;
	var defineProperty = objectDefineProperty;

	var defineBuiltInAccessor$1 = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty.f(target, name, descriptor);
	};

	var DESCRIPTORS = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis$3 = functionUncurryThis;
	var defineBuiltInAccessor = defineBuiltInAccessor$1;

	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis$3(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec$1 = uncurryThis$3(nameRE.exec);
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
	  defineBuiltInAccessor(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec$1(nameRE, functionToString(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var $$5 = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $TypeError$1 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$1('Maximum allowed index exceeded');
	  return it;
	};

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$1 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var $$4 = _export;
	var fails$1 = fails$i;
	var isArray = isArray$2;
	var isObject$1 = isObject$9;
	var toObject$2 = toObject$6;
	var lengthOfArrayLike$1 = lengthOfArrayLike$4;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty = createProperty$1;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
	var wellKnownSymbol = wellKnownSymbol$a;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$1(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$1(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$4({ target: 'Array', proto: true, arity: 1, forced: FORCED$2 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$2(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$1(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $$3 = _export;
	var uncurryThis$2 = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toIndexedObject = toIndexedObject$5;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;

	var nativeJoin = uncurryThis$2([].join);

	var ES3_STRINGS = IndexedObject$1 != Object;
	var FORCED$1 = ES3_STRINGS || !arrayMethodIsStrict$1('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$3({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var call = functionCall;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject = anObject$8;
	var isNullOrUndefined = isNullOrUndefined$4;
	var toLength = toLength$5;
	var toString = toString$7;
	var requireObjectCoercible = requireObjectCoercible$7;
	var getMethod = getMethod$3;
	var advanceStringIndex = advanceStringIndex$2;
	var regExpExec = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
	      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject(this);
	      var S = toString(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec(rx, S)) !== null) {
	        var matchStr = toString(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var aCallable$1 = aCallable$4;
	var toObject$1 = toObject$6;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike = lengthOfArrayLike$4;

	var $TypeError = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable$1(callbackfn);
	    var O = toObject$1(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw $TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};

	var classof = classofRaw$2;

	var engineIsNode = typeof process != 'undefined' && classof(process) == 'process';

	var $$2 = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict = arrayMethodIsStrict$3;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE = engineIsNode;

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$$2({ target: 'Array', proto: true, forced: FORCED }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$1 = _export;
	var toObject = toObject$6;
	var nativeKeys = objectKeys$1;
	var fails = fails$i;

	var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject(it));
	  }
	});

	function _newArrowCheck(innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	}

	var uncurryThis$1 = functionUncurryThis;

	var arraySlice$1 = uncurryThis$1([].slice);

	var uncurryThis = functionUncurryThis;
	var aCallable = aCallable$4;
	var isObject = isObject$9;
	var hasOwn = hasOwnProperty_1;
	var arraySlice = arraySlice$1;
	var NATIVE_BIND = functionBindNative;

	var $Function = Function;
	var concat = uncurryThis([].concat);
	var join = uncurryThis([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat(partArgs, arraySlice(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	// TODO: Remove from `core-js@4`
	var $ = _export;
	var bind = functionBind;

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	$({ target: 'Function', proto: true, forced: Function.bind !== bind }, {
	  bind: bind
	});

	var templates = {
	  "swift/urlsession": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Create a new URLRequest object\nvar request = URLRequest(url: URL(string: \"");
	    __append(url);
	    __append("\")!)\n\n// Set the request method\nrequest.httpMethod = \"");
	    __append(method);
	    __append("\"\n\n// Set the request content type header\nrequest.addValue(\"");
	    __append(mimeType);
	    __append("\", forHTTPHeaderField: \"Content-Type\")\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this);
	      __append("\nrequest.addValue(\"");
	      __append(escapeFn(header.value));
	      __append("\", forHTTPHeaderField: \"");
	      __append(escapeFn(header.name));
	      __append("\")\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this);
	      __append("\nrequest.addValue(\"");
	      __append(escapeFn(cookie.value));
	      __append("\", forHTTPHeaderField: \"");
	      __append(escapeFn(cookie.name));
	      __append("\")\n");
	    }.bind(this));
	    __append("\n\n// Set the request body\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nlet fileUrl = URL(fileURLWithPath: \"/path/to/file\")\nlet data = try Data(contentsOf: fileUrl)\nrequest.httpBody = data\n");
	      } else {
	        __append("\nlet postData = \"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\"\nlet postDataEncoded = postData.data(using: .utf8)\nrequest.httpBody = postDataEncoded\n");
	      }
	      __append("\n");
	    }
	    __append("\n\n// Create a new URLSession object\nlet session = URLSession.shared\n\n// Send the request\nlet task = session.dataTask(with: request) { (data, response, error) in\nguard let data = data else { return }\nprint(\"Response:\", String(data: data, encoding: .utf8)!)\n}\n\ntask.resume()\n");
	    return __output;
	  },
	  "swift/alamofire": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this2 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nlet fullUrl = \"");
	    __append(url);
	    __append("\"\n\n// Set up the request headers\nvar headers: HTTPHeaders = [:]\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this2);
	      __append("\nheaders[\"");
	      __append(escapeFn(header.name));
	      __append("\"] = \"");
	      __append(escapeFn(header.value));
	      __append("\"\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this2);
	      __append("\nlet cookie = HTTPCookie(properties: [\n    .domain: \"");
	      __append(escapeFn(cookie.domain));
	      __append("\",\n    .path: \"");
	      __append(escapeFn(cookie.path));
	      __append("\",\n    .name: \"");
	      __append(escapeFn(cookie.name));
	      __append("\",\n    .value: \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n])!\nHTTPCookieStorage.shared.setCookie(cookie)\n");
	    }.bind(this));
	    __append("\n\n// Set up the request parameters\nvar parameters: Parameters = [:]\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this2);
	      __append("\nparameters[\"");
	      __append(escapeFn(param.name));
	      __append("\"] = \"");
	      __append(escapeFn(param.value));
	      __append("\"\n");
	    }.bind(this));
	    __append("\n\n// Create the request\nAF.request(fullUrl, method: .");
	    __append(escapeFn(method.toLowerCase()));
	    __append(", parameters: parameters, headers: headers).response { response in\n    switch response.result {\n    case .success(let data):\n        if let data = data {\n            print(\"Response:\", String(data: data, encoding: .utf8)!)\n        }\n    case .failure(let error):\n        print(\"Error:\", error.localizedDescription)\n    }\n}\n");
	    return __output;
	  },
	  "shell/wget": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this3 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nwget --verbose --output-document=- \\\n--header=\"Content-Type: ");
	    __append(escapeFn(mimeType));
	    __append("\" \\\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this3);
	      __append("\n    --header=\"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\" \\\n");
	    }.bind(this));
	    __append("\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this3);
	      __append("\n    --header=\"Cookie: ");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\" \\\n");
	    }.bind(this));
	    if (method === 'GET') {
	      __append("\n    \"");
	      __append(escapeFn(url));
	      __append("\" \\\n");
	    } else if (method === 'POST') {
	      __append("\n    --post-data=\"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this3);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("\" \\\n    \"");
	      __append(escapeFn(url));
	      __append("\" \\\n");
	    } else if (method === 'PUT') {
	      __append("\n    --method=PUT \\\n    --body-data=\"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this3);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("\" \\\n    \"");
	      __append(escapeFn(url));
	      __append("\" \\\n");
	    } else if (method === 'DELETE') {
	      __append("\n    --method=DELETE \\\n    \"");
	      __append(escapeFn(url));
	      __append("\" \\\n");
	    }
	    __append("\n");
	    return __output;
	  },
	  "shell/httpie": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this4 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url;
	      locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nhttp --verbose --check --follow \\\n\"");
	    __append(escapeFn(url));
	    __append("\" \\\n");
	    __append(escapeFn(headers.map(function (header) {
	      _newArrowCheck(this, _this4);
	      return "'" + header.name + ":" + header.value + "'";
	    }.bind(this)).join(' \\\n    ')));
	    __append(" \\\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this4);
	      __append("\n    Cookie:\"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\" \\\n");
	    }.bind(this));
	    if (postData.length > 0) {
	      __append("\n    ");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this4);
	        return "'" + param.name + "=" + encodeURIComponent(param.value) + "'";
	      }.bind(this)).join(' \\\n    ')));
	      __append(" \\\n");
	    }
	    __append("\n--form \\\n--timeout 120s \\\n--max-redirects 10\n");
	    return __output;
	  },
	  "shell/curl": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this5 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\ncurl -X ");
	    __append(escapeFn(method));
	    __append(" \\\n-H \"Content-Type: ");
	    __append(escapeFn(mimeType));
	    __append("\" \\\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this5);
	      __append("\n    -H \"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\" \\\n");
	    }.bind(this));
	    __append("\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this5);
	      __append("\n    --cookie \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\" \\\n");
	    }.bind(this));
	    if (postData.length > 0) {
	      __append("\n    -d ");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n        \"@");
	        __append(escapeFn(postData[0].value));
	        __append("\" \\\n    ");
	      } else {
	        __append("\n        \"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this5);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\" \\\n    ");
	      }
	    }
	    __append("\n\"");
	    __append(escapeFn(url));
	    __append("\n");
	    return __output;
	  },
	  "scala/scalaj-http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this6 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport scalaj.http._\n\n// Extract parameters from the options object\nval url = \"");
	    __append(escapeFn(url));
	    __append("\"\nval method = \"");
	    __append(escapeFn(method));
	    __append("\"\nval mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\nval headers = ");
	    if (headers.length > 0) {
	      __append("Seq(\n");
	      headers.forEach(function (header) {
	        _newArrowCheck(this, _this6);
	        __append("\n  (\"");
	        __append(escapeFn(header.name));
	        __append("\", \"");
	        __append(escapeFn(header.value));
	        __append("\"),\n");
	      }.bind(this));
	      __append("\n)");
	    } else {
	      __append("Nil");
	    }
	    __append("\nval cookies = ");
	    if (cookies.length > 0) {
	      __append("Seq(\n");
	      cookies.forEach(function (cookie) {
	        _newArrowCheck(this, _this6);
	        __append("\n  HttpCookie(\"");
	        __append(escapeFn(cookie.name));
	        __append("\", \"");
	        __append(escapeFn(cookie.value));
	        __append("\"),\n");
	      }.bind(this));
	      __append("\n)");
	    } else {
	      __append("Nil");
	    }
	    __append("\nval postData = ");
	    if (postData.length > 0) {
	      __append("Seq(\n");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this6);
	        __append("\n  (\"");
	        __append(escapeFn(param.name));
	        __append("\", \"");
	        __append(escapeFn(param.value));
	        __append("\"),\n");
	      }.bind(this));
	      __append("\n)");
	    } else {
	      __append("Nil");
	    }
	    __append("\n\n// Construct the request\nval request = Http(url).method(method)\n  .headers(headers)\n  .cookies(cookies)\n  .timeout(connTimeoutMs = 10000, readTimeoutMs = 60000)\n  .option(HttpOptions.followRedirects(true))\n\n// Add request body if needed\nif (postData.nonEmpty) {\n  val entity = ");
	    if (postData.length === 1 && postData[0].type === 'file') {
	      __append("\n    MultipartFormData(Seq(\n      ");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this6);
	        __append("\n        FileData(\"");
	        __append(escapeFn(param.name));
	        __append("\", new java.io.File(\"");
	        __append(escapeFn(param.value));
	        __append("\"))\n      ");
	      }.bind(this));
	      __append("\n    )).toEntity\n  ");
	    } else {
	      __append("\n    HttpConstants.writePostData(postData).getBytes(\"UTF-8\")\n  ");
	    }
	    __append("\n  request.postData(entity, mimeType)\n}\n\n// Send the request\nval response = request.asString\n\n// Handle the response\nif (response.isSuccess) {\n  println(\"Response: \" + response.body)\n} else {\n  println(\"Error: \" + response.code + \" \" + response.statusLine)\n}\n");
	    return __output;
	  },
	  "scala/http4s": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this7 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport cats.effect._\nimport org.http4s._\nimport org.http4s.client.blaze._\nimport org.http4s.client.dsl.io._\nimport org.http4s.headers._\nimport org.http4s.MediaType._\n\n// Extract parameters from the options object\nval url = \"");
	    __append(escapeFn(url));
	    __append("\"\nval method = \"");
	    __append(escapeFn(method));
	    __append("\"\nval mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\nval headers = ");
	    if (headers.length > 0) {
	      __append("Headers(\n");
	      headers.forEach(function (header) {
	        _newArrowCheck(this, _this7);
	        __append("\n  Header.apply(\"");
	        __append(escapeFn(header.name));
	        __append("\", \"");
	        __append(escapeFn(header.value));
	        __append("\"),\n");
	      }.bind(this));
	      __append("\n)");
	    } else {
	      __append("Headers.empty");
	    }
	    __append("\nval cookies = ");
	    if (cookies.length > 0) {
	      __append("Seq(\n");
	      cookies.forEach(function (cookie) {
	        _newArrowCheck(this, _this7);
	        __append("\n  RequestCookie(\"");
	        __append(escapeFn(cookie.name));
	        __append("\", \"");
	        __append(escapeFn(cookie.value));
	        __append("\"),\n");
	      }.bind(this));
	      __append("\n)");
	    } else {
	      __append("Seq.empty");
	    }
	    __append("\nval postData = ");
	    if (postData.length > 0) {
	      __append("UrlForm(\n");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this7);
	        __append("\n  \"");
	        __append(escapeFn(param.name));
	        __append("\" -> \"");
	        __append(escapeFn(param.value));
	        __append("\",\n");
	      }.bind(this));
	      __append("\n)");
	    } else {
	      __append("UrlForm.empty");
	    }
	    __append("\n\n// Construct the request\nimplicit val cs = IO.contextShift(ExecutionContext.global)\nval client = Http1Client[IO]().unsafeRunSync()\nval request = Method.");
	    __append(escapeFn(method.toUpperCase()));
	    __append("(Uri.unsafeFromString(url), postData)\n  .withHeaders(headers)\n  .withCredentials(Credentials(cookies))\n\n// Send the request\nval response = client.expect[String](request).unsafeRunSync()\n\n// Handle the response\nprintln(\"Response: \" + response)\n\n// Clean up\nclient.shutdownNow()\n");
	    return __output;
	  },
	  "scala/akka": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this8 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport akka.actor.ActorSystem\nimport akka.http.scaladsl.Http\nimport akka.http.scaladsl.model._\nimport akka.stream.ActorMaterializer\nimport akka.stream.scaladsl._\nimport scala.concurrent.Future\nimport scala.util.{Failure, Success}\n\n// Extract parameters from the options object\nval url = \"");
	    __append(escapeFn(url));
	    __append("\"\nval method = \"");
	    __append(escapeFn(method));
	    __append("\"\nval mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\nval headers = List(\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this8);
	      __append("\n  HttpHeader.parse(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\").asInstanceOf[HttpHeader],\n");
	    }.bind(this));
	    __append("\n)\nval cookies = List(\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this8);
	      __append("\n  HttpCookiePair(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\").asInstanceOf[HttpCookiePair],\n");
	    }.bind(this));
	    __append("\n)\nval postData = List(\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this8);
	      __append("\n  FormData.BodyPart.Strict(\"");
	      __append(escapeFn(param.name));
	      __append("\", \"");
	      __append(escapeFn(param.value));
	      __append("\").asInstanceOf[FormData.BodyPart.Strict],\n");
	    }.bind(this));
	    __append("\n)\n\n// Construct the request\nimplicit val system = ActorSystem()\nimplicit val materializer = ActorMaterializer()\nimplicit val executionContext = system.dispatcher\n\nval request = HttpRequest(\n  method = HttpMethods.");
	    __append(escapeFn(method.toUpperCase()));
	    __append(",\n  uri = url,\n  headers = headers,\n  entity = ");
	    if (postData.length > 0) {
	      __append("FormData(postData).toEntity");
	    } else {
	      __append("HttpEntity.Empty");
	    }
	    __append("\n).addCredentials(cookies)\n\n// Send the request\nval responseFuture: Future[HttpResponse] = Http().singleRequest(request)\n\n// Handle the response\nresponseFuture.onComplete {\n  case Success(response) =>\n    response.entity.dataBytes.runWith(Sink.fold(\"\")(_ + _.utf8String))\n      .onComplete {\n        case Success(responseBody) => println(\"Response: \" + responseBody)\n        case Failure(ex) => println(\"Failed to get response body: \" + ex.getMessage)\n      }\n  case Failure(ex) => println(\"Error: \" + ex.getMessage)\n}\n");
	    return __output;
	  },
	  "rust/surf": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this9 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nuse surf::http::{Method, Url, headers::{Headers, HeaderValue}};\n\n// Construct the request URL\nlet url = Url::new(\"");
	    __append(escapeFn(url));
	    __append("\").unwrap();\n\n// Set up the request\nlet mut req = surf::Request::new(");
	    __append(escapeFn(method));
	    __append(" , url);\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this9);
	      __append("\nreq.insert_header(\"");
	      __append(escapeFn(header.name));
	      __append("\", HeaderValue::from_str(\"");
	      __append(escapeFn(header.value));
	      __append("\").unwrap());\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this9);
	      __append("\nreq.insert_cookie(surf::http::Cookie::new(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\"));\n");
	    }.bind(this));
	    __append("\n\n// Send the request\n");
	    if (postData.length > 0) {
	      __append("\nlet body = ");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nsurf::Body::from_form(&surf::http::Form::from(");
	        postData[0].value;
	        __append("))\n");
	      } else {
	        __append("\nsurf::Body::from(\"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this9);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\")\n");
	      }
	      __append(";\nreq.set_body(body);\n");
	    }
	    __append("\n\n// Send the request and handle the response\nlet res = async {\n    let mut res = req.await?;\n    let body = res.body_string().await?;\n    println!(\"Response: {}\", body);\n    Ok(())\n}.await;\n\n// Handle errors\nif let Err(err) = res {\n    eprintln!(\"Error: {}\", err);\n}\n");
	    return __output;
	  },
	  "rust/reqwest": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this10 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Extract parameters from the options object\nlet url = \"");
	    __append(escapeFn(url));
	    __append("\";\nlet method = \"");
	    __append(escapeFn(method));
	    __append("\";\nlet mime_type = \"");
	    __append(escapeFn(mimeType));
	    __append("\";\n\nlet headers = reqwest::header::HeaderMap::new();\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this10);
	      __append("\nheaders.insert(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\".parse().unwrap());\n");
	    }.bind(this));
	    __append("\n\nlet mut cookies = reqwest::cookie::CookieJar::new();\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this10);
	      __append("\ncookies.add(reqwest::cookie::Cookie::new(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\"));\n");
	    }.bind(this));
	    __append("\n\nlet mut request_builder = reqwest::Client::new().request(method, url);\nrequest_builder = request_builder.headers(headers);\nrequest_builder = request_builder.cookie_store(cookies);\n\n// Add post data to the request\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nlet form_data = reqwest::multipart::Form::new()\n    .file(\"");
	        __append(escapeFn(postData[0].name));
	        __append("\", \"");
	        __append(escapeFn(postData[0].value));
	        __append("\").unwrap();\n");
	      } else {
	        __append("\nlet post_data = \"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this10);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\";\nlet request_builder = request_builder.body(post_data);\n");
	      }
	      __append("\n");
	    }
	    __append("\n\nlet response = request_builder.send().await.unwrap();\nlet response_text = response.text().await.unwrap();\nprintln!(\"Response: {}\", response_text);\n");
	    return __output;
	  },
	  "rust/hyper": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this11 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Create a new Hyper client object\nlet client = hyper::Client::new();\n\n// Construct the request URL\nlet full_url = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n// Create the request\nlet mut req = hyper::Request::new(hyper::Method::");
	    __append(escapeFn(method));
	    __append(", full_url);\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this11);
	      __append("\nreq.headers_mut().insert(hyper::header::");
	      __append(escapeFn(header.name));
	      __append(", ");
	      __append(escapeFn(header.value));
	      __append(".parse().unwrap());\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this11);
	      __append("\nreq.headers_mut().insert(hyper::header::COOKIE, format!(\"");
	      __append(escapeFn(cookie.name));
	      __append("={");
	      __append(escapeFn(cookie.value));
	      __append("}; \"));\n");
	    }.bind(this));
	    __append("\n\n// Add the request body\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nlet form = multipart::Form::new()\n.file(\"");
	        __append(escapeFn(postData[0].name));
	        __append("\", \"");
	        __append(escapeFn(postData[0].value));
	        __append("\")\n.unwrap();\nlet mut body = hyper::Body::from(form.stream());\n");
	      } else {
	        __append("\nlet body = hyper::Body::from(\"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this11);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\");\n");
	      }
	      __append("\nreq.headers_mut().insert(hyper::header::CONTENT_TYPE, \"");
	      __append(escapeFn(mimeType));
	      __append("\".parse().unwrap());\nreq.headers_mut().insert(hyper::header::CONTENT_LENGTH, body.len().into());\nreq.set_body(body);\n");
	    }
	    __append("\n\n// Send the request and get the response\nlet res = client.request(req).await?;\n\n// Print the response\nprintln!(\"Response: \\n{:?}\", res);\n");
	    return __output;
	  },
	  "ruby/restclient": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this12 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nrequire 'rest-client'\n\nurl = \"");
	    __append(escapeFn(url));
	    __append("\"\nmethod = \"");
	    __append(escapeFn(method));
	    __append("\"\nmimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\n\nheaders = {\n  ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this12);
	      __append("\n    \"");
	      __append(escapeFn(header.name));
	      __append("\" => \"");
	      __append(escapeFn(header.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n}\n\ncookies = {\n  ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this12);
	      __append("\n    \"");
	      __append(escapeFn(cookie.name));
	      __append("\" => \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n}\n\n");
	    if (method === 'GET') {
	      __append("\n  response = RestClient.get(url, headers: headers, cookies: cookies)\n");
	    } else {
	      __append("\n  body = \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this12);
	        return param.name + '=' + CGI.escape(param.value);
	      }.bind(this)).join('&')));
	      __append("\"\n  response = RestClient::");
	      __append(escapeFn(method.downcase));
	      __append("(url, body, headers: headers, cookies: cookies, content_type: mimeType)\n");
	    }
	    __append("\n\nputs \"Response: #{response.body}\"\n");
	    return __output;
	  },
	  "ruby/http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this13 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nrequire 'net/http'\nrequire 'uri'\n\nurl = URI(\"");
	    __append(escapeFn(url));
	    __append("\")\nmethod = \"");
	    __append(escapeFn(method));
	    __append("\"\nmimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\n\n");
	    if (method === 'GET') {
	      __append("\n  req = Net::HTTP::Get.new(url)\n");
	    } else {
	      __append("\n  body = \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this13);
	        return param.name + '=' + CGI.escape(param.value);
	      }.bind(this)).join('&')));
	      __append("\"\n  req = Net::HTTP::");
	      __append(escapeFn(method.capitalize));
	      __append(".new(url)\n  req.body = body\n  req.content_type = mimeType\n");
	    }
	    __append("\n\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this13);
	      __append("\n  req['");
	      __append(escapeFn(header.name));
	      __append("'] = '");
	      __append(escapeFn(header.value));
	      __append("'\n");
	    }.bind(this));
	    __append("\n\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this13);
	      __append("\n  req['Cookie'] = '");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("'\n");
	    }.bind(this));
	    __append("\n\nres = Net::HTTP.start(url.hostname, url.port, use_ssl: url.scheme == 'https') do |http|\n  http.request(req)\nend\n\nputs \"Response: #{res.body}\"\n");
	    return __output;
	  },
	  "python/requests": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this14 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport requests\n\n# Extract parameters from the options object\nfullUrl = \"");
	    __append(escapeFn(url));
	    __append("\"\nmethod = \"");
	    __append(escapeFn(method));
	    __append("\"\nmimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\nheaders = {\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this14);
	      __append("\n        '");
	      __append(escapeFn(header.name));
	      __append("': '");
	      __append(escapeFn(header.value));
	      __append("',\n    ");
	    }.bind(this));
	    __append("\n}\npostData = {\n    ");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this14);
	      __append("\n        '");
	      __append(escapeFn(param.name));
	      __append("': '");
	      __append(escapeFn(param.value));
	      __append("',\n    ");
	    }.bind(this));
	    __append("\n}\ncookies = {\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this14);
	      __append("\n        '");
	      __append(escapeFn(cookie.name));
	      __append("': '");
	      __append(escapeFn(cookie.value));
	      __append("',\n    ");
	    }.bind(this));
	    __append("\n}\n\n# Set up the request\nreq = requests.Request(method, fullUrl, headers=headers, cookies=cookies)\n\n# Add data to the request\nif postData:\n    req.data = postData\n\n# Construct the prepared request\nprepared_req = req.prepare()\n\n# Send the request and get the response\nsession = requests.Session()\nresponse = session.send(prepared_req)\n\n# Handle the response\nprint(f\"{response.status_code} {response.reason}\")\nprint(response.text)\n\n# Handle errors\nif response.status_code >= 400:\n    print(\"Error:\", response.status_code, response.reason)\n");
	    return __output;
	  },
	  "python/http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this15 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers;
	      locals.query;
	      var postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport http.client\n\n# Extract parameters from the options object\nfullUrl = \"");
	    __append(escapeFn(url));
	    __append("\"\nmethod = \"");
	    __append(escapeFn(method));
	    __append("\"\nmimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\nheaders = [\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this15);
	      __append("\n        ('");
	      __append(escapeFn(header.name));
	      __append("', '");
	      __append(escapeFn(header.value));
	      __append("'),\n    ");
	    }.bind(this));
	    __append("\n]\npostData = {\n    ");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this15);
	      __append("\n        '");
	      __append(escapeFn(param.name));
	      __append("': '");
	      __append(escapeFn(param.value));
	      __append("',\n    ");
	    }.bind(this));
	    __append("\n}\ncookies = {\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this15);
	      __append("\n        '");
	      __append(escapeFn(cookie.name));
	      __append("': '");
	      __append(escapeFn(cookie.value));
	      __append("',\n    ");
	    }.bind(this));
	    __append("\n}\n\n# Set up the request\nconn = http.client.HTTPSConnection(fullUrl)\n\n# Add headers to the request\nfor header in headers:\n    conn.request(method, url, headers=header)\n\n# Add cookies to the request\ncookie_str = '; '.join([f\"{name}={value}\" for name, value in cookies.items()])\n    conn.request(method, url, headers={'Cookie': cookie_str})\n\n# Send the request\nif postData:\n    postData_str = '&'.join([f\"{name}={value}\" for name, value in postData.items()])\n    conn.request(method, url, body=postData_str, headers={'Content-Type': mimeType})\nelse:\n    conn.request(method, url)\n\n# Handle the response\nres = conn.getresponse()\nprint(res.status, res.reason)\ndata = res.read()\nprint(data.decode(\"utf-8\"))\n\n# Handle errors\nif res.status >= 400:\n    print(\"Error:\", res.status, res.reason)\n");
	    return __output;
	  },
	  "powershell/webrequest": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this16 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n$url = \"");
	    __append(escapeFn(url));
	    __append("\"\n$method = \"");
	    __append(escapeFn(method));
	    __append("\"\n$mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\n\n$headers = @{\n  ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this16);
	      __append("\n    \"");
	      __append(escapeFn(header.name));
	      __append("\" = \"");
	      __append(escapeFn(header.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n}\n\n$cookies = @{\n  ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this16);
	      __append("\n    \"");
	      __append(escapeFn(cookie.name));
	      __append("\" = \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n}\n\n");
	    if (method === 'GET') {
	      __append("\n  $req = Invoke-WebRequest -Uri $url -Headers $headers -Cookies $cookies\n");
	    } else {
	      __append("\n  $body = @{\n    ");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this16);
	        __append("\n      \"");
	        __append(escapeFn(param.name));
	        __append("\" = \"");
	        __append(escapeFn(param.value));
	        __append("\",\n    ");
	      }.bind(this));
	      __append("\n  }\n\n  $req = Invoke-WebRequest -Uri $url -Method $method -Body $body -Headers $headers -ContentType $mimeType -Cookies $cookies\n");
	    }
	    __append("\n\nWrite-Host \"Response: \" -ForegroundColor Green\nWrite-Host $req.Content\n");
	    return __output;
	  },
	  "powershell/restmethod": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this17 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n$url = \"");
	    __append(escapeFn(url));
	    __append("\"\n$method = \"");
	    __append(escapeFn(method));
	    __append("\"\n$mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\n\n$headers = @{\n  ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this17);
	      __append("\n    \"");
	      __append(escapeFn(header.name));
	      __append("\" = \"");
	      __append(escapeFn(header.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n}\n\n$cookies = @{\n  ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this17);
	      __append("\n    \"");
	      __append(escapeFn(cookie.name));
	      __append("\" = \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n}\n\n");
	    if (method === 'GET') {
	      __append("\n  $req = Invoke-RestMethod -Uri $url -Headers $headers -Cookies $cookies\n");
	    } else {
	      __append("\n  $body = @{\n    ");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this17);
	        __append("\n      \"");
	        __append(escapeFn(param.name));
	        __append("\" = \"");
	        __append(escapeFn(param.value));
	        __append("\",\n    ");
	      }.bind(this));
	      __append("\n  }\n\n  $req = Invoke-RestMethod -Uri $url -Method $method -Body $body -Headers $headers -ContentType $mimeType -Cookies $cookies\n");
	    }
	    __append("\n\nWrite-Host \"Response: \" -ForegroundColor Green\nWrite-Host $req | ConvertTo-Json -Depth 100 -Compress\n");
	    return __output;
	  },
	  "php/http2": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this18 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n<?php\n\n    $host = parse_url(\"");
	    __append(escapeFn(url));
	    __append("\", PHP_URL_HOST);\n    $path = parse_url(\"");
	    __append(escapeFn(url));
	    __append("\", PHP_URL_PATH) ?: \"/\";\n\n    $httpHeaders = array(\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this18);
	      __append("\n        \"");
	      __append(escapeFn(header.name));
	      __append("\" => \"");
	      __append(escapeFn(header.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $httpCookies = array(\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this18);
	      __append("\n        \"");
	      __append(escapeFn(cookie.name));
	      __append("\" => \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $httpBody = null;\n    if (\"");
	    __append(escapeFn(method));
	    __append("\" === \"POST\") {\n        $httpBody = \"");
	    __append(escapeFn(postData.map(function (param) {
	      _newArrowCheck(this, _this18);
	      return param.name + '=' + urlencode(param.value);
	    }.bind(this)).join('&')));
	    __append("\";\n    }\n\n    $streamContext = stream_context_create([\n        'http' => [\n            'method' => \"");
	    __append(escapeFn(method));
	    __append("\",\n            'header' => implode(\"\\r\\n\", $httpHeaders),\n            'content' => $httpBody,\n            'follow_location' => false,\n            'protocol_version' => 2.0,\n        ],\n        'ssl' => [\n            'verify_peer' => false,\n            'verify_peer_name' => false,\n        ],\n    ]);\n\n    $response = file_get_contents(\"https://$host$path\", false, $streamContext);\n\n    echo \"Response: \" . $response;\n\n?>\n");
	    return __output;
	  },
	  "php/http1": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this19 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n<?php\n\n    $host = parse_url(\"");
	    __append(escapeFn(url));
	    __append("\", PHP_URL_HOST);\n    $path = parse_url(\"");
	    __append(escapeFn(url));
	    __append("\", PHP_URL_PATH) ?: \"/\";\n\n    $httpHeaders = array(\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this19);
	      __append("\n        \"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $httpCookies = array(\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this19);
	      __append("\n        \"");
	      __append(escapeFn(cookie.name));
	      __append("\" => \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $httpBody = null;\n    if (\"");
	    __append(escapeFn(method));
	    __append("\" === \"POST\") {\n        $httpBody = \"");
	    __append(escapeFn(postData.map(function (param) {
	      _newArrowCheck(this, _this19);
	      return param.name + '=' + urlencode(param.value);
	    }.bind(this)).join('&')));
	    __append("\";\n    }\n\n    $request = new http\\Client\\Request(\"");
	    __append(escapeFn(method));
	    __append("\", \"http://$host$path\");\n    $request->setHeaders($httpHeaders);\n    $request->setCookies($httpCookies);\n    $request->setBody($httpBody);\n\n    $client = new http\\Client;\n    $client->enqueue($request);\n\n    $response = $client->send();\n\n    echo \"Response: \" . $response->getBody();\n\n?>\n");
	    return __output;
	  },
	  "php/guzzle": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this20 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n<?php\n\n    use GuzzleHttp\\Client;\n    use GuzzleHttp\\Exception\\RequestException;\n\n    $client = new Client();\n\n    $url = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n    $headers = array(\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this20);
	      __append("\n        \"");
	      __append(escapeFn(header.name));
	      __append("\" => \"");
	      __append(escapeFn(header.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $cookies = array(\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this20);
	      __append("\n        \"");
	      __append(escapeFn(cookie.name));
	      __append("\" => \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $requestBody = null;\n    if (\"");
	    __append(escapeFn(method));
	    __append("\" === \"POST\") {\n        $requestBody = \"");
	    __append(escapeFn(postData.map(function (param) {
	      _newArrowCheck(this, _this20);
	      return param.name + '=' + urlencode(param.value);
	    }.bind(this)).join('&')));
	    __append("\";\n    }\n\n    try {\n        $response = $client->request('");
	    __append(escapeFn(method));
	    __append("', $url, [\n            'headers' => $headers,\n            'cookies' => $cookies,\n            'body' => $requestBody,\n        ]);\n\n        echo \"Response: \" . $response->getBody();\n    } catch (RequestException $e) {\n        echo \"Error: \" . $e->getMessage();\n    }\n\n?>\n");
	    return __output;
	  },
	  "php/curl": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this21 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n<?php\n\n    $url = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n    $requestHeaders = array(\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this21);
	      __append("\n        \"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $requestCookies = array(\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this21);
	      __append("\n        \"");
	      __append(escapeFn(cookie.name));
	      __append("=<");
	      __append(escapeFn(cookie.value));
	      __append(">\",\n    ");
	    }.bind(this));
	    __append("\n    );\n\n    $requestBody = null;\n    if (\"");
	    __append(escapeFn(method));
	    __append("\" === \"POST\") {\n        $requestBody = \"");
	    __append(escapeFn(postData.map(function (param) {
	      _newArrowCheck(this, _this21);
	      return param.name + '=' + urlencode(param.value);
	    }.bind(this)).join('&')));
	    __append("\";\n    }\n\n    $ch = curl_init();\n\n    curl_setopt($ch, CURLOPT_URL, $url);\n    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n    curl_setopt($ch, CURLOPT_HTTPHEADER, $requestHeaders);\n    curl_setopt($ch, CURLOPT_COOKIE, implode(\"; \", $requestCookies));\n\n    if (\"");
	    __append(escapeFn(method));
	    __append("\" === \"POST\") {\n        curl_setopt($ch, CURLOPT_POST, true);\n        curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);\n    }\n\n    $response = curl_exec($ch);\n\n    curl_close($ch);\n\n    echo \"Response: \" . $response;\n\n?>\n");
	    return __output;
	  },
	  "perl/useragent": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this22 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n");
	    __append("\nuse LWP::UserAgent;\nmy $ua = LWP::UserAgent->new;\n\n");
	    __append("\nmy $fullUrl = '");
	    __append(escapeFn(url));
	    __append("';\n\n");
	    __append("\nmy $request = HTTP::Request->new('");
	    __append(escapeFn(method));
	    __append("', $fullUrl);\n\n");
	    __append("\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this22);
	      __append("\n$request->header('");
	      __append(escapeFn(header.name));
	      __append("', '");
	      __append(escapeFn(header.value));
	      __append("');\n");
	    }.bind(this));
	    __append("\n\n");
	    __append("\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this22);
	      __append("\n$ua->cookie_jar->set_cookie(0, '");
	      __append(escapeFn(cookie.name));
	      __append("', '");
	      __append(escapeFn(cookie.value));
	      __append("', '/', 'example.com');\n");
	    }.bind(this));
	    __append("\n\n");
	    __append("\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nmy $file = '");
	        __append(escapeFn(postData[0].value));
	        __append("';\n$request->content($file);\n");
	      } else {
	        __append("\nmy $post_data = {\n");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this22);
	          __append("\n'");
	          __append(escapeFn(param.name));
	          __append("' => '");
	          __append(escapeFn(param.value));
	          __append("',\n");
	        }.bind(this));
	        __append("\n};\n$request->content(join('&', map { $_ . '=' . $post_data->{$_} } keys %$post_data));\n");
	      }
	      __append("\n");
	    }
	    __append("\n\n");
	    __append("\nmy $response = $ua->request($request);\n\n");
	    __append("\nif ($response->is_success) {\nprint \"Response:\\n\";\nprint $response->content;\n}\n\n");
	    __append("\nelse {\nprint \"Error: \" . $response->status_line . \"\\n\";\n}\n");
	    return __output;
	  },
	  "perl/tiny": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this23 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n");
	    __append("\nuse HTTP::Tiny;\nmy $http = HTTP::Tiny->new;\n\n");
	    __append("\nmy $fullUrl = '");
	    __append(escapeFn(url));
	    __append("';\n\n");
	    __append("\nmy $options = {\nheaders => {\n'Content-Type' => '");
	    __append(escapeFn(mimeType));
	    __append("',\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this23);
	      __append("\n'");
	      __append(escapeFn(header.name));
	      __append("' => '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n},\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this23);
	      __append("\ncookies => {\n'");
	      __append(escapeFn(cookie.name));
	      __append("' => '");
	      __append(escapeFn(cookie.value));
	      __append("',\n},\n");
	    }.bind(this));
	    __append("\n};\n\n");
	    __append("\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nmy $file = '");
	        __append(escapeFn(postData[0].value));
	        __append("';\n$options->{content} = $file;\n");
	      } else {
	        __append("\nmy $post_data = {\n");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this23);
	          __append("\n'");
	          __append(escapeFn(param.name));
	          __append("' => '");
	          __append(escapeFn(param.value));
	          __append("',\n");
	        }.bind(this));
	        __append("\n};\n$options->{content} = join('&', map { $_ . '=' . $post_data->{$_} } keys %$post_data);\n");
	      }
	      __append("\n");
	    }
	    __append("\n\n");
	    __append("\nmy $response = $http->request('");
	    __append(escapeFn(method));
	    __append("', $fullUrl, $options);\n\n");
	    __append("\nif ($response->{success}) {\nprint \"Response:\\n\";\nprint $response->{content};\n}\n\n");
	    __append("\nelse {\nprint \"Error: \" . $response->{status} . \"\\n\";\n}\n");
	    return __output;
	  },
	  "perl/request": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this24 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n");
	    __append("\nuse HTTP::Request;\nmy $request = HTTP::Request->new('");
	    __append(escapeFn(method));
	    __append("', '");
	    __append(escapeFn(url));
	    __append("');\n\n");
	    __append("\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this24);
	      __append("\n$request->header('");
	      __append(escapeFn(header.name));
	      __append("', '");
	      __append(escapeFn(header.value));
	      __append("');\n");
	    }.bind(this));
	    __append("\n\n");
	    __append("\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this24);
	      __append("\n$request->header('Cookie', '");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("');\n");
	    }.bind(this));
	    __append("\n\n");
	    __append("\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\nmy $file = '");
	        __append(escapeFn(postData[0].value));
	        __append("';\n$request->content($file);\n");
	      } else {
	        __append("\nmy $post_data = {\n");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this24);
	          __append("\n'");
	          __append(escapeFn(param.name));
	          __append("' => '");
	          __append(escapeFn(param.value));
	          __append("',\n");
	        }.bind(this));
	        __append("\n};\n$request->content(join('&', map { $_ . '=' . $post_data->{$_} } keys %$post_data));\n");
	      }
	      __append("\n");
	    }
	    __append("\n\n");
	    __append("\nuse HTTP::Tiny;\nmy $http = HTTP::Tiny->new;\nmy $response = $http->request($request);\n\n");
	    __append("\nif ($response->{success}) {\nprint \"Response:\\n\";\nprint $response->{content};\n}\n\n");
	    __append("\nelse {\nprint \"Error: \" . $response->{status} . \"\\n\";\n}\n");
	    return __output;
	  },
	  "ocaml/httpaf": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this25 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n(* Construct the request URL *)\nlet fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\" in\n\n(* Set up the request *)\nlet headers = Cohttp.Header.of_list [\n  \"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\";\n  ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this25);
	      __append("\n  \"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\";\n  ");
	    }.bind(this));
	    __append("\n  ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this25);
	      __append("\n  \"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\";\n  ");
	    }.bind(this));
	    __append("\n] in\nlet body =\n  ");
	    if (postData.length > 0) {
	      __append("\n  (match ");
	      __append(escapeFn(method));
	      __append(" with\n  | \"GET\" -> \"\"\n  | _ -> \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this25);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("\")\n  ");
	    } else {
	      __append("\n  \"\"\n  ");
	    }
	    __append("\nin\nlet req = Httpaf.Request.create\n  ~headers:(Httpaf.Headers.of_list (Cohttp.Header.to_list headers))\n  (Httpaf.Method.of_string \"");
	    __append(escapeFn(method));
	    __append("\")\n  (Uri.of_string fullUrl)\n  body\nin\n\n(* Send the request *)\nlet conn = Httpaf_lwt_unix.Client.create_connection (Uri.host_with_default ~default:\"localhost\" (Uri.of_string fullUrl)) in\nlet%bind () = Httpaf_lwt_unix.Client.write_request conn req in\nlet%bind resp = Httpaf_lwt_unix.Client.read_response conn in\n\n(* Handle the response *)\nlet%bind body = Httpaf_lwt.Body.to_string resp.body in\nprint_endline (\"Response: \" ^ body);\n\n(* Handle errors *)\nlet error_handler = function\n  | Unix.Unix_error (Unix.ENETUNREACH, _, _) ->\n      print_endline \"Error: Network is unreachable\"\n  | Unix.Unix_error (Unix.ECONNREFUSED, _, _) ->\n      print_endline \"Error: Connection refused\"\n  | exn ->\n      Printf.eprintf \"Error: %s\\n\" (Printexc.to_string exn);\n      exit 1\nin\nLwt.catch (fun () -> body) error_handler;\n");
	    return __output;
	  },
	  "ocaml/cohttp_lwt": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this26 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n(* Construct the request URL *)\nlet fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\" in\n\n(* Set up the request *)\nlet req = Cohttp_lwt_unix.Client.request\n  ~headers:(Cohttp.Header.of_list [\n    \"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\";\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this26);
	      __append("\n    \"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\";\n    ");
	    }.bind(this));
	    __append("\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this26);
	      __append("\n    \"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\";\n    ");
	    }.bind(this));
	    __append("\n  ])\n  ");
	    if (postData.length > 0) {
	      __append("\n  (match ");
	      __append(escapeFn(method));
	      __append(" with\n  | \"GET\" -> Cohttp_lwt.Body.empty\n  | _ -> Cohttp_lwt.Body.of_string \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this26);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("\")\n  ");
	    } else {
	      __append("\n  Cohttp_lwt.Body.empty\n  ");
	    }
	    __append("\nin\n\n(* Send the request *)\nlet%bind (_resp, body) = Cohttp_lwt_unix.Client.call (");
	    __append(escapeFn(method));
	    __append(" |> Cohttp.Code.method_of_string) fullUrl req in\n\n(* Handle the response *)\nlet%bind body = Cohttp_lwt.Body.to_string body in\nprint_endline (\"Response: \" ^ body);\n\n(* Handle errors *)\nlet error_handler = function\n  | Unix.Unix_error (Unix.ENETUNREACH, _, _) ->\n      print_endline \"Error: Network is unreachable\"\n  | Unix.Unix_error (Unix.ECONNREFUSED, _, _) ->\n      print_endline \"Error: Connection refused\"\n  | exn ->\n      Printf.eprintf \"Error: %s\\n\" (Printexc.to_string exn);\n      exit 1\nin\nLwt.catch (fun () -> body) error_handler;\n");
	    return __output;
	  },
	  "objectivec/nsurlsession": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this27 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nNSString *fullUrl = @\"");
	    __append(url);
	    __append("\";\n\n// Set up the request headers\nNSMutableDictionary *headers = [NSMutableDictionary dictionary];\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this27);
	      __append("\n[headers setObject:@\"");
	      __append(escapeFn(header.value));
	      __append("\" forKey:@\"");
	      __append(escapeFn(header.name));
	      __append("\"];\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this27);
	      __append("\nNSDictionary *cookieProperties = @{\n    NSHTTPCookieDomain: @\"");
	      __append(escapeFn(cookie.domain));
	      __append("\",\n    NSHTTPCookiePath: @\"");
	      __append(escapeFn(cookie.path));
	      __append("\",\n    NSHTTPCookieName: @\"");
	      __append(escapeFn(cookie.name));
	      __append("\",\n    NSHTTPCookieValue: @\"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n};\nNSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];\n[[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];\n");
	    }.bind(this));
	    __append("\n\n// Set up the request parameters\nNSMutableDictionary *parameters = [NSMutableDictionary dictionary];\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this27);
	      __append("\n[parameters setObject:@\"");
	      __append(escapeFn(param.value));
	      __append("\" forKey:@\"");
	      __append(escapeFn(param.name));
	      __append("\"];\n");
	    }.bind(this));
	    __append("\n\n// Create the request\nNSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:fullUrl]];\nrequest.HTTPMethod = @\"");
	    __append(escapeFn(method));
	    __append("\";\n[request setValue:@\"");
	    __append(escapeFn(mimeType));
	    __append("\" forHTTPHeaderField:@\"Content-Type\"];\nfor (NSString *key in headers) {\n    [request setValue:headers[key] forHTTPHeaderField:key];\n}\nNSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];\nNSURLSession *session = [NSURLSession sessionWithConfiguration:config];\n\n// Add the parameters to the request body\nif (parameters.count > 0) {\n    NSData *bodyData = [[parameters urlEncodedString] dataUsingEncoding:NSUTF8StringEncoding];\n    request.HTTPBody = bodyData;\n}\n\n// Send the request\nNSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {\n    if (error) {\n        NSLog(@\"Error: %@\", error);\n        return;\n    }\n    if ([response isKindOfClass:[NSHTTPURLResponse class]]) {\n        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;\n        if (httpResponse.statusCode == 200) {\n            NSString *responseString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];\n            NSLog(@\"Response: %@\", responseString);\n        }\n    }\n}];\n[task resume];\n");
	    return __output;
	  },
	  "objectivec/afnetworking": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this28 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nNSString *fullUrl = @\"");
	    __append(url);
	    __append("\";\n\n// Set up the request headers\nNSMutableDictionary *headers = [NSMutableDictionary dictionary];\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this28);
	      __append("\n[headers setObject:@\"");
	      __append(escapeFn(header.value));
	      __append("\" forKey:@\"");
	      __append(escapeFn(header.name));
	      __append("\"];\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this28);
	      __append("\nNSDictionary *cookieProperties = @{\n    NSHTTPCookieDomain: @\"");
	      __append(escapeFn(cookie.domain));
	      __append("\",\n    NSHTTPCookiePath: @\"");
	      __append(escapeFn(cookie.path));
	      __append("\",\n    NSHTTPCookieName: @\"");
	      __append(escapeFn(cookie.name));
	      __append("\",\n    NSHTTPCookieValue: @\"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n};\nNSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];\n[[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];\n");
	    }.bind(this));
	    __append("\n\n// Set up the request parameters\nNSMutableDictionary *parameters = [NSMutableDictionary dictionary];\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this28);
	      __append("\n[parameters setObject:@\"");
	      __append(escapeFn(param.value));
	      __append("\" forKey:@\"");
	      __append(escapeFn(param.name));
	      __append("\"];\n");
	    }.bind(this));
	    __append("\n\n// Create the request manager\nAFHTTPSessionManager *manager = [AFHTTPSessionManager manager];\nmanager.requestSerializer = [AFJSONRequestSerializer serializer];\nmanager.responseSerializer = [AFJSONResponseSerializer serializer];\n\n// Add the headers to the request manager\nfor (NSString *key in headers) {\n    [manager.requestSerializer setValue:headers[key] forHTTPHeaderField:key];\n}\n\n// Add the cookies to the request manager\nNSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:fullUrl]];\nNSDictionary *cookieHeaders = [NSHTTPCookie requestHeaderFieldsWithCookies:cookies];\nfor (NSString *key in cookieHeaders) {\n    [manager.requestSerializer setValue:cookieHeaders[key] forHTTPHeaderField:key];\n}\n\n// Send the request\nNSString *method = @\"");
	    __append(escapeFn(method));
	    __append("\";\nif ([method isEqualToString:@\"GET\"]) {\n    [manager GET:fullUrl parameters:parameters headers:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else if ([method isEqualToString:@\"POST\"]) {\n    [manager POST:fullUrl parameters:parameters headers:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else if ([method isEqualToString:@\"PUT\"]) {\n    [manager PUT:fullUrl parameters:parameters headers:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else if ([method isEqualToString:@\"DELETE\"]) {\n    [manager DELETE:fullUrl parameters:parameters headers:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else {\n    // Handle unsupported methods\n}\n");
	    return __output;
	  },
	  "lua/httpclient": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this29 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nlocal http_client = require(\"httpclient\")\n\n-- Extract parameters from the options object\nlocal url = '");
	    __append(escapeFn(url));
	    __append("'\nlocal method = '");
	    __append(escapeFn(method));
	    __append("'\nlocal mimeType = '");
	    __append(escapeFn(mimeType));
	    __append("'\nlocal headers = {\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this29);
	      __append("\n    ['");
	      __append(escapeFn(header.name));
	      __append("'] = '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\nlocal postData = {\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this29);
	      __append("\n    ['");
	      __append(escapeFn(param.name));
	      __append("'] = '");
	      __append(escapeFn(param.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\nlocal cookies = {\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this29);
	      __append("\n    ['");
	      __append(escapeFn(cookie.name));
	      __append("'] = '");
	      __append(escapeFn(cookie.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\n\n-- Construct the request table\nlocal request = {\n    url = url,\n    method = method,\n    headers = headers,\n}\nif method == \"POST\" then\n    request.data = {\n    ");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this29);
	      __append("\n        ['");
	      __append(escapeFn(param.name));
	      __append("'] = '");
	      __append(escapeFn(param.value));
	      __append("',\n    ");
	    }.bind(this));
	    __append("\n    }\nend\n\n-- Add cookies to the request headers\nlocal cookieHeader = \"\"\nfor cookie, value in pairs(cookies) do\n    cookieHeader = cookieHeader .. cookie .. \"=\" .. value .. \"; \"\nend\nif cookieHeader ~= \"\" then\n    request.headers['Cookie'] = string.sub(cookieHeader, 1, -3)\nend\n\n-- Send the request\nlocal response = http_client.send(request)\n\n-- Print the response\nprint(response.body)\n");
	    return __output;
	  },
	  "lua/http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this30 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nlocal http = require(\"socket.http\")\nlocal ltn12 = require(\"ltn12\")\n\n-- Extract parameters from the options object\nlocal url = '");
	    __append(escapeFn(url));
	    __append("'\nlocal method = '");
	    __append(escapeFn(method));
	    __append("'\nlocal mimeType = '");
	    __append(escapeFn(mimeType));
	    __append("'\nlocal headers = {\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this30);
	      __append("\n    ['");
	      __append(escapeFn(header.name));
	      __append("'] = '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\nlocal postData = {\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this30);
	      __append("\n    ['");
	      __append(escapeFn(param.name));
	      __append("'] = '");
	      __append(escapeFn(param.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\nlocal cookies = {\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this30);
	      __append("\n    ['");
	      __append(escapeFn(cookie.name));
	      __append("'] = '");
	      __append(escapeFn(cookie.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\n\n-- Construct the request table\nlocal request = {\n    url = url,\n    method = method,\n    headers = headers,\n    source = nil,\n    sink = ltn12.sink.table(),\n}\nif method == \"POST\" then\n    request.source = ltn12.source.string(\n        '");
	    __append(escapeFn(postData.map(function (param) {
	      _newArrowCheck(this, _this30);
	      return param.name + '=' + encodeURIComponent(param.value);
	    }.bind(this)).join('&')));
	    __append("'\n    )\nend\n\n-- Add cookies to the request headers\nlocal cookieHeader = \"\"\nfor cookie, value in pairs(cookies) do\n    cookieHeader = cookieHeader .. cookie .. \"=\" .. value .. \"; \"\nend\nif cookieHeader ~= \"\" then\n    request.headers['Cookie'] = string.sub(cookieHeader, 1, -3)\nend\n\n-- Send the request\nlocal response = \"\"\nlocal result, code, response_headers, status = http.request(request)\nif result then\n    response = table.concat(request.sink)\nend\n\n-- Print the response\nprint(response)\n");
	    return __output;
	  },
	  "lua/curl": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this31 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nlocal curl = require(\"cURL\")\n\n-- Extract parameters from the options object\nlocal url = '");
	    __append(escapeFn(url));
	    __append("'\nlocal method = '");
	    __append(escapeFn(method));
	    __append("'\nlocal mimeType = '");
	    __append(escapeFn(mimeType));
	    __append("'\nlocal headers = {\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this31);
	      __append("\n    ['");
	      __append(escapeFn(header.name));
	      __append("'] = '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\nlocal postData = {\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this31);
	      __append("\n    ['");
	      __append(escapeFn(param.name));
	      __append("'] = '");
	      __append(escapeFn(param.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\nlocal cookies = {\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this31);
	      __append("\n    ['");
	      __append(escapeFn(cookie.name));
	      __append("'] = '");
	      __append(escapeFn(cookie.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n}\n\n-- Construct the request command\nlocal command = \"curl -X \" .. method .. \" '\" .. url .. \"'\"\nif mimeType ~= '' then\n    command = command .. \" -H 'Content-Type: \" .. mimeType .. \"'\"\nend\nfor header, value in pairs(headers) do\n    command = command .. \" -H '\" .. header .. \": \" .. value .. \"'\"\nend\nfor cookie, value in pairs(cookies) do\n    command = command .. \" --cookie '\" .. cookie .. \"=\" .. value .. \"'\"\nend\nif method == \"POST\" then\n    command = command .. \" --data '\"\n    for key, value in pairs(postData) do\n        command = command .. key .. \"=\" .. value .. \"&\"\n    end\n    command = string.sub(command, 1, -2) .. \"'\"\nend\n\n-- Execute the request command\nlocal easy = curl.easy()\neasy:setopt(curl.OPT_URL, url)\neasy:setopt(curl.OPT_CUSTOMREQUEST, method)\neasy:setopt(curl.OPT_HEADER, true)\neasy:setopt(curl.OPT_VERBOSE, true)\neasy:setopt(curl.OPT_POSTFIELDS, postData)\neasy:setopt(curl.OPT_COOKIE, cookies)\nlocal response_body = {}\neasy:setopt(curl.OPT_WRITEFUNCTION, function (data)\n    table.insert(response_body, data)\n    return #data\nend)\neasy:perform()\neasy:close()\n\n-- Print the response\nlocal response = table.concat(response_body)\nprint(response)\n");
	    return __output;
	  },
	  "kotlin/okhttp3": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this32 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport okhttp3.*\nimport java.io.IOException\n\nval client = OkHttpClient()\n\nval url = \"");
	    __append(escapeFn(url));
	    __append("\"\nval method = \"");
	    __append(escapeFn(method));
	    __append("\"\nval mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\"\n\nval body = ");
	    if (postData.length > 0) {
	      __append("\n  RequestBody.create(MediaType.parse(mimeType), \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this32);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("\")\n");
	    } else {
	      __append("\n  null\n");
	    }
	    __append("\n\nval request = Request.Builder()\n  .url(url)\n  .");
	    __append(escapeFn(method.toLowerCase()));
	    __append("(body)\n  ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this32);
	      __append("\n    .addHeader(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\")\n  ");
	    }.bind(this));
	    __append("\n  ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this32);
	      __append("\n    .addHeader(\"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\")\n  ");
	    }.bind(this));
	    __append("\n  .build()\n\nval response = client.newCall(request).execute()\n\nprintln(\"Response: \" + response.body()?.string())\n");
	    return __output;
	  },
	  "kotlin/java": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this33 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport java.net.HttpURLConnection\nimport java.net.URL\nimport java.net.URLEncoder\n\nval url = URL(\"");
	    __append(escapeFn(url));
	    __append("\")\nval connection = url.openConnection() as HttpURLConnection\nconnection.requestMethod = \"");
	    __append(escapeFn(method));
	    __append("\"\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this33);
	      __append("\nconnection.setRequestProperty(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\")\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this33);
	      __append("\nconnection.addRequestProperty(\"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\")\n");
	    }.bind(this));
	    __append("\n\n// Send the request\n");
	    if (postData.length > 0) {
	      if (method === 'POST') {
	        __append("\nval postData = \"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this33);
	          return param.name + '=' + URLEncoder.encode(param.value, 'UTF-8');
	        }.bind(this)).join('&')));
	        __append("\".toByteArray(Charsets.UTF_8)\nconnection.setRequestProperty(\"Content-Type\", \"");
	        __append(escapeFn(mimeType));
	        __append("\")\nconnection.setRequestProperty(\"Content-Length\", postData.size.toString())\nconnection.doOutput = true\nconnection.outputStream.write(postData)\n");
	      } else {
	        __append("\nprintln(\"Error: GET method does not support POST data.\")\n");
	      }
	    } else {
	      __append("\nconnection.connect()\n");
	    }
	    __append("\n\n// Handle the response\nif (connection.responseCode == HttpURLConnection.HTTP_OK) {\n  val response = connection.inputStream.bufferedReader().use { it.readText() }\n  println(\"Response: $response\")\n} else {\n  println(\"Error: ${connection.responseMessage}\")\n}\nconnection.disconnect()\n");
	    return __output;
	  },
	  "kotlin/fuel": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this34 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport com.github.kittinunf.fuel.*\nimport com.github.kittinunf.fuel.core.*\nimport com.github.kittinunf.result.*\n\nval fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\"\n\nval requestHeaders = listOf(\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this34);
	      __append("\n    \"");
	      __append(escapeFn(header.name));
	      __append("\" to \"");
	      __append(escapeFn(header.value));
	      __append("\",\n");
	    }.bind(this));
	    __append("\n)\n\nval requestCookies = listOf(\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this34);
	      __append("\n    \"");
	      __append(escapeFn(cookie.name));
	      __append("\" to \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n");
	    }.bind(this));
	    __append("\n)\n\nval parameters = listOf(\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this34);
	      __append("\n    \"");
	      __append(escapeFn(param.name));
	      __append("\" to \"");
	      __append(escapeFn(param.value));
	      __append("\",\n");
	    }.bind(this));
	    __append("\n)\n\nval request = Fuel.request(Method.");
	    __append(escapeFn(method));
	    __append(", fullUrl)\n    .header(requestHeaders)\n    .header(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\")\n    .header(\"Cookie\", requestCookies.joinToString(separator = \"; \") { \"${it.first}=${it.second}\" })\n\nif (parameters.isNotEmpty()) {\n    request.parameters(parameters)\n}\n\nrequest.responseString { _, _, result ->\n    when (result) {\n        is Result.Failure -> {\n            println(\"Error: ${result.getException().message}\")\n        }\n        is Result.Success -> {\n            val data = result.get()\n            println(\"Response: $data\")\n        }\n    }\n}\n\nLike\nDislik\n");
	    return __output;
	  },
	  "javascript/jquery": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this35 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nvar fullUrl = '");
	    __append(escapeFn(url));
	    __append("';\n\n// Set up the request configuration object\nvar config = {\nurl: fullUrl,\ntype: '");
	    __append(escapeFn(method));
	    __append("',\nheaders: {\n'Content-Type': '");
	    __append(escapeFn(mimeType));
	    __append("',\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this35);
	      __append("\n    '");
	      __append(escapeFn(header.name));
	      __append("': '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n},\ndata: ");
	    if (postData.length === 1 && postData[0].type === 'file') {
	      __append("\n    new FormData(document.getElementById('#file_upload_form'))\n");
	    } else if (postData.length > 0) {
	      __append("\n    '");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this35);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("'\n");
	    } else {
	      __append("\n    null\n");
	    }
	    __append("\n};\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this35);
	      __append("\n    document.cookie = '");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("';\n");
	    }.bind(this));
	    __append("\n\n// Send the request using jQuery\n$.ajax(config)\n    .done(function(data) {\n        console.log('Response:', data);\n    })\n    .fail(function(jqXHR, textStatus) {\n        console.error('Error:', textStatus);\n    });\n");
	    return __output;
	  },
	  "javascript/fetch": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this36 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    locals.baseUrl;
	      var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nvar fullUrl = '");
	    __append(escapeFn(url));
	    __append("';\n\n// Set up the request configuration object\nvar config = {\nmethod: '");
	    __append(escapeFn(method));
	    __append("',\nheaders: {\n'Content-Type': '");
	    __append(escapeFn(mimeType));
	    __append("',\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this36);
	      __append("\n    '");
	      __append(escapeFn(header.name));
	      __append("': '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n},\nbody: ");
	    if (postData.length === 1 && postData[0].type === 'file') {
	      __append("\n    new FormData(document.getElementById('#file_upload_form'))\n");
	    } else if (postData.length > 0) {
	      __append("\n    '");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this36);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("'\n");
	    } else {
	      __append("\n    null\n");
	    }
	    __append("\n};\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this36);
	      __append("\n    document.cookie = '");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("';\n");
	    }.bind(this));
	    __append("\n\n// Send the request using fetch\nfetch(fullUrl, config)\n.then(function(response) {\nif (!response.ok) {\nthrow new Error('HTTP error, status = ' + response.status);\n}\nreturn response.text();\n})\n.then(function(data) {\nconsole.log('Response:', data);\n})\n.catch(function(error) {\nconsole.error('Error:', error.message);\n});\n");
	    return __output;
	  },
	  "javascript/axios": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this37 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Import the Axios library\nimport axios from 'axios';\n\n// Construct the request URL\nvar fullUrl = '");
	    __append(escapeFn(url));
	    __append("';\n\n// Set up the request configuration object\nvar config = {\n    method: '");
	    __append(escapeFn(method));
	    __append("',\n    url: fullUrl,\n    headers: {\n        'Content-Type': '");
	    __append(escapeFn(mimeType));
	    __append("',\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this37);
	      __append("   '");
	      __append(escapeFn(header.name));
	      __append("': '");
	      __append(escapeFn(header.value));
	      __append("',");
	    }.bind(this));
	    __append("\n    },\n    data: ");
	    if (postData.length === 1 && postData[0].type === 'file') {
	      __append("\n        new FormData(document.getElementById('#file_upload_form'))\n    ");
	    } else if (postData.length > 0) {
	      __append("'");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this37);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	      __append("'\n    ");
	    } else {
	      __append(" ");
	    }
	    __append("\n};\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this37);
	      __append("document.cookie = '");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("';\n");
	    }.bind(this));
	    __append("\n// Send the request using Axios\naxios(config)\n    .then(function (response) {\n        console.log('Response:', response.data);\n    })\n    .catch(function (error) {\n        console.error('Error:', error);\n    });\n");
	    return __output;
	  },
	  "javascript/xmlhttprequest": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this38 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Create a new XMLHttpRequest object\nvar xhr = new XMLHttpRequest();\n\n// Construct the request URL\nvar fullUrl = '");
	    __append(escapeFn(url));
	    __append("';\n\n// Set up the request\nxhr.open('");
	    __append(escapeFn(method));
	    __append("', fullUrl, true);\nxhr.setRequestHeader('Content-Type', '");
	    __append(escapeFn(mimeType));
	    __append("');\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this38);
	      __append("\n    xhr.setRequestHeader('");
	      __append(escapeFn(header.name));
	      __append("', '");
	      __append(escapeFn(header.value));
	      __append("');\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this38);
	      __append("\n    document.cookie = '");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("';\n");
	    }.bind(this));
	    __append("\n\n// Send the request\n");
	    if (postData.length > 0) {
	      __append("\n    xhr.send(");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n        new FormData(document.getElementById('#file_upload_form'))");
	      } else {
	        __append("\n        '");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this38);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("'");
	      }
	      __append(");\n");
	    } else {
	      __append("\n    xhr.send();\n");
	    }
	    __append("\n\n// Handle the response\nxhr.onreadystatechange = function() {\n    if (this.readyState === 4 && this.status === 200) {\n        console.log('Response:', this.responseText);\n    }\n};\n\n// Handle errors\nxhr.onerror = function() {\n    console.error('Error:', xhr.statusText);\n};\n");
	    return __output;
	  },
	  "java/unirest": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this39 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport com.mashape.unirest.http.Unirest;\nimport com.mashape.unirest.http.exceptions.UnirestException;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Construct the request URL\n        String fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n        // Set up the request\n        com.mashape.unirest.http.HttpRequestWithBody request =\n            Unirest.");
	    __append(escapeFn(method.toLowerCase()));
	    __append("(fullUrl)\n                .header(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\");\n\n        // Add headers to the request\n        ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this39);
	      __append("\n        request.header(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Add cookies to the request\n        ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this39);
	      __append("\n        request.cookie(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Set up the request body\n        ");
	    if (postData.length > 0) {
	      __append("\n        ");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n        // Upload a file\n        request.field(\"");
	        __append(escapeFn(postData[0].name));
	        __append("\", new java.io.File(\"");
	        __append(escapeFn(postData[0].value));
	        __append("\"));\n        ");
	      } else {
	        __append("\n        // Send form data or raw data\n        ");
	        if (mimeType === 'application/x-www-form-urlencoded') {
	          __append("\n        request.field(\"");
	          __append(escapeFn(postData.map(function (param) {
	            _newArrowCheck(this, _this39);
	            return param.name;
	          }.bind(this)).join("\", \"")));
	          __append("\",\n            ");
	          __append(escapeFn(postData.map(function (param) {
	            _newArrowCheck(this, _this39);
	            return "encodeURIComponent(\"" + param.value + "\")";
	          }.bind(this)).join(", ")));
	          __append(");\n        ");
	        } else {
	          __append("\n        request.body(\"");
	          __append(escapeFn(postData.map(function (param) {
	            _newArrowCheck(this, _this39);
	            return param.value;
	          }.bind(this)).join("")));
	          __append("\");\n        ");
	        }
	        __append("\n        ");
	      }
	      __append("\n        ");
	    }
	    __append("\n\n        // Send the request\n        try {\n            com.mashape.unirest.http.HttpResponse<String> response = request.asString();\n            if (response.getStatus() == 200) {\n                String responseBody = response.getBody();\n                System.out.println(\"Response: \" + responseBody);\n            } else {\n                System.out.println(\"Error: \" + response.getStatusText());\n            }\n        } catch (UnirestException e) {\n            System.out.println(\"Exception: \" + e.getMessage());\n        }\n    }\n}\n");
	    return __output;
	  },
	  "java/okhttp": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this40 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport java.io.IOException;\nimport okhttp3.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        // Construct the request URL\n        String fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n        // Set up the request\n        OkHttpClient client = new OkHttpClient();\n        Request.Builder requestBuilder = new Request.Builder()\n            .url(fullUrl)\n            .method(\"");
	    __append(escapeFn(method));
	    __append("\", null)\n            .addHeader(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\");\n\n        // Add headers to the request\n        ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this40);
	      __append("\n        requestBuilder.addHeader(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Add cookies to the request\n        ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this40);
	      __append("\n        requestBuilder.addHeader(\"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Set up the request body\n        ");
	    if (postData.length > 0) {
	      __append("\n        FormBody.Builder formBodyBuilder = new FormBody.Builder();\n        ");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this40);
	        __append("\n        formBodyBuilder.add(\"");
	        __append(escapeFn(param.name));
	        __append("\", \"");
	        __append(escapeFn(param.value));
	        __append("\");\n        ");
	      }.bind(this));
	      __append("\n        RequestBody requestBody = formBodyBuilder.build();\n        requestBuilder.post(requestBody);\n        ");
	    }
	    __append("\n\n        // Send the request\n        Request request = requestBuilder.build();\n        Response response = client.newCall(request).execute();\n\n        // Handle the response\n        if (response.isSuccessful()) {\n            String responseBody = response.body().string();\n            System.out.println(\"Response: \" + responseBody);\n        } else {\n            System.out.println(\"Error: \" + response.code() + \" \" + response.message());\n        }\n\n        // Clean up\n        response.close();\n    }\n}\n");
	    return __output;
	  },
	  "java/nethttp": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this41 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport java.io.IOException;\nimport java.io.InputStream;\nimport java.io.InputStreamReader;\nimport java.io.BufferedReader;\nimport java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.net.URLEncoder;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        // Construct the request URL\n        String fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n        // Set up the request\n        URL url = new URL(fullUrl);\n        HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n        connection.setRequestMethod(\"");
	    __append(escapeFn(method));
	    __append("\");\n        connection.setRequestProperty(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\");\n\n        // Add headers to the request\n        ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this41);
	      __append("\n        connection.setRequestProperty(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Add cookies to the request\n        ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this41);
	      __append("\n        connection.setRequestProperty(\"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Set up the request body\n        ");
	    if (postData.length > 0) {
	      __append("\n        connection.setDoOutput(true);\n        String requestBody = \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this41);
	        return param.name + '=' + URLEncoder.encode(param.value, "UTF-8");
	      }.bind(this)).join('&')));
	      __append("\";\n        connection.getOutputStream().write(requestBody.getBytes(\"UTF-8\"));\n        ");
	    }
	    __append("\n\n        // Send the request\n        connection.connect();\n\n        // Handle the response\n        int responseCode = connection.getResponseCode();\n        if (responseCode == 200) {\n            InputStream inputStream = connection.getInputStream();\n            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));\n\n            StringBuilder responseBody = new StringBuilder();\n            String line;\n\n            while ((line = reader.readLine()) != null) {\n                responseBody.append(line);\n                responseBody.append(\"\\n\");\n            }\n\n            System.out.println(\"Response: \" + responseBody.toString());\n        } else {\n            System.out.println(\"Error: \" + responseCode + \" \" + connection.getResponseMessage());\n        }\n\n        // Clean up\n        connection.disconnect();\n    }\n}\n");
	    return __output;
	  },
	  "java/asynchttp": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this42 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport org.asynchttpclient.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        // Construct the request URL\n        String fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n        // Set up the request\n        AsyncHttpClient client = Dsl.asyncHttpClient();\n        RequestBuilder requestBuilder = new RequestBuilder(\"");
	    __append(escapeFn(method));
	    __append("\")\n            .setUrl(fullUrl)\n            .addHeader(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\");\n\n        // Add headers to the request\n        ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this42);
	      __append("\n        requestBuilder.addHeader(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Add cookies to the request\n        ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this42);
	      __append("\n        requestBuilder.addCookie(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Set up the request body\n        ");
	    if (postData.length > 0) {
	      __append("\n        requestBuilder.setBody(\"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this42);
	        return param.name + '=' + Uri.EscapeDataString(param.value);
	      }.bind(this)).join('&')));
	      __append("\");\n        ");
	    }
	    __append("\n\n        // Send the request\n        ListenableFuture<Response> future = client.executeRequest(requestBuilder.build());\n\n        // Handle the response\n        Response response = future.get();\n        String responseBody = response.getResponseBody();\n        System.out.println(\"Response: \" + responseBody);\n\n        // Handle errors\n        if (response.getStatusCode() != 200) {\n            System.out.println(\"Error: \" + response.getStatusCode() + \" \" + response.getStatusText());\n        }\n\n        // Clean up\n        client.close();\n    }\n}\n");
	    return __output;
	  },
	  "http/rfc7230": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this43 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n// https://www.rfc-editor.org/rfc/rfc7230\n");
	    if (method === 'GET') {
	      __append("\n");
	      __append(escapeFn(method));
	      __append(" ");
	      __append(escapeFn(url));
	      __append(" HTTP/1.1\n");
	    } else {
	      __append("\n");
	      __append(escapeFn(method));
	      __append(" ");
	      __append(escapeFn(url));
	      __append(" HTTP/1.1\nContent-Type: ");
	      __append(escapeFn(mimeType));
	      __append("\n");
	    }
	    __append("\n\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this43);
	      __append("\n");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\n");
	    }.bind(this));
	    __append("\n\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this43);
	      __append("\nCookie: ");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\n");
	    }.bind(this));
	    __append("\n\n");
	    if (method === 'POST' && postData.length > 0) {
	      __append("\n    ");
	      if (mimeType === 'application/x-www-form-urlencoded') {
	        __append("\n");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this43);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\n    ");
	      } else {
	        __append("\n        ");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this43);
	          __append("\n");
	          __append(escapeFn(param.name));
	          __append(": ");
	          __append(escapeFn(param.value));
	          __append("\n        ");
	        }.bind(this));
	        __append("\n    ");
	      }
	      __append("\n");
	    }
	    __append("\n");
	    return __output;
	  },
	  "go/http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this44 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\npackage main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n    \"strings\"\n)\n\nfunc main() {\n// Construct the request URL\n    url := \"");
	    __append(escapeFn(url));
	    __append("\"\n\n    // Construct the request body\n    var body strings.Reader\n    ");
	    if (postData.length > 0) {
	      __append("\n        ");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n            // Construct the form data\n            file, header, err := r.FormFile(\"file\")\n            if err != nil {\n                fmt.Println(err)\n                return\n            }\n            defer file.Close()\n            formData := &bytes.Buffer{}\n            writer := multipart.NewWriter(formData)\n            part, err := writer.CreateFormFile(\"file\", header.Filename)\n            if err != nil {\n                fmt.Println(err)\n                return\n            }\n            io.Copy(part, file)\n            writer.Close()\n            body = *strings.NewReader(formData.String())\n        ");
	      } else {
	        __append("\n            bodyStr := \"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this44);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\"\n            body = *strings.NewReader(bodyStr)\n        ");
	      }
	      __append("\n    ");
	    }
	    __append("\n\n    // Create a new HTTP request\n    req, err := http.NewRequest(\"");
	    __append(escapeFn(method));
	    __append("\", url, &body)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n\n    // Add headers to the request\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this44);
	      __append("\n        req.Header.Set(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\")\n    ");
	    }.bind(this));
	    __append("\n\n    // Add cookies to the request\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this44);
	      __append("\n        req.AddCookie(&http.Cookie{Name: \"");
	      __append(escapeFn(cookie.name));
	      __append("\", Value: \"");
	      __append(escapeFn(cookie.value));
	      __append("\"})\n    ");
	    }.bind(this));
	    __append("\n\n    // Send the request and get the response\n    client := &http.Client{}\n    resp, err := client.Do(req)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    defer resp.Body.Close()\n\n    // Handle the response\n    fmt.Println(\"Response:\")\n    respBody, err := ioutil.ReadAll(resp.Body)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println(string(respBody))\n}\n\n");
	    return __output;
	  },
	  "go/fasthttp": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this45 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\npackage main\n\nimport (\n    \"fmt\"\n    \"mime/multipart\"\n    \"os\"\n    \"strings\"\n    \"github.com/valyala/fasthttp\"\n)\n\nfunc main() {\n    // Construct the request URL\n    url := \"");
	    __append(escapeFn(url));
	    __append("\"\n\n    // Construct the request body\n    var body *strings.Reader\n    ");
	    if (postData.length > 0) {
	      __append("\n        ");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n            // Construct the form data\n            file, err := os.Open(\"");
	        __append(escapeFn(postData[0].value));
	        __append("\")\n            if err != nil {\n                fmt.Println(err)\n                return\n            }\n            defer file.Close()\n            formData := &fasthttp.Args{}\n            writer := multipart.NewWriter(formData)\n            part, err := writer.CreateFormFile(\"file\", file.Name())\n            if err != nil {\n                fmt.Println(err)\n                return\n            }\n            io.Copy(part, file)\n            writer.Close()\n            body = strings.NewReader(formData.String())\n        ");
	      } else {
	        __append("\n            bodyStr := \"");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this45);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("\"\n            body = strings.NewReader(bodyStr)\n        ");
	      }
	      __append("\n    ");
	    }
	    __append("\n\n    // Create a new HTTP request\n    req := fasthttp.AcquireRequest()\n    defer fasthttp.ReleaseRequest(req)\n    req.Header.SetMethod(\"");
	    __append(escapeFn(method));
	    __append("\")\n    req.Header.SetContentType(\"");
	    __append(escapeFn(mimeType));
	    __append("\")\n    req.Header.Add(\"User-Agent\", \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\")\n\n    // Add headers to the request\n    ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this45);
	      __append("\n        req.Header.Add(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\")\n    ");
	    }.bind(this));
	    __append("\n\n    // Add cookies to the request\n    ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this45);
	      __append("\n        req.Header.AddCookie(&fasthttp.Cookie{Name: \"");
	      __append(escapeFn(cookie.name));
	      __append("\", Value: \"");
	      __append(escapeFn(cookie.value));
	      __append("\"})\n    ");
	    }.bind(this));
	    __append("\n\n    // Send the request\n    resp := fasthttp.AcquireResponse()\n    defer fasthttp.ReleaseResponse(resp)\n    if body != nil {\n        req.SetBodyReader(body)\n    }\n    req.URI().Update(url)\n    err := fasthttp.Do(req, resp)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n\n    // Handle the response\n    fmt.Printf(\"Response: %s\\n\", resp.Body())\n}\n\n\n");
	    return __output;
	  },
	  "dart/http_client": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this46 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport 'dart:convert';\nimport 'package:http/http.dart' as http;\n\n// Extract parameters from the options object\nfinal url = '");
	    __append(escapeFn(url));
	    __append("';\nfinal method = '");
	    __append(escapeFn(method));
	    __append("';\nfinal mimeType = '");
	    __append(escapeFn(mimeType));
	    __append("';\nfinal headers = {\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this46);
	      __append("\n  '");
	      __append(escapeFn(header.name));
	      __append("' : '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n};\nfinal cookies = {\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this46);
	      __append("\n  '");
	      __append(escapeFn(cookie.name));
	      __append("' : '");
	      __append(escapeFn(cookie.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n};\nfinal postData = {\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this46);
	      __append("\n  '");
	      __append(escapeFn(param.name));
	      __append("' : '");
	      __append(escapeFn(param.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n};\n\n// Construct the request\nfinal request = http.Request(method, Uri.parse(url));\nrequest.headers.addAll(headers);\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this46);
	      __append("\nrequest.cookies.add(Cookie('");
	      __append(escapeFn(cookie.name));
	      __append("', '");
	      __append(escapeFn(cookie.value));
	      __append("'));\n");
	    }.bind(this));
	    __append("\n\n// Add post data to the request\n");
	    if (postData.length > 0) {
	      __append("\nrequest.bodyFields = postData;\n");
	    }
	    __append("\n\n// Send the request\nfinal response = await http.Client().send(request);\nfinal responseBody = await response.stream.bytesToString();\n\n// Handle the response\nprint('Response: $responseBody');\n\n// Handle errors\nif (response.statusCode != 200) {\n  print('Error: ${response.reasonPhrase}');\n}\n");
	    return __output;
	  },
	  "dart/http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this47 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nimport 'package:http/http.dart' as http;\n\n// Extract parameters from the options object\nfinal url = '");
	    __append(escapeFn(url));
	    __append("';\nfinal method = '");
	    __append(escapeFn(method));
	    __append("';\nfinal mimeType = '");
	    __append(escapeFn(mimeType));
	    __append("';\nfinal headers = {\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this47);
	      __append("\n  '");
	      __append(escapeFn(header.name));
	      __append("' : '");
	      __append(escapeFn(header.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n};\nfinal cookies = {\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this47);
	      __append("\n  '");
	      __append(escapeFn(cookie.name));
	      __append("' : '");
	      __append(escapeFn(cookie.value));
	      __append("',\n");
	    }.bind(this));
	    __append("\n};\n\n// Construct the request\nfinal request = http.Request(method, Uri.parse(url));\nrequest.headers.addAll(headers);\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this47);
	      __append("\nrequest.cookies.add(Cookie('");
	      __append(escapeFn(cookie.name));
	      __append("', '");
	      __append(escapeFn(cookie.value));
	      __append("'));\n");
	    }.bind(this));
	    __append("\n\n// Add post data to the request\n");
	    if (postData.length > 0) {
	      __append("\n");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n// Handle file upload\nfinal fileUploadRequest = http.MultipartRequest(method, Uri.parse(url));\n");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this47);
	          __append("\nif ('");
	          __append(escapeFn(param.type));
	          __append("' === 'file') {\n  fileUploadRequest.files.add(await http.MultipartFile.fromPath('");
	          __append(escapeFn(param.name));
	          __append("', '");
	          __append(escapeFn(param.value));
	          __append("'));\n} else {\n  fileUploadRequest.fields['");
	          __append(escapeFn(param.name));
	          __append("'] = '");
	          __append(escapeFn(param.value));
	          __append("';\n}\n");
	        }.bind(this));
	        __append("\nfinal response = await fileUploadRequest.send();\nfinal responseBody = await response.stream.bytesToString();\n");
	      } else {
	        __append("\n// Handle regular post data\nfinal postDataString = '");
	        __append(escapeFn(postData.map(function (param) {
	          _newArrowCheck(this, _this47);
	          return param.name + '=' + encodeURIComponent(param.value);
	        }.bind(this)).join('&')));
	        __append("';\nrequest.body = postDataString;\nrequest.headers['Content-Type'] = mimeType;\nfinal response = await request.send();\nfinal responseBody = await response.stream.bytesToString();\n");
	      }
	      __append("\n");
	    } else {
	      __append("\n// Handle GET request\nfinal response = await request.send();\nfinal responseBody = await response.stream.bytesToString();\n");
	    }
	    __append("\n\n// Handle the response\nprint('Response: $responseBody');\n\n// Handle errors\nif (response.statusCode != 200) {\n  print('Error: ${response.reasonPhrase}');\n}\n");
	    return __output;
	  },
	  "dart/dio": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this48 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n#include <iostream>\n#include <string>\n#include <curl/curl.h>\n\n// Extract parameters from the options object\nconst auto url = \"");
	    __append(escapeFn(url));
	    __append("\";\nconst auto method = \"");
	    __append(escapeFn(method));
	    __append("\";\nconst auto mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\";\nconst auto headers = std::vector<std::string>{\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this48);
	      __append("\n  \"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\",\n");
	    }.bind(this));
	    __append("\n};\nconst auto cookies = std::vector<std::string>{\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this48);
	      __append("\n  \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\",\n");
	    }.bind(this));
	    __append("\n};\nconst auto postData = std::vector<std::string>{\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this48);
	      __append("\n  \"");
	      __append(escapeFn(param.name));
	      __append("=");
	      __append(escapeFn(param.value));
	      __append("\",\n");
	    }.bind(this));
	    __append("\n};\n\n// Set up the request\ncurl_global_init(CURL_GLOBAL_ALL);\nauto curl = curl_easy_init();\nif (curl) {\n  curl_easy_setopt(curl, CURLOPT_URL, url);\n  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method);\n  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n  curl_easy_setopt(curl, CURLOPT_COOKIE, cookies);\n  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData);\n\n  // Send the request\n  CURLcode res = curl_easy_perform(curl);\n  if (res != CURLE_OK) {\n    std::cerr << \"Error: \" << curl_easy_strerror(res) << std::endl;\n  }\n\n  // Handle the response\n  long responseCode;\n  curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);\n  std::cout << \"Response Code: \" << responseCode << std::endl;\n  curl_easy_cleanup(curl);\n}\ncurl_global_cleanup();\n");
	    return __output;
	  },
	  "csharp/restsharp": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this49 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nusing RestSharp;\n\nclass Program\n{\n    static void Main(string[] args)\n    {\n        // Construct the request URL\n        var fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n        // Set up the request\n        var client = new RestClient(fullUrl);\n        var request = new RestRequest(\"");
	    __append(escapeFn(method));
	    __append("\", Method.");
	    __append(escapeFn(method.toUpperCase()));
	    __append(");\n        request.AddHeader(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\");\n\n        // Add headers to the request\n        ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this49);
	      __append("\n        request.AddHeader(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Add cookies to the request\n        ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this49);
	      __append("\n        request.AddCookie(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Set up the request body\n        ");
	    if (postData.length > 0) {
	      __append("\n        request.AddParameter(\"text/plain\", \"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this49);
	        return param.name + '=' + Uri.EscapeDataString(param.value);
	      }.bind(this)).join('&')));
	      __append("\", ParameterType.RequestBody);\n        ");
	    }
	    __append("\n\n        // Send the request\n        var response = client.Execute(request);\n\n        // Handle the response\n        var responseBody = response.Content;\n        Console.WriteLine(\"Response: \" + responseBody);\n\n        // Handle errors\n        if (response.StatusCode != System.Net.HttpStatusCode.OK)\n        {\n            Console.WriteLine(\"Error: \" + response.StatusCode + \" \" + response.StatusDescription);\n        }\n    }\n}\n");
	    return __output;
	  },
	  "csharp/httpclient": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this50 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nusing System;\nusing System.Net.Http;\nusing System.Threading.Tasks;\n\nclass Program\n{\n    static async Task Main(string[] args)\n    {\n        // Construct the request URL\n        var fullUrl = \"");
	    __append(escapeFn(url));
	    __append("\";\n\n        // Set up the request\n        var client = new HttpClient();\n        var request = new HttpRequestMessage(new HttpMethod(\"");
	    __append(escapeFn(method));
	    __append("\"), fullUrl);\n        request.Headers.Add(\"Content-Type\", \"");
	    __append(escapeFn(mimeType));
	    __append("\");\n\n        // Add headers to the request\n        ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this50);
	      __append("\n        request.Headers.Add(\"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n        ");
	    }.bind(this));
	    __append("\n\n        // Add cookies to the request\n        ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this50);
	      __append("\n        var cookie = new System.Net.Cookie(\"");
	      __append(escapeFn(cookie.name));
	      __append("\", \"");
	      __append(escapeFn(cookie.value));
	      __append("\", \"/\", \"");
	      __append(escapeFn(url));
	      __append("\");\n        clientHandler.CookieContainer.Add(cookie);\n        ");
	    }.bind(this));
	    __append("\n\n        // Set up the request body\n        ");
	    if (postData.length > 0) {
	      __append("\n        var requestBody = new StringContent(\"");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this50);
	        return param.name + '=' + Uri.EscapeDataString(param.value);
	      }.bind(this)).join('&')));
	      __append("\");\n        request.Content = requestBody;\n        ");
	    }
	    __append("\n\n        // Send the request\n        var response = await client.SendAsync(request);\n\n        // Handle the response\n        var responseBody = await response.Content.ReadAsStringAsync();\n        Console.WriteLine(\"Response: \" + responseBody);\n\n        // Handle errors\n        if (!response.IsSuccessStatusCode)\n        {\n            Console.WriteLine(\"Error: \" + response.StatusCode + \" \" + response.ReasonPhrase);\n        }\n    }\n}\n");
	    return __output;
	  },
	  "cpp/iostream": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this51 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nstd::string fullUrl = \"");
	    __append(url);
	    __append("\";\n\n// Set up the request headers\nstd::map<std::string, std::string> headers;\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this51);
	      __append("\nheaders[\"");
	      __append(escapeFn(header.name));
	      __append("\"] = \"");
	      __append(escapeFn(header.value));
	      __append("\";\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this51);
	      __append("\nstd::string cookieString = \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\";\n// TODO: Add cookieString to the request\n");
	    }.bind(this));
	    __append("\n\n// Set up the request parameters\nstd::map<std::string, std::string> parameters;\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this51);
	      __append("\nparameters[\"");
	      __append(escapeFn(param.name));
	      __append("\"] = \"");
	      __append(escapeFn(param.value));
	      __append("\";\n");
	    }.bind(this));
	    __append("\n\n// Construct the request\nstd::string method = \"");
	    __append(escapeFn(method));
	    __append("\";\nstd::string postDataString;\nif (method == \"GET\") {\n    // TODO: Construct GET request with parameters\n} else if (method == \"POST\") {\n    for (auto const& [key, val] : parameters) {\n        postDataString += key + \"=\" + val + \"&\";\n    }\n    // TODO: Construct POST request with postDataString\n} else if (method == \"PUT\") {\n    // TODO: Construct PUT request with parameters\n} else if (method == \"DELETE\") {\n    // TODO: Construct DELETE request with parameters\n} else {\n    // Handle unsupported methods\n}\n\n// Print the request\nstd::cout << method << \" \" << fullUrl << \" HTTP/1.1\\r\\n\";\nfor (auto const& [key, val] : headers) {\n    std::cout << key << \": \" << val << \"\\r\\n\";\n}\n// TODO: Print cookies\nstd::cout << \"\\r\\n\";\nif (method == \"POST\" || method == \"PUT\" || method == \"DELETE\") {\n    std::cout << postDataString << \"\\r\\n\";\n}\n");
	    return __output;
	  },
	  "cpp/curl": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this52 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url;
	      locals.method;
	      locals.mimeType;
	      var headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nstd::string url = \"");
	    __append(url);
	    __append("\";\n\n// Set up the request headers\nstruct curl_slist* headers = NULL;\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this52);
	      __append("\nstd::string headerString = \"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\";\nheaders = curl_slist_append(headers, headerString.c_str());\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this52);
	      __append("\nstd::string cookieString = \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\";\n// TODO: Add cookieString to the request\n");
	    }.bind(this));
	    __append("\n\n// Set up the request parameters\nstd::string postData;\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this52);
	      __append("\nstd::string paramString = \"");
	      __append(escapeFn(param.name));
	      __append("=");
	      __append(escapeFn(param.value));
	      __append("\";\npostData += paramString + \"&\";\n");
	    }.bind(this));
	    __append("\n\n// Construct the request\nCURL* curl = curl_easy_init();\nif (curl) {\n    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());\n    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n    // TODO: Set up cookies with CURLOPT_COOKIE\n    if (postData.length() > 0) {\n        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData.c_str());\n    }\n\n    // Perform the request\n    CURLcode res = curl_easy_perform(curl);\n\n    // Handle errors\n    if (res != CURLE_OK) {\n        fprintf(stderr, \"curl_easy_perform() failed: %s\\n\", curl_easy_strerror(res));\n    }\n\n    // Cleanup\n    curl_slist_free_all(headers);\n    curl_easy_cleanup(curl);\n}\n");
	    return __output;
	  },
	  "cpp/arduino": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this53 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Construct the request URL\nString url = \"");
	    __append(url);
	    __append("\";\n\n// Set up the request headers\nString headers;\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this53);
	      __append("\nString headerString = \"");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("\";\nheaders += headerString + \"\\r\\n\";\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this53);
	      __append("\nString cookieString = \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\";\n// TODO: Add cookieString to the request\n");
	    }.bind(this));
	    __append("\n\n// Set up the request parameters\nString postData;\n");
	    postData.forEach(function (param) {
	      _newArrowCheck(this, _this53);
	      __append("\nString paramString = \"");
	      __append(escapeFn(param.name));
	      __append("=");
	      __append(escapeFn(param.value));
	      __append("\";\npostData += paramString + \"&\";\n");
	    }.bind(this));
	    __append("\n\n// Construct the request\nWiFiClient client;\nif (client.connect(url, 80)) {\n    // Send the request\n    client.print(\"");
	    __append(method);
	    __append(" \");\n    client.print(url);\n    client.println(\" HTTP/1.1\");\n    client.print(\"Host: \");\n    client.println(url);\n    client.print(\"Content-Type: \");\n    client.println(\"");
	    __append(mimeType);
	    __append("\");\n    client.print(\"Content-Length: \");\n    client.println(postData.length());\n    client.print(headers);\n    if (postData.length() > 0) {\n        client.print(\"\\r\\n\");\n        client.print(postData);\n    }\n    client.println();\n\n    // Read the response\n    while (client.connected()) {\n        String line = client.readStringUntil('\\n');\n        if (line == \"\\r\") {\n            break;\n        }\n    }\n    String response = client.readStringUntil('\\n');\n    Serial.println(\"Response: \" + response);\n}\n");
	    return __output;
	  },
	  "clojure/ring-client": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this54 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n(require '[ring.util.http-client :as client])\n\n(defn make-request []\n  (let [url \"");
	    __append(escapeFn(url));
	    __append("\"\n        headers {");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this54);
	      __append("\n                 \"");
	      __append(escapeFn(header.name));
	      __append("\" \"");
	      __append(escapeFn(header.value));
	      __append("\"");
	      if (!header.isLast) {
	        __append(",");
	      }
	    }.bind(this));
	    __append("}\n        cookies {");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this54);
	      __append("\n                 \"");
	      __append(escapeFn(cookie.name));
	      __append("\" \"");
	      __append(escapeFn(cookie.value));
	      __append("\"");
	      if (!cookie.isLast) {
	        __append(",");
	      }
	    }.bind(this));
	    __append("}\n        options {:headers headers\n                 :cookies cookies\n                 :content-type \"");
	    __append(escapeFn(mimeType));
	    __append("\"}\n        ");
	    if (method === 'GET') {
	      __append("\n        response (client/get url options)]\n        ");
	    } else {
	      __append("\n        post-data \"");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n                    {:multipart true\n                     :file \"");
	        __append(escapeFn(postData[0].value));
	        __append("\"}\n                    ");
	      } else {
	        __append("\n                    {");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this54);
	          __append("\n                     \"");
	          __append(escapeFn(param.name));
	          __append("\" \"");
	          __append(escapeFn(param.value));
	          __append("\"");
	          if (!param.isLast) {
	            __append(",");
	          }
	        }.bind(this));
	        __append("}\n                    ");
	      }
	      __append("\"\n        response (client/post url options post-data)]\n        ");
	    }
	    __append("\n    (println \"Response: \" (:body response))))\n\n(make-request)\n");
	    return __output;
	  },
	  "clojure/clj-http": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this55 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n(require '[clj-http.client :as client])\n\n(defn make-request []\n  (let [url \"");
	    __append(escapeFn(url));
	    __append("\"\n        headers {");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this55);
	      __append("\n                 \"");
	      __append(escapeFn(header.name));
	      __append("\" \"");
	      __append(escapeFn(header.value));
	      __append("\"");
	      if (!header.isLast) {
	        __append(",");
	      }
	    }.bind(this));
	    __append("}\n        cookies {");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this55);
	      __append("\n                 \"");
	      __append(escapeFn(cookie.name));
	      __append("\" \"");
	      __append(escapeFn(cookie.value));
	      __append("\"");
	      if (!cookie.isLast) {
	        __append(",");
	      }
	    }.bind(this));
	    __append("}\n        options {:headers headers\n                 :cookies cookies\n                 :content-type \"");
	    __append(escapeFn(mimeType));
	    __append("\"}\n        ");
	    if (method === 'GET') {
	      __append("\n        response (client/get url options)]\n        ");
	    } else {
	      __append("\n        post-data \"");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n                    {:multipart true\n                     :file \"");
	        __append(escapeFn(postData[0].value));
	        __append("\"}\n                    ");
	      } else {
	        __append("\n                    {");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this55);
	          __append("\n                     \"");
	          __append(escapeFn(param.name));
	          __append("\" \"");
	          __append(escapeFn(param.value));
	          __append("\"");
	          if (!param.isLast) {
	            __append(",");
	          }
	        }.bind(this));
	        __append("}\n                    ");
	      }
	      __append("\"\n        response (client/post url options post-data)]\n        ");
	    }
	    __append("\n    (println (str \"");
	    __append(escapeFn(method));
	    __append(" \" url \" HTTP/1.1\"))\n    (doseq [entry headers]\n      (println (str entry)))\n    (doseq [entry cookies]\n      (println (str \"Cookie: \" entry)))\n    (when (not (empty? post-data))\n      (println (str post-data)))\n    (println (str \"\\nResponse: \" (:body response)))))\n\n(make-request)\n");
	    return __output;
	  },
	  "c/ghttp": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this56 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method;
	      locals.mimeType;
	      var headers = locals.headers;
	      locals.postData;
	      var cookies = locals.cookies;
	    __append("\n\n// Set up the request\nstruct evhttp_uri *uri = evhttp_uri_parse(\"");
	    __append(escapeFn(url));
	    __append("\");\nstruct evhttp_connection *conn = evhttp_connection_base_new(NULL, NULL, evhttp_uri_get_host(uri), evhttp_uri_get_port(uri));\nstruct evhttp_request *req = evhttp_request_new(NULL, NULL);\n\n// Construct the request URL\nchar *path = evhttp_uri_get_path(uri);\nif(strlen(path) == 0) {\n    path = \"/\";\n}\n\n// Set request method and URL\nevhttp_request_set_chunked_cb(req, NULL);\nevhttp_request_set_error_cb(req, request_error_cb);\nevhttp_request_set_cb(req, request_done_cb);\nevhttp_request_set_header_cb(req, request_header_cb);\nevhttp_request_set_response_cb(req, request_response_cb);\nevhttp_request_set_uri(req, path);\nevhttp_request_set_type(req, EVHTTP_REQ_");
	    __append(escapeFn(method.toUpperCase()));
	    __append(");\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this56);
	      __append("\n    evhttp_add_header(req->output_headers, \"");
	      __append(escapeFn(header.name));
	      __append("\", \"");
	      __append(escapeFn(header.value));
	      __append("\");\n");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this56);
	      __append("\n    evhttp_add_header(req->output_headers, \"Cookie\", \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\");\n");
	    }.bind(this));
	    __append("\n\n// Send the request\nif (evhttp_make_request(conn, req, EVHTTP_REQ_");
	    __append(escapeFn(method.toUpperCase()));
	    __append(", path) == -1) {\n    fprintf(stderr, \"Failed to send HTTP request\\n\");\n    return 1;\n}\n\n// Handle errors\nvoid request_error_cb(struct evhttp_request *req, void *ctx) {\n    fprintf(stderr, \"Error: %d %s\\n\", evhttp_request_get_response_code(req), evhttp_request_get_response_code_line(req));\n}\n\n// Handle response headers\nvoid request_header_cb(struct evhttp_request *req, void *ctx) {\n    struct evkeyvalq *headers = evhttp_request_get_input_headers(req);\n    struct evkeyval *header;\n    TAILQ_FOREACH(header, headers, next) {\n        fprintf(stdout, \"%s: %s\\n\", header->key, header->value);\n    }\n}\n\n// Handle response body\nvoid request_response_cb(struct evhttp_request *req, void *ctx) {\n    struct evbuffer *buffer = evhttp_request_get_input_buffer(req);\n    fprintf(stdout, \"%.*s\\n\", (int)evbuffer_get_length(buffer), evbuffer_pullup(buffer, -1));\n}\n\n// Handle completion of the request\nvoid request_done_cb(struct evhttp_request *req, void *ctx) {\n    event_base_loopbreak(base);\n}\n");
	    return __output;
	  },
	  "c/curl": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this57 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType;
	      locals.headers;
	      var postData = locals.postData;
	      locals.cookies;
	    __append("\n\n\n#include <stdio.h>\n#include <stdlib.h>\n#include <curl/curl.h>\n\nint main(void) {\n    CURL *curl;\n    CURLcode res;\n    struct curl_slist *headers = NULL;\n    char *url = \"");
	    __append(escapeFn(url));
	    __append("\";\n    char *method = \"");
	    __append(escapeFn(method));
	    __append("\";\n    char *mimeType = \"");
	    __append(escapeFn(mimeType));
	    __append("\";\n    char *postData = \"");
	    if (postData.length > 0) {
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this57);
	        return param.name + '=' + encodeURIComponent(param.value);
	      }.bind(this)).join('&')));
	    }
	    __append("\";\n\n    curl = curl_easy_init();\n    if (curl) {\n        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method);\n        curl_easy_setopt(curl, CURLOPT_URL, url);\n\n        if (*mimeType) {\n            char *contentType = malloc(strlen(\"Content-Type: \") + strlen(mimeType) + 1);\n            sprintf(contentType, \"Content-Type: %s\", mimeType);\n            headers = curl_slist_append(headers, contentType);\n            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n        }\n\n        if (*postData) {\n            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData);\n        }\n\n        res = curl_easy_perform(curl);\n\n        if (res != CURLE_OK) {\n            fprintf(stderr, \"curl_easy_perform() failed: %s\\n\", curl_easy_strerror(res));\n        }\n\n        curl_easy_cleanup(curl);\n    }\n\n    return 0;\n}\n");
	    return __output;
	  },
	  "brainfuck/brainfuck": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this58 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\n// Create a new brainfuck program\n++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.\n\n// Construct the request URL\n,[<]>[.>],");
	    url.split('').forEach(function (_char) {
	      _newArrowCheck(this, _this58);
	      __append("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>++++++[<.+>-]<<[->+>+<<]>>[->+<]>[<.<+>-]<,");
	    }.bind(this));
	    __append("++++++++[->+++++<]>.\n\n// Set up the request\n,[<]>[.>],");
	    method.split('').forEach(function (_char2) {
	      _newArrowCheck(this, _this58);
	      __append("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>++++++[<.+>-]<<[->+>+<<]>>[->+<]>[<.<+>-]<,");
	    }.bind(this));
	    __append("++++++++[->+++++<]>.\n\n// Add headers to the request\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this58);
	      __append("\n    ,[<]>[.>],'");
	      __append(escapeFn(header.name));
	      __append(": ");
	      __append(escapeFn(header.value));
	      __append("',");
	    }.bind(this));
	    __append("\n\n// Add cookies to the request\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this58);
	      __append("\n    ,[<]>[.>],'Set-Cookie: ");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("',");
	    }.bind(this));
	    __append("\n\n// Send the request\n");
	    if (postData.length > 0) {
	      __append("\n    ,[<]>[.>],'");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("multipart/form-data");
	      } else {
	        __append(escapeFn(mimeType));
	      }
	      __append("',<\n\n    ");
	      if (postData.length === 1 && postData[0].type === 'file') {
	        __append("\n        ,[<]>[.>],'");
	        __append(escapeFn(postData[0].name));
	        __append("=',<,[>]<[.>],<,[<]>[.>],<,[>]<[<]>[-]>[-]<<[->+>+<<]>>[->+<]>[<.<+>-]<,");
	      } else {
	        __append("\n        ");
	        postData.forEach(function (param) {
	          _newArrowCheck(this, _this58);
	          __append("\n            ,[<]>[.>],'");
	          __append(escapeFn(param.name));
	          __append("=',<,[>]<[.>],'");
	          __append(escapeFn(param.value));
	          __append("',");
	        }.bind(this));
	        __append("\n        ,");
	      }
	      __append("\n\n    ,[<]>[.>],'',<]\n");
	    }
	    __append("\n// Handle the response\n,[<]>[.>],'Response:',<[<]>[.>],[<]>[-]>[-]<<[->+>+<<]>>[->+<]>[<.<+>-],<\n\n// Handle errors\n,[<]>[.>],'Error:',<[<]>[.>],'Oops! Brainfuck couldn't handle this request. Maybe try Python next time?',");
	    if (postData.length === 1 && postData[0].type === 'file') {
	      __append(" Remember, uploading files in Brainfuck is like trying to fit a square peg in a round hole.");
	    }
	    __append("\n");
	    return __output;
	  },
	  "r/rcurl": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this59 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nlibrary(RCurl)\n\nurl <- \"");
	    __append(escapeFn(url));
	    __append("\"\nmethod <- \"");
	    __append(escapeFn(method));
	    __append("\"\nmimeType <- \"");
	    __append(escapeFn(mimeType));
	    __append("\"\n\nheaders <- list(\n  ");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this59);
	      __append("\n    \"");
	      __append(escapeFn(header.name));
	      __append("\" = \"");
	      __append(escapeFn(header.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n)\n\ncookies <- list(\n  ");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this59);
	      __append("\n    \"");
	      __append(escapeFn(cookie.name));
	      __append("\" = \"");
	      __append(escapeFn(cookie.value));
	      __append("\",\n  ");
	    }.bind(this));
	    __append("\n)\n\n");
	    if (method === 'GET') {
	      __append("\n  req <- getURL(url, httpheader = headers, cookie = cookies)\n");
	    } else {
	      __append("\n  body <- list(\n    ");
	      postData.forEach(function (param) {
	        _newArrowCheck(this, _this59);
	        __append("\n      \"");
	        __append(escapeFn(param.name));
	        __append("\" = \"");
	        __append(escapeFn(param.value));
	        __append("\",\n    ");
	      }.bind(this));
	      __append("\n  )\n\n  req <- postForm(url, .params = body, httpheader = headers, cookie = cookies)\n");
	    }
	    __append("\n\ncat(\"Response: \", \"\\n\")\ncat(req, \"\\n\")\n");
	    return __output;
	  },
	  "r/httr": function anonymous(locals, escapeFn, include, rethrow) {

	    var _this60 = this;
	    escapeFn = escapeFn || function (markup) {
	      return markup == undefined ? '' : String(markup).replace(_MATCH_HTML, encode_char);
	    };
	    var _ENCODE_HTML_RULES = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': "&#34;",
	        "'": "&#39;"
	      },
	      _MATCH_HTML = /[&<>'"]/g;
	    function encode_char(c) {
	      return _ENCODE_HTML_RULES[c] || c;
	    }
	    var __output = "";
	    function __append(s) {
	      if (s !== undefined && s !== null) __output += s;
	    }
	    // Extract parameters from the options object
	    var url = locals.url,
	      method = locals.method,
	      mimeType = locals.mimeType,
	      headers = locals.headers,
	      postData = locals.postData,
	      cookies = locals.cookies;
	    __append("\n\nlibrary(httr)\n\nurl <- \"");
	    __append(escapeFn(url));
	    __append("\"\n\nreq <- VERB(\"");
	    __append(escapeFn(method));
	    __append("\", url)\n\n");
	    headers.forEach(function (header) {
	      _newArrowCheck(this, _this60);
	      __append("\nreq <- add_headers(\"");
	      __append(escapeFn(header.name));
	      __append("\" = \"");
	      __append(escapeFn(header.value));
	      __append("\", req)\n");
	    }.bind(this));
	    __append("\n\n");
	    cookies.forEach(function (cookie) {
	      _newArrowCheck(this, _this60);
	      __append("\nreq <- add_headers(\"Cookie\" = \"");
	      __append(escapeFn(cookie.name));
	      __append("=");
	      __append(escapeFn(cookie.value));
	      __append("\", req)\n");
	    }.bind(this));
	    __append("\n\n");
	    if (postData.length > 0) {
	      __append("\nbody <- list(");
	      __append(escapeFn(postData.map(function (param) {
	        _newArrowCheck(this, _this60);
	        return "\"".concat(param.name, "\" = \"").concat(param.value, "\"");
	      }.bind(this)).join(', ')));
	      __append(")\nreq <- content(req, as.formula(paste0(\"");
	      __append(escapeFn(mimeType));
	      __append("\", \"()\")), body)\n");
	    }
	    __append("\n\nres <- content(req)\n\ncat(\"Response: \")\nprint(toJSON(res, pretty = TRUE))\n");
	    return __output;
	  }
	};

	var RequestTemplater = /** @class */function () {
	  function RequestTemplater() {
	    this._baseUrl = '';
	    this._url = '';
	    this._method = 'GET';
	    this._params = [];
	    this._mimeType = 'application/x-www-form-urlencoded';
	    this._lang = 'javascript';
	    this._library = 'xmlhttprequest';
	  }
	  RequestTemplater.prototype.library = function (value) {
	    value = value.toLowerCase();
	    this._library = value;
	    return this;
	  };
	  RequestTemplater.prototype.lang = function (value) {
	    var _a;
	    value = value.toLowerCase();
	    var config = this.config()[value];
	    if (!config) {
	      throw new Error('bad lang: ' + value);
	    }
	    this._lang = value;
	    this._library = (_a = this.config()[value][0]) !== null && _a !== void 0 ? _a : null;
	    return this;
	  };
	  RequestTemplater.prototype.mimeType = function (value) {
	    this._mimeType = value;
	    return this;
	  };
	  RequestTemplater.prototype.params = function (value) {
	    this._params = value;
	    return this;
	  };
	  RequestTemplater.prototype.method = function (value) {
	    this._method = value;
	    return this;
	  };
	  RequestTemplater.prototype.url = function (value) {
	    value = value.startsWith('/') ? value.substring(1) : value;
	    this._url = value;
	    return this;
	  };
	  RequestTemplater.prototype.baseUrl = function (value) {
	    if (!value.endsWith('/')) {
	      value += '/';
	    }
	    this._baseUrl = value;
	    return this;
	  };
	  RequestTemplater.prototype.convertParams = function () {
	    var _a;
	    var baseUrl = this._baseUrl;
	    if (!baseUrl.endsWith('/')) {
	      baseUrl += '/';
	    }
	    var url = this._url;
	    if (url.startsWith('/')) {
	      url = url.substring(1);
	    }
	    this._params.filter(function (param) {
	      return param["in"] === 'path';
	    }).forEach(function (param) {
	      url = url.replace("{".concat(param.name, "}"), param.value);
	    });
	    var queryParams = this._params.filter(function (param) {
	      return param["in"] === 'query';
	    });
	    var queryStrings = queryParams.map(function (param) {
	      return "".concat(param.name, "=").concat(param.value);
	    });
	    var queryString = queryStrings.join('&');
	    if (queryString !== '') {
	      url += '?' + queryString;
	    }
	    url = baseUrl + url;
	    var host = (_a = baseUrl.match(/^https?:\/\/([^\/]+)/i)[1]) !== null && _a !== void 0 ? _a : '';
	    return {
	      method: this._method,
	      mimeType: this._mimeType,
	      url: url,
	      host: host,
	      headers: this._params.filter(function (param) {
	        return param["in"] === 'headers';
	      }),
	      postData: this._params.filter(function (param) {
	        return param["in"] === 'postData';
	      }),
	      cookies: this._params.filter(function (param) {
	        return param["in"] === 'cookie';
	      })
	    };
	  };
	  RequestTemplater.prototype.generate = function () {
	    var _a;
	    var template = (_a = templates[this._lang + '/' + this._library]) !== null && _a !== void 0 ? _a : null;
	    if (!template) {
	      throw new Error('bad library');
	    }
	    var params = this.convertParams();
	    return template(params);
	  };
	  RequestTemplater.prototype.config = function () {
	    return Object.keys(templates).reduce(function (acc, key) {
	      var _a = key.split('/'),
	        category = _a[0],
	        name = _a[1];
	      if (!acc[category]) {
	        acc[category] = [];
	      }
	      acc[category].push(name);
	      return acc;
	    }, {});
	  };
	  return RequestTemplater;
	}();

	return RequestTemplater;

}));
//# sourceMappingURL=request-templater.js.map

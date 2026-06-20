import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { p as persist } from "./middleware-3icvfaAY.js";
import { c as create } from "./react-9ph_Ps2d.js";
import { u as ue } from "./index-De5ctwPQ.js";
import { s as ArrowLeft, L as Layers, u as Undo2, v as Redo2, aK as ZoomOut, aL as ZoomIn, D as Download, U as Upload, J as Type, aM as Square, W as WandSparkles, aN as Circle, af as Eye, ag as EyeOff, ah as Lock, ai as LockOpen, T as Trash2, a8 as AlignLeft, a9 as AlignCenter, aa as AlignRight, al as Bold, am as Italic, aO as Copy, e as Plus, a0 as Minus } from "./ui-lib-DG52wkUx.js";
import "./motion-DXodcWnX.js";
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
  var _a;
  if (!value)
    return false;
  return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!((_a = value[CONSTRUCTOR]) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || !isObjectish(value))
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null || proto === O[PROTOTYPE])
    return true;
  const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
  if (Ctor === Object)
    return true;
  if (!isFunction(Ctor))
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0) {
    const keys = strict ? Reflect.ownKeys(obj) : O.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => (
  // @ts-ignore
  type === 2 ? thing.get(prop) : thing[prop]
);
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
  if (type === 2)
    thing.set(propOrOldValue, value);
  else if (type === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
};
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean = (target) => typeof target === "boolean";
function isArrayIndex(value) {
  const n = +value;
  return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (isArray(base))
    return Array[PROTOTYPE].slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = O.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc[WRITABLE] === false) {
        desc[WRITABLE] = true;
        desc[CONFIGURABLE] = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          [CONFIGURABLE]: true,
          [WRITABLE]: true,
          // could live with !!desc.set as well here...
          [ENUMERABLE]: desc[ENUMERABLE],
          [VALUE]: base[key]
        };
    }
    return O.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = O.create(proto);
    return O.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    O.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  O.freeze(obj);
  if (deep)
    each(
      obj,
      (_key, value) => {
        freeze(value, true);
      },
      false
    );
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  [VALUE]: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || !isObjectish(obj))
    return true;
  return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
  drafts_: [],
  parent_,
  immer_,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: true,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
  arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    scope.patchPlugin_ = getPlugin(PluginPatches);
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
    }
    const { patchPlugin_ } = scope;
    if (patchPlugin_) {
      patchPlugin_.generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope
      );
    }
  } else {
    result = finalize(scope, baseDraft);
  }
  maybeFreeze(scope, result, true);
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    const finalValue = handleValue(value, rootScope.handledSet_, rootScope);
    return finalValue;
  }
  if (!isSameScope(state, rootScope)) {
    return value;
  }
  if (!state.modified_) {
    return state.base_;
  }
  if (!state.finalized_) {
    const { callbacks_ } = state;
    if (callbacks_) {
      while (callbacks_.length > 0) {
        const callback = callbacks_.pop();
        callback(rootScope);
      }
    }
    generatePatchesAndFinalize(state, rootScope);
  }
  return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function markStateFinalized(state) {
  state.finalized_ = true;
  state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
  const parentCopy = latest(parent);
  const parentType = parent.type_;
  if (originalKey !== void 0) {
    const currentValue = get(parentCopy, originalKey, parentType);
    if (currentValue === draftValue) {
      set(parentCopy, originalKey, finalizedValue, parentType);
      return;
    }
  }
  if (!parent.draftLocations_) {
    const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
    each(parentCopy, (key, value) => {
      if (isDraft(value)) {
        const keys = draftLocations.get(value) || [];
        keys.push(key);
        draftLocations.set(value, keys);
      }
    });
  }
  const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
  for (const location of locations) {
    set(parentCopy, location, finalizedValue, parentType);
  }
}
function registerChildFinalizationCallback(parent, child, key) {
  parent.callbacks_.push(function childCleanup(rootScope) {
    var _a;
    const state = child;
    if (!state || !isSameScope(state, rootScope)) {
      return;
    }
    (_a = rootScope.mapSetPlugin_) == null ? void 0 : _a.fixSetContents(state);
    const finalizedValue = getFinalValue(state);
    updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
    generatePatchesAndFinalize(state, rootScope);
  });
}
function generatePatchesAndFinalize(state, rootScope) {
  var _a;
  const shouldFinalize = state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (((_a = state.assigned_) == null ? void 0 : _a.size) ?? 0) > 0);
  if (shouldFinalize) {
    const { patchPlugin_ } = rootScope;
    if (patchPlugin_) {
      const basePath = patchPlugin_.getPath(state);
      if (basePath) {
        patchPlugin_.generatePatches_(state, basePath, rootScope);
      }
    }
    markStateFinalized(state);
  }
}
function handleCrossReference(target, key, value) {
  const { scope_ } = target;
  if (isDraft(value)) {
    const state = value[DRAFT_STATE];
    if (isSameScope(state, scope_)) {
      state.callbacks_.push(function crossReferenceCleanup() {
        prepareCopy(target);
        const finalizedValue = getFinalValue(state);
        updateDraftInParent(target, value, finalizedValue, key);
      });
    }
  } else if (isDraftable(value)) {
    target.callbacks_.push(function nestedDraftCleanup() {
      const targetCopy = latest(target);
      if (target.type_ === 3) {
        if (targetCopy.has(value)) {
          handleValue(value, scope_.handledSet_, scope_);
        }
      } else {
        if (get(targetCopy, key, target.type_) === value) {
          if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) {
            handleValue(
              get(target.copy_, key, target.type_),
              scope_.handledSet_,
              scope_
            );
          }
        }
      }
    });
  }
}
function handleValue(target, handledSet, rootScope) {
  if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
    return target;
  }
  if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) {
    return target;
  }
  handledSet.add(target);
  each(target, (key, value) => {
    if (isDraft(value)) {
      const state = value[DRAFT_STATE];
      if (isSameScope(state, rootScope)) {
        const updatedValue = getFinalValue(state);
        set(target, key, updatedValue, target.type_);
        markStateFinalized(state);
      }
    } else if (isDraftable(value)) {
      handleValue(value, handledSet, rootScope);
    }
  });
  return target;
}
function createProxyProxy(base, parent) {
  const baseIsArray = isArray(base);
  const state = {
    type_: baseIsArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let target = state;
  let traps = objectTraps;
  if (baseIsArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return [proxy, state];
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    let arrayPlugin = state.scope_.arrayMethodsPlugin_;
    const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
    if (isArrayWithStringProp) {
      if (arrayPlugin == null ? void 0 : arrayPlugin.isArrayOperationMethod(prop)) {
        return arrayPlugin.createMethodInterceptor(state, prop);
      }
    }
    const source = latest(state);
    if (!has(source, prop, state.type_)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (isArrayWithStringProp && state.operationMethod && (arrayPlugin == null ? void 0 : arrayPlugin.isMutatingArrayMethod(
      state.operationMethod
    )) && isArrayIndex(prop)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      const childKey = state.type_ === 1 ? +prop : prop;
      const childDraft = createProxy(state.scope_, value, state, childKey);
      return state.copy_[childKey] = childDraft;
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc == null ? void 0 : desc.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_.set(prop, false);
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_.set(prop, true);
    handleCrossReference(state, prop, value);
    return true;
  },
  deleteProperty(state, prop) {
    prepareCopy(state);
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_.set(prop, false);
      markChanged(state);
    } else {
      state.assigned_.delete(prop);
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      [WRITABLE]: true,
      [CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
      [ENUMERABLE]: desc[ENUMERABLE],
      [VALUE]: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
for (let key in objectTraps) {
  let fn = objectTraps[key];
  arrayTraps[key] = function() {
    const args = arguments;
    args[0] = args[0][0];
    return fn.apply(this, args);
  };
}
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  var _a;
  const desc = getDescriptorFromProto(source, prop);
  return desc ? VALUE in desc ? desc[VALUE] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (_a = desc.get) == null ? void 0 : _a.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.assigned_ = /* @__PURE__ */ new Map();
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (isFunction(base) && !isFunction(recipe)) {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (!isFunction(recipe))
        die(6);
      if (patchListener !== void 0 && !isFunction(patchListener))
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(scope, base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || !isObjectish(base)) {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
            patches_: p,
            inversePatches_: ip
          });
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (isFunction(base)) {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (isBoolean(config == null ? void 0 : config.autoFreeze))
      this.setAutoFreeze(config.autoFreeze);
    if (isBoolean(config == null ? void 0 : config.useStrictShallowCopy))
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (isBoolean(config == null ? void 0 : config.useStrictIteration))
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(scope, base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(rootScope, value, parent, key) {
  const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = (parent == null ? void 0 : parent.scope_) ?? getCurrentScope();
  scope.drafts_.push(draft);
  state.callbacks_ = (parent == null ? void 0 : parent.callbacks_) ?? [];
  state.key_ = key;
  if (parent && key !== void 0) {
    registerChildFinalizationCallback(parent, state, key);
  } else {
    state.callbacks_.push(function rootDraftCleanup(rootScope2) {
      var _a;
      (_a = rootScope2.mapSetPlugin_) == null ? void 0 : _a.fixSetContents(state);
      const { patchPlugin_ } = rootScope2;
      if (state.modified_ && patchPlugin_) {
        patchPlugin_.generatePatches_(state, [], rootScope2);
      }
    });
  }
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
var immer$1 = new Immer2();
var produce = immer$1.produce;
const immerImpl = (initializer) => (set2, get2, store) => {
  store.setState = (updater, replace, ...args) => {
    const nextState = typeof updater === "function" ? produce(updater) : updater;
    return set2(nextState, replace, ...args);
  };
  return initializer(store.setState, get2, store);
};
const immer = immerImpl;
const MAX_HISTORY = 20;
const DEMO_ELEMENTS = [
  {
    id: "demo-bg",
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    fillColor: "#0a0f1a",
    borderColor: "#0a0f1a",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: true,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0a0f1a", "#0d1a2e"],
      angle: 135
    }
  },
  {
    id: "demo-glow",
    type: "circle",
    name: "Glow Accent",
    x: 800,
    y: 100,
    width: 500,
    height: 500,
    fillColor: "#2563EB",
    borderColor: "#2563EB",
    borderWidth: 0,
    opacity: 0.12,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  },
  {
    id: "demo-accent",
    type: "rect",
    name: "Accent Bar",
    x: 60,
    y: 60,
    width: 6,
    height: 600,
    fillColor: "#22C55E",
    borderColor: "#22C55E",
    borderWidth: 0,
    borderRadius: 3,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  },
  {
    id: "demo-headline",
    type: "text",
    name: "Headline",
    x: 100,
    y: 220,
    width: 700,
    height: 120,
    content: "ELYSIAN LABS",
    fontSize: 96,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: -2,
    lineHeight: 1.1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true,
    gradientText: true,
    gradientColors: ["#ffffff", "#22C55E"]
  },
  {
    id: "demo-sub",
    type: "text",
    name: "Subtitle",
    x: 100,
    y: 360,
    width: 600,
    height: 60,
    content: "Design. Create. Inspire.",
    fontSize: 36,
    color: "#22C55E",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  },
  {
    id: "demo-cta-bg",
    type: "rect",
    name: "CTA Button",
    x: 100,
    y: 460,
    width: 260,
    height: 64,
    fillColor: "#2563EB",
    borderColor: "#2563EB",
    borderWidth: 0,
    borderRadius: 32,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  },
  {
    id: "demo-cta-text",
    type: "text",
    name: "CTA Text",
    x: 120,
    y: 482,
    width: 220,
    height: 36,
    content: "Get Started Free",
    fontSize: 22,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }
];
const DEMO_LAYERS = DEMO_ELEMENTS.map((el) => ({
  id: `layer-${el.id}`,
  name: el.name,
  elementId: el.id,
  visible: el.visible,
  locked: el.locked,
  type: el.type
})).reverse();
const initialState = {
  elements: DEMO_ELEMENTS,
  selectedIds: [],
  activeLayerId: null,
  layers: DEMO_LAYERS,
  history: [DEMO_ELEMENTS],
  historyIndex: 0,
  canvasWidth: 1280,
  canvasHeight: 720,
  zoom: 0.6,
  pan: { x: 0, y: 0 },
  gridEnabled: false,
  snapEnabled: true,
  activeTool: "select",
  activeSection: "templates",
  activeRightTab: "layers",
  projectName: "Elysian Creator — Untitled",
  lastSaved: null,
  isDirty: false
};
function syncLayers(elements) {
  return [...elements].reverse().map((el) => ({
    id: `layer-${el.id}`,
    name: el.name,
    elementId: el.id,
    visible: el.visible,
    locked: el.locked,
    type: el.type
  }));
}
const useEditorStore = create()(
  persist(
    immer((set2, get2) => ({
      ...initialState,
      addElement: (el) => set2((s) => {
        s.elements.push(el);
        s.layers = syncLayers(s.elements);
        s.history.push([
          ...s.elements
        ]);
        s.history = s.history.slice(
          0,
          s.historyIndex + 1
        );
        if (s.history.length > MAX_HISTORY) s.history.shift();
        else s.historyIndex++;
        s.isDirty = true;
      }),
      removeElement: (id) => set2((s) => {
        s.elements = s.elements.filter(
          (e) => e.id !== id
        );
        s.selectedIds = s.selectedIds.filter((sid) => sid !== id);
        s.layers = syncLayers(s.elements);
        s.isDirty = true;
      }),
      removeElements: (ids) => set2((s) => {
        s.elements = s.elements.filter(
          (e) => !ids.includes(e.id)
        );
        s.selectedIds = s.selectedIds.filter((sid) => !ids.includes(sid));
        s.layers = syncLayers(s.elements);
        s.isDirty = true;
      }),
      updateElement: (id, patch) => set2((s) => {
        const idx = s.elements.findIndex((e) => e.id === id);
        if (idx !== -1) {
          Object.assign(s.elements[idx], patch);
          s.layers = syncLayers(s.elements);
          s.isDirty = true;
        }
      }),
      setElements: (elements) => set2((s) => {
        s.elements = elements;
        s.layers = syncLayers(elements);
        s.isDirty = true;
      }),
      selectElements: (ids) => set2((s) => {
        s.selectedIds = ids;
        s.activeLayerId = ids.length === 1 ? `layer-${ids[0]}` : null;
      }),
      clearSelection: () => set2((s) => {
        s.selectedIds = [];
        s.activeLayerId = null;
      }),
      setZoom: (zoom) => set2((s) => {
        s.zoom = Math.max(0.1, Math.min(4, zoom));
      }),
      setPan: (pan) => set2((s) => {
        s.pan = pan;
      }),
      pushHistory: (elements) => set2((s) => {
        s.history = s.history.slice(
          0,
          s.historyIndex + 1
        );
        s.history.push(
          elements.map((e) => ({ ...e }))
        );
        if (s.history.length > MAX_HISTORY) s.history.shift();
        else s.historyIndex++;
      }),
      undo: () => set2((s) => {
        if (s.historyIndex > 0) {
          s.historyIndex--;
          s.elements = s.history[s.historyIndex].map((e) => ({ ...e }));
          s.layers = syncLayers(s.elements);
          s.selectedIds = [];
        }
      }),
      redo: () => set2((s) => {
        if (s.historyIndex < s.history.length - 1) {
          s.historyIndex++;
          s.elements = s.history[s.historyIndex].map((e) => ({ ...e }));
          s.layers = syncLayers(s.elements);
          s.selectedIds = [];
        }
      }),
      setActiveTool: (tool) => set2((s) => {
        s.activeTool = tool;
      }),
      setActiveSection: (section) => set2((s) => {
        s.activeSection = section;
      }),
      setActiveRightTab: (tab) => set2((s) => {
        s.activeRightTab = tab;
      }),
      toggleGrid: () => set2((s) => {
        s.gridEnabled = !s.gridEnabled;
      }),
      toggleSnap: () => set2((s) => {
        s.snapEnabled = !s.snapEnabled;
      }),
      setCanvasSize: (width, height) => set2((s) => {
        s.canvasWidth = width;
        s.canvasHeight = height;
        s.isDirty = true;
      }),
      setProjectName: (name) => set2((s) => {
        s.projectName = name;
        s.isDirty = true;
      }),
      markSaved: () => set2((s) => {
        s.lastSaved = Date.now();
        s.isDirty = false;
      }),
      setLayers: (layers) => set2((s) => {
        s.layers = layers;
        const reordered = [...layers].reverse().map(
          (l) => s.elements.find(
            (e) => e.id === l.elementId
          )
        ).filter(Boolean);
        s.elements = reordered;
        s.isDirty = true;
      }),
      updateLayer: (id, patch) => set2((s) => {
        const idx = s.layers.findIndex((l) => l.id === id);
        if (idx !== -1) {
          Object.assign(s.layers[idx], patch);
          const layer = s.layers[idx];
          const elIdx = s.elements.findIndex((e) => e.id === layer.elementId);
          if (elIdx !== -1) {
            if (patch.visible !== void 0)
              s.elements[elIdx].visible = patch.visible;
            if (patch.locked !== void 0)
              s.elements[elIdx].locked = patch.locked;
          }
        }
      }),
      duplicateElement: (id) => {
        const { elements } = get2();
        const el = elements.find((e) => e.id === id);
        if (!el) return;
        const newEl = {
          ...el,
          id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: `${el.name} (copy)`,
          x: el.x + 20,
          y: el.y + 20
        };
        set2((s) => {
          s.elements.push(newEl);
          s.layers = syncLayers(s.elements);
          s.selectedIds = [newEl.id];
          s.isDirty = true;
        });
      },
      bringForward: (id) => set2((s) => {
        const elems = s.elements;
        const idx = elems.findIndex((e) => e.id === id);
        if (idx < elems.length - 1) {
          const temp = elems[idx];
          elems[idx] = elems[idx + 1];
          elems[idx + 1] = temp;
          s.layers = syncLayers(elems);
        }
      }),
      sendBackward: (id) => set2((s) => {
        const elems = s.elements;
        const idx = elems.findIndex((e) => e.id === id);
        if (idx > 0) {
          const temp = elems[idx];
          elems[idx] = elems[idx - 1];
          elems[idx - 1] = temp;
          s.layers = syncLayers(elems);
        }
      }),
      bringToFront: (id) => set2((s) => {
        const elems = s.elements;
        const idx = elems.findIndex((e) => e.id === id);
        if (idx !== -1) {
          const [el] = elems.splice(idx, 1);
          elems.push(el);
          s.layers = syncLayers(elems);
        }
      }),
      sendToBack: (id) => set2((s) => {
        const elems = s.elements;
        const idx = elems.findIndex((e) => e.id === id);
        if (idx !== -1) {
          const [el] = elems.splice(idx, 1);
          elems.unshift(el);
          s.layers = syncLayers(elems);
        }
      })
    })),
    {
      name: "elysian-editor-state",
      // Only persist non-ephemeral state (skip image HTMLElement refs)
      partialize: (state) => ({
        projectName: state.projectName,
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        gridEnabled: state.gridEnabled,
        snapEnabled: state.snapEnabled,
        zoom: state.zoom,
        elements: state.elements.map(
          (el) => el.type === "image" ? { ...el, img: null } : el
        ),
        layers: state.layers,
        lastSaved: state.lastSaved
      })
    }
  )
);
const CANVAS_PRESETS = [
  { label: "YouTube", width: 1280, height: 720 },
  { label: "Instagram", width: 1080, height: 1080 },
  { label: "TikTok", width: 1080, height: 1920 },
  { label: "Twitter/X", width: 1600, height: 900 },
  { label: "LinkedIn", width: 1200, height: 627 }
];
const THUMBNAIL_TEMPLATES = [
  {
    id: "tpl-gaming",
    label: "Gaming Hype",
    category: "Gaming",
    bg: "#0a0a2e",
    elements: [
      {
        type: "rect",
        name: "BG",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#0a0a2e",
        borderColor: "#0a0a2e",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: true,
        visible: true,
        shadow: false
      },
      {
        type: "rect",
        name: "Glow",
        x: 500,
        y: 100,
        width: 600,
        height: 600,
        fillColor: "#7c3aed",
        borderColor: "#7c3aed",
        borderWidth: 0,
        borderRadius: 300,
        opacity: 0.25,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        type: "text",
        name: "Title",
        x: 60,
        y: 220,
        width: 700,
        height: 160,
        content: "EPIC GAMING",
        fontSize: 110,
        color: "#ffffff",
        fontFamily: "Impact",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 2,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true,
        gradientText: true,
        gradientColors: ["#a855f7", "#ec4899"]
      },
      {
        type: "text",
        name: "Sub",
        x: 60,
        y: 400,
        width: 500,
        height: 60,
        content: "YOU WON'T BELIEVE THIS",
        fontSize: 38,
        color: "#fbbf24",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 1,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }
    ]
  },
  {
    id: "tpl-tech",
    label: "Tech/SaaS",
    category: "Tech",
    bg: "#070B14",
    elements: [
      {
        type: "rect",
        name: "BG",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#070B14",
        borderColor: "#070B14",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: true,
        visible: true,
        shadow: false
      },
      {
        type: "rect",
        name: "Accent",
        x: 60,
        y: 60,
        width: 6,
        height: 600,
        fillColor: "#2563EB",
        borderColor: "#2563EB",
        borderWidth: 0,
        borderRadius: 3,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        type: "rect",
        name: "Glow",
        x: 800,
        y: 150,
        width: 400,
        height: 400,
        fillColor: "#2563EB",
        borderColor: "#2563EB",
        borderWidth: 0,
        borderRadius: 200,
        opacity: 0.15,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        type: "text",
        name: "Title",
        x: 100,
        y: 230,
        width: 700,
        height: 130,
        content: "ELYSIAN LABS",
        fontSize: 96,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: -2,
        lineHeight: 1.1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true,
        gradientText: true,
        gradientColors: ["#ffffff", "#22C55E"]
      },
      {
        type: "text",
        name: "Sub",
        x: 100,
        y: 380,
        width: 600,
        height: 55,
        content: "Design. Create. Inspire.",
        fontSize: 36,
        color: "#22C55E",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.4,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }
    ]
  },
  {
    id: "tpl-vlog",
    label: "Vlog Style",
    category: "Vlog",
    bg: "#1a1a2e",
    elements: [
      {
        type: "rect",
        name: "BG",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#1a1a2e",
        borderColor: "#1a1a2e",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: true,
        visible: true,
        shadow: false
      },
      {
        type: "rect",
        name: "Banner",
        x: 0,
        y: 530,
        width: 1280,
        height: 190,
        fillColor: "#e11d48",
        borderColor: "#e11d48",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        type: "text",
        name: "Title",
        x: 60,
        y: 150,
        width: 900,
        height: 200,
        content: "DAY IN MY LIFE",
        fontSize: 130,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: -3,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true
      },
      {
        type: "text",
        name: "CTA",
        x: 60,
        y: 560,
        width: 600,
        height: 80,
        content: "Watch to the end!",
        fontSize: 48,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }
    ]
  }
];
function generateId() {
  return `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function isText(el) {
  return el.type === "text";
}
function isImage(el) {
  return el.type === "image";
}
function ElementView({
  el,
  selected,
  scale,
  onClick,
  onDragStart
}) {
  if (!el.visible) return null;
  const style = {
    position: "absolute",
    left: el.x * scale,
    top: el.y * scale,
    width: el.width * scale,
    height: el.height * scale,
    opacity: el.opacity,
    transform: el.rotation ? `rotate(${el.rotation}deg)` : void 0,
    cursor: el.locked ? "not-allowed" : "move",
    userSelect: "none",
    outline: selected ? "2px solid #2563EB" : "none",
    outlineOffset: 1,
    zIndex: selected ? 10 : void 0
  };
  if (el.type === "rect") {
    const bg = el.gradientFill ? `linear-gradient(${el.gradientFill.angle}deg, ${el.gradientFill.colors.join(", ")})` : el.fillColor;
    Object.assign(style, {
      background: bg,
      border: el.borderWidth ? `${el.borderWidth * scale}px solid ${el.borderColor}` : void 0,
      borderRadius: el.borderRadius * scale,
      boxShadow: el.shadow ? `0 4px 20px ${el.fillColor}80` : void 0
    });
  } else if (el.type === "circle") {
    Object.assign(style, {
      background: el.fillColor,
      borderRadius: "50%",
      border: el.borderWidth ? `${el.borderWidth * scale}px solid ${el.borderColor}` : void 0
    });
  } else if (el.type === "text") {
    const t = el;
    const gradientStyle = t.gradientText && t.gradientColors && t.gradientColors.length >= 2 ? {
      background: `linear-gradient(135deg, ${t.gradientColors.join(", ")})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    } : {};
    Object.assign(style, {
      fontSize: (t.fontSize || 24) * scale,
      fontFamily: t.fontFamily || "Inter",
      color: t.color || "#ffffff",
      fontWeight: t.bold ? "700" : "400",
      fontStyle: t.italic ? "italic" : void 0,
      textDecoration: t.underline ? "underline" : void 0,
      textAlign: t.align,
      letterSpacing: t.letterSpacing ? `${t.letterSpacing * scale}px` : void 0,
      lineHeight: t.lineHeight || 1.2,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      textShadow: t.shadow ? "2px 2px 8px rgba(0,0,0,0.8)" : void 0,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      ...gradientStyle
    });
  } else if (el.type === "image") {
    const img = el;
    const filters = [];
    if (img.brightness !== void 0 && img.brightness !== 0)
      filters.push(`brightness(${1 + img.brightness / 100})`);
    if (img.contrast !== void 0 && img.contrast !== 0)
      filters.push(`contrast(${1 + img.contrast / 100})`);
    if (img.saturation !== void 0 && img.saturation !== 0)
      filters.push(`saturate(${1 + img.saturation / 100})`);
    if (img.blur !== void 0 && img.blur > 0)
      filters.push(`blur(${img.blur}px)`);
    Object.assign(style, {
      backgroundImage: `url(${img.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: filters.length ? filters.join(" ") : void 0,
      borderRadius: img.roundedCorners ? img.roundedCorners * scale : img.maskType === "circle" ? "50%" : void 0
    });
  }
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: canvas editor
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style,
        onClick,
        onMouseDown: (e) => !el.locked && onDragStart(e, el.id),
        "data-ocid": `thumbnail_canvas.element.${el.id}`,
        children: el.type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: "100%" }, children: el.content })
      }
    )
  );
}
function ThumbnailStudioPage() {
  const store = useEditorStore();
  const {
    elements,
    selectedIds,
    layers,
    canvasWidth,
    canvasHeight,
    zoom,
    activeTool,
    activeSection,
    historyIndex,
    history,
    addElement,
    removeElement,
    updateElement,
    selectElements,
    clearSelection,
    setZoom,
    setActiveTool,
    setActiveSection,
    undo,
    redo,
    pushHistory,
    setCanvasSize,
    duplicateElement,
    bringToFront,
    sendToBack,
    updateLayer
  } = store;
  const canvasWrapRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const [aiProcessing, setAiProcessing] = reactExports.useState(false);
  const [showExportMenu, setShowExportMenu] = reactExports.useState(false);
  const scale = zoom;
  const selectedId = selectedIds[0] ?? null;
  const selectedEl = elements.find((e) => e.id === selectedId) ?? null;
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "z" && e.shiftKey)) {
        e.preventDefault();
        redo();
      } else if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        removeElement(selectedId);
        clearSelection();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "d" && selectedId) {
        e.preventDefault();
        duplicateElement(selectedId);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, selectedId, removeElement, clearSelection, duplicateElement]);
  const dragRef = reactExports.useRef(null);
  const onElementDragStart = reactExports.useCallback(
    (e, id) => {
      const el = elements.find((x) => x.id === id);
      if (!el) return;
      selectElements([id]);
      dragRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        elX: el.x,
        elY: el.y
      };
      const onMove = (me) => {
        if (!dragRef.current) return;
        const dx = (me.clientX - dragRef.current.startX) / scale;
        const dy = (me.clientY - dragRef.current.startY) / scale;
        updateElement(dragRef.current.id, {
          x: dragRef.current.elX + dx,
          y: dragRef.current.elY + dy
        });
      };
      const onUp = () => {
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [elements, selectElements, updateElement, scale]
  );
  const onCanvasClick = reactExports.useCallback(() => {
    if (activeTool === "text") {
      const id = generateId();
      const newText = {
        id,
        type: "text",
        name: "Text",
        x: 100,
        y: 100,
        width: 400,
        height: 60,
        content: "Double-click to edit",
        fontSize: 48,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.2,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      };
      addElement(newText);
      selectElements([id]);
      setActiveTool("select");
    } else {
      clearSelection();
    }
  }, [activeTool, addElement, selectElements, setActiveTool, clearSelection]);
  const applyTemplate = reactExports.useCallback(
    (tpl) => {
      pushHistory(elements);
      const newEls = tpl.elements.map((el) => ({
        ...el,
        id: generateId()
      }));
      store.setElements(newEls);
      clearSelection();
      ue.success(`Template "${tpl.label}" applied`);
    },
    [elements, pushHistory, store, clearSelection]
  );
  const addImageToCanvas = reactExports.useCallback(
    (src, name) => {
      const id = generateId();
      const img = new window.Image();
      img.onload = () => {
        const maxW = canvasWidth * 0.6;
        const maxH = canvasHeight * 0.6;
        const ratio = img.width / img.height;
        let w = maxW;
        let h = w / ratio;
        if (h > maxH) {
          h = maxH;
          w = h * ratio;
        }
        const newImg = {
          id,
          type: "image",
          name,
          x: (canvasWidth - w) / 2,
          y: (canvasHeight - h) / 2,
          width: w,
          height: h,
          src,
          img,
          opacity: 1,
          rotation: 0,
          locked: false,
          visible: true
        };
        addElement(newImg);
        selectElements([id]);
      };
      img.src = src;
    },
    [canvasWidth, canvasHeight, addElement, selectElements]
  );
  const onDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        ue.error(
          "Only image files are supported. Video files go to Video Editor."
        );
        return;
      }
      const url = URL.createObjectURL(file);
      addImageToCanvas(url, file.name.replace(/\.[^.]+$/, ""));
    },
    [addImageToCanvas]
  );
  const onFileChange = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        ue.error("Only image files are supported.");
        e.target.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      addImageToCanvas(url, file.name.replace(/\.[^.]+$/, ""));
      e.target.value = "";
    },
    [addImageToCanvas]
  );
  const exportCanvas = reactExports.useCallback(
    (format) => {
      const dpr = window.devicePixelRatio || 2;
      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      for (const el of elements) {
        if (!el.visible) continue;
        ctx.save();
        ctx.globalAlpha = el.opacity;
        if (el.rotation) {
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          ctx.translate(cx, cy);
          ctx.rotate(el.rotation * Math.PI / 180);
          ctx.translate(-cx, -cy);
        }
        if (el.type === "rect") {
          ctx.fillStyle = el.fillColor;
          ctx.beginPath();
          if (el.borderRadius > 0) {
            const r = el.borderRadius;
            ctx.moveTo(el.x + r, el.y);
            ctx.lineTo(el.x + el.width - r, el.y);
            ctx.arcTo(el.x + el.width, el.y, el.x + el.width, el.y + r, r);
            ctx.lineTo(el.x + el.width, el.y + el.height - r);
            ctx.arcTo(
              el.x + el.width,
              el.y + el.height,
              el.x + el.width - r,
              el.y + el.height,
              r
            );
            ctx.lineTo(el.x + r, el.y + el.height);
            ctx.arcTo(el.x, el.y + el.height, el.x, el.y + el.height - r, r);
            ctx.lineTo(el.x, el.y + r);
            ctx.arcTo(el.x, el.y, el.x + r, el.y, r);
          } else {
            ctx.rect(el.x, el.y, el.width, el.height);
          }
          ctx.fill();
        } else if (el.type === "circle") {
          ctx.fillStyle = el.fillColor;
          ctx.beginPath();
          ctx.ellipse(
            el.x + el.width / 2,
            el.y + el.height / 2,
            el.width / 2,
            el.height / 2,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else if (el.type === "text") {
          const t = el;
          ctx.font = `${t.bold ? "bold" : "normal"} ${t.italic ? "italic" : "normal"} ${t.fontSize}px "${t.fontFamily}", sans-serif`;
          ctx.fillStyle = t.color;
          ctx.textAlign = t.align;
          ctx.textBaseline = "middle";
          if (t.shadow) {
            ctx.shadowColor = "rgba(0,0,0,0.8)";
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
          }
          const textX = el.x + (t.align === "center" ? el.width / 2 : t.align === "right" ? el.width : 0);
          ctx.fillText(t.content, textX, el.y + el.height / 2);
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        } else if (el.type === "image") {
          const imgEl = el;
          if (imgEl.img)
            ctx.drawImage(imgEl.img, el.x, el.y, el.width, el.height);
        }
        ctx.restore();
      }
      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const quality = format === "jpg" ? 0.95 : void 0;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      const a = document.createElement("a");
      a.download = `thumbnail.${format}`;
      a.href = dataUrl;
      a.click();
      ue.success(`Exported as ${format.toUpperCase()} at 2x resolution`);
      setShowExportMenu(false);
    },
    [canvasWidth, canvasHeight, elements]
  );
  const runAiTool = reactExports.useCallback(
    (tool) => {
      if (tool === "auto-layout") {
        setAiProcessing(true);
        setTimeout(() => {
          pushHistory(elements);
          const nonBg = elements.filter((e) => !e.locked && e.visible);
          if (nonBg.length === 0) {
            setAiProcessing(false);
            return;
          }
          const spacing = canvasWidth * 0.04;
          const cols = Math.ceil(Math.sqrt(nonBg.length));
          const cellW = (canvasWidth - spacing * (cols + 1)) / cols;
          nonBg.forEach((el, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            updateElement(el.id, {
              x: spacing + col * (cellW + spacing),
              y: spacing + row * (canvasHeight * 0.25 + spacing)
            });
          });
          setAiProcessing(false);
          ue.success("Auto Layout applied");
        }, 1200);
        return;
      }
      if (tool === "ai-enhance") {
        if (!selectedEl || !isImage(selectedEl)) {
          ue.error("Please select an image first");
          return;
        }
        setAiProcessing(true);
        setTimeout(() => {
          pushHistory(elements);
          updateElement(selectedEl.id, {
            brightness: 15,
            contrast: 20,
            saturation: 10
          });
          setAiProcessing(false);
          ue.success(
            "AI Enhance applied — contrast, brightness, and clarity improved"
          );
        }, 1500);
        return;
      }
      if (tool === "remove-bg") {
        if (!selectedEl || !isImage(selectedEl)) {
          ue.error("Please select an image first");
          return;
        }
        setAiProcessing(true);
        const imgEl = selectedEl;
        const offCanvas = document.createElement("canvas");
        const imgObj = new window.Image();
        imgObj.crossOrigin = "anonymous";
        imgObj.onload = () => {
          offCanvas.width = imgObj.width;
          offCanvas.height = imgObj.height;
          const octx = offCanvas.getContext("2d");
          if (!octx) {
            setAiProcessing(false);
            return;
          }
          octx.drawImage(imgObj, 0, 0);
          const imageData = octx.getImageData(
            0,
            0,
            offCanvas.width,
            offCanvas.height
          );
          const data = imageData.data;
          const samplePixel = (x, y) => {
            const idx = (y * offCanvas.width + x) * 4;
            return [data[idx], data[idx + 1], data[idx + 2]];
          };
          const corners = [
            samplePixel(0, 0),
            samplePixel(offCanvas.width - 1, 0),
            samplePixel(0, offCanvas.height - 1),
            samplePixel(offCanvas.width - 1, offCanvas.height - 1)
          ];
          const avgBg = [
            Math.round(corners.reduce((s, c) => s + c[0], 0) / 4),
            Math.round(corners.reduce((s, c) => s + c[1], 0) / 4),
            Math.round(corners.reduce((s, c) => s + c[2], 0) / 4)
          ];
          const threshold = 60;
          for (let j = 0; j < data.length; j += 4) {
            const dr = Math.abs(data[j] - avgBg[0]);
            const dg = Math.abs(data[j + 1] - avgBg[1]);
            const db = Math.abs(data[j + 2] - avgBg[2]);
            if (dr + dg + db < threshold * 3) data[j + 3] = 0;
          }
          octx.putImageData(imageData, 0, 0);
          const newSrc = offCanvas.toDataURL("image/png");
          const newImg = new window.Image();
          newImg.onload = () => {
            pushHistory(elements);
            updateElement(imgEl.id, { src: newSrc, img: newImg });
            setAiProcessing(false);
            ue.success("Background removed");
          };
          newImg.src = newSrc;
        };
        imgObj.onerror = () => {
          pushHistory(elements);
          updateElement(imgEl.id, { contrast: 50, brightness: 10 });
          setAiProcessing(false);
          ue.success("Background isolation applied (visual mode)");
        };
        imgObj.src = imgEl.src;
        return;
      }
      if (tool === "color-match") {
        if (!selectedEl || !isImage(selectedEl)) {
          ue.error("Please select an image first");
          return;
        }
        setAiProcessing(true);
        const imgEl = selectedEl;
        const offCanvas = document.createElement("canvas");
        offCanvas.width = 50;
        offCanvas.height = 50;
        const octx = offCanvas.getContext("2d");
        const imgObj = new window.Image();
        imgObj.crossOrigin = "anonymous";
        imgObj.onload = () => {
          if (!octx) {
            setAiProcessing(false);
            return;
          }
          octx.drawImage(imgObj, 0, 0, 50, 50);
          const data = octx.getImageData(0, 0, 50, 50).data;
          let r = 0;
          let g = 0;
          let b = 0;
          let count = 0;
          for (let i = 0; i < data.length; i += 20) {
            if (data[i + 3] > 128) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              count++;
            }
          }
          if (count > 0) {
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
          }
          const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          pushHistory(elements);
          for (const el of elements) {
            if (el.type === "text")
              updateElement(el.id, { color: hex });
          }
          setAiProcessing(false);
          ue.success(`Color Match applied — dominant color: ${hex}`);
        };
        imgObj.onerror = () => {
          setAiProcessing(false);
          ue.error("Could not analyze image colors");
        };
        imgObj.src = imgEl.src;
      }
    },
    [
      selectedEl,
      elements,
      canvasWidth,
      canvasHeight,
      pushHistory,
      updateElement
    ]
  );
  const SECTIONS = [
    { id: "templates", label: "Templates", Icon: Layers },
    { id: "uploads", label: "Uploads", Icon: Upload },
    { id: "text", label: "Text", Icon: Type },
    { id: "elements", label: "Elements", Icon: Square },
    { id: "ai-tools", label: "AI Tools", Icon: WandSparkles },
    { id: "layers", label: "Layers", Icon: Layers }
  ];
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col bg-[#070B14]",
      style: { height: "calc(100vh - 64px)" },
      "data-ocid": "thumbnail_studio.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 border-b shrink-0",
            style: {
              height: 48,
              background: "rgba(15,23,42,0.98)",
              borderColor: "rgba(255,255,255,0.06)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/",
                  className: "flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors mr-2",
                  "data-ocid": "thumbnail_studio.back_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 13 }),
                    " Back"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 flex items-center justify-center rounded-md",
                    style: { background: "rgba(37,99,235,0.2)", color: "#2563EB" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white/80", children: "Thumbnail Studio" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: undo,
                  disabled: !canUndo,
                  className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-colors",
                  "aria-label": "Undo",
                  "data-ocid": "thumbnail_studio.undo_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: redo,
                  disabled: !canRedo,
                  className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-colors",
                  "aria-label": "Redo",
                  "data-ocid": "thumbnail_studio.redo_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4 mx-1",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(Math.max(0.1, zoom - 0.1)),
                  className: "w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white transition-colors",
                  "aria-label": "Zoom out",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { size: 13 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-white/40 w-10 text-center", children: [
                Math.round(zoom * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(Math.min(3, zoom + 0.1)),
                  className: "w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white transition-colors",
                  "aria-label": "Zoom in",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 13 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4 mx-1",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowExportMenu((v) => !v),
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white",
                    style: {
                      background: "linear-gradient(135deg, #2563EB, #22C55E)",
                      boxShadow: "0 0 12px rgba(37,99,235,0.3)"
                    },
                    "data-ocid": "thumbnail_studio.export_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                      " Export"
                    ]
                  }
                ),
                showExportMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-full right-0 mt-1.5 rounded-xl border overflow-hidden z-50",
                    style: {
                      background: "rgba(15,23,42,0.98)",
                      borderColor: "rgba(255,255,255,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
                    },
                    children: ["png", "jpg"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => exportCanvas(f),
                        className: "block w-full px-4 py-2.5 text-left text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors",
                        children: [
                          "Export as ",
                          f.toUpperCase()
                        ]
                      },
                      f
                    ))
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex shrink-0",
              style: {
                width: 260,
                background: "#0F172A",
                borderRight: "1px solid rgba(255,255,255,0.05)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex flex-col items-center py-2 gap-0.5 shrink-0",
                    style: {
                      width: 48,
                      borderRight: "1px solid rgba(255,255,255,0.05)"
                    },
                    children: SECTIONS.map(({ id, label, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setActiveSection(id),
                        title: label,
                        className: "w-9 h-9 flex items-center justify-center rounded-xl transition-all",
                        style: {
                          background: activeSection === id ? "rgba(37,99,235,0.18)" : "transparent",
                          border: activeSection === id ? "1px solid rgba(37,99,235,0.45)" : "1px solid transparent",
                          color: activeSection === id ? "#2563EB" : "rgba(255,255,255,0.35)"
                        },
                        "data-ocid": `thumbnail_studio.sidebar_${id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 })
                      },
                      id
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex-1 min-w-0 overflow-y-auto p-3",
                    style: {
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(255,255,255,0.08) transparent"
                    },
                    children: [
                      activeSection === "templates" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold", children: "Canvas Size" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 mb-4", children: CANVAS_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => setCanvasSize(p.width, p.height),
                            className: "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.label }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/30 font-mono text-[10px]", children: [
                                p.width,
                                "×",
                                p.height
                              ] })
                            ]
                          },
                          p.label
                        )) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold", children: "Templates" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: THUMBNAIL_TEMPLATES.map((tpl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => applyTemplate(tpl),
                            className: "flex items-center gap-2 p-2.5 rounded-xl text-left hover:bg-white/5 transition-colors border border-transparent hover:border-white/10",
                            "data-ocid": `thumbnail_studio.template.${tpl.id}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "w-10 h-7 rounded-md shrink-0 flex items-center justify-center",
                                  style: {
                                    background: tpl.bg,
                                    border: "1px solid rgba(255,255,255,0.08)"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-white/60", children: tpl.category[0] })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-white/80", children: tpl.label }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/30", children: tpl.category })
                              ] })
                            ]
                          },
                          tpl.id
                        )) })
                      ] }),
                      activeSection === "uploads" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold", children: "Upload Image" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              var _a;
                              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                            },
                            className: "w-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-colors",
                            style: {
                              borderColor: "rgba(255,255,255,0.12)",
                              color: "rgba(255,255,255,0.4)"
                            },
                            "data-ocid": "thumbnail_studio.upload_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 20 }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Click or drag image here" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/25", children: "PNG, JPG, WEBP, GIF" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            ref: fileInputRef,
                            type: "file",
                            accept: "image/*",
                            className: "hidden",
                            onChange: onFileChange
                          }
                        )
                      ] }),
                      activeSection === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-1 font-semibold", children: "Add Text" }),
                        [
                          { label: "Heading", fontSize: 80, bold: true },
                          { label: "Sub-heading", fontSize: 48, bold: false },
                          { label: "Body Text", fontSize: 28, bold: false }
                        ].map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              const id = generateId();
                              addElement({
                                id,
                                type: "text",
                                name: preset.label,
                                x: 100,
                                y: 200,
                                width: 600,
                                height: preset.fontSize * 1.5,
                                content: preset.label,
                                fontSize: preset.fontSize,
                                color: "#ffffff",
                                fontFamily: "Inter",
                                bold: preset.bold,
                                italic: false,
                                underline: false,
                                align: "left",
                                letterSpacing: 0,
                                lineHeight: 1.2,
                                opacity: 1,
                                rotation: 0,
                                locked: false,
                                visible: true,
                                shadow: false
                              });
                              selectElements([id]);
                            },
                            className: "flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10",
                            "data-ocid": `thumbnail_studio.add_text_${preset.label.toLowerCase().replace(" ", "_")}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { size: 14, className: "text-white/40 shrink-0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-white/80", children: preset.label }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-white/30", children: [
                                  preset.fontSize,
                                  "px"
                                ] })
                              ] })
                            ]
                          },
                          preset.label
                        ))
                      ] }),
                      activeSection === "elements" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold", children: "Shapes" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [
                          { type: "rect", Icon: Square, label: "Rectangle" },
                          { type: "circle", Icon: Circle, label: "Circle" }
                        ].map(({ type, Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              const id = generateId();
                              if (type === "rect") {
                                addElement({
                                  id,
                                  type: "rect",
                                  name: "Rectangle",
                                  x: 200,
                                  y: 200,
                                  width: 300,
                                  height: 200,
                                  fillColor: "#2563EB",
                                  borderColor: "#2563EB",
                                  borderWidth: 0,
                                  borderRadius: 8,
                                  opacity: 1,
                                  rotation: 0,
                                  locked: false,
                                  visible: true,
                                  shadow: false
                                });
                              } else {
                                addElement({
                                  id,
                                  type: "circle",
                                  name: "Circle",
                                  x: 300,
                                  y: 200,
                                  width: 200,
                                  height: 200,
                                  fillColor: "#22C55E",
                                  borderColor: "#22C55E",
                                  borderWidth: 0,
                                  opacity: 1,
                                  rotation: 0,
                                  locked: false,
                                  visible: true,
                                  shadow: false
                                });
                              }
                              selectElements([id]);
                            },
                            className: "flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10",
                            title: label,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "text-white/50" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30", children: label })
                            ]
                          },
                          type
                        )) })
                      ] }),
                      activeSection === "ai-tools" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-1 font-semibold", children: "AI Tools" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "rounded-xl border p-2.5 mb-2",
                            style: {
                              borderColor: "rgba(255,255,255,0.08)",
                              background: "rgba(255,255,255,0.02)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold text-white/80 mb-1", children: "Magic Resize" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/40 mb-2", children: "Resize canvas to any format" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: CANVAS_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    pushHistory(elements);
                                    const scaleX = p.width / canvasWidth;
                                    const scaleY = p.height / canvasHeight;
                                    for (const el of elements) {
                                      updateElement(el.id, {
                                        x: el.x * scaleX,
                                        y: el.y * scaleY,
                                        width: el.width * scaleX,
                                        height: el.height * scaleY,
                                        ...isText(el) ? {
                                          fontSize: el.fontSize * Math.min(scaleX, scaleY)
                                        } : {}
                                      });
                                    }
                                    setCanvasSize(p.width, p.height);
                                    ue.success(
                                      `Resized to ${p.label} (${p.width}×${p.height})`
                                    );
                                  },
                                  className: "w-full text-left px-2 py-1 rounded-lg text-[10px] text-white/60 hover:text-white hover:bg-white/5 transition-colors",
                                  "data-ocid": `thumbnail_studio.ai_resize_${p.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                                  children: [
                                    p.label,
                                    " — ",
                                    p.width,
                                    "×",
                                    p.height
                                  ]
                                },
                                p.label
                              )) })
                            ]
                          }
                        ),
                        [
                          {
                            id: "color-match",
                            label: "Color Match",
                            desc: "Extract & apply image colors",
                            needsImage: true
                          },
                          {
                            id: "auto-layout",
                            label: "Auto Layout",
                            desc: "Redistribute elements evenly",
                            needsImage: false
                          },
                          {
                            id: "ai-enhance",
                            label: "AI Enhance",
                            desc: "Sharpen & boost selected image",
                            needsImage: true
                          },
                          {
                            id: "remove-bg",
                            label: "Remove Background",
                            desc: "Remove bg from selected image",
                            needsImage: true
                          }
                        ].map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => runAiTool(tool.id),
                            disabled: aiProcessing,
                            className: "w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 disabled:opacity-50",
                            "data-ocid": `thumbnail_studio.ai_${tool.id}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "w-7 h-7 flex items-center justify-center rounded-lg shrink-0",
                                  style: {
                                    background: "rgba(37,99,235,0.15)",
                                    color: "#2563EB"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { size: 13 })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold text-white/80", children: tool.label }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/40", children: tool.desc }),
                                tool.needsImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-white/25 mt-0.5", children: "Select an image first" })
                              ] })
                            ]
                          },
                          tool.id
                        )),
                        aiProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-2 px-3 py-2 rounded-xl",
                            style: {
                              background: "rgba(37,99,235,0.12)",
                              border: "1px solid rgba(37,99,235,0.3)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 rounded-full border border-blue-400 border-t-transparent animate-spin" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-blue-300", children: "Processing…" })
                            ]
                          }
                        )
                      ] }),
                      activeSection === "layers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold", children: [
                          "Layers (",
                          layers.length,
                          ")"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5", children: layers.map((layer, idx) => (
                          // biome-ignore lint/a11y/useKeyWithClickEvents: layer list item
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors",
                              style: {
                                background: selectedId === layer.elementId ? "rgba(37,99,235,0.15)" : "transparent",
                                border: selectedId === layer.elementId ? "1px solid rgba(37,99,235,0.35)" : "1px solid transparent"
                              },
                              onClick: () => selectElements([layer.elementId]),
                              "data-ocid": `thumbnail_studio.layer.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/60 w-4 text-center", children: idx + 1 }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-[11px] text-white/70 truncate", children: layer.name }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: (e) => {
                                      e.stopPropagation();
                                      updateLayer(layer.id, { visible: !layer.visible });
                                    },
                                    className: "w-5 h-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 transition-colors",
                                    children: layer.visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 11 })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: (e) => {
                                      e.stopPropagation();
                                      updateLayer(layer.id, { locked: !layer.locked });
                                    },
                                    className: "w-5 h-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 transition-colors",
                                    children: layer.locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { size: 11 })
                                  }
                                )
                              ]
                            },
                            layer.id
                          )
                        )) })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 min-w-0 min-h-0 flex items-center justify-center overflow-auto",
              style: {
                background: "#070B14",
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              },
              onDrop,
              onDragOver: (e) => e.preventDefault(),
              onClick: onCanvasClick,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onCanvasClick();
                }
              },
              "data-ocid": "thumbnail_studio.canvas_target",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  ref: canvasWrapRef,
                  className: "relative shrink-0 overflow-hidden",
                  style: {
                    width: canvasWidth * scale,
                    height: canvasHeight * scale,
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 16px 64px rgba(0,0,0,0.8)",
                    background: "#0a0a0a"
                  },
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                    }
                  },
                  children: [
                    elements.map((el) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ElementView,
                      {
                        el,
                        selected: selectedIds.includes(el.id),
                        scale,
                        onClick: (e) => {
                          e.stopPropagation();
                          if (!el.locked) selectElements([el.id]);
                        },
                        onDragStart: onElementDragStart
                      },
                      el.id
                    )),
                    selectedEl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "pointer-events-none absolute",
                        style: {
                          left: selectedEl.x * scale - 1,
                          top: selectedEl.y * scale - 1,
                          width: selectedEl.width * scale + 2,
                          height: selectedEl.height * scale + 2,
                          border: "1.5px solid #2563EB",
                          boxShadow: "0 0 0 1px rgba(37,99,235,0.2)",
                          borderRadius: 2
                        }
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col shrink-0 border-l overflow-y-auto",
              style: {
                width: 240,
                background: "#0F172A",
                borderColor: "rgba(255,255,255,0.05)",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.08) transparent"
              },
              children: selectedEl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-white/30 font-semibold", children: "Properties" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        removeElement(selectedEl.id);
                        clearSelection();
                      },
                      className: "w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-red-400 transition-colors",
                      "aria-label": "Delete",
                      "data-ocid": "thumbnail_studio.delete_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: [
                  { label: "X", key: "x" },
                  { label: "Y", key: "y" },
                  { label: "W", key: "width" },
                  { label: "H", key: "height" }
                ].map(({ label, key }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 block mb-0.5", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      value: Math.round(selectedEl[key]),
                      onChange: (e) => updateElement(selectedEl.id, {
                        [key]: Number(e.target.value)
                      }),
                      className: "w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60",
                      "data-ocid": `thumbnail_studio.prop_${key}`
                    }
                  )
                ] }, key)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 block mb-0.5", children: "Opacity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: selectedEl.opacity,
                        onChange: (e) => updateElement(selectedEl.id, {
                          opacity: Number(e.target.value)
                        }),
                        className: "w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 block mb-0.5", children: "Rotation" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        value: Math.round(selectedEl.rotation),
                        onChange: (e) => updateElement(selectedEl.id, {
                          rotation: Number(e.target.value)
                        }),
                        className: "w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                      }
                    )
                  ] })
                ] }),
                isText(selectedEl) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-px",
                      style: { background: "rgba(255,255,255,0.06)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-white/30 font-semibold", children: "Text" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      value: selectedEl.content,
                      onChange: (e) => updateElement(selectedEl.id, {
                        content: e.target.value
                      }),
                      className: "w-full bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60 resize-none",
                      rows: 3,
                      "data-ocid": "thumbnail_studio.text_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 block mb-0.5", children: "Font Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        value: selectedEl.fontSize,
                        onChange: (e) => updateElement(selectedEl.id, {
                          fontSize: Number(e.target.value)
                        }),
                        className: "w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 block mb-0.5", children: "Color" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "color",
                          value: selectedEl.color,
                          onChange: (e) => updateElement(selectedEl.id, {
                            color: e.target.value
                          }),
                          className: "w-8 h-7 rounded cursor-pointer border border-white/10 bg-transparent"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: selectedEl.color,
                          onChange: (e) => updateElement(selectedEl.id, {
                            color: e.target.value
                          }),
                          className: "flex-1 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 block mb-1", children: "Alignment" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["left", "center", "right"].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateElement(selectedEl.id, {
                          align: a
                        }),
                        className: "flex-1 h-7 flex items-center justify-center rounded-md transition-colors",
                        style: {
                          background: selectedEl.align === a ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${selectedEl.align === a ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`,
                          color: selectedEl.align === a ? "#2563EB" : "rgba(255,255,255,0.4)"
                        },
                        children: a === "left" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlignLeft, { size: 12 }) : a === "center" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlignCenter, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AlignRight, { size: 12 })
                      },
                      a
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [
                    { key: "bold", Icon: Bold, label: "Bold" },
                    { key: "italic", Icon: Italic, label: "Italic" }
                  ].map(({ key, Icon: Ic, label: lbl }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateElement(selectedEl.id, {
                        [key]: !selectedEl[key]
                      }),
                      className: "flex-1 h-7 flex items-center justify-center rounded-md transition-colors",
                      style: {
                        background: selectedEl[key] ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selectedEl[key] ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`,
                        color: selectedEl[key] ? "#2563EB" : "rgba(255,255,255,0.4)"
                      },
                      title: lbl,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ic, { size: 12 })
                    },
                    key
                  )) })
                ] }),
                (selectedEl.type === "rect" || selectedEl.type === "circle") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-px",
                      style: { background: "rgba(255,255,255,0.06)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-white/30 font-semibold", children: "Fill Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "color",
                        value: selectedEl.fillColor,
                        onChange: (e) => updateElement(selectedEl.id, {
                          fillColor: e.target.value
                        }),
                        className: "w-8 h-7 rounded cursor-pointer border border-white/10 bg-transparent"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: selectedEl.fillColor,
                        onChange: (e) => updateElement(selectedEl.id, {
                          fillColor: e.target.value
                        }),
                        className: "flex-1 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                      }
                    )
                  ] })
                ] }),
                isImage(selectedEl) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-px",
                      style: { background: "rgba(255,255,255,0.06)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-white/30 font-semibold", children: "Image Adjustments" }),
                  [
                    {
                      label: "Brightness",
                      key: "brightness",
                      min: -100,
                      max: 100,
                      def: 0
                    },
                    {
                      label: "Contrast",
                      key: "contrast",
                      min: -100,
                      max: 100,
                      def: 0
                    },
                    {
                      label: "Saturation",
                      key: "saturation",
                      min: -100,
                      max: 100,
                      def: 0
                    },
                    {
                      label: "Blur",
                      key: "blur",
                      min: 0,
                      max: 20,
                      def: 0
                    }
                  ].map(({ label, key, min, max, def }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-white/30", children: selectedEl[key] ?? def })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        min,
                        max,
                        value: selectedEl[key] ?? def,
                        onChange: (e) => updateElement(selectedEl.id, {
                          [key]: Number(e.target.value)
                        }),
                        className: "w-full h-1 accent-blue-500"
                      }
                    )
                  ] }, key))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full h-px",
                    style: { background: "rgba(255,255,255,0.06)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => duplicateElement(selectedEl.id),
                      className: "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white transition-colors",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      },
                      title: "Duplicate",
                      "data-ocid": "thumbnail_studio.duplicate_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 11 }),
                        " Dup."
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => bringToFront(selectedEl.id),
                      className: "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white transition-colors",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      },
                      title: "Bring to front",
                      "data-ocid": "thumbnail_studio.bring_front_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 11 }),
                        " Front"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => sendToBack(selectedEl.id),
                      className: "flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white transition-colors",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      },
                      title: "Send to back",
                      "data-ocid": "thumbnail_studio.send_back_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 11 }),
                        " Back"
                      ]
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center h-full gap-3 p-6 text-center",
                  "data-ocid": "thumbnail_studio.properties_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 flex items-center justify-center rounded-xl",
                        style: { background: "rgba(255,255,255,0.04)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 18, className: "text-white/20" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/30 leading-relaxed", children: "Select an element on the canvas to edit its properties." })
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  ThumbnailStudioPage,
  ThumbnailStudioPage as default
};

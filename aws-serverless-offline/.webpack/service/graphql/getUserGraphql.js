/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../buffer-from/index.js":
/*!**********************************!*\
  !*** ../../buffer-from/index.js ***!
  \**********************************/
/***/ ((module) => {

/* eslint-disable node/no-deprecated-api */

var toString = Object.prototype.toString

var isModern = (
  typeof Buffer !== 'undefined' &&
  typeof Buffer.alloc === 'function' &&
  typeof Buffer.allocUnsafe === 'function' &&
  typeof Buffer.from === 'function'
)

function isArrayBuffer (input) {
  return toString.call(input).slice(8, -1) === 'ArrayBuffer'
}

function fromArrayBuffer (obj, byteOffset, length) {
  byteOffset >>>= 0

  var maxLength = obj.byteLength - byteOffset

  if (maxLength < 0) {
    throw new RangeError("'offset' is out of bounds")
  }

  if (length === undefined) {
    length = maxLength
  } else {
    length >>>= 0

    if (length > maxLength) {
      throw new RangeError("'length' is out of bounds")
    }
  }

  return isModern
    ? Buffer.from(obj.slice(byteOffset, byteOffset + length))
    : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)))
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  return isModern
    ? Buffer.from(string, encoding)
    : new Buffer(string, encoding)
}

function bufferFrom (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return isModern
    ? Buffer.from(value)
    : new Buffer(value)
}

module.exports = bufferFrom


/***/ }),

/***/ "../../graphql/error/GraphQLError.mjs":
/*!********************************************!*\
  !*** ../../graphql/error/GraphQLError.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GraphQLError": () => (/* binding */ GraphQLError),
/* harmony export */   "printError": () => (/* binding */ printError),
/* harmony export */   "formatError": () => (/* binding */ formatError)
/* harmony export */ });
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _language_location_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/location.mjs */ "../../graphql/language/location.mjs");
/* harmony import */ var _language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/printLocation.mjs */ "../../graphql/language/printLocation.mjs");




function toNormalizedArgs(args) {
  const firstArg = args[0];

  if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5],
    };
  }

  return firstArg;
}
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

class GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */

  /**
   * @deprecated Please use the `GraphQLErrorArgs` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;

    const { nodes, source, positions, path, originalError, extensions } =
      toNormalizedArgs(rawArgs);
    super(message);
    this.name = 'GraphQLError';
    this.path = path !== null && path !== void 0 ? path : undefined;
    this.originalError =
      originalError !== null && originalError !== void 0
        ? originalError
        : undefined; // Compute list of blame nodes.

    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined,
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0
        ? void 0
        : _this$nodes.map((node) => node.loc).filter((loc) => loc != null),
    ); // Compute locations in the source for the given nodes/positions.

    this.source =
      source !== null && source !== void 0
        ? source
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : (_nodeLocations$ = nodeLocations[0]) === null ||
          _nodeLocations$ === void 0
        ? void 0
        : _nodeLocations$.source;
    this.positions =
      positions !== null && positions !== void 0
        ? positions
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => loc.start);
    this.locations =
      positions && source
        ? positions.map((pos) => (0,_language_location_mjs__WEBPACK_IMPORTED_MODULE_0__.getLocation)(source, pos))
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => (0,_language_location_mjs__WEBPACK_IMPORTED_MODULE_0__.getLocation)(loc.source, loc.start));
    const originalExtensions = (0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_1__.isObjectLike)(
      originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions,
    )
      ? originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions
      : undefined;
    this.extensions =
      (_ref =
        extensions !== null && extensions !== void 0
          ? extensions
          : originalExtensions) !== null && _ref !== void 0
        ? _ref
        : Object.create(null); // Only properties prescribed by the spec should be enumerable.
    // Keep the rest as non-enumerable.

    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true,
      },
      name: {
        enumerable: false,
      },
      nodes: {
        enumerable: false,
      },
      source: {
        enumerable: false,
      },
      positions: {
        enumerable: false,
      },
      originalError: {
        enumerable: false,
      },
    }); // Include (non-enumerable) stack trace.

    /* c8 ignore start */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317

    if (
      originalError !== null &&
      originalError !== void 0 &&
      originalError.stack
    ) {
      Object.defineProperty(this, 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true,
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true,
      });
    }
    /* c8 ignore stop */
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLError';
  }

  toString() {
    let output = this.message;

    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += '\n\n' + (0,_language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.printLocation)(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += '\n\n' + (0,_language_printLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.printSourceLocation)(this.source, location);
      }
    }

    return output;
  }

  toJSON() {
    const formattedError = {
      message: this.message,
    };

    if (this.locations != null) {
      formattedError.locations = this.locations;
    }

    if (this.path != null) {
      formattedError.path = this.path;
    }

    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }

    return formattedError;
  }
}

function undefinedIfEmpty(array) {
  return array === undefined || array.length === 0 ? undefined : array;
}
/**
 * See: https://spec.graphql.org/draft/#sec-Errors
 */

/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 *
 * @deprecated Please use `error.toString` instead. Will be removed in v17
 */
function printError(error) {
  return error.toString();
}
/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 *
 * @deprecated Please use `error.toString` instead. Will be removed in v17
 */

function formatError(error) {
  return error.toJSON();
}


/***/ }),

/***/ "../../graphql/error/locatedError.mjs":
/*!********************************************!*\
  !*** ../../graphql/error/locatedError.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "locatedError": () => (/* binding */ locatedError)
/* harmony export */ });
/* harmony import */ var _jsutils_toError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/toError.mjs */ "../../graphql/jsutils/toError.mjs");
/* harmony import */ var _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Given an arbitrary value, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */

function locatedError(rawOriginalError, nodes, path) {
  var _nodes;

  const originalError = (0,_jsutils_toError_mjs__WEBPACK_IMPORTED_MODULE_0__.toError)(rawOriginalError); // Note: this uses a brand-check to support GraphQL errors originating from other contexts.

  if (isLocatedGraphQLError(originalError)) {
    return originalError;
  }

  return new _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
    originalError.message,
    (_nodes = originalError.nodes) !== null && _nodes !== void 0
      ? _nodes
      : nodes,
    originalError.source,
    originalError.positions,
    path,
    originalError,
  );
}

function isLocatedGraphQLError(error) {
  return Array.isArray(error.path);
}


/***/ }),

/***/ "../../graphql/error/syntaxError.mjs":
/*!*******************************************!*\
  !*** ../../graphql/error/syntaxError.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syntaxError": () => (/* binding */ syntaxError)
/* harmony export */ });
/* harmony import */ var _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new _GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(`Syntax Error: ${description}`, undefined, source, [
    position,
  ]);
}


/***/ }),

/***/ "../../graphql/execution/collectFields.mjs":
/*!*************************************************!*\
  !*** ../../graphql/execution/collectFields.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collectFields": () => (/* binding */ collectFields),
/* harmony export */   "collectSubfields": () => (/* binding */ collectSubfields)
/* harmony export */ });
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");
/* harmony import */ var _values_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./values.mjs */ "../../graphql/execution/values.mjs");





/**
 * Given a selectionSet, collects all of the fields and returns them.
 *
 * CollectFields requires the "runtime type" of an object. For a field that
 * returns an Interface or Union type, the "runtime type" will be the actual
 * object type returned by that field.
 *
 * @internal
 */

function collectFields(
  schema,
  fragments,
  variableValues,
  runtimeType,
  selectionSet,
) {
  const fields = new Map();
  collectFieldsImpl(
    schema,
    fragments,
    variableValues,
    runtimeType,
    selectionSet,
    fields,
    new Set(),
  );
  return fields;
}
/**
 * Given an array of field nodes, collects all of the subfields of the passed
 * in fields, and returns them at the end.
 *
 * CollectSubFields requires the "return type" of an object. For a field that
 * returns an Interface or Union type, the "return type" will be the actual
 * object type returned by that field.
 *
 * @internal
 */

function collectSubfields(
  schema,
  fragments,
  variableValues,
  returnType,
  fieldNodes,
) {
  const subFieldNodes = new Map();
  const visitedFragmentNames = new Set();

  for (const node of fieldNodes) {
    if (node.selectionSet) {
      collectFieldsImpl(
        schema,
        fragments,
        variableValues,
        returnType,
        node.selectionSet,
        subFieldNodes,
        visitedFragmentNames,
      );
    }
  }

  return subFieldNodes;
}

function collectFieldsImpl(
  schema,
  fragments,
  variableValues,
  runtimeType,
  selectionSet,
  fields,
  visitedFragmentNames,
) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FIELD: {
        if (!shouldIncludeNode(variableValues, selection)) {
          continue;
        }

        const name = getFieldEntryKey(selection);
        const fieldList = fields.get(name);

        if (fieldList !== undefined) {
          fieldList.push(selection);
        } else {
          fields.set(name, [selection]);
        }

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INLINE_FRAGMENT: {
        if (
          !shouldIncludeNode(variableValues, selection) ||
          !doesFragmentConditionMatch(schema, selection, runtimeType)
        ) {
          continue;
        }

        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          selection.selectionSet,
          fields,
          visitedFragmentNames,
        );
        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_SPREAD: {
        const fragName = selection.name.value;

        if (
          visitedFragmentNames.has(fragName) ||
          !shouldIncludeNode(variableValues, selection)
        ) {
          continue;
        }

        visitedFragmentNames.add(fragName);
        const fragment = fragments[fragName];

        if (
          !fragment ||
          !doesFragmentConditionMatch(schema, fragment, runtimeType)
        ) {
          continue;
        }

        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          fragment.selectionSet,
          fields,
          visitedFragmentNames,
        );
        break;
      }
    }
  }
}
/**
 * Determines if a field should be included based on the `@include` and `@skip`
 * directives, where `@skip` has higher precedence than `@include`.
 */

function shouldIncludeNode(variableValues, node) {
  const skip = (0,_values_mjs__WEBPACK_IMPORTED_MODULE_1__.getDirectiveValues)(_type_directives_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLSkipDirective, node, variableValues);

  if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
    return false;
  }

  const include = (0,_values_mjs__WEBPACK_IMPORTED_MODULE_1__.getDirectiveValues)(
    _type_directives_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLIncludeDirective,
    node,
    variableValues,
  );

  if (
    (include === null || include === void 0 ? void 0 : include.if) === false
  ) {
    return false;
  }

  return true;
}
/**
 * Determines if a fragment is applicable to the given type.
 */

function doesFragmentConditionMatch(schema, fragment, type) {
  const typeConditionNode = fragment.typeCondition;

  if (!typeConditionNode) {
    return true;
  }

  const conditionalType = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_3__.typeFromAST)(schema, typeConditionNode);

  if (conditionalType === type) {
    return true;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_4__.isAbstractType)(conditionalType)) {
    return schema.isSubType(conditionalType, type);
  }

  return false;
}
/**
 * Implements the logic to compute the key of a given field's entry
 */

function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}


/***/ }),

/***/ "../../graphql/execution/execute.mjs":
/*!*******************************************!*\
  !*** ../../graphql/execution/execute.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "execute": () => (/* binding */ execute),
/* harmony export */   "executeSync": () => (/* binding */ executeSync),
/* harmony export */   "assertValidExecutionArguments": () => (/* binding */ assertValidExecutionArguments),
/* harmony export */   "buildExecutionContext": () => (/* binding */ buildExecutionContext),
/* harmony export */   "buildResolveInfo": () => (/* binding */ buildResolveInfo),
/* harmony export */   "defaultTypeResolver": () => (/* binding */ defaultTypeResolver),
/* harmony export */   "defaultFieldResolver": () => (/* binding */ defaultFieldResolver),
/* harmony export */   "getFieldDef": () => (/* binding */ getFieldDef)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_isIterableObject_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../jsutils/isIterableObject.mjs */ "../../graphql/jsutils/isIterableObject.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/isPromise.mjs */ "../../graphql/jsutils/isPromise.mjs");
/* harmony import */ var _jsutils_memoize3_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/memoize3.mjs */ "../../graphql/jsutils/memoize3.mjs");
/* harmony import */ var _jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../jsutils/Path.mjs */ "../../graphql/jsutils/Path.mjs");
/* harmony import */ var _jsutils_promiseForObject_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../jsutils/promiseForObject.mjs */ "../../graphql/jsutils/promiseForObject.mjs");
/* harmony import */ var _jsutils_promiseReduce_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../jsutils/promiseReduce.mjs */ "../../graphql/jsutils/promiseReduce.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../error/locatedError.mjs */ "../../graphql/error/locatedError.mjs");
/* harmony import */ var _language_ast_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../language/ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_validate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/validate.mjs */ "../../graphql/type/validate.mjs");
/* harmony import */ var _collectFields_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collectFields.mjs */ "../../graphql/execution/collectFields.mjs");
/* harmony import */ var _values_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./values.mjs */ "../../graphql/execution/values.mjs");



















/**
 * A memoized collection of relevant subfields with regard to the return
 * type. Memoizing ensures the subfields are not repeatedly calculated, which
 * saves overhead when resolving lists of values.
 */

const collectSubfields = (0,_jsutils_memoize3_mjs__WEBPACK_IMPORTED_MODULE_0__.memoize3)((exeContext, returnType, fieldNodes) =>
  (0,_collectFields_mjs__WEBPACK_IMPORTED_MODULE_1__.collectSubfields)(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    returnType,
    fieldNodes,
  ),
);
/**
 * Terminology
 *
 * "Definitions" are the generic name for top-level statements in the document.
 * Examples of this include:
 * 1) Operations (such as a query)
 * 2) Fragments
 *
 * "Operations" are a generic name for requests in the document.
 * Examples of this include:
 * 1) query,
 * 2) mutation
 *
 * "Selections" are the definitions that can appear legally and at
 * single level of the query. These include:
 * 1) field references e.g `a`
 * 2) fragment "spreads" e.g. `...c`
 * 3) inline fragment "spreads" e.g. `...on Type { a }`
 */

/**
 * Data that must be available at all points during query execution.
 *
 * Namely, schema of the type system that is currently executing,
 * and the fragments defined in the query document
 */

/**
 * Implements the "Executing requests" section of the GraphQL specification.
 *
 * Returns either a synchronous ExecutionResult (if all encountered resolvers
 * are synchronous), or a Promise of an ExecutionResult that will eventually be
 * resolved and never rejected.
 *
 * If the arguments to this function do not result in a legal execution context,
 * a GraphQLError will be thrown immediately explaining the invalid input.
 */
function execute(args) {
  // Temporary for v15 to v16 migration. Remove in v17
  arguments.length < 2 ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      'graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.',
    );
  const { schema, document, variableValues, rootValue } = args; // If arguments are missing or incorrect, throw an error.

  assertValidExecutionArguments(schema, document, variableValues); // If a valid execution context cannot be created due to incorrect arguments,
  // a "Response" with only errors is returned.

  const exeContext = buildExecutionContext(args); // Return early errors if execution context failed.

  if (!('schema' in exeContext)) {
    return {
      errors: exeContext,
    };
  } // Return a Promise that will eventually resolve to the data described by
  // The "Response" section of the GraphQL specification.
  //
  // If errors are encountered while executing a GraphQL field, only that
  // field and its descendants will be omitted, and sibling fields will still
  // be executed. An execution which encounters errors will still result in a
  // resolved Promise.
  //
  // Errors from sub-fields of a NonNull type may propagate to the top level,
  // at which point we still log the error and null the parent field, which
  // in this case is the entire response.

  try {
    const { operation } = exeContext;
    const result = executeOperation(exeContext, operation, rootValue);

    if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(result)) {
      return result.then(
        (data) => buildResponse(data, exeContext.errors),
        (error) => {
          exeContext.errors.push(error);
          return buildResponse(null, exeContext.errors);
        },
      );
    }

    return buildResponse(result, exeContext.errors);
  } catch (error) {
    exeContext.errors.push(error);
    return buildResponse(null, exeContext.errors);
  }
}
/**
 * Also implements the "Executing requests" section of the GraphQL specification.
 * However, it guarantees to complete synchronously (or throw an error) assuming
 * that all field resolvers are also synchronous.
 */

function executeSync(args) {
  const result = execute(args); // Assert that the execution was synchronous.

  if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(result)) {
    throw new Error('GraphQL execution failed to complete synchronously.');
  }

  return result;
}
/**
 * Given a completed execution context and data, build the `{ errors, data }`
 * response defined by the "Response" section of the GraphQL specification.
 */

function buildResponse(data, errors) {
  return errors.length === 0
    ? {
        data,
      }
    : {
        errors,
        data,
      };
}
/**
 * Essential assertions before executing to provide developer feedback for
 * improper use of the GraphQL library.
 *
 * @internal
 */

function assertValidExecutionArguments(
  schema,
  document,
  rawVariableValues,
) {
  document || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(false, 'Must provide document.'); // If the schema used for execution is invalid, throw an error.

  (0,_type_validate_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidSchema)(schema); // Variables, if provided, must be an object.

  rawVariableValues == null ||
    (0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectLike)(rawVariableValues) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      'Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided.',
    );
}
/**
 * Constructs a ExecutionContext object from the arguments passed to
 * execute, which we will pass throughout the other execution methods.
 *
 * Throws a GraphQLError if a valid execution context cannot be created.
 *
 * @internal
 */

function buildExecutionContext(args) {
  var _definition$name, _operation$variableDe;

  const {
    schema,
    document,
    rootValue,
    contextValue,
    variableValues: rawVariableValues,
    operationName,
    fieldResolver,
    typeResolver,
    subscribeFieldResolver,
  } = args;
  let operation;
  const fragments = Object.create(null);

  for (const definition of document.definitions) {
    switch (definition.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_6__.Kind.OPERATION_DEFINITION:
        if (operationName == null) {
          if (operation !== undefined) {
            return [
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
                'Must provide operation name if query contains multiple operations.',
              ),
            ];
          }

          operation = definition;
        } else if (
          ((_definition$name = definition.name) === null ||
          _definition$name === void 0
            ? void 0
            : _definition$name.value) === operationName
        ) {
          operation = definition;
        }

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_6__.Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;

      default: // ignore non-executable definitions
    }
  }

  if (!operation) {
    if (operationName != null) {
      return [new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(`Unknown operation named "${operationName}".`)];
    }

    return [new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError('Must provide an operation.')];
  } // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */

  const variableDefinitions =
    (_operation$variableDe = operation.variableDefinitions) !== null &&
    _operation$variableDe !== void 0
      ? _operation$variableDe
      : [];
  const coercedVariableValues = (0,_values_mjs__WEBPACK_IMPORTED_MODULE_8__.getVariableValues)(
    schema,
    variableDefinitions,
    rawVariableValues !== null && rawVariableValues !== void 0
      ? rawVariableValues
      : {},
    {
      maxErrors: 50,
    },
  );

  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }

  return {
    schema,
    fragments,
    rootValue,
    contextValue,
    operation,
    variableValues: coercedVariableValues.coerced,
    fieldResolver:
      fieldResolver !== null && fieldResolver !== void 0
        ? fieldResolver
        : defaultFieldResolver,
    typeResolver:
      typeResolver !== null && typeResolver !== void 0
        ? typeResolver
        : defaultTypeResolver,
    subscribeFieldResolver:
      subscribeFieldResolver !== null && subscribeFieldResolver !== void 0
        ? subscribeFieldResolver
        : defaultFieldResolver,
    errors: [],
  };
}
/**
 * Implements the "Executing operations" section of the spec.
 */

function executeOperation(exeContext, operation, rootValue) {
  const rootType = exeContext.schema.getRootType(operation.operation);

  if (rootType == null) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Schema is not configured to execute ${operation.operation} operation.`,
      operation,
    );
  }

  const rootFields = (0,_collectFields_mjs__WEBPACK_IMPORTED_MODULE_1__.collectFields)(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    rootType,
    operation.selectionSet,
  );
  const path = undefined;

  switch (operation.operation) {
    case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_9__.OperationTypeNode.QUERY:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);

    case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_9__.OperationTypeNode.MUTATION:
      return executeFieldsSerially(
        exeContext,
        rootType,
        rootValue,
        path,
        rootFields,
      );

    case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_9__.OperationTypeNode.SUBSCRIPTION:
      // TODO: deprecate `subscribe` and move all logic here
      // Temporary solution until we finish merging execute and subscribe together
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
  }
}
/**
 * Implements the "Executing selection sets" section of the spec
 * for fields that must be executed serially.
 */

function executeFieldsSerially(
  exeContext,
  parentType,
  sourceValue,
  path,
  fields,
) {
  return (0,_jsutils_promiseReduce_mjs__WEBPACK_IMPORTED_MODULE_10__.promiseReduce)(
    fields.entries(),
    (results, [responseName, fieldNodes]) => {
      const fieldPath = (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.addPath)(path, responseName, parentType.name);
      const result = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath,
      );

      if (result === undefined) {
        return results;
      }

      if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(result)) {
        return result.then((resolvedResult) => {
          results[responseName] = resolvedResult;
          return results;
        });
      }

      results[responseName] = result;
      return results;
    },
    Object.create(null),
  );
}
/**
 * Implements the "Executing selection sets" section of the spec
 * for fields that may be executed in parallel.
 */

function executeFields(exeContext, parentType, sourceValue, path, fields) {
  const results = Object.create(null);
  let containsPromise = false;

  for (const [responseName, fieldNodes] of fields.entries()) {
    const fieldPath = (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.addPath)(path, responseName, parentType.name);
    const result = executeField(
      exeContext,
      parentType,
      sourceValue,
      fieldNodes,
      fieldPath,
    );

    if (result !== undefined) {
      results[responseName] = result;

      if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(result)) {
        containsPromise = true;
      }
    }
  } // If there are no promises, we can just return the object

  if (!containsPromise) {
    return results;
  } // Otherwise, results is a map from field name to the result of resolving that
  // field, which is possibly a promise. Return a promise that will return this
  // same map, but with any promises replaced with the values they resolved to.

  return (0,_jsutils_promiseForObject_mjs__WEBPACK_IMPORTED_MODULE_12__.promiseForObject)(results);
}
/**
 * Implements the "Executing fields" section of the spec
 * In particular, this function figures out the value that the field returns by
 * calling its resolve function, then calls completeValue to complete promises,
 * serialize scalars, or execute the sub-selection-set for objects.
 */

function executeField(exeContext, parentType, source, fieldNodes, path) {
  var _fieldDef$resolve;

  const fieldDef = getFieldDef(exeContext.schema, parentType, fieldNodes[0]);

  if (!fieldDef) {
    return;
  }

  const returnType = fieldDef.type;
  const resolveFn =
    (_fieldDef$resolve = fieldDef.resolve) !== null &&
    _fieldDef$resolve !== void 0
      ? _fieldDef$resolve
      : exeContext.fieldResolver;
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    parentType,
    path,
  ); // Get the resolve function, regardless of if its result is normal or abrupt (error).

  try {
    // Build a JS object of arguments from the field.arguments AST, using the
    // variables scope to fulfill any variable references.
    // TODO: find a way to memoize, in case this field is within a List type.
    const args = (0,_values_mjs__WEBPACK_IMPORTED_MODULE_8__.getArgumentValues)(
      fieldDef,
      fieldNodes[0],
      exeContext.variableValues,
    ); // The resolve function's optional third argument is a context value that
    // is provided to every resolve function within an execution. It is commonly
    // used to represent an authenticated user, or request-specific caches.

    const contextValue = exeContext.contextValue;
    const result = resolveFn(source, args, contextValue, info);
    let completed;

    if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(result)) {
      completed = result.then((resolved) =>
        completeValue(exeContext, returnType, fieldNodes, info, path, resolved),
      );
    } else {
      completed = completeValue(
        exeContext,
        returnType,
        fieldNodes,
        info,
        path,
        result,
      );
    }

    if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(completed)) {
      // Note: we don't rely on a `catch` method, but we do expect "thenable"
      // to take a second callback for the error case.
      return completed.then(undefined, (rawError) => {
        const error = (0,_error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_13__.locatedError)(rawError, fieldNodes, (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.pathToArray)(path));
        return handleFieldError(error, returnType, exeContext);
      });
    }

    return completed;
  } catch (rawError) {
    const error = (0,_error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_13__.locatedError)(rawError, fieldNodes, (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.pathToArray)(path));
    return handleFieldError(error, returnType, exeContext);
  }
}
/**
 * @internal
 */

function buildResolveInfo(
  exeContext,
  fieldDef,
  fieldNodes,
  parentType,
  path,
) {
  // The resolve function's optional fourth argument is a collection of
  // information about the current execution state.
  return {
    fieldName: fieldDef.name,
    fieldNodes,
    returnType: fieldDef.type,
    parentType,
    path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues,
  };
}

function handleFieldError(error, returnType, exeContext) {
  // If the field type is non-nullable, then it is resolved without any
  // protection from errors, however it still properly locates the error.
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isNonNullType)(returnType)) {
    throw error;
  } // Otherwise, error protection is applied, logging the error and resolving
  // a null value for this field if one is encountered.

  exeContext.errors.push(error);
  return null;
}
/**
 * Implements the instructions for completeValue as defined in the
 * "Value Completion" section of the spec.
 *
 * If the field type is Non-Null, then this recursively completes the value
 * for the inner type. It throws a field error if that completion returns null,
 * as per the "Nullability" section of the spec.
 *
 * If the field type is a List, then this recursively completes the value
 * for the inner type on each item in the list.
 *
 * If the field type is a Scalar or Enum, ensures the completed value is a legal
 * value of the type by calling the `serialize` method of GraphQL type
 * definition.
 *
 * If the field is an abstract type, determine the runtime type of the value
 * and then complete based on that type
 *
 * Otherwise, the field type expects a sub-selection set, and will complete the
 * value by executing all sub-selections.
 */

function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
  // If result is an Error, throw a located error.
  if (result instanceof Error) {
    throw result;
  } // If field type is NonNull, complete for inner type, and throw field error
  // if result is null.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isNonNullType)(returnType)) {
    const completed = completeValue(
      exeContext,
      returnType.ofType,
      fieldNodes,
      info,
      path,
      result,
    );

    if (completed === null) {
      throw new Error(
        `Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`,
      );
    }

    return completed;
  } // If result value is null or undefined then return null.

  if (result == null) {
    return null;
  } // If field type is List, complete each item in the list with the inner type

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isListType)(returnType)) {
    return completeListValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result,
    );
  } // If field type is a leaf type, Scalar or Enum, serialize to a valid value,
  // returning null if serialization is not possible.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isLeafType)(returnType)) {
    return completeLeafValue(returnType, result);
  } // If field type is an abstract type, Interface or Union, determine the
  // runtime Object type and complete for that type.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isAbstractType)(returnType)) {
    return completeAbstractValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result,
    );
  } // If field type is Object, execute and complete all sub-selections.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isObjectType)(returnType)) {
    return completeObjectValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result,
    );
  }
  /* c8 ignore next 6 */
  // Not reachable, all possible output types have been considered.

   false ||
    (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_15__.invariant)(
      false,
      'Cannot complete value of unexpected output type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(returnType),
    );
}
/**
 * Complete a list value by completing each item in the list with the
 * inner type
 */

function completeListValue(
  exeContext,
  returnType,
  fieldNodes,
  info,
  path,
  result,
) {
  if (!(0,_jsutils_isIterableObject_mjs__WEBPACK_IMPORTED_MODULE_17__.isIterableObject)(result)) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Expected Iterable, but did not find one for field "${info.parentType.name}.${info.fieldName}".`,
    );
  } // This is specified as a simple map, however we're optimizing the path
  // where the list contains no Promises by avoiding creating another Promise.

  const itemType = returnType.ofType;
  let containsPromise = false;
  const completedResults = Array.from(result, (item, index) => {
    // No need to modify the info object containing the path,
    // since from here on it is not ever accessed by resolver functions.
    const itemPath = (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.addPath)(path, index, undefined);

    try {
      let completedItem;

      if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(item)) {
        completedItem = item.then((resolved) =>
          completeValue(
            exeContext,
            itemType,
            fieldNodes,
            info,
            itemPath,
            resolved,
          ),
        );
      } else {
        completedItem = completeValue(
          exeContext,
          itemType,
          fieldNodes,
          info,
          itemPath,
          item,
        );
      }

      if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(completedItem)) {
        containsPromise = true; // Note: we don't rely on a `catch` method, but we do expect "thenable"
        // to take a second callback for the error case.

        return completedItem.then(undefined, (rawError) => {
          const error = (0,_error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_13__.locatedError)(
            rawError,
            fieldNodes,
            (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.pathToArray)(itemPath),
          );
          return handleFieldError(error, itemType, exeContext);
        });
      }

      return completedItem;
    } catch (rawError) {
      const error = (0,_error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_13__.locatedError)(rawError, fieldNodes, (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_11__.pathToArray)(itemPath));
      return handleFieldError(error, itemType, exeContext);
    }
  });
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
/**
 * Complete a Scalar or Enum by serializing to a valid value, returning
 * null if serialization is not possible.
 */

function completeLeafValue(returnType, result) {
  const serializedResult = returnType.serialize(result);

  if (serializedResult == null) {
    throw new Error(
      `Expected \`${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(returnType)}.serialize(${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(result)})\` to ` +
        `return non-nullable value, returned: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(serializedResult)}`,
    );
  }

  return serializedResult;
}
/**
 * Complete a value of an abstract type by determining the runtime object type
 * of that value, then complete the value for that type.
 */

function completeAbstractValue(
  exeContext,
  returnType,
  fieldNodes,
  info,
  path,
  result,
) {
  var _returnType$resolveTy;

  const resolveTypeFn =
    (_returnType$resolveTy = returnType.resolveType) !== null &&
    _returnType$resolveTy !== void 0
      ? _returnType$resolveTy
      : exeContext.typeResolver;
  const contextValue = exeContext.contextValue;
  const runtimeType = resolveTypeFn(result, contextValue, info, returnType);

  if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(runtimeType)) {
    return runtimeType.then((resolvedRuntimeType) =>
      completeObjectValue(
        exeContext,
        ensureValidRuntimeType(
          resolvedRuntimeType,
          exeContext,
          returnType,
          fieldNodes,
          info,
          result,
        ),
        fieldNodes,
        info,
        path,
        result,
      ),
    );
  }

  return completeObjectValue(
    exeContext,
    ensureValidRuntimeType(
      runtimeType,
      exeContext,
      returnType,
      fieldNodes,
      info,
      result,
    ),
    fieldNodes,
    info,
    path,
    result,
  );
}

function ensureValidRuntimeType(
  runtimeTypeName,
  exeContext,
  returnType,
  fieldNodes,
  info,
  result,
) {
  if (runtimeTypeName == null) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}". Either the "${returnType.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`,
      fieldNodes,
    );
  } // releases before 16.0.0 supported returning `GraphQLObjectType` from `resolveType`
  // TODO: remove in 17.0.0 release

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isObjectType)(runtimeTypeName)) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      'Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead.',
    );
  }

  if (typeof runtimeTypeName !== 'string') {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}" with ` +
        `value ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(result)}, received "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(runtimeTypeName)}".`,
    );
  }

  const runtimeType = exeContext.schema.getType(runtimeTypeName);

  if (runtimeType == null) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a type "${runtimeTypeName}" that does not exist inside the schema.`,
      fieldNodes,
    );
  }

  if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_14__.isObjectType)(runtimeType)) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a non-object type "${runtimeTypeName}".`,
      fieldNodes,
    );
  }

  if (!exeContext.schema.isSubType(returnType, runtimeType)) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
      `Runtime Object type "${runtimeType.name}" is not a possible type for "${returnType.name}".`,
      fieldNodes,
    );
  }

  return runtimeType;
}
/**
 * Complete an Object value by executing all sub-selections.
 */

function completeObjectValue(
  exeContext,
  returnType,
  fieldNodes,
  info,
  path,
  result,
) {
  // Collect sub-fields to execute to complete this value.
  const subFieldNodes = collectSubfields(exeContext, returnType, fieldNodes); // If there is an isTypeOf predicate function, call it with the
  // current result. If isTypeOf returns false, then raise an error rather
  // than continuing execution.

  if (returnType.isTypeOf) {
    const isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);

    if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(isTypeOf)) {
      return isTypeOf.then((resolvedIsTypeOf) => {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result, fieldNodes);
        }

        return executeFields(
          exeContext,
          returnType,
          result,
          path,
          subFieldNodes,
        );
      });
    }

    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result, fieldNodes);
    }
  }

  return executeFields(exeContext, returnType, result, path, subFieldNodes);
}

function invalidReturnTypeError(returnType, result, fieldNodes) {
  return new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLError(
    `Expected value of type "${returnType.name}" but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_16__.inspect)(result)}.`,
    fieldNodes,
  );
}
/**
 * If a resolveType function is not given, then a default resolve behavior is
 * used which attempts two strategies:
 *
 * First, See if the provided value has a `__typename` field defined, if so, use
 * that value as name of the resolved type.
 *
 * Otherwise, test each possible type for the abstract type by calling
 * isTypeOf for the object being coerced, returning the first type that matches.
 */

const defaultTypeResolver = function (
  value,
  contextValue,
  info,
  abstractType,
) {
  // First, look for `__typename`.
  if ((0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectLike)(value) && typeof value.__typename === 'string') {
    return value.__typename;
  } // Otherwise, test each possible type.

  const possibleTypes = info.schema.getPossibleTypes(abstractType);
  const promisedIsTypeOfResults = [];

  for (let i = 0; i < possibleTypes.length; i++) {
    const type = possibleTypes[i];

    if (type.isTypeOf) {
      const isTypeOfResult = type.isTypeOf(value, contextValue, info);

      if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_3__.isPromise)(isTypeOfResult)) {
        promisedIsTypeOfResults[i] = isTypeOfResult;
      } else if (isTypeOfResult) {
        return type.name;
      }
    }
  }

  if (promisedIsTypeOfResults.length) {
    return Promise.all(promisedIsTypeOfResults).then((isTypeOfResults) => {
      for (let i = 0; i < isTypeOfResults.length; i++) {
        if (isTypeOfResults[i]) {
          return possibleTypes[i].name;
        }
      }
    });
  }
};
/**
 * If a resolve function is not given, then a default resolve behavior is used
 * which takes the property of the source object of the same name as the field
 * and returns it as the result, or if it's a function, returns the result
 * of calling that function while passing along args and context value.
 */

const defaultFieldResolver = function (
  source,
  args,
  contextValue,
  info,
) {
  // ensure source is a value for which property access is acceptable.
  if ((0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectLike)(source) || typeof source === 'function') {
    const property = source[info.fieldName];

    if (typeof property === 'function') {
      return source[info.fieldName](args, contextValue, info);
    }

    return property;
  }
};
/**
 * This method looks up the field on the given type definition.
 * It has special casing for the three introspection fields,
 * __schema, __type and __typename. __typename is special because
 * it can always be queried as a field, even in situations where no
 * other fields are allowed, like on a Union. __schema and __type
 * could get automatically added to the query type, but that would
 * require mutating type definitions, which would cause issues.
 *
 * @internal
 */

function getFieldDef(schema, parentType, fieldNode) {
  const fieldName = fieldNode.name.value;

  if (
    fieldName === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__.SchemaMetaFieldDef.name &&
    schema.getQueryType() === parentType
  ) {
    return _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__.SchemaMetaFieldDef;
  } else if (
    fieldName === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__.TypeMetaFieldDef.name &&
    schema.getQueryType() === parentType
  ) {
    return _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__.TypeMetaFieldDef;
  } else if (fieldName === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__.TypeNameMetaFieldDef.name) {
    return _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_18__.TypeNameMetaFieldDef;
  }

  return parentType.getFields()[fieldName];
}


/***/ }),

/***/ "../../graphql/execution/mapAsyncIterator.mjs":
/*!****************************************************!*\
  !*** ../../graphql/execution/mapAsyncIterator.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapAsyncIterator": () => (/* binding */ mapAsyncIterator)
/* harmony export */ });
/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */
function mapAsyncIterator(iterable, callback) {
  const iterator = iterable[Symbol.asyncIterator]();

  async function mapResult(result) {
    if (result.done) {
      return result;
    }

    try {
      return {
        value: await callback(result.value),
        done: false,
      };
    } catch (error) {
      /* c8 ignore start */
      // FIXME: add test case
      if (typeof iterator.return === 'function') {
        try {
          await iterator.return();
        } catch (_e) {
          /* ignore error */
        }
      }

      throw error;
      /* c8 ignore stop */
    }
  }

  return {
    async next() {
      return mapResult(await iterator.next());
    },

    async return() {
      // If iterator.return() does not exist, then type R must be undefined.
      return typeof iterator.return === 'function'
        ? mapResult(await iterator.return())
        : {
            value: undefined,
            done: true,
          };
    },

    async throw(error) {
      if (typeof iterator.throw === 'function') {
        return mapResult(await iterator.throw(error));
      }

      throw error;
    },

    [Symbol.asyncIterator]() {
      return this;
    },
  };
}


/***/ }),

/***/ "../../graphql/execution/subscribe.mjs":
/*!*********************************************!*\
  !*** ../../graphql/execution/subscribe.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "createSourceEventStream": () => (/* binding */ createSourceEventStream)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_isAsyncIterable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/isAsyncIterable.mjs */ "../../graphql/jsutils/isAsyncIterable.mjs");
/* harmony import */ var _jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/Path.mjs */ "../../graphql/jsutils/Path.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../error/locatedError.mjs */ "../../graphql/error/locatedError.mjs");
/* harmony import */ var _collectFields_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./collectFields.mjs */ "../../graphql/execution/collectFields.mjs");
/* harmony import */ var _execute_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./execute.mjs */ "../../graphql/execution/execute.mjs");
/* harmony import */ var _mapAsyncIterator_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapAsyncIterator.mjs */ "../../graphql/execution/mapAsyncIterator.mjs");
/* harmony import */ var _values_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./values.mjs */ "../../graphql/execution/values.mjs");










/**
 * Implements the "Subscribe" algorithm described in the GraphQL specification.
 *
 * Returns a Promise which resolves to either an AsyncIterator (if successful)
 * or an ExecutionResult (error). The promise will be rejected if the schema or
 * other arguments to this function are invalid, or if the resolved event stream
 * is not an async iterable.
 *
 * If the client-provided arguments to this function do not result in a
 * compliant subscription, a GraphQL Response (ExecutionResult) with
 * descriptive errors and no data will be returned.
 *
 * If the source stream could not be created due to faulty subscription
 * resolver logic or underlying systems, the promise will resolve to a single
 * ExecutionResult containing `errors` and no `data`.
 *
 * If the operation succeeded, the promise resolves to an AsyncIterator, which
 * yields a stream of ExecutionResults representing the response stream.
 *
 * Accepts either an object with named arguments, or individual arguments.
 */

async function subscribe(args) {
  // Temporary for v15 to v16 migration. Remove in v17
  arguments.length < 2 ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(
      false,
      'graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.',
    );
  const {
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    subscribeFieldResolver,
  } = args;
  const resultOrStream = await createSourceEventStream(
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    subscribeFieldResolver,
  );

  if (!(0,_jsutils_isAsyncIterable_mjs__WEBPACK_IMPORTED_MODULE_1__.isAsyncIterable)(resultOrStream)) {
    return resultOrStream;
  } // For each payload yielded from a subscription, map it over the normal
  // GraphQL `execute` function, with `payload` as the rootValue.
  // This implements the "MapSourceToResponseEvent" algorithm described in
  // the GraphQL specification. The `execute` function provides the
  // "ExecuteSubscriptionEvent" algorithm, as it is nearly identical to the
  // "ExecuteQuery" algorithm, for which `execute` is also used.

  const mapSourceToResponse = (payload) =>
    (0,_execute_mjs__WEBPACK_IMPORTED_MODULE_2__.execute)({
      schema,
      document,
      rootValue: payload,
      contextValue,
      variableValues,
      operationName,
      fieldResolver,
    }); // Map every source value to a ExecutionResult value as described above.

  return (0,_mapAsyncIterator_mjs__WEBPACK_IMPORTED_MODULE_3__.mapAsyncIterator)(resultOrStream, mapSourceToResponse);
}
/**
 * Implements the "CreateSourceEventStream" algorithm described in the
 * GraphQL specification, resolving the subscription source event stream.
 *
 * Returns a Promise which resolves to either an AsyncIterable (if successful)
 * or an ExecutionResult (error). The promise will be rejected if the schema or
 * other arguments to this function are invalid, or if the resolved event stream
 * is not an async iterable.
 *
 * If the client-provided arguments to this function do not result in a
 * compliant subscription, a GraphQL Response (ExecutionResult) with
 * descriptive errors and no data will be returned.
 *
 * If the the source stream could not be created due to faulty subscription
 * resolver logic or underlying systems, the promise will resolve to a single
 * ExecutionResult containing `errors` and no `data`.
 *
 * If the operation succeeded, the promise resolves to the AsyncIterable for the
 * event stream returned by the resolver.
 *
 * A Source Event Stream represents a sequence of events, each of which triggers
 * a GraphQL execution for that event.
 *
 * This may be useful when hosting the stateful subscription service in a
 * different process or machine than the stateless GraphQL execution engine,
 * or otherwise separating these two steps. For more on this, see the
 * "Supporting Subscriptions at Scale" information in the GraphQL specification.
 */

async function createSourceEventStream(
  schema,
  document,
  rootValue,
  contextValue,
  variableValues,
  operationName,
  subscribeFieldResolver,
) {
  // If arguments are missing or incorrectly typed, this is an internal
  // developer mistake which should throw an early error.
  (0,_execute_mjs__WEBPACK_IMPORTED_MODULE_2__.assertValidExecutionArguments)(schema, document, variableValues); // If a valid execution context cannot be created due to incorrect arguments,
  // a "Response" with only errors is returned.

  const exeContext = (0,_execute_mjs__WEBPACK_IMPORTED_MODULE_2__.buildExecutionContext)({
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    subscribeFieldResolver,
  }); // Return early errors if execution context failed.

  if (!('schema' in exeContext)) {
    return {
      errors: exeContext,
    };
  }

  try {
    const eventStream = await executeSubscription(exeContext); // Assert field returned an event stream, otherwise yield an error.

    if (!(0,_jsutils_isAsyncIterable_mjs__WEBPACK_IMPORTED_MODULE_1__.isAsyncIterable)(eventStream)) {
      throw new Error(
        'Subscription field must return Async Iterable. ' +
          `Received: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_4__.inspect)(eventStream)}.`,
      );
    }

    return eventStream;
  } catch (error) {
    // If it GraphQLError, report it as an ExecutionResult, containing only errors and no data.
    // Otherwise treat the error as a system-class error and re-throw it.
    if (error instanceof _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLError) {
      return {
        errors: [error],
      };
    }

    throw error;
  }
}

async function executeSubscription(exeContext) {
  const { schema, fragments, operation, variableValues, rootValue } =
    exeContext;
  const rootType = schema.getSubscriptionType();

  if (rootType == null) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLError(
      'Schema is not configured to execute subscription operation.',
      operation,
    );
  }

  const rootFields = (0,_collectFields_mjs__WEBPACK_IMPORTED_MODULE_6__.collectFields)(
    schema,
    fragments,
    variableValues,
    rootType,
    operation.selectionSet,
  );
  const [responseName, fieldNodes] = [...rootFields.entries()][0];
  const fieldDef = (0,_execute_mjs__WEBPACK_IMPORTED_MODULE_2__.getFieldDef)(schema, rootType, fieldNodes[0]);

  if (!fieldDef) {
    const fieldName = fieldNodes[0].name.value;
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLError(
      `The subscription field "${fieldName}" is not defined.`,
      fieldNodes,
    );
  }

  const path = (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_7__.addPath)(undefined, responseName, rootType.name);
  const info = (0,_execute_mjs__WEBPACK_IMPORTED_MODULE_2__.buildResolveInfo)(
    exeContext,
    fieldDef,
    fieldNodes,
    rootType,
    path,
  );

  try {
    var _fieldDef$subscribe;

    // Implements the "ResolveFieldEventStream" algorithm from GraphQL specification.
    // It differs from "ResolveFieldValue" due to providing a different `resolveFn`.
    // Build a JS object of arguments from the field.arguments AST, using the
    // variables scope to fulfill any variable references.
    const args = (0,_values_mjs__WEBPACK_IMPORTED_MODULE_8__.getArgumentValues)(fieldDef, fieldNodes[0], variableValues); // The resolve function's optional third argument is a context value that
    // is provided to every resolve function within an execution. It is commonly
    // used to represent an authenticated user, or request-specific caches.

    const contextValue = exeContext.contextValue; // Call the `subscribe()` resolver or the default resolver to produce an
    // AsyncIterable yielding raw payloads.

    const resolveFn =
      (_fieldDef$subscribe = fieldDef.subscribe) !== null &&
      _fieldDef$subscribe !== void 0
        ? _fieldDef$subscribe
        : exeContext.subscribeFieldResolver;
    const eventStream = await resolveFn(rootValue, args, contextValue, info);

    if (eventStream instanceof Error) {
      throw eventStream;
    }

    return eventStream;
  } catch (error) {
    throw (0,_error_locatedError_mjs__WEBPACK_IMPORTED_MODULE_9__.locatedError)(error, fieldNodes, (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_7__.pathToArray)(path));
  }
}


/***/ }),

/***/ "../../graphql/execution/values.mjs":
/*!******************************************!*\
  !*** ../../graphql/execution/values.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVariableValues": () => (/* binding */ getVariableValues),
/* harmony export */   "getArgumentValues": () => (/* binding */ getArgumentValues),
/* harmony export */   "getDirectiveValues": () => (/* binding */ getDirectiveValues)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _jsutils_printPathArray_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/printPathArray.mjs */ "../../graphql/jsutils/printPathArray.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _utilities_coerceInputValue_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/coerceInputValue.mjs */ "../../graphql/utilities/coerceInputValue.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");
/* harmony import */ var _utilities_valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/valueFromAST.mjs */ "../../graphql/utilities/valueFromAST.mjs");











/**
 * Prepares an object map of variableValues of the correct type based on the
 * provided variable definitions and arbitrary input. If the input cannot be
 * parsed to match the variable definitions, a GraphQLError will be thrown.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
function getVariableValues(schema, varDefNodes, inputs, options) {
  const errors = [];
  const maxErrors =
    options === null || options === void 0 ? void 0 : options.maxErrors;

  try {
    const coerced = coerceVariableValues(
      schema,
      varDefNodes,
      inputs,
      (error) => {
        if (maxErrors != null && errors.length >= maxErrors) {
          throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            'Too many errors processing variables, error limit reached. Execution aborted.',
          );
        }

        errors.push(error);
      },
    );

    if (errors.length === 0) {
      return {
        coerced,
      };
    }
  } catch (error) {
    errors.push(error);
  }

  return {
    errors,
  };
}

function coerceVariableValues(schema, varDefNodes, inputs, onError) {
  const coercedValues = {};

  for (const varDefNode of varDefNodes) {
    const varName = varDefNode.variable.name.value;
    const varType = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_1__.typeFromAST)(schema, varDefNode.type);

    if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputType)(varType)) {
      // Must use input types for variables. This should be caught during
      // validation, however is checked again here for safety.
      const varTypeStr = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_3__.print)(varDefNode.type);
      onError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
          `Variable "$${varName}" expected value of type "${varTypeStr}" which cannot be used as an input type.`,
          varDefNode.type,
        ),
      );
      continue;
    }

    if (!hasOwnProperty(inputs, varName)) {
      if (varDefNode.defaultValue) {
        coercedValues[varName] = (0,_utilities_valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_4__.valueFromAST)(varDefNode.defaultValue, varType);
      } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(varType)) {
        const varTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(varType);
        onError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Variable "$${varName}" of required type "${varTypeStr}" was not provided.`,
            varDefNode,
          ),
        );
      }

      continue;
    }

    const value = inputs[varName];

    if (value === null && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(varType)) {
      const varTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(varType);
      onError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
          `Variable "$${varName}" of non-null type "${varTypeStr}" must not be null.`,
          varDefNode,
        ),
      );
      continue;
    }

    coercedValues[varName] = (0,_utilities_coerceInputValue_mjs__WEBPACK_IMPORTED_MODULE_6__.coerceInputValue)(
      value,
      varType,
      (path, invalidValue, error) => {
        let prefix =
          `Variable "$${varName}" got invalid value ` + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(invalidValue);

        if (path.length > 0) {
          prefix += ` at "${varName}${(0,_jsutils_printPathArray_mjs__WEBPACK_IMPORTED_MODULE_7__.printPathArray)(path)}"`;
        }

        onError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            prefix + '; ' + error.message,
            varDefNode,
            undefined,
            undefined,
            undefined,
            error.originalError,
          ),
        );
      },
    );
  }

  return coercedValues;
}
/**
 * Prepares an object map of argument values given a list of argument
 * definitions and list of argument AST nodes.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 *
 * @internal
 */

function getArgumentValues(def, node, variableValues) {
  var _node$arguments;

  const coercedValues = {}; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */

  const argumentNodes =
    (_node$arguments = node.arguments) !== null && _node$arguments !== void 0
      ? _node$arguments
      : [];
  const argNodeMap = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_8__.keyMap)(argumentNodes, (arg) => arg.name.value);

  for (const argDef of def.args) {
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];

    if (!argumentNode) {
      if (argDef.defaultValue !== undefined) {
        coercedValues[name] = argDef.defaultValue;
      } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(argType)) {
        throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
          `Argument "${name}" of required type "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(argType)}" ` +
            'was not provided.',
          node,
        );
      }

      continue;
    }

    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_9__.Kind.NULL;

    if (valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_9__.Kind.VARIABLE) {
      const variableName = valueNode.name.value;

      if (
        variableValues == null ||
        !hasOwnProperty(variableValues, variableName)
      ) {
        if (argDef.defaultValue !== undefined) {
          coercedValues[name] = argDef.defaultValue;
        } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(argType)) {
          throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Argument "${name}" of required type "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(argType)}" ` +
              `was provided the variable "$${variableName}" which was not provided a runtime value.`,
            valueNode,
          );
        }

        continue;
      }

      isNull = variableValues[variableName] == null;
    }

    if (isNull && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(argType)) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
        `Argument "${name}" of non-null type "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(argType)}" ` +
          'must not be null.',
        valueNode,
      );
    }

    const coercedValue = (0,_utilities_valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_4__.valueFromAST)(valueNode, argType, variableValues);

    if (coercedValue === undefined) {
      // Note: ValuesOfCorrectTypeRule validation should catch this before
      // execution. This is a runtime check to ensure execution does not
      // continue with an invalid argument value.
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
        `Argument "${name}" has invalid value ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_3__.print)(valueNode)}.`,
        valueNode,
      );
    }

    coercedValues[name] = coercedValue;
  }

  return coercedValues;
}
/**
 * Prepares an object map of argument values given a directive definition
 * and a AST node which may contain directives. Optionally also accepts a map
 * of variable values.
 *
 * If the directive does not exist on the node, returns undefined.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */

function getDirectiveValues(directiveDef, node, variableValues) {
  var _node$directives;

  const directiveNode =
    (_node$directives = node.directives) === null || _node$directives === void 0
      ? void 0
      : _node$directives.find(
          (directive) => directive.name.value === directiveDef.name,
        );

  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ "../../graphql/graphql.mjs":
/*!*********************************!*\
  !*** ../../graphql/graphql.mjs ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "graphql": () => (/* binding */ graphql),
/* harmony export */   "graphqlSync": () => (/* binding */ graphqlSync)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsutils/isPromise.mjs */ "../../graphql/jsutils/isPromise.mjs");
/* harmony import */ var _language_parser_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language/parser.mjs */ "../../graphql/language/parser.mjs");
/* harmony import */ var _type_validate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/validate.mjs */ "../../graphql/type/validate.mjs");
/* harmony import */ var _validation_validate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation/validate.mjs */ "../../graphql/validation/validate.mjs");
/* harmony import */ var _execution_execute_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./execution/execute.mjs */ "../../graphql/execution/execute.mjs");






/**
 * This is the primary entry point function for fulfilling GraphQL operations
 * by parsing, validating, and executing a GraphQL document along side a
 * GraphQL schema.
 *
 * More sophisticated GraphQL servers, such as those which persist queries,
 * may wish to separate the validation and execution phases to a static time
 * tooling step, and a server runtime step.
 *
 * Accepts either an object with named arguments, or individual arguments:
 *
 * schema:
 *    The GraphQL type system to use when validating and executing a query.
 * source:
 *    A GraphQL language formatted string representing the requested operation.
 * rootValue:
 *    The value provided as the first argument to resolver functions on the top
 *    level type (e.g. the query object type).
 * contextValue:
 *    The context value is provided as an argument to resolver functions after
 *    field arguments. It is used to pass shared information useful at any point
 *    during executing this query, for example the currently logged in user and
 *    connections to databases or other services.
 * variableValues:
 *    A mapping of variable name to runtime value to use for all variables
 *    defined in the requestString.
 * operationName:
 *    The name of the operation to use if requestString contains multiple
 *    possible operations. Can be omitted if requestString contains only
 *    one operation.
 * fieldResolver:
 *    A resolver function to use when one is not provided by the schema.
 *    If not provided, the default field resolver is used (which looks for a
 *    value or method on the source value with the field's name).
 * typeResolver:
 *    A type resolver function to use when none is provided by the schema.
 *    If not provided, the default type resolver is used (which looks for a
 *    `__typename` field or alternatively calls the `isTypeOf` method).
 */

function graphql(args) {
  // Always return a Promise for a consistent API.
  return new Promise((resolve) => resolve(graphqlImpl(args)));
}
/**
 * The graphqlSync function also fulfills GraphQL operations by parsing,
 * validating, and executing a GraphQL document along side a GraphQL schema.
 * However, it guarantees to complete synchronously (or throw an error) assuming
 * that all field resolvers are also synchronous.
 */

function graphqlSync(args) {
  const result = graphqlImpl(args); // Assert that the execution was synchronous.

  if ((0,_jsutils_isPromise_mjs__WEBPACK_IMPORTED_MODULE_0__.isPromise)(result)) {
    throw new Error('GraphQL execution failed to complete synchronously.');
  }

  return result;
}

function graphqlImpl(args) {
  // Temporary for v15 to v16 migration. Remove in v17
  arguments.length < 2 ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_1__.devAssert)(
      false,
      'graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.',
    );
  const {
    schema,
    source,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver,
  } = args; // Validate Schema

  const schemaValidationErrors = (0,_type_validate_mjs__WEBPACK_IMPORTED_MODULE_2__.validateSchema)(schema);

  if (schemaValidationErrors.length > 0) {
    return {
      errors: schemaValidationErrors,
    };
  } // Parse

  let document;

  try {
    document = (0,_language_parser_mjs__WEBPACK_IMPORTED_MODULE_3__.parse)(source);
  } catch (syntaxError) {
    return {
      errors: [syntaxError],
    };
  } // Validate

  const validationErrors = (0,_validation_validate_mjs__WEBPACK_IMPORTED_MODULE_4__.validate)(schema, document);

  if (validationErrors.length > 0) {
    return {
      errors: validationErrors,
    };
  } // Execute

  return (0,_execution_execute_mjs__WEBPACK_IMPORTED_MODULE_5__.execute)({
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver,
  });
}


/***/ }),

/***/ "../../graphql/index.mjs":
/*!*******************************!*\
  !*** ../../graphql/index.mjs ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* reexport safe */ _version_mjs__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "versionInfo": () => (/* reexport safe */ _version_mjs__WEBPACK_IMPORTED_MODULE_0__.versionInfo),
/* harmony export */   "graphql": () => (/* reexport safe */ _graphql_mjs__WEBPACK_IMPORTED_MODULE_1__.graphql),
/* harmony export */   "graphqlSync": () => (/* reexport safe */ _graphql_mjs__WEBPACK_IMPORTED_MODULE_1__.graphqlSync),
/* harmony export */   "resolveObjMapThunk": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveObjMapThunk),
/* harmony export */   "resolveReadonlyArrayThunk": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveReadonlyArrayThunk),
/* harmony export */   "GraphQLSchema": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLSchema),
/* harmony export */   "GraphQLDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLDirective),
/* harmony export */   "GraphQLScalarType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLScalarType),
/* harmony export */   "GraphQLObjectType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLObjectType),
/* harmony export */   "GraphQLInterfaceType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLInterfaceType),
/* harmony export */   "GraphQLUnionType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLUnionType),
/* harmony export */   "GraphQLEnumType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLEnumType),
/* harmony export */   "GraphQLInputObjectType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLInputObjectType),
/* harmony export */   "GraphQLList": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLList),
/* harmony export */   "GraphQLNonNull": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLNonNull),
/* harmony export */   "specifiedScalarTypes": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.specifiedScalarTypes),
/* harmony export */   "GraphQLInt": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLInt),
/* harmony export */   "GraphQLFloat": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLFloat),
/* harmony export */   "GraphQLString": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLString),
/* harmony export */   "GraphQLBoolean": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLBoolean),
/* harmony export */   "GraphQLID": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLID),
/* harmony export */   "GRAPHQL_MAX_INT": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GRAPHQL_MAX_INT),
/* harmony export */   "GRAPHQL_MIN_INT": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.GRAPHQL_MIN_INT),
/* harmony export */   "specifiedDirectives": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.specifiedDirectives),
/* harmony export */   "GraphQLIncludeDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLIncludeDirective),
/* harmony export */   "GraphQLSkipDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLSkipDirective),
/* harmony export */   "GraphQLDeprecatedDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLDeprecatedDirective),
/* harmony export */   "GraphQLSpecifiedByDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLSpecifiedByDirective),
/* harmony export */   "TypeKind": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.TypeKind),
/* harmony export */   "DEFAULT_DEPRECATION_REASON": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_DEPRECATION_REASON),
/* harmony export */   "introspectionTypes": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.introspectionTypes),
/* harmony export */   "__Schema": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__Schema),
/* harmony export */   "__Directive": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__Directive),
/* harmony export */   "__DirectiveLocation": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__DirectiveLocation),
/* harmony export */   "__Type": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__Type),
/* harmony export */   "__Field": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__Field),
/* harmony export */   "__InputValue": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__InputValue),
/* harmony export */   "__EnumValue": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__EnumValue),
/* harmony export */   "__TypeKind": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.__TypeKind),
/* harmony export */   "SchemaMetaFieldDef": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.SchemaMetaFieldDef),
/* harmony export */   "TypeMetaFieldDef": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.TypeMetaFieldDef),
/* harmony export */   "TypeNameMetaFieldDef": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.TypeNameMetaFieldDef),
/* harmony export */   "isSchema": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_3__.isSchema),
/* harmony export */   "isDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.isDirective),
/* harmony export */   "isType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isType),
/* harmony export */   "isScalarType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isScalarType),
/* harmony export */   "isObjectType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType),
/* harmony export */   "isInterfaceType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType),
/* harmony export */   "isUnionType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isUnionType),
/* harmony export */   "isEnumType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isEnumType),
/* harmony export */   "isInputObjectType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputObjectType),
/* harmony export */   "isListType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isListType),
/* harmony export */   "isNonNullType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType),
/* harmony export */   "isInputType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputType),
/* harmony export */   "isOutputType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isOutputType),
/* harmony export */   "isLeafType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isLeafType),
/* harmony export */   "isCompositeType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isCompositeType),
/* harmony export */   "isAbstractType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isAbstractType),
/* harmony export */   "isWrappingType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isWrappingType),
/* harmony export */   "isNullableType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isNullableType),
/* harmony export */   "isNamedType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isNamedType),
/* harmony export */   "isRequiredArgument": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isRequiredArgument),
/* harmony export */   "isRequiredInputField": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.isRequiredInputField),
/* harmony export */   "isSpecifiedScalarType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__.isSpecifiedScalarType),
/* harmony export */   "isIntrospectionType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__.isIntrospectionType),
/* harmony export */   "isSpecifiedDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.isSpecifiedDirective),
/* harmony export */   "assertSchema": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_3__.assertSchema),
/* harmony export */   "assertDirective": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__.assertDirective),
/* harmony export */   "assertType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertType),
/* harmony export */   "assertScalarType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertScalarType),
/* harmony export */   "assertObjectType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertObjectType),
/* harmony export */   "assertInterfaceType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertInterfaceType),
/* harmony export */   "assertUnionType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertUnionType),
/* harmony export */   "assertEnumType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertEnumType),
/* harmony export */   "assertInputObjectType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertInputObjectType),
/* harmony export */   "assertListType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertListType),
/* harmony export */   "assertNonNullType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertNonNullType),
/* harmony export */   "assertInputType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertInputType),
/* harmony export */   "assertOutputType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertOutputType),
/* harmony export */   "assertLeafType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertLeafType),
/* harmony export */   "assertCompositeType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertCompositeType),
/* harmony export */   "assertAbstractType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertAbstractType),
/* harmony export */   "assertWrappingType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertWrappingType),
/* harmony export */   "assertNullableType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertNullableType),
/* harmony export */   "assertNamedType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.assertNamedType),
/* harmony export */   "getNullableType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.getNullableType),
/* harmony export */   "getNamedType": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__.getNamedType),
/* harmony export */   "validateSchema": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_7__.validateSchema),
/* harmony export */   "assertValidSchema": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_7__.assertValidSchema),
/* harmony export */   "assertName": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_8__.assertName),
/* harmony export */   "assertEnumValueName": () => (/* reexport safe */ _type_index_mjs__WEBPACK_IMPORTED_MODULE_8__.assertEnumValueName),
/* harmony export */   "Token": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_9__.Token),
/* harmony export */   "Source": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_10__.Source),
/* harmony export */   "Location": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_9__.Location),
/* harmony export */   "OperationTypeNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_9__.OperationTypeNode),
/* harmony export */   "getLocation": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_11__.getLocation),
/* harmony export */   "printLocation": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_12__.printLocation),
/* harmony export */   "printSourceLocation": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_12__.printSourceLocation),
/* harmony export */   "Lexer": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_13__.Lexer),
/* harmony export */   "TokenKind": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_14__.TokenKind),
/* harmony export */   "parse": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_15__.parse),
/* harmony export */   "parseValue": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_15__.parseValue),
/* harmony export */   "parseConstValue": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_15__.parseConstValue),
/* harmony export */   "parseType": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_15__.parseType),
/* harmony export */   "print": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_16__.print),
/* harmony export */   "visit": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_17__.visit),
/* harmony export */   "visitInParallel": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_17__.visitInParallel),
/* harmony export */   "getVisitFn": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_17__.getVisitFn),
/* harmony export */   "getEnterLeaveForKind": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_17__.getEnterLeaveForKind),
/* harmony export */   "BREAK": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_17__.BREAK),
/* harmony export */   "Kind": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_18__.Kind),
/* harmony export */   "DirectiveLocation": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_19__.DirectiveLocation),
/* harmony export */   "isDefinitionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isDefinitionNode),
/* harmony export */   "isExecutableDefinitionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isExecutableDefinitionNode),
/* harmony export */   "isSelectionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isSelectionNode),
/* harmony export */   "isValueNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isValueNode),
/* harmony export */   "isConstValueNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isConstValueNode),
/* harmony export */   "isTypeNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isTypeNode),
/* harmony export */   "isTypeSystemDefinitionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isTypeSystemDefinitionNode),
/* harmony export */   "isTypeDefinitionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isTypeDefinitionNode),
/* harmony export */   "isTypeSystemExtensionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isTypeSystemExtensionNode),
/* harmony export */   "isTypeExtensionNode": () => (/* reexport safe */ _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__.isTypeExtensionNode),
/* harmony export */   "execute": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_21__.execute),
/* harmony export */   "executeSync": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_21__.executeSync),
/* harmony export */   "defaultFieldResolver": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_21__.defaultFieldResolver),
/* harmony export */   "defaultTypeResolver": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_21__.defaultTypeResolver),
/* harmony export */   "responsePathAsArray": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_22__.pathToArray),
/* harmony export */   "getVariableValues": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_23__.getVariableValues),
/* harmony export */   "getDirectiveValues": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_23__.getDirectiveValues),
/* harmony export */   "subscribe": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_24__.subscribe),
/* harmony export */   "createSourceEventStream": () => (/* reexport safe */ _execution_index_mjs__WEBPACK_IMPORTED_MODULE_24__.createSourceEventStream),
/* harmony export */   "validate": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_25__.validate),
/* harmony export */   "ValidationContext": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_26__.ValidationContext),
/* harmony export */   "specifiedRules": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_27__.specifiedRules),
/* harmony export */   "ExecutableDefinitionsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_28__.ExecutableDefinitionsRule),
/* harmony export */   "FieldsOnCorrectTypeRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_29__.FieldsOnCorrectTypeRule),
/* harmony export */   "FragmentsOnCompositeTypesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_30__.FragmentsOnCompositeTypesRule),
/* harmony export */   "KnownArgumentNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_31__.KnownArgumentNamesRule),
/* harmony export */   "KnownDirectivesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_32__.KnownDirectivesRule),
/* harmony export */   "KnownFragmentNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_33__.KnownFragmentNamesRule),
/* harmony export */   "KnownTypeNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_34__.KnownTypeNamesRule),
/* harmony export */   "LoneAnonymousOperationRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_35__.LoneAnonymousOperationRule),
/* harmony export */   "NoFragmentCyclesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_36__.NoFragmentCyclesRule),
/* harmony export */   "NoUndefinedVariablesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_37__.NoUndefinedVariablesRule),
/* harmony export */   "NoUnusedFragmentsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_38__.NoUnusedFragmentsRule),
/* harmony export */   "NoUnusedVariablesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_39__.NoUnusedVariablesRule),
/* harmony export */   "OverlappingFieldsCanBeMergedRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_40__.OverlappingFieldsCanBeMergedRule),
/* harmony export */   "PossibleFragmentSpreadsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_41__.PossibleFragmentSpreadsRule),
/* harmony export */   "ProvidedRequiredArgumentsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_42__.ProvidedRequiredArgumentsRule),
/* harmony export */   "ScalarLeafsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_43__.ScalarLeafsRule),
/* harmony export */   "SingleFieldSubscriptionsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_44__.SingleFieldSubscriptionsRule),
/* harmony export */   "UniqueArgumentNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_45__.UniqueArgumentNamesRule),
/* harmony export */   "UniqueDirectivesPerLocationRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_46__.UniqueDirectivesPerLocationRule),
/* harmony export */   "UniqueFragmentNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_47__.UniqueFragmentNamesRule),
/* harmony export */   "UniqueInputFieldNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_48__.UniqueInputFieldNamesRule),
/* harmony export */   "UniqueOperationNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_49__.UniqueOperationNamesRule),
/* harmony export */   "UniqueVariableNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_50__.UniqueVariableNamesRule),
/* harmony export */   "ValuesOfCorrectTypeRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_51__.ValuesOfCorrectTypeRule),
/* harmony export */   "VariablesAreInputTypesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_52__.VariablesAreInputTypesRule),
/* harmony export */   "VariablesInAllowedPositionRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_53__.VariablesInAllowedPositionRule),
/* harmony export */   "LoneSchemaDefinitionRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_54__.LoneSchemaDefinitionRule),
/* harmony export */   "UniqueOperationTypesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_55__.UniqueOperationTypesRule),
/* harmony export */   "UniqueTypeNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_56__.UniqueTypeNamesRule),
/* harmony export */   "UniqueEnumValueNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_57__.UniqueEnumValueNamesRule),
/* harmony export */   "UniqueFieldDefinitionNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_58__.UniqueFieldDefinitionNamesRule),
/* harmony export */   "UniqueArgumentDefinitionNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_59__.UniqueArgumentDefinitionNamesRule),
/* harmony export */   "UniqueDirectiveNamesRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_60__.UniqueDirectiveNamesRule),
/* harmony export */   "PossibleTypeExtensionsRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_61__.PossibleTypeExtensionsRule),
/* harmony export */   "NoDeprecatedCustomRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_62__.NoDeprecatedCustomRule),
/* harmony export */   "NoSchemaIntrospectionCustomRule": () => (/* reexport safe */ _validation_index_mjs__WEBPACK_IMPORTED_MODULE_63__.NoSchemaIntrospectionCustomRule),
/* harmony export */   "GraphQLError": () => (/* reexport safe */ _error_index_mjs__WEBPACK_IMPORTED_MODULE_64__.GraphQLError),
/* harmony export */   "syntaxError": () => (/* reexport safe */ _error_index_mjs__WEBPACK_IMPORTED_MODULE_65__.syntaxError),
/* harmony export */   "locatedError": () => (/* reexport safe */ _error_index_mjs__WEBPACK_IMPORTED_MODULE_66__.locatedError),
/* harmony export */   "printError": () => (/* reexport safe */ _error_index_mjs__WEBPACK_IMPORTED_MODULE_64__.printError),
/* harmony export */   "formatError": () => (/* reexport safe */ _error_index_mjs__WEBPACK_IMPORTED_MODULE_64__.formatError),
/* harmony export */   "getIntrospectionQuery": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_67__.getIntrospectionQuery),
/* harmony export */   "getOperationAST": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_68__.getOperationAST),
/* harmony export */   "getOperationRootType": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_69__.getOperationRootType),
/* harmony export */   "introspectionFromSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_70__.introspectionFromSchema),
/* harmony export */   "buildClientSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_71__.buildClientSchema),
/* harmony export */   "buildASTSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_72__.buildASTSchema),
/* harmony export */   "buildSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_72__.buildSchema),
/* harmony export */   "extendSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_73__.extendSchema),
/* harmony export */   "lexicographicSortSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_74__.lexicographicSortSchema),
/* harmony export */   "printSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_75__.printSchema),
/* harmony export */   "printType": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_75__.printType),
/* harmony export */   "printIntrospectionSchema": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_75__.printIntrospectionSchema),
/* harmony export */   "typeFromAST": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_76__.typeFromAST),
/* harmony export */   "valueFromAST": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_77__.valueFromAST),
/* harmony export */   "valueFromASTUntyped": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_78__.valueFromASTUntyped),
/* harmony export */   "astFromValue": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_79__.astFromValue),
/* harmony export */   "TypeInfo": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_80__.TypeInfo),
/* harmony export */   "visitWithTypeInfo": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_80__.visitWithTypeInfo),
/* harmony export */   "coerceInputValue": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_81__.coerceInputValue),
/* harmony export */   "concatAST": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_82__.concatAST),
/* harmony export */   "separateOperations": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_83__.separateOperations),
/* harmony export */   "stripIgnoredCharacters": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_84__.stripIgnoredCharacters),
/* harmony export */   "isEqualType": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_85__.isEqualType),
/* harmony export */   "isTypeSubTypeOf": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_85__.isTypeSubTypeOf),
/* harmony export */   "doTypesOverlap": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_85__.doTypesOverlap),
/* harmony export */   "assertValidName": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_86__.assertValidName),
/* harmony export */   "isValidNameError": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_86__.isValidNameError),
/* harmony export */   "BreakingChangeType": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_87__.BreakingChangeType),
/* harmony export */   "DangerousChangeType": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_87__.DangerousChangeType),
/* harmony export */   "findBreakingChanges": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_87__.findBreakingChanges),
/* harmony export */   "findDangerousChanges": () => (/* reexport safe */ _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_87__.findDangerousChanges)
/* harmony export */ });
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version.mjs */ "../../graphql/version.mjs");
/* harmony import */ var _graphql_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql.mjs */ "../../graphql/graphql.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/schema.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/scalars.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/validate.mjs");
/* harmony import */ var _type_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./type/index.mjs */ "../../graphql/type/assertName.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/source.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/location.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/printLocation.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/lexer.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/tokenKind.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/parser.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/visitor.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/directiveLocation.mjs");
/* harmony import */ var _language_index_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./language/index.mjs */ "../../graphql/language/predicates.mjs");
/* harmony import */ var _execution_index_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./execution/index.mjs */ "../../graphql/execution/execute.mjs");
/* harmony import */ var _execution_index_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./execution/index.mjs */ "../../graphql/jsutils/Path.mjs");
/* harmony import */ var _execution_index_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./execution/index.mjs */ "../../graphql/execution/values.mjs");
/* harmony import */ var _execution_index_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./execution/index.mjs */ "../../graphql/execution/subscribe.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/validate.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/ValidationContext.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/specifiedRules.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/ExecutableDefinitionsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/FieldsOnCorrectTypeRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/KnownArgumentNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/KnownDirectivesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/KnownFragmentNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/KnownTypeNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/LoneAnonymousOperationRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/NoFragmentCyclesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/NoUndefinedVariablesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/NoUnusedFragmentsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/NoUnusedVariablesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/PossibleFragmentSpreadsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/ScalarLeafsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/SingleFieldSubscriptionsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueArgumentNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueFragmentNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueInputFieldNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueOperationNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueVariableNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/ValuesOfCorrectTypeRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/VariablesAreInputTypesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/VariablesInAllowedPositionRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/LoneSchemaDefinitionRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueOperationTypesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueTypeNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueEnumValueNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/UniqueDirectiveNamesRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/PossibleTypeExtensionsRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs");
/* harmony import */ var _validation_index_mjs__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./validation/index.mjs */ "../../graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs");
/* harmony import */ var _error_index_mjs__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./error/index.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _error_index_mjs__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./error/index.mjs */ "../../graphql/error/syntaxError.mjs");
/* harmony import */ var _error_index_mjs__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./error/index.mjs */ "../../graphql/error/locatedError.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/getIntrospectionQuery.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/getOperationAST.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/getOperationRootType.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/introspectionFromSchema.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/buildClientSchema.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/buildASTSchema.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/extendSchema.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/lexicographicSortSchema.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/printSchema.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/typeFromAST.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/valueFromAST.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/valueFromASTUntyped.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/astFromValue.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/TypeInfo.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/coerceInputValue.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/concatAST.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/separateOperations.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/stripIgnoredCharacters.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/typeComparators.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/assertValidName.mjs");
/* harmony import */ var _utilities_index_mjs__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./utilities/index.mjs */ "../../graphql/utilities/findBreakingChanges.mjs");
/**
 * GraphQL.js provides a reference implementation for the GraphQL specification
 * but is also a useful utility for operating on GraphQL files and building
 * sophisticated tools.
 *
 * This primary module exports a general purpose function for fulfilling all
 * steps of the GraphQL specification in a single operation, but also includes
 * utilities for every part of the GraphQL specification:
 *
 *   - Parsing the GraphQL language.
 *   - Building a GraphQL type schema.
 *   - Validating a GraphQL request against a type schema.
 *   - Executing a GraphQL request against a type schema.
 *
 * This also includes utility functions for operating on GraphQL types and
 * GraphQL documents to facilitate building tools.
 *
 * You may also import from each sub-directory directly. For example, the
 * following two import statements are equivalent:
 *
 * ```ts
 * import { parse } from 'graphql';
 * import { parse } from 'graphql/language';
 * ```
 *
 * @packageDocumentation
 */
// The GraphQL.js version info.
 // The primary entry point into fulfilling a GraphQL request.

 // Create and operate on GraphQL type definitions and schema.


// Parse and operate on GraphQL language source files.

// Execute GraphQL queries.

// Validate GraphQL documents.

// Create, format, and print GraphQL errors.

// Utilities for operating on GraphQL type schema and parsed sources.



/***/ }),

/***/ "../../graphql/jsutils/Path.mjs":
/*!**************************************!*\
  !*** ../../graphql/jsutils/Path.mjs ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPath": () => (/* binding */ addPath),
/* harmony export */   "pathToArray": () => (/* binding */ pathToArray)
/* harmony export */ });
/**
 * Given a Path and a key, return a new Path containing the new key.
 */
function addPath(prev, key, typename) {
  return {
    prev,
    key,
    typename,
  };
}
/**
 * Given a Path, return an Array of the path keys.
 */

function pathToArray(path) {
  const flattened = [];
  let curr = path;

  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }

  return flattened.reverse();
}


/***/ }),

/***/ "../../graphql/jsutils/devAssert.mjs":
/*!*******************************************!*\
  !*** ../../graphql/jsutils/devAssert.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "devAssert": () => (/* binding */ devAssert)
/* harmony export */ });
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}


/***/ }),

/***/ "../../graphql/jsutils/didYouMean.mjs":
/*!********************************************!*\
  !*** ../../graphql/jsutils/didYouMean.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "didYouMean": () => (/* binding */ didYouMean)
/* harmony export */ });
const MAX_SUGGESTIONS = 5;
/**
 * Given [ A, B, C ] return ' Did you mean A, B, or C?'.
 */

function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestionsArg] = secondArg
    ? [firstArg, secondArg]
    : [undefined, firstArg];
  let message = ' Did you mean ';

  if (subMessage) {
    message += subMessage + ' ';
  }

  const suggestions = suggestionsArg.map((x) => `"${x}"`);

  switch (suggestions.length) {
    case 0:
      return '';

    case 1:
      return message + suggestions[0] + '?';

    case 2:
      return message + suggestions[0] + ' or ' + suggestions[1] + '?';
  }

  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(', ') + ', or ' + lastItem + '?';
}


/***/ }),

/***/ "../../graphql/jsutils/groupBy.mjs":
/*!*****************************************!*\
  !*** ../../graphql/jsutils/groupBy.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "groupBy": () => (/* binding */ groupBy)
/* harmony export */ });
/**
 * Groups array items into a Map, given a function to produce grouping key.
 */
function groupBy(list, keyFn) {
  const result = new Map();

  for (const item of list) {
    const key = keyFn(item);
    const group = result.get(key);

    if (group === undefined) {
      result.set(key, [item]);
    } else {
      group.push(item);
    }
  }

  return result;
}


/***/ }),

/***/ "../../graphql/jsutils/identityFunc.mjs":
/*!**********************************************!*\
  !*** ../../graphql/jsutils/identityFunc.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identityFunc": () => (/* binding */ identityFunc)
/* harmony export */ });
/**
 * Returns the first argument it receives.
 */
function identityFunc(x) {
  return x;
}


/***/ }),

/***/ "../../graphql/jsutils/inspect.mjs":
/*!*****************************************!*\
  !*** ../../graphql/jsutils/inspect.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inspect": () => (/* binding */ inspect)
/* harmony export */ });
const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? `[function ${value.name}]` : '[function]';

    case 'object':
      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  const seenValues = [...previouslySeenValues, value];

  if (isJSONable(value)) {
    const jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string'
        ? jsonValue
        : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function isJSONable(value) {
  return typeof value.toJSON === 'function';
}

function formatObject(object, seenValues) {
  const entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];

  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}


/***/ }),

/***/ "../../graphql/jsutils/instanceOf.mjs":
/*!********************************************!*\
  !*** ../../graphql/jsutils/instanceOf.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "instanceOf": () => (/* binding */ instanceOf)
/* harmony export */ });
/* harmony import */ var _inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inspect.mjs */ "../../graphql/jsutils/inspect.mjs");

/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */

const instanceOf =
  /* c8 ignore next 5 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  process.env.NODE_ENV === 'production'
    ? function instanceOf(value, constructor) {
        return value instanceof constructor;
      }
    : function instanceOf(value, constructor) {
        if (value instanceof constructor) {
          return true;
        }

        if (typeof value === 'object' && value !== null) {
          var _value$constructor;

          // Prefer Symbol.toStringTag since it is immune to minification.
          const className = constructor.prototype[Symbol.toStringTag];
          const valueClassName = // We still need to support constructor's name to detect conflicts with older versions of this library.
            Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
              ? value[Symbol.toStringTag]
              : (_value$constructor = value.constructor) === null ||
                _value$constructor === void 0
              ? void 0
              : _value$constructor.name;

          if (className === valueClassName) {
            const stringifiedValue = (0,_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(value);
            throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }

        return false;
      };


/***/ }),

/***/ "../../graphql/jsutils/invariant.mjs":
/*!*******************************************!*\
  !*** ../../graphql/jsutils/invariant.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invariant": () => (/* binding */ invariant)
/* harmony export */ });
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(
      message != null ? message : 'Unexpected invariant triggered.',
    );
  }
}


/***/ }),

/***/ "../../graphql/jsutils/isAsyncIterable.mjs":
/*!*************************************************!*\
  !*** ../../graphql/jsutils/isAsyncIterable.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAsyncIterable": () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/**
 * Returns true if the provided object implements the AsyncIterator protocol via
 * implementing a `Symbol.asyncIterator` method.
 */
function isAsyncIterable(maybeAsyncIterable) {
  return (
    typeof (maybeAsyncIterable === null || maybeAsyncIterable === void 0
      ? void 0
      : maybeAsyncIterable[Symbol.asyncIterator]) === 'function'
  );
}


/***/ }),

/***/ "../../graphql/jsutils/isIterableObject.mjs":
/*!**************************************************!*\
  !*** ../../graphql/jsutils/isIterableObject.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIterableObject": () => (/* binding */ isIterableObject)
/* harmony export */ });
/**
 * Returns true if the provided object is an Object (i.e. not a string literal)
 * and implements the Iterator protocol.
 *
 * This may be used in place of [Array.isArray()][isArray] to determine if
 * an object should be iterated-over e.g. Array, Map, Set, Int8Array,
 * TypedArray, etc. but excludes string literals.
 *
 * @example
 * ```ts
 * isIterableObject([ 1, 2, 3 ]) // true
 * isIterableObject(new Map()) // true
 * isIterableObject('ABC') // false
 * isIterableObject({ key: 'value' }) // false
 * isIterableObject({ length: 1, 0: 'Alpha' }) // false
 * ```
 */
function isIterableObject(maybeIterable) {
  return (
    typeof maybeIterable === 'object' &&
    typeof (maybeIterable === null || maybeIterable === void 0
      ? void 0
      : maybeIterable[Symbol.iterator]) === 'function'
  );
}


/***/ }),

/***/ "../../graphql/jsutils/isObjectLike.mjs":
/*!**********************************************!*\
  !*** ../../graphql/jsutils/isObjectLike.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObjectLike": () => (/* binding */ isObjectLike)
/* harmony export */ });
/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */
function isObjectLike(value) {
  return typeof value == 'object' && value !== null;
}


/***/ }),

/***/ "../../graphql/jsutils/isPromise.mjs":
/*!*******************************************!*\
  !*** ../../graphql/jsutils/isPromise.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPromise": () => (/* binding */ isPromise)
/* harmony export */ });
/**
 * Returns true if the value acts like a Promise, i.e. has a "then" function,
 * otherwise returns false.
 */
function isPromise(value) {
  return (
    typeof (value === null || value === void 0 ? void 0 : value.then) ===
    'function'
  );
}


/***/ }),

/***/ "../../graphql/jsutils/keyMap.mjs":
/*!****************************************!*\
  !*** ../../graphql/jsutils/keyMap.mjs ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyMap": () => (/* binding */ keyMap)
/* harmony export */ });
/**
 * Creates a keyed JS object from an array, given a function to produce the keys
 * for each value in the array.
 *
 * This provides a convenient lookup for the array items if the key function
 * produces unique results.
 * ```ts
 * const phoneBook = [
 *   { name: 'Jon', num: '555-1234' },
 *   { name: 'Jenny', num: '867-5309' }
 * ]
 *
 * const entriesByName = keyMap(
 *   phoneBook,
 *   entry => entry.name
 * )
 *
 * // {
 * //   Jon: { name: 'Jon', num: '555-1234' },
 * //   Jenny: { name: 'Jenny', num: '867-5309' }
 * // }
 *
 * const jennyEntry = entriesByName['Jenny']
 *
 * // { name: 'Jenny', num: '857-6309' }
 * ```
 */
function keyMap(list, keyFn) {
  const result = Object.create(null);

  for (const item of list) {
    result[keyFn(item)] = item;
  }

  return result;
}


/***/ }),

/***/ "../../graphql/jsutils/keyValMap.mjs":
/*!*******************************************!*\
  !*** ../../graphql/jsutils/keyValMap.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyValMap": () => (/* binding */ keyValMap)
/* harmony export */ });
/**
 * Creates a keyed JS object from an array, given a function to produce the keys
 * and a function to produce the values from each item in the array.
 * ```ts
 * const phoneBook = [
 *   { name: 'Jon', num: '555-1234' },
 *   { name: 'Jenny', num: '867-5309' }
 * ]
 *
 * // { Jon: '555-1234', Jenny: '867-5309' }
 * const phonesByName = keyValMap(
 *   phoneBook,
 *   entry => entry.name,
 *   entry => entry.num
 * )
 * ```
 */
function keyValMap(list, keyFn, valFn) {
  const result = Object.create(null);

  for (const item of list) {
    result[keyFn(item)] = valFn(item);
  }

  return result;
}


/***/ }),

/***/ "../../graphql/jsutils/mapValue.mjs":
/*!******************************************!*\
  !*** ../../graphql/jsutils/mapValue.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapValue": () => (/* binding */ mapValue)
/* harmony export */ });
/**
 * Creates an object map with the same keys as `map` and values generated by
 * running each value of `map` thru `fn`.
 */
function mapValue(map, fn) {
  const result = Object.create(null);

  for (const key of Object.keys(map)) {
    result[key] = fn(map[key], key);
  }

  return result;
}


/***/ }),

/***/ "../../graphql/jsutils/memoize3.mjs":
/*!******************************************!*\
  !*** ../../graphql/jsutils/memoize3.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "memoize3": () => (/* binding */ memoize3)
/* harmony export */ });
/**
 * Memoizes the provided three-argument function.
 */
function memoize3(fn) {
  let cache0;
  return function memoized(a1, a2, a3) {
    if (cache0 === undefined) {
      cache0 = new WeakMap();
    }

    let cache1 = cache0.get(a1);

    if (cache1 === undefined) {
      cache1 = new WeakMap();
      cache0.set(a1, cache1);
    }

    let cache2 = cache1.get(a2);

    if (cache2 === undefined) {
      cache2 = new WeakMap();
      cache1.set(a2, cache2);
    }

    let fnResult = cache2.get(a3);

    if (fnResult === undefined) {
      fnResult = fn(a1, a2, a3);
      cache2.set(a3, fnResult);
    }

    return fnResult;
  };
}


/***/ }),

/***/ "../../graphql/jsutils/naturalCompare.mjs":
/*!************************************************!*\
  !*** ../../graphql/jsutils/naturalCompare.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "naturalCompare": () => (/* binding */ naturalCompare)
/* harmony export */ });
/**
 * Returns a number indicating whether a reference string comes before, or after,
 * or is the same as the given string in natural sort order.
 *
 * See: https://en.wikipedia.org/wiki/Natural_sort_order
 *
 */
function naturalCompare(aStr, bStr) {
  let aIndex = 0;
  let bIndex = 0;

  while (aIndex < aStr.length && bIndex < bStr.length) {
    let aChar = aStr.charCodeAt(aIndex);
    let bChar = bStr.charCodeAt(bIndex);

    if (isDigit(aChar) && isDigit(bChar)) {
      let aNum = 0;

      do {
        ++aIndex;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIndex);
      } while (isDigit(aChar) && aNum > 0);

      let bNum = 0;

      do {
        ++bIndex;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIndex);
      } while (isDigit(bChar) && bNum > 0);

      if (aNum < bNum) {
        return -1;
      }

      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }

      if (aChar > bChar) {
        return 1;
      }

      ++aIndex;
      ++bIndex;
    }
  }

  return aStr.length - bStr.length;
}
const DIGIT_0 = 48;
const DIGIT_9 = 57;

function isDigit(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}


/***/ }),

/***/ "../../graphql/jsutils/printPathArray.mjs":
/*!************************************************!*\
  !*** ../../graphql/jsutils/printPathArray.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printPathArray": () => (/* binding */ printPathArray)
/* harmony export */ });
/**
 * Build a string describing the path.
 */
function printPathArray(path) {
  return path
    .map((key) =>
      typeof key === 'number' ? '[' + key.toString() + ']' : '.' + key,
    )
    .join('');
}


/***/ }),

/***/ "../../graphql/jsutils/promiseForObject.mjs":
/*!**************************************************!*\
  !*** ../../graphql/jsutils/promiseForObject.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "promiseForObject": () => (/* binding */ promiseForObject)
/* harmony export */ });
/**
 * This function transforms a JS object `ObjMap<Promise<T>>` into
 * a `Promise<ObjMap<T>>`
 *
 * This is akin to bluebird's `Promise.props`, but implemented only using
 * `Promise.all` so it will work with any implementation of ES6 promises.
 */
function promiseForObject(object) {
  return Promise.all(Object.values(object)).then((resolvedValues) => {
    const resolvedObject = Object.create(null);

    for (const [i, key] of Object.keys(object).entries()) {
      resolvedObject[key] = resolvedValues[i];
    }

    return resolvedObject;
  });
}


/***/ }),

/***/ "../../graphql/jsutils/promiseReduce.mjs":
/*!***********************************************!*\
  !*** ../../graphql/jsutils/promiseReduce.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "promiseReduce": () => (/* binding */ promiseReduce)
/* harmony export */ });
/* harmony import */ var _isPromise_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isPromise.mjs */ "../../graphql/jsutils/isPromise.mjs");


/**
 * Similar to Array.prototype.reduce(), however the reducing callback may return
 * a Promise, in which case reduction will continue after each promise resolves.
 *
 * If the callback does not return a Promise, then this function will also not
 * return a Promise.
 */
function promiseReduce(values, callbackFn, initialValue) {
  let accumulator = initialValue;

  for (const value of values) {
    accumulator = (0,_isPromise_mjs__WEBPACK_IMPORTED_MODULE_0__.isPromise)(accumulator)
      ? accumulator.then((resolved) => callbackFn(resolved, value))
      : callbackFn(accumulator, value);
  }

  return accumulator;
}


/***/ }),

/***/ "../../graphql/jsutils/suggestionList.mjs":
/*!************************************************!*\
  !*** ../../graphql/jsutils/suggestionList.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "suggestionList": () => (/* binding */ suggestionList)
/* harmony export */ });
/* harmony import */ var _naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./naturalCompare.mjs */ "../../graphql/jsutils/naturalCompare.mjs");

/**
 * Given an invalid input string and a list of valid options, returns a filtered
 * list of valid options sorted based on their similarity with the input.
 */

function suggestionList(input, options) {
  const optionsByDistance = Object.create(null);
  const lexicalDistance = new LexicalDistance(input);
  const threshold = Math.floor(input.length * 0.4) + 1;

  for (const option of options) {
    const distance = lexicalDistance.measure(option, threshold);

    if (distance !== undefined) {
      optionsByDistance[option] = distance;
    }
  }

  return Object.keys(optionsByDistance).sort((a, b) => {
    const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : (0,_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_0__.naturalCompare)(a, b);
  });
}
/**
 * Computes the lexical distance between strings A and B.
 *
 * The "distance" between two strings is given by counting the minimum number
 * of edits needed to transform string A into string B. An edit can be an
 * insertion, deletion, or substitution of a single character, or a swap of two
 * adjacent characters.
 *
 * Includes a custom alteration from Damerau-Levenshtein to treat case changes
 * as a single edit which helps identify mis-cased values with an edit distance
 * of 1.
 *
 * This distance can be useful for detecting typos in input or sorting
 */

class LexicalDistance {
  constructor(input) {
    this._input = input;
    this._inputLowerCase = input.toLowerCase();
    this._inputArray = stringToArray(this._inputLowerCase);
    this._rows = [
      new Array(input.length + 1).fill(0),
      new Array(input.length + 1).fill(0),
      new Array(input.length + 1).fill(0),
    ];
  }

  measure(option, threshold) {
    if (this._input === option) {
      return 0;
    }

    const optionLowerCase = option.toLowerCase(); // Any case change counts as a single edit

    if (this._inputLowerCase === optionLowerCase) {
      return 1;
    }

    let a = stringToArray(optionLowerCase);
    let b = this._inputArray;

    if (a.length < b.length) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    const aLength = a.length;
    const bLength = b.length;

    if (aLength - bLength > threshold) {
      return undefined;
    }

    const rows = this._rows;

    for (let j = 0; j <= bLength; j++) {
      rows[0][j] = j;
    }

    for (let i = 1; i <= aLength; i++) {
      const upRow = rows[(i - 1) % 3];
      const currentRow = rows[i % 3];
      let smallestCell = (currentRow[0] = i);

      for (let j = 1; j <= bLength; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let currentCell = Math.min(
          upRow[j] + 1, // delete
          currentRow[j - 1] + 1, // insert
          upRow[j - 1] + cost, // substitute
        );

        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          // transposition
          const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
          currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
        }

        if (currentCell < smallestCell) {
          smallestCell = currentCell;
        }

        currentRow[j] = currentCell;
      } // Early exit, since distance can't go smaller than smallest element of the previous row.

      if (smallestCell > threshold) {
        return undefined;
      }
    }

    const distance = rows[aLength % 3][bLength];
    return distance <= threshold ? distance : undefined;
  }
}

function stringToArray(str) {
  const strLength = str.length;
  const array = new Array(strLength);

  for (let i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }

  return array;
}


/***/ }),

/***/ "../../graphql/jsutils/toError.mjs":
/*!*****************************************!*\
  !*** ../../graphql/jsutils/toError.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toError": () => (/* binding */ toError)
/* harmony export */ });
/* harmony import */ var _inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inspect.mjs */ "../../graphql/jsutils/inspect.mjs");

/**
 * Sometimes a non-error is thrown, wrap it as an Error instance to ensure a consistent Error interface.
 */

function toError(thrownValue) {
  return thrownValue instanceof Error
    ? thrownValue
    : new NonErrorThrown(thrownValue);
}

class NonErrorThrown extends Error {
  constructor(thrownValue) {
    super('Unexpected error value: ' + (0,_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(thrownValue));
    this.name = 'NonErrorThrown';
    this.thrownValue = thrownValue;
  }
}


/***/ }),

/***/ "../../graphql/jsutils/toObjMap.mjs":
/*!******************************************!*\
  !*** ../../graphql/jsutils/toObjMap.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toObjMap": () => (/* binding */ toObjMap)
/* harmony export */ });
function toObjMap(obj) {
  if (obj == null) {
    return Object.create(null);
  }

  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }

  const map = Object.create(null);

  for (const [key, value] of Object.entries(obj)) {
    map[key] = value;
  }

  return map;
}


/***/ }),

/***/ "../../graphql/language/ast.mjs":
/*!**************************************!*\
  !*** ../../graphql/language/ast.mjs ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Location": () => (/* binding */ Location),
/* harmony export */   "Token": () => (/* binding */ Token),
/* harmony export */   "QueryDocumentKeys": () => (/* binding */ QueryDocumentKeys),
/* harmony export */   "isNode": () => (/* binding */ isNode),
/* harmony export */   "OperationTypeNode": () => (/* binding */ OperationTypeNode)
/* harmony export */ });
/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
class Location {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  get [Symbol.toStringTag]() {
    return 'Location';
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

class Token {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  get [Symbol.toStringTag]() {
    return 'Token';
  }

  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
/**
 * The list of all possible AST node types.
 */

/**
 * @internal
 */
const QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: [
    'name',
    'variableDefinitions',
    'directives',
    'selectionSet',
  ],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: [
    'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    'variableDefinitions',
    'typeCondition',
    'directives',
    'selectionSet',
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: [
    'description',
    'name',
    'type',
    'defaultValue',
    'directives',
  ],
  InterfaceTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  const maybeKind =
    maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */

let OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));


/***/ }),

/***/ "../../graphql/language/blockString.mjs":
/*!**********************************************!*\
  !*** ../../graphql/language/blockString.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dedentBlockStringLines": () => (/* binding */ dedentBlockStringLines),
/* harmony export */   "isPrintableAsBlockString": () => (/* binding */ isPrintableAsBlockString),
/* harmony export */   "printBlockString": () => (/* binding */ printBlockString)
/* harmony export */ });
/* harmony import */ var _characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characterClasses.mjs */ "../../graphql/language/characterClasses.mjs");

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */

function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;

  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    const line = lines[i];
    const indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine =
      (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
      _firstNonEmptyLine !== void 0
        ? _firstNonEmptyLine
        : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
    .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
    .slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
        _firstNonEmptyLine2 !== void 0
        ? _firstNonEmptyLine2
        : 0,
      lastNonEmptyLine + 1,
    );
}

function leadingWhitespace(str) {
  let i = 0;

  while (i < str.length && (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * @internal
 */

function isPrintableAsBlockString(value) {
  if (value === '') {
    return true; // empty string is printable
  }

  let isEmptyLine = true;
  let hasIndent = false;
  let hasCommonIndent = true;
  let seenNonEmptyLine = false;

  for (let i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0x0000:
      case 0x0001:
      case 0x0002:
      case 0x0003:
      case 0x0004:
      case 0x0005:
      case 0x0006:
      case 0x0007:
      case 0x0008:
      case 0x000b:
      case 0x000c:
      case 0x000e:
      case 0x000f:
        return false;
      // Has non-printable characters

      case 0x000d:
        //  \r
        return false;
      // Has \r or \r\n which will be replaced as \n

      case 10:
        //  \n
        if (isEmptyLine && !seenNonEmptyLine) {
          return false; // Has leading new line
        }

        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        hasIndent || (hasIndent = isEmptyLine);
        break;

      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }

  if (isEmptyLine) {
    return false; // Has trailing empty lines
  }

  if (hasCommonIndent && seenNonEmptyLine) {
    return false; // Has internal indent
  }

  return true;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  const forceLeadingNewLine =
    lines.length > 1 &&
    lines
      .slice(1)
      .every((line) => line.length === 0 || (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith('\\');
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines =
    !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine ||
      value.length > 70 ||
      forceTrailingNewline ||
      forceLeadingNewLine ||
      hasTrailingTripleQuotes);
  let result = ''; // Format a multi-line block quote to account for leading space.

  const skipLeadingNewLine = isSingleLine && (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(value.charCodeAt(0));

  if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}


/***/ }),

/***/ "../../graphql/language/characterClasses.mjs":
/*!***************************************************!*\
  !*** ../../graphql/language/characterClasses.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWhiteSpace": () => (/* binding */ isWhiteSpace),
/* harmony export */   "isDigit": () => (/* binding */ isDigit),
/* harmony export */   "isLetter": () => (/* binding */ isLetter),
/* harmony export */   "isNameStart": () => (/* binding */ isNameStart),
/* harmony export */   "isNameContinue": () => (/* binding */ isNameContinue)
/* harmony export */ });
/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */

function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */

function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */

function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */

function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}


/***/ }),

/***/ "../../graphql/language/directiveLocation.mjs":
/*!****************************************************!*\
  !*** ../../graphql/language/directiveLocation.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DirectiveLocation": () => (/* binding */ DirectiveLocation)
/* harmony export */ });
/**
 * The set of allowed directive location values.
 */
let DirectiveLocation;
/**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */

(function (DirectiveLocation) {
  DirectiveLocation['QUERY'] = 'QUERY';
  DirectiveLocation['MUTATION'] = 'MUTATION';
  DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
  DirectiveLocation['FIELD'] = 'FIELD';
  DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
  DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
  DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
  DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
  DirectiveLocation['SCHEMA'] = 'SCHEMA';
  DirectiveLocation['SCALAR'] = 'SCALAR';
  DirectiveLocation['OBJECT'] = 'OBJECT';
  DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
  DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
  DirectiveLocation['INTERFACE'] = 'INTERFACE';
  DirectiveLocation['UNION'] = 'UNION';
  DirectiveLocation['ENUM'] = 'ENUM';
  DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
  DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
  DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation || (DirectiveLocation = {}));


/***/ }),

/***/ "../../graphql/language/kinds.mjs":
/*!****************************************!*\
  !*** ../../graphql/language/kinds.mjs ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kind": () => (/* binding */ Kind)
/* harmony export */ });
/**
 * The set of allowed kind values for AST nodes.
 */
let Kind;
/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));


/***/ }),

/***/ "../../graphql/language/lexer.mjs":
/*!****************************************!*\
  !*** ../../graphql/language/lexer.mjs ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lexer": () => (/* binding */ Lexer),
/* harmony export */   "isPunctuatorTokenKind": () => (/* binding */ isPunctuatorTokenKind)
/* harmony export */ });
/* harmony import */ var _error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/syntaxError.mjs */ "../../graphql/error/syntaxError.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blockString.mjs */ "../../graphql/language/blockString.mjs");
/* harmony import */ var _characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./characterClasses.mjs */ "../../graphql/language/characterClasses.mjs");
/* harmony import */ var _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokenKind.mjs */ "../../graphql/language/tokenKind.mjs");





/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

class Lexer {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new _ast_mjs__WEBPACK_IMPORTED_MODULE_0__.Token(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Lexer';
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */

  advance() {
    this.lastToken = this.token;
    const token = (this.token = this.lookahead());
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */

  lookahead() {
    let token = this.token;

    if (token.kind !== _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          // Read the next token and form a link in the token linked-list.
          const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

          token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.COMMENT);
    }

    return token;
  }
}
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return (
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BANG ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.DOLLAR ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.AMP ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.PAREN_L ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.PAREN_R ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.SPREAD ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.COLON ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.EQUALS ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.AT ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACKET_L ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACKET_R ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACE_L ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.PIPE ||
    kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACE_R
  );
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */

function isUnicodeScalarValue(code) {
  return (
    (code >= 0x0000 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0x10ffff)
  );
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */

function isSupplementaryCodePoint(body, location) {
  return (
    isLeadingSurrogate(body.charCodeAt(location)) &&
    isTrailingSurrogate(body.charCodeAt(location + 1))
  );
}

function isLeadingSurrogate(code) {
  return code >= 0xd800 && code <= 0xdbff;
}

function isTrailingSurrogate(code) {
  return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */

function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);

  if (code === undefined) {
    return _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.EOF;
  } else if (code >= 0x0020 && code <= 0x007e) {
    // Printable ASCII
    const char = String.fromCodePoint(code);
    return char === '"' ? "'\"'" : `"${char}"`;
  } // Unicode code point

  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */

function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new _ast_mjs__WEBPACK_IMPORTED_MODULE_0__.Token(kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */

function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // SourceCharacter

    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 0xfeff: // <BOM>

      case 0x0009: // \t

      case 0x0020: // <space>

      case 0x002c:
        // ,
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"

      case 0x000a:
        // \n
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;

      case 0x000d:
        // \r
        if (body.charCodeAt(position + 1) === 0x000a) {
          position += 2;
        } else {
          ++position;
        }

        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment

      case 0x0023:
        // #
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

      case 0x0021:
        // !
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BANG, position, position + 1);

      case 0x0024:
        // $
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.DOLLAR, position, position + 1);

      case 0x0026:
        // &
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.AMP, position, position + 1);

      case 0x0028:
        // (
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.PAREN_L, position, position + 1);

      case 0x0029:
        // )
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.PAREN_R, position, position + 1);

      case 0x002e:
        // .
        if (
          body.charCodeAt(position + 1) === 0x002e &&
          body.charCodeAt(position + 2) === 0x002e
        ) {
          return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.SPREAD, position, position + 3);
        }

        break;

      case 0x003a:
        // :
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.COLON, position, position + 1);

      case 0x003d:
        // =
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.EQUALS, position, position + 1);

      case 0x0040:
        // @
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.AT, position, position + 1);

      case 0x005b:
        // [
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACKET_L, position, position + 1);

      case 0x005d:
        // ]
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACKET_R, position, position + 1);

      case 0x007b:
        // {
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACE_L, position, position + 1);

      case 0x007c:
        // |
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.PIPE, position, position + 1);

      case 0x007d:
        // }
        return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BRACE_R, position, position + 1);
      // StringValue

      case 0x0022:
        // "
        if (
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022
        ) {
          return readBlockString(lexer, position);
        }

        return readString(lexer, position);
    } // IntValue | FloatValue (Digit | -)

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isDigit)(code) || code === 0x002d) {
      return readNumber(lexer, position, code);
    } // Name

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isNameStart)(code)) {
      return readName(lexer, position);
    }

    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
      lexer.source,
      position,
      code === 0x0027
        ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?'
        : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position)
        ? `Unexpected character: ${printCodePointAt(lexer, position)}.`
        : `Invalid character: ${printCodePointAt(lexer, position)}.`,
    );
  }

  return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */

function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position),
  );
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */

function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false; // NegativeSign (-)

  if (code === 0x002d) {
    code = body.charCodeAt(++position);
  } // Zero (0)

  if (code === 0x0030) {
    code = body.charCodeAt(++position);

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isDigit)(code)) {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Full stop (.)

  if (code === 0x002e) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // E e

  if (code === 0x0045 || code === 0x0065) {
    isFloat = true;
    code = body.charCodeAt(++position); // + -

    if (code === 0x002b || code === 0x002d) {
      code = body.charCodeAt(++position);
    }

    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart

  if (code === 0x002e || (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isNameStart)(code)) {
    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position,
      )}.`,
    );
  }

  return createToken(
    lexer,
    isFloat ? _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.FLOAT : _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.INT,
    start,
    position,
    body.slice(start, position),
  );
}
/**
 * Returns the new position in the source after reading one or more digits.
 */

function readDigits(lexer, start, firstCode) {
  if (!(0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isDigit)(firstCode)) {
    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start,
      )}.`,
    );
  }

  const body = lexer.source.body;
  let position = start + 1; // +1 to skip first firstCode

  while ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isDigit)(body.charCodeAt(position))) {
    ++position;
  }

  return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */

function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = '';

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Quote (")

    if (code === 0x0022) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.STRING, start, position + 1, value);
    } // Escape Sequence (\)

    if (code === 0x005c) {
      value += body.slice(chunkStart, position);
      const escape =
        body.charCodeAt(position + 1) === 0x0075 // u
          ? body.charCodeAt(position + 2) === 0x007b // {
            ? readEscapedUnicodeVariableWidth(lexer, position)
            : readEscapedUnicodeFixedWidth(lexer, position)
          : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    } // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.

function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3; // Cannot be larger than 12 chars (\u{00000000}).

  while (size < 12) {
    const code = body.charCodeAt(position + size++); // Closing Brace (})

    if (code === 0x007d) {
      // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }

      return {
        value: String.fromCodePoint(point),
        size,
      };
    } // Append this hex digit to the code point.

    point = (point << 4) | readHexDigit(code);

    if (point < 0) {
      break;
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size,
    )}".`,
  );
}

function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);

  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6,
    };
  } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
  // a valid pair is formed.

  if (isLeadingSurrogate(code)) {
    // \u
    if (
      body.charCodeAt(position + 6) === 0x005c &&
      body.charCodeAt(position + 7) === 0x0075
    ) {
      const trailingCode = read16BitHexCode(body, position + 8);

      if (isTrailingSurrogate(trailingCode)) {
        // JavaScript defines strings as a sequence of UTF-16 code units and
        // encodes Unicode code points above U+FFFF using a surrogate pair of
        // code units. Since this is a surrogate pair escape sequence, just
        // include both codes into the JavaScript string value. Had JavaScript
        // not been internally based on UTF-16, then this surrogate pair would
        // be decoded to retrieve the supplementary code point.
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12,
        };
      }
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`,
  );
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */

function read16BitHexCode(body, position) {
  // readHexDigit() returns -1 on error. ORing a negative value with any other
  // value always produces a negative value.
  return (
    (readHexDigit(body.charCodeAt(position)) << 12) |
    (readHexDigit(body.charCodeAt(position + 1)) << 8) |
    (readHexDigit(body.charCodeAt(position + 2)) << 4) |
    readHexDigit(body.charCodeAt(position + 3))
  );
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */

function readHexDigit(code) {
  return code >= 0x0030 && code <= 0x0039 // 0-9
    ? code - 0x0030
    : code >= 0x0041 && code <= 0x0046 // A-F
    ? code - 0x0037
    : code >= 0x0061 && code <= 0x0066 // a-f
    ? code - 0x0057
    : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */

function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);

  switch (code) {
    case 0x0022:
      // "
      return {
        value: '\u0022',
        size: 2,
      };

    case 0x005c:
      // \
      return {
        value: '\u005c',
        size: 2,
      };

    case 0x002f:
      // /
      return {
        value: '\u002f',
        size: 2,
      };

    case 0x0062:
      // b
      return {
        value: '\u0008',
        size: 2,
      };

    case 0x0066:
      // f
      return {
        value: '\u000c',
        size: 2,
      };

    case 0x006e:
      // n
      return {
        value: '\u000a',
        size: 2,
      };

    case 0x0072:
      // r
      return {
        value: '\u000d',
        size: 2,
      };

    case 0x0074:
      // t
      return {
        value: '\u0009',
        size: 2,
      };
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2,
    )}".`,
  );
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */

function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = '';
  const blockLines = [];

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Triple-Quote (""")

    if (
      code === 0x0022 &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.BLOCK_STRING,
        start,
        position + 3, // Return a string of the lines joined with U+000A.
        (0,_blockString_mjs__WEBPACK_IMPORTED_MODULE_4__.dedentBlockStringLines)(blockLines).join('\n'),
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    } // Escaped Triple-Quote (\""")

    if (
      code === 0x005c &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022 &&
      body.charCodeAt(position + 3) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1; // skip only slash

      position += 4;
      continue;
    } // LineTerminator

    if (code === 0x000a || code === 0x000d) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);

      if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
        position += 2;
      } else {
        ++position;
      }

      currentLine = '';
      chunkStart = position;
      lineStart = position;
      continue;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_3__.syntaxError)(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */

function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position);

    if ((0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isNameContinue)(code)) {
      ++position;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_1__.TokenKind.NAME,
    start,
    position,
    body.slice(start, position),
  );
}


/***/ }),

/***/ "../../graphql/language/location.mjs":
/*!*******************************************!*\
  !*** ../../graphql/language/location.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocation": () => (/* binding */ getLocation)
/* harmony export */ });
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");

const LineRegExp = /\r\n|[\n\r]/g;
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;

  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === 'number' || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(false);

    if (match.index >= position) {
      break;
    }

    lastLineStart = match.index + match[0].length;
    line += 1;
  }

  return {
    line,
    column: position + 1 - lastLineStart,
  };
}


/***/ }),

/***/ "../../graphql/language/parser.mjs":
/*!*****************************************!*\
  !*** ../../graphql/language/parser.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "parseValue": () => (/* binding */ parseValue),
/* harmony export */   "parseConstValue": () => (/* binding */ parseConstValue),
/* harmony export */   "parseType": () => (/* binding */ parseType),
/* harmony export */   "Parser": () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var _error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/syntaxError.mjs */ "../../graphql/error/syntaxError.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directiveLocation.mjs */ "../../graphql/language/directiveLocation.mjs");
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _lexer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lexer.mjs */ "../../graphql/language/lexer.mjs");
/* harmony import */ var _source_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./source.mjs */ "../../graphql/language/source.mjs");
/* harmony import */ var _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenKind.mjs */ "../../graphql/language/tokenKind.mjs");







/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */

function parseValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.SOF);
  const value = parser.parseValueLiteral(false);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EOF);
  return value;
}
/**
 * Similar to parseValue(), but raises a parse error if it encounters a
 * variable. The return type will be a constant value.
 */

function parseConstValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.SOF);
  const value = parser.parseConstValueLiteral();
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */

function parseType(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.SOF);
  const type = parser.parseTypeReference();
  parser.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EOF);
  return type;
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

class Parser {
  constructor(source, options) {
    const sourceObj = (0,_source_mjs__WEBPACK_IMPORTED_MODULE_1__.isSource)(source) ? source : new _source_mjs__WEBPACK_IMPORTED_MODULE_1__.Source(source);
    this._lexer = new _lexer_mjs__WEBPACK_IMPORTED_MODULE_2__.Lexer(sourceObj);
    this._options = options;
  }
  /**
   * Converts a name lex token into a name parse node.
   */

  parseName() {
    const token = this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME);
    return this.node(token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NAME,
      value: token.value,
    });
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */

  parseDocument() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.DOCUMENT,
      definitions: this.many(
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.SOF,
        this.parseDefinition,
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EOF,
      ),
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */

  parseDefinition() {
    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } // Many definitions begin with a description and require a lookahead.

    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription
      ? this._lexer.lookahead()
      : this._lexer.token;

    if (keywordToken.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }

      if (hasDescription) {
        throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__.syntaxError)(
          this._lexer.source,
          this._lexer.token.start,
          'Unexpected description, descriptions are supported only on type definitions.',
        );
      }

      switch (keywordToken.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    }

    throw this.unexpected(keywordToken);
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */

  parseOperationDefinition() {
    const start = this._lexer.token;

    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OPERATION_DEFINITION,
        operation: _ast_mjs__WEBPACK_IMPORTED_MODULE_5__.OperationTypeNode.QUERY,
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
      });
    }

    const operation = this.parseOperationType();
    let name;

    if (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME)) {
      name = this.parseName();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */

  parseOperationType() {
    const operationToken = this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return _ast_mjs__WEBPACK_IMPORTED_MODULE_5__.OperationTypeNode.QUERY;

      case 'mutation':
        return _ast_mjs__WEBPACK_IMPORTED_MODULE_5__.OperationTypeNode.MUTATION;

      case 'subscription':
        return _ast_mjs__WEBPACK_IMPORTED_MODULE_5__.OperationTypeNode.SUBSCRIPTION;
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */

  parseVariableDefinitions() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PAREN_L,
      this.parseVariableDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PAREN_R,
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */

  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EQUALS)
        ? this.parseConstValueLiteral()
        : undefined,
      directives: this.parseConstDirectives(),
    });
  }
  /**
   * Variable : $ Name
   */

  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.DOLLAR);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.VARIABLE,
      name: this.parseName(),
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */

  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SELECTION_SET,
      selections: this.many(
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L,
        this.parseSelection,
        _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R,
      ),
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */

  parseSelection() {
    return this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.SPREAD)
      ? this.parseFragment()
      : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */

  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L)
        ? this.parseSelectionSet()
        : undefined,
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */

  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PAREN_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */

  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst),
    });
  }

  parseConstArgument() {
    return this.parseArgument(true);
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */

  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME)) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
      });
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */

  parseFragmentDefinition() {
    var _this$_options;

    const start = this._lexer.token;
    this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (
      ((_this$_options = this._options) === null || _this$_options === void 0
        ? void 0
        : _this$_options.allowLegacyFragmentVariables) === true
    ) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
      });
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentName : Name but not `on`
   */

  parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseValueLiteral(isConst) {
    const token = this._lexer.token;

    switch (token.kind) {
      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.INT:
        this._lexer.advance();

        return this.node(token, {
          kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INT,
          value: token.value,
        });

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.FLOAT:
        this._lexer.advance();

        return this.node(token, {
          kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FLOAT,
          value: token.value,
        });

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.STRING:
      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME:
        this._lexer.advance();

        switch (token.value) {
          case 'true':
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.BOOLEAN,
              value: true,
            });

          case 'false':
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.BOOLEAN,
              value: false,
            });

          case 'null':
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NULL,
            });

          default:
            return this.node(token, {
              kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM,
              value: token.value,
            });
        }

      case _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.DOLLAR);

          if (this._lexer.token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__.syntaxError)(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`,
            );
          } else {
            throw this.unexpected(token);
          }
        }

        return this.parseVariable();

      default:
        throw this.unexpected();
    }
  }

  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }

  parseStringLiteral() {
    const token = this._lexer.token;

    this._lexer.advance();

    return this.node(token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.STRING,
      value: token.value,
      block: token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BLOCK_STRING,
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */

  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);

    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.LIST,
      values: this.any(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACKET_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACKET_R),
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */

  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);

    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT,
      fields: this.any(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L, item, _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R),
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */

  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
    });
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */

  parseDirectives(isConst) {
    const directives = [];

    while (this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }

  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */

  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.AT);
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
    });
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */

  parseTypeReference() {
    const start = this._lexer.token;
    let type;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.LIST_TYPE,
        type: innerType,
      });
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BANG)) {
      return this.node(start, {
        kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NON_NULL_TYPE,
        type,
      });
    }

    return type;
  }
  /**
   * NamedType : Name
   */

  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.NAMED_TYPE,
      name: this.parseName(),
    });
  } // Implements the parsing rules in the Type Definition section.

  peekDescription() {
    return this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.STRING) || this.peek(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */

  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */

  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R,
    );
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */

  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */

  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */

  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */

  parseImplementsInterfaces() {
    return this.expectOptionalKeyword('implements')
      ? this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.AMP, this.parseNamedType)
      : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */

  parseFieldsDefinition() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L,
      this.parseFieldDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R,
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */

  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */

  parseArgumentDefs() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PAREN_L,
      this.parseInputValueDef,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PAREN_R,
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */

  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;

    if (this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }

    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */

  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */

  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */

  parseUnionMemberTypes() {
    return this.expectOptionalToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.EQUALS)
      ? this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PIPE, this.parseNamedType)
      : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */

  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */

  parseEnumValuesDefinition() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R,
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */

  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseEnumValueName() {
    if (
      this._lexer.token.value === 'true' ||
      this._lexer.token.value === 'false' ||
      this._lexer.token.value === 'null'
    ) {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__.syntaxError)(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token,
        )} is reserved and cannot be used for an enum value.`,
      );
    }

    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */

  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */

  parseInputFieldsDefinition() {
    return this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L,
      this.parseInputValueDef,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R,
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */

  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */

  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.BRACE_R,
    );

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */

  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */

  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */

  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */

  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */

  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */

  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */

  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: _kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */

  parseDirectiveLocations() {
    return this.delimitedMany(_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */

  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();

    if (Object.prototype.hasOwnProperty.call(_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_6__.DirectiveLocation, name.value)) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */

  node(startToken, node) {
    var _this$_options2;

    if (
      ((_this$_options2 = this._options) === null || _this$_options2 === void 0
        ? void 0
        : _this$_options2.noLocation) !== true
    ) {
      node.loc = new _ast_mjs__WEBPACK_IMPORTED_MODULE_5__.Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source,
      );
    }

    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */

  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__.syntaxError)(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`,
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return true;
    }

    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__.syntaxError)(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`,
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === _tokenKind_mjs__WEBPACK_IMPORTED_MODULE_0__.TokenKind.NAME && token.value === value) {
      this._lexer.advance();

      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */

  unexpected(atToken) {
    const token =
      atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return (0,_error_syntaxError_mjs__WEBPACK_IMPORTED_MODULE_4__.syntaxError)(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`,
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */

  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  }
}
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */

function getTokenKindDesc(kind) {
  return (0,_lexer_mjs__WEBPACK_IMPORTED_MODULE_2__.isPunctuatorTokenKind)(kind) ? `"${kind}"` : kind;
}


/***/ }),

/***/ "../../graphql/language/predicates.mjs":
/*!*********************************************!*\
  !*** ../../graphql/language/predicates.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDefinitionNode": () => (/* binding */ isDefinitionNode),
/* harmony export */   "isExecutableDefinitionNode": () => (/* binding */ isExecutableDefinitionNode),
/* harmony export */   "isSelectionNode": () => (/* binding */ isSelectionNode),
/* harmony export */   "isValueNode": () => (/* binding */ isValueNode),
/* harmony export */   "isConstValueNode": () => (/* binding */ isConstValueNode),
/* harmony export */   "isTypeNode": () => (/* binding */ isTypeNode),
/* harmony export */   "isTypeSystemDefinitionNode": () => (/* binding */ isTypeSystemDefinitionNode),
/* harmony export */   "isTypeDefinitionNode": () => (/* binding */ isTypeDefinitionNode),
/* harmony export */   "isTypeSystemExtensionNode": () => (/* binding */ isTypeSystemExtensionNode),
/* harmony export */   "isTypeExtensionNode": () => (/* binding */ isTypeExtensionNode)
/* harmony export */ });
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kinds.mjs */ "../../graphql/language/kinds.mjs");

function isDefinitionNode(node) {
  return (
    isExecutableDefinitionNode(node) ||
    isTypeSystemDefinitionNode(node) ||
    isTypeSystemExtensionNode(node)
  );
}
function isExecutableDefinitionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OPERATION_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_DEFINITION
  );
}
function isSelectionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FIELD ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_SPREAD ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INLINE_FRAGMENT
  );
}
function isValueNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INT ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FLOAT ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.STRING ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.BOOLEAN ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NULL ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT
  );
}
function isConstValueNode(node) {
  return (
    isValueNode(node) &&
    (node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST
      ? node.values.some(isConstValueNode)
      : node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT
      ? node.fields.some((field) => isConstValueNode(field.value))
      : node.kind !== _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE)
  );
}
function isTypeNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NAMED_TYPE ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST_TYPE ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NON_NULL_TYPE
  );
}
function isTypeSystemDefinitionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCHEMA_DEFINITION ||
    isTypeDefinitionNode(node) ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.DIRECTIVE_DEFINITION
  );
}
function isTypeDefinitionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCALAR_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INTERFACE_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.UNION_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INPUT_OBJECT_TYPE_DEFINITION
  );
}
function isTypeSystemExtensionNode(node) {
  return node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCALAR_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INTERFACE_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.UNION_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INPUT_OBJECT_TYPE_EXTENSION
  );
}


/***/ }),

/***/ "../../graphql/language/printLocation.mjs":
/*!************************************************!*\
  !*** ../../graphql/language/printLocation.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printLocation": () => (/* binding */ printLocation),
/* harmony export */   "printSourceLocation": () => (/* binding */ printSourceLocation)
/* harmony export */ });
/* harmony import */ var _location_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location.mjs */ "../../graphql/language/location.mjs");


/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
function printLocation(location) {
  return printSourceLocation(
    location.source,
    (0,_location_mjs__WEBPACK_IMPORTED_MODULE_0__.getLocation)(location.source, location.start),
  );
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = ''.padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];

    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return (
      locationStr +
      printPrefixedLines([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ['|', subLine]),
        ['|', '^'.padStart(subLineColumnNum)],
        ['|', subLines[subLineIndex + 1]],
      ])
    );
  }

  return (
    locationStr +
    printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ['|', '^'.padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]],
    ])
  );
}

function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== undefined);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines
    .map(([prefix, line]) => prefix.padStart(padLen) + (line ? ' ' + line : ''))
    .join('\n');
}


/***/ }),

/***/ "../../graphql/language/printString.mjs":
/*!**********************************************!*\
  !*** ../../graphql/language/printString.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printString": () => (/* binding */ printString)
/* harmony export */ });
/**
 * Prints a string as a GraphQL StringValue literal. Replaces control characters
 * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
 */
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
} // eslint-disable-next-line no-control-regex

const escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
} // prettier-ignore

const escapeSequences = [
  '\\u0000',
  '\\u0001',
  '\\u0002',
  '\\u0003',
  '\\u0004',
  '\\u0005',
  '\\u0006',
  '\\u0007',
  '\\b',
  '\\t',
  '\\n',
  '\\u000B',
  '\\f',
  '\\r',
  '\\u000E',
  '\\u000F',
  '\\u0010',
  '\\u0011',
  '\\u0012',
  '\\u0013',
  '\\u0014',
  '\\u0015',
  '\\u0016',
  '\\u0017',
  '\\u0018',
  '\\u0019',
  '\\u001A',
  '\\u001B',
  '\\u001C',
  '\\u001D',
  '\\u001E',
  '\\u001F',
  '',
  '',
  '\\"',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 2F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 3F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 4F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\\\',
  '',
  '',
  '', // 5F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 6F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\u007F',
  '\\u0080',
  '\\u0081',
  '\\u0082',
  '\\u0083',
  '\\u0084',
  '\\u0085',
  '\\u0086',
  '\\u0087',
  '\\u0088',
  '\\u0089',
  '\\u008A',
  '\\u008B',
  '\\u008C',
  '\\u008D',
  '\\u008E',
  '\\u008F',
  '\\u0090',
  '\\u0091',
  '\\u0092',
  '\\u0093',
  '\\u0094',
  '\\u0095',
  '\\u0096',
  '\\u0097',
  '\\u0098',
  '\\u0099',
  '\\u009A',
  '\\u009B',
  '\\u009C',
  '\\u009D',
  '\\u009E',
  '\\u009F',
];


/***/ }),

/***/ "../../graphql/language/printer.mjs":
/*!******************************************!*\
  !*** ../../graphql/language/printer.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "print": () => (/* binding */ print)
/* harmony export */ });
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blockString.mjs */ "../../graphql/language/blockString.mjs");
/* harmony import */ var _printString_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./printString.mjs */ "../../graphql/language/printString.mjs");
/* harmony import */ var _visitor_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visitor.mjs */ "../../graphql/language/visitor.mjs");



/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return (0,_visitor_mjs__WEBPACK_IMPORTED_MODULE_0__.visit)(ast, printDocASTReducer);
}
const MAX_LINE_LENGTH = 80;
const printDocASTReducer = {
  Name: {
    leave: (node) => node.value,
  },
  Variable: {
    leave: (node) => '$' + node.name,
  },
  // Document
  Document: {
    leave: (node) => join(node.definitions, '\n\n'),
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
      const prefix = join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, ' '),
        ],
        ' ',
      ); // Anonymous queries with no directives or variable definitions can use
      // the query short form.

      return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
    },
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) =>
      variable +
      ': ' +
      type +
      wrap(' = ', defaultValue) +
      wrap(' ', join(directives, ' ')),
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections),
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap('', alias, ': ') + name;
      let argsLine = prefix + wrap('(', join(args, ', '), ')');

      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
      }

      return join([argsLine, join(directives, ' '), selectionSet], ' ');
    },
  },
  Argument: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) =>
      '...' + name + wrap(' ', join(directives, ' ')),
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) =>
      join(
        [
          '...',
          wrap('on ', typeCondition),
          join(directives, ' '),
          selectionSet,
        ],
        ' ',
      ),
  },
  FragmentDefinition: {
    leave: (
      { name, typeCondition, variableDefinitions, directives, selectionSet }, // Note: fragment variable definitions are experimental and may be changed
    ) =>
      // or removed in the future.
      `fragment ${name}${wrap('(', join(variableDefinitions, ', '), ')')} ` +
      `on ${typeCondition} ${wrap('', join(directives, ' '), ' ')}` +
      selectionSet,
  },
  // Value
  IntValue: {
    leave: ({ value }) => value,
  },
  FloatValue: {
    leave: ({ value }) => value,
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) =>
      isBlockString ? (0,_blockString_mjs__WEBPACK_IMPORTED_MODULE_1__.printBlockString)(value) : (0,_printString_mjs__WEBPACK_IMPORTED_MODULE_2__.printString)(value),
  },
  BooleanValue: {
    leave: ({ value }) => (value ? 'true' : 'false'),
  },
  NullValue: {
    leave: () => 'null',
  },
  EnumValue: {
    leave: ({ value }) => value,
  },
  ListValue: {
    leave: ({ values }) => '[' + join(values, ', ') + ']',
  },
  ObjectValue: {
    leave: ({ fields }) => '{' + join(fields, ', ') + '}',
  },
  ObjectField: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) =>
      '@' + name + wrap('(', join(args, ', '), ')'),
  },
  // Type
  NamedType: {
    leave: ({ name }) => name,
  },
  ListType: {
    leave: ({ type }) => '[' + type + ']',
  },
  NonNullType: {
    leave: ({ type }) => type + '!',
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) =>
      wrap('', description, '\n') +
      join(['schema', join(directives, ' '), block(operationTypes)], ' '),
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ': ' + type,
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') +
      join(['scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) =>
      wrap('', description, '\n') +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      ': ' +
      type +
      wrap(' ', join(directives, ' ')),
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) =>
      wrap('', description, '\n') +
      join(
        [name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')],
        ' ',
      ),
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) =>
      wrap('', description, '\n') +
      join(
        ['union', name, join(directives, ' '), wrap('= ', join(types, ' | '))],
        ' ',
      ),
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) =>
      wrap('', description, '\n') +
      join(['enum', name, join(directives, ' '), block(values)], ' '),
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') + join([name, join(directives, ' ')], ' '),
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) =>
      wrap('', description, '\n') +
      join(['input', name, join(directives, ' '), block(fields)], ' '),
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) =>
      wrap('', description, '\n') +
      'directive @' +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      (repeatable ? ' repeatable' : '') +
      ' on ' +
      join(locations, ' | '),
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) =>
      join(
        ['extend schema', join(directives, ' '), block(operationTypes)],
        ' ',
      ),
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) =>
      join(['extend scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) =>
      join(
        [
          'extend union',
          name,
          join(directives, ' '),
          wrap('= ', join(types, ' | ')),
        ],
        ' ',
      ),
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) =>
      join(['extend enum', name, join(directives, ' '), block(values)], ' '),
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) =>
      join(['extend input', name, join(directives, ' '), block(fields)], ' '),
  },
};
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */

function join(maybeArray, separator = '') {
  var _maybeArray$filter$jo;

  return (_maybeArray$filter$jo =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.filter((x) => x).join(separator)) !== null &&
    _maybeArray$filter$jo !== void 0
    ? _maybeArray$filter$jo
    : '';
}
/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */

function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */

function wrap(start, maybeString, end = '') {
  return maybeString != null && maybeString !== ''
    ? start + maybeString + end
    : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function hasMultilineItems(maybeArray) {
  var _maybeArray$some;

  // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */
  return (_maybeArray$some =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.some((str) => str.includes('\n'))) !== null &&
    _maybeArray$some !== void 0
    ? _maybeArray$some
    : false;
}


/***/ }),

/***/ "../../graphql/language/source.mjs":
/*!*****************************************!*\
  !*** ../../graphql/language/source.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Source": () => (/* binding */ Source),
/* harmony export */   "isSource": () => (/* binding */ isSource)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/instanceOf.mjs */ "../../graphql/jsutils/instanceOf.mjs");




/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */
class Source {
  constructor(
    body,
    name = 'GraphQL request',
    locationOffset = {
      line: 1,
      column: 1,
    },
  ) {
    typeof body === 'string' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(false, `Body must be a string. Received: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(
        false,
        'line in locationOffset is 1-indexed and must be positive.',
      );
    this.locationOffset.column > 0 ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(
        false,
        'column in locationOffset is 1-indexed and must be positive.',
      );
  }

  get [Symbol.toStringTag]() {
    return 'Source';
  }
}
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */

function isSource(source) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_2__.instanceOf)(source, Source);
}


/***/ }),

/***/ "../../graphql/language/tokenKind.mjs":
/*!********************************************!*\
  !*** ../../graphql/language/tokenKind.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenKind": () => (/* binding */ TokenKind)
/* harmony export */ });
/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
let TokenKind;
/**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */

(function (TokenKind) {
  TokenKind['SOF'] = '<SOF>';
  TokenKind['EOF'] = '<EOF>';
  TokenKind['BANG'] = '!';
  TokenKind['DOLLAR'] = '$';
  TokenKind['AMP'] = '&';
  TokenKind['PAREN_L'] = '(';
  TokenKind['PAREN_R'] = ')';
  TokenKind['SPREAD'] = '...';
  TokenKind['COLON'] = ':';
  TokenKind['EQUALS'] = '=';
  TokenKind['AT'] = '@';
  TokenKind['BRACKET_L'] = '[';
  TokenKind['BRACKET_R'] = ']';
  TokenKind['BRACE_L'] = '{';
  TokenKind['PIPE'] = '|';
  TokenKind['BRACE_R'] = '}';
  TokenKind['NAME'] = 'Name';
  TokenKind['INT'] = 'Int';
  TokenKind['FLOAT'] = 'Float';
  TokenKind['STRING'] = 'String';
  TokenKind['BLOCK_STRING'] = 'BlockString';
  TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (TokenKind = {}));


/***/ }),

/***/ "../../graphql/language/visitor.mjs":
/*!******************************************!*\
  !*** ../../graphql/language/visitor.mjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BREAK": () => (/* binding */ BREAK),
/* harmony export */   "visit": () => (/* binding */ visit),
/* harmony export */   "visitInParallel": () => (/* binding */ visitInParallel),
/* harmony export */   "getEnterLeaveForKind": () => (/* binding */ getEnterLeaveForKind),
/* harmony export */   "getVisitFn": () => (/* binding */ getVisitFn)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kinds.mjs */ "../../graphql/language/kinds.mjs");




/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

const BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 * ```ts
 * const editedAST = visit(ast, {
 *   enter(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: skip visiting this node
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   },
 *   leave(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: no action
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   }
 * });
 * ```
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to three permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind(node) {
 *     // enter the "Kind" node
 *   }
 * })
 * ```
 *
 * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind: {
 *     enter(node) {
 *       // enter the "Kind" node
 *     }
 *     leave(node) {
 *       // leave the "Kind" node
 *     }
 *   }
 * })
 * ```
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 * ```ts
 * visit(ast, {
 *   enter(node) {
 *     // enter any node
 *   },
 *   leave(node) {
 *     // leave any node
 *   }
 * })
 * ```
 */

function visit(root, visitor, visitorKeys = _ast_mjs__WEBPACK_IMPORTED_MODULE_0__.QueryDocumentKeys) {
  const enterLeaveMap = new Map();

  for (const kind of Object.values(_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  /* eslint-disable no-undef-init */

  let stack = undefined;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = undefined;
  let parent = undefined;
  const path = [];
  const ancestors = [];
  /* eslint-enable no-undef-init */

  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;

          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;

            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node),
          );

          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];

      if (node === null || node === undefined) {
        continue;
      }

      path.push(key);
    }

    let result;

    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;

      (0,_ast_mjs__WEBPACK_IMPORTED_MODULE_0__.isNode)(node) || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(false, `Invalid AST Node: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(node)}.`);
      const visitFn = isLeaving
        ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get === void 0
          ? void 0
          : _enterLeaveMap$get.leave
        : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get2 === void 0
        ? void 0
        : _enterLeaveMap$get2.enter;
      result =
        visitFn === null || visitFn === void 0
          ? void 0
          : visitFn.call(visitor, node, key, parent, path, ancestors);

      if (result === BREAK) {
        break;
      }

      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== undefined) {
        edits.push([key, result]);

        if (!isLeaving) {
          if ((0,_ast_mjs__WEBPACK_IMPORTED_MODULE_0__.isNode)(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;

      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack,
      };
      inArray = Array.isArray(node);
      keys = inArray
        ? node
        : (_node$kind = visitorKeys[node.kind]) !== null &&
          _node$kind !== void 0
        ? _node$kind
        : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    // New root
    return edits[edits.length - 1][1];
  }

  return root;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */

function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = Object.create(null);

  for (const kind of Object.values(_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(undefined);
    const leaveList = new Array(visitors.length).fill(undefined);

    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }

    if (!hasVisitor) {
      continue;
    }

    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;

            const result =
              (_enterList$i = enterList[i]) === null || _enterList$i === void 0
                ? void 0
                : _enterList$i.apply(visitors[i], args);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      },

      leave(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;

            const result =
              (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0
                ? void 0
                : _leaveList$i.apply(visitors[i], args);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      },
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }

  return mergedVisitor;
}
/**
 * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
 */

function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];

  if (typeof kindVisitor === 'object') {
    // { Kind: { enter() {}, leave() {} } }
    return kindVisitor;
  } else if (typeof kindVisitor === 'function') {
    // { Kind() {} }
    return {
      enter: kindVisitor,
      leave: undefined,
    };
  } // { enter() {}, leave() {} }

  return {
    enter: visitor.enter,
    leave: visitor.leave,
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 *
 * @deprecated Please use `getEnterLeaveForKind` instead. Will be removed in v17
 */

/* c8 ignore next 8 */

function getVisitFn(visitor, kind, isLeaving) {
  const { enter, leave } = getEnterLeaveForKind(visitor, kind);
  return isLeaving ? leave : enter;
}


/***/ }),

/***/ "../../graphql/type/assertName.mjs":
/*!*****************************************!*\
  !*** ../../graphql/type/assertName.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assertName": () => (/* binding */ assertName),
/* harmony export */   "assertEnumValueName": () => (/* binding */ assertEnumValueName)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/characterClasses.mjs */ "../../graphql/language/characterClasses.mjs");



/**
 * Upholds the spec rules about naming.
 */

function assertName(name) {
  name != null || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(false, 'Must provide name.');
  typeof name === 'string' || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(false, 'Expected name to be a string.');

  if (name.length === 0) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError('Expected name to be a non-empty string.');
  }

  for (let i = 1; i < name.length; ++i) {
    if (!(0,_language_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isNameContinue)(name.charCodeAt(i))) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Names must only contain [_a-zA-Z0-9] but "${name}" does not.`,
      );
    }
  }

  if (!(0,_language_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_2__.isNameStart)(name.charCodeAt(0))) {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
      `Names must start with [_a-zA-Z] but "${name}" does not.`,
    );
  }

  return name;
}
/**
 * Upholds the spec rules about naming enum values.
 *
 * @internal
 */

function assertEnumValueName(name) {
  if (name === 'true' || name === 'false' || name === 'null') {
    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(`Enum values cannot be named: ${name}`);
  }

  return assertName(name);
}


/***/ }),

/***/ "../../graphql/type/definition.mjs":
/*!*****************************************!*\
  !*** ../../graphql/type/definition.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isType": () => (/* binding */ isType),
/* harmony export */   "assertType": () => (/* binding */ assertType),
/* harmony export */   "isScalarType": () => (/* binding */ isScalarType),
/* harmony export */   "assertScalarType": () => (/* binding */ assertScalarType),
/* harmony export */   "isObjectType": () => (/* binding */ isObjectType),
/* harmony export */   "assertObjectType": () => (/* binding */ assertObjectType),
/* harmony export */   "isInterfaceType": () => (/* binding */ isInterfaceType),
/* harmony export */   "assertInterfaceType": () => (/* binding */ assertInterfaceType),
/* harmony export */   "isUnionType": () => (/* binding */ isUnionType),
/* harmony export */   "assertUnionType": () => (/* binding */ assertUnionType),
/* harmony export */   "isEnumType": () => (/* binding */ isEnumType),
/* harmony export */   "assertEnumType": () => (/* binding */ assertEnumType),
/* harmony export */   "isInputObjectType": () => (/* binding */ isInputObjectType),
/* harmony export */   "assertInputObjectType": () => (/* binding */ assertInputObjectType),
/* harmony export */   "isListType": () => (/* binding */ isListType),
/* harmony export */   "assertListType": () => (/* binding */ assertListType),
/* harmony export */   "isNonNullType": () => (/* binding */ isNonNullType),
/* harmony export */   "assertNonNullType": () => (/* binding */ assertNonNullType),
/* harmony export */   "isInputType": () => (/* binding */ isInputType),
/* harmony export */   "assertInputType": () => (/* binding */ assertInputType),
/* harmony export */   "isOutputType": () => (/* binding */ isOutputType),
/* harmony export */   "assertOutputType": () => (/* binding */ assertOutputType),
/* harmony export */   "isLeafType": () => (/* binding */ isLeafType),
/* harmony export */   "assertLeafType": () => (/* binding */ assertLeafType),
/* harmony export */   "isCompositeType": () => (/* binding */ isCompositeType),
/* harmony export */   "assertCompositeType": () => (/* binding */ assertCompositeType),
/* harmony export */   "isAbstractType": () => (/* binding */ isAbstractType),
/* harmony export */   "assertAbstractType": () => (/* binding */ assertAbstractType),
/* harmony export */   "GraphQLList": () => (/* binding */ GraphQLList),
/* harmony export */   "GraphQLNonNull": () => (/* binding */ GraphQLNonNull),
/* harmony export */   "isWrappingType": () => (/* binding */ isWrappingType),
/* harmony export */   "assertWrappingType": () => (/* binding */ assertWrappingType),
/* harmony export */   "isNullableType": () => (/* binding */ isNullableType),
/* harmony export */   "assertNullableType": () => (/* binding */ assertNullableType),
/* harmony export */   "getNullableType": () => (/* binding */ getNullableType),
/* harmony export */   "isNamedType": () => (/* binding */ isNamedType),
/* harmony export */   "assertNamedType": () => (/* binding */ assertNamedType),
/* harmony export */   "getNamedType": () => (/* binding */ getNamedType),
/* harmony export */   "resolveReadonlyArrayThunk": () => (/* binding */ resolveReadonlyArrayThunk),
/* harmony export */   "resolveObjMapThunk": () => (/* binding */ resolveObjMapThunk),
/* harmony export */   "GraphQLScalarType": () => (/* binding */ GraphQLScalarType),
/* harmony export */   "GraphQLObjectType": () => (/* binding */ GraphQLObjectType),
/* harmony export */   "defineArguments": () => (/* binding */ defineArguments),
/* harmony export */   "argsToArgsConfig": () => (/* binding */ argsToArgsConfig),
/* harmony export */   "isRequiredArgument": () => (/* binding */ isRequiredArgument),
/* harmony export */   "GraphQLInterfaceType": () => (/* binding */ GraphQLInterfaceType),
/* harmony export */   "GraphQLUnionType": () => (/* binding */ GraphQLUnionType),
/* harmony export */   "GraphQLEnumType": () => (/* binding */ GraphQLEnumType),
/* harmony export */   "GraphQLInputObjectType": () => (/* binding */ GraphQLInputObjectType),
/* harmony export */   "isRequiredInputField": () => (/* binding */ isRequiredInputField)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_identityFunc_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/identityFunc.mjs */ "../../graphql/jsutils/identityFunc.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/instanceOf.mjs */ "../../graphql/jsutils/instanceOf.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../jsutils/keyValMap.mjs */ "../../graphql/jsutils/keyValMap.mjs");
/* harmony import */ var _jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/mapValue.mjs */ "../../graphql/jsutils/mapValue.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../jsutils/toObjMap.mjs */ "../../graphql/jsutils/toObjMap.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _utilities_valueFromASTUntyped_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/valueFromASTUntyped.mjs */ "../../graphql/utilities/valueFromASTUntyped.mjs");
/* harmony import */ var _assertName_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assertName.mjs */ "../../graphql/type/assertName.mjs");
















function isType(type) {
  return (
    isScalarType(type) ||
    isObjectType(type) ||
    isInterfaceType(type) ||
    isUnionType(type) ||
    isEnumType(type) ||
    isInputObjectType(type) ||
    isListType(type) ||
    isNonNullType(type)
  );
}
function assertType(type) {
  if (!isType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL type.`);
  }

  return type;
}
/**
 * There are predicates for each kind of GraphQL type.
 */

function isScalarType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLScalarType);
}
function assertScalarType(type) {
  if (!isScalarType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Scalar type.`);
  }

  return type;
}
function isObjectType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLObjectType);
}
function assertObjectType(type) {
  if (!isObjectType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Object type.`);
  }

  return type;
}
function isInterfaceType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLInterfaceType);
}
function assertInterfaceType(type) {
  if (!isInterfaceType(type)) {
    throw new Error(
      `Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Interface type.`,
    );
  }

  return type;
}
function isUnionType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLUnionType);
}
function assertUnionType(type) {
  if (!isUnionType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Union type.`);
  }

  return type;
}
function isEnumType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLEnumType);
}
function assertEnumType(type) {
  if (!isEnumType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Enum type.`);
  }

  return type;
}
function isInputObjectType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLInputObjectType);
}
function assertInputObjectType(type) {
  if (!isInputObjectType(type)) {
    throw new Error(
      `Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Input Object type.`,
    );
  }

  return type;
}
function isListType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLList);
}
function assertListType(type) {
  if (!isListType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL List type.`);
  }

  return type;
}
function isNonNullType(type) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_1__.instanceOf)(type, GraphQLNonNull);
}
function assertNonNullType(type) {
  if (!isNonNullType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL Non-Null type.`);
  }

  return type;
}
/**
 * These types may be used as input types for arguments and directives.
 */

function isInputType(type) {
  return (
    isScalarType(type) ||
    isEnumType(type) ||
    isInputObjectType(type) ||
    (isWrappingType(type) && isInputType(type.ofType))
  );
}
function assertInputType(type) {
  if (!isInputType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL input type.`);
  }

  return type;
}
/**
 * These types may be used as output types as the result of fields.
 */

function isOutputType(type) {
  return (
    isScalarType(type) ||
    isObjectType(type) ||
    isInterfaceType(type) ||
    isUnionType(type) ||
    isEnumType(type) ||
    (isWrappingType(type) && isOutputType(type.ofType))
  );
}
function assertOutputType(type) {
  if (!isOutputType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL output type.`);
  }

  return type;
}
/**
 * These types may describe types which may be leaf values.
 */

function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function assertLeafType(type) {
  if (!isLeafType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL leaf type.`);
  }

  return type;
}
/**
 * These types may describe the parent context of a selection set.
 */

function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
function assertCompositeType(type) {
  if (!isCompositeType(type)) {
    throw new Error(
      `Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL composite type.`,
    );
  }

  return type;
}
/**
 * These types may describe the parent context of a selection set.
 */

function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
function assertAbstractType(type) {
  if (!isAbstractType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL abstract type.`);
  }

  return type;
}
/**
 * List Type Wrapper
 *
 * A list is a wrapping type which points to another type.
 * Lists are often created within the context of defining the fields of
 * an object type.
 *
 * Example:
 *
 * ```ts
 * const PersonType = new GraphQLObjectType({
 *   name: 'Person',
 *   fields: () => ({
 *     parents: { type: new GraphQLList(PersonType) },
 *     children: { type: new GraphQLList(PersonType) },
 *   })
 * })
 * ```
 */

class GraphQLList {
  constructor(ofType) {
    isType(ofType) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(false, `Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(ofType)} to be a GraphQL type.`);
    this.ofType = ofType;
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLList';
  }

  toString() {
    return '[' + String(this.ofType) + ']';
  }

  toJSON() {
    return this.toString();
  }
}
/**
 * Non-Null Type Wrapper
 *
 * A non-null is a wrapping type which points to another type.
 * Non-null types enforce that their values are never null and can ensure
 * an error is raised if this ever occurs during a request. It is useful for
 * fields which you can make a strong guarantee on non-nullability, for example
 * usually the id field of a database row will never be null.
 *
 * Example:
 *
 * ```ts
 * const RowType = new GraphQLObjectType({
 *   name: 'Row',
 *   fields: () => ({
 *     id: { type: new GraphQLNonNull(GraphQLString) },
 *   })
 * })
 * ```
 * Note: the enforcement of non-nullability occurs within the executor.
 */

class GraphQLNonNull {
  constructor(ofType) {
    isNullableType(ofType) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(ofType)} to be a GraphQL nullable type.`,
      );
    this.ofType = ofType;
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLNonNull';
  }

  toString() {
    return String(this.ofType) + '!';
  }

  toJSON() {
    return this.toString();
  }
}
/**
 * These types wrap and modify other types
 */

function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function assertWrappingType(type) {
  if (!isWrappingType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL wrapping type.`);
  }

  return type;
}
/**
 * These types can all accept null as a value.
 */

function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function assertNullableType(type) {
  if (!isNullableType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL nullable type.`);
  }

  return type;
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
/**
 * These named types do not include modifiers like List or NonNull.
 */

function isNamedType(type) {
  return (
    isScalarType(type) ||
    isObjectType(type) ||
    isInterfaceType(type) ||
    isUnionType(type) ||
    isEnumType(type) ||
    isInputObjectType(type)
  );
}
function assertNamedType(type) {
  if (!isNamedType(type)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)} to be a GraphQL named type.`);
  }

  return type;
}
function getNamedType(type) {
  if (type) {
    let unwrappedType = type;

    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }

    return unwrappedType;
  }
}
/**
 * Used while defining GraphQL types to allow for circular references in
 * otherwise immutable type definitions.
 */

function resolveReadonlyArrayThunk(thunk) {
  return typeof thunk === 'function' ? thunk() : thunk;
}
function resolveObjMapThunk(thunk) {
  return typeof thunk === 'function' ? thunk() : thunk;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */

/**
 * Scalar Type Definition
 *
 * The leaf values of any request and input values to arguments are
 * Scalars (or Enums) and are defined with a name and a series of functions
 * used to parse input from ast or variables and to ensure validity.
 *
 * If a type's serialize function does not return a value (i.e. it returns
 * `undefined`) then an error will be raised and a `null` value will be returned
 * in the response. If the serialize function returns `null`, then no error will
 * be included in the response.
 *
 * Example:
 *
 * ```ts
 * const OddType = new GraphQLScalarType({
 *   name: 'Odd',
 *   serialize(value) {
 *     if (value % 2 === 1) {
 *       return value;
 *     }
 *   }
 * });
 * ```
 */
class GraphQLScalarType {
  constructor(config) {
    var _config$parseValue,
      _config$serialize,
      _config$parseLiteral,
      _config$extensionASTN;

    const parseValue =
      (_config$parseValue = config.parseValue) !== null &&
      _config$parseValue !== void 0
        ? _config$parseValue
        : _jsutils_identityFunc_mjs__WEBPACK_IMPORTED_MODULE_3__.identityFunc;
    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(config.name);
    this.description = config.description;
    this.specifiedByURL = config.specifiedByURL;
    this.serialize =
      (_config$serialize = config.serialize) !== null &&
      _config$serialize !== void 0
        ? _config$serialize
        : _jsutils_identityFunc_mjs__WEBPACK_IMPORTED_MODULE_3__.identityFunc;
    this.parseValue = parseValue;
    this.parseLiteral =
      (_config$parseLiteral = config.parseLiteral) !== null &&
      _config$parseLiteral !== void 0
        ? _config$parseLiteral
        : (node, variables) => parseValue((0,_utilities_valueFromASTUntyped_mjs__WEBPACK_IMPORTED_MODULE_5__.valueFromASTUntyped)(node, variables));
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN = config.extensionASTNodes) !== null &&
      _config$extensionASTN !== void 0
        ? _config$extensionASTN
        : [];
    config.specifiedByURL == null ||
      typeof config.specifiedByURL === 'string' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${this.name} must provide "specifiedByURL" as a string, ` +
          `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(config.specifiedByURL)}.`,
      );
    config.serialize == null ||
      typeof config.serialize === 'function' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`,
      );

    if (config.parseLiteral) {
      (typeof config.parseValue === 'function' &&
        typeof config.parseLiteral === 'function') ||
        (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
          false,
          `${this.name} must provide both "parseValue" and "parseLiteral" functions.`,
        );
    }
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLScalarType';
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      specifiedByURL: this.specifiedByURL,
      serialize: this.serialize,
      parseValue: this.parseValue,
      parseLiteral: this.parseLiteral,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

/**
 * Object Type Definition
 *
 * Almost all of the GraphQL types you define will be object types. Object types
 * have a name, but most importantly describe their fields.
 *
 * Example:
 *
 * ```ts
 * const AddressType = new GraphQLObjectType({
 *   name: 'Address',
 *   fields: {
 *     street: { type: GraphQLString },
 *     number: { type: GraphQLInt },
 *     formatted: {
 *       type: GraphQLString,
 *       resolve(obj) {
 *         return obj.number + ' ' + obj.street
 *       }
 *     }
 *   }
 * });
 * ```
 *
 * When two types need to refer to each other, or a type needs to refer to
 * itself in a field, you can use a function expression (aka a closure or a
 * thunk) to supply the fields lazily.
 *
 * Example:
 *
 * ```ts
 * const PersonType = new GraphQLObjectType({
 *   name: 'Person',
 *   fields: () => ({
 *     name: { type: GraphQLString },
 *     bestFriend: { type: PersonType },
 *   })
 * });
 * ```
 */
class GraphQLObjectType {
  constructor(config) {
    var _config$extensionASTN2;

    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(config.name);
    this.description = config.description;
    this.isTypeOf = config.isTypeOf;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN2 = config.extensionASTNodes) !== null &&
      _config$extensionASTN2 !== void 0
        ? _config$extensionASTN2
        : [];

    this._fields = () => defineFieldMap(config);

    this._interfaces = () => defineInterfaces(config);

    config.isTypeOf == null ||
      typeof config.isTypeOf === 'function' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${this.name} must provide "isTypeOf" as a function, ` +
          `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(config.isTypeOf)}.`,
      );
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLObjectType';
  }

  getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  }

  getInterfaces() {
    if (typeof this._interfaces === 'function') {
      this._interfaces = this._interfaces();
    }

    return this._interfaces;
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      isTypeOf: this.isTypeOf,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function defineInterfaces(config) {
  var _config$interfaces;

  const interfaces = resolveReadonlyArrayThunk(
    (_config$interfaces = config.interfaces) !== null &&
      _config$interfaces !== void 0
      ? _config$interfaces
      : [],
  );
  Array.isArray(interfaces) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      `${config.name} interfaces must be an Array or a function which returns an Array.`,
    );
  return interfaces;
}

function defineFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      `${config.name} fields must be an object with field names as keys or a function which returns such an object.`,
    );
  return (0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(fieldMap, (fieldConfig, fieldName) => {
    var _fieldConfig$args;

    isPlainObj(fieldConfig) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${config.name}.${fieldName} field config must be an object.`,
      );
    fieldConfig.resolve == null ||
      typeof fieldConfig.resolve === 'function' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${config.name}.${fieldName} field resolver must be a function if ` +
          `provided, but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(fieldConfig.resolve)}.`,
      );
    const argsConfig =
      (_fieldConfig$args = fieldConfig.args) !== null &&
      _fieldConfig$args !== void 0
        ? _fieldConfig$args
        : {};
    isPlainObj(argsConfig) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${config.name}.${fieldName} args must be an object with argument names as keys.`,
      );
    return {
      name: (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      args: defineArguments(argsConfig),
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(fieldConfig.extensions),
      astNode: fieldConfig.astNode,
    };
  });
}

function defineArguments(config) {
  return Object.entries(config).map(([argName, argConfig]) => ({
    name: (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(argName),
    description: argConfig.description,
    type: argConfig.type,
    defaultValue: argConfig.defaultValue,
    deprecationReason: argConfig.deprecationReason,
    extensions: (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(argConfig.extensions),
    astNode: argConfig.astNode,
  }));
}

function isPlainObj(obj) {
  return (0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_8__.isObjectLike)(obj) && !Array.isArray(obj);
}

function fieldsToFieldsConfig(fields) {
  return (0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(fields, (field) => ({
    description: field.description,
    type: field.type,
    args: argsToArgsConfig(field.args),
    resolve: field.resolve,
    subscribe: field.subscribe,
    deprecationReason: field.deprecationReason,
    extensions: field.extensions,
    astNode: field.astNode,
  }));
}
/**
 * @internal
 */

function argsToArgsConfig(args) {
  return (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_9__.keyValMap)(
    args,
    (arg) => arg.name,
    (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode,
    }),
  );
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === undefined;
}

/**
 * Interface Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Interface type
 * is used to describe what types are possible, what fields are in common across
 * all types, as well as a function to determine which type is actually used
 * when the field is resolved.
 *
 * Example:
 *
 * ```ts
 * const EntityType = new GraphQLInterfaceType({
 *   name: 'Entity',
 *   fields: {
 *     name: { type: GraphQLString }
 *   }
 * });
 * ```
 */
class GraphQLInterfaceType {
  constructor(config) {
    var _config$extensionASTN3;

    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(config.name);
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN3 = config.extensionASTNodes) !== null &&
      _config$extensionASTN3 !== void 0
        ? _config$extensionASTN3
        : [];
    this._fields = defineFieldMap.bind(undefined, config);
    this._interfaces = defineInterfaces.bind(undefined, config);
    config.resolveType == null ||
      typeof config.resolveType === 'function' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${this.name} must provide "resolveType" as a function, ` +
          `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(config.resolveType)}.`,
      );
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLInterfaceType';
  }

  getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  }

  getInterfaces() {
    if (typeof this._interfaces === 'function') {
      this._interfaces = this._interfaces();
    }

    return this._interfaces;
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

/**
 * Union Type Definition
 *
 * When a field can return one of a heterogeneous set of types, a Union type
 * is used to describe what types are possible as well as providing a function
 * to determine which type is actually used when the field is resolved.
 *
 * Example:
 *
 * ```ts
 * const PetType = new GraphQLUnionType({
 *   name: 'Pet',
 *   types: [ DogType, CatType ],
 *   resolveType(value) {
 *     if (value instanceof Dog) {
 *       return DogType;
 *     }
 *     if (value instanceof Cat) {
 *       return CatType;
 *     }
 *   }
 * });
 * ```
 */
class GraphQLUnionType {
  constructor(config) {
    var _config$extensionASTN4;

    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(config.name);
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN4 = config.extensionASTNodes) !== null &&
      _config$extensionASTN4 !== void 0
        ? _config$extensionASTN4
        : [];
    this._types = defineTypes.bind(undefined, config);
    config.resolveType == null ||
      typeof config.resolveType === 'function' ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${this.name} must provide "resolveType" as a function, ` +
          `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(config.resolveType)}.`,
      );
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLUnionType';
  }

  getTypes() {
    if (typeof this._types === 'function') {
      this._types = this._types();
    }

    return this._types;
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      types: this.getTypes(),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function defineTypes(config) {
  const types = resolveReadonlyArrayThunk(config.types);
  Array.isArray(types) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      `Must provide Array of types or a function which returns such an array for Union ${config.name}.`,
    );
  return types;
}

/**
 * Enum Type Definition
 *
 * Some leaf values of requests and input values are Enums. GraphQL serializes
 * Enum values as strings, however internally Enums can be represented by any
 * kind of type, often integers.
 *
 * Example:
 *
 * ```ts
 * const RGBType = new GraphQLEnumType({
 *   name: 'RGB',
 *   values: {
 *     RED: { value: 0 },
 *     GREEN: { value: 1 },
 *     BLUE: { value: 2 }
 *   }
 * });
 * ```
 *
 * Note: If a value is not provided in a definition, the name of the enum value
 * will be used as its internal value.
 */
class GraphQLEnumType {
  /* <T> */
  constructor(config) {
    var _config$extensionASTN5;

    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(config.name);
    this.description = config.description;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN5 = config.extensionASTNodes) !== null &&
      _config$extensionASTN5 !== void 0
        ? _config$extensionASTN5
        : [];
    this._values = defineEnumValues(this.name, config.values);
    this._valueLookup = new Map(
      this._values.map((enumValue) => [enumValue.value, enumValue]),
    );
    this._nameLookup = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_10__.keyMap)(this._values, (value) => value.name);
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLEnumType';
  }

  getValues() {
    return this._values;
  }

  getValue(name) {
    return this._nameLookup[name];
  }

  serialize(outputValue) {
    const enumValue = this._valueLookup.get(outputValue);

    if (enumValue === undefined) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_11__.GraphQLError(
        `Enum "${this.name}" cannot represent value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(outputValue)}`,
      );
    }

    return enumValue.name;
  }

  parseValue(inputValue) /* T */
  {
    if (typeof inputValue !== 'string') {
      const valueStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(inputValue);
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_11__.GraphQLError(
        `Enum "${this.name}" cannot represent non-string value: ${valueStr}.` +
          didYouMeanEnumValue(this, valueStr),
      );
    }

    const enumValue = this.getValue(inputValue);

    if (enumValue == null) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_11__.GraphQLError(
        `Value "${inputValue}" does not exist in "${this.name}" enum.` +
          didYouMeanEnumValue(this, inputValue),
      );
    }

    return enumValue.value;
  }

  parseLiteral(valueNode, _variables) /* T */
  {
    // Note: variables will be resolved to a value before calling this function.
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_12__.Kind.ENUM) {
      const valueStr = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_13__.print)(valueNode);
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_11__.GraphQLError(
        `Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` +
          didYouMeanEnumValue(this, valueStr),
        valueNode,
      );
    }

    const enumValue = this.getValue(valueNode.value);

    if (enumValue == null) {
      const valueStr = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_13__.print)(valueNode);
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_11__.GraphQLError(
        `Value "${valueStr}" does not exist in "${this.name}" enum.` +
          didYouMeanEnumValue(this, valueStr),
        valueNode,
      );
    }

    return enumValue.value;
  }

  toConfig() {
    const values = (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_9__.keyValMap)(
      this.getValues(),
      (value) => value.name,
      (value) => ({
        description: value.description,
        value: value.value,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions,
        astNode: value.astNode,
      }),
    );
    return {
      name: this.name,
      description: this.description,
      values,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function didYouMeanEnumValue(enumType, unknownValueStr) {
  const allNames = enumType.getValues().map((value) => value.name);
  const suggestedValues = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_14__.suggestionList)(unknownValueStr, allNames);
  return (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_15__.didYouMean)('the enum value', suggestedValues);
}

function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      `${typeName} values must be an object with value names as keys.`,
    );
  return Object.entries(valueMap).map(([valueName, valueConfig]) => {
    isPlainObj(valueConfig) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${typeName}.${valueName} must refer to an object with a "value" key ` +
          `representing an internal value but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(valueConfig)}.`,
      );
    return {
      name: (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertEnumValueName)(valueName),
      description: valueConfig.description,
      value: valueConfig.value !== undefined ? valueConfig.value : valueName,
      deprecationReason: valueConfig.deprecationReason,
      extensions: (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(valueConfig.extensions),
      astNode: valueConfig.astNode,
    };
  });
}

/**
 * Input Object Type Definition
 *
 * An input object defines a structured collection of fields which may be
 * supplied to a field argument.
 *
 * Using `NonNull` will ensure that a value must be provided by the query
 *
 * Example:
 *
 * ```ts
 * const GeoPoint = new GraphQLInputObjectType({
 *   name: 'GeoPoint',
 *   fields: {
 *     lat: { type: new GraphQLNonNull(GraphQLFloat) },
 *     lon: { type: new GraphQLNonNull(GraphQLFloat) },
 *     alt: { type: GraphQLFloat, defaultValue: 0 },
 *   }
 * });
 * ```
 */
class GraphQLInputObjectType {
  constructor(config) {
    var _config$extensionASTN6;

    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(config.name);
    this.description = config.description;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN6 = config.extensionASTNodes) !== null &&
      _config$extensionASTN6 !== void 0
        ? _config$extensionASTN6
        : [];
    this._fields = defineInputFieldMap.bind(undefined, config);
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLInputObjectType';
  }

  getFields() {
    if (typeof this._fields === 'function') {
      this._fields = this._fields();
    }

    return this._fields;
  }

  toConfig() {
    const fields = (0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(this.getFields(), (field) => ({
      description: field.description,
      type: field.type,
      defaultValue: field.defaultValue,
      deprecationReason: field.deprecationReason,
      extensions: field.extensions,
      astNode: field.astNode,
    }));
    return {
      name: this.name,
      description: this.description,
      fields,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
    };
  }

  toString() {
    return this.name;
  }

  toJSON() {
    return this.toString();
  }
}

function defineInputFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
      false,
      `${config.name} fields must be an object with field names as keys or a function which returns such an object.`,
    );
  return (0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(fieldMap, (fieldConfig, fieldName) => {
    !('resolve' in fieldConfig) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(
        false,
        `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`,
      );
    return {
      name: (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_4__.assertName)(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_6__.toObjMap)(fieldConfig.extensions),
      astNode: fieldConfig.astNode,
    };
  });
}

function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === undefined;
}


/***/ }),

/***/ "../../graphql/type/directives.mjs":
/*!*****************************************!*\
  !*** ../../graphql/type/directives.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDirective": () => (/* binding */ isDirective),
/* harmony export */   "assertDirective": () => (/* binding */ assertDirective),
/* harmony export */   "GraphQLDirective": () => (/* binding */ GraphQLDirective),
/* harmony export */   "GraphQLIncludeDirective": () => (/* binding */ GraphQLIncludeDirective),
/* harmony export */   "GraphQLSkipDirective": () => (/* binding */ GraphQLSkipDirective),
/* harmony export */   "DEFAULT_DEPRECATION_REASON": () => (/* binding */ DEFAULT_DEPRECATION_REASON),
/* harmony export */   "GraphQLDeprecatedDirective": () => (/* binding */ GraphQLDeprecatedDirective),
/* harmony export */   "GraphQLSpecifiedByDirective": () => (/* binding */ GraphQLSpecifiedByDirective),
/* harmony export */   "specifiedDirectives": () => (/* binding */ specifiedDirectives),
/* harmony export */   "isSpecifiedDirective": () => (/* binding */ isSpecifiedDirective)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/instanceOf.mjs */ "../../graphql/jsutils/instanceOf.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/toObjMap.mjs */ "../../graphql/jsutils/toObjMap.mjs");
/* harmony import */ var _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../language/directiveLocation.mjs */ "../../graphql/language/directiveLocation.mjs");
/* harmony import */ var _assertName_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assertName.mjs */ "../../graphql/type/assertName.mjs");
/* harmony import */ var _definition_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _scalars_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scalars.mjs */ "../../graphql/type/scalars.mjs");









/**
 * Test if the given value is a GraphQL directive.
 */

function isDirective(directive) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_0__.instanceOf)(directive, GraphQLDirective);
}
function assertDirective(directive) {
  if (!isDirective(directive)) {
    throw new Error(
      `Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(directive)} to be a GraphQL directive.`,
    );
  }

  return directive;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */

/**
 * Directives are used by the GraphQL runtime as a way of modifying execution
 * behavior. Type system creators will usually not create these directly.
 */
class GraphQLDirective {
  constructor(config) {
    var _config$isRepeatable, _config$args;

    this.name = (0,_assertName_mjs__WEBPACK_IMPORTED_MODULE_2__.assertName)(config.name);
    this.description = config.description;
    this.locations = config.locations;
    this.isRepeatable =
      (_config$isRepeatable = config.isRepeatable) !== null &&
      _config$isRepeatable !== void 0
        ? _config$isRepeatable
        : false;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_3__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    Array.isArray(config.locations) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_4__.devAssert)(false, `@${config.name} locations must be an Array.`);
    const args =
      (_config$args = config.args) !== null && _config$args !== void 0
        ? _config$args
        : {};
    ((0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectLike)(args) && !Array.isArray(args)) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_4__.devAssert)(
        false,
        `@${config.name} args must be an object with argument names as keys.`,
      );
    this.args = (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_6__.defineArguments)(args);
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLDirective';
  }

  toConfig() {
    return {
      name: this.name,
      description: this.description,
      locations: this.locations,
      args: (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_6__.argsToArgsConfig)(this.args),
      isRepeatable: this.isRepeatable,
      extensions: this.extensions,
      astNode: this.astNode,
    };
  }

  toString() {
    return '@' + this.name;
  }

  toJSON() {
    return this.toString();
  }
}

/**
 * Used to conditionally include fields or fragments.
 */
const GraphQLIncludeDirective = new GraphQLDirective({
  name: 'include',
  description:
    'Directs the executor to include this field or fragment only when the `if` argument is true.',
  locations: [
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.FIELD,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.FRAGMENT_SPREAD,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.INLINE_FRAGMENT,
  ],
  args: {
    if: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_8__.GraphQLBoolean),
      description: 'Included when true.',
    },
  },
});
/**
 * Used to conditionally skip (exclude) fields or fragments.
 */

const GraphQLSkipDirective = new GraphQLDirective({
  name: 'skip',
  description:
    'Directs the executor to skip this field or fragment when the `if` argument is true.',
  locations: [
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.FIELD,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.FRAGMENT_SPREAD,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.INLINE_FRAGMENT,
  ],
  args: {
    if: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_8__.GraphQLBoolean),
      description: 'Skipped when true.',
    },
  },
});
/**
 * Constant string used for default reason for a deprecation.
 */

const DEFAULT_DEPRECATION_REASON = 'No longer supported';
/**
 * Used to declare element of a GraphQL schema as deprecated.
 */

const GraphQLDeprecatedDirective = new GraphQLDirective({
  name: 'deprecated',
  description: 'Marks an element of a GraphQL schema as no longer supported.',
  locations: [
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.FIELD_DEFINITION,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.ARGUMENT_DEFINITION,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.INPUT_FIELD_DEFINITION,
    _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.ENUM_VALUE,
  ],
  args: {
    reason: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_8__.GraphQLString,
      description:
        'Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).',
      defaultValue: DEFAULT_DEPRECATION_REASON,
    },
  },
});
/**
 * Used to provide a URL for specifying the behavior of custom scalar definitions.
 */

const GraphQLSpecifiedByDirective = new GraphQLDirective({
  name: 'specifiedBy',
  description: 'Exposes a URL that specifies the behavior of this scalar.',
  locations: [_language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_7__.DirectiveLocation.SCALAR],
  args: {
    url: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_8__.GraphQLString),
      description: 'The URL that specifies the behavior of this scalar.',
    },
  },
});
/**
 * The full list of specified directives.
 */

const specifiedDirectives = Object.freeze([
  GraphQLIncludeDirective,
  GraphQLSkipDirective,
  GraphQLDeprecatedDirective,
  GraphQLSpecifiedByDirective,
]);
function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(({ name }) => name === directive.name);
}


/***/ }),

/***/ "../../graphql/type/introspection.mjs":
/*!********************************************!*\
  !*** ../../graphql/type/introspection.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__Schema": () => (/* binding */ __Schema),
/* harmony export */   "__Directive": () => (/* binding */ __Directive),
/* harmony export */   "__DirectiveLocation": () => (/* binding */ __DirectiveLocation),
/* harmony export */   "__Type": () => (/* binding */ __Type),
/* harmony export */   "__Field": () => (/* binding */ __Field),
/* harmony export */   "__InputValue": () => (/* binding */ __InputValue),
/* harmony export */   "__EnumValue": () => (/* binding */ __EnumValue),
/* harmony export */   "TypeKind": () => (/* binding */ TypeKind),
/* harmony export */   "__TypeKind": () => (/* binding */ __TypeKind),
/* harmony export */   "SchemaMetaFieldDef": () => (/* binding */ SchemaMetaFieldDef),
/* harmony export */   "TypeMetaFieldDef": () => (/* binding */ TypeMetaFieldDef),
/* harmony export */   "TypeNameMetaFieldDef": () => (/* binding */ TypeNameMetaFieldDef),
/* harmony export */   "introspectionTypes": () => (/* binding */ introspectionTypes),
/* harmony export */   "isIntrospectionType": () => (/* binding */ isIntrospectionType)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/directiveLocation.mjs */ "../../graphql/language/directiveLocation.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _utilities_astFromValue_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/astFromValue.mjs */ "../../graphql/utilities/astFromValue.mjs");
/* harmony import */ var _definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scalars.mjs */ "../../graphql/type/scalars.mjs");







const __Schema = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLObjectType({
  name: '__Schema',
  description:
    'A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.',
  fields: () => ({
    description: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (schema) => schema.description,
    },
    types: {
      description: 'A list of all types supported by this server.',
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Type))),

      resolve(schema) {
        return Object.values(schema.getTypeMap());
      },
    },
    queryType: {
      description: 'The type that query operations will be rooted at.',
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Type),
      resolve: (schema) => schema.getQueryType(),
    },
    mutationType: {
      description:
        'If this server supports mutation, the type that mutation operations will be rooted at.',
      type: __Type,
      resolve: (schema) => schema.getMutationType(),
    },
    subscriptionType: {
      description:
        'If this server support subscription, the type that subscription operations will be rooted at.',
      type: __Type,
      resolve: (schema) => schema.getSubscriptionType(),
    },
    directives: {
      description: 'A list of all directives supported by this server.',
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(
        new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Directive)),
      ),
      resolve: (schema) => schema.getDirectives(),
    },
  }),
});
const __Directive = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLObjectType({
  name: '__Directive',
  description:
    "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
  fields: () => ({
    name: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString),
      resolve: (directive) => directive.name,
    },
    description: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (directive) => directive.description,
    },
    isRepeatable: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean),
      resolve: (directive) => directive.isRepeatable,
    },
    locations: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(
        new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__DirectiveLocation)),
      ),
      resolve: (directive) => directive.locations,
    },
    args: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(
        new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__InputValue)),
      ),
      args: {
        includeDeprecated: {
          type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(field, { includeDeprecated }) {
        return includeDeprecated
          ? field.args
          : field.args.filter((arg) => arg.deprecationReason == null);
      },
    },
  }),
});
const __DirectiveLocation = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLEnumType({
  name: '__DirectiveLocation',
  description:
    'A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.',
  values: {
    QUERY: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.QUERY,
      description: 'Location adjacent to a query operation.',
    },
    MUTATION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.MUTATION,
      description: 'Location adjacent to a mutation operation.',
    },
    SUBSCRIPTION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.SUBSCRIPTION,
      description: 'Location adjacent to a subscription operation.',
    },
    FIELD: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.FIELD,
      description: 'Location adjacent to a field.',
    },
    FRAGMENT_DEFINITION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.FRAGMENT_DEFINITION,
      description: 'Location adjacent to a fragment definition.',
    },
    FRAGMENT_SPREAD: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.FRAGMENT_SPREAD,
      description: 'Location adjacent to a fragment spread.',
    },
    INLINE_FRAGMENT: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.INLINE_FRAGMENT,
      description: 'Location adjacent to an inline fragment.',
    },
    VARIABLE_DEFINITION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.VARIABLE_DEFINITION,
      description: 'Location adjacent to a variable definition.',
    },
    SCHEMA: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.SCHEMA,
      description: 'Location adjacent to a schema definition.',
    },
    SCALAR: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.SCALAR,
      description: 'Location adjacent to a scalar definition.',
    },
    OBJECT: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.OBJECT,
      description: 'Location adjacent to an object type definition.',
    },
    FIELD_DEFINITION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.FIELD_DEFINITION,
      description: 'Location adjacent to a field definition.',
    },
    ARGUMENT_DEFINITION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.ARGUMENT_DEFINITION,
      description: 'Location adjacent to an argument definition.',
    },
    INTERFACE: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.INTERFACE,
      description: 'Location adjacent to an interface definition.',
    },
    UNION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.UNION,
      description: 'Location adjacent to a union definition.',
    },
    ENUM: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.ENUM,
      description: 'Location adjacent to an enum definition.',
    },
    ENUM_VALUE: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.ENUM_VALUE,
      description: 'Location adjacent to an enum value definition.',
    },
    INPUT_OBJECT: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.INPUT_OBJECT,
      description: 'Location adjacent to an input object type definition.',
    },
    INPUT_FIELD_DEFINITION: {
      value: _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_2__.DirectiveLocation.INPUT_FIELD_DEFINITION,
      description: 'Location adjacent to an input object field definition.',
    },
  },
});
const __Type = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLObjectType({
  name: '__Type',
  description:
    'The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.',
  fields: () => ({
    kind: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__TypeKind),

      resolve(type) {
        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isScalarType)(type)) {
          return TypeKind.SCALAR;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(type)) {
          return TypeKind.OBJECT;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(type)) {
          return TypeKind.INTERFACE;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isUnionType)(type)) {
          return TypeKind.UNION;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(type)) {
          return TypeKind.ENUM;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(type)) {
          return TypeKind.INPUT_OBJECT;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(type)) {
          return TypeKind.LIST;
        }

        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(type)) {
          return TypeKind.NON_NULL;
        }
        /* c8 ignore next 3 */
        // Not reachable, all possible types have been considered)

         false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__.invariant)(false, `Unexpected type: "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_4__.inspect)(type)}".`);
      },
    },
    name: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (type) => ('name' in type ? type.name : undefined),
    },
    description: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (
        type, // FIXME: add test case
      ) =>
        /* c8 ignore next */
        'description' in type ? type.description : undefined,
    },
    specifiedByURL: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (obj) =>
        'specifiedByURL' in obj ? obj.specifiedByURL : undefined,
    },
    fields: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Field)),
      args: {
        includeDeprecated: {
          type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(type, { includeDeprecated }) {
        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(type) || (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(type)) {
          const fields = Object.values(type.getFields());
          return includeDeprecated
            ? fields
            : fields.filter((field) => field.deprecationReason == null);
        }
      },
    },
    interfaces: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Type)),

      resolve(type) {
        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(type) || (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(type)) {
          return type.getInterfaces();
        }
      },
    },
    possibleTypes: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Type)),

      resolve(type, _args, _context, { schema }) {
        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isAbstractType)(type)) {
          return schema.getPossibleTypes(type);
        }
      },
    },
    enumValues: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__EnumValue)),
      args: {
        includeDeprecated: {
          type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(type, { includeDeprecated }) {
        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(type)) {
          const values = type.getValues();
          return includeDeprecated
            ? values
            : values.filter((field) => field.deprecationReason == null);
        }
      },
    },
    inputFields: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__InputValue)),
      args: {
        includeDeprecated: {
          type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(type, { includeDeprecated }) {
        if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(type)) {
          const values = Object.values(type.getFields());
          return includeDeprecated
            ? values
            : values.filter((field) => field.deprecationReason == null);
        }
      },
    },
    ofType: {
      type: __Type,
      resolve: (type) => ('ofType' in type ? type.ofType : undefined),
    },
  }),
});
const __Field = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLObjectType({
  name: '__Field',
  description:
    'Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.',
  fields: () => ({
    name: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString),
      resolve: (field) => field.name,
    },
    description: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (field) => field.description,
    },
    args: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(
        new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLList(new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__InputValue)),
      ),
      args: {
        includeDeprecated: {
          type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean,
          defaultValue: false,
        },
      },

      resolve(field, { includeDeprecated }) {
        return includeDeprecated
          ? field.args
          : field.args.filter((arg) => arg.deprecationReason == null);
      },
    },
    type: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Type),
      resolve: (field) => field.type,
    },
    isDeprecated: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean),
      resolve: (field) => field.deprecationReason != null,
    },
    deprecationReason: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (field) => field.deprecationReason,
    },
  }),
});
const __InputValue = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLObjectType({
  name: '__InputValue',
  description:
    'Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.',
  fields: () => ({
    name: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString),
      resolve: (inputValue) => inputValue.name,
    },
    description: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (inputValue) => inputValue.description,
    },
    type: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Type),
      resolve: (inputValue) => inputValue.type,
    },
    defaultValue: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      description:
        'A GraphQL-formatted string representing the default value for this input value.',

      resolve(inputValue) {
        const { type, defaultValue } = inputValue;
        const valueAST = (0,_utilities_astFromValue_mjs__WEBPACK_IMPORTED_MODULE_5__.astFromValue)(defaultValue, type);
        return valueAST ? (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__.print)(valueAST) : null;
      },
    },
    isDeprecated: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean),
      resolve: (field) => field.deprecationReason != null,
    },
    deprecationReason: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (obj) => obj.deprecationReason,
    },
  }),
});
const __EnumValue = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLObjectType({
  name: '__EnumValue',
  description:
    'One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.',
  fields: () => ({
    name: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString),
      resolve: (enumValue) => enumValue.name,
    },
    description: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (enumValue) => enumValue.description,
    },
    isDeprecated: {
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLBoolean),
      resolve: (enumValue) => enumValue.deprecationReason != null,
    },
    deprecationReason: {
      type: _scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString,
      resolve: (enumValue) => enumValue.deprecationReason,
    },
  }),
});
let TypeKind;

(function (TypeKind) {
  TypeKind['SCALAR'] = 'SCALAR';
  TypeKind['OBJECT'] = 'OBJECT';
  TypeKind['INTERFACE'] = 'INTERFACE';
  TypeKind['UNION'] = 'UNION';
  TypeKind['ENUM'] = 'ENUM';
  TypeKind['INPUT_OBJECT'] = 'INPUT_OBJECT';
  TypeKind['LIST'] = 'LIST';
  TypeKind['NON_NULL'] = 'NON_NULL';
})(TypeKind || (TypeKind = {}));

const __TypeKind = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLEnumType({
  name: '__TypeKind',
  description: 'An enum describing what kind of type a given `__Type` is.',
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: 'Indicates this type is a scalar.',
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description:
        'Indicates this type is an object. `fields` and `interfaces` are valid fields.',
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description:
        'Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields.',
    },
    UNION: {
      value: TypeKind.UNION,
      description:
        'Indicates this type is a union. `possibleTypes` is a valid field.',
    },
    ENUM: {
      value: TypeKind.ENUM,
      description:
        'Indicates this type is an enum. `enumValues` is a valid field.',
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description:
        'Indicates this type is an input object. `inputFields` is a valid field.',
    },
    LIST: {
      value: TypeKind.LIST,
      description: 'Indicates this type is a list. `ofType` is a valid field.',
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description:
        'Indicates this type is a non-null. `ofType` is a valid field.',
    },
  },
});
/**
 * Note that these are GraphQLField and not GraphQLFieldConfig,
 * so the format for args is different.
 */

const SchemaMetaFieldDef = {
  name: '__schema',
  type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(__Schema),
  description: 'Access the current type schema of this server.',
  args: [],
  resolve: (_source, _args, _context, { schema }) => schema,
  deprecationReason: undefined,
  extensions: Object.create(null),
  astNode: undefined,
};
const TypeMetaFieldDef = {
  name: '__type',
  type: __Type,
  description: 'Request the type information of a single type.',
  args: [
    {
      name: 'name',
      description: undefined,
      type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString),
      defaultValue: undefined,
      deprecationReason: undefined,
      extensions: Object.create(null),
      astNode: undefined,
    },
  ],
  resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
  deprecationReason: undefined,
  extensions: Object.create(null),
  astNode: undefined,
};
const TypeNameMetaFieldDef = {
  name: '__typename',
  type: new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLNonNull(_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLString),
  description: 'The name of the current Object type at runtime.',
  args: [],
  resolve: (_source, _args, _context, { parentType }) => parentType.name,
  deprecationReason: undefined,
  extensions: Object.create(null),
  astNode: undefined,
};
const introspectionTypes = Object.freeze([
  __Schema,
  __Directive,
  __DirectiveLocation,
  __Type,
  __Field,
  __InputValue,
  __EnumValue,
  __TypeKind,
]);
function isIntrospectionType(type) {
  return introspectionTypes.some(({ name }) => type.name === name);
}


/***/ }),

/***/ "../../graphql/type/scalars.mjs":
/*!**************************************!*\
  !*** ../../graphql/type/scalars.mjs ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GRAPHQL_MAX_INT": () => (/* binding */ GRAPHQL_MAX_INT),
/* harmony export */   "GRAPHQL_MIN_INT": () => (/* binding */ GRAPHQL_MIN_INT),
/* harmony export */   "GraphQLInt": () => (/* binding */ GraphQLInt),
/* harmony export */   "GraphQLFloat": () => (/* binding */ GraphQLFloat),
/* harmony export */   "GraphQLString": () => (/* binding */ GraphQLString),
/* harmony export */   "GraphQLBoolean": () => (/* binding */ GraphQLBoolean),
/* harmony export */   "GraphQLID": () => (/* binding */ GraphQLID),
/* harmony export */   "specifiedScalarTypes": () => (/* binding */ specifiedScalarTypes),
/* harmony export */   "isSpecifiedScalarType": () => (/* binding */ isSpecifiedScalarType)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definition.mjs */ "../../graphql/type/definition.mjs");






/**
 * Maximum possible Int value as per GraphQL Spec (32-bit signed integer).
 * n.b. This differs from JavaScript's numbers that are IEEE 754 doubles safe up-to 2^53 - 1
 * */

const GRAPHQL_MAX_INT = 2147483647;
/**
 * Minimum possible Int value as per GraphQL Spec (32-bit signed integer).
 * n.b. This differs from JavaScript's numbers that are IEEE 754 doubles safe starting at -(2^53 - 1)
 * */

const GRAPHQL_MIN_INT = -2147483648;
const GraphQLInt = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLScalarType({
  name: 'Int',
  description:
    'The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'boolean') {
      return coercedValue ? 1 : 0;
    }

    let num = coercedValue;

    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = Number(coercedValue);
    }

    if (typeof num !== 'number' || !Number.isInteger(num)) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Int cannot represent non-integer value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(coercedValue)}`,
      );
    }

    if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        'Int cannot represent non 32-bit signed integer value: ' +
          (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(coercedValue),
      );
    }

    return num;
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'number' || !Number.isInteger(inputValue)) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Int cannot represent non-integer value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(inputValue)}`,
      );
    }

    if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Int cannot represent non 32-bit signed integer value: ${inputValue}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INT) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Int cannot represent non-integer value: ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__.print)(valueNode)}`,
        valueNode,
      );
    }

    const num = parseInt(valueNode.value, 10);

    if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Int cannot represent non 32-bit signed integer value: ${valueNode.value}`,
        valueNode,
      );
    }

    return num;
  },
});
const GraphQLFloat = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLScalarType({
  name: 'Float',
  description:
    'The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'boolean') {
      return coercedValue ? 1 : 0;
    }

    let num = coercedValue;

    if (typeof coercedValue === 'string' && coercedValue !== '') {
      num = Number(coercedValue);
    }

    if (typeof num !== 'number' || !Number.isFinite(num)) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Float cannot represent non numeric value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(coercedValue)}`,
      );
    }

    return num;
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'number' || !Number.isFinite(inputValue)) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Float cannot represent non numeric value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(inputValue)}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FLOAT && valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INT) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Float cannot represent non numeric value: ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__.print)(valueNode)}`,
        valueNode,
      );
    }

    return parseFloat(valueNode.value);
  },
});
const GraphQLString = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLScalarType({
  name: 'String',
  description:
    'The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue); // Serialize string, boolean and number values to a string, but do not
    // attempt to coerce object, function, symbol, or other types as strings.

    if (typeof coercedValue === 'string') {
      return coercedValue;
    }

    if (typeof coercedValue === 'boolean') {
      return coercedValue ? 'true' : 'false';
    }

    if (typeof coercedValue === 'number' && Number.isFinite(coercedValue)) {
      return coercedValue.toString();
    }

    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
      `String cannot represent value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(outputValue)}`,
    );
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'string') {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `String cannot represent a non string value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(inputValue)}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.STRING) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `String cannot represent a non string value: ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__.print)(valueNode)}`,
        valueNode,
      );
    }

    return valueNode.value;
  },
});
const GraphQLBoolean = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLScalarType({
  name: 'Boolean',
  description: 'The `Boolean` scalar type represents `true` or `false`.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'boolean') {
      return coercedValue;
    }

    if (Number.isFinite(coercedValue)) {
      return coercedValue !== 0;
    }

    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
      `Boolean cannot represent a non boolean value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(coercedValue)}`,
    );
  },

  parseValue(inputValue) {
    if (typeof inputValue !== 'boolean') {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Boolean cannot represent a non boolean value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(inputValue)}`,
      );
    }

    return inputValue;
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.BOOLEAN) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        `Boolean cannot represent a non boolean value: ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__.print)(valueNode)}`,
        valueNode,
      );
    }

    return valueNode.value;
  },
});
const GraphQLID = new _definition_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLScalarType({
  name: 'ID',
  description:
    'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',

  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);

    if (typeof coercedValue === 'string') {
      return coercedValue;
    }

    if (Number.isInteger(coercedValue)) {
      return String(coercedValue);
    }

    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
      `ID cannot represent value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(outputValue)}`,
    );
  },

  parseValue(inputValue) {
    if (typeof inputValue === 'string') {
      return inputValue;
    }

    if (typeof inputValue === 'number' && Number.isInteger(inputValue)) {
      return inputValue.toString();
    }

    throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(`ID cannot represent value: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(inputValue)}`);
  },

  parseLiteral(valueNode) {
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.STRING && valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INT) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
        'ID cannot represent a non-string and non-integer value: ' +
          (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__.print)(valueNode),
        valueNode,
      );
    }

    return valueNode.value;
  },
});
const specifiedScalarTypes = Object.freeze([
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
]);
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(({ name }) => type.name === name);
} // Support serializing objects with custom valueOf() or toJSON() functions -
// a common way to represent a complex value which can be represented as
// a string (ex: MongoDB id objects).

function serializeObject(outputValue) {
  if ((0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectLike)(outputValue)) {
    if (typeof outputValue.valueOf === 'function') {
      const valueOfResult = outputValue.valueOf();

      if (!(0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectLike)(valueOfResult)) {
        return valueOfResult;
      }
    }

    if (typeof outputValue.toJSON === 'function') {
      return outputValue.toJSON();
    }
  }

  return outputValue;
}


/***/ }),

/***/ "../../graphql/type/schema.mjs":
/*!*************************************!*\
  !*** ../../graphql/type/schema.mjs ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isSchema": () => (/* binding */ isSchema),
/* harmony export */   "assertSchema": () => (/* binding */ assertSchema),
/* harmony export */   "GraphQLSchema": () => (/* binding */ GraphQLSchema)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/instanceOf.mjs */ "../../graphql/jsutils/instanceOf.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsutils/toObjMap.mjs */ "../../graphql/jsutils/toObjMap.mjs");
/* harmony import */ var _language_ast_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../language/ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _definition_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _directives_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _introspection_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./introspection.mjs */ "../../graphql/type/introspection.mjs");









/**
 * Test if the given value is a GraphQL schema.
 */

function isSchema(schema) {
  return (0,_jsutils_instanceOf_mjs__WEBPACK_IMPORTED_MODULE_0__.instanceOf)(schema, GraphQLSchema);
}
function assertSchema(schema) {
  if (!isSchema(schema)) {
    throw new Error(`Expected ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(schema)} to be a GraphQL schema.`);
  }

  return schema;
}
/**
 * Custom extensions
 *
 * @remarks
 * Use a unique identifier name for your extension, for example the name of
 * your library or project. Do not use a shortened identifier as this increases
 * the risk of conflicts. We recommend you add at most one extension field,
 * an object which can contain all the values you need.
 */

/**
 * Schema Definition
 *
 * A Schema is created by supplying the root types of each type of operation,
 * query and mutation (optional). A schema definition is then supplied to the
 * validator and executor.
 *
 * Example:
 *
 * ```ts
 * const MyAppSchema = new GraphQLSchema({
 *   query: MyAppQueryRootType,
 *   mutation: MyAppMutationRootType,
 * })
 * ```
 *
 * Note: When the schema is constructed, by default only the types that are
 * reachable by traversing the root types are included, other types must be
 * explicitly referenced.
 *
 * Example:
 *
 * ```ts
 * const characterInterface = new GraphQLInterfaceType({
 *   name: 'Character',
 *   ...
 * });
 *
 * const humanType = new GraphQLObjectType({
 *   name: 'Human',
 *   interfaces: [characterInterface],
 *   ...
 * });
 *
 * const droidType = new GraphQLObjectType({
 *   name: 'Droid',
 *   interfaces: [characterInterface],
 *   ...
 * });
 *
 * const schema = new GraphQLSchema({
 *   query: new GraphQLObjectType({
 *     name: 'Query',
 *     fields: {
 *       hero: { type: characterInterface, ... },
 *     }
 *   }),
 *   ...
 *   // Since this schema references only the `Character` interface it's
 *   // necessary to explicitly list the types that implement it if
 *   // you want them to be included in the final schema.
 *   types: [humanType, droidType],
 * })
 * ```
 *
 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
 * the exact list of directives represented and allowed. If `directives` is not
 * provided then a default set of the specified directives (e.g. `@include` and
 * `@skip`) will be used. If you wish to provide *additional* directives to these
 * specified directives, you must explicitly declare them. Example:
 *
 * ```ts
 * const MyAppSchema = new GraphQLSchema({
 *   ...
 *   directives: specifiedDirectives.concat([ myCustomDirective ]),
 * })
 * ```
 */
class GraphQLSchema {
  // Used as a cache for validateSchema().
  constructor(config) {
    var _config$extensionASTN, _config$directives;

    // If this schema was built from a source known to be valid, then it may be
    // marked with assumeValid to avoid an additional type system validation.
    this.__validationErrors = config.assumeValid === true ? [] : undefined; // Check for common mistakes during construction to produce early errors.

    (0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectLike)(config) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_3__.devAssert)(false, 'Must provide configuration object.');
    !config.types ||
      Array.isArray(config.types) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_3__.devAssert)(
        false,
        `"types" must be Array if provided but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(config.types)}.`,
      );
    !config.directives ||
      Array.isArray(config.directives) ||
      (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_3__.devAssert)(
        false,
        '"directives" must be Array if provided but got: ' +
          `${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(config.directives)}.`,
      );
    this.description = config.description;
    this.extensions = (0,_jsutils_toObjMap_mjs__WEBPACK_IMPORTED_MODULE_4__.toObjMap)(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes =
      (_config$extensionASTN = config.extensionASTNodes) !== null &&
      _config$extensionASTN !== void 0
        ? _config$extensionASTN
        : [];
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription; // Provide specified directives (e.g. @include and @skip) by default.

    this._directives =
      (_config$directives = config.directives) !== null &&
      _config$directives !== void 0
        ? _config$directives
        : _directives_mjs__WEBPACK_IMPORTED_MODULE_5__.specifiedDirectives; // To preserve order of user-provided types, we add first to add them to
    // the set of "collected" types, so `collectReferencedTypes` ignore them.

    const allReferencedTypes = new Set(config.types);

    if (config.types != null) {
      for (const type of config.types) {
        // When we ready to process this type, we remove it from "collected" types
        // and then add it together with all dependent types in the correct position.
        allReferencedTypes.delete(type);
        collectReferencedTypes(type, allReferencedTypes);
      }
    }

    if (this._queryType != null) {
      collectReferencedTypes(this._queryType, allReferencedTypes);
    }

    if (this._mutationType != null) {
      collectReferencedTypes(this._mutationType, allReferencedTypes);
    }

    if (this._subscriptionType != null) {
      collectReferencedTypes(this._subscriptionType, allReferencedTypes);
    }

    for (const directive of this._directives) {
      // Directives are not validated until validateSchema() is called.
      if ((0,_directives_mjs__WEBPACK_IMPORTED_MODULE_5__.isDirective)(directive)) {
        for (const arg of directive.args) {
          collectReferencedTypes(arg.type, allReferencedTypes);
        }
      }
    }

    collectReferencedTypes(_introspection_mjs__WEBPACK_IMPORTED_MODULE_6__.__Schema, allReferencedTypes); // Storing the resulting map for reference by the schema.

    this._typeMap = Object.create(null);
    this._subTypeMap = Object.create(null); // Keep track of all implementations by interface name.

    this._implementationsMap = Object.create(null);

    for (const namedType of allReferencedTypes) {
      if (namedType == null) {
        continue;
      }

      const typeName = namedType.name;
      typeName ||
        (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_3__.devAssert)(
          false,
          'One of the provided types for building the Schema is missing a name.',
        );

      if (this._typeMap[typeName] !== undefined) {
        throw new Error(
          `Schema must contain uniquely named types but contains multiple types named "${typeName}".`,
        );
      }

      this._typeMap[typeName] = namedType;

      if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isInterfaceType)(namedType)) {
        // Store implementations by interface.
        for (const iface of namedType.getInterfaces()) {
          if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isInterfaceType)(iface)) {
            let implementations = this._implementationsMap[iface.name];

            if (implementations === undefined) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: [],
              };
            }

            implementations.interfaces.push(namedType);
          }
        }
      } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isObjectType)(namedType)) {
        // Store implementations by objects.
        for (const iface of namedType.getInterfaces()) {
          if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isInterfaceType)(iface)) {
            let implementations = this._implementationsMap[iface.name];

            if (implementations === undefined) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: [],
              };
            }

            implementations.objects.push(namedType);
          }
        }
      }
    }
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLSchema';
  }

  getQueryType() {
    return this._queryType;
  }

  getMutationType() {
    return this._mutationType;
  }

  getSubscriptionType() {
    return this._subscriptionType;
  }

  getRootType(operation) {
    switch (operation) {
      case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_8__.OperationTypeNode.QUERY:
        return this.getQueryType();

      case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_8__.OperationTypeNode.MUTATION:
        return this.getMutationType();

      case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_8__.OperationTypeNode.SUBSCRIPTION:
        return this.getSubscriptionType();
    }
  }

  getTypeMap() {
    return this._typeMap;
  }

  getType(name) {
    return this.getTypeMap()[name];
  }

  getPossibleTypes(abstractType) {
    return (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isUnionType)(abstractType)
      ? abstractType.getTypes()
      : this.getImplementations(abstractType).objects;
  }

  getImplementations(interfaceType) {
    const implementations = this._implementationsMap[interfaceType.name];
    return implementations !== null && implementations !== void 0
      ? implementations
      : {
          objects: [],
          interfaces: [],
        };
  }

  isSubType(abstractType, maybeSubType) {
    let map = this._subTypeMap[abstractType.name];

    if (map === undefined) {
      map = Object.create(null);

      if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isUnionType)(abstractType)) {
        for (const type of abstractType.getTypes()) {
          map[type.name] = true;
        }
      } else {
        const implementations = this.getImplementations(abstractType);

        for (const type of implementations.objects) {
          map[type.name] = true;
        }

        for (const type of implementations.interfaces) {
          map[type.name] = true;
        }
      }

      this._subTypeMap[abstractType.name] = map;
    }

    return map[maybeSubType.name] !== undefined;
  }

  getDirectives() {
    return this._directives;
  }

  getDirective(name) {
    return this.getDirectives().find((directive) => directive.name === name);
  }

  toConfig() {
    return {
      description: this.description,
      query: this.getQueryType(),
      mutation: this.getMutationType(),
      subscription: this.getSubscriptionType(),
      types: Object.values(this.getTypeMap()),
      directives: this.getDirectives(),
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
      assumeValid: this.__validationErrors !== undefined,
    };
  }
}

function collectReferencedTypes(type, typeSet) {
  const namedType = (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.getNamedType)(type);

  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);

    if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isUnionType)(namedType)) {
      for (const memberType of namedType.getTypes()) {
        collectReferencedTypes(memberType, typeSet);
      }
    } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isObjectType)(namedType) || (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isInterfaceType)(namedType)) {
      for (const interfaceType of namedType.getInterfaces()) {
        collectReferencedTypes(interfaceType, typeSet);
      }

      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);

        for (const arg of field.args) {
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isInputObjectType)(namedType)) {
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
      }
    }
  }

  return typeSet;
}


/***/ }),

/***/ "../../graphql/type/validate.mjs":
/*!***************************************!*\
  !*** ../../graphql/type/validate.mjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateSchema": () => (/* binding */ validateSchema),
/* harmony export */   "assertValidSchema": () => (/* binding */ assertValidSchema)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_ast_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/typeComparators.mjs */ "../../graphql/utilities/typeComparators.mjs");
/* harmony import */ var _definition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _directives_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _introspection_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _schema_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema.mjs */ "../../graphql/type/schema.mjs");








/**
 * Implements the "Type Validation" sub-sections of the specification's
 * "Type System" section.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the Schema is valid.
 */

function validateSchema(schema) {
  // First check to ensure the provided value is in fact a GraphQLSchema.
  (0,_schema_mjs__WEBPACK_IMPORTED_MODULE_0__.assertSchema)(schema); // If this Schema has already been validated, return the previous results.

  if (schema.__validationErrors) {
    return schema.__validationErrors;
  } // Validate the schema, producing a list of errors.

  const context = new SchemaValidationContext(schema);
  validateRootTypes(context);
  validateDirectives(context);
  validateTypes(context); // Persist the results of validation before returning to ensure validation
  // does not run multiple times for this schema.

  const errors = context.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
/**
 * Utility function which asserts a schema is valid by throwing an error if
 * it is invalid.
 */

function assertValidSchema(schema) {
  const errors = validateSchema(schema);

  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join('\n\n'));
  }
}

class SchemaValidationContext {
  constructor(schema) {
    this._errors = [];
    this.schema = schema;
  }

  reportError(message, nodes) {
    const _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;

    this._errors.push(new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(message, _nodes));
  }

  getErrors() {
    return this._errors;
  }
}

function validateRootTypes(context) {
  const schema = context.schema;
  const queryType = schema.getQueryType();

  if (!queryType) {
    context.reportError('Query root type must be provided.', schema.astNode);
  } else if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(queryType)) {
    var _getOperationTypeNode;

    context.reportError(
      `Query root type must be Object type, it cannot be ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(
        queryType,
      )}.`,
      (_getOperationTypeNode = getOperationTypeNode(
        schema,
        _language_ast_mjs__WEBPACK_IMPORTED_MODULE_4__.OperationTypeNode.QUERY,
      )) !== null && _getOperationTypeNode !== void 0
        ? _getOperationTypeNode
        : queryType.astNode,
    );
  }

  const mutationType = schema.getMutationType();

  if (mutationType && !(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(mutationType)) {
    var _getOperationTypeNode2;

    context.reportError(
      'Mutation root type must be Object type if provided, it cannot be ' +
        `${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(mutationType)}.`,
      (_getOperationTypeNode2 = getOperationTypeNode(
        schema,
        _language_ast_mjs__WEBPACK_IMPORTED_MODULE_4__.OperationTypeNode.MUTATION,
      )) !== null && _getOperationTypeNode2 !== void 0
        ? _getOperationTypeNode2
        : mutationType.astNode,
    );
  }

  const subscriptionType = schema.getSubscriptionType();

  if (subscriptionType && !(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(subscriptionType)) {
    var _getOperationTypeNode3;

    context.reportError(
      'Subscription root type must be Object type if provided, it cannot be ' +
        `${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(subscriptionType)}.`,
      (_getOperationTypeNode3 = getOperationTypeNode(
        schema,
        _language_ast_mjs__WEBPACK_IMPORTED_MODULE_4__.OperationTypeNode.SUBSCRIPTION,
      )) !== null && _getOperationTypeNode3 !== void 0
        ? _getOperationTypeNode3
        : subscriptionType.astNode,
    );
  }
}

function getOperationTypeNode(schema, operation) {
  var _flatMap$find;

  return (_flatMap$find = [schema.astNode, ...schema.extensionASTNodes]
    .flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (schemaNode) => {
        var _schemaNode$operation;

        return (
          /* c8 ignore next */
          (_schemaNode$operation =
            schemaNode === null || schemaNode === void 0
              ? void 0
              : schemaNode.operationTypes) !== null &&
            _schemaNode$operation !== void 0
            ? _schemaNode$operation
            : []
        );
      },
    )
    .find((operationNode) => operationNode.operation === operation)) === null ||
    _flatMap$find === void 0
    ? void 0
    : _flatMap$find.type;
}

function validateDirectives(context) {
  for (const directive of context.schema.getDirectives()) {
    // Ensure all directives are in fact GraphQL directives.
    if (!(0,_directives_mjs__WEBPACK_IMPORTED_MODULE_5__.isDirective)(directive)) {
      context.reportError(
        `Expected directive but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(directive)}.`,
        directive === null || directive === void 0 ? void 0 : directive.astNode,
      );
      continue;
    } // Ensure they are named correctly.

    validateName(context, directive); // TODO: Ensure proper locations.
    // Ensure the arguments are valid.

    for (const arg of directive.args) {
      // Ensure they are named correctly.
      validateName(context, arg); // Ensure the type is an input type.

      if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputType)(arg.type)) {
        context.reportError(
          `The type of @${directive.name}(${arg.name}:) must be Input Type ` +
            `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(arg.type)}.`,
          arg.astNode,
        );
      }

      if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isRequiredArgument)(arg) && arg.deprecationReason != null) {
        var _arg$astNode;

        context.reportError(
          `Required argument @${directive.name}(${arg.name}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode = arg.astNode) === null || _arg$astNode === void 0
              ? void 0
              : _arg$astNode.type,
          ],
        );
      }
    }
  }
}

function validateName(context, node) {
  // Ensure names are valid, however introspection types opt out.
  if (node.name.startsWith('__')) {
    context.reportError(
      `Name "${node.name}" must not begin with "__", which is reserved by GraphQL introspection.`,
      node.astNode,
    );
  }
}

function validateTypes(context) {
  const validateInputObjectCircularRefs =
    createInputObjectCircularRefsValidator(context);
  const typeMap = context.schema.getTypeMap();

  for (const type of Object.values(typeMap)) {
    // Ensure all provided types are in fact GraphQL type.
    if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNamedType)(type)) {
      context.reportError(
        `Expected GraphQL named type but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(type)}.`,
        type.astNode,
      );
      continue;
    } // Ensure it is named correctly (excluding introspection types).

    if (!(0,_introspection_mjs__WEBPACK_IMPORTED_MODULE_6__.isIntrospectionType)(type)) {
      validateName(context, type);
    }

    if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(type)) {
      // Ensure fields are valid
      validateFields(context, type); // Ensure objects implement the interfaces they claim to.

      validateInterfaces(context, type);
    } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType)(type)) {
      // Ensure fields are valid.
      validateFields(context, type); // Ensure interfaces implement the interfaces they claim to.

      validateInterfaces(context, type);
    } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isUnionType)(type)) {
      // Ensure Unions include valid member types.
      validateUnionMembers(context, type);
    } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isEnumType)(type)) {
      // Ensure Enums have valid values.
      validateEnumValues(context, type);
    } else if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputObjectType)(type)) {
      // Ensure Input Object fields are valid.
      validateInputFields(context, type); // Ensure Input Objects do not contain non-nullable circular references

      validateInputObjectCircularRefs(type);
    }
  }
}

function validateFields(context, type) {
  const fields = Object.values(type.getFields()); // Objects and Interfaces both must define one or more fields.

  if (fields.length === 0) {
    context.reportError(`Type ${type.name} must define one or more fields.`, [
      type.astNode,
      ...type.extensionASTNodes,
    ]);
  }

  for (const field of fields) {
    // Ensure they are named correctly.
    validateName(context, field); // Ensure the type is an output type

    if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isOutputType)(field.type)) {
      var _field$astNode;

      context.reportError(
        `The type of ${type.name}.${field.name} must be Output Type ` +
          `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(field.type)}.`,
        (_field$astNode = field.astNode) === null || _field$astNode === void 0
          ? void 0
          : _field$astNode.type,
      );
    } // Ensure the arguments are valid

    for (const arg of field.args) {
      const argName = arg.name; // Ensure they are named correctly.

      validateName(context, arg); // Ensure the type is an input type

      if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputType)(arg.type)) {
        var _arg$astNode2;

        context.reportError(
          `The type of ${type.name}.${field.name}(${argName}:) must be Input ` +
            `Type but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(arg.type)}.`,
          (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === void 0
            ? void 0
            : _arg$astNode2.type,
        );
      }

      if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isRequiredArgument)(arg) && arg.deprecationReason != null) {
        var _arg$astNode3;

        context.reportError(
          `Required argument ${type.name}.${field.name}(${argName}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === void 0
              ? void 0
              : _arg$astNode3.type,
          ],
        );
      }
    }
  }
}

function validateInterfaces(context, type) {
  const ifaceTypeNames = Object.create(null);

  for (const iface of type.getInterfaces()) {
    if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType)(iface)) {
      context.reportError(
        `Type ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(type)} must only implement Interface types, ` +
          `it cannot implement ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(iface)}.`,
        getAllImplementsInterfaceNodes(type, iface),
      );
      continue;
    }

    if (type === iface) {
      context.reportError(
        `Type ${type.name} cannot implement itself because it would create a circular reference.`,
        getAllImplementsInterfaceNodes(type, iface),
      );
      continue;
    }

    if (ifaceTypeNames[iface.name]) {
      context.reportError(
        `Type ${type.name} can only implement ${iface.name} once.`,
        getAllImplementsInterfaceNodes(type, iface),
      );
      continue;
    }

    ifaceTypeNames[iface.name] = true;
    validateTypeImplementsAncestors(context, type, iface);
    validateTypeImplementsInterface(context, type, iface);
  }
}

function validateTypeImplementsInterface(context, type, iface) {
  const typeFieldMap = type.getFields(); // Assert each interface field is implemented.

  for (const ifaceField of Object.values(iface.getFields())) {
    const fieldName = ifaceField.name;
    const typeField = typeFieldMap[fieldName]; // Assert interface field exists on type.

    if (!typeField) {
      context.reportError(
        `Interface field ${iface.name}.${fieldName} expected but ${type.name} does not provide it.`,
        [ifaceField.astNode, type.astNode, ...type.extensionASTNodes],
      );
      continue;
    } // Assert interface field type is satisfied by type field type, by being
    // a valid subtype. (covariant)

    if (!(0,_utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_7__.isTypeSubTypeOf)(context.schema, typeField.type, ifaceField.type)) {
      var _ifaceField$astNode, _typeField$astNode;

      context.reportError(
        `Interface field ${iface.name}.${fieldName} expects type ` +
          `${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(ifaceField.type)} but ${type.name}.${fieldName} ` +
          `is type ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(typeField.type)}.`,
        [
          (_ifaceField$astNode = ifaceField.astNode) === null ||
          _ifaceField$astNode === void 0
            ? void 0
            : _ifaceField$astNode.type,
          (_typeField$astNode = typeField.astNode) === null ||
          _typeField$astNode === void 0
            ? void 0
            : _typeField$astNode.type,
        ],
      );
    } // Assert each interface field arg is implemented.

    for (const ifaceArg of ifaceField.args) {
      const argName = ifaceArg.name;
      const typeArg = typeField.args.find((arg) => arg.name === argName); // Assert interface field arg exists on object field.

      if (!typeArg) {
        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expected but ${type.name}.${fieldName} does not provide it.`,
          [ifaceArg.astNode, typeField.astNode],
        );
        continue;
      } // Assert interface field arg type matches object field arg type.
      // (invariant)
      // TODO: change to contravariant?

      if (!(0,_utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_7__.isEqualType)(ifaceArg.type, typeArg.type)) {
        var _ifaceArg$astNode, _typeArg$astNode;

        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) ` +
            `expects type ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(ifaceArg.type)} but ` +
            `${type.name}.${fieldName}(${argName}:) is type ` +
            `${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(typeArg.type)}.`,
          [
            (_ifaceArg$astNode = ifaceArg.astNode) === null ||
            _ifaceArg$astNode === void 0
              ? void 0
              : _ifaceArg$astNode.type,
            (_typeArg$astNode = typeArg.astNode) === null ||
            _typeArg$astNode === void 0
              ? void 0
              : _typeArg$astNode.type,
          ],
        );
      } // TODO: validate default values?
    } // Assert additional arguments must not be required.

    for (const typeArg of typeField.args) {
      const argName = typeArg.name;
      const ifaceArg = ifaceField.args.find((arg) => arg.name === argName);

      if (!ifaceArg && (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isRequiredArgument)(typeArg)) {
        context.reportError(
          `Object field ${type.name}.${fieldName} includes required argument ${argName} that is missing from the Interface field ${iface.name}.${fieldName}.`,
          [typeArg.astNode, ifaceField.astNode],
        );
      }
    }
  }
}

function validateTypeImplementsAncestors(context, type, iface) {
  const ifaceInterfaces = type.getInterfaces();

  for (const transitive of iface.getInterfaces()) {
    if (!ifaceInterfaces.includes(transitive)) {
      context.reportError(
        transitive === type
          ? `Type ${type.name} cannot implement ${iface.name} because it would create a circular reference.`
          : `Type ${type.name} must implement ${transitive.name} because it is implemented by ${iface.name}.`,
        [
          ...getAllImplementsInterfaceNodes(iface, transitive),
          ...getAllImplementsInterfaceNodes(type, iface),
        ],
      );
    }
  }
}

function validateUnionMembers(context, union) {
  const memberTypes = union.getTypes();

  if (memberTypes.length === 0) {
    context.reportError(
      `Union type ${union.name} must define one or more member types.`,
      [union.astNode, ...union.extensionASTNodes],
    );
  }

  const includedTypeNames = Object.create(null);

  for (const memberType of memberTypes) {
    if (includedTypeNames[memberType.name]) {
      context.reportError(
        `Union type ${union.name} can only include type ${memberType.name} once.`,
        getUnionMemberTypeNodes(union, memberType.name),
      );
      continue;
    }

    includedTypeNames[memberType.name] = true;

    if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(memberType)) {
      context.reportError(
        `Union type ${union.name} can only include Object types, ` +
          `it cannot include ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(memberType)}.`,
        getUnionMemberTypeNodes(union, String(memberType)),
      );
    }
  }
}

function validateEnumValues(context, enumType) {
  const enumValues = enumType.getValues();

  if (enumValues.length === 0) {
    context.reportError(
      `Enum type ${enumType.name} must define one or more values.`,
      [enumType.astNode, ...enumType.extensionASTNodes],
    );
  }

  for (const enumValue of enumValues) {
    // Ensure valid name.
    validateName(context, enumValue);
  }
}

function validateInputFields(context, inputObj) {
  const fields = Object.values(inputObj.getFields());

  if (fields.length === 0) {
    context.reportError(
      `Input Object type ${inputObj.name} must define one or more fields.`,
      [inputObj.astNode, ...inputObj.extensionASTNodes],
    );
  } // Ensure the arguments are valid

  for (const field of fields) {
    // Ensure they are named correctly.
    validateName(context, field); // Ensure the type is an input type

    if (!(0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputType)(field.type)) {
      var _field$astNode2;

      context.reportError(
        `The type of ${inputObj.name}.${field.name} must be Input Type ` +
          `but got: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(field.type)}.`,
        (_field$astNode2 = field.astNode) === null || _field$astNode2 === void 0
          ? void 0
          : _field$astNode2.type,
      );
    }

    if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isRequiredInputField)(field) && field.deprecationReason != null) {
      var _field$astNode3;

      context.reportError(
        `Required input field ${inputObj.name}.${field.name} cannot be deprecated.`,
        [
          getDeprecatedDirectiveNode(field.astNode),
          (_field$astNode3 = field.astNode) === null ||
          _field$astNode3 === void 0
            ? void 0
            : _field$astNode3.type,
        ],
      );
    }
  }
}

function createInputObjectCircularRefsValidator(context) {
  // Modified copy of algorithm from 'src/validation/rules/NoFragmentCycles.js'.
  // Tracks already visited types to maintain O(N) and to ensure that cycles
  // are not redundantly reported.
  const visitedTypes = Object.create(null); // Array of types nodes used to produce meaningful errors

  const fieldPath = []; // Position in the type path

  const fieldPathIndexByTypeName = Object.create(null);
  return detectCycleRecursive; // This does a straight-forward DFS to find cycles.
  // It does not terminate when a cycle was found but continues to explore
  // the graph to find all possible cycles.

  function detectCycleRecursive(inputObj) {
    if (visitedTypes[inputObj.name]) {
      return;
    }

    visitedTypes[inputObj.name] = true;
    fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
    const fields = Object.values(inputObj.getFields());

    for (const field of fields) {
      if ((0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(field.type) && (0,_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputObjectType)(field.type.ofType)) {
        const fieldType = field.type.ofType;
        const cycleIndex = fieldPathIndexByTypeName[fieldType.name];
        fieldPath.push(field);

        if (cycleIndex === undefined) {
          detectCycleRecursive(fieldType);
        } else {
          const cyclePath = fieldPath.slice(cycleIndex);
          const pathStr = cyclePath.map((fieldObj) => fieldObj.name).join('.');
          context.reportError(
            `Cannot reference Input Object "${fieldType.name}" within itself through a series of non-null fields: "${pathStr}".`,
            cyclePath.map((fieldObj) => fieldObj.astNode),
          );
        }

        fieldPath.pop();
      }
    }

    fieldPathIndexByTypeName[inputObj.name] = undefined;
  }
}

function getAllImplementsInterfaceNodes(type, iface) {
  const { astNode, extensionASTNodes } = type;
  const nodes =
    astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  return nodes
    .flatMap((typeNode) => {
      var _typeNode$interfaces;

      return (
        /* c8 ignore next */
        (_typeNode$interfaces = typeNode.interfaces) !== null &&
          _typeNode$interfaces !== void 0
          ? _typeNode$interfaces
          : []
      );
    })
    .filter((ifaceNode) => ifaceNode.name.value === iface.name);
}

function getUnionMemberTypeNodes(union, typeName) {
  const { astNode, extensionASTNodes } = union;
  const nodes =
    astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes; // FIXME: https://github.com/graphql/graphql-js/issues/2203

  return nodes
    .flatMap((unionNode) => {
      var _unionNode$types;

      return (
        /* c8 ignore next */
        (_unionNode$types = unionNode.types) !== null &&
          _unionNode$types !== void 0
          ? _unionNode$types
          : []
      );
    })
    .filter((typeNode) => typeNode.name.value === typeName);
}

function getDeprecatedDirectiveNode(definitionNode) {
  var _definitionNode$direc;

  return definitionNode === null || definitionNode === void 0
    ? void 0
    : (_definitionNode$direc = definitionNode.directives) === null ||
      _definitionNode$direc === void 0
    ? void 0
    : _definitionNode$direc.find(
        (node) => node.name.value === _directives_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLDeprecatedDirective.name,
      );
}


/***/ }),

/***/ "../../graphql/utilities/TypeInfo.mjs":
/*!********************************************!*\
  !*** ../../graphql/utilities/TypeInfo.mjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeInfo": () => (/* binding */ TypeInfo),
/* harmony export */   "visitWithTypeInfo": () => (/* binding */ visitWithTypeInfo)
/* harmony export */ });
/* harmony import */ var _language_ast_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../language/ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_visitor_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/visitor.mjs */ "../../graphql/language/visitor.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");






/**
 * TypeInfo is a utility class which, given a GraphQL schema, can keep track
 * of the current field and type definitions at any point in a GraphQL document
 * AST during a recursive descent by calling `enter(node)` and `leave(node)`.
 */

class TypeInfo {
  constructor(
    schema,
    /**
     * Initial type may be provided in rare cases to facilitate traversals
     *  beginning somewhere other than documents.
     */
    initialType,
    /** @deprecated will be removed in 17.0.0 */
    getFieldDefFn,
  ) {
    this._schema = schema;
    this._typeStack = [];
    this._parentTypeStack = [];
    this._inputTypeStack = [];
    this._fieldDefStack = [];
    this._defaultValueStack = [];
    this._directive = null;
    this._argument = null;
    this._enumValue = null;
    this._getFieldDef =
      getFieldDefFn !== null && getFieldDefFn !== void 0
        ? getFieldDefFn
        : getFieldDef;

    if (initialType) {
      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputType)(initialType)) {
        this._inputTypeStack.push(initialType);
      }

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isCompositeType)(initialType)) {
        this._parentTypeStack.push(initialType);
      }

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isOutputType)(initialType)) {
        this._typeStack.push(initialType);
      }
    }
  }

  get [Symbol.toStringTag]() {
    return 'TypeInfo';
  }

  getType() {
    if (this._typeStack.length > 0) {
      return this._typeStack[this._typeStack.length - 1];
    }
  }

  getParentType() {
    if (this._parentTypeStack.length > 0) {
      return this._parentTypeStack[this._parentTypeStack.length - 1];
    }
  }

  getInputType() {
    if (this._inputTypeStack.length > 0) {
      return this._inputTypeStack[this._inputTypeStack.length - 1];
    }
  }

  getParentInputType() {
    if (this._inputTypeStack.length > 1) {
      return this._inputTypeStack[this._inputTypeStack.length - 2];
    }
  }

  getFieldDef() {
    if (this._fieldDefStack.length > 0) {
      return this._fieldDefStack[this._fieldDefStack.length - 1];
    }
  }

  getDefaultValue() {
    if (this._defaultValueStack.length > 0) {
      return this._defaultValueStack[this._defaultValueStack.length - 1];
    }
  }

  getDirective() {
    return this._directive;
  }

  getArgument() {
    return this._argument;
  }

  getEnumValue() {
    return this._enumValue;
  }

  enter(node) {
    const schema = this._schema; // Note: many of the types below are explicitly typed as "unknown" to drop
    // any assumptions of a valid schema to ensure runtime types are properly
    // checked before continuing since TypeInfo is used as part of validation
    // which occurs before guarantees of schema and document validity.

    switch (node.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SELECTION_SET: {
        const namedType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(this.getType());

        this._parentTypeStack.push(
          (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isCompositeType)(namedType) ? namedType : undefined,
        );

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FIELD: {
        const parentType = this.getParentType();
        let fieldDef;
        let fieldType;

        if (parentType) {
          fieldDef = this._getFieldDef(schema, parentType, node);

          if (fieldDef) {
            fieldType = fieldDef.type;
          }
        }

        this._fieldDefStack.push(fieldDef);

        this._typeStack.push((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isOutputType)(fieldType) ? fieldType : undefined);

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.DIRECTIVE:
        this._directive = schema.getDirective(node.name.value);
        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION: {
        const rootType = schema.getRootType(node.operation);

        this._typeStack.push((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(rootType) ? rootType : undefined);

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INLINE_FRAGMENT:
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_DEFINITION: {
        const typeConditionAST = node.typeCondition;
        const outputType = typeConditionAST
          ? (0,_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_2__.typeFromAST)(schema, typeConditionAST)
          : (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(this.getType());

        this._typeStack.push((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isOutputType)(outputType) ? outputType : undefined);

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.VARIABLE_DEFINITION: {
        const inputType = (0,_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_2__.typeFromAST)(schema, node.type);

        this._inputTypeStack.push(
          (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputType)(inputType) ? inputType : undefined,
        );

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ARGUMENT: {
        var _this$getDirective;

        let argDef;
        let argType;
        const fieldOrDirective =
          (_this$getDirective = this.getDirective()) !== null &&
          _this$getDirective !== void 0
            ? _this$getDirective
            : this.getFieldDef();

        if (fieldOrDirective) {
          argDef = fieldOrDirective.args.find(
            (arg) => arg.name === node.name.value,
          );

          if (argDef) {
            argType = argDef.type;
          }
        }

        this._argument = argDef;

        this._defaultValueStack.push(argDef ? argDef.defaultValue : undefined);

        this._inputTypeStack.push((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputType)(argType) ? argType : undefined);

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.LIST: {
        const listType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNullableType)(this.getInputType());
        const itemType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(listType) ? listType.ofType : listType; // List positions never have a default value.

        this._defaultValueStack.push(undefined);

        this._inputTypeStack.push((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputType)(itemType) ? itemType : undefined);

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT_FIELD: {
        const objectType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(this.getInputType());
        let inputFieldType;
        let inputField;

        if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(objectType)) {
          inputField = objectType.getFields()[node.name.value];

          if (inputField) {
            inputFieldType = inputField.type;
          }
        }

        this._defaultValueStack.push(
          inputField ? inputField.defaultValue : undefined,
        );

        this._inputTypeStack.push(
          (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputType)(inputFieldType) ? inputFieldType : undefined,
        );

        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM: {
        const enumType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(this.getInputType());
        let enumValue;

        if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(enumType)) {
          enumValue = enumType.getValue(node.value);
        }

        this._enumValue = enumValue;
        break;
      }

      default: // Ignore other nodes
    }
  }

  leave(node) {
    switch (node.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SELECTION_SET:
        this._parentTypeStack.pop();

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FIELD:
        this._fieldDefStack.pop();

        this._typeStack.pop();

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.DIRECTIVE:
        this._directive = null;
        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION:
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INLINE_FRAGMENT:
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_DEFINITION:
        this._typeStack.pop();

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.VARIABLE_DEFINITION:
        this._inputTypeStack.pop();

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ARGUMENT:
        this._argument = null;

        this._defaultValueStack.pop();

        this._inputTypeStack.pop();

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.LIST:
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT_FIELD:
        this._defaultValueStack.pop();

        this._inputTypeStack.pop();

        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM:
        this._enumValue = null;
        break;

      default: // Ignore other nodes
    }
  }
}

/**
 * Not exactly the same as the executor's definition of getFieldDef, in this
 * statically evaluated environment we do not always have an Object type,
 * and need to handle Interface and Union types.
 */
function getFieldDef(schema, parentType, fieldNode) {
  const name = fieldNode.name.value;

  if (
    name === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__.SchemaMetaFieldDef.name &&
    schema.getQueryType() === parentType
  ) {
    return _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__.SchemaMetaFieldDef;
  }

  if (name === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__.TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__.TypeMetaFieldDef;
  }

  if (name === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__.TypeNameMetaFieldDef.name && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isCompositeType)(parentType)) {
    return _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_3__.TypeNameMetaFieldDef;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(parentType) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(parentType)) {
    return parentType.getFields()[name];
  }
}
/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */

function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter(...args) {
      const node = args[0];
      typeInfo.enter(node);
      const fn = (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_4__.getEnterLeaveForKind)(visitor, node.kind).enter;

      if (fn) {
        const result = fn.apply(visitor, args);

        if (result !== undefined) {
          typeInfo.leave(node);

          if ((0,_language_ast_mjs__WEBPACK_IMPORTED_MODULE_5__.isNode)(result)) {
            typeInfo.enter(result);
          }
        }

        return result;
      }
    },

    leave(...args) {
      const node = args[0];
      const fn = (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_4__.getEnterLeaveForKind)(visitor, node.kind).leave;
      let result;

      if (fn) {
        result = fn.apply(visitor, args);
      }

      typeInfo.leave(node);
      return result;
    },
  };
}


/***/ }),

/***/ "../../graphql/utilities/assertValidName.mjs":
/*!***************************************************!*\
  !*** ../../graphql/utilities/assertValidName.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assertValidName": () => (/* binding */ assertValidName),
/* harmony export */   "isValidNameError": () => (/* binding */ isValidNameError)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_assertName_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/assertName.mjs */ "../../graphql/type/assertName.mjs");



/* c8 ignore start */

/**
 * Upholds the spec rules about naming.
 * @deprecated Please use `assertName` instead. Will be removed in v17
 */

function assertValidName(name) {
  const error = isValidNameError(name);

  if (error) {
    throw error;
  }

  return name;
}
/**
 * Returns an Error if a name is invalid.
 * @deprecated Please use `assertName` instead. Will be removed in v17
 */

function isValidNameError(name) {
  typeof name === 'string' || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_0__.devAssert)(false, 'Expected name to be a string.');

  if (name.startsWith('__')) {
    return new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
      `Name "${name}" must not begin with "__", which is reserved by GraphQL introspection.`,
    );
  }

  try {
    (0,_type_assertName_mjs__WEBPACK_IMPORTED_MODULE_2__.assertName)(name);
  } catch (error) {
    return error;
  }
}
/* c8 ignore stop */


/***/ }),

/***/ "../../graphql/utilities/astFromValue.mjs":
/*!************************************************!*\
  !*** ../../graphql/utilities/astFromValue.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "astFromValue": () => (/* binding */ astFromValue)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_isIterableObject_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/isIterableObject.mjs */ "../../graphql/jsutils/isIterableObject.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/scalars.mjs */ "../../graphql/type/scalars.mjs");







/**
 * Produces a GraphQL Value AST given a JavaScript object.
 * Function will match JavaScript/JSON values to GraphQL AST schema format
 * by using suggested GraphQLInputType. For example:
 *
 *     astFromValue("value", GraphQLString)
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * JavaScript values.
 *
 * | JSON Value    | GraphQL Value        |
 * | ------------- | -------------------- |
 * | Object        | Input Object         |
 * | Array         | List                 |
 * | Boolean       | Boolean              |
 * | String        | String / Enum Value  |
 * | Number        | Int / Float          |
 * | Unknown       | Enum Value           |
 * | null          | NullValue            |
 *
 */

function astFromValue(value, type) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(type)) {
    const astValue = astFromValue(value, type.ofType);

    if (
      (astValue === null || astValue === void 0 ? void 0 : astValue.kind) ===
      _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.NULL
    ) {
      return null;
    }

    return astValue;
  } // only explicit null, not undefined, NaN

  if (value === null) {
    return {
      kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.NULL,
    };
  } // undefined

  if (value === undefined) {
    return null;
  } // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
  // the value is not an array, convert the value using the list's item type.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(type)) {
    const itemType = type.ofType;

    if ((0,_jsutils_isIterableObject_mjs__WEBPACK_IMPORTED_MODULE_2__.isIterableObject)(value)) {
      const valuesNodes = [];

      for (const item of value) {
        const itemNode = astFromValue(item, itemType);

        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }

      return {
        kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.LIST,
        values: valuesNodes,
      };
    }

    return astFromValue(value, itemType);
  } // Populate the fields of the input object by creating ASTs from each value
  // in the JavaScript object according to the fields in the input type.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(type)) {
    if (!(0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_3__.isObjectLike)(value)) {
      return null;
    }

    const fieldNodes = [];

    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);

      if (fieldValue) {
        fieldNodes.push({
          kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT_FIELD,
          name: {
            kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.NAME,
            value: field.name,
          },
          value: fieldValue,
        });
      }
    }

    return {
      kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT,
      fields: fieldNodes,
    };
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isLeafType)(type)) {
    // Since value is an internally represented value, it must be serialized
    // to an externally represented value before converting into an AST.
    const serialized = type.serialize(value);

    if (serialized == null) {
      return null;
    } // Others serialize based on their corresponding JavaScript scalar types.

    if (typeof serialized === 'boolean') {
      return {
        kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.BOOLEAN,
        value: serialized,
      };
    } // JavaScript numbers can be Int or Float values.

    if (typeof serialized === 'number' && Number.isFinite(serialized)) {
      const stringNum = String(serialized);
      return integerStringRegExp.test(stringNum)
        ? {
            kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INT,
            value: stringNum,
          }
        : {
            kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FLOAT,
            value: stringNum,
          };
    }

    if (typeof serialized === 'string') {
      // Enum types use Enum literals.
      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(type)) {
        return {
          kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM,
          value: serialized,
        };
      } // ID types can use Int literals.

      if (type === _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INT,
          value: serialized,
        };
      }

      return {
        kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.STRING,
        value: serialized,
      };
    }

    throw new TypeError(`Cannot convert value to AST: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(serialized)}.`);
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible types have been considered.

   false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_6__.invariant)(false, 'Unexpected input type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(type));
}
/**
 * IntValue:
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit ( Digit+ )?
 */

const integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;


/***/ }),

/***/ "../../graphql/utilities/buildASTSchema.mjs":
/*!**************************************************!*\
  !*** ../../graphql/utilities/buildASTSchema.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildASTSchema": () => (/* binding */ buildASTSchema),
/* harmony export */   "buildSchema": () => (/* binding */ buildSchema)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_parser_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../language/parser.mjs */ "../../graphql/language/parser.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _type_schema_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../type/schema.mjs */ "../../graphql/type/schema.mjs");
/* harmony import */ var _validation_validate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validation/validate.mjs */ "../../graphql/validation/validate.mjs");
/* harmony import */ var _extendSchema_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extendSchema.mjs */ "../../graphql/utilities/extendSchema.mjs");








/**
 * This takes the ast of a schema document produced by the parse function in
 * src/language/parser.js.
 *
 * If no schema definition is provided, then it will look for types named Query,
 * Mutation and Subscription.
 *
 * Given that AST it constructs a GraphQLSchema. The resulting schema
 * has no resolve methods, so execution will use default resolvers.
 */
function buildASTSchema(documentAST, options) {
  (documentAST != null && documentAST.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.DOCUMENT) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_1__.devAssert)(false, 'Must provide valid Document AST.');

  if (
    (options === null || options === void 0 ? void 0 : options.assumeValid) !==
      true &&
    (options === null || options === void 0
      ? void 0
      : options.assumeValidSDL) !== true
  ) {
    (0,_validation_validate_mjs__WEBPACK_IMPORTED_MODULE_2__.assertValidSDL)(documentAST);
  }

  const emptySchemaConfig = {
    description: undefined,
    types: [],
    directives: [],
    extensions: Object.create(null),
    extensionASTNodes: [],
    assumeValid: false,
  };
  const config = (0,_extendSchema_mjs__WEBPACK_IMPORTED_MODULE_3__.extendSchemaImpl)(emptySchemaConfig, documentAST, options);

  if (config.astNode == null) {
    for (const type of config.types) {
      switch (type.name) {
        // Note: While this could make early assertions to get the correctly
        // typed values below, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        case 'Query':
          // @ts-expect-error validated in `validateSchema`
          config.query = type;
          break;

        case 'Mutation':
          // @ts-expect-error validated in `validateSchema`
          config.mutation = type;
          break;

        case 'Subscription':
          // @ts-expect-error validated in `validateSchema`
          config.subscription = type;
          break;
      }
    }
  }

  const directives = [
    ...config.directives, // If specified directives were not explicitly declared, add them.
    ..._type_directives_mjs__WEBPACK_IMPORTED_MODULE_4__.specifiedDirectives.filter((stdDirective) =>
      config.directives.every(
        (directive) => directive.name !== stdDirective.name,
      ),
    ),
  ];
  return new _type_schema_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLSchema({ ...config, directives });
}
/**
 * A helper function to build a GraphQLSchema directly from a source
 * document.
 */

function buildSchema(source, options) {
  const document = (0,_language_parser_mjs__WEBPACK_IMPORTED_MODULE_6__.parse)(source, {
    noLocation:
      options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacyFragmentVariables:
      options === null || options === void 0
        ? void 0
        : options.allowLegacyFragmentVariables,
  });
  return buildASTSchema(document, {
    assumeValidSDL:
      options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid:
      options === null || options === void 0 ? void 0 : options.assumeValid,
  });
}


/***/ }),

/***/ "../../graphql/utilities/buildClientSchema.mjs":
/*!*****************************************************!*\
  !*** ../../graphql/utilities/buildClientSchema.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildClientSchema": () => (/* binding */ buildClientSchema)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/keyValMap.mjs */ "../../graphql/jsutils/keyValMap.mjs");
/* harmony import */ var _language_parser_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../language/parser.mjs */ "../../graphql/language/parser.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../type/directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/scalars.mjs */ "../../graphql/type/scalars.mjs");
/* harmony import */ var _type_schema_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../type/schema.mjs */ "../../graphql/type/schema.mjs");
/* harmony import */ var _valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./valueFromAST.mjs */ "../../graphql/utilities/valueFromAST.mjs");











/**
 * Build a GraphQLSchema for use by client tools.
 *
 * Given the result of a client running the introspection query, creates and
 * returns a GraphQLSchema instance which can be then used with all graphql-js
 * tools, but cannot be used to execute a query, as introspection does not
 * represent the "resolver", "parse" or "serialize" functions or any other
 * server-internal mechanisms.
 *
 * This function expects a complete introspection result. Don't forget to check
 * the "errors" field of a server response before calling this function.
 */

function buildClientSchema(introspection, options) {
  ((0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectLike)(introspection) && (0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectLike)(introspection.__schema)) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_1__.devAssert)(
      false,
      `Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(
        introspection,
      )}.`,
    ); // Get the schema from the introspection result.

  const schemaIntrospection = introspection.__schema; // Iterate through all types, getting the type definition for each.

  const typeMap = (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_3__.keyValMap)(
    schemaIntrospection.types,
    (typeIntrospection) => typeIntrospection.name,
    (typeIntrospection) => buildType(typeIntrospection),
  ); // Include standard types only if they are used.

  for (const stdType of [..._type_scalars_mjs__WEBPACK_IMPORTED_MODULE_4__.specifiedScalarTypes, ..._type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.introspectionTypes]) {
    if (typeMap[stdType.name]) {
      typeMap[stdType.name] = stdType;
    }
  } // Get the root Query, Mutation, and Subscription types.

  const queryType = schemaIntrospection.queryType
    ? getObjectType(schemaIntrospection.queryType)
    : null;
  const mutationType = schemaIntrospection.mutationType
    ? getObjectType(schemaIntrospection.mutationType)
    : null;
  const subscriptionType = schemaIntrospection.subscriptionType
    ? getObjectType(schemaIntrospection.subscriptionType)
    : null; // Get the directives supported by Introspection, assuming empty-set if
  // directives were not queried for.

  const directives = schemaIntrospection.directives
    ? schemaIntrospection.directives.map(buildDirective)
    : []; // Then produce and return a Schema with these types.

  return new _type_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLSchema({
    description: schemaIntrospection.description,
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    types: Object.values(typeMap),
    directives,
    assumeValid:
      options === null || options === void 0 ? void 0 : options.assumeValid,
  }); // Given a type reference in introspection, return the GraphQLType instance.
  // preferring cached instances before building new instances.

  function getType(typeRef) {
    if (typeRef.kind === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.LIST) {
      const itemRef = typeRef.ofType;

      if (!itemRef) {
        throw new Error('Decorated type deeper than introspection query.');
      }

      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLList(getType(itemRef));
    }

    if (typeRef.kind === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.NON_NULL) {
      const nullableRef = typeRef.ofType;

      if (!nullableRef) {
        throw new Error('Decorated type deeper than introspection query.');
      }

      const nullableType = getType(nullableRef);
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLNonNull((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.assertNullableType)(nullableType));
    }

    return getNamedType(typeRef);
  }

  function getNamedType(typeRef) {
    const typeName = typeRef.name;

    if (!typeName) {
      throw new Error(`Unknown type reference: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(typeRef)}.`);
    }

    const type = typeMap[typeName];

    if (!type) {
      throw new Error(
        `Invalid or incomplete schema, unknown type: ${typeName}. Ensure that a full introspection query is used in order to build a client schema.`,
      );
    }

    return type;
  }

  function getObjectType(typeRef) {
    return (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.assertObjectType)(getNamedType(typeRef));
  }

  function getInterfaceType(typeRef) {
    return (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.assertInterfaceType)(getNamedType(typeRef));
  } // Given a type's introspection result, construct the correct
  // GraphQLType instance.

  function buildType(type) {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (type != null && type.name != null && type.kind != null) {
      // FIXME: Properly type IntrospectionType, it's a breaking change so fix in v17
      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      switch (type.kind) {
        case _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.SCALAR:
          return buildScalarDef(type);

        case _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.OBJECT:
          return buildObjectDef(type);

        case _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.INTERFACE:
          return buildInterfaceDef(type);

        case _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.UNION:
          return buildUnionDef(type);

        case _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.ENUM:
          return buildEnumDef(type);

        case _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.INPUT_OBJECT:
          return buildInputObjectDef(type);
      }
    }

    const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(type);
    throw new Error(
      `Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema: ${typeStr}.`,
    );
  }

  function buildScalarDef(scalarIntrospection) {
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLScalarType({
      name: scalarIntrospection.name,
      description: scalarIntrospection.description,
      specifiedByURL: scalarIntrospection.specifiedByURL,
    });
  }

  function buildImplementationsList(implementingIntrospection) {
    // TODO: Temporary workaround until GraphQL ecosystem will fully support
    // 'interfaces' on interface types.
    if (
      implementingIntrospection.interfaces === null &&
      implementingIntrospection.kind === _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.TypeKind.INTERFACE
    ) {
      return [];
    }

    if (!implementingIntrospection.interfaces) {
      const implementingIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(implementingIntrospection);
      throw new Error(
        `Introspection result missing interfaces: ${implementingIntrospectionStr}.`,
      );
    }

    return implementingIntrospection.interfaces.map(getInterfaceType);
  }

  function buildObjectDef(objectIntrospection) {
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLObjectType({
      name: objectIntrospection.name,
      description: objectIntrospection.description,
      interfaces: () => buildImplementationsList(objectIntrospection),
      fields: () => buildFieldDefMap(objectIntrospection),
    });
  }

  function buildInterfaceDef(interfaceIntrospection) {
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLInterfaceType({
      name: interfaceIntrospection.name,
      description: interfaceIntrospection.description,
      interfaces: () => buildImplementationsList(interfaceIntrospection),
      fields: () => buildFieldDefMap(interfaceIntrospection),
    });
  }

  function buildUnionDef(unionIntrospection) {
    if (!unionIntrospection.possibleTypes) {
      const unionIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(unionIntrospection);
      throw new Error(
        `Introspection result missing possibleTypes: ${unionIntrospectionStr}.`,
      );
    }

    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLUnionType({
      name: unionIntrospection.name,
      description: unionIntrospection.description,
      types: () => unionIntrospection.possibleTypes.map(getObjectType),
    });
  }

  function buildEnumDef(enumIntrospection) {
    if (!enumIntrospection.enumValues) {
      const enumIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(enumIntrospection);
      throw new Error(
        `Introspection result missing enumValues: ${enumIntrospectionStr}.`,
      );
    }

    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLEnumType({
      name: enumIntrospection.name,
      description: enumIntrospection.description,
      values: (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_3__.keyValMap)(
        enumIntrospection.enumValues,
        (valueIntrospection) => valueIntrospection.name,
        (valueIntrospection) => ({
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason,
        }),
      ),
    });
  }

  function buildInputObjectDef(inputObjectIntrospection) {
    if (!inputObjectIntrospection.inputFields) {
      const inputObjectIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(inputObjectIntrospection);
      throw new Error(
        `Introspection result missing inputFields: ${inputObjectIntrospectionStr}.`,
      );
    }

    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.GraphQLInputObjectType({
      name: inputObjectIntrospection.name,
      description: inputObjectIntrospection.description,
      fields: () => buildInputValueDefMap(inputObjectIntrospection.inputFields),
    });
  }

  function buildFieldDefMap(typeIntrospection) {
    if (!typeIntrospection.fields) {
      throw new Error(
        `Introspection result missing fields: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(typeIntrospection)}.`,
      );
    }

    return (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_3__.keyValMap)(
      typeIntrospection.fields,
      (fieldIntrospection) => fieldIntrospection.name,
      buildField,
    );
  }

  function buildField(fieldIntrospection) {
    const type = getType(fieldIntrospection.type);

    if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isOutputType)(type)) {
      const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(type);
      throw new Error(
        `Introspection must provide output type for fields, but received: ${typeStr}.`,
      );
    }

    if (!fieldIntrospection.args) {
      const fieldIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(fieldIntrospection);
      throw new Error(
        `Introspection result missing field args: ${fieldIntrospectionStr}.`,
      );
    }

    return {
      description: fieldIntrospection.description,
      deprecationReason: fieldIntrospection.deprecationReason,
      type,
      args: buildInputValueDefMap(fieldIntrospection.args),
    };
  }

  function buildInputValueDefMap(inputValueIntrospections) {
    return (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_3__.keyValMap)(
      inputValueIntrospections,
      (inputValue) => inputValue.name,
      buildInputValue,
    );
  }

  function buildInputValue(inputValueIntrospection) {
    const type = getType(inputValueIntrospection.type);

    if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_7__.isInputType)(type)) {
      const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(type);
      throw new Error(
        `Introspection must provide input type for arguments, but received: ${typeStr}.`,
      );
    }

    const defaultValue =
      inputValueIntrospection.defaultValue != null
        ? (0,_valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_8__.valueFromAST)((0,_language_parser_mjs__WEBPACK_IMPORTED_MODULE_9__.parseValue)(inputValueIntrospection.defaultValue), type)
        : undefined;
    return {
      description: inputValueIntrospection.description,
      type,
      defaultValue,
      deprecationReason: inputValueIntrospection.deprecationReason,
    };
  }

  function buildDirective(directiveIntrospection) {
    if (!directiveIntrospection.args) {
      const directiveIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(directiveIntrospection);
      throw new Error(
        `Introspection result missing directive args: ${directiveIntrospectionStr}.`,
      );
    }

    if (!directiveIntrospection.locations) {
      const directiveIntrospectionStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(directiveIntrospection);
      throw new Error(
        `Introspection result missing directive locations: ${directiveIntrospectionStr}.`,
      );
    }

    return new _type_directives_mjs__WEBPACK_IMPORTED_MODULE_10__.GraphQLDirective({
      name: directiveIntrospection.name,
      description: directiveIntrospection.description,
      isRepeatable: directiveIntrospection.isRepeatable,
      locations: directiveIntrospection.locations.slice(),
      args: buildInputValueDefMap(directiveIntrospection.args),
    });
  }
}


/***/ }),

/***/ "../../graphql/utilities/coerceInputValue.mjs":
/*!****************************************************!*\
  !*** ../../graphql/utilities/coerceInputValue.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coerceInputValue": () => (/* binding */ coerceInputValue)
/* harmony export */ });
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_isIterableObject_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/isIterableObject.mjs */ "../../graphql/jsutils/isIterableObject.mjs");
/* harmony import */ var _jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../jsutils/isObjectLike.mjs */ "../../graphql/jsutils/isObjectLike.mjs");
/* harmony import */ var _jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/Path.mjs */ "../../graphql/jsutils/Path.mjs");
/* harmony import */ var _jsutils_printPathArray_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/printPathArray.mjs */ "../../graphql/jsutils/printPathArray.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");











/**
 * Coerces a JavaScript value given a GraphQL Input Type.
 */
function coerceInputValue(inputValue, type, onError = defaultOnError) {
  return coerceInputValueImpl(inputValue, type, onError, undefined);
}

function defaultOnError(path, invalidValue, error) {
  let errorPrefix = 'Invalid value ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(invalidValue);

  if (path.length > 0) {
    errorPrefix += ` at "value${(0,_jsutils_printPathArray_mjs__WEBPACK_IMPORTED_MODULE_1__.printPathArray)(path)}"`;
  }

  error.message = errorPrefix + ': ' + error.message;
  throw error;
}

function coerceInputValueImpl(inputValue, type, onError, path) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(type)) {
    if (inputValue != null) {
      return coerceInputValueImpl(inputValue, type.ofType, onError, path);
    }

    onError(
      (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path),
      inputValue,
      new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError(
        `Expected non-nullable type "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type)}" not to be null.`,
      ),
    );
    return;
  }

  if (inputValue == null) {
    // Explicitly return the value null.
    return null;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isListType)(type)) {
    const itemType = type.ofType;

    if ((0,_jsutils_isIterableObject_mjs__WEBPACK_IMPORTED_MODULE_5__.isIterableObject)(inputValue)) {
      return Array.from(inputValue, (itemValue, index) => {
        const itemPath = (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.addPath)(path, index, undefined);
        return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
      });
    } // Lists accept a non-list value as a list of one.

    return [coerceInputValueImpl(inputValue, itemType, onError, path)];
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputObjectType)(type)) {
    if (!(0,_jsutils_isObjectLike_mjs__WEBPACK_IMPORTED_MODULE_6__.isObjectLike)(inputValue)) {
      onError(
        (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path),
        inputValue,
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError(`Expected type "${type.name}" to be an object.`),
      );
      return;
    }

    const coercedValue = {};
    const fieldDefs = type.getFields();

    for (const field of Object.values(fieldDefs)) {
      const fieldValue = inputValue[field.name];

      if (fieldValue === undefined) {
        if (field.defaultValue !== undefined) {
          coercedValue[field.name] = field.defaultValue;
        } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(field.type)) {
          const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(field.type);
          onError(
            (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path),
            inputValue,
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError(
              `Field "${field.name}" of required type "${typeStr}" was not provided.`,
            ),
          );
        }

        continue;
      }

      coercedValue[field.name] = coerceInputValueImpl(
        fieldValue,
        field.type,
        onError,
        (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.addPath)(path, field.name, type.name),
      );
    } // Ensure every provided field is defined.

    for (const fieldName of Object.keys(inputValue)) {
      if (!fieldDefs[fieldName]) {
        const suggestions = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_7__.suggestionList)(
          fieldName,
          Object.keys(type.getFields()),
        );
        onError(
          (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path),
          inputValue,
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError(
            `Field "${fieldName}" is not defined by type "${type.name}".` +
              (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_8__.didYouMean)(suggestions),
          ),
        );
      }
    }

    return coercedValue;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isLeafType)(type)) {
    let parseResult; // Scalars and Enums determine if a input value is valid via parseValue(),
    // which can throw to indicate failure. If it throws, maintain a reference
    // to the original error.

    try {
      parseResult = type.parseValue(inputValue);
    } catch (error) {
      if (error instanceof _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError) {
        onError((0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path), inputValue, error);
      } else {
        onError(
          (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path),
          inputValue,
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError(
            `Expected type "${type.name}". ` + error.message,
            undefined,
            undefined,
            undefined,
            undefined,
            error,
          ),
        );
      }

      return;
    }

    if (parseResult === undefined) {
      onError(
        (0,_jsutils_Path_mjs__WEBPACK_IMPORTED_MODULE_3__.pathToArray)(path),
        inputValue,
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_4__.GraphQLError(`Expected type "${type.name}".`),
      );
    }

    return parseResult;
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible types have been considered.

   false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_9__.invariant)(false, 'Unexpected input type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_0__.inspect)(type));
}


/***/ }),

/***/ "../../graphql/utilities/concatAST.mjs":
/*!*********************************************!*\
  !*** ../../graphql/utilities/concatAST.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatAST": () => (/* binding */ concatAST)
/* harmony export */ });
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");

/**
 * Provided a collection of ASTs, presumably each from different files,
 * concatenate the ASTs together into batched AST, useful for validating many
 * GraphQL source files which together represent one conceptual application.
 */

function concatAST(documents) {
  const definitions = [];

  for (const doc of documents) {
    definitions.push(...doc.definitions);
  }

  return {
    kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.DOCUMENT,
    definitions,
  };
}


/***/ }),

/***/ "../../graphql/utilities/extendSchema.mjs":
/*!************************************************!*\
  !*** ../../graphql/utilities/extendSchema.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extendSchema": () => (/* binding */ extendSchema),
/* harmony export */   "extendSchemaImpl": () => (/* binding */ extendSchemaImpl)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/mapValue.mjs */ "../../graphql/jsutils/mapValue.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_predicates_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../language/predicates.mjs */ "../../graphql/language/predicates.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../type/directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../type/scalars.mjs */ "../../graphql/type/scalars.mjs");
/* harmony import */ var _type_schema_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/schema.mjs */ "../../graphql/type/schema.mjs");
/* harmony import */ var _validation_validate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../validation/validate.mjs */ "../../graphql/validation/validate.mjs");
/* harmony import */ var _execution_values_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../execution/values.mjs */ "../../graphql/execution/values.mjs");
/* harmony import */ var _valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./valueFromAST.mjs */ "../../graphql/utilities/valueFromAST.mjs");
















/**
 * Produces a new schema given an existing schema and a document which may
 * contain GraphQL type extensions and definitions. The original schema will
 * remain unaltered.
 *
 * Because a schema represents a graph of references, a schema cannot be
 * extended without effectively making an entire copy. We do not know until it's
 * too late if subgraphs remain unchanged.
 *
 * This algorithm copies the provided schema, applying extensions while
 * producing the copy. The original schema remains unaltered.
 */
function extendSchema(schema, documentAST, options) {
  (0,_type_schema_mjs__WEBPACK_IMPORTED_MODULE_0__.assertSchema)(schema);
  (documentAST != null && documentAST.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.DOCUMENT) ||
    (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(false, 'Must provide valid Document AST.');

  if (
    (options === null || options === void 0 ? void 0 : options.assumeValid) !==
      true &&
    (options === null || options === void 0
      ? void 0
      : options.assumeValidSDL) !== true
  ) {
    (0,_validation_validate_mjs__WEBPACK_IMPORTED_MODULE_3__.assertValidSDLExtension)(documentAST, schema);
  }

  const schemaConfig = schema.toConfig();
  const extendedConfig = extendSchemaImpl(schemaConfig, documentAST, options);
  return schemaConfig === extendedConfig
    ? schema
    : new _type_schema_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLSchema(extendedConfig);
}
/**
 * @internal
 */

function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;

  // Collect the type definitions and extensions found in the document.
  const typeDefs = [];
  const typeExtensionsMap = Object.create(null); // New directives and types are separate because a directives and types can
  // have the same name. For example, a type named "skip".

  const directiveDefs = [];
  let schemaDef; // Schema extensions are collected which may add additional operation types.

  const schemaExtensions = [];

  for (const def of documentAST.definitions) {
    if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if ((0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_4__.isTypeDefinitionNode)(def)) {
      typeDefs.push(def);
    } else if ((0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_4__.isTypeExtensionNode)(def)) {
      const extendedTypeName = def.name.value;
      const existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions
        ? existingTypeExtensions.concat([def])
        : [def];
    } else if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  } // If this document contains no new types, extensions, or directives then
  // return the same unmodified GraphQLSchema instance.

  if (
    Object.keys(typeExtensionsMap).length === 0 &&
    typeDefs.length === 0 &&
    directiveDefs.length === 0 &&
    schemaExtensions.length === 0 &&
    schemaDef == null
  ) {
    return schemaConfig;
  }

  const typeMap = Object.create(null);

  for (const existingType of schemaConfig.types) {
    typeMap[existingType.name] = extendNamedType(existingType);
  }

  for (const typeNode of typeDefs) {
    var _stdTypeMap$name;

    const name = typeNode.name.value;
    typeMap[name] =
      (_stdTypeMap$name = stdTypeMap[name]) !== null &&
      _stdTypeMap$name !== void 0
        ? _stdTypeMap$name
        : buildType(typeNode);
  }

  const operationTypes = {
    // Get the extended root operation types.
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription:
      schemaConfig.subscription && replaceNamedType(schemaConfig.subscription),
    // Then, incorporate schema definition and all schema extensions.
    ...(schemaDef && getOperationTypes([schemaDef])),
    ...getOperationTypes(schemaExtensions),
  }; // Then produce and return a Schema config with these types.

  return {
    description:
      (_schemaDef = schemaDef) === null || _schemaDef === void 0
        ? void 0
        : (_schemaDef$descriptio = _schemaDef.description) === null ||
          _schemaDef$descriptio === void 0
        ? void 0
        : _schemaDef$descriptio.value,
    ...operationTypes,
    types: Object.values(typeMap),
    directives: [
      ...schemaConfig.directives.map(replaceDirective),
      ...directiveDefs.map(buildDirective),
    ],
    extensions: Object.create(null),
    astNode:
      (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0
        ? _schemaDef2
        : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid:
      (_options$assumeValid =
        options === null || options === void 0
          ? void 0
          : options.assumeValid) !== null && _options$assumeValid !== void 0
        ? _options$assumeValid
        : false,
  }; // Below are functions used for producing this schema that have closed over
  // this scope and have access to the schema, cache, and newly defined types.

  function replaceType(type) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isListType)(type)) {
      // @ts-expect-error
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLList(replaceType(type.ofType));
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isNonNullType)(type)) {
      // @ts-expect-error
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLNonNull(replaceType(type.ofType));
    } // @ts-expect-error FIXME

    return replaceNamedType(type);
  }

  function replaceNamedType(type) {
    // Note: While this could make early assertions to get the correctly
    // typed values, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    return typeMap[type.name];
  }

  function replaceDirective(directive) {
    const config = directive.toConfig();
    return new _type_directives_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLDirective({
      ...config,
      args: (0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(config.args, extendArg),
    });
  }

  function extendNamedType(type) {
    if ((0,_type_introspection_mjs__WEBPACK_IMPORTED_MODULE_8__.isIntrospectionType)(type) || (0,_type_scalars_mjs__WEBPACK_IMPORTED_MODULE_9__.isSpecifiedScalarType)(type)) {
      // Builtin types are not extended.
      return type;
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isScalarType)(type)) {
      return extendScalarType(type);
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectType)(type)) {
      return extendObjectType(type);
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isInterfaceType)(type)) {
      return extendInterfaceType(type);
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isUnionType)(type)) {
      return extendUnionType(type);
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isEnumType)(type)) {
      return extendEnumType(type);
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isInputObjectType)(type)) {
      return extendInputObjectType(type);
    }
    /* c8 ignore next 3 */
    // Not reachable, all possible type definition nodes have been considered.

     false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_10__.invariant)(false, 'Unexpected type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_11__.inspect)(type));
  }

  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co !== void 0
        ? _typeExtensionsMap$co
        : [];
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLInputObjectType({
      ...config,
      fields: () => ({
        ...(0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(config.fields, (field) => ({
          ...field,
          type: replaceType(field.type),
        })),
        ...buildInputFieldMap(extensions),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendEnumType(type) {
    var _typeExtensionsMap$ty;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null &&
      _typeExtensionsMap$ty !== void 0
        ? _typeExtensionsMap$ty
        : [];
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLEnumType({
      ...config,
      values: { ...config.values, ...buildEnumValueMap(extensions) },
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendScalarType(type) {
    var _typeExtensionsMap$co2;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co2 !== void 0
        ? _typeExtensionsMap$co2
        : [];
    let specifiedByURL = config.specifiedByURL;

    for (const extensionNode of extensions) {
      var _getSpecifiedByURL;

      specifiedByURL =
        (_getSpecifiedByURL = getSpecifiedByURL(extensionNode)) !== null &&
        _getSpecifiedByURL !== void 0
          ? _getSpecifiedByURL
          : specifiedByURL;
    }

    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLScalarType({
      ...config,
      specifiedByURL,
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendObjectType(type) {
    var _typeExtensionsMap$co3;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co3 !== void 0
        ? _typeExtensionsMap$co3
        : [];
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLObjectType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions),
      ],
      fields: () => ({
        ...(0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(config.fields, extendField),
        ...buildFieldMap(extensions),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co4 !== void 0
        ? _typeExtensionsMap$co4
        : [];
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLInterfaceType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions),
      ],
      fields: () => ({
        ...(0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(config.fields, extendField),
        ...buildFieldMap(extensions),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendUnionType(type) {
    var _typeExtensionsMap$co5;

    const config = type.toConfig();
    const extensions =
      (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null &&
      _typeExtensionsMap$co5 !== void 0
        ? _typeExtensionsMap$co5
        : [];
    return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLUnionType({
      ...config,
      types: () => [
        ...type.getTypes().map(replaceNamedType),
        ...buildUnionTypes(extensions),
      ],
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendField(field) {
    return {
      ...field,
      type: replaceType(field.type),
      args: field.args && (0,_jsutils_mapValue_mjs__WEBPACK_IMPORTED_MODULE_7__.mapValue)(field.args, extendArg),
    };
  }

  function extendArg(arg) {
    return { ...arg, type: replaceType(arg.type) };
  }

  function getOperationTypes(nodes) {
    const opTypes = {};

    for (const node of nodes) {
      var _node$operationTypes;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const operationTypesNodes =
        /* c8 ignore next */
        (_node$operationTypes = node.operationTypes) !== null &&
        _node$operationTypes !== void 0
          ? _node$operationTypes
          : [];

      for (const operationType of operationTypesNodes) {
        // Note: While this could make early assertions to get the correctly
        // typed values below, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        // @ts-expect-error
        opTypes[operationType.operation] = getNamedType(operationType.type);
      }
    }

    return opTypes;
  }

  function getNamedType(node) {
    var _stdTypeMap$name2;

    const name = node.name.value;
    const type =
      (_stdTypeMap$name2 = stdTypeMap[name]) !== null &&
      _stdTypeMap$name2 !== void 0
        ? _stdTypeMap$name2
        : typeMap[name];

    if (type === undefined) {
      throw new Error(`Unknown type: "${name}".`);
    }

    return type;
  }

  function getWrappedType(node) {
    if (node.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.LIST_TYPE) {
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLList(getWrappedType(node.type));
    }

    if (node.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.NON_NULL_TYPE) {
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLNonNull(getWrappedType(node.type));
    }

    return getNamedType(node);
  }

  function buildDirective(node) {
    var _node$description;

    return new _type_directives_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLDirective({
      name: node.name.value,
      description:
        (_node$description = node.description) === null ||
        _node$description === void 0
          ? void 0
          : _node$description.value,
      // @ts-expect-error
      locations: node.locations.map(({ value }) => value),
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node,
    });
  }

  function buildFieldMap(nodes) {
    const fieldConfigMap = Object.create(null);

    for (const node of nodes) {
      var _node$fields;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const nodeFields =
        /* c8 ignore next */
        (_node$fields = node.fields) !== null && _node$fields !== void 0
          ? _node$fields
          : [];

      for (const field of nodeFields) {
        var _field$description;

        fieldConfigMap[field.name.value] = {
          // Note: While this could make assertions to get the correctly typed
          // value, that would throw immediately while type system validation
          // with validateSchema() will produce more actionable results.
          type: getWrappedType(field.type),
          description:
            (_field$description = field.description) === null ||
            _field$description === void 0
              ? void 0
              : _field$description.value,
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field,
        };
      }
    }

    return fieldConfigMap;
  }

  function buildArgumentMap(args) {
    // FIXME: https://github.com/graphql/graphql-js/issues/2203
    const argsNodes =
      /* c8 ignore next */
      args !== null && args !== void 0 ? args : [];
    const argConfigMap = Object.create(null);

    for (const arg of argsNodes) {
      var _arg$description;

      // Note: While this could make assertions to get the correctly typed
      // value, that would throw immediately while type system validation
      // with validateSchema() will produce more actionable results.
      const type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description:
          (_arg$description = arg.description) === null ||
          _arg$description === void 0
            ? void 0
            : _arg$description.value,
        defaultValue: (0,_valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_12__.valueFromAST)(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg,
      };
    }

    return argConfigMap;
  }

  function buildInputFieldMap(nodes) {
    const inputFieldMap = Object.create(null);

    for (const node of nodes) {
      var _node$fields2;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const fieldsNodes =
        /* c8 ignore next */
        (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0
          ? _node$fields2
          : [];

      for (const field of fieldsNodes) {
        var _field$description2;

        // Note: While this could make assertions to get the correctly typed
        // value, that would throw immediately while type system validation
        // with validateSchema() will produce more actionable results.
        const type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description:
            (_field$description2 = field.description) === null ||
            _field$description2 === void 0
              ? void 0
              : _field$description2.value,
          defaultValue: (0,_valueFromAST_mjs__WEBPACK_IMPORTED_MODULE_12__.valueFromAST)(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field,
        };
      }
    }

    return inputFieldMap;
  }

  function buildEnumValueMap(nodes) {
    const enumValueMap = Object.create(null);

    for (const node of nodes) {
      var _node$values;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      const valuesNodes =
        /* c8 ignore next */
        (_node$values = node.values) !== null && _node$values !== void 0
          ? _node$values
          : [];

      for (const value of valuesNodes) {
        var _value$description;

        enumValueMap[value.name.value] = {
          description:
            (_value$description = value.description) === null ||
            _value$description === void 0
              ? void 0
              : _value$description.value,
          deprecationReason: getDeprecationReason(value),
          astNode: value,
        };
      }
    }

    return enumValueMap;
  }

  function buildInterfaces(nodes) {
    // Note: While this could make assertions to get the correctly typed
    // values below, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    // @ts-expect-error
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$interfaces$map, _node$interfaces;

        return (
          /* c8 ignore next */
          (_node$interfaces$map =
            (_node$interfaces = node.interfaces) === null ||
            _node$interfaces === void 0
              ? void 0
              : _node$interfaces.map(getNamedType)) !== null &&
            _node$interfaces$map !== void 0
            ? _node$interfaces$map
            : []
        );
      },
    );
  }

  function buildUnionTypes(nodes) {
    // Note: While this could make assertions to get the correctly typed
    // values below, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    // @ts-expect-error
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$types$map, _node$types;

        return (
          /* c8 ignore next */
          (_node$types$map =
            (_node$types = node.types) === null || _node$types === void 0
              ? void 0
              : _node$types.map(getNamedType)) !== null &&
            _node$types$map !== void 0
            ? _node$types$map
            : []
        );
      },
    );
  }

  function buildType(astNode) {
    var _typeExtensionsMap$na;

    const name = astNode.name.value;
    const extensionASTNodes =
      (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null &&
      _typeExtensionsMap$na !== void 0
        ? _typeExtensionsMap$na
        : [];

    switch (astNode.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT_TYPE_DEFINITION: {
        var _astNode$description;

        const allNodes = [astNode, ...extensionASTNodes];
        return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLObjectType({
          name,
          description:
            (_astNode$description = astNode.description) === null ||
            _astNode$description === void 0
              ? void 0
              : _astNode$description.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INTERFACE_TYPE_DEFINITION: {
        var _astNode$description2;

        const allNodes = [astNode, ...extensionASTNodes];
        return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLInterfaceType({
          name,
          description:
            (_astNode$description2 = astNode.description) === null ||
            _astNode$description2 === void 0
              ? void 0
              : _astNode$description2.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM_TYPE_DEFINITION: {
        var _astNode$description3;

        const allNodes = [astNode, ...extensionASTNodes];
        return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLEnumType({
          name,
          description:
            (_astNode$description3 = astNode.description) === null ||
            _astNode$description3 === void 0
              ? void 0
              : _astNode$description3.value,
          values: buildEnumValueMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.UNION_TYPE_DEFINITION: {
        var _astNode$description4;

        const allNodes = [astNode, ...extensionASTNodes];
        return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLUnionType({
          name,
          description:
            (_astNode$description4 = astNode.description) === null ||
            _astNode$description4 === void 0
              ? void 0
              : _astNode$description4.value,
          types: () => buildUnionTypes(allNodes),
          astNode,
          extensionASTNodes,
        });
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCALAR_TYPE_DEFINITION: {
        var _astNode$description5;

        return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLScalarType({
          name,
          description:
            (_astNode$description5 = astNode.description) === null ||
            _astNode$description5 === void 0
              ? void 0
              : _astNode$description5.value,
          specifiedByURL: getSpecifiedByURL(astNode),
          astNode,
          extensionASTNodes,
        });
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _astNode$description6;

        const allNodes = [astNode, ...extensionASTNodes];
        return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLInputObjectType({
          name,
          description:
            (_astNode$description6 = astNode.description) === null ||
            _astNode$description6 === void 0
              ? void 0
              : _astNode$description6.value,
          fields: () => buildInputFieldMap(allNodes),
          astNode,
          extensionASTNodes,
        });
      }
    }
  }
}
const stdTypeMap = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_13__.keyMap)(
  [..._type_scalars_mjs__WEBPACK_IMPORTED_MODULE_9__.specifiedScalarTypes, ..._type_introspection_mjs__WEBPACK_IMPORTED_MODULE_8__.introspectionTypes],
  (type) => type.name,
);
/**
 * Given a field or enum value node, returns the string value for the
 * deprecation reason.
 */

function getDeprecationReason(node) {
  const deprecated = (0,_execution_values_mjs__WEBPACK_IMPORTED_MODULE_14__.getDirectiveValues)(_type_directives_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLDeprecatedDirective, node); // @ts-expect-error validated by `getDirectiveValues`

  return deprecated === null || deprecated === void 0
    ? void 0
    : deprecated.reason;
}
/**
 * Given a scalar node, returns the string value for the specifiedByURL.
 */

function getSpecifiedByURL(node) {
  const specifiedBy = (0,_execution_values_mjs__WEBPACK_IMPORTED_MODULE_14__.getDirectiveValues)(_type_directives_mjs__WEBPACK_IMPORTED_MODULE_6__.GraphQLSpecifiedByDirective, node); // @ts-expect-error validated by `getDirectiveValues`

  return specifiedBy === null || specifiedBy === void 0
    ? void 0
    : specifiedBy.url;
}


/***/ }),

/***/ "../../graphql/utilities/findBreakingChanges.mjs":
/*!*******************************************************!*\
  !*** ../../graphql/utilities/findBreakingChanges.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BreakingChangeType": () => (/* binding */ BreakingChangeType),
/* harmony export */   "DangerousChangeType": () => (/* binding */ DangerousChangeType),
/* harmony export */   "findBreakingChanges": () => (/* binding */ findBreakingChanges),
/* harmony export */   "findDangerousChanges": () => (/* binding */ findDangerousChanges)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/scalars.mjs */ "../../graphql/type/scalars.mjs");
/* harmony import */ var _astFromValue_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./astFromValue.mjs */ "../../graphql/utilities/astFromValue.mjs");
/* harmony import */ var _sortValueNode_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sortValueNode.mjs */ "../../graphql/utilities/sortValueNode.mjs");








let BreakingChangeType;

(function (BreakingChangeType) {
  BreakingChangeType['TYPE_REMOVED'] = 'TYPE_REMOVED';
  BreakingChangeType['TYPE_CHANGED_KIND'] = 'TYPE_CHANGED_KIND';
  BreakingChangeType['TYPE_REMOVED_FROM_UNION'] = 'TYPE_REMOVED_FROM_UNION';
  BreakingChangeType['VALUE_REMOVED_FROM_ENUM'] = 'VALUE_REMOVED_FROM_ENUM';
  BreakingChangeType['REQUIRED_INPUT_FIELD_ADDED'] =
    'REQUIRED_INPUT_FIELD_ADDED';
  BreakingChangeType['IMPLEMENTED_INTERFACE_REMOVED'] =
    'IMPLEMENTED_INTERFACE_REMOVED';
  BreakingChangeType['FIELD_REMOVED'] = 'FIELD_REMOVED';
  BreakingChangeType['FIELD_CHANGED_KIND'] = 'FIELD_CHANGED_KIND';
  BreakingChangeType['REQUIRED_ARG_ADDED'] = 'REQUIRED_ARG_ADDED';
  BreakingChangeType['ARG_REMOVED'] = 'ARG_REMOVED';
  BreakingChangeType['ARG_CHANGED_KIND'] = 'ARG_CHANGED_KIND';
  BreakingChangeType['DIRECTIVE_REMOVED'] = 'DIRECTIVE_REMOVED';
  BreakingChangeType['DIRECTIVE_ARG_REMOVED'] = 'DIRECTIVE_ARG_REMOVED';
  BreakingChangeType['REQUIRED_DIRECTIVE_ARG_ADDED'] =
    'REQUIRED_DIRECTIVE_ARG_ADDED';
  BreakingChangeType['DIRECTIVE_REPEATABLE_REMOVED'] =
    'DIRECTIVE_REPEATABLE_REMOVED';
  BreakingChangeType['DIRECTIVE_LOCATION_REMOVED'] =
    'DIRECTIVE_LOCATION_REMOVED';
})(BreakingChangeType || (BreakingChangeType = {}));

let DangerousChangeType;

(function (DangerousChangeType) {
  DangerousChangeType['VALUE_ADDED_TO_ENUM'] = 'VALUE_ADDED_TO_ENUM';
  DangerousChangeType['TYPE_ADDED_TO_UNION'] = 'TYPE_ADDED_TO_UNION';
  DangerousChangeType['OPTIONAL_INPUT_FIELD_ADDED'] =
    'OPTIONAL_INPUT_FIELD_ADDED';
  DangerousChangeType['OPTIONAL_ARG_ADDED'] = 'OPTIONAL_ARG_ADDED';
  DangerousChangeType['IMPLEMENTED_INTERFACE_ADDED'] =
    'IMPLEMENTED_INTERFACE_ADDED';
  DangerousChangeType['ARG_DEFAULT_VALUE_CHANGE'] = 'ARG_DEFAULT_VALUE_CHANGE';
})(DangerousChangeType || (DangerousChangeType = {}));

/**
 * Given two schemas, returns an Array containing descriptions of all the types
 * of breaking changes covered by the other functions down below.
 */
function findBreakingChanges(oldSchema, newSchema) {
  // @ts-expect-error
  return findSchemaChanges(oldSchema, newSchema).filter(
    (change) => change.type in BreakingChangeType,
  );
}
/**
 * Given two schemas, returns an Array containing descriptions of all the types
 * of potentially dangerous changes covered by the other functions down below.
 */

function findDangerousChanges(oldSchema, newSchema) {
  // @ts-expect-error
  return findSchemaChanges(oldSchema, newSchema).filter(
    (change) => change.type in DangerousChangeType,
  );
}

function findSchemaChanges(oldSchema, newSchema) {
  return [
    ...findTypeChanges(oldSchema, newSchema),
    ...findDirectiveChanges(oldSchema, newSchema),
  ];
}

function findDirectiveChanges(oldSchema, newSchema) {
  const schemaChanges = [];
  const directivesDiff = diff(
    oldSchema.getDirectives(),
    newSchema.getDirectives(),
  );

  for (const oldDirective of directivesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.DIRECTIVE_REMOVED,
      description: `${oldDirective.name} was removed.`,
    });
  }

  for (const [oldDirective, newDirective] of directivesDiff.persisted) {
    const argsDiff = diff(oldDirective.args, newDirective.args);

    for (const newArg of argsDiff.added) {
      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isRequiredArgument)(newArg)) {
        schemaChanges.push({
          type: BreakingChangeType.REQUIRED_DIRECTIVE_ARG_ADDED,
          description: `A required arg ${newArg.name} on directive ${oldDirective.name} was added.`,
        });
      }
    }

    for (const oldArg of argsDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_ARG_REMOVED,
        description: `${oldArg.name} was removed from ${oldDirective.name}.`,
      });
    }

    if (oldDirective.isRepeatable && !newDirective.isRepeatable) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_REPEATABLE_REMOVED,
        description: `Repeatable flag was removed from ${oldDirective.name}.`,
      });
    }

    for (const location of oldDirective.locations) {
      if (!newDirective.locations.includes(location)) {
        schemaChanges.push({
          type: BreakingChangeType.DIRECTIVE_LOCATION_REMOVED,
          description: `${location} was removed from ${oldDirective.name}.`,
        });
      }
    }
  }

  return schemaChanges;
}

function findTypeChanges(oldSchema, newSchema) {
  const schemaChanges = [];
  const typesDiff = diff(
    Object.values(oldSchema.getTypeMap()),
    Object.values(newSchema.getTypeMap()),
  );

  for (const oldType of typesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED,
      description: (0,_type_scalars_mjs__WEBPACK_IMPORTED_MODULE_1__.isSpecifiedScalarType)(oldType)
        ? `Standard scalar ${oldType.name} was removed because it is not referenced anymore.`
        : `${oldType.name} was removed.`,
    });
  }

  for (const [oldType, newType] of typesDiff.persisted) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(oldType) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(newType)) {
      schemaChanges.push(...findEnumTypeChanges(oldType, newType));
    } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isUnionType)(oldType) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isUnionType)(newType)) {
      schemaChanges.push(...findUnionTypeChanges(oldType, newType));
    } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(oldType) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(newType)) {
      schemaChanges.push(...findInputObjectTypeChanges(oldType, newType));
    } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(oldType) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(newType)) {
      schemaChanges.push(
        ...findFieldChanges(oldType, newType),
        ...findImplementedInterfacesChanges(oldType, newType),
      );
    } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(oldType) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(newType)) {
      schemaChanges.push(
        ...findFieldChanges(oldType, newType),
        ...findImplementedInterfacesChanges(oldType, newType),
      );
    } else if (oldType.constructor !== newType.constructor) {
      schemaChanges.push({
        type: BreakingChangeType.TYPE_CHANGED_KIND,
        description:
          `${oldType.name} changed from ` +
          `${typeKindName(oldType)} to ${typeKindName(newType)}.`,
      });
    }
  }

  return schemaChanges;
}

function findInputObjectTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const fieldsDiff = diff(
    Object.values(oldType.getFields()),
    Object.values(newType.getFields()),
  );

  for (const newField of fieldsDiff.added) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isRequiredInputField)(newField)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_INPUT_FIELD_ADDED,
        description: `A required field ${newField.name} on input type ${oldType.name} was added.`,
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_INPUT_FIELD_ADDED,
        description: `An optional field ${newField.name} on input type ${oldType.name} was added.`,
      });
    }
  }

  for (const oldField of fieldsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: `${oldType.name}.${oldField.name} was removed.`,
    });
  }

  for (const [oldField, newField] of fieldsDiff.persisted) {
    const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(
      oldField.type,
      newField.type,
    );

    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description:
          `${oldType.name}.${oldField.name} changed type from ` +
          `${String(oldField.type)} to ${String(newField.type)}.`,
      });
    }
  }

  return schemaChanges;
}

function findUnionTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const possibleTypesDiff = diff(oldType.getTypes(), newType.getTypes());

  for (const newPossibleType of possibleTypesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.TYPE_ADDED_TO_UNION,
      description: `${newPossibleType.name} was added to union type ${oldType.name}.`,
    });
  }

  for (const oldPossibleType of possibleTypesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED_FROM_UNION,
      description: `${oldPossibleType.name} was removed from union type ${oldType.name}.`,
    });
  }

  return schemaChanges;
}

function findEnumTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const valuesDiff = diff(oldType.getValues(), newType.getValues());

  for (const newValue of valuesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.VALUE_ADDED_TO_ENUM,
      description: `${newValue.name} was added to enum type ${oldType.name}.`,
    });
  }

  for (const oldValue of valuesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.VALUE_REMOVED_FROM_ENUM,
      description: `${oldValue.name} was removed from enum type ${oldType.name}.`,
    });
  }

  return schemaChanges;
}

function findImplementedInterfacesChanges(oldType, newType) {
  const schemaChanges = [];
  const interfacesDiff = diff(oldType.getInterfaces(), newType.getInterfaces());

  for (const newInterface of interfacesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.IMPLEMENTED_INTERFACE_ADDED,
      description: `${newInterface.name} added to interfaces implemented by ${oldType.name}.`,
    });
  }

  for (const oldInterface of interfacesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.IMPLEMENTED_INTERFACE_REMOVED,
      description: `${oldType.name} no longer implements interface ${oldInterface.name}.`,
    });
  }

  return schemaChanges;
}

function findFieldChanges(oldType, newType) {
  const schemaChanges = [];
  const fieldsDiff = diff(
    Object.values(oldType.getFields()),
    Object.values(newType.getFields()),
  );

  for (const oldField of fieldsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: `${oldType.name}.${oldField.name} was removed.`,
    });
  }

  for (const [oldField, newField] of fieldsDiff.persisted) {
    schemaChanges.push(...findArgChanges(oldType, oldField, newField));
    const isSafe = isChangeSafeForObjectOrInterfaceField(
      oldField.type,
      newField.type,
    );

    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description:
          `${oldType.name}.${oldField.name} changed type from ` +
          `${String(oldField.type)} to ${String(newField.type)}.`,
      });
    }
  }

  return schemaChanges;
}

function findArgChanges(oldType, oldField, newField) {
  const schemaChanges = [];
  const argsDiff = diff(oldField.args, newField.args);

  for (const oldArg of argsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.ARG_REMOVED,
      description: `${oldType.name}.${oldField.name} arg ${oldArg.name} was removed.`,
    });
  }

  for (const [oldArg, newArg] of argsDiff.persisted) {
    const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(
      oldArg.type,
      newArg.type,
    );

    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.ARG_CHANGED_KIND,
        description:
          `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed type from ` +
          `${String(oldArg.type)} to ${String(newArg.type)}.`,
      });
    } else if (oldArg.defaultValue !== undefined) {
      if (newArg.defaultValue === undefined) {
        schemaChanges.push({
          type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
          description: `${oldType.name}.${oldField.name} arg ${oldArg.name} defaultValue was removed.`,
        });
      } else {
        // Since we looking only for client's observable changes we should
        // compare default values in the same representation as they are
        // represented inside introspection.
        const oldValueStr = stringifyValue(oldArg.defaultValue, oldArg.type);
        const newValueStr = stringifyValue(newArg.defaultValue, newArg.type);

        if (oldValueStr !== newValueStr) {
          schemaChanges.push({
            type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
            description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed defaultValue from ${oldValueStr} to ${newValueStr}.`,
          });
        }
      }
    }
  }

  for (const newArg of argsDiff.added) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isRequiredArgument)(newArg)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_ARG_ADDED,
        description: `A required arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`,
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_ARG_ADDED,
        description: `An optional arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`,
      });
    }
  }

  return schemaChanges;
}

function isChangeSafeForObjectOrInterfaceField(oldType, newType) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(oldType)) {
    return (
      // if they're both lists, make sure the underlying types are compatible
      ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(newType) &&
        isChangeSafeForObjectOrInterfaceField(
          oldType.ofType,
          newType.ofType,
        )) || // moving from nullable to non-null of the same underlying type is safe
      ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(newType) &&
        isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType))
    );
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(oldType)) {
    // if they're both non-null, make sure the underlying types are compatible
    return (
      (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(newType) &&
      isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType)
    );
  }

  return (
    // if they're both named types, see if their names are equivalent
    ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNamedType)(newType) && oldType.name === newType.name) || // moving from nullable to non-null of the same underlying type is safe
    ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(newType) &&
      isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType))
  );
}

function isChangeSafeForInputObjectFieldOrFieldArg(oldType, newType) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(oldType)) {
    // if they're both lists, make sure the underlying types are compatible
    return (
      (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(newType) &&
      isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType)
    );
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(oldType)) {
    return (
      // if they're both non-null, make sure the underlying types are
      // compatible
      ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(newType) &&
        isChangeSafeForInputObjectFieldOrFieldArg(
          oldType.ofType,
          newType.ofType,
        )) || // moving from non-null to nullable of the same underlying type is safe
      (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(newType) &&
        isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType))
    );
  } // if they're both named types, see if their names are equivalent

  return (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNamedType)(newType) && oldType.name === newType.name;
}

function typeKindName(type) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isScalarType)(type)) {
    return 'a Scalar type';
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(type)) {
    return 'an Object type';
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(type)) {
    return 'an Interface type';
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isUnionType)(type)) {
    return 'a Union type';
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(type)) {
    return 'an Enum type';
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(type)) {
    return 'an Input type';
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible types have been considered.

   false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_2__.invariant)(false, 'Unexpected type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(type));
}

function stringifyValue(value, type) {
  const ast = (0,_astFromValue_mjs__WEBPACK_IMPORTED_MODULE_4__.astFromValue)(value, type);
  ast != null || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_2__.invariant)(false);
  return (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_5__.print)((0,_sortValueNode_mjs__WEBPACK_IMPORTED_MODULE_6__.sortValueNode)(ast));
}

function diff(oldArray, newArray) {
  const added = [];
  const removed = [];
  const persisted = [];
  const oldMap = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_7__.keyMap)(oldArray, ({ name }) => name);
  const newMap = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_7__.keyMap)(newArray, ({ name }) => name);

  for (const oldItem of oldArray) {
    const newItem = newMap[oldItem.name];

    if (newItem === undefined) {
      removed.push(oldItem);
    } else {
      persisted.push([oldItem, newItem]);
    }
  }

  for (const newItem of newArray) {
    if (oldMap[newItem.name] === undefined) {
      added.push(newItem);
    }
  }

  return {
    added,
    persisted,
    removed,
  };
}


/***/ }),

/***/ "../../graphql/utilities/getIntrospectionQuery.mjs":
/*!*********************************************************!*\
  !*** ../../graphql/utilities/getIntrospectionQuery.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIntrospectionQuery": () => (/* binding */ getIntrospectionQuery)
/* harmony export */ });
/**
 * Produce the GraphQL query recommended for a full schema introspection.
 * Accepts optional IntrospectionOptions.
 */
function getIntrospectionQuery(options) {
  const optionsWithDefault = {
    descriptions: true,
    specifiedByUrl: false,
    directiveIsRepeatable: false,
    schemaDescription: false,
    inputValueDeprecation: false,
    ...options,
  };
  const descriptions = optionsWithDefault.descriptions ? 'description' : '';
  const specifiedByUrl = optionsWithDefault.specifiedByUrl
    ? 'specifiedByURL'
    : '';
  const directiveIsRepeatable = optionsWithDefault.directiveIsRepeatable
    ? 'isRepeatable'
    : '';
  const schemaDescription = optionsWithDefault.schemaDescription
    ? descriptions
    : '';

  function inputDeprecation(str) {
    return optionsWithDefault.inputValueDeprecation ? str : '';
  }

  return `
    query IntrospectionQuery {
      __schema {
        ${schemaDescription}
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          ${descriptions}
          ${directiveIsRepeatable}
          locations
          args${inputDeprecation('(includeDeprecated: true)')} {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      ${descriptions}
      ${specifiedByUrl}
      fields(includeDeprecated: true) {
        name
        ${descriptions}
        args${inputDeprecation('(includeDeprecated: true)')} {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields${inputDeprecation('(includeDeprecated: true)')} {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        ${descriptions}
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      ${descriptions}
      type { ...TypeRef }
      defaultValue
      ${inputDeprecation('isDeprecated')}
      ${inputDeprecation('deprecationReason')}
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}


/***/ }),

/***/ "../../graphql/utilities/getOperationAST.mjs":
/*!***************************************************!*\
  !*** ../../graphql/utilities/getOperationAST.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOperationAST": () => (/* binding */ getOperationAST)
/* harmony export */ });
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");

/**
 * Returns an operation AST given a document AST and optionally an operation
 * name. If a name is not provided, an operation is only returned if only one is
 * provided in the document.
 */

function getOperationAST(documentAST, operationName) {
  let operation = null;

  for (const definition of documentAST.definitions) {
    if (definition.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OPERATION_DEFINITION) {
      var _definition$name;

      if (operationName == null) {
        // If no operation name was provided, only return an Operation if there
        // is one defined in the document. Upon encountering the second, return
        // null.
        if (operation) {
          return null;
        }

        operation = definition;
      } else if (
        ((_definition$name = definition.name) === null ||
        _definition$name === void 0
          ? void 0
          : _definition$name.value) === operationName
      ) {
        return definition;
      }
    }
  }

  return operation;
}


/***/ }),

/***/ "../../graphql/utilities/getOperationRootType.mjs":
/*!********************************************************!*\
  !*** ../../graphql/utilities/getOperationRootType.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOperationRootType": () => (/* binding */ getOperationRootType)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Extracts the root type of the operation from the schema.
 *
 * @deprecated Please use `GraphQLSchema.getRootType` instead. Will be removed in v17
 */
function getOperationRootType(schema, operation) {
  if (operation.operation === 'query') {
    const queryType = schema.getQueryType();

    if (!queryType) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
        'Schema does not define the required query root type.',
        operation,
      );
    }

    return queryType;
  }

  if (operation.operation === 'mutation') {
    const mutationType = schema.getMutationType();

    if (!mutationType) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
        'Schema is not configured for mutations.',
        operation,
      );
    }

    return mutationType;
  }

  if (operation.operation === 'subscription') {
    const subscriptionType = schema.getSubscriptionType();

    if (!subscriptionType) {
      throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
        'Schema is not configured for subscriptions.',
        operation,
      );
    }

    return subscriptionType;
  }

  throw new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
    'Can only have query, mutation and subscription operations.',
    operation,
  );
}


/***/ }),

/***/ "../../graphql/utilities/introspectionFromSchema.mjs":
/*!***********************************************************!*\
  !*** ../../graphql/utilities/introspectionFromSchema.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "introspectionFromSchema": () => (/* binding */ introspectionFromSchema)
/* harmony export */ });
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _language_parser_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/parser.mjs */ "../../graphql/language/parser.mjs");
/* harmony import */ var _execution_execute_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../execution/execute.mjs */ "../../graphql/execution/execute.mjs");
/* harmony import */ var _getIntrospectionQuery_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getIntrospectionQuery.mjs */ "../../graphql/utilities/getIntrospectionQuery.mjs");




/**
 * Build an IntrospectionQuery from a GraphQLSchema
 *
 * IntrospectionQuery is useful for utilities that care about type and field
 * relationships, but do not need to traverse through those relationships.
 *
 * This is the inverse of buildClientSchema. The primary use case is outside
 * of the server context, for instance when doing schema comparisons.
 */

function introspectionFromSchema(schema, options) {
  const optionsWithDefaults = {
    specifiedByUrl: true,
    directiveIsRepeatable: true,
    schemaDescription: true,
    inputValueDeprecation: true,
    ...options,
  };
  const document = (0,_language_parser_mjs__WEBPACK_IMPORTED_MODULE_0__.parse)((0,_getIntrospectionQuery_mjs__WEBPACK_IMPORTED_MODULE_1__.getIntrospectionQuery)(optionsWithDefaults));
  const result = (0,_execution_execute_mjs__WEBPACK_IMPORTED_MODULE_2__.executeSync)({
    schema,
    document,
  });
  (!result.errors && result.data) || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__.invariant)(false);
  return result.data;
}


/***/ }),

/***/ "../../graphql/utilities/lexicographicSortSchema.mjs":
/*!***********************************************************!*\
  !*** ../../graphql/utilities/lexicographicSortSchema.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lexicographicSortSchema": () => (/* binding */ lexicographicSortSchema)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsutils/keyValMap.mjs */ "../../graphql/jsutils/keyValMap.mjs");
/* harmony import */ var _jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../jsutils/naturalCompare.mjs */ "../../graphql/jsutils/naturalCompare.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_schema_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/schema.mjs */ "../../graphql/type/schema.mjs");








/**
 * Sort GraphQLSchema.
 *
 * This function returns a sorted copy of the given GraphQLSchema.
 */

function lexicographicSortSchema(schema) {
  const schemaConfig = schema.toConfig();
  const typeMap = (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_0__.keyValMap)(
    sortByName(schemaConfig.types),
    (type) => type.name,
    sortNamedType,
  );
  return new _type_schema_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLSchema({
    ...schemaConfig,
    types: Object.values(typeMap),
    directives: sortByName(schemaConfig.directives).map(sortDirective),
    query: replaceMaybeType(schemaConfig.query),
    mutation: replaceMaybeType(schemaConfig.mutation),
    subscription: replaceMaybeType(schemaConfig.subscription),
  });

  function replaceType(type) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isListType)(type)) {
      // @ts-expect-error
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLList(replaceType(type.ofType));
    } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isNonNullType)(type)) {
      // @ts-expect-error
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLNonNull(replaceType(type.ofType));
    } // @ts-expect-error FIXME: TS Conversion

    return replaceNamedType(type);
  }

  function replaceNamedType(type) {
    return typeMap[type.name];
  }

  function replaceMaybeType(maybeType) {
    return maybeType && replaceNamedType(maybeType);
  }

  function sortDirective(directive) {
    const config = directive.toConfig();
    return new _type_directives_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLDirective({
      ...config,
      locations: sortBy(config.locations, (x) => x),
      args: sortArgs(config.args),
    });
  }

  function sortArgs(args) {
    return sortObjMap(args, (arg) => ({ ...arg, type: replaceType(arg.type) }));
  }

  function sortFields(fieldsMap) {
    return sortObjMap(fieldsMap, (field) => ({
      ...field,
      type: replaceType(field.type),
      args: field.args && sortArgs(field.args),
    }));
  }

  function sortInputFields(fieldsMap) {
    return sortObjMap(fieldsMap, (field) => ({
      ...field,
      type: replaceType(field.type),
    }));
  }

  function sortTypes(array) {
    return sortByName(array).map(replaceNamedType);
  }

  function sortNamedType(type) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isScalarType)(type) || (0,_type_introspection_mjs__WEBPACK_IMPORTED_MODULE_4__.isIntrospectionType)(type)) {
      return type;
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(type)) {
      const config = type.toConfig();
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLObjectType({
        ...config,
        interfaces: () => sortTypes(config.interfaces),
        fields: () => sortFields(config.fields),
      });
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType)(type)) {
      const config = type.toConfig();
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLInterfaceType({
        ...config,
        interfaces: () => sortTypes(config.interfaces),
        fields: () => sortFields(config.fields),
      });
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isUnionType)(type)) {
      const config = type.toConfig();
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLUnionType({
        ...config,
        types: () => sortTypes(config.types),
      });
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isEnumType)(type)) {
      const config = type.toConfig();
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLEnumType({
        ...config,
        values: sortObjMap(config.values, (value) => value),
      });
    }

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputObjectType)(type)) {
      const config = type.toConfig();
      return new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLInputObjectType({
        ...config,
        fields: () => sortInputFields(config.fields),
      });
    }
    /* c8 ignore next 3 */
    // Not reachable, all possible types have been considered.

     false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_5__.invariant)(false, 'Unexpected type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_6__.inspect)(type));
  }
}

function sortObjMap(map, sortValueFn) {
  const sortedMap = Object.create(null);

  for (const key of Object.keys(map).sort(_jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_7__.naturalCompare)) {
    sortedMap[key] = sortValueFn(map[key]);
  }

  return sortedMap;
}

function sortByName(array) {
  return sortBy(array, (obj) => obj.name);
}

function sortBy(array, mapToKey) {
  return array.slice().sort((obj1, obj2) => {
    const key1 = mapToKey(obj1);
    const key2 = mapToKey(obj2);
    return (0,_jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_7__.naturalCompare)(key1, key2);
  });
}


/***/ }),

/***/ "../../graphql/utilities/printSchema.mjs":
/*!***********************************************!*\
  !*** ../../graphql/utilities/printSchema.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printSchema": () => (/* binding */ printSchema),
/* harmony export */   "printIntrospectionSchema": () => (/* binding */ printIntrospectionSchema),
/* harmony export */   "printType": () => (/* binding */ printType)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _language_blockString_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../language/blockString.mjs */ "../../graphql/language/blockString.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/directives.mjs */ "../../graphql/type/directives.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/scalars.mjs */ "../../graphql/type/scalars.mjs");
/* harmony import */ var _astFromValue_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./astFromValue.mjs */ "../../graphql/utilities/astFromValue.mjs");










function printSchema(schema) {
  return printFilteredSchema(
    schema,
    (n) => !(0,_type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpecifiedDirective)(n),
    isDefinedType,
  );
}
function printIntrospectionSchema(schema) {
  return printFilteredSchema(schema, _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__.isSpecifiedDirective, _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_1__.isIntrospectionType);
}

function isDefinedType(type) {
  return !(0,_type_scalars_mjs__WEBPACK_IMPORTED_MODULE_2__.isSpecifiedScalarType)(type) && !(0,_type_introspection_mjs__WEBPACK_IMPORTED_MODULE_1__.isIntrospectionType)(type);
}

function printFilteredSchema(schema, directiveFilter, typeFilter) {
  const directives = schema.getDirectives().filter(directiveFilter);
  const types = Object.values(schema.getTypeMap()).filter(typeFilter);
  return [
    printSchemaDefinition(schema),
    ...directives.map((directive) => printDirective(directive)),
    ...types.map((type) => printType(type)),
  ]
    .filter(Boolean)
    .join('\n\n');
}

function printSchemaDefinition(schema) {
  if (schema.description == null && isSchemaOfCommonNames(schema)) {
    return;
  }

  const operationTypes = [];
  const queryType = schema.getQueryType();

  if (queryType) {
    operationTypes.push(`  query: ${queryType.name}`);
  }

  const mutationType = schema.getMutationType();

  if (mutationType) {
    operationTypes.push(`  mutation: ${mutationType.name}`);
  }

  const subscriptionType = schema.getSubscriptionType();

  if (subscriptionType) {
    operationTypes.push(`  subscription: ${subscriptionType.name}`);
  }

  return printDescription(schema) + `schema {\n${operationTypes.join('\n')}\n}`;
}
/**
 * GraphQL schema define root types for each type of operation. These types are
 * the same as any other type and can be named in any manner, however there is
 * a common naming convention:
 *
 * ```graphql
 *   schema {
 *     query: Query
 *     mutation: Mutation
 *     subscription: Subscription
 *   }
 * ```
 *
 * When using this naming convention, the schema description can be omitted.
 */

function isSchemaOfCommonNames(schema) {
  const queryType = schema.getQueryType();

  if (queryType && queryType.name !== 'Query') {
    return false;
  }

  const mutationType = schema.getMutationType();

  if (mutationType && mutationType.name !== 'Mutation') {
    return false;
  }

  const subscriptionType = schema.getSubscriptionType();

  if (subscriptionType && subscriptionType.name !== 'Subscription') {
    return false;
  }

  return true;
}

function printType(type) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isScalarType)(type)) {
    return printScalar(type);
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isObjectType)(type)) {
    return printObject(type);
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isInterfaceType)(type)) {
    return printInterface(type);
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isUnionType)(type)) {
    return printUnion(type);
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isEnumType)(type)) {
    return printEnum(type);
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isInputObjectType)(type)) {
    return printInputObject(type);
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible types have been considered.

   false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_4__.invariant)(false, 'Unexpected type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(type));
}

function printScalar(type) {
  return (
    printDescription(type) + `scalar ${type.name}` + printSpecifiedByURL(type)
  );
}

function printImplementedInterfaces(type) {
  const interfaces = type.getInterfaces();
  return interfaces.length
    ? ' implements ' + interfaces.map((i) => i.name).join(' & ')
    : '';
}

function printObject(type) {
  return (
    printDescription(type) +
    `type ${type.name}` +
    printImplementedInterfaces(type) +
    printFields(type)
  );
}

function printInterface(type) {
  return (
    printDescription(type) +
    `interface ${type.name}` +
    printImplementedInterfaces(type) +
    printFields(type)
  );
}

function printUnion(type) {
  const types = type.getTypes();
  const possibleTypes = types.length ? ' = ' + types.join(' | ') : '';
  return printDescription(type) + 'union ' + type.name + possibleTypes;
}

function printEnum(type) {
  const values = type
    .getValues()
    .map(
      (value, i) =>
        printDescription(value, '  ', !i) +
        '  ' +
        value.name +
        printDeprecated(value.deprecationReason),
    );
  return printDescription(type) + `enum ${type.name}` + printBlock(values);
}

function printInputObject(type) {
  const fields = Object.values(type.getFields()).map(
    (f, i) => printDescription(f, '  ', !i) + '  ' + printInputValue(f),
  );
  return printDescription(type) + `input ${type.name}` + printBlock(fields);
}

function printFields(type) {
  const fields = Object.values(type.getFields()).map(
    (f, i) =>
      printDescription(f, '  ', !i) +
      '  ' +
      f.name +
      printArgs(f.args, '  ') +
      ': ' +
      String(f.type) +
      printDeprecated(f.deprecationReason),
  );
  return printBlock(fields);
}

function printBlock(items) {
  return items.length !== 0 ? ' {\n' + items.join('\n') + '\n}' : '';
}

function printArgs(args, indentation = '') {
  if (args.length === 0) {
    return '';
  } // If every arg does not have a description, print them on one line.

  if (args.every((arg) => !arg.description)) {
    return '(' + args.map(printInputValue).join(', ') + ')';
  }

  return (
    '(\n' +
    args
      .map(
        (arg, i) =>
          printDescription(arg, '  ' + indentation, !i) +
          '  ' +
          indentation +
          printInputValue(arg),
      )
      .join('\n') +
    '\n' +
    indentation +
    ')'
  );
}

function printInputValue(arg) {
  const defaultAST = (0,_astFromValue_mjs__WEBPACK_IMPORTED_MODULE_6__.astFromValue)(arg.defaultValue, arg.type);
  let argDecl = arg.name + ': ' + String(arg.type);

  if (defaultAST) {
    argDecl += ` = ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_7__.print)(defaultAST)}`;
  }

  return argDecl + printDeprecated(arg.deprecationReason);
}

function printDirective(directive) {
  return (
    printDescription(directive) +
    'directive @' +
    directive.name +
    printArgs(directive.args) +
    (directive.isRepeatable ? ' repeatable' : '') +
    ' on ' +
    directive.locations.join(' | ')
  );
}

function printDeprecated(reason) {
  if (reason == null) {
    return '';
  }

  if (reason !== _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DEPRECATION_REASON) {
    const astValue = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_7__.print)({
      kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_8__.Kind.STRING,
      value: reason,
    });
    return ` @deprecated(reason: ${astValue})`;
  }

  return ' @deprecated';
}

function printSpecifiedByURL(scalar) {
  if (scalar.specifiedByURL == null) {
    return '';
  }

  const astValue = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_7__.print)({
    kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_8__.Kind.STRING,
    value: scalar.specifiedByURL,
  });
  return ` @specifiedBy(url: ${astValue})`;
}

function printDescription(def, indentation = '', firstInBlock = true) {
  const { description } = def;

  if (description == null) {
    return '';
  }

  const blockString = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_7__.print)({
    kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_8__.Kind.STRING,
    value: description,
    block: (0,_language_blockString_mjs__WEBPACK_IMPORTED_MODULE_9__.isPrintableAsBlockString)(description),
  });
  const prefix =
    indentation && !firstInBlock ? '\n' + indentation : indentation;
  return prefix + blockString.replace(/\n/g, '\n' + indentation) + '\n';
}


/***/ }),

/***/ "../../graphql/utilities/separateOperations.mjs":
/*!******************************************************!*\
  !*** ../../graphql/utilities/separateOperations.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "separateOperations": () => (/* binding */ separateOperations)
/* harmony export */ });
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_visitor_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language/visitor.mjs */ "../../graphql/language/visitor.mjs");


/**
 * separateOperations accepts a single AST document which may contain many
 * operations and fragments and returns a collection of AST documents each of
 * which contains a single operation as well the fragment definitions it
 * refers to.
 */

function separateOperations(documentAST) {
  const operations = [];
  const depGraph = Object.create(null); // Populate metadata and build a dependency graph.

  for (const definitionNode of documentAST.definitions) {
    switch (definitionNode.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OPERATION_DEFINITION:
        operations.push(definitionNode);
        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_DEFINITION:
        depGraph[definitionNode.name.value] = collectDependencies(
          definitionNode.selectionSet,
        );
        break;

      default: // ignore non-executable definitions
    }
  } // For each operation, produce a new synthesized AST which includes only what
  // is necessary for completing that operation.

  const separatedDocumentASTs = Object.create(null);

  for (const operation of operations) {
    const dependencies = new Set();

    for (const fragmentName of collectDependencies(operation.selectionSet)) {
      collectTransitiveDependencies(dependencies, depGraph, fragmentName);
    } // Provides the empty string for anonymous operations.

    const operationName = operation.name ? operation.name.value : ''; // The list of definition nodes to be included for this operation, sorted
    // to retain the same order as the original document.

    separatedDocumentASTs[operationName] = {
      kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.DOCUMENT,
      definitions: documentAST.definitions.filter(
        (node) =>
          node === operation ||
          (node.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_DEFINITION &&
            dependencies.has(node.name.value)),
      ),
    };
  }

  return separatedDocumentASTs;
}

// From a dependency graph, collects a list of transitive dependencies by
// recursing through a dependency graph.
function collectTransitiveDependencies(collected, depGraph, fromName) {
  if (!collected.has(fromName)) {
    collected.add(fromName);
    const immediateDeps = depGraph[fromName];

    if (immediateDeps !== undefined) {
      for (const toName of immediateDeps) {
        collectTransitiveDependencies(collected, depGraph, toName);
      }
    }
  }
}

function collectDependencies(selectionSet) {
  const dependencies = [];
  (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_1__.visit)(selectionSet, {
    FragmentSpread(node) {
      dependencies.push(node.name.value);
    },
  });
  return dependencies;
}


/***/ }),

/***/ "../../graphql/utilities/sortValueNode.mjs":
/*!*************************************************!*\
  !*** ../../graphql/utilities/sortValueNode.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortValueNode": () => (/* binding */ sortValueNode)
/* harmony export */ });
/* harmony import */ var _jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/naturalCompare.mjs */ "../../graphql/jsutils/naturalCompare.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");


/**
 * Sort ValueNode.
 *
 * This function returns a sorted copy of the given ValueNode.
 *
 * @internal
 */

function sortValueNode(valueNode) {
  switch (valueNode.kind) {
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT:
      return { ...valueNode, fields: sortFields(valueNode.fields) };

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST:
      return { ...valueNode, values: valueNode.values.map(sortValueNode) };

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INT:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FLOAT:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.STRING:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.BOOLEAN:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NULL:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE:
      return valueNode;
  }
}

function sortFields(fields) {
  return fields
    .map((fieldNode) => ({
      ...fieldNode,
      value: sortValueNode(fieldNode.value),
    }))
    .sort((fieldA, fieldB) =>
      (0,_jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_1__.naturalCompare)(fieldA.name.value, fieldB.name.value),
    );
}


/***/ }),

/***/ "../../graphql/utilities/stripIgnoredCharacters.mjs":
/*!**********************************************************!*\
  !*** ../../graphql/utilities/stripIgnoredCharacters.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stripIgnoredCharacters": () => (/* binding */ stripIgnoredCharacters)
/* harmony export */ });
/* harmony import */ var _language_blockString_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../language/blockString.mjs */ "../../graphql/language/blockString.mjs");
/* harmony import */ var _language_lexer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language/lexer.mjs */ "../../graphql/language/lexer.mjs");
/* harmony import */ var _language_source_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/source.mjs */ "../../graphql/language/source.mjs");
/* harmony import */ var _language_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/tokenKind.mjs */ "../../graphql/language/tokenKind.mjs");




/**
 * Strips characters that are not significant to the validity or execution
 * of a GraphQL document:
 *   - UnicodeBOM
 *   - WhiteSpace
 *   - LineTerminator
 *   - Comment
 *   - Comma
 *   - BlockString indentation
 *
 * Note: It is required to have a delimiter character between neighboring
 * non-punctuator tokens and this function always uses single space as delimiter.
 *
 * It is guaranteed that both input and output documents if parsed would result
 * in the exact same AST except for nodes location.
 *
 * Warning: It is guaranteed that this function will always produce stable results.
 * However, it's not guaranteed that it will stay the same between different
 * releases due to bugfixes or changes in the GraphQL specification.
 *
 * Query example:
 *
 * ```graphql
 * query SomeQuery($foo: String!, $bar: String) {
 *   someField(foo: $foo, bar: $bar) {
 *     a
 *     b {
 *       c
 *       d
 *     }
 *   }
 * }
 * ```
 *
 * Becomes:
 *
 * ```graphql
 * query SomeQuery($foo:String!$bar:String){someField(foo:$foo bar:$bar){a b{c d}}}
 * ```
 *
 * SDL example:
 *
 * ```graphql
 * """
 * Type description
 * """
 * type Foo {
 *   """
 *   Field description
 *   """
 *   bar: String
 * }
 * ```
 *
 * Becomes:
 *
 * ```graphql
 * """Type description""" type Foo{"""Field description""" bar:String}
 * ```
 */

function stripIgnoredCharacters(source) {
  const sourceObj = (0,_language_source_mjs__WEBPACK_IMPORTED_MODULE_0__.isSource)(source) ? source : new _language_source_mjs__WEBPACK_IMPORTED_MODULE_0__.Source(source);
  const body = sourceObj.body;
  const lexer = new _language_lexer_mjs__WEBPACK_IMPORTED_MODULE_1__.Lexer(sourceObj);
  let strippedBody = '';
  let wasLastAddedTokenNonPunctuator = false;

  while (lexer.advance().kind !== _language_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__.TokenKind.EOF) {
    const currentToken = lexer.token;
    const tokenKind = currentToken.kind;
    /**
     * Every two non-punctuator tokens should have space between them.
     * Also prevent case of non-punctuator token following by spread resulting
     * in invalid token (e.g. `1...` is invalid Float token).
     */

    const isNonPunctuator = !(0,_language_lexer_mjs__WEBPACK_IMPORTED_MODULE_1__.isPunctuatorTokenKind)(currentToken.kind);

    if (wasLastAddedTokenNonPunctuator) {
      if (isNonPunctuator || currentToken.kind === _language_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__.TokenKind.SPREAD) {
        strippedBody += ' ';
      }
    }

    const tokenBody = body.slice(currentToken.start, currentToken.end);

    if (tokenKind === _language_tokenKind_mjs__WEBPACK_IMPORTED_MODULE_2__.TokenKind.BLOCK_STRING) {
      strippedBody += (0,_language_blockString_mjs__WEBPACK_IMPORTED_MODULE_3__.printBlockString)(currentToken.value, {
        minimize: true,
      });
    } else {
      strippedBody += tokenBody;
    }

    wasLastAddedTokenNonPunctuator = isNonPunctuator;
  }

  return strippedBody;
}


/***/ }),

/***/ "../../graphql/utilities/typeComparators.mjs":
/*!***************************************************!*\
  !*** ../../graphql/utilities/typeComparators.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEqualType": () => (/* binding */ isEqualType),
/* harmony export */   "isTypeSubTypeOf": () => (/* binding */ isTypeSubTypeOf),
/* harmony export */   "doTypesOverlap": () => (/* binding */ doTypesOverlap)
/* harmony export */ });
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");


/**
 * Provided two types, return true if the types are equal (invariant).
 */
function isEqualType(typeA, typeB) {
  // Equivalent types are equal.
  if (typeA === typeB) {
    return true;
  } // If either type is non-null, the other must also be non-null.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(typeA) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  } // If either type is a list, the other must also be a list.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(typeA) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  } // Otherwise the types are not equal.

  return false;
}
/**
 * Provided a type and a super type, return true if the first type is either
 * equal or a subset of the second super type (covariant).
 */

function isTypeSubTypeOf(schema, maybeSubType, superType) {
  // Equivalent type is a valid subtype
  if (maybeSubType === superType) {
    return true;
  } // If superType is non-null, maybeSubType must also be non-null.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(superType)) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }

    return false;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(maybeSubType)) {
    // If superType is nullable, maybeSubType may be non-null or nullable.
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  } // If superType type is a list, maybeSubType type must also be a list.

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(superType)) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }

    return false;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(maybeSubType)) {
    // If superType is not a list, maybeSubType must also be not a list.
    return false;
  } // If superType type is an abstract type, check if it is super type of maybeSubType.
  // Otherwise, the child type is not a valid subtype of the parent type.

  return (
    (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isAbstractType)(superType) &&
    ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInterfaceType)(maybeSubType) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isObjectType)(maybeSubType)) &&
    schema.isSubType(superType, maybeSubType)
  );
}
/**
 * Provided two composite types, determine if they "overlap". Two composite
 * types overlap when the Sets of possible concrete types for each intersect.
 *
 * This is often used to determine if a fragment of a given type could possibly
 * be visited in a context of another type.
 *
 * This function is commutative.
 */

function doTypesOverlap(schema, typeA, typeB) {
  // Equivalent types overlap
  if (typeA === typeB) {
    return true;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isAbstractType)(typeA)) {
    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isAbstractType)(typeB)) {
      // If both types are abstract, then determine if there is any intersection
      // between possible concrete types of each.
      return schema
        .getPossibleTypes(typeA)
        .some((type) => schema.isSubType(typeB, type));
    } // Determine if the latter type is a possible concrete type of the former.

    return schema.isSubType(typeA, typeB);
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isAbstractType)(typeB)) {
    // Determine if the former type is a possible concrete type of the latter.
    return schema.isSubType(typeB, typeA);
  } // Otherwise the types do not overlap.

  return false;
}


/***/ }),

/***/ "../../graphql/utilities/typeFromAST.mjs":
/*!***********************************************!*\
  !*** ../../graphql/utilities/typeFromAST.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "typeFromAST": () => (/* binding */ typeFromAST)
/* harmony export */ });
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");


function typeFromAST(schema, typeNode) {
  switch (typeNode.kind) {
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLList(innerType);
    }

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NON_NULL_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLNonNull(innerType);
    }

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NAMED_TYPE:
      return schema.getType(typeNode.name.value);
  }
}


/***/ }),

/***/ "../../graphql/utilities/valueFromAST.mjs":
/*!************************************************!*\
  !*** ../../graphql/utilities/valueFromAST.mjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "valueFromAST": () => (/* binding */ valueFromAST)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/definition.mjs */ "../../graphql/type/definition.mjs");





/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * A GraphQL type must be provided, which will be used to interpret different
 * GraphQL Value literals.
 *
 * Returns `undefined` when the value could not be validly coerced according to
 * the provided type.
 *
 * | GraphQL Value        | JSON Value    |
 * | -------------------- | ------------- |
 * | Input Object         | Object        |
 * | List                 | Array         |
 * | Boolean              | Boolean       |
 * | String               | String        |
 * | Int / Float          | Number        |
 * | Enum Value           | Unknown       |
 * | NullValue            | null          |
 *
 */

function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    // When there is no node, then there is also no value.
    // Importantly, this is different from returning the value null.
    return;
  }

  if (valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE) {
    const variableName = valueNode.name.value;

    if (variables == null || variables[variableName] === undefined) {
      // No valid return value.
      return;
    }

    const variableValue = variables[variableName];

    if (variableValue === null && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(type)) {
      return; // Invalid: intentionally return no value.
    } // Note: This does no further checking that this variable is correct.
    // This assumes that this query has been validated and the variable
    // usage here is of the correct type.

    return variableValue;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(type)) {
    if (valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NULL) {
      return; // Invalid: intentionally return no value.
    }

    return valueFromAST(valueNode, type.ofType, variables);
  }

  if (valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NULL) {
    // This is explicitly returning the value null.
    return null;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isListType)(type)) {
    const itemType = type.ofType;

    if (valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST) {
      const coercedValues = [];

      for (const itemNode of valueNode.values) {
        if (isMissingVariable(itemNode, variables)) {
          // If an array contains a missing variable, it is either coerced to
          // null or if the item type is non-null, it considered invalid.
          if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(itemType)) {
            return; // Invalid: intentionally return no value.
          }

          coercedValues.push(null);
        } else {
          const itemValue = valueFromAST(itemNode, itemType, variables);

          if (itemValue === undefined) {
            return; // Invalid: intentionally return no value.
          }

          coercedValues.push(itemValue);
        }
      }

      return coercedValues;
    }

    const coercedValue = valueFromAST(valueNode, itemType, variables);

    if (coercedValue === undefined) {
      return; // Invalid: intentionally return no value.
    }

    return [coercedValue];
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isInputObjectType)(type)) {
    if (valueNode.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT) {
      return; // Invalid: intentionally return no value.
    }

    const coercedObj = Object.create(null);
    const fieldNodes = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_2__.keyMap)(valueNode.fields, (field) => field.name.value);

    for (const field of Object.values(type.getFields())) {
      const fieldNode = fieldNodes[field.name];

      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== undefined) {
          coercedObj[field.name] = field.defaultValue;
        } else if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(field.type)) {
          return; // Invalid: intentionally return no value.
        }

        continue;
      }

      const fieldValue = valueFromAST(fieldNode.value, field.type, variables);

      if (fieldValue === undefined) {
        return; // Invalid: intentionally return no value.
      }

      coercedObj[field.name] = fieldValue;
    }

    return coercedObj;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isLeafType)(type)) {
    // Scalars and Enums fulfill parsing a literal value via parseLiteral().
    // Invalid values represent a failure to parse correctly, in which case
    // no value is returned.
    let result;

    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return; // Invalid: intentionally return no value.
    }

    if (result === undefined) {
      return; // Invalid: intentionally return no value.
    }

    return result;
  }
  /* c8 ignore next 3 */
  // Not reachable, all possible input types have been considered.

   false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__.invariant)(false, 'Unexpected input type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_4__.inspect)(type));
} // Returns true if the provided valueNode is a variable which is not defined
// in the set of variables.

function isMissingVariable(valueNode, variables) {
  return (
    valueNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE &&
    (variables == null || variables[valueNode.name.value] === undefined)
  );
}


/***/ }),

/***/ "../../graphql/utilities/valueFromASTUntyped.mjs":
/*!*******************************************************!*\
  !*** ../../graphql/utilities/valueFromASTUntyped.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "valueFromASTUntyped": () => (/* binding */ valueFromASTUntyped)
/* harmony export */ });
/* harmony import */ var _jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsutils/keyValMap.mjs */ "../../graphql/jsutils/keyValMap.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");


/**
 * Produces a JavaScript value given a GraphQL Value AST.
 *
 * Unlike `valueFromAST()`, no type is provided. The resulting JavaScript value
 * will reflect the provided GraphQL value AST.
 *
 * | GraphQL Value        | JavaScript Value |
 * | -------------------- | ---------------- |
 * | Input Object         | Object           |
 * | List                 | Array            |
 * | Boolean              | Boolean          |
 * | String / Enum        | String           |
 * | Int / Float          | Number           |
 * | Null                 | null             |
 *
 */

function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NULL:
      return null;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INT:
      return parseInt(valueNode.value, 10);

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FLOAT:
      return parseFloat(valueNode.value);

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.STRING:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.BOOLEAN:
      return valueNode.value;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST:
      return valueNode.values.map((node) =>
        valueFromASTUntyped(node, variables),
      );

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT:
      return (0,_jsutils_keyValMap_mjs__WEBPACK_IMPORTED_MODULE_1__.keyValMap)(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromASTUntyped(field.value, variables),
      );

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE:
      return variables === null || variables === void 0
        ? void 0
        : variables[valueNode.name.value];
  }
}


/***/ }),

/***/ "../../graphql/validation/ValidationContext.mjs":
/*!******************************************************!*\
  !*** ../../graphql/validation/ValidationContext.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ASTValidationContext": () => (/* binding */ ASTValidationContext),
/* harmony export */   "SDLValidationContext": () => (/* binding */ SDLValidationContext),
/* harmony export */   "ValidationContext": () => (/* binding */ ValidationContext)
/* harmony export */ });
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_visitor_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/visitor.mjs */ "../../graphql/language/visitor.mjs");
/* harmony import */ var _utilities_TypeInfo_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/TypeInfo.mjs */ "../../graphql/utilities/TypeInfo.mjs");




/**
 * An instance of this class is passed as the "this" context to all validators,
 * allowing access to commonly useful contextual information from within a
 * validation rule.
 */
class ASTValidationContext {
  constructor(ast, onError) {
    this._ast = ast;
    this._fragments = undefined;
    this._fragmentSpreads = new Map();
    this._recursivelyReferencedFragments = new Map();
    this._onError = onError;
  }

  get [Symbol.toStringTag]() {
    return 'ASTValidationContext';
  }

  reportError(error) {
    this._onError(error);
  }

  getDocument() {
    return this._ast;
  }

  getFragment(name) {
    let fragments;

    if (this._fragments) {
      fragments = this._fragments;
    } else {
      fragments = Object.create(null);

      for (const defNode of this.getDocument().definitions) {
        if (defNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_DEFINITION) {
          fragments[defNode.name.value] = defNode;
        }
      }

      this._fragments = fragments;
    }

    return fragments[name];
  }

  getFragmentSpreads(node) {
    let spreads = this._fragmentSpreads.get(node);

    if (!spreads) {
      spreads = [];
      const setsToVisit = [node];
      let set;

      while ((set = setsToVisit.pop())) {
        for (const selection of set.selections) {
          if (selection.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }

      this._fragmentSpreads.set(node, spreads);
    }

    return spreads;
  }

  getRecursivelyReferencedFragments(operation) {
    let fragments = this._recursivelyReferencedFragments.get(operation);

    if (!fragments) {
      fragments = [];
      const collectedNames = Object.create(null);
      const nodesToVisit = [operation.selectionSet];
      let node;

      while ((node = nodesToVisit.pop())) {
        for (const spread of this.getFragmentSpreads(node)) {
          const fragName = spread.name.value;

          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            const fragment = this.getFragment(fragName);

            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }

      this._recursivelyReferencedFragments.set(operation, fragments);
    }

    return fragments;
  }
}
class SDLValidationContext extends ASTValidationContext {
  constructor(ast, schema, onError) {
    super(ast, onError);
    this._schema = schema;
  }

  get [Symbol.toStringTag]() {
    return 'SDLValidationContext';
  }

  getSchema() {
    return this._schema;
  }
}
class ValidationContext extends ASTValidationContext {
  constructor(schema, ast, typeInfo, onError) {
    super(ast, onError);
    this._schema = schema;
    this._typeInfo = typeInfo;
    this._variableUsages = new Map();
    this._recursiveVariableUsages = new Map();
  }

  get [Symbol.toStringTag]() {
    return 'ValidationContext';
  }

  getSchema() {
    return this._schema;
  }

  getVariableUsages(node) {
    let usages = this._variableUsages.get(node);

    if (!usages) {
      const newUsages = [];
      const typeInfo = new _utilities_TypeInfo_mjs__WEBPACK_IMPORTED_MODULE_1__.TypeInfo(this._schema);
      (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_2__.visit)(
        node,
        (0,_utilities_TypeInfo_mjs__WEBPACK_IMPORTED_MODULE_1__.visitWithTypeInfo)(typeInfo, {
          VariableDefinition: () => false,

          Variable(variable) {
            newUsages.push({
              node: variable,
              type: typeInfo.getInputType(),
              defaultValue: typeInfo.getDefaultValue(),
            });
          },
        }),
      );
      usages = newUsages;

      this._variableUsages.set(node, usages);
    }

    return usages;
  }

  getRecursiveVariableUsages(operation) {
    let usages = this._recursiveVariableUsages.get(operation);

    if (!usages) {
      usages = this.getVariableUsages(operation);

      for (const frag of this.getRecursivelyReferencedFragments(operation)) {
        usages = usages.concat(this.getVariableUsages(frag));
      }

      this._recursiveVariableUsages.set(operation, usages);
    }

    return usages;
  }

  getType() {
    return this._typeInfo.getType();
  }

  getParentType() {
    return this._typeInfo.getParentType();
  }

  getInputType() {
    return this._typeInfo.getInputType();
  }

  getParentInputType() {
    return this._typeInfo.getParentInputType();
  }

  getFieldDef() {
    return this._typeInfo.getFieldDef();
  }

  getDirective() {
    return this._typeInfo.getDirective();
  }

  getArgument() {
    return this._typeInfo.getArgument();
  }

  getEnumValue() {
    return this._typeInfo.getEnumValue();
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/ExecutableDefinitionsRule.mjs":
/*!********************************************************************!*\
  !*** ../../graphql/validation/rules/ExecutableDefinitionsRule.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExecutableDefinitionsRule": () => (/* binding */ ExecutableDefinitionsRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../language/predicates.mjs */ "../../graphql/language/predicates.mjs");




/**
 * Executable definitions
 *
 * A GraphQL document is only valid for execution if all definitions are either
 * operation or fragment definitions.
 *
 * See https://spec.graphql.org/draft/#sec-Executable-Definitions
 */
function ExecutableDefinitionsRule(context) {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!(0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__.isExecutableDefinitionNode)(definition)) {
          const defName =
            definition.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_DEFINITION ||
            definition.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_EXTENSION
              ? 'schema'
              : '"' + definition.name.value + '"';
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
              `The ${defName} definition is not executable.`,
              definition,
            ),
          );
        }
      }

      return false;
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/FieldsOnCorrectTypeRule.mjs":
/*!******************************************************************!*\
  !*** ../../graphql/validation/rules/FieldsOnCorrectTypeRule.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldsOnCorrectTypeRule": () => (/* binding */ FieldsOnCorrectTypeRule)
/* harmony export */ });
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../jsutils/naturalCompare.mjs */ "../../graphql/jsutils/naturalCompare.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");






/**
 * Fields on correct type
 *
 * A GraphQL document is only valid if all fields selected are defined by the
 * parent type, or are an allowed meta field such as __typename.
 *
 * See https://spec.graphql.org/draft/#sec-Field-Selections
 */
function FieldsOnCorrectTypeRule(context) {
  return {
    Field(node) {
      const type = context.getParentType();

      if (type) {
        const fieldDef = context.getFieldDef();

        if (!fieldDef) {
          // This field doesn't exist, lets look for suggestions.
          const schema = context.getSchema();
          const fieldName = node.name.value; // First determine if there are any suggested types to condition on.

          let suggestion = (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_0__.didYouMean)(
            'to use an inline fragment on',
            getSuggestedTypeNames(schema, type, fieldName),
          ); // If there are no suggested types, then perhaps this was a typo?

          if (suggestion === '') {
            suggestion = (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_0__.didYouMean)(getSuggestedFieldNames(type, fieldName));
          } // Report an error, including helpful suggestions.

          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
              `Cannot query field "${fieldName}" on type "${type.name}".` +
                suggestion,
              node,
            ),
          );
        }
      }
    },
  };
}
/**
 * Go through all of the implementations of type, as well as the interfaces that
 * they implement. If any of those types include the provided field, suggest them,
 * sorted by how often the type is referenced.
 */

function getSuggestedTypeNames(schema, type, fieldName) {
  if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isAbstractType)(type)) {
    // Must be an Object type, which does not have possible fields.
    return [];
  }

  const suggestedTypes = new Set();
  const usageCount = Object.create(null);

  for (const possibleType of schema.getPossibleTypes(type)) {
    if (!possibleType.getFields()[fieldName]) {
      continue;
    } // This object type defines this field.

    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;

    for (const possibleInterface of possibleType.getInterfaces()) {
      var _usageCount$possibleI;

      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      } // This interface type defines this field.

      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] =
        ((_usageCount$possibleI = usageCount[possibleInterface.name]) !==
          null && _usageCount$possibleI !== void 0
          ? _usageCount$possibleI
          : 0) + 1;
    }
  }

  return [...suggestedTypes]
    .sort((typeA, typeB) => {
      // Suggest both interface and object types based on how common they are.
      const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];

      if (usageCountDiff !== 0) {
        return usageCountDiff;
      } // Suggest super types first followed by subtypes

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType)(typeA) && schema.isSubType(typeA, typeB)) {
        return -1;
      }

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType)(typeB) && schema.isSubType(typeB, typeA)) {
        return 1;
      }

      return (0,_jsutils_naturalCompare_mjs__WEBPACK_IMPORTED_MODULE_3__.naturalCompare)(typeA.name, typeB.name);
    })
    .map((x) => x.name);
}
/**
 * For the field name provided, determine if there are any similar field names
 * that may be the result of a typo.
 */

function getSuggestedFieldNames(type, fieldName) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isObjectType)(type) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInterfaceType)(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_4__.suggestionList)(fieldName, possibleFieldNames);
  } // Otherwise, must be a Union type, which does not define fields.

  return [];
}


/***/ }),

/***/ "../../graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs":
/*!************************************************************************!*\
  !*** ../../graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FragmentsOnCompositeTypesRule": () => (/* binding */ FragmentsOnCompositeTypesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");





/**
 * Fragments on composite type
 *
 * Fragments use a type condition to determine if they apply, since fragments
 * can only be spread into a composite type (object, interface, or union), the
 * type condition must also be a composite type.
 *
 * See https://spec.graphql.org/draft/#sec-Fragments-On-Composite-Types
 */
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;

      if (typeCondition) {
        const type = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__.typeFromAST)(context.getSchema(), typeCondition);

        if (type && !(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isCompositeType)(type)) {
          const typeStr = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_2__.print)(typeCondition);
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
              `Fragment cannot condition on non composite type "${typeStr}".`,
              typeCondition,
            ),
          );
        }
      }
    },

    FragmentDefinition(node) {
      const type = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__.typeFromAST)(context.getSchema(), node.typeCondition);

      if (type && !(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isCompositeType)(type)) {
        const typeStr = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_2__.print)(node.typeCondition);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
            `Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`,
            node.typeCondition,
          ),
        );
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/KnownArgumentNamesRule.mjs":
/*!*****************************************************************!*\
  !*** ../../graphql/validation/rules/KnownArgumentNamesRule.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KnownArgumentNamesRule": () => (/* binding */ KnownArgumentNamesRule),
/* harmony export */   "KnownArgumentNamesOnDirectivesRule": () => (/* binding */ KnownArgumentNamesOnDirectivesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/directives.mjs */ "../../graphql/type/directives.mjs");






/**
 * Known argument names
 *
 * A GraphQL field is only valid if all supplied arguments are defined by
 * that field.
 *
 * See https://spec.graphql.org/draft/#sec-Argument-Names
 * See https://spec.graphql.org/draft/#sec-Directives-Are-In-Valid-Locations
 */
function KnownArgumentNamesRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...KnownArgumentNamesOnDirectivesRule(context),

    Argument(argNode) {
      const argDef = context.getArgument();
      const fieldDef = context.getFieldDef();
      const parentType = context.getParentType();

      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map((arg) => arg.name);
        const suggestions = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_0__.suggestionList)(argName, knownArgsNames);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` +
              (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_2__.didYouMean)(suggestions),
            argNode,
          ),
        );
      }
    },
  };
}
/**
 * @internal
 */

function KnownArgumentNamesOnDirectivesRule(context) {
  const directiveArgs = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : _type_directives_mjs__WEBPACK_IMPORTED_MODULE_3__.specifiedDirectives;

  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const argsNodes =
        (_def$arguments = def.arguments) !== null && _def$arguments !== void 0
          ? _def$arguments
          : [];
      directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
    }
  }

  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];

      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;

          if (!knownArgs.includes(argName)) {
            const suggestions = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_0__.suggestionList)(argName, knownArgs);
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
                `Unknown argument "${argName}" on directive "@${directiveName}".` +
                  (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_2__.didYouMean)(suggestions),
                argNode,
              ),
            );
          }
        }
      }

      return false;
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/KnownDirectivesRule.mjs":
/*!**************************************************************!*\
  !*** ../../graphql/validation/rules/KnownDirectivesRule.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KnownDirectivesRule": () => (/* binding */ KnownDirectivesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_ast_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../language/ast.mjs */ "../../graphql/language/ast.mjs");
/* harmony import */ var _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../language/directiveLocation.mjs */ "../../graphql/language/directiveLocation.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/directives.mjs */ "../../graphql/type/directives.mjs");








/**
 * Known directives
 *
 * A GraphQL document is only valid if all `@directives` are known by the
 * schema and legally positioned.
 *
 * See https://spec.graphql.org/draft/#sec-Directives-Are-Defined
 */
function KnownDirectivesRule(context) {
  const locationsMap = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__.specifiedDirectives;

  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map((name) => name.value);
    }
  }

  return {
    Directive(node, _key, _parent, _path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];

      if (!locations) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(`Unknown directive "@${name}".`, node),
        );
        return;
      }

      const candidateLocation = getDirectiveLocationForASTPath(ancestors);

      if (candidateLocation && !locations.includes(candidateLocation)) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
            `Directive "@${name}" may not be used on ${candidateLocation}.`,
            node,
          ),
        );
      }
    },
  };
}

function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  'kind' in appliedTo || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__.invariant)(false);

  switch (appliedTo.kind) {
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FIELD:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.FIELD;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_SPREAD:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.FRAGMENT_SPREAD;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INLINE_FRAGMENT:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.INLINE_FRAGMENT;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_DEFINITION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.FRAGMENT_DEFINITION;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.VARIABLE_DEFINITION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.VARIABLE_DEFINITION;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.SCHEMA;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCALAR_TYPE_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCALAR_TYPE_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.SCALAR;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT_TYPE_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.OBJECT_TYPE_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.OBJECT;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.FIELD_DEFINITION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.FIELD_DEFINITION;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INTERFACE_TYPE_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INTERFACE_TYPE_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.INTERFACE;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.UNION_TYPE_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.UNION_TYPE_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.UNION;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM_TYPE_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM_TYPE_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.ENUM;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.ENUM_VALUE_DEFINITION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.ENUM_VALUE;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.INPUT_OBJECT;

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INPUT_VALUE_DEFINITION: {
      const parentNode = ancestors[ancestors.length - 3];
      'kind' in parentNode || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__.invariant)(false);
      return parentNode.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.INPUT_OBJECT_TYPE_DEFINITION
        ? _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.INPUT_FIELD_DEFINITION
        : _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.ARGUMENT_DEFINITION;
    }
    // Not reachable, all possible types have been considered.

    /* c8 ignore next */

    default:
       false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_3__.invariant)(false, 'Unexpected kind: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_5__.inspect)(appliedTo.kind));
  }
}

function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_6__.OperationTypeNode.QUERY:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.QUERY;

    case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_6__.OperationTypeNode.MUTATION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.MUTATION;

    case _language_ast_mjs__WEBPACK_IMPORTED_MODULE_6__.OperationTypeNode.SUBSCRIPTION:
      return _language_directiveLocation_mjs__WEBPACK_IMPORTED_MODULE_4__.DirectiveLocation.SUBSCRIPTION;
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/KnownFragmentNamesRule.mjs":
/*!*****************************************************************!*\
  !*** ../../graphql/validation/rules/KnownFragmentNamesRule.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KnownFragmentNamesRule": () => (/* binding */ KnownFragmentNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Known fragment names
 *
 * A GraphQL document is only valid if all `...Fragment` fragment spreads refer
 * to fragments defined in the same document.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-spread-target-defined
 */
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread(node) {
      const fragmentName = node.name.value;
      const fragment = context.getFragment(fragmentName);

      if (!fragment) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(`Unknown fragment "${fragmentName}".`, node.name),
        );
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/KnownTypeNamesRule.mjs":
/*!*************************************************************!*\
  !*** ../../graphql/validation/rules/KnownTypeNamesRule.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KnownTypeNamesRule": () => (/* binding */ KnownTypeNamesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../language/predicates.mjs */ "../../graphql/language/predicates.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/introspection.mjs */ "../../graphql/type/introspection.mjs");
/* harmony import */ var _type_scalars_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/scalars.mjs */ "../../graphql/type/scalars.mjs");







/**
 * Known type names
 *
 * A GraphQL document is only valid if referenced types (specifically
 * variable definitions and fragment conditions) are defined by the type schema.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-Spread-Type-Existence
 */
function KnownTypeNamesRule(context) {
  const schema = context.getSchema();
  const existingTypesMap = schema ? schema.getTypeMap() : Object.create(null);
  const definedTypes = Object.create(null);

  for (const def of context.getDocument().definitions) {
    if ((0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__.isTypeDefinitionNode)(def)) {
      definedTypes[def.name.value] = true;
    }
  }

  const typeNames = [
    ...Object.keys(existingTypesMap),
    ...Object.keys(definedTypes),
  ];
  return {
    NamedType(node, _1, parent, _2, ancestors) {
      const typeName = node.name.value;

      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;

        const definitionNode =
          (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0
            ? _ancestors$
            : parent;
        const isSDL = definitionNode != null && isSDLNode(definitionNode);

        if (isSDL && standardTypeNames.includes(typeName)) {
          return;
        }

        const suggestedTypes = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_1__.suggestionList)(
          typeName,
          isSDL ? standardTypeNames.concat(typeNames) : typeNames,
        );
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
            `Unknown type "${typeName}".` + (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_3__.didYouMean)(suggestedTypes),
            node,
          ),
        );
      }
    },
  };
}
const standardTypeNames = [..._type_scalars_mjs__WEBPACK_IMPORTED_MODULE_4__.specifiedScalarTypes, ..._type_introspection_mjs__WEBPACK_IMPORTED_MODULE_5__.introspectionTypes].map(
  (type) => type.name,
);

function isSDLNode(value) {
  return (
    'kind' in value &&
    ((0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__.isTypeSystemDefinitionNode)(value) || (0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__.isTypeSystemExtensionNode)(value))
  );
}


/***/ }),

/***/ "../../graphql/validation/rules/LoneAnonymousOperationRule.mjs":
/*!*********************************************************************!*\
  !*** ../../graphql/validation/rules/LoneAnonymousOperationRule.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoneAnonymousOperationRule": () => (/* binding */ LoneAnonymousOperationRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");



/**
 * Lone anonymous operation
 *
 * A GraphQL document is only valid if when it contains an anonymous operation
 * (the query short-hand) that it contains only that one operation definition.
 *
 * See https://spec.graphql.org/draft/#sec-Lone-Anonymous-Operation
 */
function LoneAnonymousOperationRule(context) {
  let operationCount = 0;
  return {
    Document(node) {
      operationCount = node.definitions.filter(
        (definition) => definition.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OPERATION_DEFINITION,
      ).length;
    },

    OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            'This anonymous operation must be the only defined operation.',
            node,
          ),
        );
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/LoneSchemaDefinitionRule.mjs":
/*!*******************************************************************!*\
  !*** ../../graphql/validation/rules/LoneSchemaDefinitionRule.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoneSchemaDefinitionRule": () => (/* binding */ LoneSchemaDefinitionRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Lone Schema definition
 *
 * A GraphQL document is only valid if it contains only one schema definition.
 */
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;

  const oldSchema = context.getSchema();
  const alreadyDefined =
    (_ref =
      (_ref2 =
        (_oldSchema$astNode =
          oldSchema === null || oldSchema === void 0
            ? void 0
            : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0
          ? _oldSchema$astNode
          : oldSchema === null || oldSchema === void 0
          ? void 0
          : oldSchema.getQueryType()) !== null && _ref2 !== void 0
        ? _ref2
        : oldSchema === null || oldSchema === void 0
        ? void 0
        : oldSchema.getMutationType()) !== null && _ref !== void 0
      ? _ref
      : oldSchema === null || oldSchema === void 0
      ? void 0
      : oldSchema.getSubscriptionType();
  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            'Cannot define a new schema within a schema extension.',
            node,
          ),
        );
        return;
      }

      if (schemaDefinitionsCount > 0) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError('Must provide only one schema definition.', node),
        );
      }

      ++schemaDefinitionsCount;
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/NoFragmentCyclesRule.mjs":
/*!***************************************************************!*\
  !*** ../../graphql/validation/rules/NoFragmentCyclesRule.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoFragmentCyclesRule": () => (/* binding */ NoFragmentCyclesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * No fragment cycles
 *
 * The graph of fragment spreads must not form any cycles including spreading itself.
 * Otherwise an operation could infinitely spread or infinitely execute on cycles in the underlying data.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-spreads-must-not-form-cycles
 */
function NoFragmentCyclesRule(context) {
  // Tracks already visited fragments to maintain O(N) and to ensure that cycles
  // are not redundantly reported.
  const visitedFrags = Object.create(null); // Array of AST nodes used to produce meaningful errors

  const spreadPath = []; // Position in the spread path

  const spreadPathIndexByName = Object.create(null);
  return {
    OperationDefinition: () => false,

    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    },
  }; // This does a straight-forward DFS to find cycles.
  // It does not terminate when a cycle was found but continues to explore
  // the graph to find all possible cycles.

  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }

    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);

    if (spreadNodes.length === 0) {
      return;
    }

    spreadPathIndexByName[fragmentName] = spreadPath.length;

    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);

      if (cycleIndex === undefined) {
        const spreadFragment = context.getFragment(spreadName);

        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const viaPath = cyclePath
          .slice(0, -1)
          .map((s) => '"' + s.name.value + '"')
          .join(', ');
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Cannot spread fragment "${spreadName}" within itself` +
              (viaPath !== '' ? ` via ${viaPath}.` : '.'),
            cyclePath,
          ),
        );
      }

      spreadPath.pop();
    }

    spreadPathIndexByName[fragmentName] = undefined;
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/NoUndefinedVariablesRule.mjs":
/*!*******************************************************************!*\
  !*** ../../graphql/validation/rules/NoUndefinedVariablesRule.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoUndefinedVariablesRule": () => (/* binding */ NoUndefinedVariablesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * No undefined variables
 *
 * A GraphQL operation is only valid if all variables encountered, both directly
 * and via fragment spreads, are defined by that operation.
 *
 * See https://spec.graphql.org/draft/#sec-All-Variable-Uses-Defined
 */
function NoUndefinedVariablesRule(context) {
  let variableNameDefined = Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        variableNameDefined = Object.create(null);
      },

      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);

        for (const { node } of usages) {
          const varName = node.name.value;

          if (variableNameDefined[varName] !== true) {
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
                operation.name
                  ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".`
                  : `Variable "$${varName}" is not defined.`,
                [node, operation],
              ),
            );
          }
        }
      },
    },

    VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/NoUnusedFragmentsRule.mjs":
/*!****************************************************************!*\
  !*** ../../graphql/validation/rules/NoUnusedFragmentsRule.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoUnusedFragmentsRule": () => (/* binding */ NoUnusedFragmentsRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * No unused fragments
 *
 * A GraphQL document is only valid if all fragment definitions are spread
 * within operations, or spread within other fragments spread within operations.
 *
 * See https://spec.graphql.org/draft/#sec-Fragments-Must-Be-Used
 */
function NoUnusedFragmentsRule(context) {
  const operationDefs = [];
  const fragmentDefs = [];
  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },

    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },

    Document: {
      leave() {
        const fragmentNameUsed = Object.create(null);

        for (const operation of operationDefs) {
          for (const fragment of context.getRecursivelyReferencedFragments(
            operation,
          )) {
            fragmentNameUsed[fragment.name.value] = true;
          }
        }

        for (const fragmentDef of fragmentDefs) {
          const fragName = fragmentDef.name.value;

          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
                `Fragment "${fragName}" is never used.`,
                fragmentDef,
              ),
            );
          }
        }
      },
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/NoUnusedVariablesRule.mjs":
/*!****************************************************************!*\
  !*** ../../graphql/validation/rules/NoUnusedVariablesRule.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoUnusedVariablesRule": () => (/* binding */ NoUnusedVariablesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * No unused variables
 *
 * A GraphQL operation is only valid if all variables defined by an operation
 * are used, either directly or within a spread fragment.
 *
 * See https://spec.graphql.org/draft/#sec-All-Variables-Used
 */
function NoUnusedVariablesRule(context) {
  let variableDefs = [];
  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },

      leave(operation) {
        const variableNameUsed = Object.create(null);
        const usages = context.getRecursiveVariableUsages(operation);

        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }

        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;

          if (variableNameUsed[variableName] !== true) {
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
                operation.name
                  ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".`
                  : `Variable "$${variableName}" is never used.`,
                variableDef,
              ),
            );
          }
        }
      },
    },

    VariableDefinition(def) {
      variableDefs.push(def);
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs":
/*!***************************************************************************!*\
  !*** ../../graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverlappingFieldsCanBeMergedRule": () => (/* binding */ OverlappingFieldsCanBeMergedRule)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _utilities_sortValueNode_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/sortValueNode.mjs */ "../../graphql/utilities/sortValueNode.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");








function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason
      .map(
        ([responseName, subReason]) =>
          `subfields "${responseName}" conflict because ` +
          reasonMessage(subReason),
      )
      .join(' and ');
  }

  return reason;
}
/**
 * Overlapping fields can be merged
 *
 * A selection set is only valid if all fields (including spreading any
 * fragments) either correspond to distinct response names or can be merged
 * without ambiguity.
 *
 * See https://spec.graphql.org/draft/#sec-Field-Selection-Merging
 */

function OverlappingFieldsCanBeMergedRule(context) {
  // A memoization for when two fragments are compared "between" each other for
  // conflicts. Two fragments may be compared many times, so memoizing this can
  // dramatically improve the performance of this validator.
  const comparedFragmentPairs = new PairSet(); // A cache for the "field map" and list of fragment names found in any given
  // selection set. Selection sets may be asked for this information multiple
  // times, so this improves the performance of this validator.

  const cachedFieldsAndFragmentNames = new Map();
  return {
    SelectionSet(selectionSet) {
      const conflicts = findConflictsWithinSelectionSet(
        context,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        context.getParentType(),
        selectionSet,
      );

      for (const [[responseName, reason], fields1, fields2] of conflicts) {
        const reasonMsg = reasonMessage(reason);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`,
            fields1.concat(fields2),
          ),
        );
      }
    },
  };
}

/**
 * Algorithm:
 *
 * Conflicts occur when two fields exist in a query which will produce the same
 * response name, but represent differing values, thus creating a conflict.
 * The algorithm below finds all conflicts via making a series of comparisons
 * between fields. In order to compare as few fields as possible, this makes
 * a series of comparisons "within" sets of fields and "between" sets of fields.
 *
 * Given any selection set, a collection produces both a set of fields by
 * also including all inline fragments, as well as a list of fragments
 * referenced by fragment spreads.
 *
 * A) Each selection set represented in the document first compares "within" its
 * collected set of fields, finding any conflicts between every pair of
 * overlapping fields.
 * Note: This is the *only time* that a the fields "within" a set are compared
 * to each other. After this only fields "between" sets are compared.
 *
 * B) Also, if any fragment is referenced in a selection set, then a
 * comparison is made "between" the original set of fields and the
 * referenced fragment.
 *
 * C) Also, if multiple fragments are referenced, then comparisons
 * are made "between" each referenced fragment.
 *
 * D) When comparing "between" a set of fields and a referenced fragment, first
 * a comparison is made between each field in the original set of fields and
 * each field in the the referenced set of fields.
 *
 * E) Also, if any fragment is referenced in the referenced selection set,
 * then a comparison is made "between" the original set of fields and the
 * referenced fragment (recursively referring to step D).
 *
 * F) When comparing "between" two fragments, first a comparison is made between
 * each field in the first referenced set of fields and each field in the the
 * second referenced set of fields.
 *
 * G) Also, any fragments referenced by the first must be compared to the
 * second, and any fragments referenced by the second must be compared to the
 * first (recursively referring to step F).
 *
 * H) When comparing two fields, if both have selection sets, then a comparison
 * is made "between" both selection sets, first comparing the set of fields in
 * the first selection set with the set of fields in the second.
 *
 * I) Also, if any fragment is referenced in either selection set, then a
 * comparison is made "between" the other set of fields and the
 * referenced fragment.
 *
 * J) Also, if two fragments are referenced in both selection sets, then a
 * comparison is made "between" the two fragments.
 *
 */
// Find all conflicts found "within" a selection set, including those found
// via spreading in fragments. Called when visiting each SelectionSet in the
// GraphQL Document.
function findConflictsWithinSelectionSet(
  context,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  parentType,
  selectionSet,
) {
  const conflicts = [];
  const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType,
    selectionSet,
  ); // (A) Find find all conflicts "within" the fields of this selection set.
  // Note: this is the *only place* `collectConflictsWithin` is called.

  collectConflictsWithin(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    fieldMap,
  );

  if (fragmentNames.length !== 0) {
    // (B) Then collect conflicts between these fields and those represented by
    // each spread fragment name found.
    for (let i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        false,
        fieldMap,
        fragmentNames[i],
      ); // (C) Then compare this fragment with all other fragments found in this
      // selection set to collect conflicts between fragments spread together.
      // This compares each item in the list of fragment names to every other
      // item in that same list (except for itself).

      for (let j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(
          context,
          conflicts,
          cachedFieldsAndFragmentNames,
          comparedFragmentPairs,
          false,
          fragmentNames[i],
          fragmentNames[j],
        );
      }
    }
  }

  return conflicts;
} // Collect all conflicts found between a set of fields and a fragment reference
// including via spreading in any nested fragments.

function collectConflictsBetweenFieldsAndFragment(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  areMutuallyExclusive,
  fieldMap,
  fragmentName,
) {
  const fragment = context.getFragment(fragmentName);

  if (!fragment) {
    return;
  }

  const [fieldMap2, referencedFragmentNames] =
    getReferencedFieldsAndFragmentNames(
      context,
      cachedFieldsAndFragmentNames,
      fragment,
    ); // Do not compare a fragment's fieldMap to itself.

  if (fieldMap === fieldMap2) {
    return;
  } // (D) First collect any conflicts between the provided collection of fields
  // and the collection of fields represented by the given fragment.

  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap,
    fieldMap2,
  ); // (E) Then collect any conflicts between the provided collection of fields
  // and any fragment names found in the given fragment.

  for (const referencedFragmentName of referencedFragmentNames) {
    // Memoize so two fragments are not compared for conflicts more than once.
    if (
      comparedFragmentPairs.has(
        referencedFragmentName,
        fragmentName,
        areMutuallyExclusive,
      )
    ) {
      continue;
    }

    comparedFragmentPairs.add(
      referencedFragmentName,
      fragmentName,
      areMutuallyExclusive,
    );
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap,
      referencedFragmentName,
    );
  }
} // Collect all conflicts found between two fragments, including via spreading in
// any nested fragments.

function collectConflictsBetweenFragments(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  areMutuallyExclusive,
  fragmentName1,
  fragmentName2,
) {
  // No need to compare a fragment to itself.
  if (fragmentName1 === fragmentName2) {
    return;
  } // Memoize so two fragments are not compared for conflicts more than once.

  if (
    comparedFragmentPairs.has(
      fragmentName1,
      fragmentName2,
      areMutuallyExclusive,
    )
  ) {
    return;
  }

  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  const fragment1 = context.getFragment(fragmentName1);
  const fragment2 = context.getFragment(fragmentName2);

  if (!fragment1 || !fragment2) {
    return;
  }

  const [fieldMap1, referencedFragmentNames1] =
    getReferencedFieldsAndFragmentNames(
      context,
      cachedFieldsAndFragmentNames,
      fragment1,
    );
  const [fieldMap2, referencedFragmentNames2] =
    getReferencedFieldsAndFragmentNames(
      context,
      cachedFieldsAndFragmentNames,
      fragment2,
    ); // (F) First, collect all conflicts between these two collections of fields
  // (not including any nested fragments).

  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2,
  ); // (G) Then collect conflicts between the first fragment and any nested
  // fragments spread in the second fragment.

  for (const referencedFragmentName2 of referencedFragmentNames2) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fragmentName1,
      referencedFragmentName2,
    );
  } // (G) Then collect conflicts between the second fragment and any nested
  // fragments spread in the first fragment.

  for (const referencedFragmentName1 of referencedFragmentNames1) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      referencedFragmentName1,
      fragmentName2,
    );
  }
} // Find all conflicts found between two selection sets, including those found
// via spreading in fragments. Called when determining if conflicts exist
// between the sub-fields of two overlapping fields.

function findConflictsBetweenSubSelectionSets(
  context,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  areMutuallyExclusive,
  parentType1,
  selectionSet1,
  parentType2,
  selectionSet2,
) {
  const conflicts = [];
  const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType1,
    selectionSet1,
  );
  const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType2,
    selectionSet2,
  ); // (H) First, collect all conflicts between these two collections of field.

  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2,
  ); // (I) Then collect conflicts between the first collection of fields and
  // those referenced by each fragment name associated with the second.

  for (const fragmentName2 of fragmentNames2) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap1,
      fragmentName2,
    );
  } // (I) Then collect conflicts between the second collection of fields and
  // those referenced by each fragment name associated with the first.

  for (const fragmentName1 of fragmentNames1) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap2,
      fragmentName1,
    );
  } // (J) Also collect conflicts between any fragment names by the first and
  // fragment names by the second. This compares each item in the first set of
  // names to each item in the second set of names.

  for (const fragmentName1 of fragmentNames1) {
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFragments(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        areMutuallyExclusive,
        fragmentName1,
        fragmentName2,
      );
    }
  }

  return conflicts;
} // Collect all Conflicts "within" one collection of fields.

function collectConflictsWithin(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  fieldMap,
) {
  // A field map is a keyed collection, where each key represents a response
  // name and the value at that key is a list of all fields which provide that
  // response name. For every response name, if there are multiple fields, they
  // must be compared to find a potential conflict.
  for (const [responseName, fields] of Object.entries(fieldMap)) {
    // This compares every field in the list to every other field in this list
    // (except to itself). If the list only has one item, nothing needs to
    // be compared.
    if (fields.length > 1) {
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            false, // within one collection is never mutually exclusive
            responseName,
            fields[i],
            fields[j],
          );

          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
} // Collect all Conflicts between two collections of fields. This is similar to,
// but different from the `collectConflictsWithin` function above. This check
// assumes that `collectConflictsWithin` has already been called on each
// provided collection of fields. This is true because this validator traverses
// each individual selection set.

function collectConflictsBetween(
  context,
  conflicts,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  parentFieldsAreMutuallyExclusive,
  fieldMap1,
  fieldMap2,
) {
  // A field map is a keyed collection, where each key represents a response
  // name and the value at that key is a list of all fields which provide that
  // response name. For any response name which appears in both provided field
  // maps, each field from the first field map must be compared to every field
  // in the second field map to find potential conflicts.
  for (const [responseName, fields1] of Object.entries(fieldMap1)) {
    const fields2 = fieldMap2[responseName];

    if (fields2) {
      for (const field1 of fields1) {
        for (const field2 of fields2) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            parentFieldsAreMutuallyExclusive,
            responseName,
            field1,
            field2,
          );

          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
} // Determines if there is a conflict between two particular fields, including
// comparing their sub-fields.

function findConflict(
  context,
  cachedFieldsAndFragmentNames,
  comparedFragmentPairs,
  parentFieldsAreMutuallyExclusive,
  responseName,
  field1,
  field2,
) {
  const [parentType1, node1, def1] = field1;
  const [parentType2, node2, def2] = field2; // If it is known that two fields could not possibly apply at the same
  // time, due to the parent types, then it is safe to permit them to diverge
  // in aliased field or arguments used as they will not present any ambiguity
  // by differing.
  // It is known that two parent types could never overlap if they are
  // different Object types. Interface or Union types might overlap - if not
  // in the current state of the schema, then perhaps in some future version,
  // thus may not safely diverge.

  const areMutuallyExclusive =
    parentFieldsAreMutuallyExclusive ||
    (parentType1 !== parentType2 &&
      (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isObjectType)(parentType1) &&
      (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isObjectType)(parentType2));

  if (!areMutuallyExclusive) {
    // Two aliases must refer to the same field.
    const name1 = node1.name.value;
    const name2 = node2.name.value;

    if (name1 !== name2) {
      return [
        [responseName, `"${name1}" and "${name2}" are different fields`],
        [node1],
        [node2],
      ];
    } // Two field calls must have the same arguments.

    if (stringifyArguments(node1) !== stringifyArguments(node2)) {
      return [
        [responseName, 'they have differing arguments'],
        [node1],
        [node2],
      ];
    }
  } // The return type for each field.

  const type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  const type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;

  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [
      [
        responseName,
        `they return conflicting types "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(type1)}" and "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(
          type2,
        )}"`,
      ],
      [node1],
      [node2],
    ];
  } // Collect and compare sub-fields. Use the same "visited fragment names" list
  // for both collections so fields in a fragment reference are never
  // compared to themselves.

  const selectionSet1 = node1.selectionSet;
  const selectionSet2 = node2.selectionSet;

  if (selectionSet1 && selectionSet2) {
    const conflicts = findConflictsBetweenSubSelectionSets(
      context,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.getNamedType)(type1),
      selectionSet1,
      (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.getNamedType)(type2),
      selectionSet2,
    );
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}

function stringifyArguments(fieldNode) {
  var _fieldNode$arguments;

  // FIXME https://github.com/graphql/graphql-js/issues/2203
  const args =
    /* c8 ignore next */
    (_fieldNode$arguments = fieldNode.arguments) !== null &&
    _fieldNode$arguments !== void 0
      ? _fieldNode$arguments
      : [];
  const inputObjectWithArgs = {
    kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT,
    fields: args.map((argNode) => ({
      kind: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.OBJECT_FIELD,
      name: argNode.name,
      value: argNode.value,
    })),
  };
  return (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_4__.print)((0,_utilities_sortValueNode_mjs__WEBPACK_IMPORTED_MODULE_5__.sortValueNode)(inputObjectWithArgs));
} // Two types conflict if both types could not apply to a value simultaneously.
// Composite types are ignored as their individual field types will be compared
// later recursively. However List and Non-Null types must match.

function doTypesConflict(type1, type2) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isListType)(type1)) {
    return (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isListType)(type2)
      ? doTypesConflict(type1.ofType, type2.ofType)
      : true;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isListType)(type2)) {
    return true;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(type1)) {
    return (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(type2)
      ? doTypesConflict(type1.ofType, type2.ofType)
      : true;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonNullType)(type2)) {
    return true;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isLeafType)(type1) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isLeafType)(type2)) {
    return type1 !== type2;
  }

  return false;
} // Given a selection set, return the collection of fields (a mapping of response
// name to field nodes and definitions) as well as a list of fragment names
// referenced via fragment spreads.

function getFieldsAndFragmentNames(
  context,
  cachedFieldsAndFragmentNames,
  parentType,
  selectionSet,
) {
  const cached = cachedFieldsAndFragmentNames.get(selectionSet);

  if (cached) {
    return cached;
  }

  const nodeAndDefs = Object.create(null);
  const fragmentNames = Object.create(null);

  _collectFieldsAndFragmentNames(
    context,
    parentType,
    selectionSet,
    nodeAndDefs,
    fragmentNames,
  );

  const result = [nodeAndDefs, Object.keys(fragmentNames)];
  cachedFieldsAndFragmentNames.set(selectionSet, result);
  return result;
} // Given a reference to a fragment, return the represented collection of fields
// as well as a list of nested fragment names referenced via fragment spreads.

function getReferencedFieldsAndFragmentNames(
  context,
  cachedFieldsAndFragmentNames,
  fragment,
) {
  // Short-circuit building a type from the node if possible.
  const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);

  if (cached) {
    return cached;
  }

  const fragmentType = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_6__.typeFromAST)(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragmentType,
    fragment.selectionSet,
  );
}

function _collectFieldsAndFragmentNames(
  context,
  parentType,
  selectionSet,
  nodeAndDefs,
  fragmentNames,
) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FIELD: {
        const fieldName = selection.name.value;
        let fieldDef;

        if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isObjectType)(parentType) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isInterfaceType)(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }

        const responseName = selection.alias
          ? selection.alias.value
          : fieldName;

        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }

        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;

      case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_3__.Kind.INLINE_FRAGMENT: {
        const typeCondition = selection.typeCondition;
        const inlineFragmentType = typeCondition
          ? (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_6__.typeFromAST)(context.getSchema(), typeCondition)
          : parentType;

        _collectFieldsAndFragmentNames(
          context,
          inlineFragmentType,
          selection.selectionSet,
          nodeAndDefs,
          fragmentNames,
        );

        break;
      }
    }
  }
} // Given a series of Conflicts which occurred between two sub-fields, generate
// a single Conflict.

function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [
      [responseName, conflicts.map(([reason]) => reason)],
      [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
      [node2, ...conflicts.map(([, , fields2]) => fields2).flat()],
    ];
  }
}
/**
 * A way to keep track of pairs of things when the ordering of the pair does not matter.
 */

class PairSet {
  constructor() {
    this._data = new Map();
  }

  has(a, b, areMutuallyExclusive) {
    var _this$_data$get;

    const [key1, key2] = a < b ? [a, b] : [b, a];
    const result =
      (_this$_data$get = this._data.get(key1)) === null ||
      _this$_data$get === void 0
        ? void 0
        : _this$_data$get.get(key2);

    if (result === undefined) {
      return false;
    } // areMutuallyExclusive being false is a superset of being true, hence if
    // we want to know if this PairSet "has" these two with no exclusivity,
    // we have to ensure it was added as such.

    return areMutuallyExclusive ? true : areMutuallyExclusive === result;
  }

  add(a, b, areMutuallyExclusive) {
    const [key1, key2] = a < b ? [a, b] : [b, a];

    const map = this._data.get(key1);

    if (map === undefined) {
      this._data.set(key1, new Map([[key2, areMutuallyExclusive]]));
    } else {
      map.set(key2, areMutuallyExclusive);
    }
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/PossibleFragmentSpreadsRule.mjs":
/*!**********************************************************************!*\
  !*** ../../graphql/validation/rules/PossibleFragmentSpreadsRule.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PossibleFragmentSpreadsRule": () => (/* binding */ PossibleFragmentSpreadsRule)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/typeComparators.mjs */ "../../graphql/utilities/typeComparators.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");






/**
 * Possible fragment spread
 *
 * A fragment spread is only valid if the type condition could ever possibly
 * be true: if there is a non-empty intersection of the possible parent types,
 * and possible types which pass the type condition.
 */
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment(node) {
      const fragType = context.getType();
      const parentType = context.getParentType();

      if (
        (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isCompositeType)(fragType) &&
        (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isCompositeType)(parentType) &&
        !(0,_utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_1__.doTypesOverlap)(context.getSchema(), fragType, parentType)
      ) {
        const parentTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(parentType);
        const fragTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(fragType);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
            `Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            node,
          ),
        );
      }
    },

    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context, fragName);
      const parentType = context.getParentType();

      if (
        fragType &&
        parentType &&
        !(0,_utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_1__.doTypesOverlap)(context.getSchema(), fragType, parentType)
      ) {
        const parentTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(parentType);
        const fragTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(fragType);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
            `Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            node,
          ),
        );
      }
    },
  };
}

function getFragmentType(context, name) {
  const frag = context.getFragment(name);

  if (frag) {
    const type = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_4__.typeFromAST)(context.getSchema(), frag.typeCondition);

    if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isCompositeType)(type)) {
      return type;
    }
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/PossibleTypeExtensionsRule.mjs":
/*!*********************************************************************!*\
  !*** ../../graphql/validation/rules/PossibleTypeExtensionsRule.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PossibleTypeExtensionsRule": () => (/* binding */ PossibleTypeExtensionsRule)
/* harmony export */ });
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../language/predicates.mjs */ "../../graphql/language/predicates.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");









/**
 * Possible type extension
 *
 * A type extension is only valid if the type is defined and has the same kind.
 */
function PossibleTypeExtensionsRule(context) {
  const schema = context.getSchema();
  const definedTypes = Object.create(null);

  for (const def of context.getDocument().definitions) {
    if ((0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_0__.isTypeDefinitionNode)(def)) {
      definedTypes[def.name.value] = def;
    }
  }

  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension,
  };

  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType =
      schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    let expectedKind;

    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }

    if (expectedKind) {
      if (expectedKind !== node.kind) {
        const kindStr = extensionKindToTypeName(node.kind);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `Cannot extend non-${kindStr} type "${typeName}".`,
            defNode ? [defNode, node] : node,
          ),
        );
      }
    } else {
      const allTypeNames = Object.keys({
        ...definedTypes,
        ...(schema === null || schema === void 0
          ? void 0
          : schema.getTypeMap()),
      });
      const suggestedTypes = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_2__.suggestionList)(typeName, allTypeNames);
      context.reportError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
          `Cannot extend type "${typeName}" because it is not defined.` +
            (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_3__.didYouMean)(suggestedTypes),
          node.name,
        ),
      );
    }
  }
}
const defKindToExtKind = {
  [_language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.SCALAR_TYPE_DEFINITION]: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.SCALAR_TYPE_EXTENSION,
  [_language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.OBJECT_TYPE_DEFINITION]: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.OBJECT_TYPE_EXTENSION,
  [_language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INTERFACE_TYPE_DEFINITION]: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INTERFACE_TYPE_EXTENSION,
  [_language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.UNION_TYPE_DEFINITION]: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.UNION_TYPE_EXTENSION,
  [_language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.ENUM_TYPE_DEFINITION]: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.ENUM_TYPE_EXTENSION,
  [_language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INPUT_OBJECT_TYPE_DEFINITION]: _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INPUT_OBJECT_TYPE_EXTENSION,
};

function typeToExtKind(type) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isScalarType)(type)) {
    return _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.SCALAR_TYPE_EXTENSION;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isObjectType)(type)) {
    return _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.OBJECT_TYPE_EXTENSION;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isInterfaceType)(type)) {
    return _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INTERFACE_TYPE_EXTENSION;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isUnionType)(type)) {
    return _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.UNION_TYPE_EXTENSION;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isEnumType)(type)) {
    return _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.ENUM_TYPE_EXTENSION;
  }

  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_5__.isInputObjectType)(type)) {
    return _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  /* c8 ignore next 3 */
  // Not reachable. All possible types have been considered

   false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_6__.invariant)(false, 'Unexpected type: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_7__.inspect)(type));
}

function extensionKindToTypeName(kind) {
  switch (kind) {
    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.SCALAR_TYPE_EXTENSION:
      return 'scalar';

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.OBJECT_TYPE_EXTENSION:
      return 'object';

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INTERFACE_TYPE_EXTENSION:
      return 'interface';

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.UNION_TYPE_EXTENSION:
      return 'union';

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.ENUM_TYPE_EXTENSION:
      return 'enum';

    case _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return 'input object';
    // Not reachable. All possible types have been considered

    /* c8 ignore next */

    default:
       false || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_6__.invariant)(false, 'Unexpected kind: ' + (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_7__.inspect)(kind));
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs":
/*!************************************************************************!*\
  !*** ../../graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProvidedRequiredArgumentsRule": () => (/* binding */ ProvidedRequiredArgumentsRule),
/* harmony export */   "ProvidedRequiredArgumentsOnDirectivesRule": () => (/* binding */ ProvidedRequiredArgumentsOnDirectivesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/directives.mjs */ "../../graphql/type/directives.mjs");








/**
 * Provided required arguments
 *
 * A field or directive is only valid if all required (non-null without a
 * default value) field arguments have been provided.
 */
function ProvidedRequiredArgumentsRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...ProvidedRequiredArgumentsOnDirectivesRule(context),
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(fieldNode) {
        var _fieldNode$arguments;

        const fieldDef = context.getFieldDef();

        if (!fieldDef) {
          return false;
        }

        const providedArgs = new Set( // FIXME: https://github.com/graphql/graphql-js/issues/2203
          /* c8 ignore next */
          (_fieldNode$arguments = fieldNode.arguments) === null ||
          _fieldNode$arguments === void 0
            ? void 0
            : _fieldNode$arguments.map((arg) => arg.name.value),
        );

        for (const argDef of fieldDef.args) {
          if (!providedArgs.has(argDef.name) && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isRequiredArgument)(argDef)) {
            const argTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(argDef.type);
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
                `Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`,
                fieldNode,
              ),
            );
          }
        }
      },
    },
  };
}
/**
 * @internal
 */

function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var _schema$getDirectives;

  const requiredArgsMap = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives =
    (_schema$getDirectives =
      schema === null || schema === void 0
        ? void 0
        : schema.getDirectives()) !== null && _schema$getDirectives !== void 0
      ? _schema$getDirectives
      : _type_directives_mjs__WEBPACK_IMPORTED_MODULE_3__.specifiedDirectives;

  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_4__.keyMap)(
      directive.args.filter(_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isRequiredArgument),
      (arg) => arg.name,
    );
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_5__.Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const argNodes =
        (_def$arguments = def.arguments) !== null && _def$arguments !== void 0
          ? _def$arguments
          : [];
      requiredArgsMap[def.name.value] = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_4__.keyMap)(
        argNodes.filter(isRequiredArgumentNode),
        (arg) => arg.name.value,
      );
    }
  }

  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];

        if (requiredArgs) {
          var _directiveNode$argume;

          // FIXME: https://github.com/graphql/graphql-js/issues/2203

          /* c8 ignore next */
          const argNodes =
            (_directiveNode$argume = directiveNode.arguments) !== null &&
            _directiveNode$argume !== void 0
              ? _directiveNode$argume
              : [];
          const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));

          for (const [argName, argDef] of Object.entries(requiredArgs)) {
            if (!argNodeMap.has(argName)) {
              const argType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isType)(argDef.type)
                ? (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(argDef.type)
                : (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__.print)(argDef.type);
              context.reportError(
                new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
                  `Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`,
                  directiveNode,
                ),
              );
            }
          }
        }
      },
    },
  };
}

function isRequiredArgumentNode(arg) {
  return arg.type.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_5__.Kind.NON_NULL_TYPE && arg.defaultValue == null;
}


/***/ }),

/***/ "../../graphql/validation/rules/ScalarLeafsRule.mjs":
/*!**********************************************************!*\
  !*** ../../graphql/validation/rules/ScalarLeafsRule.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScalarLeafsRule": () => (/* binding */ ScalarLeafsRule)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");




/**
 * Scalar leafs
 *
 * A GraphQL document is valid only if all leaf fields (fields without
 * sub selections) are of scalar or enum types.
 */
function ScalarLeafsRule(context) {
  return {
    Field(node) {
      const type = context.getType();
      const selectionSet = node.selectionSet;

      if (type) {
        if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isLeafType)((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(type))) {
          if (selectionSet) {
            const fieldName = node.name.value;
            const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(type);
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
                `Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`,
                selectionSet,
              ),
            );
          }
        } else if (!selectionSet) {
          const fieldName = node.name.value;
          const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(type);
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`,
              node,
            ),
          );
        }
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/SingleFieldSubscriptionsRule.mjs":
/*!***********************************************************************!*\
  !*** ../../graphql/validation/rules/SingleFieldSubscriptionsRule.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SingleFieldSubscriptionsRule": () => (/* binding */ SingleFieldSubscriptionsRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _execution_collectFields_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../execution/collectFields.mjs */ "../../graphql/execution/collectFields.mjs");




/**
 * Subscriptions must only include a non-introspection field.
 *
 * A GraphQL subscription is valid only if it contains a single root field and
 * that root field is not an introspection field.
 *
 * See https://spec.graphql.org/draft/#sec-Single-root-field
 */
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition(node) {
      if (node.operation === 'subscription') {
        const schema = context.getSchema();
        const subscriptionType = schema.getSubscriptionType();

        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues = Object.create(null);
          const document = context.getDocument();
          const fragments = Object.create(null);

          for (const definition of document.definitions) {
            if (definition.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = definition;
            }
          }

          const fields = (0,_execution_collectFields_mjs__WEBPACK_IMPORTED_MODULE_1__.collectFields)(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node.selectionSet,
          );

          if (fields.size > 1) {
            const fieldSelectionLists = [...fields.values()];
            const extraFieldSelectionLists = fieldSelectionLists.slice(1);
            const extraFieldSelections = extraFieldSelectionLists.flat();
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
                operationName != null
                  ? `Subscription "${operationName}" must select only one top level field.`
                  : 'Anonymous Subscription must select only one top level field.',
                extraFieldSelections,
              ),
            );
          }

          for (const fieldNodes of fields.values()) {
            const field = fieldNodes[0];
            const fieldName = field.name.value;

            if (fieldName.startsWith('__')) {
              context.reportError(
                new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
                  operationName != null
                    ? `Subscription "${operationName}" must not select an introspection top level field.`
                    : 'Anonymous Subscription must not select an introspection top level field.',
                  fieldNodes,
                ),
              );
            }
          }
        }
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs":
/*!****************************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueArgumentDefinitionNamesRule": () => (/* binding */ UniqueArgumentDefinitionNamesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_groupBy_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../jsutils/groupBy.mjs */ "../../graphql/jsutils/groupBy.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");



/**
 * Unique argument definition names
 *
 * A GraphQL Object or Interface type is only valid if all its fields have uniquely named arguments.
 * A GraphQL Directive is only valid if all its arguments are uniquely named.
 */
function UniqueArgumentDefinitionNamesRule(context) {
  return {
    DirectiveDefinition(directiveNode) {
      var _directiveNode$argume;

      // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const argumentNodes =
        (_directiveNode$argume = directiveNode.arguments) !== null &&
        _directiveNode$argume !== void 0
          ? _directiveNode$argume
          : [];
      return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
    },

    InterfaceTypeDefinition: checkArgUniquenessPerField,
    InterfaceTypeExtension: checkArgUniquenessPerField,
    ObjectTypeDefinition: checkArgUniquenessPerField,
    ObjectTypeExtension: checkArgUniquenessPerField,
  };

  function checkArgUniquenessPerField(typeNode) {
    var _typeNode$fields;

    const typeName = typeNode.name.value; // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */

    const fieldNodes =
      (_typeNode$fields = typeNode.fields) !== null &&
      _typeNode$fields !== void 0
        ? _typeNode$fields
        : [];

    for (const fieldDef of fieldNodes) {
      var _fieldDef$arguments;

      const fieldName = fieldDef.name.value; // FIXME: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */

      const argumentNodes =
        (_fieldDef$arguments = fieldDef.arguments) !== null &&
        _fieldDef$arguments !== void 0
          ? _fieldDef$arguments
          : [];
      checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
    }

    return false;
  }

  function checkArgUniqueness(parentName, argumentNodes) {
    const seenArgs = (0,_jsutils_groupBy_mjs__WEBPACK_IMPORTED_MODULE_0__.groupBy)(argumentNodes, (arg) => arg.name.value);

    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `Argument "${parentName}(${argName}:)" can only be defined once.`,
            argNodes.map((node) => node.name),
          ),
        );
      }
    }

    return false;
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueArgumentNamesRule.mjs":
/*!******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueArgumentNamesRule.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueArgumentNamesRule": () => (/* binding */ UniqueArgumentNamesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_groupBy_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../jsutils/groupBy.mjs */ "../../graphql/jsutils/groupBy.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");



/**
 * Unique argument names
 *
 * A GraphQL field or directive is only valid if all supplied arguments are
 * uniquely named.
 *
 * See https://spec.graphql.org/draft/#sec-Argument-Names
 */
function UniqueArgumentNamesRule(context) {
  return {
    Field: checkArgUniqueness,
    Directive: checkArgUniqueness,
  };

  function checkArgUniqueness(parentNode) {
    var _parentNode$arguments;

    // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */
    const argumentNodes =
      (_parentNode$arguments = parentNode.arguments) !== null &&
      _parentNode$arguments !== void 0
        ? _parentNode$arguments
        : [];
    const seenArgs = (0,_jsutils_groupBy_mjs__WEBPACK_IMPORTED_MODULE_0__.groupBy)(argumentNodes, (arg) => arg.name.value);

    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `There can be only one argument named "${argName}".`,
            argNodes.map((node) => node.name),
          ),
        );
      }
    }
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueDirectiveNamesRule.mjs":
/*!*******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueDirectiveNamesRule.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueDirectiveNamesRule": () => (/* binding */ UniqueDirectiveNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Unique directive names
 *
 * A GraphQL document is only valid if all defined directives have unique names.
 */
function UniqueDirectiveNamesRule(context) {
  const knownDirectiveNames = Object.create(null);
  const schema = context.getSchema();
  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;

      if (
        schema !== null &&
        schema !== void 0 &&
        schema.getDirective(directiveName)
      ) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`,
            node.name,
          ),
        );
        return;
      }

      if (knownDirectiveNames[directiveName]) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `There can be only one directive named "@${directiveName}".`,
            [knownDirectiveNames[directiveName], node.name],
          ),
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }

      return false;
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs":
/*!**************************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueDirectivesPerLocationRule": () => (/* binding */ UniqueDirectivesPerLocationRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _language_predicates_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../language/predicates.mjs */ "../../graphql/language/predicates.mjs");
/* harmony import */ var _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/directives.mjs */ "../../graphql/type/directives.mjs");





/**
 * Unique directive names per location
 *
 * A GraphQL document is only valid if all non-repeatable directives at
 * a given location are uniquely named.
 *
 * See https://spec.graphql.org/draft/#sec-Directives-Are-Unique-Per-Location
 */
function UniqueDirectivesPerLocationRule(context) {
  const uniqueDirectiveMap = Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema
    ? schema.getDirectives()
    : _type_directives_mjs__WEBPACK_IMPORTED_MODULE_0__.specifiedDirectives;

  for (const directive of definedDirectives) {
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }

  const astDefinitions = context.getDocument().definitions;

  for (const def of astDefinitions) {
    if (def.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }

  const schemaDirectives = Object.create(null);
  const typeDirectivesMap = Object.create(null);
  return {
    // Many different AST nodes may contain directives. Rather than listing
    // them all, just listen for entering any node, and check to see if it
    // defines any directives.
    enter(node) {
      if (!('directives' in node) || !node.directives) {
        return;
      }

      let seenDirectives;

      if (
        node.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_DEFINITION ||
        node.kind === _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind.SCHEMA_EXTENSION
      ) {
        seenDirectives = schemaDirectives;
      } else if ((0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_2__.isTypeDefinitionNode)(node) || (0,_language_predicates_mjs__WEBPACK_IMPORTED_MODULE_2__.isTypeExtensionNode)(node)) {
        const typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];

        if (seenDirectives === undefined) {
          typeDirectivesMap[typeName] = seenDirectives = Object.create(null);
        }
      } else {
        seenDirectives = Object.create(null);
      }

      for (const directive of node.directives) {
        const directiveName = directive.name.value;

        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(
              new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
                `The directive "@${directiveName}" can only be used once at this location.`,
                [seenDirectives[directiveName], directive],
              ),
            );
          } else {
            seenDirectives[directiveName] = directive;
          }
        }
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueEnumValueNamesRule.mjs":
/*!*******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueEnumValueNamesRule.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueEnumValueNamesRule": () => (/* binding */ UniqueEnumValueNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");



/**
 * Unique enum value names
 *
 * A GraphQL enum type is only valid if all its values are uniquely named.
 */
function UniqueEnumValueNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  const knownValueNames = Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness,
  };

  function checkValueUniqueness(node) {
    var _node$values;

    const typeName = node.name.value;

    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = Object.create(null);
    } // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */

    const valueNodes =
      (_node$values = node.values) !== null && _node$values !== void 0
        ? _node$values
        : [];
    const valueNames = knownValueNames[typeName];

    for (const valueDef of valueNodes) {
      const valueName = valueDef.name.value;
      const existingType = existingTypeMap[typeName];

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isEnumType)(existingType) && existingType.getValue(valueName)) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`,
            valueDef.name,
          ),
        );
      } else if (valueNames[valueName]) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `Enum value "${typeName}.${valueName}" can only be defined once.`,
            [valueNames[valueName], valueDef.name],
          ),
        );
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }

    return false;
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs":
/*!*************************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueFieldDefinitionNamesRule": () => (/* binding */ UniqueFieldDefinitionNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");



/**
 * Unique field definition names
 *
 * A GraphQL complex type is only valid if all its fields are uniquely named.
 */
function UniqueFieldDefinitionNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
  const knownFieldNames = Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness,
  };

  function checkFieldUniqueness(node) {
    var _node$fields;

    const typeName = node.name.value;

    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = Object.create(null);
    } // FIXME: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */

    const fieldNodes =
      (_node$fields = node.fields) !== null && _node$fields !== void 0
        ? _node$fields
        : [];
    const fieldNames = knownFieldNames[typeName];

    for (const fieldDef of fieldNodes) {
      const fieldName = fieldDef.name.value;

      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`,
            fieldDef.name,
          ),
        );
      } else if (fieldNames[fieldName]) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Field "${typeName}.${fieldName}" can only be defined once.`,
            [fieldNames[fieldName], fieldDef.name],
          ),
        );
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }

    return false;
  }
}

function hasField(type, fieldName) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isObjectType)(type) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isInterfaceType)(type) || (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isInputObjectType)(type)) {
    return type.getFields()[fieldName] != null;
  }

  return false;
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueFragmentNamesRule.mjs":
/*!******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueFragmentNamesRule.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueFragmentNamesRule": () => (/* binding */ UniqueFragmentNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 *
 * See https://spec.graphql.org/draft/#sec-Fragment-Name-Uniqueness
 */
function UniqueFragmentNamesRule(context) {
  const knownFragmentNames = Object.create(null);
  return {
    OperationDefinition: () => false,

    FragmentDefinition(node) {
      const fragmentName = node.name.value;

      if (knownFragmentNames[fragmentName]) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `There can be only one fragment named "${fragmentName}".`,
            [knownFragmentNames[fragmentName], node.name],
          ),
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }

      return false;
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueInputFieldNamesRule.mjs":
/*!********************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueInputFieldNamesRule.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueInputFieldNamesRule": () => (/* binding */ UniqueInputFieldNamesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");



/**
 * Unique input field names
 *
 * A GraphQL input object value is only valid if all supplied fields are
 * uniquely named.
 *
 * See https://spec.graphql.org/draft/#sec-Input-Object-Field-Uniqueness
 */
function UniqueInputFieldNamesRule(context) {
  const knownNameStack = [];
  let knownNames = Object.create(null);
  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = Object.create(null);
      },

      leave() {
        const prevKnownNames = knownNameStack.pop();
        prevKnownNames || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(false);
        knownNames = prevKnownNames;
      },
    },

    ObjectField(node) {
      const fieldName = node.name.value;

      if (knownNames[fieldName]) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `There can be only one input field named "${fieldName}".`,
            [knownNames[fieldName], node.name],
          ),
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueOperationNamesRule.mjs":
/*!*******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueOperationNamesRule.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueOperationNamesRule": () => (/* binding */ UniqueOperationNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Unique operation names
 *
 * A GraphQL document is only valid if all defined operations have unique names.
 *
 * See https://spec.graphql.org/draft/#sec-Operation-Name-Uniqueness
 */
function UniqueOperationNamesRule(context) {
  const knownOperationNames = Object.create(null);
  return {
    OperationDefinition(node) {
      const operationName = node.name;

      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
              `There can be only one operation named "${operationName.value}".`,
              [knownOperationNames[operationName.value], operationName],
            ),
          );
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }

      return false;
    },

    FragmentDefinition: () => false,
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueOperationTypesRule.mjs":
/*!*******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueOperationTypesRule.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueOperationTypesRule": () => (/* binding */ UniqueOperationTypesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Unique operation types
 *
 * A GraphQL document is only valid if it has only one type per operation.
 */
function UniqueOperationTypesRule(context) {
  const schema = context.getSchema();
  const definedOperationTypes = Object.create(null);
  const existingOperationTypes = schema
    ? {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
      }
    : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes,
  };

  function checkOperationTypes(node) {
    var _node$operationTypes;

    // See: https://github.com/graphql/graphql-js/issues/2203

    /* c8 ignore next */
    const operationTypesNodes =
      (_node$operationTypes = node.operationTypes) !== null &&
      _node$operationTypes !== void 0
        ? _node$operationTypes
        : [];

    for (const operationType of operationTypesNodes) {
      const operation = operationType.operation;
      const alreadyDefinedOperationType = definedOperationTypes[operation];

      if (existingOperationTypes[operation]) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `Type for ${operation} already defined in the schema. It cannot be redefined.`,
            operationType,
          ),
        );
      } else if (alreadyDefinedOperationType) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
            `There can be only one ${operation} type in schema.`,
            [alreadyDefinedOperationType, operationType],
          ),
        );
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }

    return false;
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueTypeNamesRule.mjs":
/*!**************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueTypeNamesRule.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueTypeNamesRule": () => (/* binding */ UniqueTypeNamesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");


/**
 * Unique type names
 *
 * A GraphQL document is only valid if all defined types have unique names.
 */
function UniqueTypeNamesRule(context) {
  const knownTypeNames = Object.create(null);
  const schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName,
  };

  function checkTypeName(node) {
    const typeName = node.name.value;

    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(
          `Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`,
          node.name,
        ),
      );
      return;
    }

    if (knownTypeNames[typeName]) {
      context.reportError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(`There can be only one type named "${typeName}".`, [
          knownTypeNames[typeName],
          node.name,
        ]),
      );
    } else {
      knownTypeNames[typeName] = node.name;
    }

    return false;
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/UniqueVariableNamesRule.mjs":
/*!******************************************************************!*\
  !*** ../../graphql/validation/rules/UniqueVariableNamesRule.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniqueVariableNamesRule": () => (/* binding */ UniqueVariableNamesRule)
/* harmony export */ });
/* harmony import */ var _jsutils_groupBy_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../jsutils/groupBy.mjs */ "../../graphql/jsutils/groupBy.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");



/**
 * Unique variable names
 *
 * A GraphQL operation is only valid if all its variables are uniquely named.
 */
function UniqueVariableNamesRule(context) {
  return {
    OperationDefinition(operationNode) {
      var _operationNode$variab;

      // See: https://github.com/graphql/graphql-js/issues/2203

      /* c8 ignore next */
      const variableDefinitions =
        (_operationNode$variab = operationNode.variableDefinitions) !== null &&
        _operationNode$variab !== void 0
          ? _operationNode$variab
          : [];
      const seenVariableDefinitions = (0,_jsutils_groupBy_mjs__WEBPACK_IMPORTED_MODULE_0__.groupBy)(
        variableDefinitions,
        (node) => node.variable.name.value,
      );

      for (const [variableName, variableNodes] of seenVariableDefinitions) {
        if (variableNodes.length > 1) {
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
              `There can be only one variable named "$${variableName}".`,
              variableNodes.map((node) => node.variable.name),
            ),
          );
        }
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/ValuesOfCorrectTypeRule.mjs":
/*!******************************************************************!*\
  !*** ../../graphql/validation/rules/ValuesOfCorrectTypeRule.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValuesOfCorrectTypeRule": () => (/* binding */ ValuesOfCorrectTypeRule)
/* harmony export */ });
/* harmony import */ var _jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../jsutils/didYouMean.mjs */ "../../graphql/jsutils/didYouMean.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../jsutils/keyMap.mjs */ "../../graphql/jsutils/keyMap.mjs");
/* harmony import */ var _jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../jsutils/suggestionList.mjs */ "../../graphql/jsutils/suggestionList.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");








/**
 * Value literals of correct type
 *
 * A GraphQL document is only valid if all value literals are of the type
 * expected at their position.
 *
 * See https://spec.graphql.org/draft/#sec-Values-of-Correct-Type
 */
function ValuesOfCorrectTypeRule(context) {
  return {
    ListValue(node) {
      // Note: TypeInfo will traverse into a list's item type, so look to the
      // parent input type to check if it is a list.
      const type = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNullableType)(context.getParentInputType());

      if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isListType)(type)) {
        isValidValueNode(context, node);
        return false; // Don't traverse further.
      }
    },

    ObjectValue(node) {
      const type = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(context.getInputType());

      if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(type)) {
        isValidValueNode(context, node);
        return false; // Don't traverse further.
      } // Ensure every required field exists.

      const fieldNodeMap = (0,_jsutils_keyMap_mjs__WEBPACK_IMPORTED_MODULE_1__.keyMap)(node.fields, (field) => field.name.value);

      for (const fieldDef of Object.values(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];

        if (!fieldNode && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isRequiredInputField)(fieldDef)) {
          const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(fieldDef.type);
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
              `Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`,
              node,
            ),
          );
        }
      }
    },

    ObjectField(node) {
      const parentType = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(context.getParentInputType());
      const fieldType = context.getInputType();

      if (!fieldType && (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isInputObjectType)(parentType)) {
        const suggestions = (0,_jsutils_suggestionList_mjs__WEBPACK_IMPORTED_MODULE_4__.suggestionList)(
          node.name.value,
          Object.keys(parentType.getFields()),
        );
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
            `Field "${node.name.value}" is not defined by type "${parentType.name}".` +
              (0,_jsutils_didYouMean_mjs__WEBPACK_IMPORTED_MODULE_5__.didYouMean)(suggestions),
            node,
          ),
        );
      }
    },

    NullValue(node) {
      const type = context.getInputType();

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isNonNullType)(type)) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
            `Expected value of type "${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(type)}", found ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__.print)(node)}.`,
            node,
          ),
        );
      }
    },

    EnumValue: (node) => isValidValueNode(context, node),
    IntValue: (node) => isValidValueNode(context, node),
    FloatValue: (node) => isValidValueNode(context, node),
    StringValue: (node) => isValidValueNode(context, node),
    BooleanValue: (node) => isValidValueNode(context, node),
  };
}
/**
 * Any value literal may be a valid representation of a Scalar, depending on
 * that scalar type.
 */

function isValidValueNode(context, node) {
  // Report any error at the full type expected by the location.
  const locationType = context.getInputType();

  if (!locationType) {
    return;
  }

  const type = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(locationType);

  if (!(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isLeafType)(type)) {
    const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(locationType);
    context.reportError(
      new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
        `Expected value of type "${typeStr}", found ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__.print)(node)}.`,
        node,
      ),
    );
    return;
  } // Scalars and Enums determine if a literal value is valid via parseLiteral(),
  // which may throw or return an invalid value to indicate failure.

  try {
    const parseResult = type.parseLiteral(
      node,
      undefined,
      /* variables */
    );

    if (parseResult === undefined) {
      const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(locationType);
      context.reportError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
          `Expected value of type "${typeStr}", found ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__.print)(node)}.`,
          node,
        ),
      );
    }
  } catch (error) {
    const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_2__.inspect)(locationType);

    if (error instanceof _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(
        new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
          `Expected value of type "${typeStr}", found ${(0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_6__.print)(node)}; ` +
            error.message,
          node,
          undefined,
          undefined,
          undefined,
          error,
        ),
      );
    }
  }
}


/***/ }),

/***/ "../../graphql/validation/rules/VariablesAreInputTypesRule.mjs":
/*!*********************************************************************!*\
  !*** ../../graphql/validation/rules/VariablesAreInputTypesRule.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariablesAreInputTypesRule": () => (/* binding */ VariablesAreInputTypesRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_printer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../language/printer.mjs */ "../../graphql/language/printer.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");





/**
 * Variables are input types
 *
 * A GraphQL operation is only valid if all the variables it defines are of
 * input types (scalar, enum, or input object).
 *
 * See https://spec.graphql.org/draft/#sec-Variables-Are-Input-Types
 */
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition(node) {
      const type = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__.typeFromAST)(context.getSchema(), node.type);

      if (type !== undefined && !(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_1__.isInputType)(type)) {
        const variableName = node.variable.name.value;
        const typeName = (0,_language_printer_mjs__WEBPACK_IMPORTED_MODULE_2__.print)(node.type);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_3__.GraphQLError(
            `Variable "$${variableName}" cannot be non-input type "${typeName}".`,
            node.type,
          ),
        );
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/VariablesInAllowedPositionRule.mjs":
/*!*************************************************************************!*\
  !*** ../../graphql/validation/rules/VariablesInAllowedPositionRule.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariablesInAllowedPositionRule": () => (/* binding */ VariablesInAllowedPositionRule)
/* harmony export */ });
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../jsutils/inspect.mjs */ "../../graphql/jsutils/inspect.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../language/kinds.mjs */ "../../graphql/language/kinds.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/typeComparators.mjs */ "../../graphql/utilities/typeComparators.mjs");
/* harmony import */ var _utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/typeFromAST.mjs */ "../../graphql/utilities/typeFromAST.mjs");







/**
 * Variables in allowed position
 *
 * Variable usages must be compatible with the arguments they are passed to.
 *
 * See https://spec.graphql.org/draft/#sec-All-Variable-Usages-are-Allowed
 */
function VariablesInAllowedPositionRule(context) {
  let varDefMap = Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        varDefMap = Object.create(null);
      },

      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);

        for (const { node, type, defaultValue } of usages) {
          const varName = node.name.value;
          const varDef = varDefMap[varName];

          if (varDef && type) {
            // A var type is allowed if it is the same or more strict (e.g. is
            // a subtype of) than the expected type. It can be more strict if
            // the variable type is non-null when the expected type is nullable.
            // If both are list types, the variable item type can be more strict
            // than the expected item type (contravariant).
            const schema = context.getSchema();
            const varType = (0,_utilities_typeFromAST_mjs__WEBPACK_IMPORTED_MODULE_0__.typeFromAST)(schema, varDef.type);

            if (
              varType &&
              !allowedVariableUsage(
                schema,
                varType,
                varDef.defaultValue,
                type,
                defaultValue,
              )
            ) {
              const varTypeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(varType);
              const typeStr = (0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_1__.inspect)(type);
              context.reportError(
                new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
                  `Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`,
                  [varDef, node],
                ),
              );
            }
          }
        }
      },
    },

    VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    },
  };
}
/**
 * Returns true if the variable is allowed in the location it was found,
 * which includes considering if default values exist for either the variable
 * or the location at which it is located.
 */

function allowedVariableUsage(
  schema,
  varType,
  varDefaultValue,
  locationType,
  locationDefaultValue,
) {
  if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isNonNullType)(locationType) && !(0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_3__.isNonNullType)(varType)) {
    const hasNonNullVariableDefaultValue =
      varDefaultValue != null && varDefaultValue.kind !== _language_kinds_mjs__WEBPACK_IMPORTED_MODULE_4__.Kind.NULL;
    const hasLocationDefaultValue = locationDefaultValue !== undefined;

    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }

    const nullableLocationType = locationType.ofType;
    return (0,_utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_5__.isTypeSubTypeOf)(schema, varType, nullableLocationType);
  }

  return (0,_utilities_typeComparators_mjs__WEBPACK_IMPORTED_MODULE_5__.isTypeSubTypeOf)(schema, varType, locationType);
}


/***/ }),

/***/ "../../graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs":
/*!************************************************************************!*\
  !*** ../../graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoDeprecatedCustomRule": () => (/* binding */ NoDeprecatedCustomRule)
/* harmony export */ });
/* harmony import */ var _jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../jsutils/invariant.mjs */ "../../graphql/jsutils/invariant.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../type/definition.mjs */ "../../graphql/type/definition.mjs");




/**
 * No deprecated
 *
 * A GraphQL document is only valid if all selected fields and all used enum values have not been
 * deprecated.
 *
 * Note: This rule is optional and is not part of the Validation section of the GraphQL
 * Specification. The main purpose of this rule is detection of deprecated usages and not
 * necessarily to forbid their use when querying a service.
 */
function NoDeprecatedCustomRule(context) {
  return {
    Field(node) {
      const fieldDef = context.getFieldDef();
      const deprecationReason =
        fieldDef === null || fieldDef === void 0
          ? void 0
          : fieldDef.deprecationReason;

      if (fieldDef && deprecationReason != null) {
        const parentType = context.getParentType();
        parentType != null || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(false);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `The field ${parentType.name}.${fieldDef.name} is deprecated. ${deprecationReason}`,
            node,
          ),
        );
      }
    },

    Argument(node) {
      const argDef = context.getArgument();
      const deprecationReason =
        argDef === null || argDef === void 0
          ? void 0
          : argDef.deprecationReason;

      if (argDef && deprecationReason != null) {
        const directiveDef = context.getDirective();

        if (directiveDef != null) {
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
              `Directive "@${directiveDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              node,
            ),
          );
        } else {
          const parentType = context.getParentType();
          const fieldDef = context.getFieldDef();
          (parentType != null && fieldDef != null) || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(false);
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
              `Field "${parentType.name}.${fieldDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              node,
            ),
          );
        }
      }
    },

    ObjectField(node) {
      const inputObjectDef = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.getNamedType)(context.getParentInputType());

      if ((0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputObjectType)(inputObjectDef)) {
        const inputFieldDef = inputObjectDef.getFields()[node.name.value];
        const deprecationReason =
          inputFieldDef === null || inputFieldDef === void 0
            ? void 0
            : inputFieldDef.deprecationReason;

        if (deprecationReason != null) {
          context.reportError(
            new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
              `The input field ${inputObjectDef.name}.${inputFieldDef.name} is deprecated. ${deprecationReason}`,
              node,
            ),
          );
        }
      }
    },

    EnumValue(node) {
      const enumValueDef = context.getEnumValue();
      const deprecationReason =
        enumValueDef === null || enumValueDef === void 0
          ? void 0
          : enumValueDef.deprecationReason;

      if (enumValueDef && deprecationReason != null) {
        const enumTypeDef = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_2__.getNamedType)(context.getInputType());
        enumTypeDef != null || (0,_jsutils_invariant_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant)(false);
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLError(
            `The enum value "${enumTypeDef.name}.${enumValueDef.name}" is deprecated. ${deprecationReason}`,
            node,
          ),
        );
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs":
/*!*********************************************************************************!*\
  !*** ../../graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoSchemaIntrospectionCustomRule": () => (/* binding */ NoSchemaIntrospectionCustomRule)
/* harmony export */ });
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../type/definition.mjs */ "../../graphql/type/definition.mjs");
/* harmony import */ var _type_introspection_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../type/introspection.mjs */ "../../graphql/type/introspection.mjs");




/**
 * Prohibit introspection queries
 *
 * A GraphQL document is only valid if all fields selected are not fields that
 * return an introspection type.
 *
 * Note: This rule is optional and is not part of the Validation section of the
 * GraphQL Specification. This rule effectively disables introspection, which
 * does not reflect best practices and should only be done if absolutely necessary.
 */
function NoSchemaIntrospectionCustomRule(context) {
  return {
    Field(node) {
      const type = (0,_type_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.getNamedType)(context.getType());

      if (type && (0,_type_introspection_mjs__WEBPACK_IMPORTED_MODULE_1__.isIntrospectionType)(type)) {
        context.reportError(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLError(
            `GraphQL introspection has been disabled, but the requested query contained the field "${node.name.value}".`,
            node,
          ),
        );
      }
    },
  };
}


/***/ }),

/***/ "../../graphql/validation/specifiedRules.mjs":
/*!***************************************************!*\
  !*** ../../graphql/validation/specifiedRules.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "specifiedRules": () => (/* binding */ specifiedRules),
/* harmony export */   "specifiedSDLRules": () => (/* binding */ specifiedSDLRules)
/* harmony export */ });
/* harmony import */ var _rules_ExecutableDefinitionsRule_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules/ExecutableDefinitionsRule.mjs */ "../../graphql/validation/rules/ExecutableDefinitionsRule.mjs");
/* harmony import */ var _rules_FieldsOnCorrectTypeRule_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rules/FieldsOnCorrectTypeRule.mjs */ "../../graphql/validation/rules/FieldsOnCorrectTypeRule.mjs");
/* harmony import */ var _rules_FragmentsOnCompositeTypesRule_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rules/FragmentsOnCompositeTypesRule.mjs */ "../../graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs");
/* harmony import */ var _rules_KnownArgumentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./rules/KnownArgumentNamesRule.mjs */ "../../graphql/validation/rules/KnownArgumentNamesRule.mjs");
/* harmony import */ var _rules_KnownDirectivesRule_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./rules/KnownDirectivesRule.mjs */ "../../graphql/validation/rules/KnownDirectivesRule.mjs");
/* harmony import */ var _rules_KnownFragmentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rules/KnownFragmentNamesRule.mjs */ "../../graphql/validation/rules/KnownFragmentNamesRule.mjs");
/* harmony import */ var _rules_KnownTypeNamesRule_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules/KnownTypeNamesRule.mjs */ "../../graphql/validation/rules/KnownTypeNamesRule.mjs");
/* harmony import */ var _rules_LoneAnonymousOperationRule_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules/LoneAnonymousOperationRule.mjs */ "../../graphql/validation/rules/LoneAnonymousOperationRule.mjs");
/* harmony import */ var _rules_LoneSchemaDefinitionRule_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./rules/LoneSchemaDefinitionRule.mjs */ "../../graphql/validation/rules/LoneSchemaDefinitionRule.mjs");
/* harmony import */ var _rules_NoFragmentCyclesRule_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./rules/NoFragmentCyclesRule.mjs */ "../../graphql/validation/rules/NoFragmentCyclesRule.mjs");
/* harmony import */ var _rules_NoUndefinedVariablesRule_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./rules/NoUndefinedVariablesRule.mjs */ "../../graphql/validation/rules/NoUndefinedVariablesRule.mjs");
/* harmony import */ var _rules_NoUnusedFragmentsRule_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rules/NoUnusedFragmentsRule.mjs */ "../../graphql/validation/rules/NoUnusedFragmentsRule.mjs");
/* harmony import */ var _rules_NoUnusedVariablesRule_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./rules/NoUnusedVariablesRule.mjs */ "../../graphql/validation/rules/NoUnusedVariablesRule.mjs");
/* harmony import */ var _rules_OverlappingFieldsCanBeMergedRule_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./rules/OverlappingFieldsCanBeMergedRule.mjs */ "../../graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs");
/* harmony import */ var _rules_PossibleFragmentSpreadsRule_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rules/PossibleFragmentSpreadsRule.mjs */ "../../graphql/validation/rules/PossibleFragmentSpreadsRule.mjs");
/* harmony import */ var _rules_PossibleTypeExtensionsRule_mjs__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./rules/PossibleTypeExtensionsRule.mjs */ "../../graphql/validation/rules/PossibleTypeExtensionsRule.mjs");
/* harmony import */ var _rules_ProvidedRequiredArgumentsRule_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./rules/ProvidedRequiredArgumentsRule.mjs */ "../../graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs");
/* harmony import */ var _rules_ScalarLeafsRule_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rules/ScalarLeafsRule.mjs */ "../../graphql/validation/rules/ScalarLeafsRule.mjs");
/* harmony import */ var _rules_SingleFieldSubscriptionsRule_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules/SingleFieldSubscriptionsRule.mjs */ "../../graphql/validation/rules/SingleFieldSubscriptionsRule.mjs");
/* harmony import */ var _rules_UniqueArgumentDefinitionNamesRule_mjs__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./rules/UniqueArgumentDefinitionNamesRule.mjs */ "../../graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs");
/* harmony import */ var _rules_UniqueArgumentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./rules/UniqueArgumentNamesRule.mjs */ "../../graphql/validation/rules/UniqueArgumentNamesRule.mjs");
/* harmony import */ var _rules_UniqueDirectiveNamesRule_mjs__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./rules/UniqueDirectiveNamesRule.mjs */ "../../graphql/validation/rules/UniqueDirectiveNamesRule.mjs");
/* harmony import */ var _rules_UniqueDirectivesPerLocationRule_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./rules/UniqueDirectivesPerLocationRule.mjs */ "../../graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs");
/* harmony import */ var _rules_UniqueEnumValueNamesRule_mjs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./rules/UniqueEnumValueNamesRule.mjs */ "../../graphql/validation/rules/UniqueEnumValueNamesRule.mjs");
/* harmony import */ var _rules_UniqueFieldDefinitionNamesRule_mjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./rules/UniqueFieldDefinitionNamesRule.mjs */ "../../graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs");
/* harmony import */ var _rules_UniqueFragmentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rules/UniqueFragmentNamesRule.mjs */ "../../graphql/validation/rules/UniqueFragmentNamesRule.mjs");
/* harmony import */ var _rules_UniqueInputFieldNamesRule_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./rules/UniqueInputFieldNamesRule.mjs */ "../../graphql/validation/rules/UniqueInputFieldNamesRule.mjs");
/* harmony import */ var _rules_UniqueOperationNamesRule_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rules/UniqueOperationNamesRule.mjs */ "../../graphql/validation/rules/UniqueOperationNamesRule.mjs");
/* harmony import */ var _rules_UniqueOperationTypesRule_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./rules/UniqueOperationTypesRule.mjs */ "../../graphql/validation/rules/UniqueOperationTypesRule.mjs");
/* harmony import */ var _rules_UniqueTypeNamesRule_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./rules/UniqueTypeNamesRule.mjs */ "../../graphql/validation/rules/UniqueTypeNamesRule.mjs");
/* harmony import */ var _rules_UniqueVariableNamesRule_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rules/UniqueVariableNamesRule.mjs */ "../../graphql/validation/rules/UniqueVariableNamesRule.mjs");
/* harmony import */ var _rules_ValuesOfCorrectTypeRule_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./rules/ValuesOfCorrectTypeRule.mjs */ "../../graphql/validation/rules/ValuesOfCorrectTypeRule.mjs");
/* harmony import */ var _rules_VariablesAreInputTypesRule_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rules/VariablesAreInputTypesRule.mjs */ "../../graphql/validation/rules/VariablesAreInputTypesRule.mjs");
/* harmony import */ var _rules_VariablesInAllowedPositionRule_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./rules/VariablesInAllowedPositionRule.mjs */ "../../graphql/validation/rules/VariablesInAllowedPositionRule.mjs");
// Spec Section: "Executable Definitions"
 // Spec Section: "Field Selections on Objects, Interfaces, and Unions Types"

 // Spec Section: "Fragments on Composite Types"

 // Spec Section: "Argument Names"

 // Spec Section: "Directives Are Defined"

 // Spec Section: "Fragment spread target defined"

 // Spec Section: "Fragment Spread Type Existence"

 // Spec Section: "Lone Anonymous Operation"

 // SDL-specific validation rules

 // Spec Section: "Fragments must not form cycles"

 // Spec Section: "All Variable Used Defined"

 // Spec Section: "Fragments must be used"

 // Spec Section: "All Variables Used"

 // Spec Section: "Field Selection Merging"

 // Spec Section: "Fragment spread is possible"


 // Spec Section: "Argument Optionality"

 // Spec Section: "Leaf Field Selections"

 // Spec Section: "Subscriptions with Single Root Field"


 // Spec Section: "Argument Uniqueness"


 // Spec Section: "Directives Are Unique Per Location"



 // Spec Section: "Fragment Name Uniqueness"

 // Spec Section: "Input Object Field Uniqueness"

 // Spec Section: "Operation Name Uniqueness"



 // Spec Section: "Variable Uniqueness"

 // Spec Section: "Value Type Correctness"

 // Spec Section: "Variables are Input Types"

 // Spec Section: "All Variable Usages Are Allowed"



/**
 * This set includes all validation rules defined by the GraphQL spec.
 *
 * The order of the rules in this list has been adjusted to lead to the
 * most clear output when encountering multiple validation errors.
 */
const specifiedRules = Object.freeze([
  _rules_ExecutableDefinitionsRule_mjs__WEBPACK_IMPORTED_MODULE_0__.ExecutableDefinitionsRule,
  _rules_UniqueOperationNamesRule_mjs__WEBPACK_IMPORTED_MODULE_1__.UniqueOperationNamesRule,
  _rules_LoneAnonymousOperationRule_mjs__WEBPACK_IMPORTED_MODULE_2__.LoneAnonymousOperationRule,
  _rules_SingleFieldSubscriptionsRule_mjs__WEBPACK_IMPORTED_MODULE_3__.SingleFieldSubscriptionsRule,
  _rules_KnownTypeNamesRule_mjs__WEBPACK_IMPORTED_MODULE_4__.KnownTypeNamesRule,
  _rules_FragmentsOnCompositeTypesRule_mjs__WEBPACK_IMPORTED_MODULE_5__.FragmentsOnCompositeTypesRule,
  _rules_VariablesAreInputTypesRule_mjs__WEBPACK_IMPORTED_MODULE_6__.VariablesAreInputTypesRule,
  _rules_ScalarLeafsRule_mjs__WEBPACK_IMPORTED_MODULE_7__.ScalarLeafsRule,
  _rules_FieldsOnCorrectTypeRule_mjs__WEBPACK_IMPORTED_MODULE_8__.FieldsOnCorrectTypeRule,
  _rules_UniqueFragmentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_9__.UniqueFragmentNamesRule,
  _rules_KnownFragmentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_10__.KnownFragmentNamesRule,
  _rules_NoUnusedFragmentsRule_mjs__WEBPACK_IMPORTED_MODULE_11__.NoUnusedFragmentsRule,
  _rules_PossibleFragmentSpreadsRule_mjs__WEBPACK_IMPORTED_MODULE_12__.PossibleFragmentSpreadsRule,
  _rules_NoFragmentCyclesRule_mjs__WEBPACK_IMPORTED_MODULE_13__.NoFragmentCyclesRule,
  _rules_UniqueVariableNamesRule_mjs__WEBPACK_IMPORTED_MODULE_14__.UniqueVariableNamesRule,
  _rules_NoUndefinedVariablesRule_mjs__WEBPACK_IMPORTED_MODULE_15__.NoUndefinedVariablesRule,
  _rules_NoUnusedVariablesRule_mjs__WEBPACK_IMPORTED_MODULE_16__.NoUnusedVariablesRule,
  _rules_KnownDirectivesRule_mjs__WEBPACK_IMPORTED_MODULE_17__.KnownDirectivesRule,
  _rules_UniqueDirectivesPerLocationRule_mjs__WEBPACK_IMPORTED_MODULE_18__.UniqueDirectivesPerLocationRule,
  _rules_KnownArgumentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_19__.KnownArgumentNamesRule,
  _rules_UniqueArgumentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_20__.UniqueArgumentNamesRule,
  _rules_ValuesOfCorrectTypeRule_mjs__WEBPACK_IMPORTED_MODULE_21__.ValuesOfCorrectTypeRule,
  _rules_ProvidedRequiredArgumentsRule_mjs__WEBPACK_IMPORTED_MODULE_22__.ProvidedRequiredArgumentsRule,
  _rules_VariablesInAllowedPositionRule_mjs__WEBPACK_IMPORTED_MODULE_23__.VariablesInAllowedPositionRule,
  _rules_OverlappingFieldsCanBeMergedRule_mjs__WEBPACK_IMPORTED_MODULE_24__.OverlappingFieldsCanBeMergedRule,
  _rules_UniqueInputFieldNamesRule_mjs__WEBPACK_IMPORTED_MODULE_25__.UniqueInputFieldNamesRule,
]);
/**
 * @internal
 */

const specifiedSDLRules = Object.freeze([
  _rules_LoneSchemaDefinitionRule_mjs__WEBPACK_IMPORTED_MODULE_26__.LoneSchemaDefinitionRule,
  _rules_UniqueOperationTypesRule_mjs__WEBPACK_IMPORTED_MODULE_27__.UniqueOperationTypesRule,
  _rules_UniqueTypeNamesRule_mjs__WEBPACK_IMPORTED_MODULE_28__.UniqueTypeNamesRule,
  _rules_UniqueEnumValueNamesRule_mjs__WEBPACK_IMPORTED_MODULE_29__.UniqueEnumValueNamesRule,
  _rules_UniqueFieldDefinitionNamesRule_mjs__WEBPACK_IMPORTED_MODULE_30__.UniqueFieldDefinitionNamesRule,
  _rules_UniqueArgumentDefinitionNamesRule_mjs__WEBPACK_IMPORTED_MODULE_31__.UniqueArgumentDefinitionNamesRule,
  _rules_UniqueDirectiveNamesRule_mjs__WEBPACK_IMPORTED_MODULE_32__.UniqueDirectiveNamesRule,
  _rules_KnownTypeNamesRule_mjs__WEBPACK_IMPORTED_MODULE_4__.KnownTypeNamesRule,
  _rules_KnownDirectivesRule_mjs__WEBPACK_IMPORTED_MODULE_17__.KnownDirectivesRule,
  _rules_UniqueDirectivesPerLocationRule_mjs__WEBPACK_IMPORTED_MODULE_18__.UniqueDirectivesPerLocationRule,
  _rules_PossibleTypeExtensionsRule_mjs__WEBPACK_IMPORTED_MODULE_33__.PossibleTypeExtensionsRule,
  _rules_KnownArgumentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_19__.KnownArgumentNamesOnDirectivesRule,
  _rules_UniqueArgumentNamesRule_mjs__WEBPACK_IMPORTED_MODULE_20__.UniqueArgumentNamesRule,
  _rules_UniqueInputFieldNamesRule_mjs__WEBPACK_IMPORTED_MODULE_25__.UniqueInputFieldNamesRule,
  _rules_ProvidedRequiredArgumentsRule_mjs__WEBPACK_IMPORTED_MODULE_22__.ProvidedRequiredArgumentsOnDirectivesRule,
]);


/***/ }),

/***/ "../../graphql/validation/validate.mjs":
/*!*********************************************!*\
  !*** ../../graphql/validation/validate.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate),
/* harmony export */   "validateSDL": () => (/* binding */ validateSDL),
/* harmony export */   "assertValidSDL": () => (/* binding */ assertValidSDL),
/* harmony export */   "assertValidSDLExtension": () => (/* binding */ assertValidSDLExtension)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "../../graphql/jsutils/devAssert.mjs");
/* harmony import */ var _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../error/GraphQLError.mjs */ "../../graphql/error/GraphQLError.mjs");
/* harmony import */ var _language_visitor_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../language/visitor.mjs */ "../../graphql/language/visitor.mjs");
/* harmony import */ var _type_validate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type/validate.mjs */ "../../graphql/type/validate.mjs");
/* harmony import */ var _utilities_TypeInfo_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/TypeInfo.mjs */ "../../graphql/utilities/TypeInfo.mjs");
/* harmony import */ var _specifiedRules_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./specifiedRules.mjs */ "../../graphql/validation/specifiedRules.mjs");
/* harmony import */ var _ValidationContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValidationContext.mjs */ "../../graphql/validation/ValidationContext.mjs");







/**
 * Implements the "Validation" section of the spec.
 *
 * Validation runs synchronously, returning an array of encountered errors, or
 * an empty array if no errors were encountered and the document is valid.
 *
 * A list of specific validation rules may be provided. If not provided, the
 * default list of rules defined by the GraphQL specification will be used.
 *
 * Each validation rules is a function which returns a visitor
 * (see the language/visitor API). Visitor methods are expected to return
 * GraphQLErrors, or Arrays of GraphQLErrors when invalid.
 *
 * Validate will stop validation after a `maxErrors` limit has been reached.
 * Attackers can send pathologically invalid queries to induce a DoS attack,
 * so by default `maxErrors` set to 100 errors.
 *
 * Optionally a custom TypeInfo instance may be provided. If not provided, one
 * will be created from the provided schema.
 */

function validate(
  schema,
  documentAST,
  rules = _specifiedRules_mjs__WEBPACK_IMPORTED_MODULE_0__.specifiedRules,
  options,
  /** @deprecated will be removed in 17.0.0 */
  typeInfo = new _utilities_TypeInfo_mjs__WEBPACK_IMPORTED_MODULE_1__.TypeInfo(schema),
) {
  var _options$maxErrors;

  const maxErrors =
    (_options$maxErrors =
      options === null || options === void 0 ? void 0 : options.maxErrors) !==
      null && _options$maxErrors !== void 0
      ? _options$maxErrors
      : 100;
  documentAST || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(false, 'Must provide document.'); // If the schema used for validation is invalid, throw an error.

  (0,_type_validate_mjs__WEBPACK_IMPORTED_MODULE_3__.assertValidSchema)(schema);
  const abortObj = Object.freeze({});
  const errors = [];
  const context = new _ValidationContext_mjs__WEBPACK_IMPORTED_MODULE_4__.ValidationContext(
    schema,
    documentAST,
    typeInfo,
    (error) => {
      if (errors.length >= maxErrors) {
        errors.push(
          new _error_GraphQLError_mjs__WEBPACK_IMPORTED_MODULE_5__.GraphQLError(
            'Too many validation errors, error limit reached. Validation aborted.',
          ),
        ); // eslint-disable-next-line @typescript-eslint/no-throw-literal

        throw abortObj;
      }

      errors.push(error);
    },
  ); // This uses a specialized visitor which runs multiple visitors in parallel,
  // while maintaining the visitor skip and break API.

  const visitor = (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_6__.visitInParallel)(rules.map((rule) => rule(context))); // Visit the whole document with each instance of all provided rules.

  try {
    (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_6__.visit)(documentAST, (0,_utilities_TypeInfo_mjs__WEBPACK_IMPORTED_MODULE_1__.visitWithTypeInfo)(typeInfo, visitor));
  } catch (e) {
    if (e !== abortObj) {
      throw e;
    }
  }

  return errors;
}
/**
 * @internal
 */

function validateSDL(
  documentAST,
  schemaToExtend,
  rules = _specifiedRules_mjs__WEBPACK_IMPORTED_MODULE_0__.specifiedSDLRules,
) {
  const errors = [];
  const context = new _ValidationContext_mjs__WEBPACK_IMPORTED_MODULE_4__.SDLValidationContext(
    documentAST,
    schemaToExtend,
    (error) => {
      errors.push(error);
    },
  );
  const visitors = rules.map((rule) => rule(context));
  (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_6__.visit)(documentAST, (0,_language_visitor_mjs__WEBPACK_IMPORTED_MODULE_6__.visitInParallel)(visitors));
  return errors;
}
/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */

function assertValidSDL(documentAST) {
  const errors = validateSDL(documentAST);

  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join('\n\n'));
  }
}
/**
 * Utility function which asserts a SDL document is valid by throwing an error
 * if it is invalid.
 *
 * @internal
 */

function assertValidSDLExtension(documentAST, schema) {
  const errors = validateSDL(documentAST, schema);

  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join('\n\n'));
  }
}


/***/ }),

/***/ "../../graphql/version.mjs":
/*!*********************************!*\
  !*** ../../graphql/version.mjs ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => (/* binding */ version),
/* harmony export */   "versionInfo": () => (/* binding */ versionInfo)
/* harmony export */ });
// Note: This file is autogenerated using "resources/gen-version.js" script and
// automatically updated by "npm version" command.

/**
 * A string containing the version of the GraphQL.js library
 */
const version = '16.3.0';
/**
 * An object containing the components of the GraphQL.js version string
 */

const versionInfo = Object.freeze({
  major: 16,
  minor: 3,
  patch: 0,
  preReleaseTag: null,
});


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/array-set.js":
/*!*************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/array-set.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../source-map-support/node_modules/source-map/lib/util.js");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/base64-vlq.js":
/*!**************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/base64-vlq.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ "../../source-map-support/node_modules/source-map/lib/base64.js");

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/base64.js":
/*!**********************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/base64.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/binary-search.js":
/*!*****************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/binary-search.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/mapping-list.js":
/*!****************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/mapping-list.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../source-map-support/node_modules/source-map/lib/util.js");

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/quick-sort.js":
/*!**************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/quick-sort.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/source-map-consumer.js":
/*!***********************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/source-map-consumer.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "../../source-map-support/node_modules/source-map/lib/util.js");
var binarySearch = __webpack_require__(/*! ./binary-search */ "../../source-map-support/node_modules/source-map/lib/binary-search.js");
var ArraySet = (__webpack_require__(/*! ./array-set */ "../../source-map-support/node_modules/source-map/lib/array-set.js").ArraySet);
var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../source-map-support/node_modules/source-map/lib/base64-vlq.js");
var quickSort = (__webpack_require__(/*! ./quick-sort */ "../../source-map-support/node_modules/source-map/lib/quick-sort.js").quickSort);

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/source-map-generator.js":
/*!************************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/source-map-generator.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "../../source-map-support/node_modules/source-map/lib/base64-vlq.js");
var util = __webpack_require__(/*! ./util */ "../../source-map-support/node_modules/source-map/lib/util.js");
var ArraySet = (__webpack_require__(/*! ./array-set */ "../../source-map-support/node_modules/source-map/lib/array-set.js").ArraySet);
var MappingList = (__webpack_require__(/*! ./mapping-list */ "../../source-map-support/node_modules/source-map/lib/mapping-list.js").MappingList);

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/source-node.js":
/*!***************************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/source-node.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = (__webpack_require__(/*! ./source-map-generator */ "../../source-map-support/node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator);
var util = __webpack_require__(/*! ./util */ "../../source-map-support/node_modules/source-map/lib/util.js");

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/lib/util.js":
/*!********************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/lib/util.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),

/***/ "../../source-map-support/node_modules/source-map/source-map.js":
/*!**********************************************************************!*\
  !*** ../../source-map-support/node_modules/source-map/source-map.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(/*! ./lib/source-map-generator */ "../../source-map-support/node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(/*! ./lib/source-map-consumer */ "../../source-map-support/node_modules/source-map/lib/source-map-consumer.js").SourceMapConsumer;
exports.SourceNode = __webpack_require__(/*! ./lib/source-node */ "../../source-map-support/node_modules/source-map/lib/source-node.js").SourceNode;


/***/ }),

/***/ "../../source-map-support/register.js":
/*!********************************************!*\
  !*** ../../source-map-support/register.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(__webpack_require__(/*! ./ */ "../../source-map-support/source-map-support.js").install)();


/***/ }),

/***/ "../../source-map-support/source-map-support.js":
/*!******************************************************!*\
  !*** ../../source-map-support/source-map-support.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var SourceMapConsumer = (__webpack_require__(/*! source-map */ "../../source-map-support/node_modules/source-map/source-map.js").SourceMapConsumer);
var path = __webpack_require__(/*! path */ "path");

var fs;
try {
  fs = __webpack_require__(/*! fs */ "fs");
  if (!fs.existsSync || !fs.readFileSync) {
    // fs doesn't have all methods we need
    fs = null;
  }
} catch (err) {
  /* nop */
}

var bufferFrom = __webpack_require__(/*! buffer-from */ "../../buffer-from/index.js");

/**
 * Requires a module which is protected against bundler minification.
 *
 * @param {NodeModule} mod
 * @param {string} request
 */
function dynamicRequire(mod, request) {
  return mod.require(request);
}

// Only install once if called multiple times
var errorFormatterInstalled = false;
var uncaughtShimInstalled = false;

// If true, the caches are reset before a stack trace formatting operation
var emptyCacheBetweenOperations = false;

// Supports {browser, node, auto}
var environment = "auto";

// Maps a file path to a string containing the file contents
var fileContentsCache = {};

// Maps a file path to a source map for that file
var sourceMapCache = {};

// Regex for detecting source maps
var reSourceMap = /^data:application\/json[^,]+base64,/;

// Priority list of retrieve handlers
var retrieveFileHandlers = [];
var retrieveMapHandlers = [];

function isInBrowser() {
  if (environment === "browser")
    return true;
  if (environment === "node")
    return false;
  return ((typeof window !== 'undefined') && (typeof XMLHttpRequest === 'function') && !(window.require && window.module && window.process && window.process.type === "renderer"));
}

function hasGlobalProcessEventEmitter() {
  return ((typeof process === 'object') && (process !== null) && (typeof process.on === 'function'));
}

function globalProcessVersion() {
  if ((typeof process === 'object') && (process !== null)) {
    return process.version;
  } else {
    return '';
  }
}

function globalProcessStderr() {
  if ((typeof process === 'object') && (process !== null)) {
    return process.stderr;
  }
}

function globalProcessExit(code) {
  if ((typeof process === 'object') && (process !== null) && (typeof process.exit === 'function')) {
    return process.exit(code);
  }
}

function handlerExec(list) {
  return function(arg) {
    for (var i = 0; i < list.length; i++) {
      var ret = list[i](arg);
      if (ret) {
        return ret;
      }
    }
    return null;
  };
}

var retrieveFile = handlerExec(retrieveFileHandlers);

retrieveFileHandlers.push(function(path) {
  // Trim the path to make sure there is no extra whitespace.
  path = path.trim();
  if (/^file:/.test(path)) {
    // existsSync/readFileSync can't handle file protocol, but once stripped, it works
    path = path.replace(/file:\/\/\/(\w:)?/, function(protocol, drive) {
      return drive ?
        '' : // file:///C:/dir/file -> C:/dir/file
        '/'; // file:///root-dir/file -> /root-dir/file
    });
  }
  if (path in fileContentsCache) {
    return fileContentsCache[path];
  }

  var contents = '';
  try {
    if (!fs) {
      // Use SJAX if we are in the browser
      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, /** async */ false);
      xhr.send(null);
      if (xhr.readyState === 4 && xhr.status === 200) {
        contents = xhr.responseText;
      }
    } else if (fs.existsSync(path)) {
      // Otherwise, use the filesystem
      contents = fs.readFileSync(path, 'utf8');
    }
  } catch (er) {
    /* ignore any errors */
  }

  return fileContentsCache[path] = contents;
});

// Support URLs relative to a directory, but be careful about a protocol prefix
// in case we are in the browser (i.e. directories may start with "http://" or "file:///")
function supportRelativeURL(file, url) {
  if (!file) return url;
  var dir = path.dirname(file);
  var match = /^\w+:\/\/[^\/]*/.exec(dir);
  var protocol = match ? match[0] : '';
  var startPath = dir.slice(protocol.length);
  if (protocol && /^\/\w\:/.test(startPath)) {
    // handle file:///C:/ paths
    protocol += '/';
    return protocol + path.resolve(dir.slice(protocol.length), url).replace(/\\/g, '/');
  }
  return protocol + path.resolve(dir.slice(protocol.length), url);
}

function retrieveSourceMapURL(source) {
  var fileData;

  if (isInBrowser()) {
     try {
       var xhr = new XMLHttpRequest();
       xhr.open('GET', source, false);
       xhr.send(null);
       fileData = xhr.readyState === 4 ? xhr.responseText : null;

       // Support providing a sourceMappingURL via the SourceMap header
       var sourceMapHeader = xhr.getResponseHeader("SourceMap") ||
                             xhr.getResponseHeader("X-SourceMap");
       if (sourceMapHeader) {
         return sourceMapHeader;
       }
     } catch (e) {
     }
  }

  // Get the URL of the source map
  fileData = retrieveFile(source);
  var re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/mg;
  // Keep executing the search to find the *last* sourceMappingURL to avoid
  // picking up sourceMappingURLs from comments, strings, etc.
  var lastMatch, match;
  while (match = re.exec(fileData)) lastMatch = match;
  if (!lastMatch) return null;
  return lastMatch[1];
};

// Can be overridden by the retrieveSourceMap option to install. Takes a
// generated source filename; returns a {map, optional url} object, or null if
// there is no source map.  The map field may be either a string or the parsed
// JSON object (ie, it must be a valid argument to the SourceMapConsumer
// constructor).
var retrieveSourceMap = handlerExec(retrieveMapHandlers);
retrieveMapHandlers.push(function(source) {
  var sourceMappingURL = retrieveSourceMapURL(source);
  if (!sourceMappingURL) return null;

  // Read the contents of the source map
  var sourceMapData;
  if (reSourceMap.test(sourceMappingURL)) {
    // Support source map URL as a data url
    var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
    sourceMapData = bufferFrom(rawData, "base64").toString();
    sourceMappingURL = source;
  } else {
    // Support source map URLs relative to the source URL
    sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
    sourceMapData = retrieveFile(sourceMappingURL);
  }

  if (!sourceMapData) {
    return null;
  }

  return {
    url: sourceMappingURL,
    map: sourceMapData
  };
});

function mapSourcePosition(position) {
  var sourceMap = sourceMapCache[position.source];
  if (!sourceMap) {
    // Call the (overrideable) retrieveSourceMap function to get the source map.
    var urlAndMap = retrieveSourceMap(position.source);
    if (urlAndMap) {
      sourceMap = sourceMapCache[position.source] = {
        url: urlAndMap.url,
        map: new SourceMapConsumer(urlAndMap.map)
      };

      // Load all sources stored inline with the source map into the file cache
      // to pretend like they are already loaded. They may not exist on disk.
      if (sourceMap.map.sourcesContent) {
        sourceMap.map.sources.forEach(function(source, i) {
          var contents = sourceMap.map.sourcesContent[i];
          if (contents) {
            var url = supportRelativeURL(sourceMap.url, source);
            fileContentsCache[url] = contents;
          }
        });
      }
    } else {
      sourceMap = sourceMapCache[position.source] = {
        url: null,
        map: null
      };
    }
  }

  // Resolve the source URL relative to the URL of the source map
  if (sourceMap && sourceMap.map && typeof sourceMap.map.originalPositionFor === 'function') {
    var originalPosition = sourceMap.map.originalPositionFor(position);

    // Only return the original position if a matching line was found. If no
    // matching line is found then we return position instead, which will cause
    // the stack trace to print the path and line for the compiled file. It is
    // better to give a precise location in the compiled file than a vague
    // location in the original file.
    if (originalPosition.source !== null) {
      originalPosition.source = supportRelativeURL(
        sourceMap.url, originalPosition.source);
      return originalPosition;
    }
  }

  return position;
}

// Parses code generated by FormatEvalOrigin(), a function inside V8:
// https://code.google.com/p/v8/source/browse/trunk/src/messages.js
function mapEvalOrigin(origin) {
  // Most eval() calls are in this format
  var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
  if (match) {
    var position = mapSourcePosition({
      source: match[2],
      line: +match[3],
      column: match[4] - 1
    });
    return 'eval at ' + match[1] + ' (' + position.source + ':' +
      position.line + ':' + (position.column + 1) + ')';
  }

  // Parse nested eval() calls using recursion
  match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
  if (match) {
    return 'eval at ' + match[1] + ' (' + mapEvalOrigin(match[2]) + ')';
  }

  // Make sure we still return useful information if we didn't find anything
  return origin;
}

// This is copied almost verbatim from the V8 source code at
// https://code.google.com/p/v8/source/browse/trunk/src/messages.js. The
// implementation of wrapCallSite() used to just forward to the actual source
// code of CallSite.prototype.toString but unfortunately a new release of V8
// did something to the prototype chain and broke the shim. The only fix I
// could find was copy/paste.
function CallSiteToString() {
  var fileName;
  var fileLocation = "";
  if (this.isNative()) {
    fileLocation = "native";
  } else {
    fileName = this.getScriptNameOrSourceURL();
    if (!fileName && this.isEval()) {
      fileLocation = this.getEvalOrigin();
      fileLocation += ", ";  // Expecting source position to follow.
    }

    if (fileName) {
      fileLocation += fileName;
    } else {
      // Source code does not originate from a file and is not native, but we
      // can still get the source position inside the source string, e.g. in
      // an eval string.
      fileLocation += "<anonymous>";
    }
    var lineNumber = this.getLineNumber();
    if (lineNumber != null) {
      fileLocation += ":" + lineNumber;
      var columnNumber = this.getColumnNumber();
      if (columnNumber) {
        fileLocation += ":" + columnNumber;
      }
    }
  }

  var line = "";
  var functionName = this.getFunctionName();
  var addSuffix = true;
  var isConstructor = this.isConstructor();
  var isMethodCall = !(this.isToplevel() || isConstructor);
  if (isMethodCall) {
    var typeName = this.getTypeName();
    // Fixes shim to be backward compatable with Node v0 to v4
    if (typeName === "[object Object]") {
      typeName = "null";
    }
    var methodName = this.getMethodName();
    if (functionName) {
      if (typeName && functionName.indexOf(typeName) != 0) {
        line += typeName + ".";
      }
      line += functionName;
      if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) {
        line += " [as " + methodName + "]";
      }
    } else {
      line += typeName + "." + (methodName || "<anonymous>");
    }
  } else if (isConstructor) {
    line += "new " + (functionName || "<anonymous>");
  } else if (functionName) {
    line += functionName;
  } else {
    line += fileLocation;
    addSuffix = false;
  }
  if (addSuffix) {
    line += " (" + fileLocation + ")";
  }
  return line;
}

function cloneCallSite(frame) {
  var object = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function(name) {
    object[name] = /^(?:is|get)/.test(name) ? function() { return frame[name].call(frame); } : frame[name];
  });
  object.toString = CallSiteToString;
  return object;
}

function wrapCallSite(frame, state) {
  // provides interface backward compatibility
  if (state === undefined) {
    state = { nextPosition: null, curPosition: null }
  }
  if(frame.isNative()) {
    state.curPosition = null;
    return frame;
  }

  // Most call sites will return the source file from getFileName(), but code
  // passed to eval() ending in "//# sourceURL=..." will return the source file
  // from getScriptNameOrSourceURL() instead
  var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
  if (source) {
    var line = frame.getLineNumber();
    var column = frame.getColumnNumber() - 1;

    // Fix position in Node where some (internal) code is prepended.
    // See https://github.com/evanw/node-source-map-support/issues/36
    // Header removed in node at ^10.16 || >=11.11.0
    // v11 is not an LTS candidate, we can just test the one version with it.
    // Test node versions for: 10.16-19, 10.20+, 12-19, 20-99, 100+, or 11.11
    var noHeader = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/;
    var headerLength = noHeader.test(globalProcessVersion()) ? 0 : 62;
    if (line === 1 && column > headerLength && !isInBrowser() && !frame.isEval()) {
      column -= headerLength;
    }

    var position = mapSourcePosition({
      source: source,
      line: line,
      column: column
    });
    state.curPosition = position;
    frame = cloneCallSite(frame);
    var originalFunctionName = frame.getFunctionName;
    frame.getFunctionName = function() {
      if (state.nextPosition == null) {
        return originalFunctionName();
      }
      return state.nextPosition.name || originalFunctionName();
    };
    frame.getFileName = function() { return position.source; };
    frame.getLineNumber = function() { return position.line; };
    frame.getColumnNumber = function() { return position.column + 1; };
    frame.getScriptNameOrSourceURL = function() { return position.source; };
    return frame;
  }

  // Code called using eval() needs special handling
  var origin = frame.isEval() && frame.getEvalOrigin();
  if (origin) {
    origin = mapEvalOrigin(origin);
    frame = cloneCallSite(frame);
    frame.getEvalOrigin = function() { return origin; };
    return frame;
  }

  // If we get here then we were unable to change the source position
  return frame;
}

// This function is part of the V8 stack trace API, for more info see:
// https://v8.dev/docs/stack-trace-api
function prepareStackTrace(error, stack) {
  if (emptyCacheBetweenOperations) {
    fileContentsCache = {};
    sourceMapCache = {};
  }

  var name = error.name || 'Error';
  var message = error.message || '';
  var errorString = name + ": " + message;

  var state = { nextPosition: null, curPosition: null };
  var processedStack = [];
  for (var i = stack.length - 1; i >= 0; i--) {
    processedStack.push('\n    at ' + wrapCallSite(stack[i], state));
    state.nextPosition = state.curPosition;
  }
  state.curPosition = state.nextPosition = null;
  return errorString + processedStack.reverse().join('');
}

// Generate position and snippet of original source with pointer
function getErrorSource(error) {
  var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
  if (match) {
    var source = match[1];
    var line = +match[2];
    var column = +match[3];

    // Support the inline sourceContents inside the source map
    var contents = fileContentsCache[source];

    // Support files on disk
    if (!contents && fs && fs.existsSync(source)) {
      try {
        contents = fs.readFileSync(source, 'utf8');
      } catch (er) {
        contents = '';
      }
    }

    // Format the line from the original source code like node does
    if (contents) {
      var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
      if (code) {
        return source + ':' + line + '\n' + code + '\n' +
          new Array(column).join(' ') + '^';
      }
    }
  }
  return null;
}

function printErrorAndExit (error) {
  var source = getErrorSource(error);

  // Ensure error is printed synchronously and not truncated
  var stderr = globalProcessStderr();
  if (stderr && stderr._handle && stderr._handle.setBlocking) {
    stderr._handle.setBlocking(true);
  }

  if (source) {
    console.error();
    console.error(source);
  }

  console.error(error.stack);
  globalProcessExit(1);
}

function shimEmitUncaughtException () {
  var origEmit = process.emit;

  process.emit = function (type) {
    if (type === 'uncaughtException') {
      var hasStack = (arguments[1] && arguments[1].stack);
      var hasListeners = (this.listeners(type).length > 0);

      if (hasStack && !hasListeners) {
        return printErrorAndExit(arguments[1]);
      }
    }

    return origEmit.apply(this, arguments);
  };
}

var originalRetrieveFileHandlers = retrieveFileHandlers.slice(0);
var originalRetrieveMapHandlers = retrieveMapHandlers.slice(0);

exports.wrapCallSite = wrapCallSite;
exports.getErrorSource = getErrorSource;
exports.mapSourcePosition = mapSourcePosition;
exports.retrieveSourceMap = retrieveSourceMap;

exports.install = function(options) {
  options = options || {};

  if (options.environment) {
    environment = options.environment;
    if (["node", "browser", "auto"].indexOf(environment) === -1) {
      throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}")
    }
  }

  // Allow sources to be found by methods other than reading the files
  // directly from disk.
  if (options.retrieveFile) {
    if (options.overrideRetrieveFile) {
      retrieveFileHandlers.length = 0;
    }

    retrieveFileHandlers.unshift(options.retrieveFile);
  }

  // Allow source maps to be found by methods other than reading the files
  // directly from disk.
  if (options.retrieveSourceMap) {
    if (options.overrideRetrieveSourceMap) {
      retrieveMapHandlers.length = 0;
    }

    retrieveMapHandlers.unshift(options.retrieveSourceMap);
  }

  // Support runtime transpilers that include inline source maps
  if (options.hookRequire && !isInBrowser()) {
    // Use dynamicRequire to avoid including in browser bundles
    var Module = dynamicRequire(module, 'module');
    var $compile = Module.prototype._compile;

    if (!$compile.__sourceMapSupport) {
      Module.prototype._compile = function(content, filename) {
        fileContentsCache[filename] = content;
        sourceMapCache[filename] = undefined;
        return $compile.call(this, content, filename);
      };

      Module.prototype._compile.__sourceMapSupport = true;
    }
  }

  // Configure options
  if (!emptyCacheBetweenOperations) {
    emptyCacheBetweenOperations = 'emptyCacheBetweenOperations' in options ?
      options.emptyCacheBetweenOperations : false;
  }

  // Install the error reformatter
  if (!errorFormatterInstalled) {
    errorFormatterInstalled = true;
    Error.prepareStackTrace = prepareStackTrace;
  }

  if (!uncaughtShimInstalled) {
    var installHandler = 'handleUncaughtExceptions' in options ?
      options.handleUncaughtExceptions : true;

    // Do not override 'uncaughtException' with our own handler in Node.js
    // Worker threads. Workers pass the error to the main thread as an event,
    // rather than printing something to stderr and exiting.
    try {
      // We need to use `dynamicRequire` because `require` on it's own will be optimized by WebPack/Browserify.
      var worker_threads = dynamicRequire(module, 'worker_threads');
      if (worker_threads.isMainThread === false) {
        installHandler = false;
      }
    } catch(e) {}

    // Provide the option to not install the uncaught exception handler. This is
    // to support other uncaught exception handlers (in test frameworks, for
    // example). If this handler is not installed and there are no other uncaught
    // exception handlers, uncaught exceptions will be caught by node's built-in
    // exception handler and the process will still be terminated. However, the
    // generated JavaScript code will be shown above the stack trace instead of
    // the original source code.
    if (installHandler && hasGlobalProcessEventEmitter()) {
      uncaughtShimInstalled = true;
      shimEmitUncaughtException();
    }
  }
};

exports.resetRetrieveHandlers = function() {
  retrieveFileHandlers.length = 0;
  retrieveMapHandlers.length = 0;

  retrieveFileHandlers = originalRetrieveFileHandlers.slice(0);
  retrieveMapHandlers = originalRetrieveMapHandlers.slice(0);

  retrieveSourceMap = handlerExec(retrieveMapHandlers);
  retrieveFile = handlerExec(retrieveFileHandlers);
}


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************************!*\
  !*** ../../../graphql/getUserGraphql.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "../../source-map-support/register.js");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


var {
  graphql,
  buildSchema
} = __webpack_require__(/*! graphql */ "../../graphql/index.mjs");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var rootValue = {
  hello: () => {
    return "Hello world!";
  }
};

exports.handler = async (event, context, callback) => {
  return graphql({
    schema,
    source: "{ hello }",
    rootValue
  }).then(response => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        graphql: response,
        event: event,
        context: context
      })
    });
  });
};
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=getUserGraphql.js.map
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = [
    ,
    /* 0 */ /* 1 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => /* binding */ checkNode,
        /* harmony export */
      });
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(2);
      /* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(5);
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it =
          (typeof Symbol !== "undefined" && o[Symbol.iterator]) ||
          o["@@iterator"];
        if (!it) {
          if (
            Array.isArray(o) ||
            (it = _unsupportedIterableToArray(o)) ||
            (allowArrayLike && o && typeof o.length === "number")
          ) {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
              s: F,
              n: function n() {
                if (i >= o.length) return { done: true };
                return { done: false, value: o[i++] };
              },
              e: function e(_e) {
                throw _e;
              },
              f: F,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var normalCompletion = true,
          didErr = false,
          err;
        return {
          s: function s() {
            it = it.call(o);
          },
          n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function e(_e2) {
            didErr = true;
            err = _e2;
          },
          f: function f() {
            try {
              if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
              if (didErr) throw err;
            }
          },
        };
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (
          n === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }

      function checkNode(node, done) {
        var config =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : {};
        var additionalRules =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : [];

        if (!node) {
          return;
        }

        var errors = [];

        var childNodeCheck = function childNodeCheck(child) {
          var composedRules =
            _rules__WEBPACK_IMPORTED_MODULE_1__["default"].concat(
              additionalRules
            );

          var _iterator = _createForOfIteratorHelper(composedRules),
            _step;

          try {
            var _loop = function _loop() {
              var rule = _step.value;

              if (child.hasAttribute("data-ignore-a11y-check")) {
                return "continue";
              }

              var promise = Promise.resolve(rule.test(child, config)).then(
                function (result) {
                  if (!result) {
                    errors.push({
                      node: child,
                      rule: rule,
                    });
                  }
                }
              );
            };

            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _ret = _loop();

              if (_ret === "continue") continue;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        };

        var checkDone = function checkDone() {
          if (typeof done === "function") {
            done(errors);
          }
        };

        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.walk(
          node,
          childNodeCheck,
          checkDone
        );
      }

      /***/
    },
    /* 2 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ walk: () => /* binding */ walk,
        /* harmony export */ select: () => /* binding */ select,
        /* harmony export */ prepend: () => /* binding */ prepend,
        /* harmony export */ changeTag: () => /* binding */ changeTag,
        /* harmony export */ pathForNode: () => /* binding */ pathForNode,
        /* harmony export */ nodeByPath: () => /* binding */ nodeByPath,
        /* harmony export */ onlyContainsLink: () =>
          /* binding */ onlyContainsLink,
        /* harmony export */ splitStyleAttribute: () =>
          /* binding */ splitStyleAttribute,
        /* harmony export */ createStyleString: () =>
          /* binding */ createStyleString,
        /* harmony export */ hasTextNode: () => /* binding */ hasTextNode,
        /* harmony export */
      });
      /* harmony import */ var _indicate__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(3);

      var ELEMENT_NODE = 1;
      var WALK_BATCH_SIZE = 25;
      var _indexOf = Array.prototype.indexOf;
      function walk(node, fn, done) {
        var stack = [
          {
            node: node,
            index: 0,
          },
        ];

        var processBatch = function processBatch() {
          var batchRemaining = WALK_BATCH_SIZE;

          while (stack.length > 0 && batchRemaining > 0) {
            var depth = stack.length - 1;
            var _node = stack[depth].node.childNodes[stack[depth].index];

            if (_node) {
              stack[depth].index += 1;

              if (_node.nodeType === ELEMENT_NODE) {
                fn(_node);
                stack.push({
                  node: _node,
                  index: 0,
                });
                batchRemaining -= 0;
              }
            } else {
              stack.pop();
            }
          }

          setTimeout(stack.length > 0 ? processBatch : done, 0);
        };

        processBatch();
      }
      function select(editor, elem) {
        var indicateFn =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : _indicate__WEBPACK_IMPORTED_MODULE_0__["default"];

        if (elem == null) {
          return;
        }

        elem.scrollIntoView();
        indicateFn(editor, elem);
      }
      function prepend(parent, child) {
        if (parent.childNodes.length > 0) {
          parent.insertBefore(child, parent.childNodes[0]);
        } else {
          parent.appendChild(child);
        }
      }
      function changeTag(elem, tagName) {
        var newElem = elem.ownerDocument.createElement(tagName);

        while (elem.firstChild) {
          newElem.appendChild(elem.firstChild);
        }

        for (var i = elem.attributes.length - 1; i >= 0; --i) {
          newElem.attributes.setNamedItem(elem.attributes[i].cloneNode());
        }

        elem.parentNode.replaceChild(newElem, elem);
        return newElem;
      }
      function pathForNode(ancestor, decendant) {
        var path = [];
        var node = decendant;

        while (true) {
          if (node == ancestor) {
            return path;
          }

          var parent = node.parentNode;

          if (parent == null) {
            return null;
          }

          path.push(_indexOf.call(parent.childNodes, node));
          node = parent;
        }
      }
      function nodeByPath(ancestor, path) {
        var node = ancestor;
        var index;

        while ((index = path.pop()) !== void 0) {
          node = node.childNodes[index];

          if (node == null) {
            return null;
          }
        }

        return node;
      }
      function onlyContainsLink(elem) {
        var links = elem.getElementsByTagName("a");

        if (links.length) {
          return links[0].textContent === elem.textContent;
        } else {
          return false;
        }
      }
      function splitStyleAttribute(styleString) {
        var split = styleString.split(";");
        return split.reduce(function (styleObj, attributeValue) {
          var pair = attributeValue.split(":");

          if (pair.length === 2) {
            styleObj[pair[0].trim()] = pair[1].trim();
          }

          return styleObj;
        }, {});
      }
      function createStyleString(styleObj) {
        var styleString = Object.keys(styleObj)
          .map(function (key) {
            return "".concat(key, ":").concat(styleObj[key]);
          })
          .join(";");

        if (styleString) {
          styleString = "".concat(styleString, ";");
        }

        return styleString;
      }
      function hasTextNode(elem) {
        var nodes = Array.from(elem.childNodes);
        return nodes.some(function (x) {
          return x.nodeType === Node.TEXT_NODE;
        });
      }

      /***/
    },
    /* 3 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ indicatorRegion: () =>
          /* binding */ indicatorRegion,
        /* harmony export */ clearIndicators: () =>
          /* binding */ clearIndicators,
        /* harmony export */ default: () => /* binding */ indicate,
        /* harmony export */
      });
      /* harmony import */ var bloody_offset__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(4);
      /* harmony import */ var bloody_offset__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          bloody_offset__WEBPACK_IMPORTED_MODULE_0__
        );

      var MARGIN = 3;
      function indicatorRegion(editorFrame, target) {
        var offsetFn =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : bloody_offset__WEBPACK_IMPORTED_MODULE_0___default();
        var boundingRectOverride =
          arguments.length > 3 ? arguments[3] : undefined;
        var outerShape = offsetFn(editorFrame);
        var b = boundingRectOverride || target.getBoundingClientRect();
        var innerShape = {
          top: b.top,
          left: b.left,
          width: b.right - b.left,
          height: b.bottom - b.top,
        };
        return {
          width: innerShape.width,
          height: innerShape.height,
          left: outerShape.left + innerShape.left,
          top: outerShape.top + innerShape.top,
        };
      }
      function clearIndicators() {
        Array.from(
          document.querySelectorAll(".a11y-checker-selection-indicator")
        ).forEach(function (existingElem) {
          existingElem.parentNode.removeChild(existingElem);
        });
      }
      function indicate(editor, elem) {
        var margin =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : MARGIN;
        clearIndicators();
        var editorFrame = editor.getContainer().querySelector("iframe");
        var el = document.createElement("div");
        el.className = "a11y-checker-selection-indicator";
        var region = indicatorRegion(editorFrame, elem); // The z-index below is set to be one below the Instructure UI tray
        // that the a11y checker uses.  It may need to be updated in the future.

        el.setAttribute(
          "style",
          "\n    border: 2px solid #000;\n    background-color: #008EE2;\n    position: absolute;\n    display: block;\n    borderRadius: 5px;\n    z-index: 9998;\n    left: "
            .concat(region.left - margin, "px;\n    top: ")
            .concat(region.top - margin, "px;\n    width: ")
            .concat(region.width + 2 * margin, "px;\n    height: ")
            .concat(region.height + 2 * margin, "px;\n    opacity: 0.5;\n  ")
        );
        document.body.appendChild(el);
        el.style.opacity = 0.8;
        el.style.transition = "opacity 0.4s";

        var adjust = function adjust() {
          var boundingRect = elem.getBoundingClientRect();
          var region = indicatorRegion(
            editorFrame,
            elem,
            bloody_offset__WEBPACK_IMPORTED_MODULE_0___default(),
            boundingRect
          );
          var editorFrameOffset =
            bloody_offset__WEBPACK_IMPORTED_MODULE_0___default()(editorFrame);
          el.style.left = "".concat(region.left - margin, "px");
          el.style.top = "".concat(region.top - margin, "px");
          el.style.display = "block";

          if (boundingRect.top < 0) {
            var newHeight = region.height + boundingRect.top;

            if (newHeight < 0) {
              el.style.display = "none";
            }

            var newTop = region.height - newHeight;
            el.style.height = "".concat(newHeight, "px");
            el.style.marginTop = "".concat(newTop, "px");
          }

          if (boundingRect.bottom > editorFrameOffset.height) {
            var _newHeight =
              region.height + (editorFrameOffset.height - boundingRect.bottom);

            if (_newHeight < 0) {
              el.style.display = "none";
            }

            el.style.height = "".concat(_newHeight, "px");
          }

          window.requestAnimationFrame(adjust);
        };

        window.requestAnimationFrame(adjust);
      }

      /***/
    },
    /* 4 */
    /***/ (module) => {
      function getScrolled() {
        var top = window.pageYOffset;

        if (typeof top == "number") {
          return {
            top: top,
            left: window.pageXOffset,
          };
        }

        return {
          top: document.documentElement.scrollTop,
          left: document.documentElement.scrollLeft,
        };
      }

      function toInt(number) {
        return parseInt(number, 10);
      }

      module.exports = function (element) {
        var clientRect = element.getBoundingClientRect();
        var scrolled = getScrolled();
        return {
          top: toInt(clientRect.top + scrolled.top),
          left: toInt(clientRect.left + scrolled.left),
          width: toInt(clientRect.right - clientRect.left),
          height: toInt(clientRect.bottom - clientRect.top),
        };
      };

      /***/
    },
    /* 5 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _img_alt__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(6);
      /* harmony import */ var _img_alt_filename__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(20);
      /* harmony import */ var _table_caption__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(21);
      /* harmony import */ var _table_header__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(22);
      /* harmony import */ var _table_header_scope__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(23);
      /* harmony import */ var _small_text_contrast__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(24);
      /* harmony import */ var _large_text_contrast__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(27);
      /* harmony import */ var _adjacent_links__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(28);
      /* harmony import */ var _headings_sequence__WEBPACK_IMPORTED_MODULE_8__ =
        __webpack_require__(29);
      /* harmony import */ var _img_alt_length__WEBPACK_IMPORTED_MODULE_9__ =
        __webpack_require__(30);
      /* harmony import */ var _paragraphs_for_headings__WEBPACK_IMPORTED_MODULE_10__ =
        __webpack_require__(31);
      /* harmony import */ var _list_structure__WEBPACK_IMPORTED_MODULE_11__ =
        __webpack_require__(32);

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = [
        _img_alt__WEBPACK_IMPORTED_MODULE_0__["default"],
        _img_alt_filename__WEBPACK_IMPORTED_MODULE_1__["default"],
        _table_caption__WEBPACK_IMPORTED_MODULE_2__["default"],
        _table_header__WEBPACK_IMPORTED_MODULE_3__["default"],
        _table_header_scope__WEBPACK_IMPORTED_MODULE_4__["default"],
        _small_text_contrast__WEBPACK_IMPORTED_MODULE_5__["default"],
        _large_text_contrast__WEBPACK_IMPORTED_MODULE_6__["default"],
        _adjacent_links__WEBPACK_IMPORTED_MODULE_7__["default"],
        _headings_sequence__WEBPACK_IMPORTED_MODULE_8__["default"],
        _img_alt_length__WEBPACK_IMPORTED_MODULE_9__["default"],
        _paragraphs_for_headings__WEBPACK_IMPORTED_MODULE_10__["default"],
        _list_structure__WEBPACK_IMPORTED_MODULE_11__["default"],
      ];

      /***/
    },
    /* 6 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "img-alt",
        test: function test(elem) {
          if (elem.tagName !== "IMG") {
            return true;
          }

          var alt = elem.hasAttribute("alt") ? elem.getAttribute("alt") : null;
          return alt !== null;
        },
        data: function data(elem) {
          var alt = elem.hasAttribute("alt") ? elem.getAttribute("alt") : null;
          var decorative = alt !== null && alt.replace(/\s/g, "") === "";
          return {
            alt: alt || "",
            decorative: decorative,
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Add alt text for the image"
              ),
              dataKey: "alt",
              disabledIf: function disabledIf(data) {
                return data.decorative;
              },
            },
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Decorative image"
              ),
              dataKey: "decorative",
              checkbox: true,
            },
          ];
        },
        update: function update(elem, data) {
          if (data.decorative) {
            elem.setAttribute("alt", "");
            elem.setAttribute("role", "presentation");
          } else {
            elem.setAttribute("alt", data.alt);
            elem.removeAttribute("role");
          }

          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Images should include an alt attribute describing the image content."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/H37.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about using alt text for images"
          );
        },
      };

      /***/
    },
    /* 7 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(8);
      /* harmony import */ var format_message__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          format_message__WEBPACK_IMPORTED_MODULE_0__
        );
      /* harmony import */ var _translations_json__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(14);
      /* harmony import */ var format_message_generate_id_underscored_crc32__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(15);
      /* harmony import */ var format_message_generate_id_underscored_crc32__WEBPACK_IMPORTED_MODULE_2___default =
        /*#__PURE__*/ __webpack_require__.n(
          format_message_generate_id_underscored_crc32__WEBPACK_IMPORTED_MODULE_2__
        );

      var ns =
        format_message__WEBPACK_IMPORTED_MODULE_0___default().namespace();
      ns.setup({
        translations: _translations_json__WEBPACK_IMPORTED_MODULE_1__,
        generateId:
          format_message_generate_id_underscored_crc32__WEBPACK_IMPORTED_MODULE_2___default(),
      });
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ns;

      /***/
    },
    /* 8 */
    /***/ (module, exports, __webpack_require__) => {
      "use strict";
      // @flow

      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (
          typeof Symbol === "function" &&
          typeof Symbol.iterator === "symbol"
        ) {
          _typeof = function _typeof(obj) {
            return typeof obj;
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };
        }
        return _typeof(obj);
      }

      var parse = __webpack_require__(9);

      var interpret = __webpack_require__(10);

      var plurals = __webpack_require__(13);

      var lookupClosestLocale = __webpack_require__(12);

      var origFormats = __webpack_require__(11);
      /*::
import type { Types } from 'format-message-interpret'
type Locale = string
type Locales = Locale | Locale[]
type Message = string | {|
  id?: string,
  default: string,
  description?: string
|}
type Translations = { [string]: ?{ [string]: string | Translation } }
type Translation = {
  message: string,
  format?: (args?: Object) => string,
  toParts?: (args?: Object) => any[],
}
type Replacement = ?string | (string, string, locales?: Locales) => ?string
type GenerateId = (string) => string
type MissingTranslation = 'ignore' | 'warning' | 'error'
type FormatObject = { [string]: * }
type Options = {
  locale?: Locales,
  translations?: ?Translations,
  generateId?: GenerateId,
  missingReplacement?: Replacement,
  missingTranslation?: MissingTranslation,
  formats?: {
    number?: FormatObject,
    date?: FormatObject,
    time?: FormatObject
  },
  types?: Types
}
type Setup = {|
  locale: Locales,
  translations: Translations,
  generateId: GenerateId,
  missingReplacement: Replacement,
  missingTranslation: MissingTranslation,
  formats: {
    number: FormatObject,
    date: FormatObject,
    time: FormatObject
  },
  types: Types
|}
type FormatMessage = {
  (msg: Message, args?: Object, locales?: Locales): string,
  rich (msg: Message, args?: Object, locales?: Locales): any[],
  setup (opt?: Options): Setup,
  number (value: number, style?: string, locales?: Locales): string,
  date (value: number | Date, style?: string, locales?: Locales): string,
  time (value: number | Date, style?: string, locales?: Locales): string,
  select (value: any, options: Object): any,
  custom (placeholder: any[], locales: Locales, value: any, args: Object): any,
  plural (value: number, offset: any, options: any, locale: any): any,
  selectordinal (value: number, offset: any, options: any, locale: any): any,
  namespace (): FormatMessage
}
*/

      function assign(
        /*:: <T: Object> */
        target,
        /*: T */
        source
        /*: Object */
      ) {
        Object.keys(source).forEach(function (key) {
          target[key] = source[key];
        });
        return target;
      }

      function namespace() {
        /*: FormatMessage */
        var formats = assign({}, origFormats);
        var currentLocales =
          /*: Locales */
          "en";
        var translations =
          /*: Translations */
          {};

        var generateId =
          /*: GenerateId */
          function generateId(pattern) {
            return pattern;
          };

        var missingReplacement =
          /*: Replacement */
          null;
        var missingTranslation =
          /*: MissingTranslation */
          "warning";
        var types =
          /*: Types */
          {};

        function formatMessage(
          msg,
          /*: Message */
          args,
          /*:: ?: Object */
          locales
          /*:: ?: Locales */
        ) {
          var pattern = typeof msg === "string" ? msg : msg["default"];
          var id = (_typeof(msg) === "object" && msg.id) || generateId(pattern);
          var translated = translate(pattern, id, locales || currentLocales);
          var format =
            translated.format ||
            (translated.format = interpret(
              parse(translated.message),
              locales || currentLocales,
              types
            ));
          return format(args);
        }

        formatMessage.rich = function rich(
          msg,
          /*: Message */
          args,
          /*:: ?: Object */
          locales
          /*:: ?: Locales */
        ) {
          var pattern = typeof msg === "string" ? msg : msg["default"];
          var id = (_typeof(msg) === "object" && msg.id) || generateId(pattern);
          var translated = translate(pattern, id, locales || currentLocales);
          var format =
            translated.toParts ||
            (translated.toParts = interpret.toParts(
              parse(translated.message, {
                tagsType: tagsType,
              }),
              locales || currentLocales,
              types
            ));
          return format(args);
        };

        var tagsType = "<>";

        function richType(
          node,
          /*: any[] */
          locales
          /*: Locales */
        ) {
          var style = node[2];
          return function (fn, args) {
            var props =
              _typeof(style) === "object" ? mapObject(style, args) : style;
            return typeof fn === "function" ? fn(props) : fn;
          };
        }

        types[tagsType] = richType;

        function mapObject(
          object,
          /* { [string]: (args?: Object) => any } */
          args
          /*: ?Object */
        ) {
          return Object.keys(object).reduce(function (mapped, key) {
            mapped[key] = object[key](args);
            return mapped;
          }, {});
        }

        function translate(
          pattern,
          /*: string */
          id,
          /*: string */
          locales
          /*: Locales */
        ) {
          /*: Translation */
          var locale = lookupClosestLocale(locales, translations) || "en";
          var messages = translations[locale] || (translations[locale] = {});
          var translated = messages[id];

          if (typeof translated === "string") {
            translated = messages[id] = {
              message: translated,
            };
          }

          if (!translated) {
            var message =
              'Translation for "' + id + '" in "' + locale + '" is missing';

            if (missingTranslation === "warning") {
              /* istanbul ignore else */
              if (typeof console !== "undefined") console.warn(message);
            } else if (missingTranslation !== "ignore") {
              // 'error'
              throw new Error(message);
            }

            var replacement =
              typeof missingReplacement === "function"
                ? missingReplacement(pattern, id, locale) || pattern
                : missingReplacement || pattern;
            translated = messages[id] = {
              message: replacement,
            };
          }

          return translated;
        }

        formatMessage.setup = function setup(
          opt
          /*:: ?: Options */
        ) {
          opt = opt || {};
          if (opt.locale) currentLocales = opt.locale;
          if ("translations" in opt) translations = opt.translations || {};
          if (opt.generateId) generateId = opt.generateId;
          if ("missingReplacement" in opt)
            missingReplacement = opt.missingReplacement;
          if (opt.missingTranslation)
            missingTranslation = opt.missingTranslation;

          if (opt.formats) {
            if (opt.formats.number) assign(formats.number, opt.formats.number);
            if (opt.formats.date) assign(formats.date, opt.formats.date);
            if (opt.formats.time) assign(formats.time, opt.formats.time);
          }

          if (opt.types) {
            types = opt.types;
            types[tagsType] = richType;
          }

          return {
            locale: currentLocales,
            translations: translations,
            generateId: generateId,
            missingReplacement: missingReplacement,
            missingTranslation: missingTranslation,
            formats: formats,
            types: types,
          };
        };

        formatMessage.number = function (
          value,
          /*: number */
          style,
          /*:: ?: string */
          locales
          /*:: ?: Locales */
        ) {
          var options =
            (style && formats.number[style]) ||
            formats.parseNumberPattern(style) ||
            formats.number["default"];
          return new Intl.NumberFormat(
            locales || currentLocales,
            options
          ).format(value);
        };

        formatMessage.date = function (
          value,
          /*:: ?: number | Date */
          style,
          /*:: ?: string */
          locales
          /*:: ?: Locales */
        ) {
          var options =
            (style && formats.date[style]) ||
            formats.parseDatePattern(style) ||
            formats.date["default"];
          return new Intl.DateTimeFormat(
            locales || currentLocales,
            options
          ).format(value);
        };

        formatMessage.time = function (
          value,
          /*:: ?: number | Date */
          style,
          /*:: ?: string */
          locales
          /*:: ?: Locales */
        ) {
          var options =
            (style && formats.time[style]) ||
            formats.parseDatePattern(style) ||
            formats.time["default"];
          return new Intl.DateTimeFormat(
            locales || currentLocales,
            options
          ).format(value);
        };

        formatMessage.select = function (
          value,
          /*: any */
          options
          /*: Object */
        ) {
          return options[value] || options.other;
        };

        formatMessage.custom = function (
          placeholder,
          /*: any[] */
          locales,
          /*: Locales */
          value,
          /*: any */
          args
          /*: Object */
        ) {
          if (!(placeholder[1] in types)) return value;
          return types[placeholder[1]](placeholder, locales)(value, args);
        };

        formatMessage.plural = plural.bind(null, "cardinal");
        formatMessage.selectordinal = plural.bind(null, "ordinal");

        function plural(
          pluralType,
          /*: 'cardinal' | 'ordinal' */
          value,
          /*: number */
          offset,
          /*: any */
          options,
          /*: any */
          locale
          /*: any */
        ) {
          if (_typeof(offset) === "object" && _typeof(options) !== "object") {
            // offset is optional
            locale = options;
            options = offset;
            offset = 0;
          }

          var closest = lookupClosestLocale(locale || currentLocales, plurals);
          var plural = (closest && plurals[closest][pluralType]) || returnOther;
          return (
            options["=" + +value] ||
            options[plural(value - offset)] ||
            options.other
          );
        }

        function /*:: n:number */
        returnOther() {
          return "other";
        }

        formatMessage.namespace = namespace;
        return formatMessage;
      }

      module.exports = exports = namespace();

      /***/
    },
    /* 9 */
    /***/ (module, exports) => {
      "use strict";
      // @flow

      /*::
export type AST = Element[]
export type Element = string | Placeholder
export type Placeholder = Plural | Styled | Typed | Simple
export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
export type Styled = [ string, string, string | SubMessages ]
export type Typed = [ string, string ]
export type Simple = [ string ]
export type SubMessages = { [string]: AST }
export type Token = [ TokenType, string ]
export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
type Context = {|
  pattern: string,
  index: number,
  tagsType: ?string,
  tokens: ?Token[]
|}
*/

      var ARG_OPN = "{";
      var ARG_CLS = "}";
      var ARG_SEP = ",";
      var NUM_ARG = "#";
      var TAG_OPN = "<";
      var TAG_CLS = ">";
      var TAG_END = "</";
      var TAG_SELF_CLS = "/>";
      var ESC = "'";
      var OFFSET = "offset:";
      var simpleTypes = [
        "number",
        "date",
        "time",
        "ordinal",
        "duration",
        "spellout",
      ];
      var submTypes = ["plural", "select", "selectordinal"];
      /**
       * parse
       *
       * Turns this:
       *  `You have { numBananas, plural,
       *       =0 {no bananas}
       *      one {a banana}
       *    other {# bananas}
       *  } for sale`
       *
       * into this:
       *  [ "You have ", [ "numBananas", "plural", 0, {
       *       "=0": [ "no bananas" ],
       *      "one": [ "a banana" ],
       *    "other": [ [ '#' ], " bananas" ]
       *  } ], " for sale." ]
       *
       * tokens:
       *  [
       *    [ "text", "You have " ],
       *    [ "syntax", "{" ],
       *    [ "space", " " ],
       *    [ "id", "numBananas" ],
       *    [ "syntax", ", " ],
       *    [ "space", " " ],
       *    [ "type", "plural" ],
       *    [ "syntax", "," ],
       *    [ "space", "\n     " ],
       *    [ "selector", "=0" ],
       *    [ "space", " " ],
       *    [ "syntax", "{" ],
       *    [ "text", "no bananas" ],
       *    [ "syntax", "}" ],
       *    [ "space", "\n    " ],
       *    [ "selector", "one" ],
       *    [ "space", " " ],
       *    [ "syntax", "{" ],
       *    [ "text", "a banana" ],
       *    [ "syntax", "}" ],
       *    [ "space", "\n  " ],
       *    [ "selector", "other" ],
       *    [ "space", " " ],
       *    [ "syntax", "{" ],
       *    [ "syntax", "#" ],
       *    [ "text", " bananas" ],
       *    [ "syntax", "}" ],
       *    [ "space", "\n" ],
       *    [ "syntax", "}" ],
       *    [ "text", " for sale." ]
       *  ]
       **/

      exports = module.exports = function parse(
        pattern,
        /*: string */
        options /*: AST */
        /*:: ?: { tagsType?: string, tokens?: Token[] } */
      ) {
        return parseAST(
          {
            pattern: String(pattern),
            index: 0,
            tagsType: (options && options.tagsType) || null,
            tokens: (options && options.tokens) || null,
          },
          ""
        );
      };

      function parseAST(
        current,
        /*: Context */
        parentType
        /*: string */
      ) {
        /*: AST */
        var pattern = current.pattern;
        var length = pattern.length;
        var elements =
          /*: AST */
          [];
        var start = current.index;
        var text = parseText(current, parentType);
        if (text) elements.push(text);
        if (text && current.tokens)
          current.tokens.push(["text", pattern.slice(start, current.index)]);

        while (current.index < length) {
          if (pattern[current.index] === ARG_CLS) {
            if (!parentType) throw expected(current);
            break;
          }

          if (
            parentType &&
            current.tagsType &&
            pattern.slice(current.index, current.index + TAG_END.length) ===
              TAG_END
          )
            break;
          elements.push(parsePlaceholder(current));
          start = current.index;
          text = parseText(current, parentType);
          if (text) elements.push(text);
          if (text && current.tokens)
            current.tokens.push(["text", pattern.slice(start, current.index)]);
        }

        return elements;
      }

      function parseText(
        current,
        /*: Context */
        parentType
        /*: string */
      ) {
        /*: string */
        var pattern = current.pattern;
        var length = pattern.length;
        var isHashSpecial =
          parentType === "plural" || parentType === "selectordinal";
        var isAngleSpecial = !!current.tagsType;
        var isArgStyle = parentType === "{style}";
        var text = "";

        while (current.index < length) {
          var _char = pattern[current.index];

          if (
            _char === ARG_OPN ||
            _char === ARG_CLS ||
            (isHashSpecial && _char === NUM_ARG) ||
            (isAngleSpecial && _char === TAG_OPN) ||
            (isArgStyle && isWhitespace(_char.charCodeAt(0)))
          ) {
            break;
          } else if (_char === ESC) {
            _char = pattern[++current.index];

            if (_char === ESC) {
              // double is always 1 '
              text += _char;
              ++current.index;
            } else if (
              // only when necessary
              _char === ARG_OPN ||
              _char === ARG_CLS ||
              (isHashSpecial && _char === NUM_ARG) ||
              (isAngleSpecial && _char === TAG_OPN) ||
              isArgStyle
            ) {
              text += _char;

              while (++current.index < length) {
                _char = pattern[current.index];

                if (_char === ESC && pattern[current.index + 1] === ESC) {
                  // double is always 1 '
                  text += ESC;
                  ++current.index;
                } else if (_char === ESC) {
                  // end of quoted
                  ++current.index;
                  break;
                } else {
                  text += _char;
                }
              }
            } else {
              // lone ' is just a '
              text += ESC; // already incremented
            }
          } else {
            text += _char;
            ++current.index;
          }
        }

        return text;
      }

      function isWhitespace(
        code
        /*: number */
      ) {
        /*: boolean */
        return (
          (code >= 0x09 && code <= 0x0d) ||
          code === 0x20 ||
          code === 0x85 ||
          code === 0xa0 ||
          code === 0x180e ||
          (code >= 0x2000 && code <= 0x200d) ||
          code === 0x2028 ||
          code === 0x2029 ||
          code === 0x202f ||
          code === 0x205f ||
          code === 0x2060 ||
          code === 0x3000 ||
          code === 0xfeff
        );
      }

      function skipWhitespace(
        current
        /*: Context */
      ) {
        /*: void */
        var pattern = current.pattern;
        var length = pattern.length;
        var start = current.index;

        while (
          current.index < length &&
          isWhitespace(pattern.charCodeAt(current.index))
        ) {
          ++current.index;
        }

        if (start < current.index && current.tokens) {
          current.tokens.push([
            "space",
            current.pattern.slice(start, current.index),
          ]);
        }
      }

      function parsePlaceholder(
        current
        /*: Context */
      ) {
        /*: Placeholder */
        var pattern = current.pattern;

        if (pattern[current.index] === NUM_ARG) {
          if (current.tokens) current.tokens.push(["syntax", NUM_ARG]);
          ++current.index; // move passed #

          return [NUM_ARG];
        }

        var tag = parseTag(current);
        if (tag) return tag;
        /* istanbul ignore if should be unreachable if parseAST and parseText are right */

        if (pattern[current.index] !== ARG_OPN)
          throw expected(current, ARG_OPN);
        if (current.tokens) current.tokens.push(["syntax", ARG_OPN]);
        ++current.index; // move passed {

        skipWhitespace(current);
        var id = parseId(current);
        if (!id) throw expected(current, "placeholder id");
        if (current.tokens) current.tokens.push(["id", id]);
        skipWhitespace(current);
        var _char2 = pattern[current.index];

        if (_char2 === ARG_CLS) {
          // end placeholder
          if (current.tokens) current.tokens.push(["syntax", ARG_CLS]);
          ++current.index; // move passed }

          return [id];
        }

        if (_char2 !== ARG_SEP)
          throw expected(current, ARG_SEP + " or " + ARG_CLS);
        if (current.tokens) current.tokens.push(["syntax", ARG_SEP]);
        ++current.index; // move passed ,

        skipWhitespace(current);
        var type = parseId(current);
        if (!type) throw expected(current, "placeholder type");
        if (current.tokens) current.tokens.push(["type", type]);
        skipWhitespace(current);
        _char2 = pattern[current.index];

        if (_char2 === ARG_CLS) {
          // end placeholder
          if (current.tokens) current.tokens.push(["syntax", ARG_CLS]);

          if (
            type === "plural" ||
            type === "selectordinal" ||
            type === "select"
          ) {
            throw expected(current, type + " sub-messages");
          }

          ++current.index; // move passed }

          return [id, type];
        }

        if (_char2 !== ARG_SEP)
          throw expected(current, ARG_SEP + " or " + ARG_CLS);
        if (current.tokens) current.tokens.push(["syntax", ARG_SEP]);
        ++current.index; // move passed ,

        skipWhitespace(current);
        var arg;

        if (type === "plural" || type === "selectordinal") {
          var offset = parsePluralOffset(current);
          skipWhitespace(current);
          arg = [id, type, offset, parseSubMessages(current, type)];
        } else if (type === "select") {
          arg = [id, type, parseSubMessages(current, type)];
        } else if (simpleTypes.indexOf(type) >= 0) {
          arg = [id, type, parseSimpleFormat(current)];
        } else {
          // custom placeholder type
          var index = current.index;
          var format =
            /*: string | SubMessages */
            parseSimpleFormat(current);
          skipWhitespace(current);

          if (pattern[current.index] === ARG_OPN) {
            current.index = index; // rewind, since should have been submessages

            format = parseSubMessages(current, type);
          }

          arg = [id, type, format];
        }

        skipWhitespace(current);
        if (pattern[current.index] !== ARG_CLS)
          throw expected(current, ARG_CLS);
        if (current.tokens) current.tokens.push(["syntax", ARG_CLS]);
        ++current.index; // move passed }

        return arg;
      }

      function parseTag(
        current
        /*: Context */
      ) {
        /*: ?Placeholder */
        var tagsType = current.tagsType;
        if (!tagsType || current.pattern[current.index] !== TAG_OPN) return;

        if (
          current.pattern.slice(
            current.index,
            current.index + TAG_END.length
          ) === TAG_END
        ) {
          throw expected(
            current,
            null,
            "closing tag without matching opening tag"
          );
        }

        if (current.tokens) current.tokens.push(["syntax", TAG_OPN]);
        ++current.index; // move passed <

        var id = parseId(current, true);
        if (!id) throw expected(current, "placeholder id");
        if (current.tokens) current.tokens.push(["id", id]);
        skipWhitespace(current);

        if (
          current.pattern.slice(
            current.index,
            current.index + TAG_SELF_CLS.length
          ) === TAG_SELF_CLS
        ) {
          if (current.tokens) current.tokens.push(["syntax", TAG_SELF_CLS]);
          current.index += TAG_SELF_CLS.length;
          return [id, tagsType];
        }

        if (current.pattern[current.index] !== TAG_CLS)
          throw expected(current, TAG_CLS);
        if (current.tokens) current.tokens.push(["syntax", TAG_CLS]);
        ++current.index; // move passed >

        var children = parseAST(current, tagsType);
        var end = current.index;
        if (
          current.pattern.slice(
            current.index,
            current.index + TAG_END.length
          ) !== TAG_END
        )
          throw expected(current, TAG_END + id + TAG_CLS);
        if (current.tokens) current.tokens.push(["syntax", TAG_END]);
        current.index += TAG_END.length;
        var closeId = parseId(current, true);
        if (closeId && current.tokens) current.tokens.push(["id", closeId]);

        if (id !== closeId) {
          current.index = end; // rewind for better error message

          throw expected(
            current,
            TAG_END + id + TAG_CLS,
            TAG_END + closeId + TAG_CLS
          );
        }

        skipWhitespace(current);
        if (current.pattern[current.index] !== TAG_CLS)
          throw expected(current, TAG_CLS);
        if (current.tokens) current.tokens.push(["syntax", TAG_CLS]);
        ++current.index; // move passed >

        return [
          id,
          tagsType,
          {
            children: children,
          },
        ];
      }

      function parseId(
        current,
        /*: Context */
        isTag
        /*:: ?: boolean */
      ) {
        /*: string */
        var pattern = current.pattern;
        var length = pattern.length;
        var id = "";

        while (current.index < length) {
          var _char3 = pattern[current.index];
          if (
            _char3 === ARG_OPN ||
            _char3 === ARG_CLS ||
            _char3 === ARG_SEP ||
            _char3 === NUM_ARG ||
            _char3 === ESC ||
            isWhitespace(_char3.charCodeAt(0)) ||
            (isTag &&
              (_char3 === TAG_OPN || _char3 === TAG_CLS || _char3 === "/"))
          )
            break;
          id += _char3;
          ++current.index;
        }

        return id;
      }

      function parseSimpleFormat(
        current
        /*: Context */
      ) {
        /*: string */
        var start = current.index;
        var style = parseText(current, "{style}");
        if (!style) throw expected(current, "placeholder style name");
        if (current.tokens)
          current.tokens.push([
            "style",
            current.pattern.slice(start, current.index),
          ]);
        return style;
      }

      function parsePluralOffset(
        current
        /*: Context */
      ) {
        /*: number */
        var pattern = current.pattern;
        var length = pattern.length;
        var offset = 0;

        if (
          pattern.slice(current.index, current.index + OFFSET.length) === OFFSET
        ) {
          if (current.tokens)
            current.tokens.push(["offset", "offset"], ["syntax", ":"]);
          current.index += OFFSET.length; // move passed offset:

          skipWhitespace(current);
          var start = current.index;

          while (
            current.index < length &&
            isDigit(pattern.charCodeAt(current.index))
          ) {
            ++current.index;
          }

          if (start === current.index) throw expected(current, "offset number");
          if (current.tokens)
            current.tokens.push([
              "number",
              pattern.slice(start, current.index),
            ]);
          offset = +pattern.slice(start, current.index);
        }

        return offset;
      }

      function isDigit(
        code
        /*: number */
      ) {
        /*: boolean */
        return code >= 0x30 && code <= 0x39;
      }

      function parseSubMessages(
        current,
        /*: Context */
        parentType
        /*: string */
      ) {
        /*: SubMessages */
        var pattern = current.pattern;
        var length = pattern.length;
        var options =
          /*: SubMessages */
          {};

        while (current.index < length && pattern[current.index] !== ARG_CLS) {
          var selector = parseId(current);
          if (!selector) throw expected(current, "sub-message selector");
          if (current.tokens) current.tokens.push(["selector", selector]);
          skipWhitespace(current);
          options[selector] = parseSubMessage(current, parentType);
          skipWhitespace(current);
        }

        if (!options.other && submTypes.indexOf(parentType) >= 0) {
          throw expected(
            current,
            null,
            null,
            '"other" sub-message must be specified in ' + parentType
          );
        }

        return options;
      }

      function parseSubMessage(
        current,
        /*: Context */
        parentType
        /*: string */
      ) {
        /*: AST */
        if (current.pattern[current.index] !== ARG_OPN)
          throw expected(current, ARG_OPN + " to start sub-message");
        if (current.tokens) current.tokens.push(["syntax", ARG_OPN]);
        ++current.index; // move passed {

        var message = parseAST(current, parentType);
        if (current.pattern[current.index] !== ARG_CLS)
          throw expected(current, ARG_CLS + " to end sub-message");
        if (current.tokens) current.tokens.push(["syntax", ARG_CLS]);
        ++current.index; // move passed }

        return message;
      }

      function expected(
        current,
        /*: Context */
        expected,
        /*:: ?: ?string */
        found,
        /*:: ?: ?string */
        message
        /*:: ?: string */
      ) {
        var pattern = current.pattern;
        var lines = pattern.slice(0, current.index).split(/\r?\n/);
        var offset = current.index;
        var line = lines.length;
        var column = lines.slice(-1)[0].length;
        found =
          found ||
          (current.index >= pattern.length
            ? "end of message pattern"
            : parseId(current) || pattern[current.index]);
        if (!message) message = errorMessage(expected, found);
        message += " in " + pattern.replace(/\r?\n/g, "\n");
        return new SyntaxError(message, expected, found, offset, line, column);
      }

      function errorMessage(
        expected,
        /*: ?string */
        found
        /* string */
      ) {
        if (!expected) return "Unexpected " + found + " found";
        return "Expected " + expected + " but found " + found;
      }
      /**
       * SyntaxError
       *  Holds information about bad syntax found in a message pattern
       **/

      function SyntaxError(
        message,
        /*: string */
        expected,
        /*: ?string */
        found,
        /*: ?string */
        offset,
        /*: number */
        line,
        /*: number */
        column
        /*: number */
      ) {
        Error.call(this, message);
        this.name = "SyntaxError";
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.offset = offset;
        this.line = line;
        this.column = column;
      }

      SyntaxError.prototype = Object.create(Error.prototype);
      exports.SyntaxError = SyntaxError;

      /***/
    },
    /* 10 */
    /***/ (module, exports, __webpack_require__) => {
      "use strict";
      // @flow

      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (
          typeof Symbol === "function" &&
          typeof Symbol.iterator === "symbol"
        ) {
          _typeof = function _typeof(obj) {
            return typeof obj;
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };
        }
        return _typeof(obj);
      }

      var formats = __webpack_require__(11);

      var lookupClosestLocale = __webpack_require__(12);

      var plurals = __webpack_require__(13);
      /*::
import type {
  AST,
  SubMessages
} from '../format-message-parse'
type Locale = string
type Locales = Locale | Locale[]
type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
export type Type = (Placeholder, Locales) => (any, ?Object) => any
export type Types = { [string]: Type }
*/

      exports = module.exports = function interpret(
        ast,
        /*: AST */
        locale,
        /*:: ?: Locales */
        types /*: (args?: Object) => string */
        /*:: ?: Types */
      ) {
        return interpretAST(ast, null, locale || "en", types || {}, true);
      };

      exports.toParts = function toParts(
        ast,
        /*: AST */
        locale,
        /*:: ?: Locales */
        types /*: (args?: Object) => any[] */
        /*:: ?: Types */
      ) {
        return interpretAST(ast, null, locale || "en", types || {}, false);
      };

      function interpretAST(
        elements,
        /*: any[] */
        parent,
        /*: ?Placeholder */
        locale,
        /*: Locales */
        types,
        /*: Types */
        join
        /*: boolean */
      ) {
        /*: Function */
        var parts = elements.map(function (element) {
          return interpretElement(element, parent, locale, types, join);
        });

        if (!join) {
          return function format(args) {
            return parts.reduce(function (parts, part) {
              return parts.concat(part(args));
            }, []);
          };
        }

        if (parts.length === 1) return parts[0];
        return function format(args) {
          var message = "";

          for (var e = 0; e < parts.length; ++e) {
            message += parts[e](args);
          }

          return message;
        };
      }

      function interpretElement(
        element,
        /*: Placeholder */
        parent,
        /*: ?Placeholder */
        locale,
        /*: Locales */
        types,
        /*: Types */
        join
        /*: boolean */
      ) {
        /*: Function */
        if (typeof element === "string") {
          var value =
            /*: string */
            element;
          return function format() {
            return value;
          };
        }

        var id = element[0];
        var type = element[1];

        if (parent && element[0] === "#") {
          id = parent[0];
          var offset = parent[2];
          var formatter = (types.number || defaults.number)(
            [id, "number"],
            locale
          );
          return function format(args) {
            return formatter(getArg(id, args) - offset, args);
          };
        } // pre-process children

        var children;

        if (type === "plural" || type === "selectordinal") {
          children = {};
          Object.keys(element[3]).forEach(function (key) {
            children[key] = interpretAST(
              element[3][key],
              element,
              locale,
              types,
              join
            );
          });
          element = [element[0], element[1], element[2], children];
        } else if (element[2] && _typeof(element[2]) === "object") {
          children = {};
          Object.keys(element[2]).forEach(function (key) {
            children[key] = interpretAST(
              element[2][key],
              element,
              locale,
              types,
              join
            );
          });
          element = [element[0], element[1], children];
        }

        var getFrmt = type && (types[type] || defaults[type]);

        if (getFrmt) {
          var frmt = getFrmt(element, locale);
          return function format(args) {
            return frmt(getArg(id, args), args);
          };
        }

        return join
          ? function format(args) {
              return String(getArg(id, args));
            }
          : function format(args) {
              return getArg(id, args);
            };
      }

      function getArg(
        id,
        /*: string */
        args
        /*: ?Object */
      ) {
        /*: any */
        if (args && id in args) return args[id];
        var parts = id.split(".");
        var a = args;

        for (var i = 0, ii = parts.length; a && i < ii; ++i) {
          a = a[parts[i]];
        }

        return a;
      }

      function interpretNumber(
        element,
        /*: Placeholder */
        locales
        /*: Locales */
      ) {
        var style = element[2];
        var options =
          formats.number[style] ||
          formats.parseNumberPattern(style) ||
          formats.number["default"];
        return new Intl.NumberFormat(locales, options).format;
      }

      function interpretDuration(
        element,
        /*: Placeholder */
        locales
        /*: Locales */
      ) {
        var style = element[2];
        var options = formats.duration[style] || formats.duration["default"];
        var fs = new Intl.NumberFormat(locales, options.seconds).format;
        var fm = new Intl.NumberFormat(locales, options.minutes).format;
        var fh = new Intl.NumberFormat(locales, options.hours).format;
        var sep = /^fi$|^fi-|^da/.test(String(locales)) ? "." : ":";
        return function (s, args) {
          s = +s;
          if (!isFinite(s)) return fs(s);
          var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc

          var m = ~~((s / 60) % 60);
          var dur =
            (h ? fh(Math.abs(h)) + sep : "") +
            fm(Math.abs(m)) +
            sep +
            fs(Math.abs(s % 60));
          return s < 0 ? fh(-1).replace(fh(1), dur) : dur;
        };
      }

      function interpretDateTime(
        element,
        /*: Placeholder */
        locales
        /*: Locales */
      ) {
        var type = element[1];
        var style = element[2];
        var options =
          formats[type][style] ||
          formats.parseDatePattern(style) ||
          formats[type]["default"];
        return new Intl.DateTimeFormat(locales, options).format;
      }

      function interpretPlural(
        element,
        /*: Placeholder */
        locales
        /*: Locales */
      ) {
        var type = element[1];
        var pluralType = type === "selectordinal" ? "ordinal" : "cardinal";
        var offset = element[2];
        var children = element[3];
        var pluralRules;

        if (
          Intl.PluralRules &&
          Intl.PluralRules.supportedLocalesOf(locales).length > 0
        ) {
          pluralRules = new Intl.PluralRules(locales, {
            type: pluralType,
          });
        } else {
          var locale = lookupClosestLocale(locales, plurals);
          var select = (locale && plurals[locale][pluralType]) || returnOther;
          pluralRules = {
            select: select,
          };
        }

        return function (value, args) {
          var clause =
            children["=" + +value] ||
            children[pluralRules.select(value - offset)] ||
            children.other;
          return clause(args);
        };
      }

      function /*:: n:number */
      returnOther() {
        return "other";
      }

      function interpretSelect(
        element,
        /*: Placeholder */
        locales
        /*: Locales */
      ) {
        var children = element[2];
        return function (value, args) {
          var clause = children[value] || children.other;
          return clause(args);
        };
      }

      var defaults =
        /*: Types */
        {
          number: interpretNumber,
          ordinal: interpretNumber,
          // TODO: support rbnf
          spellout: interpretNumber,
          // TODO: support rbnf
          duration: interpretDuration,
          date: interpretDateTime,
          time: interpretDateTime,
          plural: interpretPlural,
          selectordinal: interpretPlural,
          select: interpretSelect,
        };
      exports.types = defaults;

      /***/
    },
    /* 11 */
    /***/ (module) => {
      // @flow
      var LONG = "long";
      var SHORT = "short";
      var NARROW = "narrow";
      var NUMERIC = "numeric";
      var TWODIGIT = "2-digit";
      /**
       * formatting information
       **/

      module.exports = {
        number: {
          decimal: {
            style: "decimal",
          },
          integer: {
            style: "decimal",
            maximumFractionDigits: 0,
          },
          currency: {
            style: "currency",
            currency: "USD",
          },
          percent: {
            style: "percent",
          },
          default: {
            style: "decimal",
          },
        },
        date: {
          short: {
            month: NUMERIC,
            day: NUMERIC,
            year: TWODIGIT,
          },
          medium: {
            month: SHORT,
            day: NUMERIC,
            year: NUMERIC,
          },
          long: {
            month: LONG,
            day: NUMERIC,
            year: NUMERIC,
          },
          full: {
            month: LONG,
            day: NUMERIC,
            year: NUMERIC,
            weekday: LONG,
          },
          default: {
            month: SHORT,
            day: NUMERIC,
            year: NUMERIC,
          },
        },
        time: {
          short: {
            hour: NUMERIC,
            minute: NUMERIC,
          },
          medium: {
            hour: NUMERIC,
            minute: NUMERIC,
            second: NUMERIC,
          },
          long: {
            hour: NUMERIC,
            minute: NUMERIC,
            second: NUMERIC,
            timeZoneName: SHORT,
          },
          full: {
            hour: NUMERIC,
            minute: NUMERIC,
            second: NUMERIC,
            timeZoneName: SHORT,
          },
          default: {
            hour: NUMERIC,
            minute: NUMERIC,
            second: NUMERIC,
          },
        },
        duration: {
          default: {
            hours: {
              minimumIntegerDigits: 1,
              maximumFractionDigits: 0,
            },
            minutes: {
              minimumIntegerDigits: 2,
              maximumFractionDigits: 0,
            },
            seconds: {
              minimumIntegerDigits: 2,
              maximumFractionDigits: 3,
            },
          },
        },
        parseNumberPattern: function parseNumberPattern(
          pattern
          /*: ?string */
        ) {
          if (!pattern) return;
          var options = {};
          var currency = pattern.match(/\b[A-Z]{3}\b/i);
          var syms = pattern.replace(/[^??]/g, "").length;
          if (!syms && currency) syms = 1;

          if (syms) {
            options.style = "currency";
            options.currencyDisplay =
              syms === 1 ? "symbol" : syms === 2 ? "code" : "name";
            options.currency = currency ? currency[0].toUpperCase() : "USD";
          } else if (pattern.indexOf("%") >= 0) {
            options.style = "percent";
          }

          if (!/[@#0]/.test(pattern))
            return options.style ? options : undefined;
          options.useGrouping = pattern.indexOf(",") >= 0;

          if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf("@") >= 0) {
            var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, "");
            options.minimumSignificantDigits = Math.min(
              Math.max(size.replace(/[^@0]/g, "").length, 1),
              21
            );
            options.maximumSignificantDigits = Math.min(
              Math.max(size.length, 1),
              21
            );
          } else {
            var parts = pattern.replace(/[^#0.]/g, "").split(".");
            var integer = parts[0];
            var n = integer.length - 1;

            while (integer[n] === "0") {
              --n;
            }

            options.minimumIntegerDigits = Math.min(
              Math.max(integer.length - 1 - n, 1),
              21
            );
            var fraction = parts[1] || "";
            n = 0;

            while (fraction[n] === "0") {
              ++n;
            }

            options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);

            while (fraction[n] === "#") {
              ++n;
            }

            options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
          }

          return options;
        },
        parseDatePattern: function parseDatePattern(
          pattern
          /*: ?string */
        ) {
          if (!pattern) return;
          var options = {};

          for (var i = 0; i < pattern.length; ) {
            var current = pattern[i];
            var n = 1;

            while (pattern[++i] === current) {
              ++n;
            }

            switch (current) {
              case "G":
                options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
                break;

              case "y":
              case "Y":
                options.year = n === 2 ? TWODIGIT : NUMERIC;
                break;

              case "M":
              case "L":
                n = Math.min(Math.max(n - 1, 0), 4);
                options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
                break;

              case "E":
              case "e":
              case "c":
                options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
                break;

              case "d":
              case "D":
                options.day = n === 2 ? TWODIGIT : NUMERIC;
                break;

              case "h":
              case "K":
                options.hour12 = true;
                options.hour = n === 2 ? TWODIGIT : NUMERIC;
                break;

              case "H":
              case "k":
                options.hour12 = false;
                options.hour = n === 2 ? TWODIGIT : NUMERIC;
                break;

              case "m":
                options.minute = n === 2 ? TWODIGIT : NUMERIC;
                break;

              case "s":
              case "S":
                options.second = n === 2 ? TWODIGIT : NUMERIC;
                break;

              case "z":
              case "Z":
              case "v":
              case "V":
                options.timeZoneName = n === 1 ? SHORT : LONG;
                break;
            }
          }

          return Object.keys(options).length ? options : undefined;
        },
      };

      /***/
    },
    /* 12 */
    /***/ (module) => {
      // @flow
      // "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
      // assumes normalized language tags, and matches in a case sensitive manner
      module.exports = function lookupClosestLocale(
        locale,
        /*: string | string[] | void */
        available /*: ?string */
        /*: { [string]: any } */
      ) {
        if (typeof locale === "string" && available[locale]) return locale;
        var locales = [].concat(locale || []);

        for (var l = 0, ll = locales.length; l < ll; ++l) {
          var current = locales[l].split("-");

          while (current.length) {
            var candidate = current.join("-");
            if (available[candidate]) return candidate;
            current.pop();
          }
        }
      };

      /***/
    },
    /* 13 */
    /***/ (module) => {
      "use strict";
      // @flow

      /*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */

      var zero = "zero",
        one = "one",
        two = "two",
        few = "few",
        many = "many",
        other = "other";
      var f = [
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return 0 <= n && n <= 1 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var n = +s;
          return i === 0 || n === 1 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 0
            ? zero
            : n === 1
            ? one
            : n === 2
            ? two
            : 3 <= n % 100 && n % 100 <= 10
            ? few
            : 11 <= n % 100 && n % 100 <= 99
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          return i === 1 && v === 0 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n % 10 === 1 && n % 100 !== 11
            ? one
            : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 12 || 14 < n % 100)
            ? few
            : n % 10 === 0 ||
              (5 <= n % 10 && n % 10 <= 9) ||
              (11 <= n % 100 && n % 100 <= 14)
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n % 10 === 1 &&
            n % 100 !== 11 &&
            n % 100 !== 71 &&
            n % 100 !== 91
            ? one
            : n % 10 === 2 && n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92
            ? two
            : ((3 <= n % 10 && n % 10 <= 4) || n % 10 === 9) &&
              (n % 100 < 10 || 19 < n % 100) &&
              (n % 100 < 70 || 79 < n % 100) &&
              (n % 100 < 90 || 99 < n % 100)
            ? few
            : n !== 0 && n % 1000000 === 0
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          var f = +(s + ".").split(".")[1];
          return (v === 0 && i % 10 === 1 && i % 100 !== 11) ||
            (f % 10 === 1 && f % 100 !== 11)
            ? one
            : (v === 0 &&
                2 <= i % 10 &&
                i % 10 <= 4 &&
                (i % 100 < 12 || 14 < i % 100)) ||
              (2 <= f % 10 && f % 10 <= 4 && (f % 100 < 12 || 14 < f % 100))
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          return i === 1 && v === 0
            ? one
            : 2 <= i && i <= 4 && v === 0
            ? few
            : v !== 0
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 0
            ? zero
            : n === 1
            ? one
            : n === 2
            ? two
            : n === 3
            ? few
            : n === 6
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var t = +("" + s).replace(/^[^.]*.?|0+$/g, "");
          var n = +s;
          return n === 1 || (t !== 0 && (i === 0 || i === 1)) ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          var f = +(s + ".").split(".")[1];
          return (v === 0 && i % 100 === 1) || f % 100 === 1
            ? one
            : (v === 0 && i % 100 === 2) || f % 100 === 2
            ? two
            : (v === 0 && 3 <= i % 100 && i % 100 <= 4) ||
              (3 <= f % 100 && f % 100 <= 4)
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          return i === 0 || i === 1 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          var f = +(s + ".").split(".")[1];
          return (v === 0 && (i === 1 || i === 2 || i === 3)) ||
            (v === 0 && i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9) ||
            (v !== 0 && f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9)
            ? one
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1
            ? one
            : n === 2
            ? two
            : 3 <= n && n <= 6
            ? few
            : 7 <= n && n <= 10
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 || n === 11
            ? one
            : n === 2 || n === 12
            ? two
            : (3 <= n && n <= 10) || (13 <= n && n <= 19)
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          return v === 0 && i % 10 === 1
            ? one
            : v === 0 && i % 10 === 2
            ? two
            : v === 0 &&
              (i % 100 === 0 ||
                i % 100 === 20 ||
                i % 100 === 40 ||
                i % 100 === 60 ||
                i % 100 === 80)
            ? few
            : v !== 0
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          var n = +s;
          return i === 1 && v === 0
            ? one
            : i === 2 && v === 0
            ? two
            : v === 0 && (n < 0 || 10 < n) && n % 10 === 0
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var t = +("" + s).replace(/^[^.]*.?|0+$/g, "");
          return (t === 0 && i % 10 === 1 && i % 100 !== 11) || t !== 0
            ? one
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 ? one : n === 2 ? two : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 0 ? zero : n === 1 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var n = +s;
          return n === 0 ? zero : (i === 0 || i === 1) && n !== 0 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var f = +(s + ".").split(".")[1];
          var n = +s;
          return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100)
            ? one
            : 2 <= n % 10 && n % 10 <= 9 && (n % 100 < 11 || 19 < n % 100)
            ? few
            : f !== 0
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var v = (s + ".").split(".")[1].length;
          var f = +(s + ".").split(".")[1];
          var n = +s;
          return n % 10 === 0 ||
            (11 <= n % 100 && n % 100 <= 19) ||
            (v === 2 && 11 <= f % 100 && f % 100 <= 19)
            ? zero
            : (n % 10 === 1 && n % 100 !== 11) ||
              (v === 2 && f % 10 === 1 && f % 100 !== 11) ||
              (v !== 2 && f % 10 === 1)
            ? one
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          var f = +(s + ".").split(".")[1];
          return (v === 0 && i % 10 === 1 && i % 100 !== 11) ||
            (f % 10 === 1 && f % 100 !== 11)
            ? one
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          var n = +s;
          return i === 1 && v === 0
            ? one
            : v !== 0 || n === 0 || (n !== 1 && 1 <= n % 100 && n % 100 <= 19)
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1
            ? one
            : n === 0 || (2 <= n % 100 && n % 100 <= 10)
            ? few
            : 11 <= n % 100 && n % 100 <= 19
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          return i === 1 && v === 0
            ? one
            : v === 0 &&
              2 <= i % 10 &&
              i % 10 <= 4 &&
              (i % 100 < 12 || 14 < i % 100)
            ? few
            : (v === 0 && i !== 1 && 0 <= i % 10 && i % 10 <= 1) ||
              (v === 0 && 5 <= i % 10 && i % 10 <= 9) ||
              (v === 0 && 12 <= i % 100 && i % 100 <= 14)
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          return 0 <= i && i <= 1 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          return v === 0 && i % 10 === 1 && i % 100 !== 11
            ? one
            : v === 0 &&
              2 <= i % 10 &&
              i % 10 <= 4 &&
              (i % 100 < 12 || 14 < i % 100)
            ? few
            : (v === 0 && i % 10 === 0) ||
              (v === 0 && 5 <= i % 10 && i % 10 <= 9) ||
              (v === 0 && 11 <= i % 100 && i % 100 <= 14)
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var n = +s;
          return i === 0 || n === 1 ? one : 2 <= n && n <= 10 ? few : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var f = +(s + ".").split(".")[1];
          var n = +s;
          return n === 0 || n === 1 || (i === 0 && f === 1) ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          var v = (s + ".").split(".")[1].length;
          return v === 0 && i % 100 === 1
            ? one
            : v === 0 && i % 100 === 2
            ? two
            : (v === 0 && 3 <= i % 100 && i % 100 <= 4) || v !== 0
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return (0 <= n && n <= 1) || (11 <= n && n <= 99) ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10
            ? one
            : n === 2 || n === 3
            ? two
            : n === 4
            ? few
            : n === 6
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          return i % 10 === 1 ||
            i % 10 === 2 ||
            i % 10 === 5 ||
            i % 10 === 7 ||
            i % 10 === 8 ||
            i % 100 === 20 ||
            i % 100 === 50 ||
            i % 100 === 70 ||
            i % 100 === 80
            ? one
            : i % 10 === 3 ||
              i % 10 === 4 ||
              i % 1000 === 100 ||
              i % 1000 === 200 ||
              i % 1000 === 300 ||
              i % 1000 === 400 ||
              i % 1000 === 500 ||
              i % 1000 === 600 ||
              i % 1000 === 700 ||
              i % 1000 === 800 ||
              i % 1000 === 900
            ? few
            : i === 0 ||
              i % 10 === 6 ||
              i % 100 === 40 ||
              i % 100 === 60 ||
              i % 100 === 90
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return (n % 10 === 2 || n % 10 === 3) &&
            n % 100 !== 12 &&
            n % 100 !== 13
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 || n === 3
            ? one
            : n === 2
            ? two
            : n === 4
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 0 || n === 7 || n === 8 || n === 9
            ? zero
            : n === 1
            ? one
            : n === 2
            ? two
            : n === 3 || n === 4
            ? few
            : n === 5 || n === 6
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n % 10 === 1 && n % 100 !== 11
            ? one
            : n % 10 === 2 && n % 100 !== 12
            ? two
            : n % 10 === 3 && n % 100 !== 13
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 || n === 11
            ? one
            : n === 2 || n === 12
            ? two
            : n === 3 || n === 13
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1
            ? one
            : n === 2 || n === 3
            ? two
            : n === 4
            ? few
            : n === 6
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 || n === 5 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 11 || n === 8 || n === 80 || n === 800 ? many : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          return i === 1
            ? one
            : i === 0 ||
              (2 <= i % 100 && i % 100 <= 20) ||
              i % 100 === 40 ||
              i % 100 === 60 ||
              i % 100 === 80
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n % 10 === 6 || n % 10 === 9 || (n % 10 === 0 && n !== 0)
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var i = Math.floor(Math.abs(+s));
          return i % 10 === 1 && i % 100 !== 11
            ? one
            : i % 10 === 2 && i % 100 !== 12
            ? two
            : (i % 10 === 7 || i % 10 === 8) && i % 100 !== 17 && i % 100 !== 18
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1
            ? one
            : n === 2 || n === 3
            ? two
            : n === 4
            ? few
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return 1 <= n && n <= 4 ? one : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 || n === 5 || (7 <= n && n <= 9)
            ? one
            : n === 2 || n === 3
            ? two
            : n === 4
            ? few
            : n === 6
            ? many
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n === 1 ? one : n % 10 === 4 && n % 100 !== 14 ? many : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return (n % 10 === 1 || n % 10 === 2) &&
            n % 100 !== 11 &&
            n % 100 !== 12
            ? one
            : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n % 10 === 6 || n % 10 === 9 || n === 10 ? few : other;
        },
        function (
          s /*: Rule */
          /*: string | number */
        ) {
          var n = +s;
          return n % 10 === 3 && n % 100 !== 13 ? few : other;
        },
      ];
      module.exports = {
        af: {
          cardinal: f[0],
        },
        ak: {
          cardinal: f[1],
        },
        am: {
          cardinal: f[2],
        },
        ar: {
          cardinal: f[3],
        },
        ars: {
          cardinal: f[3],
        },
        as: {
          cardinal: f[2],
          ordinal: f[34],
        },
        asa: {
          cardinal: f[0],
        },
        ast: {
          cardinal: f[4],
        },
        az: {
          cardinal: f[0],
          ordinal: f[35],
        },
        be: {
          cardinal: f[5],
          ordinal: f[36],
        },
        bem: {
          cardinal: f[0],
        },
        bez: {
          cardinal: f[0],
        },
        bg: {
          cardinal: f[0],
        },
        bh: {
          cardinal: f[1],
        },
        bn: {
          cardinal: f[2],
          ordinal: f[34],
        },
        br: {
          cardinal: f[6],
        },
        brx: {
          cardinal: f[0],
        },
        bs: {
          cardinal: f[7],
        },
        ca: {
          cardinal: f[4],
          ordinal: f[37],
        },
        ce: {
          cardinal: f[0],
        },
        cgg: {
          cardinal: f[0],
        },
        chr: {
          cardinal: f[0],
        },
        ckb: {
          cardinal: f[0],
        },
        cs: {
          cardinal: f[8],
        },
        cy: {
          cardinal: f[9],
          ordinal: f[38],
        },
        da: {
          cardinal: f[10],
        },
        de: {
          cardinal: f[4],
        },
        dsb: {
          cardinal: f[11],
        },
        dv: {
          cardinal: f[0],
        },
        ee: {
          cardinal: f[0],
        },
        el: {
          cardinal: f[0],
        },
        en: {
          cardinal: f[4],
          ordinal: f[39],
        },
        eo: {
          cardinal: f[0],
        },
        es: {
          cardinal: f[0],
        },
        et: {
          cardinal: f[4],
        },
        eu: {
          cardinal: f[0],
        },
        fa: {
          cardinal: f[2],
        },
        ff: {
          cardinal: f[12],
        },
        fi: {
          cardinal: f[4],
        },
        fil: {
          cardinal: f[13],
          ordinal: f[0],
        },
        fo: {
          cardinal: f[0],
        },
        fr: {
          cardinal: f[12],
          ordinal: f[0],
        },
        fur: {
          cardinal: f[0],
        },
        fy: {
          cardinal: f[4],
        },
        ga: {
          cardinal: f[14],
          ordinal: f[0],
        },
        gd: {
          cardinal: f[15],
          ordinal: f[40],
        },
        gl: {
          cardinal: f[4],
        },
        gsw: {
          cardinal: f[0],
        },
        gu: {
          cardinal: f[2],
          ordinal: f[41],
        },
        guw: {
          cardinal: f[1],
        },
        gv: {
          cardinal: f[16],
        },
        ha: {
          cardinal: f[0],
        },
        haw: {
          cardinal: f[0],
        },
        he: {
          cardinal: f[17],
        },
        hi: {
          cardinal: f[2],
          ordinal: f[41],
        },
        hr: {
          cardinal: f[7],
        },
        hsb: {
          cardinal: f[11],
        },
        hu: {
          cardinal: f[0],
          ordinal: f[42],
        },
        hy: {
          cardinal: f[12],
          ordinal: f[0],
        },
        ia: {
          cardinal: f[4],
        },
        io: {
          cardinal: f[4],
        },
        is: {
          cardinal: f[18],
        },
        it: {
          cardinal: f[4],
          ordinal: f[43],
        },
        iu: {
          cardinal: f[19],
        },
        iw: {
          cardinal: f[17],
        },
        jgo: {
          cardinal: f[0],
        },
        ji: {
          cardinal: f[4],
        },
        jmc: {
          cardinal: f[0],
        },
        ka: {
          cardinal: f[0],
          ordinal: f[44],
        },
        kab: {
          cardinal: f[12],
        },
        kaj: {
          cardinal: f[0],
        },
        kcg: {
          cardinal: f[0],
        },
        kk: {
          cardinal: f[0],
          ordinal: f[45],
        },
        kkj: {
          cardinal: f[0],
        },
        kl: {
          cardinal: f[0],
        },
        kn: {
          cardinal: f[2],
        },
        ks: {
          cardinal: f[0],
        },
        ksb: {
          cardinal: f[0],
        },
        ksh: {
          cardinal: f[20],
        },
        ku: {
          cardinal: f[0],
        },
        kw: {
          cardinal: f[19],
        },
        ky: {
          cardinal: f[0],
        },
        lag: {
          cardinal: f[21],
        },
        lb: {
          cardinal: f[0],
        },
        lg: {
          cardinal: f[0],
        },
        ln: {
          cardinal: f[1],
        },
        lt: {
          cardinal: f[22],
        },
        lv: {
          cardinal: f[23],
        },
        mas: {
          cardinal: f[0],
        },
        mg: {
          cardinal: f[1],
        },
        mgo: {
          cardinal: f[0],
        },
        mk: {
          cardinal: f[24],
          ordinal: f[46],
        },
        ml: {
          cardinal: f[0],
        },
        mn: {
          cardinal: f[0],
        },
        mo: {
          cardinal: f[25],
          ordinal: f[0],
        },
        mr: {
          cardinal: f[2],
          ordinal: f[47],
        },
        mt: {
          cardinal: f[26],
        },
        nah: {
          cardinal: f[0],
        },
        naq: {
          cardinal: f[19],
        },
        nb: {
          cardinal: f[0],
        },
        nd: {
          cardinal: f[0],
        },
        ne: {
          cardinal: f[0],
          ordinal: f[48],
        },
        nl: {
          cardinal: f[4],
        },
        nn: {
          cardinal: f[0],
        },
        nnh: {
          cardinal: f[0],
        },
        no: {
          cardinal: f[0],
        },
        nr: {
          cardinal: f[0],
        },
        nso: {
          cardinal: f[1],
        },
        ny: {
          cardinal: f[0],
        },
        nyn: {
          cardinal: f[0],
        },
        om: {
          cardinal: f[0],
        },
        or: {
          cardinal: f[0],
          ordinal: f[49],
        },
        os: {
          cardinal: f[0],
        },
        pa: {
          cardinal: f[1],
        },
        pap: {
          cardinal: f[0],
        },
        pl: {
          cardinal: f[27],
        },
        prg: {
          cardinal: f[23],
        },
        ps: {
          cardinal: f[0],
        },
        pt: {
          cardinal: f[28],
        },
        "pt-PT": {
          cardinal: f[4],
        },
        rm: {
          cardinal: f[0],
        },
        ro: {
          cardinal: f[25],
          ordinal: f[0],
        },
        rof: {
          cardinal: f[0],
        },
        ru: {
          cardinal: f[29],
        },
        rwk: {
          cardinal: f[0],
        },
        saq: {
          cardinal: f[0],
        },
        sc: {
          cardinal: f[4],
          ordinal: f[43],
        },
        scn: {
          cardinal: f[4],
          ordinal: f[43],
        },
        sd: {
          cardinal: f[0],
        },
        sdh: {
          cardinal: f[0],
        },
        se: {
          cardinal: f[19],
        },
        seh: {
          cardinal: f[0],
        },
        sh: {
          cardinal: f[7],
        },
        shi: {
          cardinal: f[30],
        },
        si: {
          cardinal: f[31],
        },
        sk: {
          cardinal: f[8],
        },
        sl: {
          cardinal: f[32],
        },
        sma: {
          cardinal: f[19],
        },
        smi: {
          cardinal: f[19],
        },
        smj: {
          cardinal: f[19],
        },
        smn: {
          cardinal: f[19],
        },
        sms: {
          cardinal: f[19],
        },
        sn: {
          cardinal: f[0],
        },
        so: {
          cardinal: f[0],
        },
        sq: {
          cardinal: f[0],
          ordinal: f[50],
        },
        sr: {
          cardinal: f[7],
        },
        ss: {
          cardinal: f[0],
        },
        ssy: {
          cardinal: f[0],
        },
        st: {
          cardinal: f[0],
        },
        sv: {
          cardinal: f[4],
          ordinal: f[51],
        },
        sw: {
          cardinal: f[4],
        },
        syr: {
          cardinal: f[0],
        },
        ta: {
          cardinal: f[0],
        },
        te: {
          cardinal: f[0],
        },
        teo: {
          cardinal: f[0],
        },
        ti: {
          cardinal: f[1],
        },
        tig: {
          cardinal: f[0],
        },
        tk: {
          cardinal: f[0],
          ordinal: f[52],
        },
        tl: {
          cardinal: f[13],
          ordinal: f[0],
        },
        tn: {
          cardinal: f[0],
        },
        tr: {
          cardinal: f[0],
        },
        ts: {
          cardinal: f[0],
        },
        tzm: {
          cardinal: f[33],
        },
        ug: {
          cardinal: f[0],
        },
        uk: {
          cardinal: f[29],
          ordinal: f[53],
        },
        ur: {
          cardinal: f[4],
        },
        uz: {
          cardinal: f[0],
        },
        ve: {
          cardinal: f[0],
        },
        vo: {
          cardinal: f[0],
        },
        vun: {
          cardinal: f[0],
        },
        wa: {
          cardinal: f[1],
        },
        wae: {
          cardinal: f[0],
        },
        xh: {
          cardinal: f[0],
        },
        xog: {
          cardinal: f[0],
        },
        yi: {
          cardinal: f[4],
        },
        zu: {
          cardinal: f[2],
        },
        lo: {
          ordinal: f[0],
        },
        ms: {
          ordinal: f[0],
        },
        vi: {
          ordinal: f[0],
        },
      };

      /***/
    },
    /* 14 */
    /***/ (module) => {
      "use strict";
      module.exports = JSON.parse(
        '{"ar":{"accessibility_checker_b3af1f6c":"?????????????? ???? ?????????????? ????????????","action_to_take_b626a99a":"?????????? ???????? ????????????:","add_a_caption_2a915239":"?????????? ?????????? ??????????????","add_alt_text_for_the_image_48cd88aa":"?????????? ???? ???????? ????????????","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"?????? ???? ???????? ?????????????? ?????????????????? ???????? ?????????? URL ???????????? ????????????.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"?????? ?????? ?????????? ???? ?????????? ?????????????? ???????? ???? 120 ??????????.","apply_781a2546":"??????????","change_alt_text_92654906":"?????????? ???????? ????????????","change_heading_tag_to_paragraph_a61e3113":"?????????? ?????????? ?????????????? ?????? ????????","change_text_color_1aecb912":"?????????? ?????? ????????","check_accessibility_3c78211c":"???????????? ???? ?????????????? ????????????","checking_for_accessibility_issues_fac18c6d":"???????????? ???? ?????????? ?????????????? ????????????","close_accessibility_checker_29d1c51e":"?????????? ?????????????? ???? ?????????????? ????????????","close_d634289d":"??????????","column_e1ae5c64":"????????","column_group_1c062368":"???????????? ????????????","decorative_image_fde98579":"???????? ??????????","element_starting_with_start_91bf4c3b":"???????? ???????? ???? { start }","fix_heading_hierarchy_f60884c4":"?????????? ???????? ??????????????","format_as_a_list_142210c3":"?????????????? ???? ???????? ??????????","header_column_f27433cb":"???????? ??????????","header_row_and_column_ec5b9ec":"???? ?????????? ??????????","header_row_f33eb169":"???? ??????????","heading_levels_should_not_be_skipped_3947c0e0":"?????? ?????? ?????? ?????????? ?????????????? ??????????????.","heading_starting_with_start_42a3e7f9":"???????? ?????????????? ???? { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"?????? ?????? ?????????? ???????????????? ???????? ???? 120 ??????????.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"?????? ?????? ?????? ?????????????? ?????????? ?????????? ?????????? ???????? ???????????? ???????? ?????????? ????????????.","image_with_filename_file_aacd7180":"???????? ???????? ?????????? { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"?????? ???? ?????????? ?????????? ?????? ?????????? ?????? ?????????? ????????????.","issue_num_total_f94536cf":"?????????? { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"?????????? ?????????? ???????????????? ?????? ?????????????? ???????????????? ?????????????? Tab. ???????? ???? ???????? ???????????? ???????????????? ???????????? ?????? ?????? ???????????? ???? ?????????? ?????????????? ???????? ????????????????.","learn_more_about_adjacent_links_2cb9762c":"?????????? ???????????? ???? ???????????????????? ??????????????????","learn_more_about_color_contrast_c019dfb9":"?????????? ???????????? ???? ?????????? ??????????","learn_more_about_organizing_page_headings_8a7caa2e":"?????????? ???????????? ???? ?????????? ???????????? ??????????????","learn_more_about_table_headers_5f5ee13":"?????????? ???????????? ???? ???????? ??????????????","learn_more_about_using_alt_text_for_images_5698df9a":"?????????? ???????????? ???? ?????????????? ???????? ???????????? ??????????","learn_more_about_using_captions_with_tables_36fe496f":"?????????? ???????????? ???? ?????????????? ???????????????? ?????????????????? ???? ??????????????","learn_more_about_using_filenames_as_alt_text_264286af":"?????????? ???????????? ???? ?????????????? ?????????? ?????????????? ?????????? ??????????","learn_more_about_using_lists_4e6eb860":"?????????? ???????????? ???? ?????????????? ??????????????","learn_more_about_using_scope_attributes_with_table_20df49aa":"?????????? ???????????? ???? ?????????????? ???????? ???????????? ???? ??????????????","leave_as_is_4facfe55":"?????? ?????? ????","link_with_text_starting_with_start_b3fcbe71":"???????? ?????? ???????? ???? { start }","lists_should_be_formatted_as_lists_f862de8d":"?????? ?????????? ?????????????? ???? ???????? ??????????","merge_links_2478df96":"?????? ??????????????","next_40e12421":"????????????","no_accessibility_issues_were_detected_f8d3c875":"???? ?????? ?????????? ???? ?????????? ?????????????? ????????????.","no_headers_9bc7dc7f":"?????? ????????","none_3b5e34d2":"??????","paragraph_starting_with_start_a59923f8":"???????? ???????? ???? { start }","prev_f82cbc48":"????????????","remove_heading_style_5fdc8855":"?????????? ?????? ??????????????","row_fc0944a7":"????","row_group_979f5528":"???????????? ????????","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"???? ???????? ?????????????? ???????????? ?????????? ?????????????? ???? ???????? ???????? ???? ???????? ?????? ???????????? ???????? ?????????? ?????????????? ?????????? ?????? ???????? ???? ?????????????? ?????????????? ???????? ???? ?????? ???????????? ???? ????????????.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"???? ???????? ?????????????? ???????????? ?????????? ?????????????? ???? ???????? ???????? ???? ???????? ?????? ?????????? ???????????? ??????????????. ?????? ???? ???????? ???????? ???????????? ???????????? ??????????????.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"???? ???????? ?????????????? ???????????? ?????????? ?????????????? ???? ???????? ???????? ???? ???????? ?????? ?????????? ???????????? ??????????????.","screen_readers_cannot_interpret_tables_without_the_bd861652":"???? ???????? ?????????????? ???????????? ?????????? ?????????????? ???????? ???????? ????????????. ???????? ???????? ???????????? ?????????????? ?????????????? ??????????????.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"???? ???????? ?????????????? ???????????? ?????????? ?????????????? ???????? ???????? ????????????. ?????? ???????????????? ?????????????????? ???????????? ???????????? ???????????? ?????????? ????????????.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"???? ???????? ?????????????? ???????????? ?????????? ?????????????? ???????? ???????? ????????????. ???????? ???????? ???????????? ?????????????? ?????????? ???????? ?????? ??????????????.","set_header_scope_8c548f40":"?????????? ???????? ??????????","set_table_header_cfab13a0":"?????????? ?????? ????????????","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"?????????? ???????????????????? ?????????? ?????????????? ?????????????? ?????? ?????????????? ?????????? ?????????? ???????? ?????????? ?????????? ???? ???????????? ?????????? ???? ?????? ????????. ???????????? ?????????????? ?????????? ???????????? ?????? ???????????? ???????? ????????????. ?????? ???? ???????? ???????????? ???????????? ????????????????.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"?????????? ???????????????????? ?????????? ?????????????? ?????????????? ?????? ?????????????? ?????????? ?????????? ???????? ?????????? ?????????? ???? ???????????? ?????????? ???? ?????? ????????. ???????????? ?????????????? ?????????? ???????????? ?????? ???????????? ???????? ????????????. ?????? ???? ???????? ???????????? ?????????? ???? ???????? ???????????? ????????????????.","table_header_starting_with_start_ffcabba6":"???????? ?????? ???????????? ???? { start }","table_starting_with_start_e7232848":"???????? ???????????? ???? { start }","tables_headers_should_specify_scope_5abf3a8e":"?????? ???? ???????? ???????? ?????????????? ????????????.","tables_should_include_a_caption_describing_the_con_e91e78fc":"?????? ???? ?????????? ?????????????? ?????????? ?????????????? ?????? ?????????????? ????????????.","tables_should_include_at_least_one_header_48779eac":"?????? ???? ?????????? ?????????????? ?????????? ???????????? ?????? ??????????.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"???????? ?????????? ???????? ???????? ???????? ?????????? ?????????? ?????? ???????? ?????????????????? ?????????? ?????? ???????????? ???? ?????? ????????????.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"?????? ???? ???????? ???????? ???????????? ???? 18 ???????? (???? 14 ???????? ?????? ????????) ???????? ?????????? ???? ?????? ???? 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"?????? ???? ???????? ???????? ???????????? ???? 18 ???????? (???? 14 ???????? ?????? ????????) ???????? ?????????? ???? ?????? ???? 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"?????? ?????????????? ?????????????? ???????? ???????? ?????????????? ???? ???????? ??????????  ???????????? ???? ???????? ?????? ?????????? ???????????????? ?????? ?????????? ???????????????????? ?????????? ???? ???????????? ?????? ??????????????????.","why_523b3d8c":"??????????"},"cy":{"accessibility_checker_b3af1f6c":"Gwiriwr Hygyrchedd","action_to_take_b626a99a":"Cam gweithredu i\'\'w gymryd:","add_a_caption_2a915239":"Ychwanegu capsiwn","add_alt_text_for_the_image_48cd88aa":"Ychwanegu testun amgen ar gyfer y ddelwedd","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Dylai dolenni cyfagos ?????r un URL fod yn un ddolen.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Ni ddylai testun priodoli gynnwys mwy na 120 nod.","apply_781a2546":"Rhoi ar waith","change_alt_text_92654906":"Newid testun amgen","change_heading_tag_to_paragraph_a61e3113":"Newid tag y pennawd yn baragraff","change_text_color_1aecb912":"Newid lliw\'\'r testun","check_accessibility_3c78211c":"Gwirio Hygyrchedd","checking_for_accessibility_issues_fac18c6d":"Wrthi???n chwilio am broblemau o ran hygyrchedd","close_accessibility_checker_29d1c51e":"Cau\'\'r Gwiriwr Hygyrchedd","close_d634289d":"Cau","column_e1ae5c64":"Colofn","column_group_1c062368":"Gr??p y golofn","decorative_image_fde98579":"Delwedd addurniadol","element_starting_with_start_91bf4c3b":"Elfen yn dechrau gyda { start }","fix_heading_hierarchy_f60884c4":"Pennu hierarchaeth penawdau","format_as_a_list_142210c3":"Fformatio ar ffurf rhestr","header_column_f27433cb":"Colofn y pennawd","header_row_and_column_ec5b9ec":"Colofn a rhes y pennawd","header_row_f33eb169":"Rhes y pennawd","heading_levels_should_not_be_skipped_3947c0e0":"Ni ddylid anwybyddu lefelau penawdau.","heading_starting_with_start_42a3e7f9":"Pennawd yn dechrau gyda { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Ni ddylai penawdau gynnwys mwy na 120 nod.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Ni ddylid defnyddio enwau ffeiliau delweddau fel y nodwedd amgen wrth ddisgrifio cynnwys delweddau.","image_with_filename_file_aacd7180":"Delwedd ?????r enw ffeil { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Dylai delweddau gynnwys nodwedd amgen sy???n disgrifio cynnwys y ddelwedd.","issue_num_total_f94536cf":"Problem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Mae bysellfyrddau???n symud i ddolenni drwy ddefnyddio???r fysell ???Tab???. Gall dwy ddolen gyfagos ??\'\'r un gyrchfan fod yn ddryslyd i ddefnyddwyr bysellfyrddau.","learn_more_about_adjacent_links_2cb9762c":"Dysgu mwy am ddolenni cyfagos","learn_more_about_color_contrast_c019dfb9":"Dysgu mwy am gyferbynnedd lliw","learn_more_about_organizing_page_headings_8a7caa2e":"Dysgu mwy am drefnu penawdau tudalennau","learn_more_about_table_headers_5f5ee13":"Dysgu mwy am benawdau tablau","learn_more_about_using_alt_text_for_images_5698df9a":"Dysgu mwy am ddefnyddio testun amgen ar gyfer delweddau","learn_more_about_using_captions_with_tables_36fe496f":"Dysgu mwy am ddefnyddio capsiynau gyda thablau","learn_more_about_using_filenames_as_alt_text_264286af":"Dysgu mwy am ddefnyddio enwau ffeiliau fel testun amgen","learn_more_about_using_lists_4e6eb860":"Dysgu mwy am ddefnyddio rhestrau","learn_more_about_using_scope_attributes_with_table_20df49aa":"Dysgu mwy am ddefnyddio priodoleddau cwmpas gyda thablau","leave_as_is_4facfe55":"Gadael fel y mae","link_with_text_starting_with_start_b3fcbe71":"Dolen ?? thestun yn dechrau gyda { start }","lists_should_be_formatted_as_lists_f862de8d":"Dylai rhestrau gael eu fformatio ar ffurf rhestrau.","merge_links_2478df96":"Cyfuno dolenni","next_40e12421":"Nesaf","no_accessibility_issues_were_detected_f8d3c875":"Heb ganfod problemau o ran hygyrchedd.","no_headers_9bc7dc7f":"Dim pennawd","none_3b5e34d2":"Dim","paragraph_starting_with_start_a59923f8":"Paragraff yn dechrau gyda { start }","prev_f82cbc48":"Blaenorol","remove_heading_style_5fdc8855":"Tynnu arddull y pennawd","row_fc0944a7":"Rhes","row_group_979f5528":"Gr??p y rhes","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Does dim modd defnyddio darllenwyr sgrin i bennu beth sy???n cael ei ddangos mewn delwedd heb destun amgen, dim ond rhesi o rifau a llythrennau diystyr yw enwau ffeiliau yn aml, ac nid ydynt yn disgrifio\'\'r cyd-destun na???r ystyr.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Does dim modd i ddarllenwyr sgrin bennu beth sy???n cael ei ddangos mewn delwedd heb destun amgen, sy???n disgrifio cynnwys ac ystyr y ddelwedd. Dylai???r testun amgen fod ym syml ac yn gryno.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Does dim modd i ddarllenwyr sgrin bennu beth sy???n cael ei ddangos mewn delwedd heb destun amgen, sy???n disgrifio cynnwys ac ystyr y ddelwedd.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Ni all darllenwyr sgrin ddehongli tablau heb y strwythur priodol. Mae penawdau tablau yn nodi cyfeiriad ac ystod y cynnwys.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Ni all darllenwyr sgrin ddehongli tablau heb y strwythur priodol. Mae capsiynau tablau???n disgrifio cyd-destun y tabl ac yn rhoi dealltwriaeth gyffredinol ohono.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Ni all darllenwyr sgrin ddehongli tablau heb y strwythur priodol. Mae penawdau tablau yn rhoi trosolwg o???r cynnwys a???i gyfeiriad.","set_header_scope_8c548f40":"Pennu ystod y pennawd","set_table_header_cfab13a0":"Pennu pennawd y tabl","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Mae defnyddwyr sy\'\'n gweld yn dda yn pori drwy dudalennau gwe yn gyflym, gan chwilio am benawdau mawr neu drwm. Mae defnyddwyr darllenwyr sgrin yn dibynnu ar benawdau i ddeall y cyd-destun. Dylai penawdau ddefnyddio\'\'r strwythur priodol.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Mae defnyddwyr sy\'\'n gweld yn dda yn pori drwy dudalennau gwe yn gyflym, gan chwilio am benawdau mawr neu drwm. Mae defnyddwyr darllenydd sgrin yn dibynnu ar benawdau i ddeall y cyd-destun. Dylai penawdau fod yn gryno yn unol ??\'\'r strwythur priodol.","table_header_starting_with_start_ffcabba6":"Pennawd tabl yn dechrau gyda { start }","table_starting_with_start_e7232848":"Tabl yn dechrau gyda { start }","tables_headers_should_specify_scope_5abf3a8e":"Dylai penawdau tablau bennu???r ystod.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Dylai tablau gynnwys capsiwn sy???n disgrifio cynnwys y tabl.","tables_should_include_at_least_one_header_48779eac":"Dylai tablau gynnwys o leiaf un pennawd.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Mae???r testun yn anodd ei ddarllen heb gyferbynnedd digonol rhwng y testun a???r cefndir, yn enwedig i bobl sydd ?? golwg s??l.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Dylai testun mwy na 18pt (neu 14pt trwm) fod ?? chyferbyniad 3:1 o leiaf.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Dylai testun llai na 18pt (neu 14pt trwm) fod ?? chyferbyniad 4.5:1 o leiaf.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Pan fydd marcio???n cael ei ddefnyddio, sy???n fformatio eitemau???n weledol ar ffurf rhestr ond sydd ddim yn nodi perthynas y rhestr, mae???n bosib y bydd defnyddwyr yn cael trafferth i ddod o hyd i???r wybodaeth.","why_523b3d8c":"Pam"},"da-x-k12":{"accessibility_checker_b3af1f6c":"Tilg??gelighedskontrol","action_to_take_b626a99a":"Handling, der skal tages:","add_a_caption_2a915239":"Tilf??j billedtekst","add_alt_text_for_the_image_48cd88aa":"Tilf??j alternativ tekst til billedet","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Tilst??dende links med samme URL skal v??re et enkelt link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alternativ attributtekst m?? ikke indeholde mere end 120 tegn.","apply_781a2546":"Tildel","change_alt_text_92654906":"Skift alternativ tekst","change_heading_tag_to_paragraph_a61e3113":"Skift overskrift-tag til afsnit","change_text_color_1aecb912":"Skift tekstfarve","check_accessibility_3c78211c":"Kontroller tilg??ngelighed","checking_for_accessibility_issues_fac18c6d":"Kontrollerer tilg??ngelighedsproblemer","close_accessibility_checker_29d1c51e":"Luk tilg??gelighedskontrol","close_d634289d":"Luk","column_e1ae5c64":"Kolonne","column_group_1c062368":"Kolonnegruppe","decorative_image_fde98579":"Dekorativt billede","element_starting_with_start_91bf4c3b":"Element begynder med { start }","fix_heading_hierarchy_f60884c4":"Ret overskriftshierarki","format_as_a_list_142210c3":"Listeformat","header_column_f27433cb":"Overskriftskolonne","header_row_and_column_ec5b9ec":"Overskriftsr??kke- og kolonne","header_row_f33eb169":"Overskriftsr??kke","heading_levels_should_not_be_skipped_3947c0e0":"Overskriftsniveauer b??r ikke springes over.","heading_starting_with_start_42a3e7f9":"Overskrift, der starter med { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Overskrifter m?? ikke indeholde mere end 120 tegn.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Billedfilnavne b??r ikke bruges som den alternative attribut, der beskriver billedindholdet.","image_with_filename_file_aacd7180":"Billede med filnavn { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Billeder skal indeholde en alternativ attribut, der beskriver billedindholdet.","issue_num_total_f94536cf":"Udstedelse { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tastaturer navigerer til links ved hj??lp af Tab-tasten. To tilst??dende links, der f??rer til samme destination, kan v??re forvirrende for tastaturbrugere.","learn_more_about_adjacent_links_2cb9762c":"F?? mere at vide om tilst??dende links","learn_more_about_color_contrast_c019dfb9":"F?? mere at vide om farvekontrast","learn_more_about_organizing_page_headings_8a7caa2e":"F?? mere at vide om at organisere sideoverskrifter","learn_more_about_table_headers_5f5ee13":"F?? mere at vide om tabeloverskrifter","learn_more_about_using_alt_text_for_images_5698df9a":"F?? mere at vide om at bruge alt-tekst til billeder","learn_more_about_using_captions_with_tables_36fe496f":"F?? mere at vide om brug af billedtekster med tabeller","learn_more_about_using_filenames_as_alt_text_264286af":"F?? mere at vide om at bruge filnavne som alt-tekst","learn_more_about_using_lists_4e6eb860":"F?? mere at vide om at bruge lister","learn_more_about_using_scope_attributes_with_table_20df49aa":"F?? mere at vide om at bruge anvendelsesomr??de-attributter med tabeller","leave_as_is_4facfe55":"Lad det v??re, som det er","link_with_text_starting_with_start_b3fcbe71":"Link med tekst, der begynder med { start }","lists_should_be_formatted_as_lists_f862de8d":"Lister skal have listeformat.","merge_links_2478df96":"Sammenl??g links","next_40e12421":"N??ste","no_accessibility_issues_were_detected_f8d3c875":"Der blev ikke fundet nogen tilg??ngelighedsproblemer.","no_headers_9bc7dc7f":"Ingen overskrifter","none_3b5e34d2":"Ingen","paragraph_starting_with_start_a59923f8":"Paragraf begynder med { start }","prev_f82cbc48":"Forrige","remove_heading_style_5fdc8855":"Fjern overskriftsstil","row_fc0944a7":"R??kke","row_group_979f5528":"R??kkegruppe","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Sk??rml??sere kan ikke bestemme, hvad der vises i et billede uden alternativ tekst, og filnavne er ofte en meningsl??s r??kke tal og bogstaver, der ikke beskriver konteksten eller betydningen.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Sk??rml??sere kan ikke bestemme, hvad der vises i et billede uden alternativ tekst, der beskriver billedets indhold og betydning. Alternativ tekst skal v??re enkel og kortfattet.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Sk??rml??sere kan ikke bestemme, hvad der vises i et billede uden alternativ tekst, der beskriver billedets indhold og betydning.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Sk??rml??sere kan ikke fortolke tabeller uden den rette struktur. Tabeloverskrifter giver en ide om indholdet og dets omfang.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Sk??rml??sere kan ikke fortolke tabeller uden den rette struktur. Tabelbetegnelser beskriver tabellens kontekst og generelle indhold.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Sk??rml??sere kan ikke fortolke tabeller uden den rette struktur. Tabeloverskrifter giver en ide om indholdet og en oversigt over det.","set_header_scope_8c548f40":"Indstil overskriftens omfang","set_table_header_cfab13a0":"Indstil tabellens overskrift","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Brugere, der er i stand til at se, gennemser websider hurtigt og leder efter store overskrifter. Sk??rml??sere er afh??ngige af overskrifter for kontekstuel forst??else. Overskrifter b??r anvende den rigtige struktur.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Brugere, der er i stand til at se, gennemser websider hurtigt og leder efter store overskrifter. Sk??rml??sere er afh??ngige af overskrifter for kontekstuel forst??else. Overskrifter b??r v??re kortfattede inden for den rigtige struktur.","table_header_starting_with_start_ffcabba6":"Tabeloverskrift, der starter med { start }","table_starting_with_start_e7232848":"Tabel, der starter med { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabeloverskrifter skal angive omfang.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabeller skal indeholde en billedtekst, der beskriver tabellens indhold.","tables_should_include_at_least_one_header_48779eac":"Tabeller skal indeholde mindst et overskrift.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Tekst er vanskelig at l??se uden tilstr??kkelig kontrast mellem tekst og baggrund, is??r for personer med d??rligt syn.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Tekst st??rre end 18pt (eller fed 14pt) skal have et kontrastforhold p?? mindst 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Tekst mindre end 18pt (eller fed 14pt) skal have et kontrastforhold p?? mindst 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"N??r der anvendes fremh??velse, der visuelt formaterer elementer i listeform, men som ikke angiver listeforholdet, kan brugere have sv??rt ved at navigere gennem oplysningerne.","why_523b3d8c":"Hvorfor"},"da":{"accessibility_checker_b3af1f6c":"Tilg??gelighedskontrol","action_to_take_b626a99a":"Handling, der skal tages:","add_a_caption_2a915239":"Tilf??j billedtekst","add_alt_text_for_the_image_48cd88aa":"Tilf??j alternativ tekst til billedet","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Tilst??dende links med samme URL skal v??re et enkelt link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alternativ attributtekst m?? ikke indeholde mere end 120 tegn.","apply_781a2546":"Tildel","change_alt_text_92654906":"Skift alternativ tekst","change_heading_tag_to_paragraph_a61e3113":"Skift overskrift-tag til afsnit","change_text_color_1aecb912":"Skift tekstfarve","check_accessibility_3c78211c":"Kontroller tilg??ngelighed","checking_for_accessibility_issues_fac18c6d":"Kontrollerer tilg??ngelighedsproblemer","close_accessibility_checker_29d1c51e":"Luk tilg??gelighedskontrol","close_d634289d":"Luk","column_e1ae5c64":"Kolonne","column_group_1c062368":"Kolonnegruppe","decorative_image_fde98579":"Dekorativt billede","element_starting_with_start_91bf4c3b":"Element begynder med { start }","fix_heading_hierarchy_f60884c4":"Ret overskriftshierarki","format_as_a_list_142210c3":"Listeformat","header_column_f27433cb":"Overskriftskolonne","header_row_and_column_ec5b9ec":"Overskriftsr??kke- og kolonne","header_row_f33eb169":"Overskriftsr??kke","heading_levels_should_not_be_skipped_3947c0e0":"Overskriftsniveauer b??r ikke springes over.","heading_starting_with_start_42a3e7f9":"Overskrift, der starter med { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Overskrifter m?? ikke indeholde mere end 120 tegn.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Billedfilnavne b??r ikke bruges som den alternative attribut, der beskriver billedindholdet.","image_with_filename_file_aacd7180":"Billede med filnavn { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Billeder skal indeholde en alternativ attribut, der beskriver billedindholdet.","issue_num_total_f94536cf":"Udstedelse { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tastaturer navigerer til links ved hj??lp af Tab-tasten. To tilst??dende links, der f??rer til samme destination, kan v??re forvirrende for tastaturbrugere.","learn_more_about_adjacent_links_2cb9762c":"F?? mere at vide om tilst??dende links","learn_more_about_color_contrast_c019dfb9":"F?? mere at vide om farvekontrast","learn_more_about_organizing_page_headings_8a7caa2e":"F?? mere at vide om at organisere sideoverskrifter","learn_more_about_table_headers_5f5ee13":"F?? mere at vide om tabeloverskrifter","learn_more_about_using_alt_text_for_images_5698df9a":"F?? mere at vide om at bruge alt-tekst til billeder","learn_more_about_using_captions_with_tables_36fe496f":"F?? mere at vide om brug af billedtekster med tabeller","learn_more_about_using_filenames_as_alt_text_264286af":"F?? mere at vide om at bruge filnavne som alt-tekst","learn_more_about_using_lists_4e6eb860":"F?? mere at vide om at bruge lister","learn_more_about_using_scope_attributes_with_table_20df49aa":"F?? mere at vide om at bruge anvendelsesomr??de-attributter med tabeller","leave_as_is_4facfe55":"Lad det v??re, som det er","link_with_text_starting_with_start_b3fcbe71":"Link med tekst, der begynder med { start }","lists_should_be_formatted_as_lists_f862de8d":"Lister skal have listeformat.","merge_links_2478df96":"Sammenl??g links","next_40e12421":"N??ste","no_accessibility_issues_were_detected_f8d3c875":"Der blev ikke fundet nogen tilg??ngelighedsproblemer.","no_headers_9bc7dc7f":"Ingen overskrifter","none_3b5e34d2":"Ingen","paragraph_starting_with_start_a59923f8":"Paragraf begynder med { start }","prev_f82cbc48":"Forrige","remove_heading_style_5fdc8855":"Fjern overskriftsstil","row_fc0944a7":"R??kke","row_group_979f5528":"R??kkegruppe","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Sk??rml??sere kan ikke bestemme, hvad der vises i et billede uden alternativ tekst, og filnavne er ofte en meningsl??s r??kke tal og bogstaver, der ikke beskriver konteksten eller betydningen.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Sk??rml??sere kan ikke bestemme, hvad der vises i et billede uden alternativ tekst, der beskriver billedets indhold og betydning. Alternativ tekst skal v??re enkel og kortfattet.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Sk??rml??sere kan ikke bestemme, hvad der vises i et billede uden alternativ tekst, der beskriver billedets indhold og betydning.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Sk??rml??sere kan ikke fortolke tabeller uden den rette struktur. Tabeloverskrifter giver en ide om indholdet og dets omfang.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Sk??rml??sere kan ikke fortolke tabeller uden den rette struktur. Tabelbetegnelser beskriver tabellens kontekst og generelle indhold.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Sk??rml??sere kan ikke fortolke tabeller uden den rette struktur. Tabeloverskrifter giver en ide om indholdet og en oversigt over det.","set_header_scope_8c548f40":"Indstil overskriftens omfang","set_table_header_cfab13a0":"Indstil tabellens overskrift","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Brugere, der er i stand til at se, gennemser websider hurtigt og leder efter store overskrifter. Sk??rml??sere er afh??ngige af overskrifter for kontekstuel forst??else. Overskrifter b??r anvende den rigtige struktur.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Brugere, der er i stand til at se, gennemser websider hurtigt og leder efter store overskrifter. Sk??rml??sere er afh??ngige af overskrifter for kontekstuel forst??else. Overskrifter b??r v??re kortfattede inden for den rigtige struktur.","table_header_starting_with_start_ffcabba6":"Tabeloverskrift, der starter med { start }","table_starting_with_start_e7232848":"Tabel, der starter med { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabeloverskrifter skal angive omfang.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabeller skal indeholde en billedtekst, der beskriver tabellens indhold.","tables_should_include_at_least_one_header_48779eac":"Tabeller skal indeholde mindst et overskrift.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Tekst er vanskelig at l??se uden tilstr??kkelig kontrast mellem tekst og baggrund, is??r for personer med d??rligt syn.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Tekst st??rre end 18pt (eller fed 14pt) skal have et kontrastforhold p?? mindst 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Tekst mindre end 18pt (eller fed 14pt) skal have et kontrastforhold p?? mindst 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"N??r der anvendes fremh??velse, der visuelt formaterer elementer i listeform, men som ikke angiver listeforholdet, kan brugere have sv??rt ved at navigere gennem oplysningerne.","why_523b3d8c":"Hvorfor"},"de":{"accessibility_checker_b3af1f6c":"Zugangskontrolle","action_to_take_b626a99a":"Auszuf??hrende T??tigkeiten:","add_a_caption_2a915239":"Eine Beschriftung hinzuf??gen","add_alt_text_for_the_image_48cd88aa":"Alternativen Text f??r das Bild hinzuf??gen","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Nebenstehende Links mit dem gleichen URL sollten ein einziger Link sein.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Der alternative Text sollte nicht l??nger als 120??Zeichen sein.","apply_781a2546":"Anwenden","change_alt_text_92654906":"Alt. Text ??ndern","change_heading_tag_to_paragraph_a61e3113":"??berschrifts-Tag zu Absatz ??ndern","change_text_color_1aecb912":"Textfarbe ??ndern","check_accessibility_3c78211c":"Zug??nglichkeit pr??fen","checking_for_accessibility_issues_fac18c6d":"Zugangsprobleme werden ??berpr??ft","close_accessibility_checker_29d1c51e":"Zugangspr??fung schlie??en","close_d634289d":"Schlie??en","column_e1ae5c64":"Spalte","column_group_1c062368":"Spaltengruppe","decorative_image_fde98579":"Dekoratives Bild","element_starting_with_start_91bf4c3b":"Element beginnt mit { start }","fix_heading_hierarchy_f60884c4":"Feste ??berschriftshierarchie","format_as_a_list_142210c3":"Format als Liste","header_column_f27433cb":"??berschrift Spalte","header_row_and_column_ec5b9ec":"??berschrift Zeile und Spalte","header_row_f33eb169":"??berschrift Zeile","heading_levels_should_not_be_skipped_3947c0e0":"Die ??berschriftsebene darf nicht ??bersprungen werden.","heading_starting_with_start_42a3e7f9":"??berschrift beginnt mit { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"??berschriften d??rfen nicht l??nger als 120??Zeichen sein.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Bilddateinamen d??rfen f??r das Alt-Attribut zur Beschreibung des Bildinhalts nicht verwendet werden.","image_with_filename_file_aacd7180":"Bild mit dem Dateinamen { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Bilder m??ssen ein Alt-Attribut zur Beschreibung des Bildinhalts haben.","issue_num_total_f94536cf":"Fehler { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tastaturnavigation zu Links mithilfe der Tabulatortaste. Zwei benachbarte Links, die direkt zum gleichen Ziel f??hren, k??nnen f??r den Tastaturbenutzer verwirrend sein.","learn_more_about_adjacent_links_2cb9762c":"Weitere Informationen ??ber nebenstehende Links","learn_more_about_color_contrast_c019dfb9":"Weitere Informationen ??ber Farbkontrast","learn_more_about_organizing_page_headings_8a7caa2e":"Weitere Informationen ??ber das Organisieren der Seiten??berschriften","learn_more_about_table_headers_5f5ee13":"Weitere Informationen ??ber Tabellenkopfzeilen","learn_more_about_using_alt_text_for_images_5698df9a":"Weitere Informationen zur Verwendung von alternativem Text f??r Bilder","learn_more_about_using_captions_with_tables_36fe496f":"Weitere Informationen zur Verwendung von Tabellenbeschriftungen","learn_more_about_using_filenames_as_alt_text_264286af":"Weitere Informationen zur Verwendung von Dateinamen als alternativen Text","learn_more_about_using_lists_4e6eb860":"Weitere Informationen zur Verwendung von Listen","learn_more_about_using_scope_attributes_with_table_20df49aa":"Weitere Informationen zur Verwendung von Bereichsattributen bei Tabellen","leave_as_is_4facfe55":"Lassen, wie es ist","link_with_text_starting_with_start_b3fcbe71":"Link mit Text, beginnend mit { start }","lists_should_be_formatted_as_lists_f862de8d":"Listen sollten als Listen formatiert werden.","merge_links_2478df96":"Links zusammenf??hren","next_40e12421":"Weiter","no_accessibility_issues_were_detected_f8d3c875":"Es wurden keine Zugangsprobleme festgestellt.","no_headers_9bc7dc7f":"Keine Header","none_3b5e34d2":"Keine","paragraph_starting_with_start_a59923f8":"Absatz, beginnend mit { start }","prev_f82cbc48":"Vorher","remove_heading_style_5fdc8855":"??berschriftsstil entfernen","row_fc0944a7":"Zeile","row_group_979f5528":"Zeilengruppe","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Ohne alternativen Text kann ein Bildschirmbetrachter nicht bestimmen, was auf einem Bild gezeigt wird, zumal die Dateinamen oft sinnlose Zeichenfolgen aus Zahlen und Buchstaben sind, die weder den Kontext noch die Bedeutung erl??utern.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Ohne alternativen Text, der den Kontext und die Bedeutung erl??utert, kann ein Bildschirmbetrachter nicht bestimmen, was auf einem Bild gezeigt wird. Alternativer Text sollte einfach und pr??zise sein.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Ohne alternativen Text, der den Kontext und die Bedeutung erl??utert, kann ein Bildschirmbetrachter nicht bestimmen, was auf einem Bild gezeigt wird.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Bildschirmbetrachter k??nnen Tabellen ohne die entsprechende Struktur nicht interpretieren. Tabellen??berschriften liefern die Richtung und den Anwendungsbereich des Inhalts.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Bildschirmbetrachter k??nnen Tabellen ohne die entsprechende Struktur nicht interpretieren. Tabellenbeschriftungen beschreiben den Kontext und die allgemeine Bedeutung der Tabelle.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Bildschirmbetrachter k??nnen Tabellen ohne die entsprechende Struktur nicht interpretieren. Tabellen??berschriften weisen die Richtung und geben eine ??bersicht ??ber den Inhalt.","set_header_scope_8c548f40":"Den Anwendungsbereich der ??berschrift festlegen","set_table_header_cfab13a0":"Tabellen??berschrift festlegen","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Sehende Benutzer durchsuchen Webseiten schnell nach gro??- oder fettgedruckten ??berschriften. Benutzer von Bildschirmbetrachtern sind f??r ein kontextbezogenes Verst??ndnis auf ??berschriften angewiesen. ??berschriften sollten die entsprechende Struktur verwenden.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Sehende Benutzer durchsuchen Webseiten schnell nach gro??- oder fettgedruckten ??berschriften. Benutzer von Bildschirmbetrachtern sind f??r ein kontextbezogenes Verst??ndnis auf ??berschriften angewiesen. ??berschriften sollten die entsprechende Struktur knapp wiedergeben.","table_header_starting_with_start_ffcabba6":"Tabellen??berschriften, beginnend mit { start }","table_starting_with_start_e7232848":"Tabelle, beginnend mit { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabellen??berschriften sollten den Geltungsbereich angeben.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabellen sollten ??ber eine Bildunterschrift verf??gen, die den Inhalt der Tabelle beschreibt.","tables_should_include_at_least_one_header_48779eac":"Tabellen sollten mindestens eine ??berschrift haben.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Der Text ist, insbesondere f??r Menschen mit Sehschw??che, schwer zu lesen, wenn der Kontrast zwischen Text und Hintergrund nicht ausreicht.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Text, der gr????er als 18??Punkte ist (bei Fettdruck 14??Punkte), sollte einen Mindestkontrastverh??ltnis von 3:1 haben.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Text, der kleiner als 18??Punkte ist (bei Fettdruck 14??Punkte), sollte einen Mindestkontrastverh??ltnis von 4,5:1 haben.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Wenn Markup verwendet wird, das die Elemente optisch als Liste formatiert, die Listenbeziehung jedoch nicht zeigt, haben Benutzer m??glicherweise Schwierigkeiten, in diesen Informationen zu navigieren.","why_523b3d8c":"Warum?"},"en-AU":{"accessibility_checker_b3af1f6c":"Accessibility Checker","action_to_take_b626a99a":"Action to take:","add_a_caption_2a915239":"Add a caption","add_alt_text_for_the_image_48cd88aa":"Add alt text for the image","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Adjacent links with the same URL should be a single link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt attribute text should not contain more than 120 characters.","apply_781a2546":"Apply","change_alt_text_92654906":"Change alt text","change_heading_tag_to_paragraph_a61e3113":"Change heading tag to paragraph","change_text_color_1aecb912":"Change text colour","check_accessibility_3c78211c":"Check Accessibility","checking_for_accessibility_issues_fac18c6d":"Checking for accessibility issues","close_accessibility_checker_29d1c51e":"Close Accessibility Checker","close_d634289d":"Close","column_e1ae5c64":"Column","column_group_1c062368":"Column group","decorative_image_fde98579":"Decorative image","element_starting_with_start_91bf4c3b":"Element starting with { start }","fix_heading_hierarchy_f60884c4":"Fix heading hierarchy","format_as_a_list_142210c3":"Format as a list","header_column_f27433cb":"Header column","header_row_and_column_ec5b9ec":"Header row and column","header_row_f33eb169":"Header row","heading_levels_should_not_be_skipped_3947c0e0":"Heading levels should not be skipped.","heading_starting_with_start_42a3e7f9":"Heading starting with { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Headings should not contain more than 120 characters.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Image filenames should not be used as the alt attribute describing the image content.","image_with_filename_file_aacd7180":"Image with filename { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Images should include an alt attribute describing the image content.","issue_num_total_f94536cf":"Issue { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Keyboards navigate to links using the Tab key. Two adjacent links that direct to the same destination can be confusing to keyboard users.","learn_more_about_adjacent_links_2cb9762c":"Learn more about adjacent links","learn_more_about_color_contrast_c019dfb9":"Learn more about colour contrast","learn_more_about_organizing_page_headings_8a7caa2e":"Learn more about organising page headings","learn_more_about_table_headers_5f5ee13":"Learn more about table headers","learn_more_about_using_alt_text_for_images_5698df9a":"Learn more about using alt text for images","learn_more_about_using_captions_with_tables_36fe496f":"Learn more about using captions with tables","learn_more_about_using_filenames_as_alt_text_264286af":"Learn more about using filenames as alt text","learn_more_about_using_lists_4e6eb860":"Learn more about using lists","learn_more_about_using_scope_attributes_with_table_20df49aa":"Learn more about using scope attributes with tables","leave_as_is_4facfe55":"Leave as is","link_with_text_starting_with_start_b3fcbe71":"Link with text starting with { start }","lists_should_be_formatted_as_lists_f862de8d":"Lists should be formatted as lists.","merge_links_2478df96":"Merge links","next_40e12421":"Next","no_accessibility_issues_were_detected_f8d3c875":"No accessibility issues were detected.","no_headers_9bc7dc7f":"No headers","none_3b5e34d2":"None","paragraph_starting_with_start_a59923f8":"Paragraph starting with { start }","prev_f82cbc48":"Prev","remove_heading_style_5fdc8855":"Remove heading style","row_fc0944a7":"Row","row_group_979f5528":"Row group","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Screen readers cannot determine what is displayed in an image without alternative text, and filenames are often meaningless strings of numbers and letters that do not describe the context or meaning.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Screen readers cannot determine what is displayed in an image without alternative text which describes the content and meaning of the image. Alternative text should be simple and concise.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Screen readers cannot determine what is displayed in an image without alternative text that describes the content and meaning of the image.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Screen readers cannot interpret tables without the proper structure. Table headers provide direction and content scope.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Screen readers cannot interpret tables without the proper structure. Table captions describe the context and general understanding of the table.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Screen readers cannot interpret tables without the proper structure. Table headers provide direction and overview of the content.","set_header_scope_8c548f40":"Set header scope","set_table_header_cfab13a0":"Set table header","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should use the proper structure.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should be concise within the proper structure.","table_header_starting_with_start_ffcabba6":"Table header starting with { start }","table_starting_with_start_e7232848":"Table starting with { start }","tables_headers_should_specify_scope_5abf3a8e":"Table headers should specify scope.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tables should include a caption describing the contents of the table.","tables_should_include_at_least_one_header_48779eac":"Tables should include at least one header.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Text is difficult to read without sufficient contrast between the text and the background, especially for those with low vision.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Text larger than 18pt (or bold 14pt) should display a minimum contrast ratio of 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Text smaller than 18pt (or bold 14pt) should display a minimum contrast ratio of 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"When markup is used that visually formats items as a list but does not indicate the list relationship, users may have difficulty in navigating the information.","why_523b3d8c":"Why"},"en-GB":{"accessibility_checker_b3af1f6c":"Accessibility checker","action_to_take_b626a99a":"Action to take:","add_a_caption_2a915239":"Add a caption","add_alt_text_for_the_image_48cd88aa":"Add alt text for the image","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Adjacent links with the same URL should be a single link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt attribute text should not contain more than 120 characters.","apply_781a2546":"Apply","change_alt_text_92654906":"Change alt text","change_heading_tag_to_paragraph_a61e3113":"Change heading tag to paragraph","change_text_color_1aecb912":"Change text colour","check_accessibility_3c78211c":"Check accessibility","checking_for_accessibility_issues_fac18c6d":"Checking for accessibility issues","close_accessibility_checker_29d1c51e":"Close accessibility checker","close_d634289d":"Close","column_e1ae5c64":"Column","column_group_1c062368":"Column group","decorative_image_fde98579":"Decorative image","element_starting_with_start_91bf4c3b":"Element starting with { start }","fix_heading_hierarchy_f60884c4":"Fix heading hierarchy","format_as_a_list_142210c3":"Format as a list","header_column_f27433cb":"Header column","header_row_and_column_ec5b9ec":"Header row and column","header_row_f33eb169":"Header row","heading_levels_should_not_be_skipped_3947c0e0":"Heading levels should not be skipped.","heading_starting_with_start_42a3e7f9":"Heading starting with { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Headings should not contain more than 120 characters.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Image filenames should not be used as the alt attribute describing the image content.","image_with_filename_file_aacd7180":"Image with filename { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Images should include an alt attribute describing the image content.","issue_num_total_f94536cf":"Issue { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Keyboards navigate to links using the Tab key. Two adjacent links that direct to the same destination can be confusing to keyboard users.","learn_more_about_adjacent_links_2cb9762c":"Learn more about adjacent links","learn_more_about_color_contrast_c019dfb9":"Learn more about colour contrast","learn_more_about_organizing_page_headings_8a7caa2e":"Learn more about organising page headings","learn_more_about_table_headers_5f5ee13":"Learn more about table headers","learn_more_about_using_alt_text_for_images_5698df9a":"Learn more about using alt text for images","learn_more_about_using_captions_with_tables_36fe496f":"Learn more about using captions with tables","learn_more_about_using_filenames_as_alt_text_264286af":"Learn more about using filenames as alt text","learn_more_about_using_lists_4e6eb860":"Learn more about using lists","learn_more_about_using_scope_attributes_with_table_20df49aa":"Learn more about using scope attributes with tables","leave_as_is_4facfe55":"Leave as is","link_with_text_starting_with_start_b3fcbe71":"Link with text starting with { start }","lists_should_be_formatted_as_lists_f862de8d":"Lists should be formatted as lists.","merge_links_2478df96":"Merge links","next_40e12421":"Next","no_accessibility_issues_were_detected_f8d3c875":"No accessibility issues were detected.","no_headers_9bc7dc7f":"No headers","none_3b5e34d2":"None","paragraph_starting_with_start_a59923f8":"Paragraph starting with { start }","prev_f82cbc48":"Prev","remove_heading_style_5fdc8855":"Remove heading style","row_fc0944a7":"Row","row_group_979f5528":"Row group","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Screen readers cannot determine what is displayed in an image without alternative text, and filenames are often meaningless strings of numbers and letters that do not describe the context or meaning.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image. Alternative text should be simple and concise.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Screen readers cannot interpret tables without the proper structure. Table headers provide direction and content scope.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Screen readers cannot interpret tables without the proper structure. Table captions describe the context and general understanding of the table.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Screen readers cannot interpret tables without the proper structure. Table headers provide direction and overview of the content.","set_header_scope_8c548f40":"Set header scope","set_table_header_cfab13a0":"Set table header","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should use the proper structure.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should be concise within the proper structure.","table_header_starting_with_start_ffcabba6":"Table header starting with { start }","table_starting_with_start_e7232848":"Table starting with { start }","tables_headers_should_specify_scope_5abf3a8e":"Tables headers should specify scope.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tables should include a caption describing the contents of the table.","tables_should_include_at_least_one_header_48779eac":"Tables should include at least one header.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Text is difficult to read without sufficient contrast between the text and the background, especially for those with low vision.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Text larger than 18pt (or bold 14pt) should display a minimum contrast ratio of 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Text smaller than 18pt (or bold 14pt) should display a minimum contrast ratio of 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"When mark-up is used, it visually formats items as a list but does not indicate the list relationship, users may have difficulty in navigating the information.","why_523b3d8c":"Why"},"en":{"accessibility_checker_b3af1f6c":"Accessibility Checker","action_to_take_b626a99a":"Action to take:","add_a_caption_2a915239":"Add a caption","add_alt_text_for_the_image_48cd88aa":"Add alt text for the image","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Adjacent links with the same URL should be a single link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt attribute text should not contain more than 120 characters.","apply_781a2546":"Apply","change_alt_text_92654906":"Change alt text","change_heading_tag_to_paragraph_a61e3113":"Change heading tag to paragraph","change_text_color_1aecb912":"Change text color","check_accessibility_3c78211c":"Check Accessibility","checking_for_accessibility_issues_fac18c6d":"Checking for accessibility issues","close_accessibility_checker_29d1c51e":"Close Accessibility Checker","close_d634289d":"Close","column_e1ae5c64":"Column","column_group_1c062368":"Column group","decorative_image_fde98579":"Decorative image","element_starting_with_start_91bf4c3b":"Element starting with { start }","fix_heading_hierarchy_f60884c4":"Fix heading hierarchy","format_as_a_list_142210c3":"Format as a list","header_column_f27433cb":"Header column","header_row_and_column_ec5b9ec":"Header row and column","header_row_f33eb169":"Header row","heading_levels_should_not_be_skipped_3947c0e0":"Heading levels should not be skipped.","heading_starting_with_start_42a3e7f9":"Heading starting with { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Headings should not contain more than 120 characters.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Image filenames should not be used as the alt attribute describing the image content.","image_with_filename_file_aacd7180":"Image with filename { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Images should include an alt attribute describing the image content.","issue_num_total_f94536cf":"Issue { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Keyboards navigate to links using the Tab key. Two adjacent links that direct to the same destination can be confusing to keyboard users.","learn_more_about_adjacent_links_2cb9762c":"Learn more about adjacent links","learn_more_about_color_contrast_c019dfb9":"Learn more about color contrast","learn_more_about_organizing_page_headings_8a7caa2e":"Learn more about organizing page headings","learn_more_about_table_headers_5f5ee13":"Learn more about table headers","learn_more_about_using_alt_text_for_images_5698df9a":"Learn more about using alt text for images","learn_more_about_using_captions_with_tables_36fe496f":"Learn more about using captions with tables","learn_more_about_using_filenames_as_alt_text_264286af":"Learn more about using filenames as alt text","learn_more_about_using_lists_4e6eb860":"Learn more about using lists","learn_more_about_using_scope_attributes_with_table_20df49aa":"Learn more about using scope attributes with tables","leave_as_is_4facfe55":"Leave as is","link_with_text_starting_with_start_b3fcbe71":"Link with text starting with { start }","lists_should_be_formatted_as_lists_f862de8d":"Lists should be formatted as lists.","merge_links_2478df96":"Merge links","next_40e12421":"Next","no_accessibility_issues_were_detected_f8d3c875":"No accessibility issues were detected.","no_headers_9bc7dc7f":"No headers","none_3b5e34d2":"None","paragraph_starting_with_start_a59923f8":"Paragraph starting with { start }","prev_f82cbc48":"Prev","remove_heading_style_5fdc8855":"Remove heading style","row_fc0944a7":"Row","row_group_979f5528":"Row group","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Screen readers cannot determine what is displayed in an image without alternative text, and filenames are often meaningless strings of numbers and letters that do not describe the context or meaning.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image. Alternative text should be simple and concise.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Screen readers cannot interpret tables without the proper structure. Table headers provide direction and content scope.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Screen readers cannot interpret tables without the proper structure. Table captions describe the context and general understanding of the table.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Screen readers cannot interpret tables without the proper structure. Table headers provide direction and overview of the content.","set_header_scope_8c548f40":"Set header scope","set_table_header_cfab13a0":"Set table header","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should use the proper structure.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should be concise within the proper structure.","table_header_starting_with_start_ffcabba6":"Table header starting with { start }","table_starting_with_start_e7232848":"Table starting with { start }","tables_headers_should_specify_scope_5abf3a8e":"Tables headers should specify scope.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tables should include a caption describing the contents of the table.","tables_should_include_at_least_one_header_48779eac":"Tables should include at least one header.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Text is difficult to read without sufficient contrast between the text and the background, especially for those with low vision.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Text larger than 18pt (or bold 14pt) should display a minimum contrast ratio of 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Text smaller than 18pt (or bold 14pt) should display a minimum contrast ratio of 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"When markup is used that visually formats items as a list but does not indicate the list relationship, users may have difficulty in navigating the information.","why_523b3d8c":"Why"},"es":{"accessibility_checker_b3af1f6c":"Verificador de accesibilidad","action_to_take_b626a99a":"Acci??n a tomar:","add_a_caption_2a915239":"Agregar un subt??tulo","add_alt_text_for_the_image_48cd88aa":"Agregar texto alternativo para la imagen","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Los enlaces adyacentes con la misma URL deben ser un solo enlace.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"El texto del atributo alt no debe tener m??s de 120 caracteres.","apply_781a2546":"Aplicar","change_alt_text_92654906":"Texto alternativo de la imagen","change_heading_tag_to_paragraph_a61e3113":"Cambiar etiqueta del t??tulo a p??rrafo","change_text_color_1aecb912":"Cambiar color del texto","check_accessibility_3c78211c":"Cambiar accesibilidad","checking_for_accessibility_issues_fac18c6d":"Comprobando problemas de accesibilidad","close_accessibility_checker_29d1c51e":"Cerrar verificador de accesibilidad","close_d634289d":"Cerrar","column_e1ae5c64":"Columna","column_group_1c062368":"Grupo de columnas","decorative_image_fde98579":"Imagen decorativa","element_starting_with_start_91bf4c3b":"Elemento que comienza con { start }","fix_heading_hierarchy_f60884c4":"Fijar jerarqu??a de t??tulos","format_as_a_list_142210c3":"Formatear como lista","header_column_f27433cb":"Columna de encabezado","header_row_and_column_ec5b9ec":"Fila y columna de encabezado","header_row_f33eb169":"Fila de encabezado","heading_levels_should_not_be_skipped_3947c0e0":"Los niveles de los t??tulos no deben omitirse.","heading_starting_with_start_42a3e7f9":"T??tulo que comienza con { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Los t??tulos no deben tener m??s de 120 caracteres.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Los nombres de archivo de las im??genes no deben usarse como el atributo alt que describe el contenido de la imagen.","image_with_filename_file_aacd7180":"Imagen con nombre de archivo { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Las im??genes deben incluir un atributo alt que describa el contenido de la imagen.","issue_num_total_f94536cf":"Problema { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Los teclados navegan por los enlaces mediante la tecla Tab. Dos enlaces adyacentes que dirigen al mismo destino pueden ser confusos para los usuarios del teclado.","learn_more_about_adjacent_links_2cb9762c":"Obtenga m??s informaci??n sobre los enlaces adyacentes","learn_more_about_color_contrast_c019dfb9":"Obtenga m??s informaci??n sobre el contraste de colores","learn_more_about_organizing_page_headings_8a7caa2e":"Obtenga m??s informaci??n sobre la organizaci??n de los t??tulos de p??gina","learn_more_about_table_headers_5f5ee13":"Obtenga m??s informaci??n sobre los t??tulos de tablas","learn_more_about_using_alt_text_for_images_5698df9a":"Obtenga m??s informaci??n sobre texto alternativo para las im??genes","learn_more_about_using_captions_with_tables_36fe496f":"Obtenga m??s informaci??n sobre el uso de leyendas con tablas","learn_more_about_using_filenames_as_alt_text_264286af":"Obtenga m??s informaci??n sobre el uso de nombres de archivo como texto alternativo","learn_more_about_using_lists_4e6eb860":"Obtenga m??s informaci??n sobre el uso de listas","learn_more_about_using_scope_attributes_with_table_20df49aa":"Obtenga m??s informaci??n sobre el uso de atributos de alcance con tablas","leave_as_is_4facfe55":"Dejar sin cambios","link_with_text_starting_with_start_b3fcbe71":"Vincular con texto que comienza con { start }","lists_should_be_formatted_as_lists_f862de8d":"Las listas deben tener el formato de listas.","merge_links_2478df96":"Fusionar enlaces","next_40e12421":"Siguiente","no_accessibility_issues_were_detected_f8d3c875":"No se detectaron problemas de accesibilidad.","no_headers_9bc7dc7f":"Sin encabezados","none_3b5e34d2":"Ninguno","paragraph_starting_with_start_a59923f8":"P??rrafo que comienza con { start }","prev_f82cbc48":"Previo","remove_heading_style_5fdc8855":"Eliminar estilo del t??tulo","row_fc0944a7":"Fila","row_group_979f5528":"Grupo de filas","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Los lectores de pantalla no pueden determinar lo que se muestra en una imagen sin texto alternativo, y los nombres de archivo con frecuencia son secuencias de n??meros y letras sin sentido que no describen el contexto o significado.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Los lectores de pantalla no pueden determinar lo que se muestra en una imagen sin texto alternativo, el cual describe el contexto y el significado de la imagen. El texto alternativo debe ser simple y conciso.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Los lectores de pantalla no pueden determinar lo que se muestra en una imagen sin texto alternativo, el cual describe el contexto y el significado de la imagen.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Los lectores de pantalla no pueden interpretar tablas sin la estructura apropiada. Los encabezados de tablas brindan orientaci??n y el alcance del contenido.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Los lectores de pantalla no pueden interpretar tablas sin la estructura apropiada. Los subt??tulos de las tablas describen el contexto y la comprensi??n general de la tabla.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Los lectores de pantalla no pueden interpretar tablas sin la estructura apropiada. Los encabezados de tablas brindan orientaci??n y una descripci??n del contenido.","set_header_scope_8c548f40":"Establecer alcance del encabezado","set_table_header_cfab13a0":"Establecer encabezado de la tabla","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Los usuarios detectados navegan r??pido por las p??ginas web, buscando t??tulos grandes o en negrita. Los usuarios del lector de pantalla solo utilizan los encabezados para una comprensi??n contextual. Los encabezados deben tener la estructura apropiada.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Los usuarios detectados navegan r??pido por las p??ginas web, buscando t??tulos grandes o en negrita. Los usuarios del lector de pantalla solo utilizan los encabezados para una comprensi??n contextual. Los encabezados deben ser concisos dentro de la estructura apropiada.","table_header_starting_with_start_ffcabba6":"Encabezado de tabla que comienza con { start }","table_starting_with_start_e7232848":"Tabla que comienza con { start }","tables_headers_should_specify_scope_5abf3a8e":"Los encabezados de las tablas deben especificar el alcance.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Las tablas deben incluir un subt??tulo que describa el contenido de la tabla.","tables_should_include_at_least_one_header_48779eac":"Las tablas deben incluir al menos un encabezado.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"El El texto es dif??cil de leer si no hay contraste suficiente entre el texto y el fondo, especialmente para aquellas personas con visi??n reducida.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"El texto de tama??o mayor de 18pt (o 14pt en negrita) debe mostrar una relaci??n de contraste m??nima de 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"El texto de tama??o menor de 18pt (o 14pt en negrita) debe mostrar una relaci??n de contraste m??nima de 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Cuando se usa el marcado que formatea visualmente los elementos como una lista pero no indica la relaci??n de la lista, los usuarios pueden tener dificultades para navegar por la informaci??n.","why_523b3d8c":"Por qu??"},"fr-CA":{"accessibility_checker_b3af1f6c":"V??rificateur d\'\'accessibilit??","action_to_take_b626a99a":"Mesures ?? prendre??:","add_a_caption_2a915239":"Ajoutez une l??gende","add_alt_text_for_the_image_48cd88aa":"Ajouter texte alt pour l\'\'image","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Liens adjacents avec la m??me URL devrait ??tre une liaison unique.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Le texte alt ne peut pas ??tre constitu?? de plus de 120 caract??res.","apply_781a2546":"Appliquer","change_alt_text_92654906":"Modifier le texte alternatif (texte Alt)","change_heading_tag_to_paragraph_a61e3113":"Modifier la balise d???ent??te au paragraphe","change_text_color_1aecb912":"Modifier la couleur du texte","check_accessibility_3c78211c":"V??rifier l\'\'accessibilit??","checking_for_accessibility_issues_fac18c6d":"V??rification des probl??mes d\'\'accessibilit??","close_accessibility_checker_29d1c51e":"Fermer le v??rificateur d\'\'accessibilit??","close_d634289d":"Fermer","column_e1ae5c64":"Colonne","column_group_1c062368":"Groupe de colonnes","decorative_image_fde98579":"Image d??corative","element_starting_with_start_91bf4c3b":"??l??ment commen??ant par { start }","fix_heading_hierarchy_f60884c4":"Corriger la hi??rarchie d???ent??te","format_as_a_list_142210c3":"Formater comme une liste","header_column_f27433cb":"Ent??te de colonne","header_row_and_column_ec5b9ec":"Ligne et colonne d\'\'ent??te","header_row_f33eb169":"Ligne d\'\'ent??te","heading_levels_should_not_be_skipped_3947c0e0":"Les niveaux d\'\'ent??te ne doivent pas ??tre ignor??s.","heading_starting_with_start_42a3e7f9":"Ent??te commen??ant par { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Les ent??tes ne doivent pas contenir plus de 120 caract??res.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Les fichiers d\'\'image ne doivent pas ??tre utilis??s comme l\'\'attribut alt d??crivant le contenu de l\'\'image.","image_with_filename_file_aacd7180":"Image avec nom de fichier { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Les images doivent inclure un attribut alt d??crivant le contenu de l\'\'image.","issue_num_total_f94536cf":"Probl??me { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Les claviers naviguent vers les liens ?? l\'\'aide de la touche de tabulation. Deux liens adjacents qui vous dirigent vers la m??me destination peuvent ??tre source de confusion pour les utilisateurs de clavier.","learn_more_about_adjacent_links_2cb9762c":"En apprendre davantage  sur les liens adjacents","learn_more_about_color_contrast_c019dfb9":"En apprendre davantage sur les contraste des couleurs","learn_more_about_organizing_page_headings_8a7caa2e":"En apprendre davantage sur l\'\'organisation des en-t??tes de page","learn_more_about_table_headers_5f5ee13":"En apprendre davantage sur les ent??tes de tableau","learn_more_about_using_alt_text_for_images_5698df9a":"En apprendre davantage sur l\'\'utilisation du texte alt pour les images","learn_more_about_using_captions_with_tables_36fe496f":"En apprendre davantage sur l\'\'utilisation des l??gendes avec des tableaux","learn_more_about_using_filenames_as_alt_text_264286af":"En apprendre davantage sur l\'\'utilisation de nom de fichier en tant que texte alt","learn_more_about_using_lists_4e6eb860":"En apprendre davantage sur les listes","learn_more_about_using_scope_attributes_with_table_20df49aa":"En apprendre davantage sur l\'\'utilisation des attributs de port??e avec les tableaux","leave_as_is_4facfe55":"Laisser comme tel","link_with_text_starting_with_start_b3fcbe71":"Lien avec texte commen??ant par { start }","lists_should_be_formatted_as_lists_f862de8d":"Les listes doivent ??tre format??es comme une liste.","merge_links_2478df96":"Fusionner les liens","next_40e12421":"Suivant","no_accessibility_issues_were_detected_f8d3c875":"Aucun probl??me d\'\'accessibilit?? d??tect??.","no_headers_9bc7dc7f":"Aucun ent??te","none_3b5e34d2":"Aucun","paragraph_starting_with_start_a59923f8":"Paragraphe commen??ant par { start }","prev_f82cbc48":"Pr??c??dent","remove_heading_style_5fdc8855":"Retirer le style d???ent??te","row_fc0944a7":"Ligne","row_group_979f5528":"Groupe de ligne","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Les lecteurs d\'\'??cran ne peuvent pas d??terminer ce qui est affich?? dans une image sans texte alternatif, et les noms de fichiers sont souvent des cha??nes de chiffres et de lettres d??nu??es de sens qui ne d??crivent pas le contexte ou le sens.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Les lecteurs d\'\'??cran ne peuvent pas d??terminer ce qui est affich?? dans une image sans texte alternatif, qui d??crit le contenu et la signification de l\'\'image. Le texte alternatif devrait ??tre simple et concis.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Les lecteurs d\'\'??cran ne peuvent pas d??terminer ce qui est affich?? dans une image sans texte alternatif, qui d??crit le contenu et la signification de l\'\'image.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Les lecteurs d\'\'??cran ne peuvent pas interpr??ter les tableaux sans la structure appropri??e. Les ent??tes de tableau fournissent une orientation et port??e du contenu.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Les lecteurs d\'\'??cran ne peuvent pas interpr??ter les tableaux sans la structure appropri??e. Les l??gendes de tableau d??crivent le contexte et la compr??hension g??n??rale du tableau.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Les lecteurs d\'\'??cran ne peuvent pas interpr??ter les tableaux sans la structure appropri??e. Les ent??tes de tableau fournissent une orientation et l???aper??u du contenu.","set_header_scope_8c548f40":"D??finir la port??e de l???ent??te","set_table_header_cfab13a0":"D??finir l\'\'ent??te du tableau","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Les utilisateurs voyants parcourent rapidement les pages Web, ?? la recherche d???ent??tes en gros caract??res ou en caract??res gras. Les utilisateurs de lecteurs d\'\'??cran comptent sur les ent??tes pour une compr??hension contextuelle. Les ent??tes devraient utiliser la structure appropri??e.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Les utilisateurs voyants parcourent rapidement les pages Web, ?? la recherche d???ent??tes en gros caract??res ou en caract??res gras. Les utilisateurs de lecteurs d\'\'??cran comptent sur les ent??tes pour une compr??hension contextuelle. Les ent??tes devraient ??tre concis au sein de la structure appropri??e.","table_header_starting_with_start_ffcabba6":"Ent??te de tableau commen??ant par { start }","table_starting_with_start_e7232848":"Tableau commen??ant par { start }","tables_headers_should_specify_scope_5abf3a8e":"Les ent??tes de tableau doivent sp??cifier la port??e.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Les tableaux devraient comporter une l??gende d??crivant le contenu du tableau.","tables_should_include_at_least_one_header_48779eac":"Les tableaux doivent inclure au moins un ent??te.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Le texte est difficile ?? lire sans contraste suffisant entre le texte et l\'\'arri??re-plan, en particulier pour ceux ayant une vision faible.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Un texte d\'\'une police sup??rieure ?? 18pt (ou 14pt gras) doit afficher un rapport de contraste minimum de 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Un texte avec une police plus petite que 18pt (ou 14pt gras) doit afficher un rapport de contraste minimum de 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Lorsque le langage de balisage est utilis?? pour formater visuellement les ??l??ments sous forme de liste, mais n\'\'indique pas la relation de la liste, les utilisateurs peuvent avoir de la difficult?? ?? naviguer dans l\'\'information.","why_523b3d8c":"Pourquoi"},"fr":{"accessibility_checker_b3af1f6c":"V??rificateur d???accessibilit??","action_to_take_b626a99a":"Mesures ?? prendre??:","add_a_caption_2a915239":"Ajouter une l??gende","add_alt_text_for_the_image_48cd88aa":"Ajouter un texte alternatif ?? l???image","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Les liens adjacents ayant la m??me URL devraient ??tre rassembl??s en un seul lien.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Le texte de l???attribut alt ne devrait pas contenir plus de 120 caract??res.","apply_781a2546":"Appliquer","change_alt_text_92654906":"Modifier le texte alternatif","change_heading_tag_to_paragraph_a61e3113":"Transformer la balise en-t??te en paragraphe","change_text_color_1aecb912":"Changer la couleur du texte","check_accessibility_3c78211c":"V??rifier l???accessibilit??","checking_for_accessibility_issues_fac18c6d":"V??rification des ??ventuels probl??mes d???accessibilit??...","close_accessibility_checker_29d1c51e":"Fermer le v??rificateur d???accessibilit??","close_d634289d":"Fermer","column_e1ae5c64":"Colonne","column_group_1c062368":"Groupe de colonnes","decorative_image_fde98579":"Image d??corative","element_starting_with_start_91bf4c3b":"??l??ment commen??ant par { start }","fix_heading_hierarchy_f60884c4":"Corriger la hi??rarchie des en-t??tes","format_as_a_list_142210c3":"Pr??senter sous forme de liste","header_column_f27433cb":"Colonne d???en-t??te","header_row_and_column_ec5b9ec":"Rang??e et colonne d???en-t??te","header_row_f33eb169":"Rang??e d???en-t??te","heading_levels_should_not_be_skipped_3947c0e0":"Vous devez ??viter de sauter certains niveaux d???en-t??te.","heading_starting_with_start_42a3e7f9":"En-t??te commen??ant par { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Les en-t??tes ne devraient pas contenir plus de 120 caract??res.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Les noms de fichiers des images ne devraient pas servir d???attribut alt d??crivant le contenu de l???image.","image_with_filename_file_aacd7180":"Image ayant le nom de fichier { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Les images devraient contenir un attribut alt d??crivant leur contenu.","issue_num_total_f94536cf":"Probl??me { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Au clavier, on navigue parmi les liens ?? l???aide de la touche tabulation. Lorsque deux liens adjacents renvoient ?? la m??me destination, cela peut porter ?? confusion pour les utilisateurs au clavier.","learn_more_about_adjacent_links_2cb9762c":"Apprenez-en davantage sur les liens adjacents","learn_more_about_color_contrast_c019dfb9":"Apprenez-en davantage sur le contraste couleur","learn_more_about_organizing_page_headings_8a7caa2e":"Apprenez-en davantage sur la fa??on d???organiser les en-t??tes de page","learn_more_about_table_headers_5f5ee13":"Apprenez-en davantage sur les en-t??te de tableaux","learn_more_about_using_alt_text_for_images_5698df9a":"Apprenez-en davantage sur l???utilisation de texte dans les images","learn_more_about_using_captions_with_tables_36fe496f":"Apprenez-en davantage sur l???utilisation de l??gendes dans les tableaux","learn_more_about_using_filenames_as_alt_text_264286af":"Apprenez-en davantage sur l???utilisation de noms de fichiers comme texte alternatif","learn_more_about_using_lists_4e6eb860":"Apprenez-en davantage sur l???utilisation des listes","learn_more_about_using_scope_attributes_with_table_20df49aa":"Apprenez-en davantage sur l???utilisation de l\'\'attribut Scope dans les tableaux","leave_as_is_4facfe55":"Laisser en l?????tat","link_with_text_starting_with_start_b3fcbe71":"Lien contenant du texte commen??ant par { start }","lists_should_be_formatted_as_lists_f862de8d":"Les listes doivent ??tre pr??sent??es sous forme de listes.","merge_links_2478df96":"Fusionner les liens","next_40e12421":"Suivant","no_accessibility_issues_were_detected_f8d3c875":"Aucun probl??me d???accessibilit?? d??tect??.","no_headers_9bc7dc7f":"Pas d???en-t??tes","none_3b5e34d2":"Aucun","paragraph_starting_with_start_a59923f8":"Paragraphe commen??ant par { start }","prev_f82cbc48":"Pr??c??dent","remove_heading_style_5fdc8855":"Supprimer le style ????en-t??te????","row_fc0944a7":"Rang??e","row_group_979f5528":"Groupe de rang??es","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Les lecteurs d?????cran ne peuvent d??terminer ce qui est visible sur une image sans texte alternatif, et les noms de fichiers sont souvent une suite de caract??res sans signification qui ne d??crivent pas correctement le contexte ou le sens.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Les lecteurs d?????cran ne peuvent d??terminer ce qui est visible sur une image sans texte alternatif, lequel d??crit le contenu et la signification de l???image. Le texte alternatif doit rester simple et concis.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Les lecteurs d?????cran ne peuvent d??terminer ce qui est visible sur une image sans texte alternatif, lequel d??crit le contenu et la signification de l???image.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Les lecteurs d?????cran ne peuvent interpr??ter les tableaux sans structure adapt??e. Les en-t??tes de tableau indiquent la direction et l?????tendue du contenu.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Les lecteurs d?????cran ne peuvent interpr??ter les tableaux sans structure adapt??e. Les l??gendes d??crivent le contexte et la compr??hension globale ?? tirer du tableau.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Les lecteurs d?????cran ne peuvent interpr??ter les tableaux sans structure adapt??e. Les en-t??tes de tableau indiquent la direction ainsi qu???une vue d???ensemble du contenu.","set_header_scope_8c548f40":"Param??trer l?????tendue de l???en-t??te","set_table_header_cfab13a0":"Param??trer un en-t??te de tableau","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Les utilisateurs voyants naviguent rapidement entre les pages, ?? la recherche d???en-t??tes en caract??res grands et gras. Les lecteurs d?????crans utilisent les en-t??tes pour une compr??hension en contexte. Les en-t??tes doivent utiliser une structure appropri??e.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Les utilisateurs voyants naviguent rapidement entre les pages, ?? la recherche d???en-t??tes en caract??res grands et gras. Les lecteurs d?????crans utilisent les en-t??tes pour une compr??hension en contexte. Les en-t??tes doivent faire preuve de concision au sein d???une structure appropri??e.","table_header_starting_with_start_ffcabba6":"En-t??te de tableau commen??ant par { start }","table_starting_with_start_e7232848":"Tableau commen??ant par { start }","tables_headers_should_specify_scope_5abf3a8e":"Les en-t??tes de tableaux devraient indiquer une ??tendue.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Les tableaux devraient comprendre une l??gende d??crivant leur contenu.","tables_should_include_at_least_one_header_48779eac":"Les tableaux devraient comprendre au moins un en-t??te.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Le texte est difficile ?? lire sans un contraste suffisant entre le texte et l\'\'arri??re-plan, surtout pour ceux qui ont une vue faible.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Les textes d???une taille sup??rieure ?? 18pt (ou 14pt en gras) devraient respecter un ratio de contraste d???au moins 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Les textes de moins de 18pt (ou 14pt en gras) devraient respecter un ratio de contraste d???au moins 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Lorsqu\'\'on utilise des balises qui formatent visuellement les ??l??ments sous forme de liste, mais qui n\'\'indiquent pas la relation entre les listes, les utilisateurs peuvent avoir de la difficult?? ?? naviguer dans l\'\'information.","why_523b3d8c":"Pourquoi"},"ht":{"accessibility_checker_b3af1f6c":"Verifikat?? Aksesibilite","action_to_take_b626a99a":"Aksyon ki dwe f??t:","add_a_caption_2a915239":"Ajoute yon soutit","add_alt_text_for_the_image_48cd88aa":"Ajoute l??t t??ks pou imaj la","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Lyen Adjasan ak menm URL yo dwe yon lyen inik.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"L??t atribi t??ks yo pata dwe gen plis pase 120 karakt??.","apply_781a2546":"Aplike","change_alt_text_92654906":"Chanje t??ks alt","change_heading_tag_to_paragraph_a61e3113":"Chanje etik??t ant??t la an paragraf","change_text_color_1aecb912":"Chanje koul?? t??ks","check_accessibility_3c78211c":"Verifye Aksesibilite","checking_for_accessibility_issues_fac18c6d":"Pwobl??m verifikasyon Aksesibilite","close_accessibility_checker_29d1c51e":"F??men Verifikat?? Aksesibilite","close_d634289d":"F??men","column_e1ae5c64":"Kolonn","column_group_1c062368":"Gwoup Kolonn","decorative_image_fde98579":"Imaj Dekoratif","element_starting_with_start_91bf4c3b":"Eleman k??manse a { start }","fix_heading_hierarchy_f60884c4":"Fikse yerachi ant??t","format_as_a_list_142210c3":"F??mate tankou lis","header_column_f27433cb":"Kolonn ant??t","header_row_and_column_ec5b9ec":"Ranje ak kolonn ant??t","header_row_f33eb169":"Ranje ant??t","heading_levels_should_not_be_skipped_3947c0e0":"Nivo ant??t la pata dwe sote.","heading_starting_with_start_42a3e7f9":"Ant??t k??manse pa { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Ant??t yo Atribi t??ks alt pata dwe genyen plis pase 120 karakt??.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Non fichye imaj yo pata dwe itilize k??m atribi alt ki dekri kontni imaj la.","image_with_filename_file_aacd7180":"Imaj ak non fichye { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Imaj yo dwe gen yon atribi alt ki dekri kontni imaj la.","issue_num_total_f94536cf":"Pwobl??m { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Klavye navige nan lyen yo ak touch Tab la. De lyen adjasan ki dirije nan menm destinasyon an ka p??m??t moun k ap itilize klavye yo twompe yo.","learn_more_about_adjacent_links_2cb9762c":"Aprann plis sou lyen adjasan yo","learn_more_about_color_contrast_c019dfb9":"Aprann plis sou kontras koul?? yo","learn_more_about_organizing_page_headings_8a7caa2e":"Aprann plis sou ??ganizasyon ant??t paj","learn_more_about_table_headers_5f5ee13":"Aprann plis sou ant??t tablo yo","learn_more_about_using_alt_text_for_images_5698df9a":"Aprann plis sou t??ks alt pou imaj yo","learn_more_about_using_captions_with_tables_36fe496f":"Aprann plis sou itilizasyon lejand nan tablo yo","learn_more_about_using_filenames_as_alt_text_264286af":"Aprann plis sou itilizasyon non fichye yo tankou t??ks alt","learn_more_about_using_lists_4e6eb860":"Aprann plis sou itilizasyon lis yo","learn_more_about_using_scope_attributes_with_table_20df49aa":"Aprann plis sou itilizasyon atribi p??te yo ak tablo yo","leave_as_is_4facfe55":"Kite tankou","link_with_text_starting_with_start_b3fcbe71":"Lyen ak t??ks ki k??manse pa { start }","lists_should_be_formatted_as_lists_f862de8d":"Lis yo dwe f??mate tankou lis.","merge_links_2478df96":"Fizyone lyen","next_40e12421":"Pwochen","no_accessibility_issues_were_detected_f8d3c875":"Nou pa t detekte okenn pwobl??m aksesibilite.","no_headers_9bc7dc7f":"Okenn ant??t","none_3b5e34d2":"Okenn","paragraph_starting_with_start_a59923f8":"Paragraf k??manse ak { start }","prev_f82cbc48":"Anvan","remove_heading_style_5fdc8855":"Elimine stil ant??t","row_fc0944a7":"Ranje","row_group_979f5528":"Gwoup ranje","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Lekt?? ekran yo paka w?? kisa ki afiche nan yon imaj san t??ks alt??natif, epi non fichye yo souvan se yon anchenman chif ak l??t ki pa dekri kont??ks oswa sans.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Lekt?? ekran yo paka w?? kisa ki afiche nan yon imaj san t??ks alt??natif, ki dekri kontni ak siyifikasyon imaj la. T??ks alt??natif ta dwe senp e kl??.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Lekt?? ekran yo paka w?? kisa ki afiche nan yon imaj san t??ks alt??natif, ki dekri kontni ak siyifikasyon imaj la.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Lekt?? ekran yo paka ent??rete tablo san estrikti ki apwopriye. Ant??t tablo yo bay enstriksyon ak kapasite kontni an.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Lekt?? ekran yo paka ent??rete tablo san estrikti ki apwopriye. Lejand tablo yo dekri kont??ks ak konpreyansyon jeneral tablo a.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Lekt?? ekran yo paka ent??rete tablo san estrikti ki apwopriye. Ant??t tablo yo bay enstriksyon ak rezime kontni an.","set_header_scope_8c548f40":"Defini kapasite ant??t","set_table_header_cfab13a0":"Defini ant??t tablo","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Itilizat?? prevwayan yo navige sou paj w??b yo byen vit, pou yo ka ch??che ant??t ki gwo oswa an gra. Itilizat?? lekt?? ekran yo konte sou ant??t yo pou konpreyansyon konteksty??l. Ant??t yo dwe itilize estrikti ki apwopriye.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Itilizat?? prevwayan yo navige sou paj w??b yo byen vit, pou yo ka ch??che ant??t ki gwo oswa an gra. Itilizat?? lekt?? ekran yo konte sou ant??t yo pou konpreyansyon konteksty??l. Ant??t yo dwe kl?? nan estrikti ki apwopriye.","table_header_starting_with_start_ffcabba6":"Ant??t tablo k??manse a { start }","table_starting_with_start_e7232848":"Tablo k??manse a { start }","tables_headers_should_specify_scope_5abf3a8e":"Ant??t tablo yo dwe presize kapasite.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tablo yo dwe gen lejand ki dekri kontni tablo a.","tables_should_include_at_least_one_header_48779eac":"Tablo yo dwe gen omwen yon ant??t.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Li difisil pou li t??ks la si pa gen ase kontras ant t??ks la ak fon an, espesyalman pou moun ki pa w?? byen yo.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"T??ks ki pi gwo ke 18pt (oswa an gra 14pt) ta dwe afiche yon to kontras de 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"T??ks ki pi piti ke 18pt (oswa an gra 14pt) ta dwe afiche yon to kontras de 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"L?? yo itilize balizaj pou yo ka f??mate eleman yo vizy??lman tankou lis men ki pa di relasyon lis la, itilizat?? yo ka rankontre difikilte pou navige nan enf??masyon yo. ","why_523b3d8c":"Poukisa"},"is":{"accessibility_checker_b3af1f6c":"Athugun ?? a??gangi","action_to_take_b626a99a":"A??ger?? sem gr??pa ?? til:","add_a_caption_2a915239":"B??ta vi?? yfirskrift","add_alt_text_for_the_image_48cd88aa":"B??ta vi?? ????rum texta fyrir myndina","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Samliggjandi tenglar me?? s??mu vefsl???? eiga a?? vera stakur tengill.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Annar texti ??tti ekki a?? vera lengri en 120 stafir.","apply_781a2546":"Virkja","change_alt_text_92654906":"Breyta ????rum texta","change_heading_tag_to_paragraph_a61e3113":"Breyta tagi hauss ?? m??lsgrein","change_text_color_1aecb912":"Breyta lit ?? texta","check_accessibility_3c78211c":"Kanna a??gengileika","checking_for_accessibility_issues_fac18c6d":"Er a?? kanna vandam??l var??andi a??gengileika","close_accessibility_checker_29d1c51e":"Loka Accessibility CheckerAthugun ?? a??gangi","close_d634289d":"Loka","column_e1ae5c64":"D??lkur","column_group_1c062368":"D??lkah??pur","decorative_image_fde98579":"Skreytingarmynd","element_starting_with_start_91bf4c3b":"Atri??i byrjar ?? { start }","fix_heading_hierarchy_f60884c4":"Lagf??ra stigveldi hauss","format_as_a_list_142210c3":"Sn????a sem lista","header_column_f27433cb":"D??lkur fyrir haus","header_row_and_column_ec5b9ec":"R???? og d??lkur fyrir haus","header_row_f33eb169":"R???? fyrir haus","heading_levels_should_not_be_skipped_3947c0e0":"Ekki ??tti a?? sleppa stigi hauss.","heading_starting_with_start_42a3e7f9":"Haus byrjar ?? { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Haus ??tti ekki a?? innihalda fleiri en 120 stafi.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Ekki ??tti a?? nota skr??rheiti myndar sem annan texta til a?? l??sa innihaldi myndar.","image_with_filename_file_aacd7180":"Mynd me?? skr??rheitinu { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Myndir ??ttu a?? fela ?? s??r annan texta sem l??sir innihaldi myndarinnar.","issue_num_total_f94536cf":"Vandam??l { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Nota d??lklykil til a?? fara ?? tengla. Tveir samliggjandi tenglar sem v??sa ?? sama ??kv??r??unarsta?? geta valdi?? ruglingi hj?? ??eim sem nota lyklabor??.","learn_more_about_adjacent_links_2cb9762c":"F?? a?? vita meira um samliggjandi tengla","learn_more_about_color_contrast_c019dfb9":"F?? a?? vita meira um litaandst????ur","learn_more_about_organizing_page_headings_8a7caa2e":"F?? a?? vita meira um skipulag ?? s????uhausum","learn_more_about_table_headers_5f5ee13":"F?? a?? vita meira um t??fluhausa","learn_more_about_using_alt_text_for_images_5698df9a":"F?? a?? vita meira um notkun baktexta fyrir myndir","learn_more_about_using_captions_with_tables_36fe496f":"F?? a?? vita meira um notkun sk??ringartexta me?? t??flum","learn_more_about_using_filenames_as_alt_text_264286af":"F?? a?? vita meira um notkun skr??aheita sem baktexta","learn_more_about_using_lists_4e6eb860":"F?? a?? vita meira um notkun lista","learn_more_about_using_scope_attributes_with_table_20df49aa":"F?? a?? vita meira um notkun umfangseiginda me?? t??flum","leave_as_is_4facfe55":"Halda ??breyttu","link_with_text_starting_with_start_b3fcbe71":"Tengill me?? texta byrjar ?? { start }","lists_should_be_formatted_as_lists_f862de8d":"Lista ??tti a?? sn????a sem lista.","merge_links_2478df96":"Fella tengla saman","next_40e12421":"N??sti","no_accessibility_issues_were_detected_f8d3c875":"Engin vandam??l fundust var??andi a??gengi .","no_headers_9bc7dc7f":"Engir hausar","none_3b5e34d2":"Enginn","paragraph_starting_with_start_a59923f8":"M??lsgrein byrjar ?? { start }","prev_f82cbc48":"Fyrri","remove_heading_style_5fdc8855":"Fjarl??gja st??l fyrirsagnar","row_fc0944a7":"R????","row_group_979f5528":"Ra??ah??pur","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Skj??lesarar geta ekki ??kvar??a?? efni myndar ??n annars texta, og skr??rheiti eru oft merkingarlausir strengir me?? t??lust??fum og b??kst??fum sem l??sa ekki innhaldinu e??a merkingunni.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Skj??lesarar geta ekki ??kvar??a?? efni myndar ??n annars texta sem l??sir innihaldi og merkingu myndarinnar. Annar texti ??tti a?? vera einfaldur og hnitmi??a??ur.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Skj??lesarar geta ekki ??kvar??a?? efni myndar ??n annars texta sem l??sir innihaldi og merkingu myndarinnar.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Skj??lesarar geta ekki t??lka?? t??flur nema ????r s??u ?? r??ttu formi. T??fluhausar gefa uppl??singar um efni og innihald.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Skj??lesarar geta ekki t??lka?? t??flur nema ????r s??u ?? r??ttu formi. Yfirskrift t??flu l??sir innihaldi hennar og gefur almennar uppl??singar um t??fluna.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Skj??lesarar geta ekki t??lka?? t??flur nema ????r s??u ?? r??ttu formi. T??fluhausar gefa uppl??singar um efni og yfirlit yfir ??a?? sem fram kemur ?? t??flunni.","set_header_scope_8c548f40":"Stilla gildissvi?? hauss","set_table_header_cfab13a0":"Stilla t??fluhaus","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Notendur sem sj?? fara hratt ?? gegnum vefs????ur og leita a?? st??rum e??a feitletru??um hausum. Skj??lesarar n??ta s??r hausa til a?? skilja samhengi. Hausar ??ttu a?? vera uppbygg??ir ?? r??ttan h??tt.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Notendur sem sj?? fara hratt ?? gegnum vefs????ur og leita a?? st??rum e??a feitletru??um hausum. Skj??lesarar n??ta s??r hausa til a?? skilja samhengi. Hausar ??ttu a?? vera hnitmi??a??ir og uppbygg??ir ?? r??ttan h??tt.","table_header_starting_with_start_ffcabba6":"Haus t??flu byrjar ?? { start }","table_starting_with_start_e7232848":"Tafla byrjar ?? { start }","tables_headers_should_specify_scope_5abf3a8e":"T??fluhausar ??ttu a?? tiltaka gildissvi??.","tables_should_include_a_caption_describing_the_con_e91e78fc":"T??flur ??ttu a?? hafa yfirskrift sem l??sir innihaldi t??flunnar.","tables_should_include_at_least_one_header_48779eac":"T??flur ??ttu a?? hafa a?? minnsta kosti einn haus.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Ef ekki eru n??gileg birtuskil milli leturs og bakgrunns er erfitt a?? lesa texta, s??rstaklega ef um er a?? r????a einstakling sem s??r illa.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Hlutfall h??marks- og l??gmarksbirtu fyrir letur sem er st??rra en 18 punkta (14 punkta ef feitletra??) ??tti a?? vera a?? l??gmarki 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Hlutfall h??marks- og l??gmarksbirtu fyrir letur sem er minna en 18 punkta (14 punkta ef feitletra??) ??tti a?? vera a?? l??gmarki 5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"??egar merkingar eru nota??ar sem sn????a atri??i sj??nr??nt sem lista en s??na ekki lista-sambandi??, g??tu notendur ??tt ?? erfi??leikum vi?? a?? ??tta sig ?? uppl??singunum.","why_523b3d8c":"Hvers vegna"},"it":{"accessibility_checker_b3af1f6c":"Verifica accessibilit??","action_to_take_b626a99a":"Azione da intraprendere:","add_a_caption_2a915239":"Aggiungi una didascalia","add_alt_text_for_the_image_48cd88aa":"Aggiungi testo alternativo per l\'\'immagine","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"I link adiacenti con lo stesso URL devono essere un singolo link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Il testo alternativo degli attributi non deve contenere pi?? di 120 caratteri.","apply_781a2546":"Applica","change_alt_text_92654906":"Cambia testo alternativo","change_heading_tag_to_paragraph_a61e3113":"Cambia tag di intestazione in paragrafo","change_text_color_1aecb912":"Cambia colore del testo","check_accessibility_3c78211c":"Verifica l\'\'accessibilit??","checking_for_accessibility_issues_fac18c6d":"Verifica i problemi di accessibilit??","close_accessibility_checker_29d1c51e":"Chiudi verifica accessibilit??","close_d634289d":"Chiudi","column_e1ae5c64":"Colonna","column_group_1c062368":"Gruppo di colonne","decorative_image_fde98579":"Immagine decorativa","element_starting_with_start_91bf4c3b":"Elemento che inizia con { start }","fix_heading_hierarchy_f60884c4":"Correggi gerarchia intestazioni","format_as_a_list_142210c3":"Formatta come elenco","header_column_f27433cb":"Colonna intestazione","header_row_and_column_ec5b9ec":"Riga e colonna di intestazione","header_row_f33eb169":"Riga di intestazione","heading_levels_should_not_be_skipped_3947c0e0":"I livelli di intestazione non devono essere ignorati.","heading_starting_with_start_42a3e7f9":"Intestazione che inizia con { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Le intestazioni non devono contenere pi?? di 120 caratteri.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"I nomi dei file immagine non devono essere utilizzati come attributo alternativo che descrive il contenuto dell\'\'immagine.","image_with_filename_file_aacd7180":"Immagine con nome file { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Le immagini devono includere un attributo alternativo che descrive il contenuto dell\'\'immagine.","issue_num_total_f94536cf":"Problema { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Le tastiere indirizzano ai link utilizzando il tasto TAB. Due link adiacenti che indirizzando alla stessa destinazione possono confondere gli utenti della tastiera.","learn_more_about_adjacent_links_2cb9762c":"Per saperne di pi?? sui link adiacenti","learn_more_about_color_contrast_c019dfb9":"Per saperne di pi?? sul contrasto di colore","learn_more_about_organizing_page_headings_8a7caa2e":"Per saperne di pi?? sull\'\'organizzazione delle intestazioni di pagina","learn_more_about_table_headers_5f5ee13":"Per saperne di pi?? sulle intestazioni delle tabelle","learn_more_about_using_alt_text_for_images_5698df9a":"Per saperne di pi?? sull\'\'utilizzo di testo alternativo per le immagini","learn_more_about_using_captions_with_tables_36fe496f":"Per saperne di pi?? sull\'\'uso delle didascalie con tabelle","learn_more_about_using_filenames_as_alt_text_264286af":"Per saperne di pi?? sull\'\'utilizzo dei nomi dei file come testo alternativo","learn_more_about_using_lists_4e6eb860":"Per saperne di pi?? sull\'\'uso degli elenchi","learn_more_about_using_scope_attributes_with_table_20df49aa":"Per saperne di pi?? sull\'\'uso degli attributi dell\'\'ambito con le tabelle","leave_as_is_4facfe55":"Lascia cos??","link_with_text_starting_with_start_b3fcbe71":"Link al testo che inizia con { start }","lists_should_be_formatted_as_lists_f862de8d":"Gli elenchi devono essere formattati come elenchi.","merge_links_2478df96":"Unisci link","next_40e12421":"Successivo","no_accessibility_issues_were_detected_f8d3c875":"Nessun problema di accessibilit?? rilevato.","no_headers_9bc7dc7f":"Nessuna intestazione","none_3b5e34d2":"Nessuno","paragraph_starting_with_start_a59923f8":"Paragrafo che inizia con { start }","prev_f82cbc48":"Precedente","remove_heading_style_5fdc8855":"Rimuovi stile intestazione","row_fc0944a7":"Riga","row_group_979f5528":"Gruppo di righe","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Gli screen reader non possono determinare cosa viene visualizzato in un\'\'immagine senza testo alternativo e i nomi file sono spesso stringhe di numeri e lettere senza senso che non descrivono il contesto o il significato.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Gli screen reader non possono determinare cosa viene visualizzato in un\'\'immagine senza testo alternativo, che descrive il contenuto e il significato dell\'\'immagine. Il testo alternativo deve essere semplice e conciso.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Gli screen reader non possono determinare cosa viene visualizzato in un\'\'immagine senza testo alternativo, che descrive il contenuto e il significato dell\'\'immagine.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Gli screen reader non possono interpretare le tabelle senza la struttura corretta. Le intestazioni della tabella fornisco indicazioni e ambito del contenuto.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Gli screen reader non possono interpretare le tabelle senza la struttura corretta. Le didascalie della tabella descrivono il contesto e le informazioni generali della tabella.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Gli screen reader non possono interpretare le tabelle senza la struttura corretta. Le intestazioni della tabella forniscono indicazioni e panoramica del contenuto.","set_header_scope_8c548f40":"Imposta ambito di intestazione","set_table_header_cfab13a0":"Imposta intestazione tabella","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Gli utenti senza problemi di vista esplorano le pagine web velocemente, cercando intestazioni in grassetto o di grandi dimensioni. Gli utenti di screen reader si affidano alle intestazioni per la comprensione contestuale. Le intestazioni devono utilizzare la struttura appropriata.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Gli utenti senza problemi di vista esplorano le pagine web velocemente, cercando intestazioni in grassetto o di grandi dimensioni. Gli utenti di screen reader si affidano alle intestazioni per la comprensione contestuale. Le intestazioni devono essere concise nella struttura appropriata.","table_header_starting_with_start_ffcabba6":"Intestazione tabella che inizia con { start }","table_starting_with_start_e7232848":"Tabella che inizia con { start }","tables_headers_should_specify_scope_5abf3a8e":"Le intestazioni delle tabelle devono specificare l\'\'ambito.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Le tabelle devono includere una didascalia che descrive i contenuti della tabella.","tables_should_include_at_least_one_header_48779eac":"Le tabelle devono includere almeno un\'\'intestazione.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Il testo ?? difficile da leggere senza un contrasto sufficiente tra il testo e lo sfondo, specialmente per gli ipovedenti.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Il testo con dimensioni maggiori di 18 pt (o in grassetto 14 pt) deve visualizzare un rapporto di contrasto minimo pari a 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Il testo con dimensioni minori di 18 pt (o in grassetto 14 pt) deve visualizzare un rapporto di contrasto minimo pari a 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Quando viene utilizzato il markup che formatta visivamente gli elementi come elenco ma non indica la relazione tra gli elenchi, gli utenti potrebbero avere difficolt?? a spostarsi tra le informazioni.","why_523b3d8c":"Perch??"},"ja":{"accessibility_checker_b3af1f6c":"???????????????????????????????????????","action_to_take_b626a99a":"??????????????????????????????","add_a_caption_2a915239":"???????????????????????????","add_alt_text_for_the_image_48cd88aa":"??????????????????????????????????????????","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"??????URL???????????????????????????1????????????????????????????????????????????????","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"???????????????????????????120???????????????????????????????????????","apply_781a2546":"??????","change_alt_text_92654906":"???????????????????????????","change_heading_tag_to_paragraph_a61e3113":"???????????????????????????????????????","change_text_color_1aecb912":"?????????????????????????????????","check_accessibility_3c78211c":"?????????????????????????????????????????????","checking_for_accessibility_issues_fac18c6d":"?????????????????????????????????????????????","close_accessibility_checker_29d1c51e":"???????????????????????????????????????????????????","close_d634289d":"?????????","column_e1ae5c64":"???","column_group_1c062368":"???????????????","decorative_image_fde98579":"???????????????","element_starting_with_start_91bf4c3b":"{ start } ??????????????????","fix_heading_hierarchy_f60884c4":"??????????????????????????????????????????","format_as_a_list_142210c3":"???????????????","header_column_f27433cb":"???????????????","header_row_and_column_ec5b9ec":"????????????????????????","header_row_f33eb169":"???????????????","heading_levels_should_not_be_skipped_3947c0e0":"????????????????????????????????????????????????????????????","heading_starting_with_start_42a3e7f9":"{ start } ?????????????????????","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"????????????????????????120???????????????????????????????????????","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"??????????????????????????????????????????????????????????????? alt ????????????????????????????????????????????????","image_with_filename_file_aacd7180":"??????????????? { file } ?????????","images_should_include_an_alt_attribute_describing__b86d6a86":"????????????????????????????????????????????? alt ??????????????????????????????????????????????????????","issue_num_total_f94536cf":"?????? { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"?????????????????? Tab ????????????????????????????????????????????????????????????????????????????????????2????????????????????????????????????????????????????????????????????????????????????????????????????????????","learn_more_about_adjacent_links_2cb9762c":"????????????????????????","learn_more_about_color_contrast_c019dfb9":"????????????????????????????????????","learn_more_about_organizing_page_headings_8a7caa2e":"???????????????????????????????????????","learn_more_about_table_headers_5f5ee13":"????????????????????????","learn_more_about_using_alt_text_for_images_5698df9a":"?????????????????????????????????????????????????????????","learn_more_about_using_captions_with_tables_36fe496f":"??????????????????????????????????????????????????????","learn_more_about_using_filenames_as_alt_text_264286af":"??????????????????????????????????????????????????????????????????","learn_more_about_using_lists_4e6eb860":"????????????????????????","learn_more_about_using_scope_attributes_with_table_20df49aa":"??????????????????????????????????????????????????????","leave_as_is_4facfe55":"?????????????????????","link_with_text_starting_with_start_b3fcbe71":"{ start } ???????????????????????????????????????","lists_should_be_formatted_as_lists_f862de8d":"???????????????????????????????????????????????????????????????","merge_links_2478df96":"???????????????????????????","next_40e12421":"???","no_accessibility_issues_were_detected_f8d3c875":"?????????????????????????????????????????????????????????????????????","no_headers_9bc7dc7f":"??????????????????","none_3b5e34d2":"??????","paragraph_starting_with_start_a59923f8":"{ start } ??????????????????","prev_f82cbc48":"??????","remove_heading_style_5fdc8855":"????????????????????????????????????","row_fc0944a7":"???","row_group_979f5528":"???????????????","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_determine_what_is_displayed__a57e6723":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_bd861652":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_e62912d5":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","set_header_scope_8c548f40":"???????????????????????????????????????","set_table_header_cfab13a0":"?????????????????????????????????","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"????????????????????????????????????????????????????????????Web???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"????????????????????????????????????????????????????????????Web??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","table_header_starting_with_start_ffcabba6":"{ start } ???????????????????????????","table_starting_with_start_e7232848":"{ start } ???????????????","tables_headers_should_specify_scope_5abf3a8e":"?????????????????????????????????????????????????????????????????????","tables_should_include_a_caption_describing_the_con_e91e78fc":"?????????????????????????????????????????????????????????????????????????????????????????????????????????","tables_should_include_at_least_one_header_48779eac":"???????????????????????????1??????????????????????????????????????????????????????????????????","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"18pt??????????????????14pt????????????????????????????????????3???1????????????????????????????????????????????????????????????????????????","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"18pt??????????????????14pt????????????????????????????????????4.5???1????????????????????????????????????????????????????????????????????????","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","why_523b3d8c":"??????"},"ko":{},"mi":{"accessibility_checker_b3af1f6c":"Kaitirotiro te whakaurutanga","action_to_take_b626a99a":"Mahi hei mahi:","add_a_caption_2a915239":"T??piri he tapanga","add_alt_text_for_the_image_48cd88aa":"T??piri kuputuhi alt mo te pakoko","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Ko ng?? hononga hono ki te URL kotahi me kotahi te hononga.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Kia kaua te kuputuhi huanga Alt e nui atu i te 120 ng?? reta.","apply_781a2546":"Tono","change_alt_text_92654906":"Huri k?? alt kuputuhi","change_heading_tag_to_paragraph_a61e3113":"Hurihia te pane t??tohu ki te parawae","change_text_color_1aecb912":"Huria te tae o te kuputuhi","check_accessibility_3c78211c":"??ta titiro te whakaurutanga","checking_for_accessibility_issues_fac18c6d":"??ta titiro mo ng?? take whakauru","close_accessibility_checker_29d1c51e":"Kati Kaitirotiro Whakaurutanga","close_d634289d":"Katia","column_e1ae5c64":"Pou","column_group_1c062368":"R??p?? pou","decorative_image_fde98579":"Whakapaipai ??hua","element_starting_with_start_91bf4c3b":"Te t??matanga o te kaupapa { start }","fix_heading_hierarchy_f60884c4":"Whakatikahia te hiranga o te pane","format_as_a_list_142210c3":"Whakah??putu hei r??rangi","header_column_f27433cb":"Pane pou","header_row_and_column_ec5b9ec":"Pane r??rangi me te pou","header_row_f33eb169":"Pane r??rangi","heading_levels_should_not_be_skipped_3947c0e0":"Ko ng?? taumata pane kaore e pekehia.","heading_starting_with_start_42a3e7f9":"Pane e t??mata ana me { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Kia kaua ng?? pane e nui atu i te 120 ng?? reta.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Kaua e whakamahia ng?? k??nae ingoa ki te whakamahi i te alt huanga e whak??tu ana i te ihirangi pakoko.","image_with_filename_file_aacd7180":"??hua me te k??nae ingoa { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Ko ng?? ??hua me whakauru he alt huanga e whak??hua ana i te ihirangi ??hua","issue_num_total_f94536cf":"Take { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Ka whakaterehia e ng?? papa p??tuhi ng?? hononga ki te whakamahi i Ripa k??. Ng?? hononga e rua e tata ana e tika ana ki te haerenga rite ka p??raruraru ki ng?? papa p??tuhi kaiwhakamahi.","learn_more_about_adjacent_links_2cb9762c":"Ako ano i ng?? hono tata","learn_more_about_color_contrast_c019dfb9":"Ako an?? i ng?? tae whakarerek??","learn_more_about_organizing_page_headings_8a7caa2e":"Ako an?? i ng?? whakahaere ng?? pane wh??rangi","learn_more_about_table_headers_5f5ee13":"Ako an?? i ng?? pane r??rangi","learn_more_about_using_alt_text_for_images_5698df9a":"Ako an?? i te mahi i ng?? alt kuputuhi mo ng?? ??hua","learn_more_about_using_captions_with_tables_36fe496f":"Ako an?? i te mahi i ng?? k??rero me ng?? r??rangi","learn_more_about_using_filenames_as_alt_text_264286af":"Ako an?? i te mahi i ng?? ingoa k??nae i te alt kuputuhi","learn_more_about_using_lists_4e6eb860":"Ako an?? i te mahi i ng?? r??rangi","learn_more_about_using_scope_attributes_with_table_20df49aa":"Ako an?? i te mahi i ng?? wh??nuitanga huanga me ng?? r??rangi","leave_as_is_4facfe55":"Waiho ki t??nei","link_with_text_starting_with_start_b3fcbe71":"Hono me te kuputuhi e t??mata ana me { start }","lists_should_be_formatted_as_lists_f862de8d":"Me whakaritehia ng?? r??rangi hei r??rangi.","merge_links_2478df96":"Whakapiri ng?? hononga","next_40e12421":"E haere ake nei","no_accessibility_issues_were_detected_f8d3c875":"Kaore he whakaurunga take i kitea.","no_headers_9bc7dc7f":"Kaore ng?? pane","none_3b5e34d2":"Kaore","paragraph_starting_with_start_a59923f8":"Parawae e t??mata ana me { start }","prev_f82cbc48":"Mua","remove_heading_style_5fdc8855":"Tango pane k??hua","row_fc0944a7":"R??rangi","row_group_979f5528":"R??p?? r??rangi","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Kaore e taea e ng?? kaip??nui mata te whakatau i ng?? mea e whak??tuhia ana i roto i te ??hua me te kore kuputuhi rerek??, a, he maha ng?? taura o ng?? tau me ng?? reta kaore i te whak??hua i te horopaki te tikanga r??nei.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Kaore e taea e ng?? kaip??nui mata te whakatau i ng?? mea e whak??turia ana i roto i te ??hua me te kore kuputuhi rerek??, e whak??tu ana i te ihirangi me te tikanga o te pakoko. Me ng??wari me te h??ngai t??tika te kuputuhi rerek??.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Kaore e taea e ng?? kaip??nui mata te whakatau i ng?? mea e whak??turia ana i roto i te ??hua me te kore kuputuhi rerek??, e whak??tu ana i te ihirangi me te tikanga o te pakoko.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Kaore e taea e ng?? kaip??nui mata ki te whakam??ori i ng?? papa kaore te hanganga tika. Ko ng??  pane ripanga e whakarato ana i te aronga me te kohinga ihirangi.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Kaore e taea e ng?? kaip??nui mata ki te whakam??ori i ng?? papa kaore te hanganga tika. Ko ng?? panuku tapanga e whakaatu ana i te horopaki me te m??tauranga wh??nui o te ripanga.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Kaore e taea e ng?? kaip??nui mata ki te whakam??ori i ng?? papa kaore te hanganga tika. Ko ng?? pane ripanga whakarato ana i te ahunga me te tirohanga o te ihirangi.","set_header_scope_8c548f40":"Whakatau horopaki pane","set_table_header_cfab13a0":"Whakatau pane ripanga","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Ng?? kaiwhakamahi e ??hei ana ki te tiro p??tirotiro tere i te ng?? wh??rangi tukutuku, me te rapu i ng?? pane nui, maia r??nei. Ka whakawhirinaki ng?? kaiwhakamahi p??nui mata ki ng?? pane mo te m??ramatanga o te horopaki. Me whakamahi ng?? pane i te hanganga tika.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Ng?? kaiwhakamahi e ??hei ana ki te tiro p??tirotiro tere i te ng?? wh??rangi tukutuku, me te rapu i ng?? pane nui, maia r??nei. Ka whakawhirinaki ng?? kaiwhakamahi p??nui mata ki ng?? pane mo te m??ramatanga o te horopaki. Me whai kiko ng?? pane ki roto i te hanganga tika.","table_header_starting_with_start_ffcabba6":"Ka timata te pane ripanga mei te { start }","table_starting_with_start_e7232848":"Ripanga e timata ana me { start }","tables_headers_should_specify_scope_5abf3a8e":"Me tautuhi ng?? pane ripanga ki te whakaputa te h??kai.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Me whakauru ng?? ripanga ki t??tahi tuhinga e whakaatu ana i ng?? ihirangi o te ripanga.","tables_should_include_at_least_one_header_48779eac":"Me whakauru ng?? ripanga i te iti rawa o te pane kotahi.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"He uaua te panui, kaore he rerek??tanga i waenga i te tuhinga me te papamuri, ina koa mo te hunga e iti ana te kite.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Ko te kuputuhi nui ake i te 18pt (me te maia 14pt) me whak??tu i te ??wehenga rerek?? iti o te 3: 1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Ko te kuputuhi iti atu i te 18pt (me te maia 14pt) me whak??tu i te ??wehenga rerek?? iti o te 4.5: 1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Ina whakamahia te tohu tohu i ng?? taonga tautuhi tirohanga hei r??rangi, ??ngari kaore e tohu i te hononga o te r??rangi, he uaua ki ng?? kaiwhakamahi te whakawhiti i ng?? k??rero.","why_523b3d8c":"He aha"},"nb-x-k12":{"accessibility_checker_b3af1f6c":"Tilgjengelighetstester","action_to_take_b626a99a":"Handling ?? utf??re:","add_a_caption_2a915239":"Legg til overskrift","add_alt_text_for_the_image_48cd88aa":"Legg til alternativ tekst for bildet","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Lenker ved siden av hverandre med samme URL b??r v??re samme lenke.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt-attributter b??r ikke inneholde mer enn 120 tegn.","apply_781a2546":"Bruk","change_alt_text_92654906":"Endre alternativ tekst","change_heading_tag_to_paragraph_a61e3113":"Endre titteltagg til setning","change_text_color_1aecb912":"Endre tekstfarge","check_accessibility_3c78211c":"Test tilgjengelighet","checking_for_accessibility_issues_fac18c6d":"Tester for tilgjengelighetsproblemer","close_accessibility_checker_29d1c51e":"Lukk tilgjengelighetstester","close_d634289d":"Lukk","column_e1ae5c64":"Kolonne","column_group_1c062368":"Kolonnegruppe","decorative_image_fde98579":"Dekorativt bilde","element_starting_with_start_91bf4c3b":"Element som starter med { start }","fix_heading_hierarchy_f60884c4":"Reparer tittelhierarki","format_as_a_list_142210c3":"Formater som liste","header_column_f27433cb":"Tittelkolonne","header_row_and_column_ec5b9ec":"Tittelrad og kolonne","header_row_f33eb169":"Tittelrad","heading_levels_should_not_be_skipped_3947c0e0":"Tittelniv??er b??r ikke hoppes over","heading_starting_with_start_42a3e7f9":"Tittel som starter med { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Titler b??r ikke inneholde mer enn 120 tegn.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Bildefilnavn b??r ikke brukes som den alt-attributt som beskriver bildeinnholdet.","image_with_filename_file_aacd7180":"Bilde med filnavn { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Bilder burde inneholde en alt-attributt som beskriver bildeinnholdet.","issue_num_total_f94536cf":"Problem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tastatur navigerer til lenker ved ?? bruke tabulatortasten. To lenker som viser til samme destinasjon kan v??re forvirrende for tastaturbrukere.","learn_more_about_adjacent_links_2cb9762c":"L??r mer om lenker ved siden av","learn_more_about_color_contrast_c019dfb9":"L??r mer om fargekontrast","learn_more_about_organizing_page_headings_8a7caa2e":"L??r mer om hvordan organisere sideoverskrifter","learn_more_about_table_headers_5f5ee13":"L??r mer om tabelloverskrifter","learn_more_about_using_alt_text_for_images_5698df9a":"L??r mer om hvordan bruke alt tekst for bilder","learn_more_about_using_captions_with_tables_36fe496f":"L??r mer om hvordan bruke bildetekst med tabeller","learn_more_about_using_filenames_as_alt_text_264286af":"L??r mer om hvordan bruke filnavn som alt tekst","learn_more_about_using_lists_4e6eb860":"L??r mer om hvordan bruke lister","learn_more_about_using_scope_attributes_with_table_20df49aa":"L??r mer om hvordan bruke omfangsatributter med tabeller","leave_as_is_4facfe55":"La det v??re","link_with_text_starting_with_start_b3fcbe71":"Lenke med tekst som starter med { start }","lists_should_be_formatted_as_lists_f862de8d":"Lister m?? formateres som lister.","merge_links_2478df96":"Sl?? sammen lenker","next_40e12421":"Neste","no_accessibility_issues_were_detected_f8d3c875":"Ingen tiljengelighetsproblemer ble oppdaget.","no_headers_9bc7dc7f":"Ingen titler","none_3b5e34d2":"Ingen","paragraph_starting_with_start_a59923f8":"Setning som starter med { start }","prev_f82cbc48":"Forrige","remove_heading_style_5fdc8855":"Fjern tittelstil","row_fc0944a7":"Rad","row_group_979f5528":"Radgruppe","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Skjermlesere kan ikke avgj??re hva som vises i et bilde uten alternativ tekst, og filnavn er ofte meningsl??se strenger av bokstaver og siffer som ikke beskriver konteksten eller meningen.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Skjermlesere kan ikke avgj??re hva som vises i et bilde uten alternativ tekst som beskriver innholdet og meningen med bildet. Alternativ tekst b??r v??re kort og konsis.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Skjermlesere kan ikke avgj??re hva som vises i et bilde uten alternativ tekst som beskriver innholdet og meningen med bildet.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Skjermlesere kan ikke tolke tabeller uten skikkelig struktur. Tabelltitler gir rettledning og indikerer innholdsomfang.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Skjermlesere kan ikke tolke tabeller uten skikkelig struktur. Tabelloverskrifter beskriver konteksten og den generelle forst??elsen av tabellen.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Skjermlesere kan ikke tolke tabeller uten skikkelig struktur. Tabelltitler gir rettledning og  oversikt over innholdet.","set_header_scope_8c548f40":"Sett tittelomfang","set_table_header_cfab13a0":"Sett tabelltittel","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Seende brukere surfer nettsider kjapt, og ser etter store eller uthevede titler. Brukere av skjermlesere er avhengige av titler for ?? forst?? konteksten. Titler b??r bruke korrekt struktur.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Seende brukere surfer nettsider kjapt, og ser etter store eller uthevede titler. Brukere av skjermlesere er avhengige av titler for ?? forst?? konteksten. Titler b??r v??re konsise innenfor den korrekte strukturen.","table_header_starting_with_start_ffcabba6":"Tabelltittel starter med { start }","table_starting_with_start_e7232848":"Tabell starter med { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabelltitler b??r spesifisere omfang.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabeller b??r inkludere en overskrift som beskriver innholdet i tabellen.","tables_should_include_at_least_one_header_48779eac":"Tabeller b??r inkludere minst en tittel.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Teksten er vanskelig ?? lese uten tilstrekkelig kontrast mellom tekst og bakgrunn, spesielt for svaksynte.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Tekst st??rre enn 18pkt (eller tykk 14pkt) b??r vises med en minimums kontrastrate p?? 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Tekst mindre enn 18pkt (eller tykk 14pkt) b??r vises med en minimums kontrastrate p?? 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"N??r det brukes markering som visuelt formaterer elementer som en liste men ikke indikerer et listeforhold kan brukere finne det vanskelig ?? navigere informasjonen.","why_523b3d8c":"Hvorfor"},"nb":{"accessibility_checker_b3af1f6c":"Tilgjengelighetstester","action_to_take_b626a99a":"Handling ?? utf??re:","add_a_caption_2a915239":"Legg til overskrift","add_alt_text_for_the_image_48cd88aa":"Legg til alternativ tekst for bildet","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Lenker ved siden av hverandre med samme URL b??r v??re samme lenke.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt-attributter b??r ikke inneholde mer enn 120 tegn.","apply_781a2546":"Legg til","change_alt_text_92654906":"Endre alternativ tekst","change_heading_tag_to_paragraph_a61e3113":"Endre titteltagg til setning","change_text_color_1aecb912":"Endre tekstfarge","check_accessibility_3c78211c":"Test tilgjengelighet","checking_for_accessibility_issues_fac18c6d":"Tester for tilgjengelighetsproblemer","close_accessibility_checker_29d1c51e":"Lukk tilgjengelighetstester","close_d634289d":"Lukk","column_e1ae5c64":"Kolonne","column_group_1c062368":"Kolonnegruppe","decorative_image_fde98579":"Dekorativt bilde","element_starting_with_start_91bf4c3b":"Element som starter med { start }","fix_heading_hierarchy_f60884c4":"Reparer tittelhierarki","format_as_a_list_142210c3":"Formater som liste","header_column_f27433cb":"Tittelkolonne","header_row_and_column_ec5b9ec":"Tittelrad og kolonne","header_row_f33eb169":"Tittelrad","heading_levels_should_not_be_skipped_3947c0e0":"Tittelniv??er b??r ikke hoppes over","heading_starting_with_start_42a3e7f9":"Tittel som starter med { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Titler b??r ikke inneholde mer enn 120 tegn.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Bildefilnavn b??r ikke brukes som den alt-attributt som beskriver bildeinnholdet.","image_with_filename_file_aacd7180":"Bilde med filnavn { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Bilder burde inneholde en alt-attributt som beskriver bildeinnholdet.","issue_num_total_f94536cf":"Problem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tastatur navigerer til lenker ved ?? bruke tabulatortasten. To lenker som viser til samme destinasjon kan v??re forvirrende for tastaturbrukere.","learn_more_about_adjacent_links_2cb9762c":"L??r mer om lenker ved siden av","learn_more_about_color_contrast_c019dfb9":"L??r mer om fargekontrast","learn_more_about_organizing_page_headings_8a7caa2e":"L??r mer om hvordan organisere sideoverskrifter","learn_more_about_table_headers_5f5ee13":"L??r mer om tabelloverskrifter","learn_more_about_using_alt_text_for_images_5698df9a":"L??r mer om hvordan bruke alt tekst for bilder","learn_more_about_using_captions_with_tables_36fe496f":"L??r mer om hvordan bruke bildetekst med tabeller","learn_more_about_using_filenames_as_alt_text_264286af":"L??r mer om hvordan bruke filnavn som alt tekst","learn_more_about_using_lists_4e6eb860":"L??r mer om hvordan bruke lister","learn_more_about_using_scope_attributes_with_table_20df49aa":"L??r mer om hvordan bruke omfangsatributter med tabeller","leave_as_is_4facfe55":"La det v??re","link_with_text_starting_with_start_b3fcbe71":"Lenke med tekst som starter med { start }","lists_should_be_formatted_as_lists_f862de8d":"Lister m?? formateres som lister.","merge_links_2478df96":"Sl?? sammen lenker","next_40e12421":"Neste","no_accessibility_issues_were_detected_f8d3c875":"Ingen tiljengelighetsproblemer ble oppdaget.","no_headers_9bc7dc7f":"Ingen titler","none_3b5e34d2":"Ingen","paragraph_starting_with_start_a59923f8":"Setning som starter med { start }","prev_f82cbc48":"Forrige","remove_heading_style_5fdc8855":"Fjern tittelstil","row_fc0944a7":"Rad","row_group_979f5528":"Radgruppe","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Skjermlesere kan ikke avgj??re hva som vises i et bilde uten alternativ tekst, og filnavn er ofte meningsl??se strenger av bokstaver og siffer som ikke beskriver konteksten eller meningen.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Skjermlesere kan ikke avgj??re hva som vises i et bilde uten alternativ tekst som beskriver innholdet og meningen med bildet. Alternativ tekst b??r v??re kort og konsis.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Skjermlesere kan ikke avgj??re hva som vises i et bilde uten alternativ tekst som beskriver innholdet og meningen med bildet.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Skjermlesere kan ikke tolke tabeller uten skikkelig struktur. Tabelltitler gir rettledning og indikerer innholdsomfang","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Skjermlesere kan ikke tolke tabeller uten skikkelig struktur. Tabelloverskrifter beskriver konteksten og den generelle forst??elsen av tabellen.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Skjermlesere kan ikke tolke tabeller uten skikkelig struktur. Tabelltitler gir rettledning og  oversikt over innholdet.","set_header_scope_8c548f40":"Sett tittelomfang","set_table_header_cfab13a0":"Sett tabelltittel","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Seende brukere surfer nettsider kjapt, og ser etter store eller uthevede titler. Brukere av skjermlesere er avhengige av titler for ?? forst?? konteksten. Titler b??r bruke korrekt struktur.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Seende brukere surfer nettsider kjapt, og ser etter store eller uthevede titler. Brukere av skjermlesere er avhengige av titler for ?? forst?? konteksten. Titler b??r v??re konsise innenfor den korrekte strukturen.","table_header_starting_with_start_ffcabba6":"Tabelltittel starter med { start }","table_starting_with_start_e7232848":"Tabell starter med { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabelltitler b??r spesifisere omfang.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabeller b??r inkludere en overskrift som beskriver innholdet i tabellen.","tables_should_include_at_least_one_header_48779eac":"Tabeller b??r inkludere minst en tittel.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Teksten er vanskelig ?? lese uten tilstrekkelig kontrast mellom tekst og bakgrunn, spesielt for svaksynte. ","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Tekst st??rre enn 18pkt (eller tykk 14pkt) b??r vises med en minimums kontrastrate p?? 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Tekst mindre enn 18pkt (eller tykk 14pkt) b??r vises med en minimums kontrastrate p?? 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"N??r det brukes markering som visuellt formaterer elementer som en liste men ikke indikerer et listeforhold kan brukere finne det vanskelig ?? navigere informasjonen.","why_523b3d8c":"Hvorfor"},"nl":{"accessibility_checker_b3af1f6c":"Toegankelijkheidscontrole","action_to_take_b626a99a":"Te ondernemen actie:","add_a_caption_2a915239":"Ondertiteling toevoegen","add_alt_text_for_the_image_48cd88aa":"Alt-tekst toevoegen voor de afbeelding","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Aangrenzende koppelingen met dezelfde URL moeten ????n koppeling zijn.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt-tekst mag niet meer dan 120 tekens bevatten.","apply_781a2546":"Toepassen","change_alt_text_92654906":"Alt-tekst wijzigen","change_heading_tag_to_paragraph_a61e3113":"Koptekstlabel bij alinea","change_text_color_1aecb912":"Tekstkleur wijzigen","check_accessibility_3c78211c":"Toegankelijkheid controleren","checking_for_accessibility_issues_fac18c6d":"Controleren op toegankelijkheidsproblemen","close_accessibility_checker_29d1c51e":"Toegankelijkheidscontrole sluiten","close_d634289d":"Sluiten","column_e1ae5c64":"Kolom","column_group_1c062368":"Kolomgroep","decorative_image_fde98579":"Decoratieve afbeelding","element_starting_with_start_91bf4c3b":"Element dat begint met { start }","fix_heading_hierarchy_f60884c4":"Hi??rarchie van kopteksten corrigeren","format_as_a_list_142210c3":"Opmaken als lijst","header_column_f27433cb":"Koptekstkolom","header_row_and_column_ec5b9ec":"Koptekstrij en -kolom","header_row_f33eb169":"Koptekstrij","heading_levels_should_not_be_skipped_3947c0e0":"Koptekstniveaus mogen niet worden overgeslagen.","heading_starting_with_start_42a3e7f9":"Koptekst die begint met { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Kopteksten mogen niet meer dan 120 tekens bevatten.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Namen van afbeeldingsbestanden mogen niet worden gebruikt als alt-kenmerk voor beschrijving van de inhoud van de afbeelding.","image_with_filename_file_aacd7180":"Afbeelding met bestandsnaam { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Afbeeldingen moeten een alt-kenmerk hebben dat de inhoud van de afbeelding beschrijft.","issue_num_total_f94536cf":"Probleem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Gebruik de Tab-toets op het toetsenbord om te navigeren naar koppelingen. Twee aangrenzende koppelingen die naar dezelfde bestemming leiden, kunnen verwarrend werken bij gebruik van het toetsenbord.","learn_more_about_adjacent_links_2cb9762c":"Meer informatie over aangrenzende links","learn_more_about_color_contrast_c019dfb9":"Meer informatie over kleurcontrast","learn_more_about_organizing_page_headings_8a7caa2e":"Meer informatie over ordenen van paginakopteksten","learn_more_about_table_headers_5f5ee13":"Meer informatie over tabelkopteksten","learn_more_about_using_alt_text_for_images_5698df9a":"Meer informatie over gebruik van alt-tekst voor afbeeldingen","learn_more_about_using_captions_with_tables_36fe496f":"Meer informatie over gebruik van ondertiteling met tabellen","learn_more_about_using_filenames_as_alt_text_264286af":"Meer informatie over gebruik van bestandsnamen als alt-tekst","learn_more_about_using_lists_4e6eb860":"Meer informatie over gebruik van lijsten","learn_more_about_using_scope_attributes_with_table_20df49aa":"Meer informatie over gebruik van bereikattributen met tabellen","leave_as_is_4facfe55":"Ongewijzigd laten","link_with_text_starting_with_start_b3fcbe71":"Koppeling maken naar tekst die begint met { start }","lists_should_be_formatted_as_lists_f862de8d":"Lijsten moeten als lijst worden opgemaakt.","merge_links_2478df96":"Koppelingen samenvoegen","next_40e12421":"Volgende","no_accessibility_issues_were_detected_f8d3c875":"Geen toegankelijkheidsproblemen gevonden.","no_headers_9bc7dc7f":"Geen kopteksten","none_3b5e34d2":"Geen","paragraph_starting_with_start_a59923f8":"Alinea die begint met { start }","prev_f82cbc48":"Vorige","remove_heading_style_5fdc8855":"Koptekststijl verwijderen","row_fc0944a7":"Rij","row_group_979f5528":"Rijgroep","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Schermlezers kunnen niet bepalen wat er wordt weergegeven in een afbeelding zonder alt-tekst en bestandsnamen zijn vaak betekenisloze tekenreeksen van cijfers en letters die niets over de inhoud of betekenis prijsgeven.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Schermlezers kunnen niet bepalen wat er wordt weergegeven in een afbeelding zonder alt-tekst, die de inhoud en betekenis van de afbeelding beschrijft. Alt-tekst moet eenvoudig en beknopt zijn.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Schermlezers kunnen niet bepalen wat er wordt weergegeven in een afbeelding zonder alt-tekst, die de inhoud en betekenis van de afbeelding beschrijft.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Schermlezers kunnen geen tabellen zonder de juiste structuur interpreteren. Tabelkoppen geven een aanduiding van de inhoud.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Schermlezers kunnen geen tabellen zonder de juiste structuur interpreteren. Tabelbijschriften geven de context en een algemeen beeld van de tabel.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Schermlezers kunnen geen tabellen zonder de juiste structuur interpreteren. Tabelkoppen geven een aanduiding van de inhoud.","set_header_scope_8c548f40":"Kopbeschrijving instellen","set_table_header_cfab13a0":"Tablekop instellen","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Slechtzienden bladeren snel door webpagina\'\'s, op zoek naar grote of vette koppen. Gebruikers van schermlezers zijn afhankelijk van koppen om een idee van de context te krijgen. Koppen moeten de juiste structuur hebben.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Slechtzienden bladeren snel door webpagina\'\'s, op zoek naar grote of vette koppen. Gebruikers van schermlezers zijn afhankelijk van koppen om een idee van de context te krijgen. Koppen moeten beknopt zijn en de juiste structuur hebben.","table_header_starting_with_start_ffcabba6":"Tabelkop die begint met { start }","table_starting_with_start_e7232848":"Tabel die begint met { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabelkoppen moeten de context aangeven.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabellen moeten een bijschrift bevatten dat de inhoud van de tabel aangeeft.","tables_should_include_at_least_one_header_48779eac":"Tabellen moeten minstens ????n kop hebben.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Tekst is moeilijk te lezen zonder voldoende contrast tussen de tekst en de achtergrond, met name voor slechtzienden.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Voor tekst groter dan 18pt (of vet 14pt) geldt een miinimum contrastverhouding van 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Voor tekst kleiner dan 18pt (of vet 14pt) geldt een miinimum contrastverhouding van 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Wanneer een markering is gebruikt die items visueel opmaakt als een lijst maar de lijstrelatie niet aangeeft, kan het voor gebruikers moeilijk zijn om door de informatie te navigeren.","why_523b3d8c":"Waarom"},"pl":{"accessibility_checker_b3af1f6c":"Kontrola dost??pno??ci","action_to_take_b626a99a":"Wymagane dzia??anie:","add_a_caption_2a915239":"Dodaj napis","add_alt_text_for_the_image_48cd88aa":"Dodaj alternatywny tekst dla obrazka","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"S??siaduj??ce ????cza o tym samym adresie URL powinny stanowi?? pojedyncze ????cze.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alternatywny tekst nie mo??e zawiera?? wi??cej ni?? 120 znak??w.","apply_781a2546":"Zastosuj","change_alt_text_92654906":"Zmie?? alternatywny tekst","change_heading_tag_to_paragraph_a61e3113":"Zmie?? tag nag????wka na akapit","change_text_color_1aecb912":"Zmie?? kolor tekstu","check_accessibility_3c78211c":"Sprawd?? dost??pno????","checking_for_accessibility_issues_fac18c6d":"Sprawd?? problemy z dost??pno??ci??","close_accessibility_checker_29d1c51e":"Zamknij kontrol?? dost??pno??ci","close_d634289d":"Zamknij","column_e1ae5c64":"Kolumna","column_group_1c062368":"Grupa kolumn","decorative_image_fde98579":"Obraz dekoracyjny","element_starting_with_start_91bf4c3b":"Element rozpoczynaj??cy si?? od { start }","fix_heading_hierarchy_f60884c4":"Przypnij hierarchi?? nag????wk??w","format_as_a_list_142210c3":"Formatuj jako list??","header_column_f27433cb":"Kolumna nag????wka","header_row_and_column_ec5b9ec":"Wiersz i kolumna nag????wka","header_row_f33eb169":"Wiersz nag????wka","heading_levels_should_not_be_skipped_3947c0e0":"Poziom??w nag????wka nie mo??na pomija??.","heading_starting_with_start_42a3e7f9":"Nag????wek rozpoczynaj??cy si?? od { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Nag????wki nie powinny zawiera?? wi??cej ni?? 120 znak??w.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Nazw plik??w obrazu nie mo??na u??ywa?? jako alternatywnego atrybutu opisuj??cego zawarto???? obrazu.","image_with_filename_file_aacd7180":"Plik obrazu z nazw?? { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Obrazy powinny obejmowa?? alternatywny atrybut opisuj??cy zawarto???? obrazu.","issue_num_total_f94536cf":"Problem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Klawiatury pozwalaj?? przej???? do ????czy za pomoc?? klawisza Tab. Dwa s??siednie ????cza prowadz??cego do tej samej lokalizacji mog?? wprowadza?? u??ytkownik??w klawiatury w b????d.","learn_more_about_adjacent_links_2cb9762c":"Uzyskaj wi??cej informacji na temat s??siaduj??cych link??w","learn_more_about_color_contrast_c019dfb9":"Uzyskaj wi??cej informacji na temat kontrastu barw","learn_more_about_organizing_page_headings_8a7caa2e":"Uzyskaj wi??cej informacji na temat organizacji nag????wk??w na stronie","learn_more_about_table_headers_5f5ee13":"Uzyskaj wi??cej informacji na temat nag????wk??w tabeli","learn_more_about_using_alt_text_for_images_5698df9a":"Uzyskaj wi??cej informacji na temat alternatywnego tekstu dla obraz??w","learn_more_about_using_captions_with_tables_36fe496f":"Uzyskaj wi??cej informacji na temat napis??w i tabel","learn_more_about_using_filenames_as_alt_text_264286af":"Uzyskaj wi??cej informacji na temat nazw plik??w jako alternatywnego tekstu","learn_more_about_using_lists_4e6eb860":"Uzyskaj wi??cej informacji na temat korzystania z list","learn_more_about_using_scope_attributes_with_table_20df49aa":"Uzyskaj wi??cej informacji na temat atrybut??w zakresu i tabel","leave_as_is_4facfe55":"Pozostaw jako","link_with_text_starting_with_start_b3fcbe71":"Powi???? z tekstem, kt??ry si?? zaczyna od s????w { start }","lists_should_be_formatted_as_lists_f862de8d":"Listy nale??y sformatowa?? jako listy.","merge_links_2478df96":"Scal ????cza","next_40e12421":"Nast??pny","no_accessibility_issues_were_detected_f8d3c875":"Nie wykryto problem??w z dost??pno??ci??.","no_headers_9bc7dc7f":"Brak nag????wk??w","none_3b5e34d2":"Brak","paragraph_starting_with_start_a59923f8":"Akapit rozpoczynaj??cy si?? od { start }","prev_f82cbc48":"Poprz","remove_heading_style_5fdc8855":"Usu?? styl nag????wka","row_fc0944a7":"Wiersz","row_group_979f5528":"Grupa wierszy","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Czytniki ekranu nie mog?? okre??li??, co jest wy??wietlone na obrazie bez alternatywnego tekstu, a nazwy plik??w s?? cz??sto pozbawionymi znaczenia ci??gami cyfr i liter, kt??re nie opisuj?? kontekstu.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Czytniki ekranu nie mog?? okre??li??, co jest wy??wietlone na obrazie bez alternatywnego tekstu, kt??ry opisywa??by zawarto???? i znaczenie obrazu. Tekst alternatywny powinien by?? prosty i zwi??z??y.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Czytniki ekranu nie mog?? okre??li??, co jest wy??wietlone na obrazie bez alternatywnego tekstu, kt??ry opisywa??by zawarto???? i znaczenie obrazu.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Czytniki ekranu nie mog?? interpretowa?? tabel bez odpowiedniej struktury. Nag????wki tabel zapewniaj?? wskaz??wki i wskazuj?? na zakres zawarto??ci.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Czytniki ekranu nie mog?? interpretowa?? tabel bez odpowiedniej struktury. Napisy w tabelach opisuj?? kontekst i og??lne przes??anie tabeli.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Czytniki ekranu nie mog?? interpretowa?? tabel bez odpowiedniej struktury. Nag????wki tabeli zapewniaj?? wskaz??wki i streszczenie zawarto??ci.","set_header_scope_8c548f40":"Ustaw zakres nag????wka","set_table_header_cfab13a0":"Ustaw nag????wek tabeli","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"U??ytkownicy z dobrym wzrokiem szybciej przegl??daj?? strony internetowe, odszukuj??c du??e lub zapisane pogrubion?? czcionk?? nag????wki. U??ytkownicy czytnik??w ekranu polegaj?? na nag????wkach dla zrozumienia kontekstu. Nag????wki musz?? wykorzystywa?? odpowiedni?? struktur??.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"U??ytkownicy z dobrym wzrokiem szybciej przegl??daj?? strony internetowe, odszukuj??c du??e lub zapisane pogrubion?? czcionk?? nag????wki. U??ytkownicy czytnik??w ekranu polegaj?? na nag????wkach dla zrozumienia kontekstu. Nag????wki w prawid??owej strukturze musz?? by?? zwi??z??e.","table_header_starting_with_start_ffcabba6":"Nag????wek tabeli rozpoczynaj??cy si?? od { start }","table_starting_with_start_e7232848":"Tabela rozpoczynaj??ca si?? od { start }","tables_headers_should_specify_scope_5abf3a8e":"Nag????wki tabeli powinny okre??la?? zakres.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabele powinny obejmowa?? opis zawarto??ci tabeli.","tables_should_include_at_least_one_header_48779eac":"Tabele powinny zawiera?? co najmniej jeden nag????wek.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Tekst jest trudny do czytania bez wystarczaj??cego kontrastu mi??dzy tekstem i t??em, szczeg??lnie w przypadku os??b ze s??abym wzrokiem.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Tekst o czcionce powy??ej 18 pt (lub pogrubionej 14 pt) powinien korzysta?? ze wsp????czynnika kontrastu co najmniej 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Tekst o czcionce poni??ej 18 pt (lub pogrubionej 14 pt) powinien korzysta?? ze wsp????czynnika kontrastu co najmniej 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Gdy u??ywane jest oznaczenie, kt??re wizualnie formatuje elementy jako list??, ale nie wskazuje na relacje w li??cie, u??ytkownicy mog?? mie?? problem z nawigowaniem po informacjach.","why_523b3d8c":"Dlaczego"},"pt-BR":{"accessibility_checker_b3af1f6c":"Verificador de acessibilidade:","action_to_take_b626a99a":"A????o a tomar:","add_a_caption_2a915239":"Adicionar legendas","add_alt_text_for_the_image_48cd88aa":"Adicionar texto alternativo para a imagem","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Links adjacentes com a mesma URL devem ser um ??nico link.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Texto do atributo alternativo n??o deve ter mais de 120 caracteres.","apply_781a2546":"Aplicar","change_alt_text_92654906":"Alterar texto alternativo","change_heading_tag_to_paragraph_a61e3113":"Alterar tag do t??tulo para par??grafo","change_text_color_1aecb912":"Alterar cor do texto","check_accessibility_3c78211c":"Verificar acessibilidade","checking_for_accessibility_issues_fac18c6d":"Verificando problemas de acessibilidade","close_accessibility_checker_29d1c51e":"Fechar Verificador de acessibilidade","close_d634289d":"Fechar","column_e1ae5c64":"Coluna","column_group_1c062368":"Grupo de colunas","decorative_image_fde98579":"Imagem decorativa","element_starting_with_start_91bf4c3b":"Elemento come??ando com { start }","fix_heading_hierarchy_f60884c4":"Corrigir hierarquia de t??tulos","format_as_a_list_142210c3":"Formatar como uma lista","header_column_f27433cb":"Coluna do cabe??alho","header_row_and_column_ec5b9ec":"Linha e coluna do cabe??alho","header_row_f33eb169":"Linha do cabe??alho","heading_levels_should_not_be_skipped_3947c0e0":"N??veis de t??tulos n??o devem ser pulados.","heading_starting_with_start_42a3e7f9":"T??tulo come??ando com { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"T??tulos n??o devem ter mais de 120 caracteres.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Nomes de arquivos da imagem n??o devem ser usados como atributo alternativo descrevendo o conte??do da imagem.","image_with_filename_file_aacd7180":"Imagem com nome de arquivo { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Imagens devem incluir um atributo alternativo descrevendo o conte??do da imagem.","issue_num_total_f94536cf":"Problema { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Teclados navegam para links usando a tecla Tab. Dois links adjacentes que direcionam para o mesmo destino podem ser confusos para usu??rios de teclado.","learn_more_about_adjacent_links_2cb9762c":"Saiba mais sobre links adjacentes","learn_more_about_color_contrast_c019dfb9":"Saiba mais sobre o contraste de cores","learn_more_about_organizing_page_headings_8a7caa2e":"Saiba mais sobre a organiza????o de cabe??alhos da p??gina","learn_more_about_table_headers_5f5ee13":"Saiba mais sobre cabe??alhos de tabelas","learn_more_about_using_alt_text_for_images_5698df9a":"Saiba mais sobre o uso de texto alternativo para imagens","learn_more_about_using_captions_with_tables_36fe496f":"Saiba mais sobre o uso de legendas com tabelas","learn_more_about_using_filenames_as_alt_text_264286af":"Saiba mais sobre o uso de nomes de arquivos como texto alternativo","learn_more_about_using_lists_4e6eb860":"Saiba mais sobre o uso de listas","learn_more_about_using_scope_attributes_with_table_20df49aa":"Saiba mais sobre o uso de atributos de escopo com tabelas","leave_as_is_4facfe55":"Deixar como est??","link_with_text_starting_with_start_b3fcbe71":"Link com texto come??ando com { start }","lists_should_be_formatted_as_lists_f862de8d":"Listas devem ser formatadas como listas.","merge_links_2478df96":"Mesclar links","next_40e12421":"Pr??ximo","no_accessibility_issues_were_detected_f8d3c875":"Sem problemas de acessibilidades detectados.","no_headers_9bc7dc7f":"Sem cabe??alhos","none_3b5e34d2":"Nenhum","paragraph_starting_with_start_a59923f8":"Par??grafo come??ando com { start }","prev_f82cbc48":"Ant","remove_heading_style_5fdc8855":"Remover estilo do t??tulo","row_fc0944a7":"Linha","row_group_979f5528":"Grupo de linhas","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Leitores de tela n??o podem determinar o que ?? exibido em uma imagem sem texto alternativo, e nomes de arquivos geralmente s??o strings sem significados de n??meros e letras que n??o descrevem o contexto ou significado.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Leitores de tela n??o podem determinar o que ?? exibido em uma imagem sem texto alternativo, que descreve o conte??do e significado da imagem. Texto alternativo deve ser simples e conciso.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Leitores de tela n??o podem determinar o que ?? exibido em uma imagem sem texto alternativo, que descreve o conte??do e significado da imagem.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Leitores de tela n??o podem interpretar tabelas sem a estrutura adequada. Cabe??alhos de tabelas fornecem dire????o e ??mbito do conte??do.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Leitores de tela n??o podem interpretar tabelas sem a estrutura adequada. Legendas de tabelas descrevem o contexto e entendimento geral da tabela.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Leitores de tela n??o podem interpretar tabelas sem a estrutura adequada. Cabe??alhos de tabelas fornecem dire????o e vis??o geral do conte??do.","set_header_scope_8c548f40":"Definir ??mbito do cabe??alho","set_table_header_cfab13a0":"Definir cabe??alho da tabela","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Deficientes visuais navegam rapidamente nas p??ginas web, buscando t??tulos grandes ou negritos. Usu??rios de leitores de tela dependem dos cabe??alhos para entendimento contextual. Os cabe??alhos devem usar a estrutura adequada.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Deficientes visuais navegam rapidamente nas p??ginas web, buscando t??tulos grandes ou negritos. Usu??rios de leitores de tela dependem dos cabe??alhos para entendimento contextual. Os cabe??alhos devem ser concisos dentro da estrutura adequada.","table_header_starting_with_start_ffcabba6":"Cabe??alho de tabela come??ando com { start }","table_starting_with_start_e7232848":"Tabela come??ando com { start }","tables_headers_should_specify_scope_5abf3a8e":"Cabe??alhos de tabela devem especificar o ??mbito.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabelas devem incluir uma legenda descrevendo o conte??do da tabela.","tables_should_include_at_least_one_header_48779eac":"Tabelas devem incluir pelo menos um cabe??alho.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Texto ?? dif??cil de ler sem contraste suficiente entre o texto e o plano de fundo, especialmente para aqueles com pouca vis??o.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Texto maior do que 18pt (ou negrito 14pt) deve exibir uma raz??o m??nima de contraste de 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Texto menor do que 18pt (ou negrito 14pt) deve exibir uma raz??o m??nima de contraste de 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Quando marca????o ?? usada, que visualmente formata itens como uma lista, mas n??o indica o relacionamento da lista, os usu??rios podem ter dificuldade em navegar pelas informa????es.","why_523b3d8c":"Por que"},"pt-PT":{"accessibility_checker_b3af1f6c":"Verificador de acessibilidade","action_to_take_b626a99a":"A????o a tomar:","add_a_caption_2a915239":"Adicionar uma legenda","add_alt_text_for_the_image_48cd88aa":"Adicionar texto alternativo para a imagem","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Liga????es adjacentes com o mesmo URL devem ser uma ??nica liga????o.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"O texto do atributo Alt n??o deve conter mais de 120 caracteres.","apply_781a2546":"Aplicar","change_alt_text_92654906":"Alterar texto alternativo","change_heading_tag_to_paragraph_a61e3113":"Alterar a etiqueta de t??tulo para o par??grafo","change_text_color_1aecb912":"Mudar a cor do texto","check_accessibility_3c78211c":"Verificar Acessibilidade","checking_for_accessibility_issues_fac18c6d":"Verificar problemas de acessibilidade","close_accessibility_checker_29d1c51e":"Fechar Verificador de acessibilidade","column_e1ae5c64":"Coluna","column_group_1c062368":"Grupo de coluna","decorative_image_fde98579":"Imagem decorativa","element_starting_with_start_91bf4c3b":"Elemento a come??ar com { start }","fix_heading_hierarchy_f60884c4":"Fixar hierarquia","header_column_f27433cb":"Coluna de cabe??alho","header_row_and_column_ec5b9ec":"Cabe??alho linha e coluna","header_row_f33eb169":"Linha de cabe??alho","heading_levels_should_not_be_skipped_3947c0e0":"Os n??veis de t??tulo n??o devem ser ignorados.","heading_starting_with_start_42a3e7f9":"T??tulo come??ando com { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Os t??tulos n??o devem conter mais de 120 caracteres.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Os nomes dos arquivos de imagem n??o devem ser usados ??????como o atributo alt descrevendo o conte??do da imagem.","image_with_filename_file_aacd7180":"Imagem com nome de ficheiro { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"As imagens devem incluir um atributo alt descrevendo o conte??do da imagem.","issue_num_total_f94536cf":"Quest??o { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Os teclados navegam para liga????es usando a tecla Tab. Dois links adjacentes que direcionam para o mesmo destino podem confundir os utilizadores de teclado.","learn_more_a79a7918":"Aprender mais","leave_as_is_4facfe55":"Deixe como est??","link_with_text_starting_with_start_b3fcbe71":"Liga????o com texto a come??ar com { start }","merge_links_2478df96":"Criar liga????es","next_40e12421":"Pr??ximo","no_accessibility_issues_were_detected_f8d3c875":"N??o foram detectados problemas de acessibilidade.","no_headers_9bc7dc7f":"Sem cabe??alho","none_3b5e34d2":"Nenhum","paragraph_starting_with_start_a59923f8":"Par??grafo come??ando com { start }","prev_f82cbc48":"Voltar","remove_heading_style_5fdc8855":"Remova estilo de cabe??alho","row_fc0944a7":"Linha","row_group_979f5528":"Grupo de linhas","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Os leitores de ecr?? n??o podem determinar o que ?? exibido numa imagem sem texto alternativo, e os nomes dos ficheiros geralmente s??o sem sentido de sequ??ncias de n??meros e letras que n??o descrevem o contexto ou o significado.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Os leitores de ecr?? n??o podem determinar o que ?? exibido numa imagem sem texto alternativo, que descreve o conte??do e o significado da imagem. O texto alternativo deve ser simples e conciso.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Os leitores de ecr?? n??o podem determinar o que ?? exibido numa imagem sem texto alternativo, que descreve o conte??do e o significado da imagem.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Os leitores de ecr?? n??o podem interpretar tabelas sem a estrutura adequada. Os cabe??alhos de tabela fornecem escopo de dire????o e conte??do.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Os leitores de ecr?? n??o podem interpretar tabelas sem a estrutura adequada. As legendas da tabela descrevem o contexto e a compreens??o geral da tabela.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Os leitores de ecr?? n??o podem interpretar tabelas sem a estrutura adequada. Cabe??alhos de tabela fornecem orienta????o e vis??o geral do conte??do.","set_header_scope_8c548f40":"Definir o alcance do cabe??alho","set_table_header_cfab13a0":"Definir cabe??alho da tabela","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Utilizadores vistos navegam nas p??ginas da Web rapidamente, procurando t??tulos em grande ou em negrito. Os utilizadores do leitor de ecr?? dependem de cabe??alhos para a compreens??o contextual. Os cabe??alhos devem usar a estrutura adequada.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Utilizadores vistos navegam nas p??ginas da Web rapidamente, procurando t??tulos em grande ou em negrito. Os utilizadores do leitor de ecr?? dependem de cabe??alhos para a compreens??o contextual. Os cabe??alhos devem ser concisos dentro da estrutura adequada.","table_header_starting_with_start_ffcabba6":"Cabe??alho da tabela come??ando com { start }","table_starting_with_start_e7232848":"Tabela come??ando com { start }","tables_headers_should_specify_scope_5abf3a8e":"Os cabe??alhos das tabelas devem especificar o escopo.","tables_should_include_a_caption_describing_the_con_e91e78fc":"As tabelas devem incluir uma legenda descrevendo o conte??do da tabela.","tables_should_include_at_least_one_header_48779eac":"As tabelas devem incluir pelo menos um cabe??alho.","text_is_difficult_to_read_without_suffcient_contra_27b82183":"O texto ?? dif??cil de ler sem um suficiente contraste entre o texto e o fundo, especialmente para aqueles com baixa vis??o.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"O texto maior que 18pt (ou em negrito 14pt) deve exibir uma rela????o m??nima de contraste de 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"O texto menor que 18pt (ou em negrito 14pt) deve exibir uma rela????o de contraste m??nima de 4.5:1.","why_523b3d8c":"Por qu??"},"pt":{"accessibility_checker_b3af1f6c":"Verificador de acessibilidade","action_to_take_b626a99a":"A????o a tomar:","add_a_caption_2a915239":"Adicionar uma legenda","add_alt_text_for_the_image_48cd88aa":"Adicionar texto alternativo para a imagem","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Liga????es adjacentes com o mesmo URL devem ser uma ??nica liga????o.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"O texto do atributo Alt n??o deve conter mais de 120 caracteres.","apply_781a2546":"Aplicar","change_alt_text_92654906":"Alterar texto alternativo","change_heading_tag_to_paragraph_a61e3113":"Alterar a etiqueta de t??tulo para o par??grafo","change_text_color_1aecb912":"Mudar a cor do texto","check_accessibility_3c78211c":"Verificar Acessibilidade","checking_for_accessibility_issues_fac18c6d":"Verificar problemas de acessibilidade","close_accessibility_checker_29d1c51e":"Fechar Verificador de acessibilidade","close_d634289d":"Fechar","column_e1ae5c64":"Coluna","column_group_1c062368":"Grupo de coluna","decorative_image_fde98579":"Imagem decorativa","element_starting_with_start_91bf4c3b":"Elemento a come??ar com { start }","fix_heading_hierarchy_f60884c4":"Fixar hierarquia","format_as_a_list_142210c3":"Formatar como uma lista","header_column_f27433cb":"Coluna de cabe??alho","header_row_and_column_ec5b9ec":"Cabe??alho linha e coluna","header_row_f33eb169":"Linha de cabe??alho","heading_levels_should_not_be_skipped_3947c0e0":"Os n??veis de t??tulo n??o devem ser ignorados.","heading_starting_with_start_42a3e7f9":"T??tulo come??ando com { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Os t??tulos n??o devem conter mais de 120 caracteres.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Os nomes dos arquivos de imagem n??o devem ser usados ??????como o atributo alt descrevendo o conte??do da imagem.","image_with_filename_file_aacd7180":"Imagem com nome de ficheiro { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"As imagens devem incluir um atributo alt descrevendo o conte??do da imagem.","issue_num_total_f94536cf":"Quest??o { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Os teclados navegam para liga????es usando a tecla Tab. Dois links adjacentes que direcionam para o mesmo destino podem confundir os utilizadores de teclado.","learn_more_about_adjacent_links_2cb9762c":"Saiba mais sobre liga????es adjacentes","learn_more_about_color_contrast_c019dfb9":"Saiba mais sobre o contraste de cores","learn_more_about_organizing_page_headings_8a7caa2e":"Saiba mais sobre como organizar t??tulos de p??gina","learn_more_about_table_headers_5f5ee13":"Saiba mais sobre cabe??alhos de tabelas","learn_more_about_using_alt_text_for_images_5698df9a":"Saiba mais sobre como usar o texto alternativo para imagens","learn_more_about_using_captions_with_tables_36fe496f":"Saiba mais sobre como usar legendas com tabelas","learn_more_about_using_filenames_as_alt_text_264286af":"Saiba mais sobre como usar nomes de ficheiros como texto alternativo","learn_more_about_using_lists_4e6eb860":"Saiba mais sobre como usar listas","learn_more_about_using_scope_attributes_with_table_20df49aa":"Saiba mais sobre como usar atributos de escopo com tabelas","leave_as_is_4facfe55":"Deixe como est??","link_with_text_starting_with_start_b3fcbe71":"Liga????o com texto a come??ar com { start }","lists_should_be_formatted_as_lists_f862de8d":"As listas devem ser formatadas como listas.","merge_links_2478df96":"Criar liga????es","next_40e12421":"Pr??ximo","no_accessibility_issues_were_detected_f8d3c875":"N??o foram detectados problemas de acessibilidade.","no_headers_9bc7dc7f":"Sem cabe??alho","none_3b5e34d2":"Nenhum","paragraph_starting_with_start_a59923f8":"Par??grafo come??ando com { start }","prev_f82cbc48":"Voltar","remove_heading_style_5fdc8855":"Remova estilo de cabe??alho","row_fc0944a7":"Linha","row_group_979f5528":"Grupo de linhas","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Os leitores de ecr?? n??o podem determinar o que ?? exibido numa imagem sem texto alternativo, e os nomes dos ficheiros geralmente s??o sem sentido de sequ??ncias de n??meros e letras que n??o descrevem o contexto ou o significado.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Os leitores de ecr?? n??o podem determinar o que ?? exibido numa imagem sem texto alternativo, que descreve o conte??do e o significado da imagem. O texto alternativo deve ser simples e conciso.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Os leitores de ecr?? n??o podem determinar o que ?? exibido numa imagem sem texto alternativo, que descreve o conte??do e o significado da imagem.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Os leitores de ecr?? n??o podem interpretar tabelas sem a estrutura adequada. Os cabe??alhos de tabela fornecem escopo de dire????o e conte??do.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Os leitores de ecr?? n??o podem interpretar tabelas sem a estrutura adequada. As legendas da tabela descrevem o contexto e a compreens??o geral da tabela.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Os leitores de ecr?? n??o podem interpretar tabelas sem a estrutura adequada. Cabe??alhos de tabela fornecem orienta????o e vis??o geral do conte??do.","set_header_scope_8c548f40":"Definir o alcance do cabe??alho","set_table_header_cfab13a0":"Definir cabe??alho da tabela","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Utilizadores vistos navegam nas p??ginas da Web rapidamente, procurando t??tulos em grande ou em negrito. Os utilizadores do leitor de ecr?? dependem de cabe??alhos para a compreens??o contextual. Os cabe??alhos devem usar a estrutura adequada.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Utilizadores vistos navegam nas p??ginas da Web rapidamente, procurando t??tulos em grande ou em negrito. Os utilizadores do leitor de ecr?? dependem de cabe??alhos para a compreens??o contextual. Os cabe??alhos devem ser concisos dentro da estrutura adequada.","table_header_starting_with_start_ffcabba6":"Cabe??alho da tabela come??ando com { start }","table_starting_with_start_e7232848":"Tabela come??ando com { start }","tables_headers_should_specify_scope_5abf3a8e":"Os cabe??alhos das tabelas devem especificar o escopo.","tables_should_include_a_caption_describing_the_con_e91e78fc":"As tabelas devem incluir uma legenda descrevendo o conte??do da tabela.","tables_should_include_at_least_one_header_48779eac":"As tabelas devem incluir pelo menos um cabe??alho.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"O texto ?? dif??cil de ler sem contraste suficiente entre o texto e o fundo, especialmente para aqueles com baixa vis??o.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"O texto maior que 18pt (ou em negrito 14pt) deve exibir uma rela????o m??nima de contraste de 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"O texto menor que 18pt (ou em negrito 14pt) deve exibir uma rela????o de contraste m??nima de 4.5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Quando a marca????o ?? usada para formatar itens visualmente como uma lista, mas n??o indica o relacionamento da lista, os utilizadores podem ter dificuldade em navegar pelas informa????es.","why_523b3d8c":"Por qu??"},"ru":{"accessibility_checker_b3af1f6c":"???????????????????? ??????????????????????","action_to_take_b626a99a":"?????? ???????????????????? ??????????????:","add_a_caption_2a915239":"???????????????? ??????????????","add_alt_text_for_the_image_48cd88aa":"???????????????? ???????????????????????????? ?????????? ?????? ??????????????????????","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"???????????????? ???????????? ?? ?????????? ?? ?????? ???? URL-?????????????? ???????????? ???????? ???????????????????? ?? ???????? ????????????.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"???????????????????????????? ???????????????????????? ?????????? ???? ???????????? ?????????????????? ?????????? 120 ????????????????.","apply_781a2546":"??????????????????","change_alt_text_92654906":"???????????????? ???????????????????????????? ??????????","change_heading_tag_to_paragraph_a61e3113":"???????????????? ?????? ?????????????????? ??????????????????","change_text_color_1aecb912":"???????????????? ???????? ????????????","check_accessibility_3c78211c":"?????????????????? ??????????????????????","checking_for_accessibility_issues_fac18c6d":"???????????????? ???? ???????????????????? ??????????????, ?????????????????? ?? ????????????????????????","close_accessibility_checker_29d1c51e":"?????????????? ???????????????????? ??????????????????????","close_d634289d":"??????????????","column_e1ae5c64":"??????????????","column_group_1c062368":"???????????? ??????????????","decorative_image_fde98579":"???????????????????????? ??????????????????????","element_starting_with_start_91bf4c3b":"??????????????, ???????????????????????? ?? { start }","fix_heading_hierarchy_f60884c4":"?????????????????? ???????????????? ????????????????????","format_as_a_list_142210c3":"?????????????????????????? ?? ???????? ????????????","header_column_f27433cb":"?????????????? ??????????????????","header_row_and_column_ec5b9ec":"???????????? ?? ?????????????? ??????????????????","header_row_f33eb169":"???????????? ??????????????????","heading_levels_should_not_be_skipped_3947c0e0":"???????????? ???????????????????? ???? ???????????? ????????????????????????.","heading_starting_with_start_42a3e7f9":"??????????????????, ???????????????????????? ?? { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"?????????????????? ???? ???????????? ?????????????????? ?????????? 120 ????????????????.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"?????????? ???????????? ?????????????????????? ???? ???????????? ???????????????????????????? ?? ???????????????? ?????????????????????????????? ???????????????? ?? ?????????????????? ?????????????????????? ??????????????????????.","image_with_filename_file_aacd7180":"?????????????????????? ?? ???????????? ?????????? { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"?????????????????????? ???????????? ?????????????????? ???????????????????????????? ?????????????? ?? ?????????????????? ?????????????????????? ??????????????????????.","issue_num_total_f94536cf":"???????????????? { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"???????????????????? ???????????????????????? ?????? ???????????????? ???? ?????????????? ?? ?????????????? ?????????????? Tab. ?????? ???????????????? ????????????, ?????????????? ?? ???????? ?? ???? ???? ??????????, ?????????? ???????????????????? ?????????????????????????? ??????????????????.","learn_more_about_adjacent_links_2cb9762c":"???????????? ???????????? ?? ???????????????? ??????????????","learn_more_about_color_contrast_c019dfb9":"???????????? ???????????? ?? ???????????????? ??????????????????","learn_more_about_organizing_page_headings_8a7caa2e":"???????????? ???????????? ???? ?????????????????????? ???????????????????? ??????????????","learn_more_about_table_headers_5f5ee13":"???????????? ???????????? ?? ???????????????????? ????????????","learn_more_about_using_alt_text_for_images_5698df9a":"???????????? ???????????? ???? ?????????????????????????? ?????????????????????? ???????????? ?????? ??????????????????????","learn_more_about_using_captions_with_tables_36fe496f":"???????????? ???????????? ???? ?????????????????????????? ???????????????????? ?? ??????????????????","learn_more_about_using_filenames_as_alt_text_264286af":"???????????? ???????????? ???? ?????????????????????????? ???????? ???????????? ?? ???????????????? ?????????????????????? ????????????","learn_more_about_using_lists_4e6eb860":"???????????? ???????????? ???? ?????????????????????????? ??????????????","learn_more_about_using_scope_attributes_with_table_20df49aa":"???????????? ???????????? ???? ?????????????????????????? ?????????????? ?????????????????? ?? ??????????????????","leave_as_is_4facfe55":"???????????????? ?????? ????????","link_with_text_starting_with_start_b3fcbe71":"???????????? ?? ??????????????, ???????????????????????? ?? { start }","lists_should_be_formatted_as_lists_f862de8d":"???????????? ???????????? ???????? ?????????????????????????????? ?? ???????? ??????????????.","merge_links_2478df96":"???????????????????? ????????????","next_40e12421":"??????????","no_accessibility_issues_were_detected_f8d3c875":"??????????????, ?????????????????? ?? ????????????????????????, ???? ????????????????????.","no_headers_9bc7dc7f":"?????????????????? ??????????????????????","none_3b5e34d2":"??????","paragraph_starting_with_start_a59923f8":"????????????????, ???????????????????????? ?? { start }","prev_f82cbc48":"??????????","remove_heading_style_5fdc8855":"?????????????? ?????????? ??????????????????","row_fc0944a7":"????????????","row_group_979f5528":"???????????? ??????????","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"???????????????? ?????????????? ???? ?????????? ????????????????????, ?????? ???????????????????? ???? ??????????????????????, ?????? ?????????????????????????????? ????????????, ?? ?????? ???????? ?????????? ???????????? ???????????????? ???????????????????????? ?????????? ?????????????????????????? ???????????? ???????? ?? ????????, ?????????????? ???? ?????????? ?? ???????? ???????????????? ?????????????????? ?????? ????????????????.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"???????????????? ?????????????? ???? ?????????? ????????????????????, ?????? ???????????????????? ???? ??????????????????????, ?????? ?????????????????????????????? ????????????, ?????????????????????? ???????????????? ?????????????????? ?? ???????????????? ??????????????????????. ???????????????????????????? ?????????? ???????????? ???????? ?????????????? ?? ????????????.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"???????????????? ?????????????? ???? ?????????? ????????????????????, ?????? ???????????????????? ???? ??????????????????????, ?????? ?????????????????????????????? ????????????, ?????????????????????? ???????????????? ?????????????????? ?? ???????????????? ??????????????????????.","screen_readers_cannot_interpret_tables_without_the_bd861652":"???????????????? ?????????????? ???? ?????????? ???????????????????????????????? ?????????????? ?????? ???????????????????? ??????????????????. ?????????????????? ???????????? ???????????????? ?????????????????????? ?? ?????????? ????????????????????.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"???????????????? ?????????????? ???? ?????????? ???????????????????????????????? ?????????????? ?????? ???????????????????? ??????????????????. ?????????????? ?? ???????????????? ???????????????? ???????????????? ?????????????????? ?? ?????????? ?????????????????????????? ?? ??????????????.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"???????????????? ?????????????? ???? ?????????? ???????????????????????????????? ?????????????? ?????? ???????????????????? ??????????????????. ?????????????????? ???????????? ???????????????? ?????????????????????? ?? ?????????? ???????????????? ????????????????????.","set_header_scope_8c548f40":"???????????? ?????????? ??????????????????","set_table_header_cfab13a0":"???????????? ?????????????????? ??????????????","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"???????????? ???????????????????????? ???????????? ?????????????????????????? ??????-???????????????? ?? ?????????????? ?????????????? ?????? ???????????????????? ????????????????????. ???????????????????????? ???????????????? ???????????????? ???????????????????? ???? ?????????????????? ?????? ???????????????????????????????? ??????????????????. ?????????????????? ???????????? ?????????? ???????????????????? ??????????????????.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"???????????? ???????????????????????? ???????????? ?????????????????????????? ??????-???????????????? ?? ?????????????? ?????????????? ?????? ???????????????????? ????????????????????. ???????????????????????? ???????????????? ???????????????? ???????????????????? ???? ?????????????????? ?????? ???????????????????????????????? ??????????????????. ?????????????????? ???????????? ???????? ?????????????? ?? ???????????? ???????????????????? ??????????????????.","table_header_starting_with_start_ffcabba6":"?????????????????? ??????????????, ???????????????????????? ?? { start }","table_starting_with_start_e7232848":"??????????????, ???????????????????????? ?? { start }","tables_headers_should_specify_scope_5abf3a8e":"?????????????????? ???????????? ???????????? ???????????????????????????????? ??????????.","tables_should_include_a_caption_describing_the_con_e91e78fc":"?????????????? ???????????? ?????????????????? ?????????????? ?? ?????????????????? ?????????????????????? ??????????????.","tables_should_include_at_least_one_header_48779eac":"?????????????? ???????????? ?????????????????? ?????? ?????????????? ???????? ??????????????????.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"?????????? ???????????? ?????????????????? ???????????? ?????? ?????????????????????? ?????????????????????????? ?????????? ?????????????? ?? ??????????, ???????????????? ?????? ??????, ?????? ?????????? ??????????.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"?????????? ?????????????? 18pt (?????? ???????????????????? 14pt) ???????????? ???????????????????????? ?? ?????????????????????? ?????????????????????????? ?????????????????????????? 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"?????????? ???????????? 18pt (?????? ???????????????????? 14pt) ???????????? ???????????????????????? ?? ?????????????????????? ?????????????????????????? ?????????????????????????? 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"?????????? ???????????????????????? ????????????????, ?????????????? ?????????????????? ?????????????????????? ???????????????? ?? ???????? ????????????, ???? ???? ?????????????????? ???? ?????????????????? ????????????, ???????????????????????? ?????????? ???????????????????? ?????????????????? ?????? ?????????????????? ????????????????????.","why_523b3d8c":"????????????"},"sl":{"accessibility_checker_b3af1f6c":"Orodje za preverjanje dostopnosti","action_to_take_b626a99a":"Dejanje, ki ga je treba izvesti:","add_a_caption_2a915239":"Dodaj spremno besedilo","add_alt_text_for_the_image_48cd88aa":"Dodaj nadomestno besedilo za sliko","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Sosednje povezave z istim naslovom URL morajo biti ena sama povezava.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Nadomestno besedilo lastnosti ne sme vsebovati ve?? kot 120 znakov.","apply_781a2546":"Uporabi","change_alt_text_92654906":"Spremeni nadomestno besedilo","change_heading_tag_to_paragraph_a61e3113":"Spremeni oznako naslova odstavka","change_text_color_1aecb912":"Spremeni barvo besedila","check_accessibility_3c78211c":"Preveri dostopnost","checking_for_accessibility_issues_fac18c6d":"Preverjanje te??av z dostopnostjo","close_accessibility_checker_29d1c51e":"Zapri orodje za preverjanje dostopnosti","close_d634289d":"Zapri","column_e1ae5c64":"Stolpec","column_group_1c062368":"Skupina stolpcev","decorative_image_fde98579":"Dekorativna slika","element_starting_with_start_91bf4c3b":"Element, ki se za??ne s/z { start }","fix_heading_hierarchy_f60884c4":"Popravi hierarhijo naslovov","format_as_a_list_142210c3":"Oblikuj kot seznam","header_column_f27433cb":"Stolpec z glavo","header_row_and_column_ec5b9ec":"Vrstica in stolpec z glavo","header_row_f33eb169":"Vrstica z glavo","heading_levels_should_not_be_skipped_3947c0e0":"Ravni naslovov ni dovoljeno presko??iti.","heading_starting_with_start_42a3e7f9":"Naslov, ki se za??ne s/z { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Naslovi ne smejo vsebovati ve?? kot 120 znakov.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Imen datotek slik ni dovoljeno uporabljati kot nadomestno lastnost za opis vsebine slike.","image_with_filename_file_aacd7180":"Slika z imenom datoteke { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Slike morajo vsebovati nadomestno lastnost, ki opisuje vsebino slike.","issue_num_total_f94536cf":"Te??ava { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Navigacija do povezav poteka s tabulatorkami. Dve sosednji povezavi, ki usmerjata na isti cilj, lahko zmedeta uporabnike tipkovnic.","learn_more_about_adjacent_links_2cb9762c":"Ve?? o sosednjih povezavah","learn_more_about_color_contrast_c019dfb9":"Ve?? o barvnem kontrastu","learn_more_about_organizing_page_headings_8a7caa2e":"Ve?? o organiziranju naslovov strani","learn_more_about_table_headers_5f5ee13":"Ve?? o glavah preglednic","learn_more_about_using_alt_text_for_images_5698df9a":"Ve?? o uporabi nadomestnega besedila za slike","learn_more_about_using_captions_with_tables_36fe496f":"Ve?? o uporabi napisov pri preglednicah","learn_more_about_using_filenames_as_alt_text_264286af":"Ve?? o uporabi imen datotek kot nadomestno besedilo","learn_more_about_using_lists_4e6eb860":"Ve?? o uporabi seznamov","learn_more_about_using_scope_attributes_with_table_20df49aa":"Ve?? o uporabi atributov obsega pri preglednicah","leave_as_is_4facfe55":"Ne spreminjaj","link_with_text_starting_with_start_b3fcbe71":"Pove??i z besedilom, ki se za??ne s/z { start }","lists_should_be_formatted_as_lists_f862de8d":"Seznami morajo biti oblikovani kot seznami.","merge_links_2478df96":"Spoji povezave","next_40e12421":"Naprej","no_accessibility_issues_were_detected_f8d3c875":"Ni zaznanih te??av z dostopnostjo.","no_headers_9bc7dc7f":"Ni glav.","none_3b5e34d2":"Brez","paragraph_starting_with_start_a59923f8":"Odstavek, ki se za??ne s/z { start }","prev_f82cbc48":"Nazaj","remove_heading_style_5fdc8855":"Odstrani slog naslova","row_fc0944a7":"Vrstica","row_group_979f5528":"Skupina vrstic","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Brez nadomestnega besedila bralniki zaslonov ne morejo dolo??iti, kaj je prikazano na sliki, imena datotek pa so pogosto nizi ??tevilk in ??rk brez smisla, ki ne opisujejo konteksta ali pomena.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Brez nadomestnega besedila, ki opisuje vsebino in pomen slike, bralniki zaslonov ne morejo dolo??iti, kaj je prikazano na sliki. Nadomestno besedilo mora biti enostavno in jedrnato.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Brez nadomestnega besedila, ki opisuje vsebino in pomen slike, bralniki zaslonov ne morejo dolo??iti, kaj je prikazano na sliki.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Bralniki zaslonov ne morejo tolma??iti preglednic brez pravilne zgradbe. Glave preglednic zagotavljajo smer in obseg vsebine.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Bralniki zaslonov ne morejo tolma??iti preglednic brez pravilne zgradbe. Spremno besedilo preglednic opisuje kontekst in splo??no razumevanje preglednice.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Bralniki zaslonov ne morejo tolma??iti preglednic brez pravilne zgradbe. Glave preglednic zagotavljajo smeri in pregled vsebine.","set_header_scope_8c548f40":"Nastavi obseg glave","set_table_header_cfab13a0":"Nastavi glavo preglednice","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Slabovidni uporabniki hitro brskajo po spletnih straneh in i????ejo velike ali krepko zapisane naslove. Uporabniki bralnikov zaslonov se za razumevanje konteksta zana??ajo na glave. Pri glavah mora biti uporabljena pravilna zgradba.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Slabovidni uporabniki hitro brskajo po spletnih straneh in i????ejo velike ali krepko zapisane naslove. Uporabniki bralnikov zaslonov se za razumevanje konteksta zana??ajo na glave. Glave morajo biti jedrnate in imeti pravilno zgradbo.","table_header_starting_with_start_ffcabba6":"Glava preglednice, ki se za??ne s/z { start }","table_starting_with_start_e7232848":"Preglednica, ki se za??ne s/z { start }","tables_headers_should_specify_scope_5abf3a8e":"Pri glavah preglednic mora biti naveden obseg.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Preglednice morajo vsebovati spremno besedilo z opisom vsebine preglednice.","tables_should_include_at_least_one_header_48779eac":"Preglednice morajo vklju??evati vsaj eno glavo.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Brez zadostnega kontrasta med besedilom in ozadjem je branje te??avno, ??e posebej za slabovidne.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Pri besedilu, ki je ve??je od 18 pik (??e je krepko, pa od 14 pik), mora biti kontrastno razmerje najmanj 3 : 1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Pri besedilu, ki je manj??e od 18 pik (??e je krepko, pa od 14 pik), mora biti kontrastno razmerje najmanj 4,5 : 1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"??e je uporabljeno ozna??evanje, ki vizualno oblikuje elemente kot seznam, ne ka??e pa razmerja seznama, imajo lahko uporabniki te??ave pri navigiranju po informacijah.","why_523b3d8c":"Zakaj"},"sv-x-k12":{"accessibility_checker_b3af1f6c":"Tillg??nglighetskontroll??r","action_to_take_b626a99a":"??tg??rd att vidta:","add_a_caption_2a915239":"L??gg till en bildtext","add_alt_text_for_the_image_48cd88aa":"L??gg till alt text f??r bilden","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Intilliggande l??nkar med samma webbadress ska vara en enda l??nk.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt attributtext ska inte inneh??lla mer ??n 120 tecken.","apply_781a2546":"Till??mpa","change_alt_text_92654906":"??ndra alt text","change_heading_tag_to_paragraph_a61e3113":"??ndra rubrikm??rkning till stycke","change_text_color_1aecb912":"??ndra textf??rg","check_accessibility_3c78211c":"Kontrollera tillg??nglighet","checking_for_accessibility_issues_fac18c6d":"Kontrollerar tillg??nglighetsproblem","close_accessibility_checker_29d1c51e":"St??ng tillg??nglighetskontrollen","close_d634289d":"St??ng","column_e1ae5c64":"Kolumn","column_group_1c062368":"Kolumngrupp","decorative_image_fde98579":"Dekorativ-bild","element_starting_with_start_91bf4c3b":"Element som b??rjar med { start }","fix_heading_hierarchy_f60884c4":"Fast rubrik hierarki","format_as_a_list_142210c3":"Formatera som lista","header_column_f27433cb":"Rubrikkolumn","header_row_and_column_ec5b9ec":"Rubrikrad och kolumn","header_row_f33eb169":"Rubrikrad","heading_levels_should_not_be_skipped_3947c0e0":"Rubrikniv??er b??r inte hoppas ??ver.","heading_starting_with_start_42a3e7f9":"Rubriker b??rjar med { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Rubrikerna f??r inte inneh??lla mer ??n 120 tecken.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Bildfilnamn ska inte anv??ndas som alt attribut som beskriver bildinneh??llet.","image_with_filename_file_aacd7180":"Bild med filnamn { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Bilder ska inneh??lla ett alt attribut som beskriver bildinneh??llet.","issue_num_total_f94536cf":"Problem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tangentbord navigerar till l??nkar via Tab-tangenten. Tv?? intilliggande l??nkar som leder till samma destination kan vara f??rvirrande f??r anv??ndare av tangentbord.","learn_more_about_adjacent_links_2cb9762c":"L??s mer om n??rliggande l??nkar","learn_more_about_color_contrast_c019dfb9":"L??s mer om f??rgkontras","learn_more_about_organizing_page_headings_8a7caa2e":"L??s mer om att ordna sidhuvuden","learn_more_about_table_headers_5f5ee13":"L??s mer om tabellrubriker","learn_more_about_using_alt_text_for_images_5698df9a":"L??s mer om att anv??nda alternativtexter f??r bilder","learn_more_about_using_captions_with_tables_36fe496f":"L??s mer om att anv??nda rubriker med tabeller","learn_more_about_using_filenames_as_alt_text_264286af":"L??s mer om att anv??nda filnamn som alternativtext","learn_more_about_using_lists_4e6eb860":"L??s mer om att anv??nda listor","learn_more_about_using_scope_attributes_with_table_20df49aa":"L??s mer om att anv??nda omf??ngsattribut med tabeller","leave_as_is_4facfe55":"L??mna som det ??r","link_with_text_starting_with_start_b3fcbe71":"L??nk med text som b??rjar med { start }","lists_should_be_formatted_as_lists_f862de8d":"Listor ska formateras som listor.","merge_links_2478df96":"Sammanfoga l??nkar","next_40e12421":"N??sta","no_accessibility_issues_were_detected_f8d3c875":"Inga tillg??nglighetsproblem uppt??cktes.","no_headers_9bc7dc7f":"Inga rubriker","none_3b5e34d2":"Ingen","paragraph_starting_with_start_a59923f8":"Stycke som b??rjar med { start }","prev_f82cbc48":"F??reg??ende","remove_heading_style_5fdc8855":"Ta bort rubrikstil","row_fc0944a7":"Rad","row_group_979f5528":"Radgrupp","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Sk??rml??sare kan inte best??mma vad som visas i en bild utan alternativ text, och filnamn ??r ofta meningsl??sa str??ngar av siffror och bokst??ver som inte beskriver sammanhanget eller betydelsen.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Sk??rml??sare kan inte best??mma vad som visas i en bild utan alternativ text, som beskriver inneh??llet och inneb??rden av bilden. Alternativ text ska vara enkel och koncis.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Sk??rml??sare kan inte best??mma vad som visas i en bild utan alternativ text, som beskriver inneh??llet och inneb??rden av bilden.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Sk??rml??sare kan inte tolka tabeller utan r??tt struktur. Tabellrubriker ger riktning och inneh??llsomfattning.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Sk??rml??sare kan inte tolka tabeller utan r??tt struktur. Tabelltexter beskriver sammanhanget och den allm??nna f??rst??elsen av tabellen.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Sk??rml??sare kan inte tolka tabeller utan r??tt struktur. Tabellrubriker tillhandah??ller riktning och ??verblick ??ver inneh??llet.","set_header_scope_8c548f40":"Ange huvudomfattning","set_table_header_cfab13a0":"Ange tabellrubrik","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Visade anv??ndare bl??ddrar snabbt p?? webbsidor och letar efter stora eller fetstil rubriker. Anv??ndare av sk??rml??sare anv??nder sig av rubriker f??r kontextuell f??rst??else. Rubriker ska anv??nda r??tt struktur.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Visade anv??ndare bl??ddrar snabbt p?? webbsidor och letar efter stora eller fetstil rubriker. Anv??ndare av sk??rml??sare anv??nder sig av rubriker f??r kontextuell f??rst??else. Rubriker ska vara koncisa inom den korrekta strukturen.","table_header_starting_with_start_ffcabba6":"Tabellrubriker b??rjar med { start }","table_starting_with_start_e7232848":"Tabell b??rjar med { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabellrubriker ska ange omfattning.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabeller ska inneh??lla en bildtext som beskriver inneh??llet i tabellen.","tables_should_include_at_least_one_header_48779eac":"Tabeller ska inneh??lla minst en rubrik.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Texten ??r sv??r att l??sa utan tillr??cklig kontrast mellan text och bakgrund, speciellt f??r de med nedsatt syn.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Text som ??r st??rre ??n 18pt (eller fetstil 14pt) ska visa ett minimum-kontrastf??rh??llande p?? 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Text som ??r mindre ??n 18pt (eller fet 14pt) ska visa ett l??gsta kontrastf??rh??llande p?? 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Om kodningen visuellt formaterar objekt som listor men inte visar listans relation kan anv??ndare f?? sv??rt att navigera i informationen.","why_523b3d8c":"Varf??r"},"sv":{"accessibility_checker_b3af1f6c":"Tillg??nglighetskontroll??r","action_to_take_b626a99a":"??tg??rd att vidta:","add_a_caption_2a915239":"L??gg till en bildtext","add_alt_text_for_the_image_48cd88aa":"L??gg till alt text f??r bilden","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"Intilliggande l??nkar med samma webbadress ska vara en enda l??nk.","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"Alt attributtext ska inte inneh??lla mer ??n 120 tecken.","apply_781a2546":"Till??mpa","change_alt_text_92654906":"??ndra alt text","change_heading_tag_to_paragraph_a61e3113":"??ndra rubrikm??rkning till stycke","change_text_color_1aecb912":"??ndra textf??rg","check_accessibility_3c78211c":"Kontrollera tillg??nglighet","checking_for_accessibility_issues_fac18c6d":"Kontrollerar tillg??nglighetsproblem","close_accessibility_checker_29d1c51e":"St??ng tillg??nglighetskontrollen","close_d634289d":"St??ng","column_e1ae5c64":"Kolumn","column_group_1c062368":"Kolumngrupp","decorative_image_fde98579":"Dekorativ-bild","element_starting_with_start_91bf4c3b":"Element som b??rjar med { start }","fix_heading_hierarchy_f60884c4":"Fast rubrik hierarki","format_as_a_list_142210c3":"Formatera som lista","header_column_f27433cb":"Rubrikkolumn","header_row_and_column_ec5b9ec":"Rubrikrad och kolumn","header_row_f33eb169":"Rubrikrad","heading_levels_should_not_be_skipped_3947c0e0":"Rubrikniv??er b??r inte hoppas ??ver.","heading_starting_with_start_42a3e7f9":"Rubriker b??rjar med { start }","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"Rubrikerna f??r inte inneh??lla mer ??n 120 tecken.","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"Bildfilnamn ska inte anv??ndas som alt attribut som beskriver bildinneh??llet.","image_with_filename_file_aacd7180":"Bild med filnamn { file }","images_should_include_an_alt_attribute_describing__b86d6a86":"Bilder ska inneh??lla ett alt attribut som beskriver bildinneh??llet.","issue_num_total_f94536cf":"Problem { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"Tangentbord navigerar till l??nkar via Tab-tangenten. Tv?? intilliggande l??nkar som leder till samma destination kan vara f??rvirrande f??r anv??ndare av tangentbord.","learn_more_about_adjacent_links_2cb9762c":"L??s mer om n??rliggande l??nkar","learn_more_about_color_contrast_c019dfb9":"L??s mer om f??rgkontras","learn_more_about_organizing_page_headings_8a7caa2e":"L??s mer om att ordna sidhuvuden","learn_more_about_table_headers_5f5ee13":"L??s mer om tabellrubriker","learn_more_about_using_alt_text_for_images_5698df9a":"L??s mer om att anv??nda alternativtexter f??r bilder","learn_more_about_using_captions_with_tables_36fe496f":"L??s mer om att anv??nda rubriker med tabeller","learn_more_about_using_filenames_as_alt_text_264286af":"L??s mer om att anv??nda filnamn som alternativtext","learn_more_about_using_lists_4e6eb860":"L??s mer om att anv??nda listor","learn_more_about_using_scope_attributes_with_table_20df49aa":"L??s mer om att anv??nda omf??ngsattribut med tabeller","leave_as_is_4facfe55":"L??mna som det ??r","link_with_text_starting_with_start_b3fcbe71":"L??nk med text som b??rjar med { start }","lists_should_be_formatted_as_lists_f862de8d":"Listor ska formateras som listor.","merge_links_2478df96":"Sammanfoga l??nkar","next_40e12421":"N??sta","no_accessibility_issues_were_detected_f8d3c875":"Inga tillg??nglighetsproblem uppt??cktes.","no_headers_9bc7dc7f":"Inga rubriker","none_3b5e34d2":"Ingen","paragraph_starting_with_start_a59923f8":"Stycke som b??rjar med { start }","prev_f82cbc48":"F??reg??ende","remove_heading_style_5fdc8855":"Ta bort rubrikstil","row_fc0944a7":"Rad","row_group_979f5528":"Radgrupp","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"Sk??rml??sare kan inte best??mma vad som visas i en bild utan alternativ text, och filnamn ??r ofta meningsl??sa str??ngar av siffror och bokst??ver som inte beskriver sammanhanget eller betydelsen.","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"Sk??rml??sare kan inte best??mma vad som visas i en bild utan alternativ text, som beskriver inneh??llet och inneb??rden av bilden. Alternativ text ska vara enkel och koncis.","screen_readers_cannot_determine_what_is_displayed__a57e6723":"Sk??rml??sare kan inte best??mma vad som visas i en bild utan alternativ text, som beskriver inneh??llet och inneb??rden av bilden.","screen_readers_cannot_interpret_tables_without_the_bd861652":"Sk??rml??sare kan inte tolka tabeller utan r??tt struktur. Tabellrubriker ger riktning och inneh??llsomfattning.","screen_readers_cannot_interpret_tables_without_the_e62912d5":"Sk??rml??sare kan inte tolka tabeller utan r??tt struktur. Tabelltexter beskriver sammanhanget och den allm??nna f??rst??elsen av tabellen.","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"Sk??rml??sare kan inte tolka tabeller utan r??tt struktur. Tabellrubriker tillhandah??ller riktning och ??verblick ??ver inneh??llet.","set_header_scope_8c548f40":"Ange huvudomfattning","set_table_header_cfab13a0":"Ange tabellrubrik","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"Visade anv??ndare bl??ddrar snabbt p?? webbsidor och letar efter stora eller fetstil rubriker. Anv??ndare av sk??rml??sare anv??nder sig av rubriker f??r kontextuell f??rst??else. Rubriker ska anv??nda r??tt struktur.","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"Visade anv??ndare bl??ddrar snabbt p?? webbsidor och letar efter stora eller fetstil rubriker. Anv??ndare av sk??rml??sare anv??nder sig av rubriker f??r kontextuell f??rst??else. Rubriker ska vara koncisa inom den korrekta strukturen.","table_header_starting_with_start_ffcabba6":"Tabellrubriker b??rjar med { start }","table_starting_with_start_e7232848":"Tabell b??rjar med { start }","tables_headers_should_specify_scope_5abf3a8e":"Tabellrubriker ska ange omfattning.","tables_should_include_a_caption_describing_the_con_e91e78fc":"Tabeller ska inneh??lla en bildtext som beskriver inneh??llet i tabellen.","tables_should_include_at_least_one_header_48779eac":"Tabeller ska inneh??lla minst en rubrik.","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"Texten ??r sv??r att l??sa utan tillr??cklig kontrast mellan text och bakgrund, speciellt f??r de med nedsatt syn.","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"Text som ??r st??rre ??n 18pt (eller fetstil 14pt) ska visa ett minimum-kontrastf??rh??llande p?? 3:1.","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"Text som ??r mindre ??n 18pt (eller fet 14pt) ska visa ett l??gsta kontrastf??rh??llande p?? 4,5:1.","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"Om kodningen visuellt formaterar objekt som listor men inte visar listans relation kan anv??ndare f?? sv??rt att navigera i informationen.","why_523b3d8c":"Varf??r"},"zh-HK":{"accessibility_checker_b3af1f6c":"?????????????????????","action_to_take_b626a99a":"??????????????????","add_a_caption_2a915239":"????????????","add_alt_text_for_the_image_48cd88aa":"???????????????????????????","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"URL ??????????????????????????????????????????","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"???????????????????????????????????? 120 ????????????","apply_781a2546":"??????","change_alt_text_92654906":"??????????????????","change_heading_tag_to_paragraph_a61e3113":"???????????????????????????","change_text_color_1aecb912":"??????????????????","check_accessibility_3c78211c":"??????????????????","checking_for_accessibility_issues_fac18c6d":"????????????????????????","close_accessibility_checker_29d1c51e":"???????????????????????????","close_d634289d":"??????","column_e1ae5c64":"???","column_group_1c062368":"??????","decorative_image_fde98579":"????????????","element_starting_with_start_91bf4c3b":"??? { start } ???????????????","fix_heading_hierarchy_f60884c4":"??????????????????","format_as_a_list_142210c3":"??????????????????","header_column_f27433cb":"?????????","header_row_and_column_ec5b9ec":"???????????????","header_row_f33eb169":"?????????","heading_levels_should_not_be_skipped_3947c0e0":"????????????????????????","heading_starting_with_start_42a3e7f9":"??? { start } ???????????????","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"???????????????????????? 120 ????????????","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"??????????????????????????????????????????????????????????????????","image_with_filename_file_aacd7180":"??????????????? { file } ?????????","images_should_include_an_alt_attribute_describing__b86d6a86":"???????????????????????????????????????????????????","issue_num_total_f94536cf":"?????? { num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"?????? Tab ?????????????????????????????????????????????????????????????????????????????????????????????????????????","learn_more_about_adjacent_links_2cb9762c":"??????????????????????????????","learn_more_about_color_contrast_c019dfb9":"??????????????????????????????","learn_more_about_organizing_page_headings_8a7caa2e":"????????????????????????????????????","learn_more_about_table_headers_5f5ee13":"??????????????????????????????","learn_more_about_using_alt_text_for_images_5698df9a":"????????????????????????????????? alt ??????","learn_more_about_using_captions_with_tables_36fe496f":"???????????????????????????????????????","learn_more_about_using_filenames_as_alt_text_264286af":"?????????????????????????????????????????? alt ??????","learn_more_about_using_lists_4e6eb860":"??????????????????????????????","learn_more_about_using_scope_attributes_with_table_20df49aa":"????????????????????????????????????????????????","leave_as_is_4facfe55":"????????????","link_with_text_starting_with_start_b3fcbe71":"????????? { start } ???????????????","lists_should_be_formatted_as_lists_f862de8d":"??????????????????????????????","merge_links_2478df96":"????????????","next_40e12421":"?????????","no_accessibility_issues_were_detected_f8d3c875":"????????????????????????????????????","no_headers_9bc7dc7f":"?????????","none_3b5e34d2":"???","paragraph_starting_with_start_a59923f8":"??? { start } ???????????????","prev_f82cbc48":"??????","remove_heading_style_5fdc8855":"??????????????????","row_fc0944a7":"???","row_group_979f5528":"??????","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_determine_what_is_displayed__a57e6723":"????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_bd861652":"?????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_e62912d5":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"?????????????????????????????????????????????????????????????????????????????????????????????????????????","set_header_scope_8c548f40":"??????????????????","set_table_header_cfab13a0":"??????????????????","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","table_header_starting_with_start_ffcabba6":"??? { start } ?????????????????????","table_starting_with_start_e7232848":"??? { start } ???????????????","tables_headers_should_specify_scope_5abf3a8e":"??????????????????????????????","tables_should_include_a_caption_describing_the_con_e91e78fc":"??????????????????????????????????????????","tables_should_include_at_least_one_header_48779eac":"????????????????????????????????????","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"????????????????????????????????????????????????????????????????????????????????????????????????","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"????????? 18pt???????????? 14pt????????????????????????????????????????????? 3:1???","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"????????? 18pt???????????? 14pt????????????????????????????????????????????? 4.5:1???","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","why_523b3d8c":"?????????"},"zh":{"accessibility_checker_b3af1f6c":"?????????????????????","action_to_take_b626a99a":"?????????????????????","add_a_caption_2a915239":"????????????","add_alt_text_for_the_image_48cd88aa":"???????????????????????????","adjacent_links_with_the_same_url_should_be_a_singl_7a1f7f6c":"???????????? URL ??????????????????????????????????????????","alt_attribute_text_should_not_contain_more_than_12_e21d4040":"?????????????????????????????? 120 ????????????","apply_781a2546":"??????","change_alt_text_92654906":"??????????????????","change_heading_tag_to_paragraph_a61e3113":"???????????????????????????","change_text_color_1aecb912":"??????????????????","check_accessibility_3c78211c":"??????????????????","checking_for_accessibility_issues_fac18c6d":"??????????????????????????????","close_accessibility_checker_29d1c51e":"???????????????????????????","close_d634289d":"??????","column_e1ae5c64":"???","column_group_1c062368":"??????","decorative_image_fde98579":"????????????","element_starting_with_start_91bf4c3b":"???{ start }???????????????","fix_heading_hierarchy_f60884c4":"????????????????????????","format_as_a_list_142210c3":"??????????????????","header_column_f27433cb":"?????????","header_row_and_column_ec5b9ec":"???????????????","header_row_f33eb169":"?????????","heading_levels_should_not_be_skipped_3947c0e0":"???????????????????????????","heading_starting_with_start_42a3e7f9":"???{ start }???????????????","headings_should_not_contain_more_than_120_characte_3c0e0cb3":"?????????????????? 120 ????????????","image_filenames_should_not_be_used_as_the_alt_attr_bcfd7780":"?????????????????????????????????????????????????????????????????????","image_with_filename_file_aacd7180":"????????????{ file }?????????","images_should_include_an_alt_attribute_describing__b86d6a86":"?????????????????????????????????????????????????????????","issue_num_total_f94536cf":"??????{ num }/{ total }","keyboards_navigate_to_links_using_the_tab_key_two__5fab8c82":"???????????? Tab ???????????????????????????????????????????????????????????????????????????????????????????????????","learn_more_about_adjacent_links_2cb9762c":"????????????????????????","learn_more_about_color_contrast_c019dfb9":"???????????????????????????","learn_more_about_organizing_page_headings_8a7caa2e":"??????????????????????????????","learn_more_about_table_headers_5f5ee13":"?????????????????????","learn_more_about_using_alt_text_for_images_5698df9a":"???????????????????????????????????????","learn_more_about_using_captions_with_tables_36fe496f":"??????????????????????????????????????????","learn_more_about_using_filenames_as_alt_text_264286af":"?????????????????????????????????????????????","learn_more_about_using_lists_4e6eb860":"????????????????????????","learn_more_about_using_scope_attributes_with_table_20df49aa":"????????????????????????????????????????????????","leave_as_is_4facfe55":"????????????","link_with_text_starting_with_start_b3fcbe71":"?????????{ start }????????????????????????","lists_should_be_formatted_as_lists_f862de8d":"??????????????????????????????","merge_links_2478df96":"????????????","next_40e12421":"?????????","no_accessibility_issues_were_detected_f8d3c875":"?????????????????????????????????","no_headers_9bc7dc7f":"?????????","none_3b5e34d2":"???","paragraph_starting_with_start_a59923f8":"???{ start }???????????????","prev_f82cbc48":"?????????","remove_heading_style_5fdc8855":"??????????????????","row_fc0944a7":"???","row_group_979f5528":"??????","screen_readers_cannot_determine_what_is_displayed__6a5842ab":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_determine_what_is_displayed__6f1ea667":"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_determine_what_is_displayed__a57e6723":"???????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_bd861652":"??????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_e62912d5":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","screen_readers_cannot_interpret_tables_without_the_f0bdec0f":"??????????????????????????????????????????????????????????????????????????????????????????????????????","set_header_scope_8c548f40":"??????????????????","set_table_header_cfab13a0":"??????????????????","sighted_users_browse_web_pages_quickly_looking_for_1d4db0c1":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","sighted_users_browse_web_pages_quickly_looking_for_ade806f5":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","table_header_starting_with_start_ffcabba6":"???{ start }?????????????????????","table_starting_with_start_e7232848":"???{ start }???????????????","tables_headers_should_specify_scope_5abf3a8e":"??????????????????????????????","tables_should_include_a_caption_describing_the_con_e91e78fc":"?????????????????????????????????????????????","tables_should_include_at_least_one_header_48779eac":"????????????????????????????????????","text_is_difficult_to_read_without_sufficient_contr_69e62bd6":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????","text_larger_than_18pt_or_bold_14pt_should_display__5c364db6":"???????????? 18 ??????????????? 14 ??????????????????????????????????????? 3:1???","text_smaller_than_18pt_or_bold_14pt_should_display_aaffb22b":"???????????? 18 ??????????????? 14 ??????????????????????????????????????? 4.5:1???","when_markup_is_used_that_visually_formats_items_as_f941fc1b":"????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????","why_523b3d8c":"??????"}}'
      );

      /***/
    },
    /* 15 */
    /***/ (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      // @flow

      var crc32 = __webpack_require__(16);

      var normalized = __webpack_require__(17);

      var underscore = __webpack_require__(19).underscore;

      module.exports = function underscoredCrc32(
        pattern /*: string */
        /*: string */
      ) {
        pattern = normalized(pattern);
        var underscored = underscore(pattern);
        var crc = crc32(pattern.length + ":" + pattern).toString(16);
        return underscored + "_" + crc;
      };

      /***/
    },
    /* 16 */
    /***/ (module) => {
      (function () {
        "use strict";

        var table = [],
          poly = 0xedb88320; // reverse polynomial
        // build the table

        function makeTable() {
          var c, n, k;

          for (n = 0; n < 256; n += 1) {
            c = n;

            for (k = 0; k < 8; k += 1) {
              if (c & 1) {
                c = poly ^ (c >>> 1);
              } else {
                c = c >>> 1;
              }
            }

            table[n] = c >>> 0;
          }
        }

        function strToArr(str) {
          // sweet hack to turn string into a 'byte' array
          return Array.prototype.map.call(str, function (c) {
            return c.charCodeAt(0);
          });
        }
        /*
         * Compute CRC of array directly.
         *
         * This is slower for repeated calls, so append mode is not supported.
         */

        function crcDirect(arr) {
          var crc = -1,
            // initial contents of LFBSR
            i,
            j,
            l,
            temp;

          for (i = 0, l = arr.length; i < l; i += 1) {
            temp = (crc ^ arr[i]) & 0xff; // read 8 bits one at a time

            for (j = 0; j < 8; j += 1) {
              if ((temp & 1) === 1) {
                temp = (temp >>> 1) ^ poly;
              } else {
                temp = temp >>> 1;
              }
            }

            crc = (crc >>> 8) ^ temp;
          } // flip bits

          return crc ^ -1;
        }
        /*
         * Compute CRC with the help of a pre-calculated table.
         *
         * This supports append mode, if the second parameter is set.
         */

        function crcTable(arr, append) {
          var crc, i, l; // if we're in append mode, don't reset crc
          // if arr is null or undefined, reset table and return

          if (typeof crcTable.crc === "undefined" || !append || !arr) {
            crcTable.crc = 0 ^ -1;

            if (!arr) {
              return;
            }
          } // store in temp variable for minor speed gain

          crc = crcTable.crc;

          for (i = 0, l = arr.length; i < l; i += 1) {
            crc = (crc >>> 8) ^ table[(crc ^ arr[i]) & 0xff];
          }

          crcTable.crc = crc;
          return crc ^ -1;
        } // build the table
        // this isn't that costly, and most uses will be for table assisted mode

        makeTable();

        module.exports = function (val, direct) {
          var val = typeof val === "string" ? strToArr(val) : val,
            ret = direct ? crcDirect(val) : crcTable(val); // convert to 2's complement hex

          return (ret >>> 0).toString(16);
        };

        module.exports.direct = crcDirect;
        module.exports.table = crcTable;
      })();

      /***/
    },
    /* 17 */
    /***/ (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      // @flow

      var parse = __webpack_require__(9);

      var print = __webpack_require__(18);

      module.exports = function normalized(
        pattern /*: string */
        /*: string */
      ) {
        return print(parse(pattern)).replace(/\s+/g, " ");
      };

      /***/
    },
    /* 18 */
    /***/ (module) => {
      "use strict";
      // @flow

      /*::
import type {
  AST,
  Plural,
  Styled,
  SubMessages
} from '../format-message-parse'
type Placeholder = any // https://github.com/facebook/flow/issues/4050
*/

      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (
          typeof Symbol === "function" &&
          typeof Symbol.iterator === "symbol"
        ) {
          _typeof = function _typeof(obj) {
            return typeof obj;
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };
        }
        return _typeof(obj);
      }

      var SYNTAX_PLURAL = /[{}#]+/g;
      var SYNTAX_STYLE = /[{}\s]+/;
      var SYNTAX_COMMON = /[{}]+/g;
      var ESC = "'";
      var DBL_ESC = "''";
      var ARG_NUM = "#";
      /**
       * Print
       *
       * Turns this:
       *  [ "You have ", [ "numBananas", "plural", 0, {
       *       "=0": [ "no bananas" ],
       *      "one": [ "a banana" ],
       *    "other": [ [ '#' ], " bananas" ]
       *  } ], " for sale." ]
       *
       * into this:
       *  `You have { numBananas, plural,
       *       =0 {no bananas}
       *      one {a banana}
       *    other {# bananas}
       *  } for sale`
       **/

      module.exports = function print(
        ast /*: string */
        /*: AST */
      ) {
        return printMessage(ast, null);
      };

      function printMessage(
        ast,
        /*: AST */
        parentType
        /*: ?string */
      ) {
        return ast
          .map(function (element) {
            if (typeof element === "string")
              return printText(element, parentType);
            return printPlaceholder(element, parentType);
          })
          .join("");
      }

      function printText(
        text,
        /*: string */
        parentType
        /*: ?string */
      ) {
        var special = parentType === "plural" ? SYNTAX_PLURAL : SYNTAX_COMMON;
        return text
          .replace(/'/g, DBL_ESC) // double apostrophe
          .replace(special, "'$&'"); // escape syntax
      }

      function printPlaceholder(
        placeholder,
        /*: Placeholder */
        parentType
        /*: ?string */
      ) {
        if (placeholder[0] === ARG_NUM) return ARG_NUM;
        if (typeof placeholder[2] === "number") return printPlural(placeholder);
        return printStyled(placeholder);
      }

      function printStyled(
        placeholder
        /*: Styled */
      ) {
        var key = placeholder[0];
        var type = placeholder[1];
        var style = placeholder[2];
        var styleStr =
          _typeof(style) === "object"
            ? "," + printChildren(style, type) + "\n"
            : style
            ? ", " + printStyle(style) + " "
            : " ";
        return "{ " + key + (type ? ", " + type : "") + styleStr + "}";
      }

      function printStyle(
        style
        /*: string */
      ) {
        if (!SYNTAX_STYLE.test(style)) return style.replace(/'/g, DBL_ESC);
        return ESC + style.replace(/'/g, DBL_ESC) + ESC;
      }

      function printPlural(
        plural
        /*: Plural */
      ) {
        var key = plural[0];
        var type = plural[1];
        var offset = plural[2];
        var children = plural[3];
        return (
          "{ " +
          key +
          ", " +
          type +
          "," +
          (offset ? " offset:" + offset : "") +
          printChildren(children, type) +
          "\n}"
        );
      }

      function printChildren(
        children,
        /*: SubMessages */
        parentType
        /*: ?string */
      ) {
        var keys = Object.keys(children);
        var padLength = keys.reduce(function (max, key) {
          return Math.max(max, key.length);
        }, 0);
        return keys
          .map(function (key) {
            return (
              "\n  " +
              leftSpacePad(key, padLength) +
              " {" +
              printMessage(children[key], parentType) +
              "}"
            );
          })
          .join("");
      }

      function leftSpacePad(
        string,
        /*: string */
        count
        /*: number */
      ) {
        var padding = "";

        for (var i = string.length; i < count; ++i) {
          padding += " ";
        }

        return padding + string;
      }

      /***/
    },
    /* 19 */
    /***/ (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      // @flow

      var normalized = __webpack_require__(17); // credits to http://jsperf.com/unicode-to-ascii/3

      var table =
        "AAAAAAACEEEEIIII" +
        "DNOOOOO.OUUUUY.." +
        "aaaaaaaceeeeiiii" +
        "dnooooo.ouuuuy.y" +
        "AaAaAaCcCcCcCcDd" +
        "DdEeEeEeEeEeGgGg" +
        "GgGgHhHhIiIiIiIi" +
        "IiIiJjKkkLlLlLlL" +
        "lJlNnNnNnnNnOoOo" +
        "OoOoRrRrRrSsSsSs" +
        "SsTtTtTtUuUuUuUu" +
        "UuUuWwYyYZzZzZz.";

      function stripAccent(
        str
        /*: string */
      ) {
        var clean = "";
        var strLength = str.length;
        var tableLength = table.length;

        for (var s = 0; s < strLength; ++s) {
          var ch = str[s];
          var t = ch.charCodeAt(0) - 192; // Index of character code in the strip string

          if (t >= 0 && t < tableLength) {
            var ascii = table[t]; // Character is within our table, so we can strip the accent...

            if (ascii !== ".") ch = ascii; // ...unless it was shown as a '.'
          }

          clean += ch;
        }

        return clean;
      }

      function underscore(
        str
        /*: string */
      ) {
        return stripAccent(str)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_|_$/g, "")
          .slice(0, 50);
      }

      module.exports = function underscored(
        pattern /*: string */
        /*: string */
      ) {
        return underscore(normalized(pattern));
      };

      module.exports.underscore = underscore;

      /***/
    },
    /* 20 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);

      var FILENAMELIKE = /^\S+\.\S+$/;
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "img-alt-filename",
        test: function test(elem) {
          if (elem.tagName !== "IMG") {
            return true;
          }

          var alt = elem.hasAttribute("alt") ? elem.getAttribute("alt") : null;
          var isDecorative = alt !== null && alt.replace(/\s/g, "") === "";
          return !FILENAMELIKE.test(alt) || isDecorative;
        },
        data: function data(elem) {
          var alt = elem.hasAttribute("alt") ? elem.getAttribute("alt") : null;
          var decorative = alt !== null && alt.replace(/\s/g, "") === "";
          return {
            alt: alt || "",
            decorative: decorative,
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Change alt text"
              ),
              dataKey: "alt",
              disabledIf: function disabledIf(data) {
                return data.decorative;
              },
            },
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Decorative image"
              ),
              dataKey: "decorative",
              checkbox: true,
            },
          ];
        },
        update: function update(elem, data) {
          if (data.decorative) {
            elem.setAttribute("alt", "");
            elem.setAttribute("role", "presentation");
          } else {
            elem.setAttribute("alt", data.alt);
            elem.removeAttribute("role");
          }

          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Image filenames should not be used as the alt attribute describing the image content."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Screen readers cannot determine what is displayed in an image without alternative text, and filenames are often meaningless strings of numbers and letters that do not describe the context or meaning."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/F30.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about using filenames as alt text"
          );
        },
      };

      /***/
    },
    /* 21 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(2);

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "table-caption",
        test: function test(elem) {
          if (elem.tagName !== "TABLE") {
            return true;
          }

          var caption = elem.querySelector("caption");
          return !!caption && caption.textContent.replace(/\s/g, "") !== "";
        },
        data: function data(elem) {
          return {
            caption: "",
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Add a caption"
              ),
              dataKey: "caption",
            },
          ];
        },
        update: function update(elem, data) {
          var caption = elem.querySelector("caption");

          if (!caption) {
            caption = elem.ownerDocument.createElement("caption");
            (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.prepend)(elem, caption);
          }

          caption.textContent = data.caption;
          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Tables should include a caption describing the contents of the table."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Screen readers cannot interpret tables without the proper structure. Table captions describe the context and general understanding of the table."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/H39.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about using captions with tables"
          );
        },
      };

      /***/
    },
    /* 22 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(2);

      var _forEach = Array.prototype.forEach;
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "table-header",
        test: function test(elem) {
          if (elem.tagName !== "TABLE") {
            return true;
          }

          return elem.querySelector("th");
        },
        data: function data(elem) {
          return {
            header: "none",
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Set table header"
              ),
              dataKey: "header",
              options: [
                [
                  "none",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "No headers"
                  ),
                ],
                [
                  "row",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Header row"
                  ),
                ],
                [
                  "col",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Header column"
                  ),
                ],
                [
                  "both",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Header row and column"
                  ),
                ],
              ],
            },
          ];
        },
        update: function update(elem, data) {
          _forEach.call(elem.querySelectorAll("th"), function (th) {
            (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.changeTag)(th, "td");
          });

          if (data.header === "none") {
            return elem;
          }

          var row = data.header === "row" || data.header === "both";
          var col = data.header === "col" || data.header === "both";
          var tableRows = elem.querySelectorAll("tr");

          for (var i = 0; i < tableRows.length; ++i) {
            if (i === 0 && row) {
              _forEach.call(tableRows[i].querySelectorAll("td"), function (td) {
                var th = (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.changeTag)(
                  td,
                  "th"
                );
                th.setAttribute("scope", "col");
              });

              continue;
            }

            if (!col) {
              break;
            }

            var td = tableRows[i].querySelector("td");

            if (td) {
              var th = (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.changeTag)(
                td,
                "th"
              );
              th.setAttribute("scope", "row");
            }
          }

          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Tables should include at least one header."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Screen readers cannot interpret tables without the proper structure. Table headers provide direction and overview of the content."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/H43.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about table headers"
          );
        },
      };

      /***/
    },
    /* 23 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);

      var VALID_SCOPES = ["row", "col", "rowgroup", "colgroup"];
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "table-header-scope",
        test: function test(elem) {
          if (elem.tagName !== "TH") {
            return true;
          }

          return VALID_SCOPES.indexOf(elem.getAttribute("scope")) !== -1;
        },
        data: function data(elem) {
          return {
            scope: elem.getAttribute("scope") || "none",
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Set header scope"
              ),
              dataKey: "scope",
              options: [
                [
                  "none",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "None"
                  ),
                ],
                [
                  "row",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Row"
                  ),
                ],
                [
                  "col",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Column"
                  ),
                ],
                [
                  "rowgroup",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Row group"
                  ),
                ],
                [
                  "colgroup",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Column group"
                  ),
                ],
              ],
            },
          ];
        },
        update: function update(elem, data) {
          if (data.header === "none") {
            elem.removeAttribute("scope");
          } else {
            elem.setAttribute("scope", data.scope);
          }

          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Tables headers should specify scope."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Screen readers cannot interpret tables without the proper structure. Table headers provide direction and content scope."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/H63.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about using scope attributes with tables"
          );
        },
      };

      /***/
    },
    /* 24 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      /* harmony import */ var wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(25);
      /* harmony import */ var wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(
          wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1__
        );
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(2);
      /* harmony import */ var _utils_rgb_hex__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(26);
      /* harmony import */ var _utils_rgb_hex__WEBPACK_IMPORTED_MODULE_3___default =
        /*#__PURE__*/ __webpack_require__.n(
          _utils_rgb_hex__WEBPACK_IMPORTED_MODULE_3__
        );

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "small-text-contrast",
        test: function test(elem) {
          var config =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          var disabled = config.disableContrastCheck == true;
          var noText = !(0,
          _utils_dom__WEBPACK_IMPORTED_MODULE_2__.hasTextNode)(elem);

          if (
            disabled ||
            noText ||
            (0, _utils_dom__WEBPACK_IMPORTED_MODULE_2__.onlyContainsLink)(
              elem
            ) ||
            wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1___default().isLargeText(
              elem
            )
          ) {
            return true;
          }

          return wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1___default()(
            elem
          );
        },
        data: function data(elem) {
          var styles = window.getComputedStyle(elem);
          return {
            color: styles.color,
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Change text color"
              ),
              dataKey: "color",
              color: true,
            },
          ];
        },
        update: function update(elem, data) {
          elem.style.color = data.color;
          var styles = (0,
          _utils_dom__WEBPACK_IMPORTED_MODULE_2__.splitStyleAttribute)(
            elem.getAttribute("data-mce-style") || ""
          );

          if (data && data.color && data.color.indexOf("#") < 0) {
            styles.color = "#".concat(
              _utils_rgb_hex__WEBPACK_IMPORTED_MODULE_3___default()(data.color)
            );
          } else {
            styles.color = data.color;
          }

          elem.setAttribute(
            "data-mce-style",
            (0, _utils_dom__WEBPACK_IMPORTED_MODULE_2__.createStyleString)(
              styles
            )
          );
          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Text smaller than 18pt (or bold 14pt) should display a minimum contrast ratio of 4.5:1."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Text is difficult to read without sufficient contrast between the text and the background, especially for those with low vision."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/G17.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about color contrast"
          );
        },
      };

      /***/
    },
    /* 25 */
    /***/ (module, exports) => {
      var TRANSPARENT = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      };
      var WHITE = {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      };
      var DEFAULTS = {
        foreground: "rgb(0, 0, 0)",
      };

      function parseRGBA(str) {
        var pattern = /rgba?\((\d+),\s(\d+),\s(\d+)(,\s([\d\.]+))?\)/;
        var matches = pattern.exec(str);

        if (!matches) {
          return TRANSPARENT;
        }

        return {
          r: parseInt(matches[1], 10),
          g: parseInt(matches[2], 10),
          b: parseInt(matches[3], 10),
          a: parseFloat(matches[5] || 1),
        };
      }

      function blendRGBA(dst, src) {
        var a = src.a + dst.a * (1 - src.a);

        if (a === 0) {
          return TRANSPARENT;
        }

        return {
          r: (src.r * src.a + dst.r * dst.a * (1 - src.a)) / a,
          g: (src.g * src.a + dst.g * dst.a * (1 - src.a)) / a,
          b: (src.b * src.a + dst.b * dst.a * (1 - src.a)) / a,
          a: a,
        };
      }

      function relativeLuminance(rgba) {
        if (rgba.a < 1) {
          rgba = blendRGBA(WHITE, rgba);
        }

        var r = luminanceColor(rgba.r);
        var g = luminanceColor(rgba.g);
        var b = luminanceColor(rgba.b);
        return r * 0.2126 + g * 0.7152 + b * 0.0722;
      }

      function luminanceColor(val) {
        var s = val / 255;

        if (s <= 0.03928) {
          return s / 12.92;
        }

        return Math.pow((s + 0.055) / 1.055, 2.4);
      }

      function contrastRatio(rgba1, rgba2) {
        var lums = [relativeLuminance(rgba1), relativeLuminance(rgba2)];
        lums.sort(function (a, b) {
          return b - a;
        });
        return (lums[0] + 0.05) / (lums[1] + 0.05);
      }

      function backgroundColor(elem) {
        var stack = [];
        var cur = elem;

        while (cur != null) {
          var rgba = parseRGBA(window.getComputedStyle(cur).backgroundColor);

          if (rgba.a > 0) {
            stack.push(rgba);
          }

          if (rgba.a === 1) {
            break;
          }

          cur = cur.parentElement;
        }

        return stack.reduceRight(blendRGBA, WHITE);
      }

      function elementColors(elem) {
        var rgba = parseRGBA(
          window.getComputedStyle(elem).color || DEFAULTS.foreground
        );
        var bg = backgroundColor(elem);
        var fg = blendRGBA(bg, rgba);
        return [fg, bg];
      }

      function elementContrastRatio(elem) {
        var colors = elementColors(elem);
        return contrastRatio(colors[0], colors[1]);
      }

      function isLargeText(elem) {
        var styles = window.getComputedStyle(elem);
        var size = parseFloat(styles.fontSize) / 1.333;
        var weight = styles.fontWeight;
        var isBold = weight === "bold" || parseInt(weight, 10) >= 600;
        return isBold ? size >= 14 : size >= 18;
      }

      function elementIsValid(elem) {
        var contrast = elementContrastRatio(elem);
        return isLargeText(elem) ? contrast >= 3 : contrast >= 4.5;
      }

      exports = module.exports = elementIsValid;
      exports.isLargeText = isLargeText;
      exports.contrastRatio = elementContrastRatio;
      exports.parseRGBA = parseRGBA;

      /***/
    },
    /* 26 */
    /***/ (module) => {
      "use strict";
      /**
       * This file is taken from the rgb-hex npm module to ensure it is transpiled.
       */

      /* eslint-disable no-mixed-operators */

      module.exports = function (red, green, blue, alpha) {
        var isPercent = (red + (alpha || "")).toString().includes("%");

        if (typeof red === "string") {
          var res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number); // TODO: use destructuring when targeting Node.js 6

          red = res[0];
          green = res[1];
          blue = res[2];
          alpha = res[3];
        } else if (alpha !== void 0) {
          alpha = parseFloat(alpha);
        }

        if (
          typeof red !== "number" ||
          typeof green !== "number" ||
          typeof blue !== "number" ||
          red > 255 ||
          green > 255 ||
          blue > 255
        ) {
          throw new TypeError("Expected three numbers below 256");
        }

        if (typeof alpha === "number") {
          if (!isPercent && alpha >= 0 && alpha <= 1) {
            alpha = Math.round(255 * alpha);
          } else if (isPercent && alpha >= 0 && alpha <= 100) {
            alpha = Math.round((255 * alpha) / 100);
          } else {
            throw new TypeError(
              "Expected alpha value (".concat(
                alpha,
                ") as a fraction or percentage"
              )
            );
          }

          alpha = (alpha | (1 << 8)).toString(16).slice(1);
        } else {
          alpha = "";
        }

        return (
          (blue | (green << 8) | (red << 16) | (1 << 24))
            .toString(16)
            .slice(1) + alpha
        );
      };

      /***/
    },
    /* 27 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      /* harmony import */ var wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(25);
      /* harmony import */ var wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(
          wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1__
        );
      /* harmony import */ var _small_text_contrast__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(24);
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(2);

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "large-text-contrast",
        test: function test(elem) {
          var config =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          var disabled = config.disableContrastCheck == true;
          var noText = !(0,
          _utils_dom__WEBPACK_IMPORTED_MODULE_3__.hasTextNode)(elem);

          if (
            disabled ||
            noText ||
            (0, _utils_dom__WEBPACK_IMPORTED_MODULE_3__.onlyContainsLink)(
              elem
            ) ||
            !wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1___default().isLargeText(
              elem
            )
          ) {
            return true;
          }

          return wcag_element_contrast__WEBPACK_IMPORTED_MODULE_1___default()(
            elem
          );
        },
        data: _small_text_contrast__WEBPACK_IMPORTED_MODULE_2__["default"].data,
        form: _small_text_contrast__WEBPACK_IMPORTED_MODULE_2__["default"].form,
        update:
          _small_text_contrast__WEBPACK_IMPORTED_MODULE_2__["default"].update,
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Text larger than 18pt (or bold 14pt) should display a minimum contrast ratio of 3:1."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Text is difficult to read without sufficient contrast between the text and the background, especially for those with low vision."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/G17.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about color contrast"
          );
        },
      };

      /***/
    },
    /* 28 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      function _toConsumableArray(arr) {
        return (
          _arrayWithoutHoles(arr) ||
          _iterableToArray(arr) ||
          _unsupportedIterableToArray(arr) ||
          _nonIterableSpread()
        );
      }

      function _nonIterableSpread() {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (
          n === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return _arrayLikeToArray(o, minLen);
      }

      function _iterableToArray(iter) {
        if (
          (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
          iter["@@iterator"] != null
        )
          return Array.from(iter);
      }

      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }

      var shouldMergeAnchors = function shouldMergeAnchors(elem1, elem2) {
        if (
          !elem1 ||
          !elem2 ||
          elem1.tagName !== "A" ||
          elem2.tagName !== "A"
        ) {
          return false;
        }

        return elem1.getAttribute("href") === elem2.getAttribute("href");
      };

      var notWhitespace = function notWhitespace(node) {
        return node.nodeType !== Node.TEXT_NODE || node.textContent.match(/\S/);
      };

      var onlyChild = function onlyChild(parent) {
        var child = parent.firstElementChild;

        if (!child) {
          return null;
        }

        if (
          _toConsumableArray(parent.childNodes).filter(notWhitespace).length > 1
        ) {
          return null;
        }

        return child;
      };

      var solitaryDescendantImage = function solitaryDescendantImage(link) {
        var parent = link;
        var child = onlyChild(parent);

        while (child) {
          if (child.tagName === "IMG") {
            return child;
          }

          parent = child;
          child = onlyChild(parent);
        }

        return null;
      };

      var normalizeText = function normalizeText(text) {
        // normalize whitespace and trim leading and trailing whitespace
        return text.replace(/\s+/g, " ").trim();
      };

      var descendantImageWithRedundantAltText =
        function descendantImageWithRedundantAltText(left, right) {
          var leftImage = solitaryDescendantImage(left);
          var rightImage = solitaryDescendantImage(right);

          if (
            leftImage &&
            !rightImage &&
            normalizeText(leftImage.getAttribute("alt")) ===
              normalizeText(right.textContent)
          ) {
            return leftImage;
          } else if (
            rightImage &&
            !leftImage &&
            normalizeText(rightImage.getAttribute("alt")) ===
              normalizeText(left.textContent)
          ) {
            return rightImage;
          } else {
            return null;
          }
        };

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "adjacent-links",
        test: function test(elem) {
          if (elem.tagName != "A") {
            return true;
          }

          return !shouldMergeAnchors(elem, elem.nextElementSibling);
        },
        data: function data(elem) {
          return {
            combine: false,
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Merge links"
              ),
              checkbox: true,
              dataKey: "combine",
            },
          ];
        },
        update: function update(elem, data) {
          var rootElem = elem.parentNode;

          if (data.combine) {
            var next = elem.nextElementSibling; // https://www.w3.org/TR/WCAG20-TECHS/H2.html

            var image = descendantImageWithRedundantAltText(elem, next);

            if (image) {
              image.setAttribute("alt", "");
            }

            rootElem.removeChild(next);
            elem.innerHTML += " ".concat(next.innerHTML);
          }

          return elem;
        },
        rootNode: function rootNode(elem) {
          return elem.parentNode;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Adjacent links with the same URL should be a single link."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Keyboards navigate to links using the Tab key. Two adjacent links that direct to the same destination can be confusing to keyboard users."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/H2.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about adjacent links"
          );
        },
      };

      /***/
    },
    /* 29 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(2);

      /* Headings Sequence rule
       * this rule is ensuring that heading tags (H1-H6) are layed out in sequential
       * order for organizing your site.
       *
       * this rule only looks at H2-H6 headings. all other tags pass.
       * this rule will walk 'up-down' the dom to find the heading tag that is
       * laid out previous to the heading tag being checked.
       * this rule will see if the heading tag number of the previous heading is
       * one more than one less than it's own heading tag and will fail if so
       * this rule will check to see if there is no previous heading tag and will
       * fail the test if so
       */

      var isHtag = function isHtag(elem) {
        var allHTags = {
          H1: true,
          H2: true,
          H3: true,
          H4: true,
          H5: true,
          H6: true,
        };
        return elem && allHTags[elem.tagName] === true;
      }; // gets the H tag that is furthest down in the tree from elem(inclusive)

      var getHighestOrderHForElem = function getHighestOrderHForElem(elem) {
        var allHForElem = Array.prototype.slice.call(
          elem.querySelectorAll("H1,H2,H3,H4,H5,H6")
        );

        if (allHForElem.length > 0) {
          return allHForElem.reverse()[0];
        }

        if (isHtag(elem)) {
          return elem;
        }

        return void 0;
      }; // gets all siblings of elem that come before the elem ordered by nearest to
      // elem

      var getPrevSiblings = function getPrevSiblings(elem) {
        var ret = [];

        if (!elem || !elem.parentElement || !elem.parentElement.children) {
          return ret;
        }

        var sibs = elem.parentElement.children;

        for (var i = 0; i < sibs.length; i++) {
          if (sibs[i] === elem) {
            break;
          }

          ret.unshift(sibs[i]);
        }

        return ret;
      };

      var searchPrevSiblings = function searchPrevSiblings(elem) {
        var sibs = getPrevSiblings(elem);
        var ret;

        for (var i = 0; i < sibs.length; i++) {
          ret = getHighestOrderHForElem(sibs[i]);

          if (ret) {
            break;
          }
        }

        return ret;
      };

      var _walkUpTree = function _walkUpTree(elem) {
        var ret;

        if (!elem || elem.tagName === "BODY") {
          return void 0;
        }

        if (isHtag(elem)) {
          return elem;
        }

        ret = searchPrevSiblings(elem);

        if (!ret) {
          ret = _walkUpTree(elem.parentElement);
        }

        return ret;
      };

      var walkUpTree = function walkUpTree(elem) {
        var ret = searchPrevSiblings(elem);

        if (!ret) {
          ret = _walkUpTree(elem.parentElement);
        }

        return ret;
      };

      var getPriorHeading = function getPriorHeading(elem) {
        return walkUpTree(elem);
      }; // a valid prior H tag is greater or equal to one less than current

      var getValidHeadings = function getValidHeadings(elem) {
        var hNum = +elem.tagName.substring(1);
        var ret = {};

        for (var i = hNum - 1; i <= 6; i++) {
          ret["H".concat(i)] = true;
        }

        return ret;
      };

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "headings-sequence",
        test: function test(elem) {
          var testTags = {
            H2: true,
            H3: true,
            H4: true,
            H5: true,
            H6: true,
          };

          if (testTags[elem.tagName] !== true) {
            return true;
          }

          var validHeadings = getValidHeadings(elem);
          var priorHeading = getPriorHeading(elem);

          if (priorHeading) {
            return validHeadings[priorHeading.tagName];
          }

          return true;
        },
        data: function data(elem) {
          return {
            action: "nothing",
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Action to take:"
              ),
              dataKey: "action",
              options: [
                [
                  "nothing",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Leave as is"
                  ),
                ],
                [
                  "elem",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Fix heading hierarchy"
                  ),
                ],
                [
                  "modify",
                  (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                    "Remove heading style"
                  ),
                ],
              ],
            },
          ];
        },
        update: function update(elem, data) {
          if (!data || !data.action || data.action === "nothing") {
            return elem;
          }

          switch (data.action) {
            case "elem": {
              var priorH = getPriorHeading(elem);
              var hIdx = priorH ? +priorH.tagName.substring(1) : 0;
              return (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.changeTag)(
                elem,
                "H".concat(hIdx + 1)
              );
            }

            case "modify": {
              return (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.changeTag)(
                elem,
                "p"
              );
            }
          }
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Heading levels should not be skipped."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should use the proper structure."
          );
        },
        link: "https://www.w3.org/TR/WCAG20-TECHS/G141.html",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about organizing page headings"
          );
        },
      };

      /***/
    },
    /* 30 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);

      var MAX_ALT_LENGTH = 120;
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        "max-alt-length": MAX_ALT_LENGTH,
        id: "img-alt-length",
        test: function test(elem) {
          if (elem.tagName !== "IMG") {
            return true;
          }

          var alt = elem.getAttribute("alt");
          return alt == null || alt.length <= MAX_ALT_LENGTH;
        },
        data: function data(elem) {
          var alt = elem.getAttribute("alt");
          return {
            alt: alt || "",
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Change alt text"
              ),
              dataKey: "alt",
              textarea: true,
            },
          ];
        },
        update: function update(elem, data) {
          elem.setAttribute("alt", data.alt);
          return elem;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Alt attribute text should not contain more than 120 characters."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Screen readers cannot determine what is displayed in an image without alternative text, which describes the content and meaning of the image. Alternative text should be simple and concise."
          );
        },
        link: "",
      };

      /***/
    },
    /* 31 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      /* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(2);

      var MAX_HEADING_LENGTH = 125;
      var IS_HEADING = {
        H1: true,
        H2: true,
        H3: true,
        H4: true,
        H5: true,
        H6: true,
      };
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        "max-heading-length": MAX_HEADING_LENGTH,
        id: "paragraphs-for-headings",
        test: function test(elem) {
          if (!IS_HEADING[elem.tagName]) {
            return true;
          }

          return elem.textContent.length <= MAX_HEADING_LENGTH;
        },
        data: function data(elem) {
          return {
            change: false,
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Change heading tag to paragraph"
              ),
              checkbox: true,
              dataKey: "change",
            },
          ];
        },
        update: function update(elem, data) {
          var ret = elem;

          if (data.change) {
            ret = (0, _utils_dom__WEBPACK_IMPORTED_MODULE_1__.changeTag)(
              elem,
              "p"
            );
          }

          return ret;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Headings should not contain more than 120 characters."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Sighted users browse web pages quickly, looking for large or bolded headings. Screen reader users rely on headers for contextual understanding. Headers should be concise within the proper structure."
          );
        },
        link: "",
      };

      /***/
    },
    /* 32 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(7);
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it =
          (typeof Symbol !== "undefined" && o[Symbol.iterator]) ||
          o["@@iterator"];
        if (!it) {
          if (
            Array.isArray(o) ||
            (it = _unsupportedIterableToArray(o)) ||
            (allowArrayLike && o && typeof o.length === "number")
          ) {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
              s: F,
              n: function n() {
                if (i >= o.length) return { done: true };
                return { done: false, value: o[i++] };
              },
              e: function e(_e) {
                throw _e;
              },
              f: F,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var normalCompletion = true,
          didErr = false,
          err;
        return {
          s: function s() {
            it = it.call(o);
          },
          n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function e(_e2) {
            didErr = true;
            err = _e2;
          },
          f: function f() {
            try {
              if (!normalCompletion && it["return"] != null) it["return"]();
            } finally {
              if (didErr) throw err;
            }
          },
        };
      }

      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (
          n === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return _arrayLikeToArray(o, minLen);
      }

      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      }

      /**
       * Handles:
       * * list item
       * - list item
       * 1. list item
       * 1) list item
       * i. list item
       * a. list Item
       */

      var orderedChars = "[A-Z]+|[a-z]+|[0-9]+";
      var bulletMarkers = ["*", "-"]
        .map(function (c) {
          return "\\" + c;
        })
        .join("|");
      var orderedMarkers = [".", ")"]
        .map(function (c) {
          return "\\" + c;
        })
        .join("|");
      var listLikeRegex = new RegExp(
        "^\\s*(?:(?:["
          .concat(bulletMarkers, "])|(?:(")
          .concat(orderedChars, ")[")
          .concat(orderedMarkers, "]))\\s+")
      );

      var isTextList = function isTextList(elem) {
        return elem.tagName === "P" && listLikeRegex.test(elem.textContent);
      };

      var cleanListItem = function cleanListItem(elem) {
        if (elem.nodeType === Node.TEXT_NODE) {
          elem.textContent = elem.textContent.replace(listLikeRegex, "");
          return true;
        }

        var _iterator = _createForOfIteratorHelper(elem.childNodes),
          _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var childElement = _step.value;
            var found = cleanListItem(childElement);
            if (found) return true;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return false;
      };

      var moveContents = function moveContents(from, to) {
        while (from.firstChild) {
          to.appendChild(from.firstChild);
        }
      };

      var splitParagraphsByBreak = function splitParagraphsByBreak(paragraph) {
        var appended = [];
        var child = paragraph.firstChild;

        while (child) {
          var currentParent = appended[appended.length - 1];

          if (child.tagName === "BR") {
            appended.push(document.createElement("p"));
            child = child.nextSibling;
            continue;
          }

          if (currentParent) currentParent.appendChild(child);
          child = child.nextSibling;
        }

        var nextNode = paragraph.nextSibling;
        appended.forEach(function (newParagraph) {
          paragraph.parentNode.insertBefore(newParagraph, nextNode);
        });
      };

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {
        id: "list-structure",
        test: function test(elem) {
          var isList = isTextList(elem);
          var isFirst = elem.previousElementSibling
            ? !isTextList(elem.previousElementSibling)
            : true;
          return !(isList && isFirst);
        },
        data: function data(elem) {
          var match = elem.textContent.match(listLikeRegex);
          return {
            orderedStart: match[1] ? match[1] : null,
            formatAsList: false,
          };
        },
        form: function form() {
          return [
            {
              label: (0,
              _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
                "Format as a list"
              ),
              checkbox: true,
              dataKey: "formatAsList",
            },
          ];
        },
        update: function update(elem, data) {
          var rootElem = elem.parentNode;

          if (data.formatAsList) {
            var isOrdered = Boolean(data.orderedStart);
            var listContainer = document.createElement(isOrdered ? "ol" : "ul");

            if (isOrdered) {
              listContainer.setAttribute("type", data.orderedStart);
              listContainer.setAttribute("start", data.orderedStart);
            }

            var cursor = elem;

            while (cursor) {
              if (!isTextList(cursor)) break;
              var nextIsOrdered = Boolean(
                cursor.textContent.match(listLikeRegex)[1]
              );
              if (isOrdered !== nextIsOrdered) break;
              splitParagraphsByBreak(cursor);
              var li = document.createElement("li");
              listContainer.appendChild(li);
              moveContents(cursor, li);
              var nextSibling = cursor.nextElementSibling; // Remove the now empty siblings
              // Skip elem because elem is replaced later.

              if (cursor !== elem) cursor.parentNode.removeChild(cursor);
              cursor = nextSibling;
              cleanListItem(li);
            }

            rootElem.replaceChild(listContainer, elem);
            return listContainer;
          }

          return elem;
        },
        rootNode: function rootNode(elem) {
          return elem.parentNode;
        },
        message: function message() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Lists should be formatted as lists."
          );
        },
        why: function why() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "When markup is used that visually formats items as a list but does not indicate the list relationship, users may have difficulty in navigating the information."
          );
        },
        link: "https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H48",
        linkText: function linkText() {
          return (0, _format_message__WEBPACK_IMPORTED_MODULE_0__["default"])(
            "Learn more about using lists"
          );
        },
      };

      /***/
    },
    /******/
  ];
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var tinymce_a11y_checker_lib_modules_node_checker__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(1);

    window.check =
      tinymce_a11y_checker_lib_modules_node_checker__WEBPACK_IMPORTED_MODULE_0__[
        "default"
      ];
  })();

  /******/
})();

;(() => {
  "use strict"
  var __webpack_modules__ = {
    /*!**************************************!*\
!*** ./src/scripts/helpers/R2Dom.js ***!
\**************************************/
    "./src/scripts/helpers/R2Dom.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      })
      let R2Dom = {
        Methods: {},
        Init: function () {
          document.querySelectorAll("[r2-method]").forEach(function (elem) {
            const attrMethods = elem.getAttribute("r2-method")
            attrMethods.split(" ").forEach(function (method) {
              try {
                new R2Dom.Methods[method](elem)
              } catch (err) {}
            })
          })
        },
      }
      const __WEBPACK_DEFAULT_EXPORT__ = R2Dom
    },
    /*!****************************************!*\
!*** ./src/scripts/methods/example.js ***!
\****************************************/
    "./src/scripts/methods/example.js": (
      __unused_webpack_module,
      __unused_webpack___webpack_exports__,
      __webpack_require__,
    ) => {
      var _helpers_R2Dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ../helpers/R2Dom */
        "./src/scripts/helpers/R2Dom.js",
      )
      _helpers_R2Dom__WEBPACK_IMPORTED_MODULE_0__["default"].Methods.example =
        function (_this) {
          console.warn("src/scripts/methods/example.js Method!", _this)
        }
    },
  }
  var __webpack_module_cache__ = {}
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    })
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)
    return module.exports
  }
  ;(() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: !0,
            get: definition[key],
          })
        }
      }
    }
  })()
  ;(() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
  })()
  var __webpack_exports__ = {}
  /*!***********************************!*\
!*** ./src/scripts/pages/home.js ***!
\***********************************/
  var _helpers_R2Dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../helpers/R2Dom */
    "./src/scripts/helpers/R2Dom.js",
  )
  var _methods_example_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../methods/example.js */
    "./src/scripts/methods/example.js",
  )
  _helpers_R2Dom__WEBPACK_IMPORTED_MODULE_0__["default"].Init()
  console.warn("src/pages/home.js Successfuly Loaded !")
})()

"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// helper function to create pre-config axios instance based on either the axios is being created on \n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ req })=>{\n    if (true) {\n        // we are on the server! because only browser has window type\n        // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk\n        // We are on the server\n        return axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n            baseURL: \"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local\",\n            headers: req.headers\n        });\n    } else {}\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvYnVpbGQtY2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEscUdBQXFHO0FBQzNFO0FBRTFCLGlFQUFlLENBQUMsRUFBRUMsR0FBRyxFQUFFO0lBQ3JCLElBQUksSUFBa0IsRUFBYTtRQUNuQyw2REFBNkQ7UUFDN0QsMkVBQTJFO1FBQ3pFLHVCQUF1QjtRQUV2QixPQUFPRCxvREFBWSxDQUFDO1lBQ2xCRyxTQUNFO1lBQ0ZDLFNBQVNILElBQUlHLE9BQU87UUFDdEI7SUFDRixPQUFPLEVBTU47QUFDSCxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vYXBpL2J1aWxkLWNsaWVudC5qcz9jNmYwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgcHJlLWNvbmZpZyBheGlvcyBpbnN0YW5jZSBiYXNlZCBvbiBlaXRoZXIgdGhlIGF4aW9zIGlzIGJlaW5nIGNyZWF0ZWQgb24gXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgZGVmYXVsdCAoeyByZXEgfSkgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHsvL3RvIGRlY2lkZSBpZiBjdXJyZW50bHkgdGhlIG5leHQuanMgc2VydmVyIG9yIHRoZSBicm93c2VyaW5nIGlzIGNhbGxpbmcgZ2V0SW5pdGlhbFByb3BzXG4gIC8vIHdlIGFyZSBvbiB0aGUgc2VydmVyISBiZWNhdXNlIG9ubHkgYnJvd3NlciBoYXMgd2luZG93IHR5cGVcbiAgLy8gcmVxdWVzdHMgc2hvdWxkIGJlIG1hZGUgdG8gaHR0cDovL2luZ3Jlc3MtbmdpbnguaW5ncmVzcy1uZ2lueC4uLmxha3NkamZrXG4gICAgLy8gV2UgYXJlIG9uIHRoZSBzZXJ2ZXJcblxuICAgIHJldHVybiBheGlvcy5jcmVhdGUoey8vcmV0dXJuIGEgcHJlLWNvbmZpZ3VyZWQgYXhpb3MgaW5zdGFuY2Ugd2l0aCB0aGUgc3BlY2lmaWMgcHJvcGVydHlcbiAgICAgIGJhc2VVUkw6XG4gICAgICAgICdodHRwOi8vaW5ncmVzcy1uZ2lueC1jb250cm9sbGVyLmluZ3Jlc3Mtbmdpbnguc3ZjLmNsdXN0ZXIubG9jYWwnLC8vIGlmIHdlIGFyZSBvbiBzZXJ2ZXIsIGl0IGlzIHJ1bm5pbmcgaW4gdGhlIGNvbnRhaW5lciwgc28gdGhlIGxvY2FsaG9zdCBsb2NhdGlvbiBpcyBkaWZmZXJlbnQgdGhhbiB0aGUgbG9jYWwgbWVjaGluZS53ZSBuZWVkIHRvIG1hbnVhbHkgcmVmZXIgdG8gdGhlIGluZ3Jlc3MgLXNydiB0byBhcHBlbmQgZG9tYWluIHRvIHRoZSB1cmxcbiAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIFdlIG11c3QgYmUgb24gdGhlIGJyb3dzZXJcbiAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVcmw6ICcvJyxcbiAgICAgIC8vIHJlcXVlc3RzIGNhbiBiZSBtYWRlIHdpdGggYSBiYXNlIHVybCBvZiAnJztyZWx5IHVwb24gdGhlIGJyb3dzZXIgdG8gcHV0IG9uIHRoZSBiYXNlIGRvbWFpbiBvciB0aGUgYmFzZSBVUkxcbiAgICB9KTtcbiAgfVxufTtcbiJdLCJuYW1lcyI6WyJheGlvcyIsInJlcSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiYmFzZVVybCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/build-client.js\n");

/***/ }),

/***/ "./components/header.js":
/*!******************************!*\
  !*** ./components/header.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (({ currentUser })=>{\n    const links = [\n        !currentUser && {\n            label: \"Sign Up\",\n            href: \"/auth/signup\"\n        },\n        !currentUser && {\n            label: \"Sign In\",\n            href: \"/auth/signin\"\n        },\n        currentUser && {\n            label: \"Sell Tickets\",\n            href: \"tickets/new\"\n        },\n        currentUser && {\n            label: \"My Orders\",\n            href: \"/orders\"\n        },\n        currentUser && {\n            label: \"Sign Out\",\n            href: \"/auth/signout\"\n        }\n    ].filter((linkConfig)=>linkConfig) //filter out all the false entries\n    .map(({ label, href })=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n            className: \"nav-item\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                className: \"nav-link\",\n                href: href,\n                children: label\n            }, void 0, false, {\n                fileName: \"/Users/wayne/Desktop/ticketing/client/components/header.js\",\n                lineNumber: 15,\n                columnNumber: 11\n            }, undefined)\n        }, href, false, {\n            fileName: \"/Users/wayne/Desktop/ticketing/client/components/header.js\",\n            lineNumber: 14,\n            columnNumber: 9\n        }, undefined);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"navbar navbar-light bg-light\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                className: \"navbar-brand\",\n                href: \"/\",\n                children: \"GitTix\"\n            }, void 0, false, {\n                fileName: \"/Users/wayne/Desktop/ticketing/client/components/header.js\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"d-flex justify-content-end\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"nav d-flex align-items-center\",\n                    children: links\n                }, void 0, false, {\n                    fileName: \"/Users/wayne/Desktop/ticketing/client/components/header.js\",\n                    lineNumber: 29,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/wayne/Desktop/ticketing/client/components/header.js\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/wayne/Desktop/ticketing/client/components/header.js\",\n        lineNumber: 23,\n        columnNumber: 5\n    }, undefined);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2hlYWRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNkI7QUFFN0IsaUVBQWUsQ0FBQyxFQUFFQyxXQUFXLEVBQUU7SUFDN0IsTUFBTUMsUUFBUTtRQUNaLENBQUNELGVBQWU7WUFBRUUsT0FBTztZQUFXQyxNQUFNO1FBQWU7UUFDekQsQ0FBQ0gsZUFBZTtZQUFFRSxPQUFPO1lBQVdDLE1BQU07UUFBZTtRQUN6REgsZUFBZTtZQUFFRSxPQUFPO1lBQWdCQyxNQUFNO1FBQWE7UUFDM0RILGVBQWU7WUFBRUUsT0FBTztZQUFhQyxNQUFNO1FBQVM7UUFDcERILGVBQWU7WUFBRUUsT0FBTztZQUFZQyxNQUFNO1FBQWdCO0tBQzNELENBQ0VDLE1BQU0sQ0FBQyxDQUFDQyxhQUFlQSxZQUFXLGtDQUFrQztLQUNwRUMsR0FBRyxDQUFDLENBQUMsRUFBRUosS0FBSyxFQUFFQyxJQUFJLEVBQUU7UUFDbkIscUJBQ0UsOERBQUNJO1lBQWNDLFdBQVU7c0JBQ3ZCLDRFQUFDVCxrREFBSUE7Z0JBQUNTLFdBQVU7Z0JBQVdMLE1BQU1BOzBCQUM5QkQ7Ozs7OztXQUZJQzs7Ozs7SUFNYjtJQUVGLHFCQUNFLDhEQUFDTTtRQUFJRCxXQUFVOzswQkFDYiw4REFBQ1Qsa0RBQUlBO2dCQUFDUyxXQUFVO2dCQUFlTCxNQUFLOzBCQUFJOzs7Ozs7MEJBSXhDLDhEQUFDTztnQkFBSUYsV0FBVTswQkFDYiw0RUFBQ0c7b0JBQUdILFdBQVU7OEJBQWlDUDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJdkQsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2NvbXBvbmVudHMvaGVhZGVyLmpzP2MwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcblxuZXhwb3J0IGRlZmF1bHQgKHsgY3VycmVudFVzZXIgfSkgPT4ge1xuICBjb25zdCBsaW5rcyA9IFtcbiAgICAhY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ1NpZ24gVXAnLCBocmVmOiAnL2F1dGgvc2lnbnVwJyB9LC8vIGlmIG5vIGN1cnJlbnRVc2VyIHNob3cgXCJzaWdudXBcIlxuICAgICFjdXJyZW50VXNlciAmJiB7IGxhYmVsOiAnU2lnbiBJbicsIGhyZWY6ICcvYXV0aC9zaWduaW4nIH0sXG4gICAgY3VycmVudFVzZXIgJiYgeyBsYWJlbDogXCJTZWxsIFRpY2tldHNcIiwgaHJlZjogXCJ0aWNrZXRzL25ld1wifSxcbiAgICBjdXJyZW50VXNlciAmJiB7IGxhYmVsOiBcIk15IE9yZGVyc1wiLCBocmVmOiBcIi9vcmRlcnNcIn0sXG4gICAgY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ1NpZ24gT3V0JywgaHJlZjogJy9hdXRoL3NpZ25vdXQnIH0sXG4gIF1cbiAgICAuZmlsdGVyKChsaW5rQ29uZmlnKSA9PiBsaW5rQ29uZmlnKS8vZmlsdGVyIG91dCBhbGwgdGhlIGZhbHNlIGVudHJpZXNcbiAgICAubWFwKCh7IGxhYmVsLCBocmVmIH0pID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxsaSBrZXk9e2hyZWZ9IGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPXtocmVmfT5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvbGk+XG4gICAgICApO1xuICAgIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWxpZ2h0IGJnLWxpZ2h0XCI+XG4gICAgICA8TGluayBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiL1wiPlxuICAgICAgICBHaXRUaXhcbiAgICAgIDwvTGluaz5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZFwiPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj57bGlua3N9PC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmF2PlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJMaW5rIiwiY3VycmVudFVzZXIiLCJsaW5rcyIsImxhYmVsIiwiaHJlZiIsImZpbHRlciIsImxpbmtDb25maWciLCJtYXAiLCJsaSIsImNsYXNzTmFtZSIsIm5hdiIsImRpdiIsInVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/header.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @faker-js/faker */ \"@faker-js/faker\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/build-client */ \"./api/build-client.js\");\n/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/header */ \"./components/header.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__, _api_build_client__WEBPACK_IMPORTED_MODULE_3__]);\n([_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__, _api_build_client__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n//install bootstrap with npm install bootstrap first\n//if we have any global CSS(that applies to all the pages of the Next.js pages), it has to be imported into\n//this _app file because this is the only file that we are guaranteed to load up every single time a user\n//comes to our application in Next.js. So the CSS doesn't need to be imported seperately into individual files\n\n\n\n\n\nconst AppComponent = ({ Component, pageProps, currentUser })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                currentUser: currentUser\n            }, void 0, false, {\n                fileName: \"/Users/wayne/Desktop/ticketing/client/pages/_app.js\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                currentUser: currentUser,\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/wayne/Desktop/ticketing/client/pages/_app.js\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/wayne/Desktop/ticketing/client/pages/_app.js\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, undefined);\n};\nAppComponent.getInitialProps = async (appContext)=>{\n    const client = (0,_api_build_client__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(appContext.ctx);\n    const { data } = await client.get(\"/api/users/currentuser\");\n    let pageProps = {};\n    if (appContext.Component.getInitialProps) {\n        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);\n    }\n    return {\n        pageProps,\n        ...data\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppComponent);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQW9EO0FBQ3BELDJHQUEyRztBQUMzRyx5R0FBeUc7QUFDekcsOEdBQThHOztBQUM3RDtBQUNQO0FBQ0k7QUFDSjtBQUUxQyxNQUFNRyxlQUFlLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUVDLFdBQVcsRUFBRTtJQUN6RCxxQkFDRSw4REFBQ0M7OzBCQUNDLDhEQUFDTCwwREFBTUE7Z0JBQUNJLGFBQWFBOzs7Ozs7MEJBQ3JCLDhEQUFDRjtnQkFBVUUsYUFBZ0JBO2dCQUFjLEdBQUdELFNBQVM7Ozs7Ozs7Ozs7OztBQUczRDtBQUVBRixhQUFhSyxlQUFlLEdBQUcsT0FBTUM7SUFDbkMsTUFBTUMsU0FBU1QsNkRBQVdBLENBQUNRLFdBQVdFLEdBQUc7SUFDekMsTUFBTSxFQUFFQyxJQUFJLEVBQUUsR0FBRyxNQUFNRixPQUFPRyxHQUFHLENBQUM7SUFFbEMsSUFBSVIsWUFBWSxDQUFDO0lBQ2pCLElBQUlJLFdBQVdMLFNBQVMsQ0FBQ0ksZUFBZSxFQUFFO1FBQ3hDSCxZQUFZLE1BQU1JLFdBQVdMLFNBQVMsQ0FBQ0ksZUFBZSxDQUFDQyxXQUFXRSxHQUFHLEVBQUVELFFBQVFFLEtBQUtOLFdBQVc7SUFDakc7SUFFQSxPQUFPO1FBQ0xEO1FBQ0EsR0FBR08sSUFBSTtJQUNUO0FBQ0Y7QUFFQSxpRUFBZVQsWUFBWUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2luc3RhbGwgYm9vdHN0cmFwIHdpdGggbnBtIGluc3RhbGwgYm9vdHN0cmFwIGZpcnN0XG4vL2lmIHdlIGhhdmUgYW55IGdsb2JhbCBDU1ModGhhdCBhcHBsaWVzIHRvIGFsbCB0aGUgcGFnZXMgb2YgdGhlIE5leHQuanMgcGFnZXMpLCBpdCBoYXMgdG8gYmUgaW1wb3J0ZWQgaW50b1xuLy90aGlzIF9hcHAgZmlsZSBiZWNhdXNlIHRoaXMgaXMgdGhlIG9ubHkgZmlsZSB0aGF0IHdlIGFyZSBndWFyYW50ZWVkIHRvIGxvYWQgdXAgZXZlcnkgc2luZ2xlIHRpbWUgYSB1c2VyXG4vL2NvbWVzIHRvIG91ciBhcHBsaWNhdGlvbiBpbiBOZXh0LmpzLiBTbyB0aGUgQ1NTIGRvZXNuJ3QgbmVlZCB0byBiZSBpbXBvcnRlZCBzZXBlcmF0ZWx5IGludG8gaW5kaXZpZHVhbCBmaWxlc1xuaW1wb3J0IHsgSW50ZXJuZXRNb2R1bGUgfSBmcm9tICdAZmFrZXItanMvZmFrZXInO1xuaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XG5pbXBvcnQgYnVpbGRDbGllbnQgZnJvbSAnLi4vYXBpL2J1aWxkLWNsaWVudCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvaGVhZGVyJztcblxuY29uc3QgQXBwQ29tcG9uZW50ID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMsIGN1cnJlbnRVc2VyIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWRlciBjdXJyZW50VXNlcj17Y3VycmVudFVzZXJ9IC8+XG4gICAgICA8Q29tcG9uZW50IGN1cnJlbnRVc2VyID0geyBjdXJyZW50VXNlcn0gey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkFwcENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyBhcHBDb250ZXh0ID0+IHsvLyB0aGlzIGdldEluaXRpYWxQcm9wcyBjYWxsZWQgaW4gX2FhcC5qcyBpcyB1c2VkIGZvciBoZWFkZXJzIG9uIGV2ZXJ5IHBhZ2UgdG8gc2hvdyB0aGUgY29ycmVjdCBzaWduaW4vb3V0IGNvbnRlbnQgYmFzZWQgb24gdGhlIHJldHVybmVkIGN1cnJlbnRVc2VyXG4gIGNvbnN0IGNsaWVudCA9IGJ1aWxkQ2xpZW50KGFwcENvbnRleHQuY3R4KTtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBjbGllbnQuZ2V0KCcvYXBpL3VzZXJzL2N1cnJlbnR1c2VyJyk7XG5cbiAgbGV0IHBhZ2VQcm9wcyA9IHt9O1xuICBpZiAoYXBwQ29udGV4dC5Db21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKSB7XG4gICAgcGFnZVByb3BzID0gYXdhaXQgYXBwQ29udGV4dC5Db21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKGFwcENvbnRleHQuY3R4LCBjbGllbnQsIGRhdGEuY3VycmVudFVzZXIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYWdlUHJvcHMsXG4gICAgLi4uZGF0YVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBDb21wb25lbnQ7Il0sIm5hbWVzIjpbIkludGVybmV0TW9kdWxlIiwiYnVpbGRDbGllbnQiLCJIZWFkZXIiLCJBcHBDb21wb25lbnQiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjdXJyZW50VXNlciIsImRpdiIsImdldEluaXRpYWxQcm9wcyIsImFwcENvbnRleHQiLCJjbGllbnQiLCJjdHgiLCJkYXRhIiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@faker-js/faker":
/*!**********************************!*\
  !*** external "@faker-js/faker" ***!
  \**********************************/
/***/ ((module) => {

module.exports = import("@faker-js/faker");;

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/bootstrap"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();
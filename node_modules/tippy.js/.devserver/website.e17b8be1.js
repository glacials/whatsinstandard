// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function(modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire
  var nodeRequire = typeof require === 'function' && require

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire
        if (!jumped && currentRequire) {
          return currentRequire(name, true)
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true)
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name)
        }

        var err = new Error("Cannot find module '" + name + "'")
        err.code = 'MODULE_NOT_FOUND'
        throw err
      }

      localRequire.resolve = resolve

      var module = (cache[name] = new newRequire.Module(name))

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      )
    }

    return cache[name].exports

    function localRequire(x) {
      return newRequire(localRequire.resolve(x))
    }

    function resolve(x) {
      return modules[name][1][x] || x
    }
  }

  function Module(moduleName) {
    this.id = moduleName
    this.bundle = newRequire
    this.exports = {}
  }

  newRequire.isParcelRequire = true
  newRequire.Module = Module
  newRequire.modules = modules
  newRequire.cache = cache
  newRequire.parent = previousRequire
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports
      },
      {}
    ]
  }

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i])
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1])

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports
      })

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports
    }
  }

  // Override the current require with this new one
  return newRequire
})(
  {
    '../node_modules/parcel-bundler/src/builtins/bundle-url.js': [
      function(require, module, exports) {
        var bundleURL = null
        function getBundleURLCached() {
          if (!bundleURL) {
            bundleURL = getBundleURL()
          }

          return bundleURL
        }

        function getBundleURL() {
          // Attempt to find the URL of the current script and use that as the base URL
          try {
            throw new Error()
          } catch (err) {
            var matches = ('' + err.stack).match(
              /(https?|file|ftp):\/\/[^)\n]+/g
            )
            if (matches) {
              return getBaseURL(matches[0])
            }
          }

          return '/'
        }

        function getBaseURL(url) {
          return (
            ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') +
            '/'
          )
        }

        exports.getBundleURL = getBundleURLCached
        exports.getBaseURL = getBaseURL
      },
      {}
    ],
    '../node_modules/parcel-bundler/src/builtins/css-loader.js': [
      function(require, module, exports) {
        var bundle = require('./bundle-url')

        function updateLink(link) {
          var newLink = link.cloneNode()
          newLink.onload = function() {
            link.remove()
          }
          newLink.href = link.href.split('?')[0] + '?' + Date.now()
          link.parentNode.insertBefore(newLink, link.nextSibling)
        }

        var cssTimeout = null
        function reloadCSS() {
          if (cssTimeout) {
            return
          }

          cssTimeout = setTimeout(function() {
            var links = document.querySelectorAll('link[rel="stylesheet"]')
            for (var i = 0; i < links.length; i++) {
              if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
                updateLink(links[i])
              }
            }

            cssTimeout = null
          }, 50)
        }

        module.exports = reloadCSS
      },
      {
        './bundle-url':
          '../node_modules/parcel-bundler/src/builtins/bundle-url.js'
      }
    ],
    '../dist/tippy.css': [
      function(require, module, exports) {
        var reloadCSS = require('_css_loader')
        module.hot.dispose(reloadCSS)
        module.hot.accept(reloadCSS)
      },
      {
        _css_loader: '../node_modules/parcel-bundler/src/builtins/css-loader.js'
      }
    ],
    '../dist/themes/light.css': [
      function(require, module, exports) {
        var reloadCSS = require('_css_loader')
        module.hot.dispose(reloadCSS)
        module.hot.accept(reloadCSS)
      },
      {
        _css_loader: '../node_modules/parcel-bundler/src/builtins/css-loader.js'
      }
    ],
    '../dist/themes/translucent.css': [
      function(require, module, exports) {
        var reloadCSS = require('_css_loader')
        module.hot.dispose(reloadCSS)
        module.hot.accept(reloadCSS)
      },
      {
        _css_loader: '../node_modules/parcel-bundler/src/builtins/css-loader.js'
      }
    ],
    '../node_modules/normalize.css/normalize.css': [
      function(require, module, exports) {
        var reloadCSS = require('_css_loader')
        module.hot.dispose(reloadCSS)
        module.hot.accept(reloadCSS)
      },
      {
        _css_loader: '../node_modules/parcel-bundler/src/builtins/css-loader.js'
      }
    ],
    'css/index.scss': [
      function(require, module, exports) {
        var reloadCSS = require('_css_loader')
        module.hot.dispose(reloadCSS)
        module.hot.accept(reloadCSS)
      },
      {
        _css_loader: '../node_modules/parcel-bundler/src/builtins/css-loader.js'
      }
    ],
    '../node_modules/focus-visible/dist/focus-visible.js': [
      function(require, module, exports) {
        var define
        ;(function(global, factory) {
          typeof exports === 'object' && typeof module !== 'undefined'
            ? factory()
            : typeof define === 'function' && define.amd
              ? define(factory)
              : factory()
        })(this, function() {
          'use strict'

          /**
           * https://github.com/WICG/focus-visible
           */
          function init() {
            var hadKeyboardEvent = true
            var hadFocusVisibleRecently = false
            var hadFocusVisibleRecentlyTimeout = null

            var inputTypesWhitelist = {
              text: true,
              search: true,
              url: true,
              tel: true,
              email: true,
              password: true,
              number: true,
              date: true,
              month: true,
              week: true,
              time: true,
              datetime: true,
              'datetime-local': true
            }

            /**
             * Helper function for legacy browsers and iframes which sometimes focus
             * elements like document, body, and non-interactive SVG.
             * @param {Element} el
             */
            function isValidFocusTarget(el) {
              if (
                el &&
                el !== document &&
                el.nodeName !== 'HTML' &&
                el.nodeName !== 'BODY' &&
                'classList' in el &&
                'contains' in el.classList
              ) {
                return true
              }
              return false
            }

            /**
             * Computes whether the given element should automatically trigger the
             * `focus-visible` class being added, i.e. whether it should always match
             * `:focus-visible` when focused.
             * @param {Element} el
             * @return {boolean}
             */
            function focusTriggersKeyboardModality(el) {
              var type = el.type
              var tagName = el.tagName

              if (
                tagName == 'INPUT' &&
                inputTypesWhitelist[type] &&
                !el.readOnly
              ) {
                return true
              }

              if (tagName == 'TEXTAREA' && !el.readOnly) {
                return true
              }

              if (el.isContentEditable) {
                return true
              }

              return false
            }

            /**
             * Add the `focus-visible` class to the given element if it was not added by
             * the author.
             * @param {Element} el
             */
            function addFocusVisibleClass(el) {
              if (el.classList.contains('focus-visible')) {
                return
              }
              el.classList.add('focus-visible')
              el.setAttribute('data-focus-visible-added', '')
            }

            /**
             * Remove the `focus-visible` class from the given element if it was not
             * originally added by the author.
             * @param {Element} el
             */
            function removeFocusVisibleClass(el) {
              if (!el.hasAttribute('data-focus-visible-added')) {
                return
              }
              el.classList.remove('focus-visible')
              el.removeAttribute('data-focus-visible-added')
            }

            /**
             * Treat `keydown` as a signal that the user is in keyboard modality.
             * Apply `focus-visible` to any current active element and keep track
             * of our keyboard modality state with `hadKeyboardEvent`.
             * @param {Event} e
             */
            function onKeyDown(e) {
              if (isValidFocusTarget(document.activeElement)) {
                addFocusVisibleClass(document.activeElement)
              }

              hadKeyboardEvent = true
            }

            /**
             * If at any point a user clicks with a pointing device, ensure that we change
             * the modality away from keyboard.
             * This avoids the situation where a user presses a key on an already focused
             * element, and then clicks on a different element, focusing it with a
             * pointing device, while we still think we're in keyboard modality.
             * @param {Event} e
             */
            function onPointerDown(e) {
              hadKeyboardEvent = false
            }

            /**
             * On `focus`, add the `focus-visible` class to the target if:
             * - the target received focus as a result of keyboard navigation, or
             * - the event target is an element that will likely require interaction
             *   via the keyboard (e.g. a text box)
             * @param {Event} e
             */
            function onFocus(e) {
              // Prevent IE from focusing the document or HTML element.
              if (!isValidFocusTarget(e.target)) {
                return
              }

              if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
                addFocusVisibleClass(e.target)
              }
            }

            /**
             * On `blur`, remove the `focus-visible` class from the target.
             * @param {Event} e
             */
            function onBlur(e) {
              if (!isValidFocusTarget(e.target)) {
                return
              }

              if (
                e.target.classList.contains('focus-visible') ||
                e.target.hasAttribute('data-focus-visible-added')
              ) {
                // To detect a tab/window switch, we look for a blur event followed
                // rapidly by a visibility change.
                // If we don't see a visibility change within 100ms, it's probably a
                // regular focus change.
                hadFocusVisibleRecently = true
                window.clearTimeout(hadFocusVisibleRecentlyTimeout)
                hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
                  hadFocusVisibleRecently = false
                  window.clearTimeout(hadFocusVisibleRecentlyTimeout)
                }, 100)
                removeFocusVisibleClass(e.target)
              }
            }

            /**
             * If the user changes tabs, keep track of whether or not the previously
             * focused element had .focus-visible.
             * @param {Event} e
             */
            function onVisibilityChange(e) {
              if (document.visibilityState == 'hidden') {
                // If the tab becomes active again, the browser will handle calling focus
                // on the element (Safari actually calls it twice).
                // If this tab change caused a blur on an element with focus-visible,
                // re-apply the class when the user switches back to the tab.
                if (hadFocusVisibleRecently) {
                  hadKeyboardEvent = true
                }
                addInitialPointerMoveListeners()
              }
            }

            /**
             * Add a group of listeners to detect usage of any pointing devices.
             * These listeners will be added when the polyfill first loads, and anytime
             * the window is blurred, so that they are active when the window regains
             * focus.
             */
            function addInitialPointerMoveListeners() {
              document.addEventListener('mousemove', onInitialPointerMove)
              document.addEventListener('mousedown', onInitialPointerMove)
              document.addEventListener('mouseup', onInitialPointerMove)
              document.addEventListener('pointermove', onInitialPointerMove)
              document.addEventListener('pointerdown', onInitialPointerMove)
              document.addEventListener('pointerup', onInitialPointerMove)
              document.addEventListener('touchmove', onInitialPointerMove)
              document.addEventListener('touchstart', onInitialPointerMove)
              document.addEventListener('touchend', onInitialPointerMove)
            }

            function removeInitialPointerMoveListeners() {
              document.removeEventListener('mousemove', onInitialPointerMove)
              document.removeEventListener('mousedown', onInitialPointerMove)
              document.removeEventListener('mouseup', onInitialPointerMove)
              document.removeEventListener('pointermove', onInitialPointerMove)
              document.removeEventListener('pointerdown', onInitialPointerMove)
              document.removeEventListener('pointerup', onInitialPointerMove)
              document.removeEventListener('touchmove', onInitialPointerMove)
              document.removeEventListener('touchstart', onInitialPointerMove)
              document.removeEventListener('touchend', onInitialPointerMove)
            }

            /**
             * When the polfyill first loads, assume the user is in keyboard modality.
             * If any event is received from a pointing device (e.g. mouse, pointer,
             * touch), turn off keyboard modality.
             * This accounts for situations where focus enters the page from the URL bar.
             * @param {Event} e
             */
            function onInitialPointerMove(e) {
              // Work around a Safari quirk that fires a mousemove on <html> whenever the
              // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
              if (e.target.nodeName.toLowerCase() === 'html') {
                return
              }

              hadKeyboardEvent = false
              removeInitialPointerMoveListeners()
            }

            document.addEventListener('keydown', onKeyDown, true)
            document.addEventListener('mousedown', onPointerDown, true)
            document.addEventListener('pointerdown', onPointerDown, true)
            document.addEventListener('touchstart', onPointerDown, true)
            document.addEventListener('focus', onFocus, true)
            document.addEventListener('blur', onBlur, true)
            document.addEventListener(
              'visibilitychange',
              onVisibilityChange,
              true
            )
            addInitialPointerMoveListeners()

            document.body.classList.add('js-focus-visible')
          }

          /**
           * Subscription when the DOM is ready
           * @param {Function} callback
           */
          function onDOMReady(callback) {
            var loaded

            /**
             * Callback wrapper for check loaded state
             */
            function load() {
              if (!loaded) {
                loaded = true

                callback()
              }
            }

            if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
              callback()
            } else {
              loaded = false
              document.addEventListener('DOMContentLoaded', load, false)
              window.addEventListener('load', load, false)
            }
          }

          if (typeof document !== 'undefined') {
            onDOMReady(init)
          }
        })
      },
      {}
    ],
    '../node_modules/hyperapp/src/index.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.h = h
        exports.app = app
        function h(name, attributes) {
          var rest = []
          var children = []
          var length = arguments.length

          while (length-- > 2) rest.push(arguments[length])

          while (rest.length) {
            var node = rest.pop()
            if (node && node.pop) {
              for (length = node.length; length--; ) {
                rest.push(node[length])
              }
            } else if (node != null && node !== true && node !== false) {
              children.push(node)
            }
          }

          return typeof name === 'function'
            ? name(attributes || {}, children)
            : {
                nodeName: name,
                attributes: attributes || {},
                children: children,
                key: attributes && attributes.key
              }
        }

        function app(state, actions, view, container) {
          var map = [].map
          var rootElement = (container && container.children[0]) || null
          var oldNode = rootElement && recycleElement(rootElement)
          var lifecycle = []
          var skipRender
          var isRecycling = true
          var globalState = clone(state)
          var wiredActions = wireStateToActions([], globalState, clone(actions))

          scheduleRender()

          return wiredActions

          function recycleElement(element) {
            return {
              nodeName: element.nodeName.toLowerCase(),
              attributes: {},
              children: map.call(element.childNodes, function(element) {
                return element.nodeType === 3 // Node.TEXT_NODE
                  ? element.nodeValue
                  : recycleElement(element)
              })
            }
          }

          function resolveNode(node) {
            return typeof node === 'function'
              ? resolveNode(node(globalState, wiredActions))
              : node != null
                ? node
                : ''
          }

          function render() {
            skipRender = !skipRender

            var node = resolveNode(view)

            if (container && !skipRender) {
              rootElement = patch(
                container,
                rootElement,
                oldNode,
                (oldNode = node)
              )
            }

            isRecycling = false

            while (lifecycle.length) lifecycle.pop()()
          }

          function scheduleRender() {
            if (!skipRender) {
              skipRender = true
              setTimeout(render)
            }
          }

          function clone(target, source) {
            var out = {}

            for (var i in target) out[i] = target[i]
            for (var i in source) out[i] = source[i]

            return out
          }

          function setPartialState(path, value, source) {
            var target = {}
            if (path.length) {
              target[path[0]] =
                path.length > 1
                  ? setPartialState(path.slice(1), value, source[path[0]])
                  : value
              return clone(source, target)
            }
            return value
          }

          function getPartialState(path, source) {
            var i = 0
            while (i < path.length) {
              source = source[path[i++]]
            }
            return source
          }

          function wireStateToActions(path, state, actions) {
            for (var key in actions) {
              typeof actions[key] === 'function'
                ? (function(key, action) {
                    actions[key] = function(data) {
                      var result = action(data)

                      if (typeof result === 'function') {
                        result = result(
                          getPartialState(path, globalState),
                          actions
                        )
                      }

                      if (
                        result &&
                        result !==
                          (state = getPartialState(path, globalState)) &&
                        !result.then // !isPromise
                      ) {
                        scheduleRender(
                          (globalState = setPartialState(
                            path,
                            clone(state, result),
                            globalState
                          ))
                        )
                      }

                      return result
                    }
                  })(key, actions[key])
                : wireStateToActions(
                    path.concat(key),
                    (state[key] = clone(state[key])),
                    (actions[key] = clone(actions[key]))
                  )
            }

            return actions
          }

          function getKey(node) {
            return node ? node.key : null
          }

          function eventListener(event) {
            return event.currentTarget.events[event.type](event)
          }

          function updateAttribute(element, name, value, oldValue, isSvg) {
            if (name === 'key') {
            } else if (name === 'style') {
              for (var i in clone(oldValue, value)) {
                var style = value == null || value[i] == null ? '' : value[i]
                if (i[0] === '-') {
                  element[name].setProperty(i, style)
                } else {
                  element[name][i] = style
                }
              }
            } else {
              if (name[0] === 'o' && name[1] === 'n') {
                name = name.slice(2)

                if (element.events) {
                  if (!oldValue) oldValue = element.events[name]
                } else {
                  element.events = {}
                }

                element.events[name] = value

                if (value) {
                  if (!oldValue) {
                    element.addEventListener(name, eventListener)
                  }
                } else {
                  element.removeEventListener(name, eventListener)
                }
              } else if (
                name in element &&
                name !== 'list' &&
                name !== 'type' &&
                name !== 'draggable' &&
                name !== 'spellcheck' &&
                name !== 'translate' &&
                !isSvg
              ) {
                element[name] = value == null ? '' : value
              } else if (value != null && value !== false) {
                element.setAttribute(name, value)
              }

              if (value == null || value === false) {
                element.removeAttribute(name)
              }
            }
          }

          function createElement(node, isSvg) {
            var element =
              typeof node === 'string' || typeof node === 'number'
                ? document.createTextNode(node)
                : (isSvg = isSvg || node.nodeName === 'svg')
                  ? document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      node.nodeName
                    )
                  : document.createElement(node.nodeName)

            var attributes = node.attributes
            if (attributes) {
              if (attributes.oncreate) {
                lifecycle.push(function() {
                  attributes.oncreate(element)
                })
              }

              for (var i = 0; i < node.children.length; i++) {
                element.appendChild(
                  createElement(
                    (node.children[i] = resolveNode(node.children[i])),
                    isSvg
                  )
                )
              }

              for (var name in attributes) {
                updateAttribute(element, name, attributes[name], null, isSvg)
              }
            }

            return element
          }

          function updateElement(element, oldAttributes, attributes, isSvg) {
            for (var name in clone(oldAttributes, attributes)) {
              if (
                attributes[name] !==
                (name === 'value' || name === 'checked'
                  ? element[name]
                  : oldAttributes[name])
              ) {
                updateAttribute(
                  element,
                  name,
                  attributes[name],
                  oldAttributes[name],
                  isSvg
                )
              }
            }

            var cb = isRecycling ? attributes.oncreate : attributes.onupdate
            if (cb) {
              lifecycle.push(function() {
                cb(element, oldAttributes)
              })
            }
          }

          function removeChildren(element, node) {
            var attributes = node.attributes
            if (attributes) {
              for (var i = 0; i < node.children.length; i++) {
                removeChildren(element.childNodes[i], node.children[i])
              }

              if (attributes.ondestroy) {
                attributes.ondestroy(element)
              }
            }
            return element
          }

          function removeElement(parent, element, node) {
            function done() {
              parent.removeChild(removeChildren(element, node))
            }

            var cb = node.attributes && node.attributes.onremove
            if (cb) {
              cb(element, done)
            } else {
              done()
            }
          }

          function patch(parent, element, oldNode, node, isSvg) {
            if (node === oldNode) {
            } else if (oldNode == null || oldNode.nodeName !== node.nodeName) {
              var newElement = createElement(node, isSvg)
              parent.insertBefore(newElement, element)

              if (oldNode != null) {
                removeElement(parent, element, oldNode)
              }

              element = newElement
            } else if (oldNode.nodeName == null) {
              element.nodeValue = node
            } else {
              updateElement(
                element,
                oldNode.attributes,
                node.attributes,
                (isSvg = isSvg || node.nodeName === 'svg')
              )

              var oldKeyed = {}
              var newKeyed = {}
              var oldElements = []
              var oldChildren = oldNode.children
              var children = node.children

              for (var i = 0; i < oldChildren.length; i++) {
                oldElements[i] = element.childNodes[i]

                var oldKey = getKey(oldChildren[i])
                if (oldKey != null) {
                  oldKeyed[oldKey] = [oldElements[i], oldChildren[i]]
                }
              }

              var i = 0
              var k = 0

              while (k < children.length) {
                var oldKey = getKey(oldChildren[i])
                var newKey = getKey((children[k] = resolveNode(children[k])))

                if (newKeyed[oldKey]) {
                  i++
                  continue
                }

                if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
                  if (oldKey == null) {
                    removeElement(element, oldElements[i], oldChildren[i])
                  }
                  i++
                  continue
                }

                if (newKey == null || isRecycling) {
                  if (oldKey == null) {
                    patch(
                      element,
                      oldElements[i],
                      oldChildren[i],
                      children[k],
                      isSvg
                    )
                    k++
                  }
                  i++
                } else {
                  var keyedNode = oldKeyed[newKey] || []

                  if (oldKey === newKey) {
                    patch(
                      element,
                      keyedNode[0],
                      keyedNode[1],
                      children[k],
                      isSvg
                    )
                    i++
                  } else if (keyedNode[0]) {
                    patch(
                      element,
                      element.insertBefore(keyedNode[0], oldElements[i]),
                      keyedNode[1],
                      children[k],
                      isSvg
                    )
                  } else {
                    patch(element, oldElements[i], null, children[k], isSvg)
                  }

                  newKeyed[newKey] = children[k]
                  k++
                }
              }

              while (i < oldChildren.length) {
                if (getKey(oldChildren[i]) == null) {
                  removeElement(element, oldElements[i], oldChildren[i])
                }
                i++
              }

              for (var i in oldKeyed) {
                if (!newKeyed[i]) {
                  removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
                }
              }
            }
            return element
          }
        }
      },
      {}
    ],
    '../node_modules/@hyperapp/render/browser/module.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        /*! Hyperapp Render | MIT Licence | https://github.com/hyperapp/render */

        var styleNameCache = new Map()
        var uppercasePattern = /([A-Z])/g
        var msPattern = /^ms-/
        var voidElements = new Set([
          'area',
          'base',
          'br',
          'col',
          'embed',
          'hr',
          'img',
          'input',
          'link',
          'meta',
          'param',
          'source',
          'track',
          'wbr'
        ])
        var ignoreAttributes = new Set(['key', 'innerHTML', '__source'])
        var escapeRegExp = /["&'<>]/g
        var escapeLookup = new Map([
          ['"', '&quot;'],
          ['&', '&amp;'],
          ["'", '&#39;'],
          ['<', '&lt;'],
          ['>', '&gt;']
        ])

        function escaper(match) {
          return escapeLookup.get(match)
        }

        function escapeHtml(value) {
          if (typeof value === 'number') {
            return '' + value
          }

          return ('' + value).replace(escapeRegExp, escaper)
        }

        function hyphenateStyleName(styleName) {
          return (
            styleNameCache.get(styleName) ||
            styleNameCache
              .set(
                styleName,
                styleName
                  .replace(uppercasePattern, '-$&')
                  .toLowerCase()
                  .replace(msPattern, '-ms-')
              )
              .get(styleName)
          )
        }

        function stringifyStyles(styles) {
          var out = ''
          var delimiter = ''
          var styleNames = Object.keys(styles)

          for (var i = 0; i < styleNames.length; i++) {
            var styleName = styleNames[i]
            var styleValue = styles[styleName]

            if (styleValue != null) {
              if (styleName === 'cssText') {
                out += delimiter + styleValue
              } else {
                out +=
                  delimiter + hyphenateStyleName(styleName) + ':' + styleValue
              }

              delimiter = ';'
            }
          }

          return out || null
        }

        function renderFragment(_ref, stack) {
          var nodeName = _ref.nodeName,
            attributes = _ref.attributes,
            children = _ref.children
          var out = ''
          var footer = ''

          if (nodeName) {
            out += '<' + nodeName
            var keys = Object.keys(attributes)

            for (var i = 0; i < keys.length; i++) {
              var name = keys[i]
              var value = attributes[name]

              if (name === 'style' && value && typeof value === 'object') {
                value = stringifyStyles(value)
              }

              if (
                value != null &&
                value !== false &&
                typeof value !== 'function' &&
                !ignoreAttributes.has(name)
              ) {
                out += ' ' + name

                if (value !== true) {
                  out += '="' + escapeHtml(value) + '"'
                }
              }
            }

            if (voidElements.has(nodeName)) {
              out += '/>'
            } else {
              out += '>'
              footer = '</' + nodeName + '>'
            }
          }

          var innerHTML = attributes.innerHTML

          if (innerHTML != null) {
            out += innerHTML
          }

          if (children.length > 0) {
            stack.push({
              childIndex: 0,
              children: children,
              footer: footer
            })
          } else {
            out += footer
          }

          return out
        }

        function resolveNode(node, state, actions) {
          if (typeof node === 'function') {
            return resolveNode(node(state, actions), state, actions)
          }

          return node
        }

        function renderer(view, state, actions) {
          var stack = [
            {
              childIndex: 0,
              children: [view],
              footer: ''
            }
          ]
          var end = false
          return function(bytes) {
            if (end) {
              return null
            }

            var out = ''

            while (out.length < bytes) {
              if (stack.length === 0) {
                end = true
                break
              }

              var frame = stack[stack.length - 1]

              if (frame.childIndex >= frame.children.length) {
                out += frame.footer
                stack.pop()
              } else {
                var node = resolveNode(
                  frame.children[frame.childIndex++],
                  state,
                  actions
                )

                if (node != null && typeof node !== 'boolean') {
                  if (node.pop) {
                    stack.push({
                      childIndex: 0,
                      children: node,
                      footer: ''
                    })
                  } else if (node.attributes) {
                    out += renderFragment(node, stack)
                  } else {
                    out += escapeHtml(node)
                  }
                }
              }
            }

            return out
          }
        }
        function renderToString(view, state, actions) {
          return renderer(view, state, actions)(Infinity)
        }

        function withRender(nextApp) {
          return function(initialState, actionsTemplate, view, container) {
            var actions = nextApp(
              initialState,
              Object.assign({}, actionsTemplate, {
                getState: function getState() {
                  return function(state) {
                    return state
                  }
                }
              }),
              view,
              container
            )

            actions.toString = function() {
              return renderToString(view, actions.getState(), actions)
            }

            return actions
          }
        }

        exports.renderToString = renderToString
        exports.withRender = withRender
        //# sourceMappingURL=module.js.map
      },
      {}
    ],
    '../node_modules/animejs/anime.min.js': [
      function(require, module, exports) {
        var global = arguments[3]
        var define
        /*
 2017 Julian Garnier
 Released under the MIT license
*/
        var $jscomp = { scope: {} }
        $jscomp.defineProperty =
          'function' == typeof Object.defineProperties
            ? Object.defineProperty
            : function(e, r, p) {
                if (p.get || p.set)
                  throw new TypeError(
                    'ES3 does not support getters and setters.'
                  )
                e != Array.prototype &&
                  e != Object.prototype &&
                  (e[r] = p.value)
              }
        $jscomp.getGlobal = function(e) {
          return 'undefined' != typeof window && window === e
            ? e
            : 'undefined' != typeof global && null != global
              ? global
              : e
        }
        $jscomp.global = $jscomp.getGlobal(this)
        $jscomp.SYMBOL_PREFIX = 'jscomp_symbol_'
        $jscomp.initSymbol = function() {
          $jscomp.initSymbol = function() {}
          $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
        }
        $jscomp.symbolCounter_ = 0
        $jscomp.Symbol = function(e) {
          return $jscomp.SYMBOL_PREFIX + (e || '') + $jscomp.symbolCounter_++
        }
        $jscomp.initSymbolIterator = function() {
          $jscomp.initSymbol()
          var e = $jscomp.global.Symbol.iterator
          e ||
            (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol(
              'iterator'
            ))
          'function' != typeof Array.prototype[e] &&
            $jscomp.defineProperty(Array.prototype, e, {
              configurable: !0,
              writable: !0,
              value: function() {
                return $jscomp.arrayIterator(this)
              }
            })
          $jscomp.initSymbolIterator = function() {}
        }
        $jscomp.arrayIterator = function(e) {
          var r = 0
          return $jscomp.iteratorPrototype(function() {
            return r < e.length ? { done: !1, value: e[r++] } : { done: !0 }
          })
        }
        $jscomp.iteratorPrototype = function(e) {
          $jscomp.initSymbolIterator()
          e = { next: e }
          e[$jscomp.global.Symbol.iterator] = function() {
            return this
          }
          return e
        }
        $jscomp.array = $jscomp.array || {}
        $jscomp.iteratorFromArray = function(e, r) {
          $jscomp.initSymbolIterator()
          e instanceof String && (e += '')
          var p = 0,
            m = {
              next: function() {
                if (p < e.length) {
                  var u = p++
                  return { value: r(u, e[u]), done: !1 }
                }
                m.next = function() {
                  return { done: !0, value: void 0 }
                }
                return m.next()
              }
            }
          m[Symbol.iterator] = function() {
            return m
          }
          return m
        }
        $jscomp.polyfill = function(e, r, p, m) {
          if (r) {
            p = $jscomp.global
            e = e.split('.')
            for (m = 0; m < e.length - 1; m++) {
              var u = e[m]
              u in p || (p[u] = {})
              p = p[u]
            }
            e = e[e.length - 1]
            m = p[e]
            r = r(m)
            r != m &&
              null != r &&
              $jscomp.defineProperty(p, e, {
                configurable: !0,
                writable: !0,
                value: r
              })
          }
        }
        $jscomp.polyfill(
          'Array.prototype.keys',
          function(e) {
            return e
              ? e
              : function() {
                  return $jscomp.iteratorFromArray(this, function(e) {
                    return e
                  })
                }
          },
          'es6-impl',
          'es3'
        )
        var $jscomp$this = this
        ;(function(e, r) {
          'function' === typeof define && define.amd
            ? define([], r)
            : 'object' === typeof module && module.exports
              ? (module.exports = r())
              : (e.anime = r())
        })(this, function() {
          function e(a) {
            if (!h.col(a))
              try {
                return document.querySelectorAll(a)
              } catch (c) {}
          }
          function r(a, c) {
            for (
              var d = a.length,
                b = 2 <= arguments.length ? arguments[1] : void 0,
                f = [],
                n = 0;
              n < d;
              n++
            )
              if (n in a) {
                var k = a[n]
                c.call(b, k, n, a) && f.push(k)
              }
            return f
          }
          function p(a) {
            return a.reduce(function(a, d) {
              return a.concat(h.arr(d) ? p(d) : d)
            }, [])
          }
          function m(a) {
            if (h.arr(a)) return a
            h.str(a) && (a = e(a) || a)
            return a instanceof NodeList || a instanceof HTMLCollection
              ? [].slice.call(a)
              : [a]
          }
          function u(a, c) {
            return a.some(function(a) {
              return a === c
            })
          }
          function C(a) {
            var c = {},
              d
            for (d in a) c[d] = a[d]
            return c
          }
          function D(a, c) {
            var d = C(a),
              b
            for (b in a) d[b] = c.hasOwnProperty(b) ? c[b] : a[b]
            return d
          }
          function z(a, c) {
            var d = C(a),
              b
            for (b in c) d[b] = h.und(a[b]) ? c[b] : a[b]
            return d
          }
          function T(a) {
            a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(
              a,
              c,
              d,
              k
            ) {
              return c + c + d + d + k + k
            })
            var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)
            a = parseInt(c[1], 16)
            var d = parseInt(c[2], 16),
              c = parseInt(c[3], 16)
            return 'rgba(' + a + ',' + d + ',' + c + ',1)'
          }
          function U(a) {
            function c(a, c, b) {
              0 > b && (b += 1)
              1 < b && --b
              return b < 1 / 6
                ? a + 6 * (c - a) * b
                : 0.5 > b
                  ? c
                  : b < 2 / 3
                    ? a + (c - a) * (2 / 3 - b) * 6
                    : a
            }
            var d =
              /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) ||
              /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a)
            a = parseInt(d[1]) / 360
            var b = parseInt(d[2]) / 100,
              f = parseInt(d[3]) / 100,
              d = d[4] || 1
            if (0 == b) f = b = a = f
            else {
              var n = 0.5 > f ? f * (1 + b) : f + b - f * b,
                k = 2 * f - n,
                f = c(k, n, a + 1 / 3),
                b = c(k, n, a)
              a = c(k, n, a - 1 / 3)
            }
            return (
              'rgba(' + 255 * f + ',' + 255 * b + ',' + 255 * a + ',' + d + ')'
            )
          }
          function y(a) {
            if (
              (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
                a
              ))
            )
              return a[2]
          }
          function V(a) {
            if (-1 < a.indexOf('translate') || 'perspective' === a) return 'px'
            if (-1 < a.indexOf('rotate') || -1 < a.indexOf('skew')) return 'deg'
          }
          function I(a, c) {
            return h.fnc(a) ? a(c.target, c.id, c.total) : a
          }
          function E(a, c) {
            if (c in a.style)
              return (
                getComputedStyle(a).getPropertyValue(
                  c.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
                ) || '0'
              )
          }
          function J(a, c) {
            if (h.dom(a) && u(W, c)) return 'transform'
            if (h.dom(a) && (a.getAttribute(c) || (h.svg(a) && a[c])))
              return 'attribute'
            if (h.dom(a) && 'transform' !== c && E(a, c)) return 'css'
            if (null != a[c]) return 'object'
          }
          function X(a, c) {
            var d = V(c),
              d = -1 < c.indexOf('scale') ? 1 : 0 + d
            a = a.style.transform
            if (!a) return d
            for (
              var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g;
              (b = k.exec(a));

            )
              f.push(b[1]), n.push(b[2])
            a = r(n, function(a, b) {
              return f[b] === c
            })
            return a.length ? a[0] : d
          }
          function K(a, c) {
            switch (J(a, c)) {
              case 'transform':
                return X(a, c)
              case 'css':
                return E(a, c)
              case 'attribute':
                return a.getAttribute(c)
            }
            return a[c] || 0
          }
          function L(a, c) {
            var d = /^(\*=|\+=|-=)/.exec(a)
            if (!d) return a
            var b = y(a) || 0
            c = parseFloat(c)
            a = parseFloat(a.replace(d[0], ''))
            switch (d[0][0]) {
              case '+':
                return c + a + b
              case '-':
                return c - a + b
              case '*':
                return c * a + b
            }
          }
          function F(a, c) {
            return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2))
          }
          function M(a) {
            a = a.points
            for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
              var f = a.getItem(b)
              0 < b && (c += F(d, f))
              d = f
            }
            return c
          }
          function N(a) {
            if (a.getTotalLength) return a.getTotalLength()
            switch (a.tagName.toLowerCase()) {
              case 'circle':
                return 2 * Math.PI * a.getAttribute('r')
              case 'rect':
                return (
                  2 * a.getAttribute('width') + 2 * a.getAttribute('height')
                )
              case 'line':
                return F(
                  { x: a.getAttribute('x1'), y: a.getAttribute('y1') },
                  { x: a.getAttribute('x2'), y: a.getAttribute('y2') }
                )
              case 'polyline':
                return M(a)
              case 'polygon':
                var c = a.points
                return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0))
            }
          }
          function Y(a, c) {
            function d(b) {
              b = void 0 === b ? 0 : b
              return a.el.getPointAtLength(1 <= c + b ? c + b : 0)
            }
            var b = d(),
              f = d(-1),
              n = d(1)
            switch (a.property) {
              case 'x':
                return b.x
              case 'y':
                return b.y
              case 'angle':
                return (180 * Math.atan2(n.y - f.y, n.x - f.x)) / Math.PI
            }
          }
          function O(a, c) {
            var d = /-?\d*\.?\d+/g,
              b
            b = h.pth(a) ? a.totalLength : a
            if (h.col(b))
              if (h.rgb(b)) {
                var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b)
                b = f ? 'rgba(' + f[1] + ',1)' : b
              } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0
            else
              (f = (f = y(b)) ? b.substr(0, b.length - f.length) : b),
                (b = c && !/\s/g.test(b) ? f + c : f)
            b += ''
            return {
              original: b,
              numbers: b.match(d) ? b.match(d).map(Number) : [0],
              strings: h.str(a) || c ? b.split(d) : []
            }
          }
          function P(a) {
            a = a ? p(h.arr(a) ? a.map(m) : m(a)) : []
            return r(a, function(a, d, b) {
              return b.indexOf(a) === d
            })
          }
          function Z(a) {
            var c = P(a)
            return c.map(function(a, b) {
              return { target: a, id: b, total: c.length }
            })
          }
          function aa(a, c) {
            var d = C(c)
            if (h.arr(a)) {
              var b = a.length
              2 !== b || h.obj(a[0])
                ? h.fnc(c.duration) || (d.duration = c.duration / b)
                : (a = { value: a })
            }
            return m(a)
              .map(function(a, b) {
                b = b ? 0 : c.delay
                a = h.obj(a) && !h.pth(a) ? a : { value: a }
                h.und(a.delay) && (a.delay = b)
                return a
              })
              .map(function(a) {
                return z(a, d)
              })
          }
          function ba(a, c) {
            var d = {},
              b
            for (b in a) {
              var f = I(a[b], c)
              h.arr(f) &&
                ((f = f.map(function(a) {
                  return I(a, c)
                })),
                1 === f.length && (f = f[0]))
              d[b] = f
            }
            d.duration = parseFloat(d.duration)
            d.delay = parseFloat(d.delay)
            return d
          }
          function ca(a) {
            return h.arr(a) ? A.apply(this, a) : Q[a]
          }
          function da(a, c) {
            var d
            return a.tweens.map(function(b) {
              b = ba(b, c)
              var f = b.value,
                e = K(c.target, a.name),
                k = d ? d.to.original : e,
                k = h.arr(f) ? f[0] : k,
                w = L(h.arr(f) ? f[1] : f, k),
                e = y(w) || y(k) || y(e)
              b.from = O(k, e)
              b.to = O(w, e)
              b.start = d ? d.end : a.offset
              b.end = b.start + b.delay + b.duration
              b.easing = ca(b.easing)
              b.elasticity =
                (1e3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1e3
              b.isPath = h.pth(f)
              b.isColor = h.col(b.from.original)
              b.isColor && (b.round = 1)
              return (d = b)
            })
          }
          function ea(a, c) {
            return r(
              p(
                a.map(function(a) {
                  return c.map(function(b) {
                    var c = J(a.target, b.name)
                    if (c) {
                      var d = da(b, a)
                      b = {
                        type: c,
                        property: b.name,
                        animatable: a,
                        tweens: d,
                        duration: d[d.length - 1].end,
                        delay: d[0].delay
                      }
                    } else b = void 0
                    return b
                  })
                })
              ),
              function(a) {
                return !h.und(a)
              }
            )
          }
          function R(a, c, d, b) {
            var f = 'delay' === a
            return c.length
              ? (f ? Math.min : Math.max).apply(
                  Math,
                  c.map(function(b) {
                    return b[a]
                  })
                )
              : f
                ? b.delay
                : d.offset + b.delay + b.duration
          }
          function fa(a) {
            var c = D(ga, a),
              d = D(S, a),
              b = Z(a.targets),
              f = [],
              e = z(c, d),
              k
            for (k in a)
              e.hasOwnProperty(k) ||
                'targets' === k ||
                f.push({ name: k, offset: e.offset, tweens: aa(a[k], d) })
            a = ea(b, f)
            return z(c, {
              children: [],
              animatables: b,
              animations: a,
              duration: R('duration', a, c, d),
              delay: R('delay', a, c, d)
            })
          }
          function q(a) {
            function c() {
              return (
                window.Promise &&
                new Promise(function(a) {
                  return (p = a)
                })
              )
            }
            function d(a) {
              return g.reversed ? g.duration - a : a
            }
            function b(a) {
              for (var b = 0, c = {}, d = g.animations, f = d.length; b < f; ) {
                var e = d[b],
                  k = e.animatable,
                  h = e.tweens,
                  n = h.length - 1,
                  l = h[n]
                n &&
                  (l =
                    r(h, function(b) {
                      return a < b.end
                    })[0] || l)
                for (
                  var h =
                      Math.min(Math.max(a - l.start - l.delay, 0), l.duration) /
                      l.duration,
                    w = isNaN(h) ? 1 : l.easing(h, l.elasticity),
                    h = l.to.strings,
                    p = l.round,
                    n = [],
                    m = void 0,
                    m = l.to.numbers.length,
                    t = 0;
                  t < m;
                  t++
                ) {
                  var x = void 0,
                    x = l.to.numbers[t],
                    q = l.from.numbers[t],
                    x = l.isPath ? Y(l.value, w * x) : q + w * (x - q)
                  p && ((l.isColor && 2 < t) || (x = Math.round(x * p) / p))
                  n.push(x)
                }
                if ((l = h.length))
                  for (m = h[0], w = 0; w < l; w++)
                    (p = h[w + 1]),
                      (t = n[w]),
                      isNaN(t) || (m = p ? m + (t + p) : m + (t + ' '))
                else m = n[0]
                ha[e.type](k.target, e.property, m, c, k.id)
                e.currentValue = m
                b++
              }
              if ((b = Object.keys(c).length))
                for (d = 0; d < b; d++)
                  H ||
                    (H = E(document.body, 'transform')
                      ? 'transform'
                      : '-webkit-transform'),
                    (g.animatables[d].target.style[H] = c[d].join(' '))
              g.currentTime = a
              g.progress = (a / g.duration) * 100
            }
            function f(a) {
              if (g[a]) g[a](g)
            }
            function e() {
              g.remaining && !0 !== g.remaining && g.remaining--
            }
            function k(a) {
              var k = g.duration,
                n = g.offset,
                w = n + g.delay,
                r = g.currentTime,
                x = g.reversed,
                q = d(a)
              if (g.children.length) {
                var u = g.children,
                  v = u.length
                if (q >= g.currentTime) for (var G = 0; G < v; G++) u[G].seek(q)
                else for (; v--; ) u[v].seek(q)
              }
              if (q >= w || !k)
                g.began || ((g.began = !0), f('begin')), f('run')
              if (q > n && q < k) b(q)
              else if (
                (q <= n && 0 !== r && (b(0), x && e()),
                (q >= k && r !== k) || !k)
              )
                b(k), x || e()
              f('update')
              a >= k &&
                (g.remaining
                  ? ((t = h),
                    'alternate' === g.direction && (g.reversed = !g.reversed))
                  : (g.pause(),
                    g.completed ||
                      ((g.completed = !0),
                      f('complete'),
                      'Promise' in window && (p(), (m = c())))),
                (l = 0))
            }
            a = void 0 === a ? {} : a
            var h,
              t,
              l = 0,
              p = null,
              m = c(),
              g = fa(a)
            g.reset = function() {
              var a = g.direction,
                c = g.loop
              g.currentTime = 0
              g.progress = 0
              g.paused = !0
              g.began = !1
              g.completed = !1
              g.reversed = 'reverse' === a
              g.remaining = 'alternate' === a && 1 === c ? 2 : c
              b(0)
              for (a = g.children.length; a--; ) g.children[a].reset()
            }
            g.tick = function(a) {
              h = a
              t || (t = h)
              k((l + h - t) * q.speed)
            }
            g.seek = function(a) {
              k(d(a))
            }
            g.pause = function() {
              var a = v.indexOf(g)
              ;-1 < a && v.splice(a, 1)
              g.paused = !0
            }
            g.play = function() {
              g.paused &&
                ((g.paused = !1),
                (t = 0),
                (l = d(g.currentTime)),
                v.push(g),
                B || ia())
            }
            g.reverse = function() {
              g.reversed = !g.reversed
              t = 0
              l = d(g.currentTime)
            }
            g.restart = function() {
              g.pause()
              g.reset()
              g.play()
            }
            g.finished = m
            g.reset()
            g.autoplay && g.play()
            return g
          }
          var ga = {
              update: void 0,
              begin: void 0,
              run: void 0,
              complete: void 0,
              loop: 1,
              direction: 'normal',
              autoplay: !0,
              offset: 0
            },
            S = {
              duration: 1e3,
              delay: 0,
              easing: 'easeOutElastic',
              elasticity: 500,
              round: 0
            },
            W = 'translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective'.split(
              ' '
            ),
            H,
            h = {
              arr: function(a) {
                return Array.isArray(a)
              },
              obj: function(a) {
                return -1 < Object.prototype.toString.call(a).indexOf('Object')
              },
              pth: function(a) {
                return h.obj(a) && a.hasOwnProperty('totalLength')
              },
              svg: function(a) {
                return a instanceof SVGElement
              },
              dom: function(a) {
                return a.nodeType || h.svg(a)
              },
              str: function(a) {
                return 'string' === typeof a
              },
              fnc: function(a) {
                return 'function' === typeof a
              },
              und: function(a) {
                return 'undefined' === typeof a
              },
              hex: function(a) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
              },
              rgb: function(a) {
                return /^rgb/.test(a)
              },
              hsl: function(a) {
                return /^hsl/.test(a)
              },
              col: function(a) {
                return h.hex(a) || h.rgb(a) || h.hsl(a)
              }
            },
            A = (function() {
              function a(a, d, b) {
                return (
                  (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a
                )
              }
              return function(c, d, b, f) {
                if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
                  var e = new Float32Array(11)
                  if (c !== d || b !== f)
                    for (var k = 0; 11 > k; ++k) e[k] = a(0.1 * k, c, b)
                  return function(k) {
                    if (c === d && b === f) return k
                    if (0 === k) return 0
                    if (1 === k) return 1
                    for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) h += 0.1
                    --l
                    var l = h + ((k - e[l]) / (e[l + 1] - e[l])) * 0.1,
                      n =
                        3 * (1 - 3 * b + 3 * c) * l * l +
                        2 * (3 * b - 6 * c) * l +
                        3 * c
                    if (0.001 <= n) {
                      for (h = 0; 4 > h; ++h) {
                        n =
                          3 * (1 - 3 * b + 3 * c) * l * l +
                          2 * (3 * b - 6 * c) * l +
                          3 * c
                        if (0 === n) break
                        var m = a(l, c, b) - k,
                          l = l - m / n
                      }
                      k = l
                    } else if (0 === n) k = l
                    else {
                      var l = h,
                        h = h + 0.1,
                        g = 0
                      do
                        (m = l + (h - l) / 2),
                          (n = a(m, c, b) - k),
                          0 < n ? (h = m) : (l = m)
                      while (1e-7 < Math.abs(n) && 10 > ++g)
                      k = m
                    }
                    return a(k, d, f)
                  }
                }
              }
            })(),
            Q = (function() {
              function a(a, b) {
                return 0 === a || 1 === a
                  ? a
                  : -Math.pow(2, 10 * (a - 1)) *
                      Math.sin(
                        (2 *
                          (a - 1 - (b / (2 * Math.PI)) * Math.asin(1)) *
                          Math.PI) /
                          b
                      )
              }
              var c = 'Quad Cubic Quart Quint Sine Expo Circ Back Elastic'.split(
                  ' '
                ),
                d = {
                  In: [
                    [0.55, 0.085, 0.68, 0.53],
                    [0.55, 0.055, 0.675, 0.19],
                    [0.895, 0.03, 0.685, 0.22],
                    [0.755, 0.05, 0.855, 0.06],
                    [0.47, 0, 0.745, 0.715],
                    [0.95, 0.05, 0.795, 0.035],
                    [0.6, 0.04, 0.98, 0.335],
                    [0.6, -0.28, 0.735, 0.045],
                    a
                  ],
                  Out: [
                    [0.25, 0.46, 0.45, 0.94],
                    [0.215, 0.61, 0.355, 1],
                    [0.165, 0.84, 0.44, 1],
                    [0.23, 1, 0.32, 1],
                    [0.39, 0.575, 0.565, 1],
                    [0.19, 1, 0.22, 1],
                    [0.075, 0.82, 0.165, 1],
                    [0.175, 0.885, 0.32, 1.275],
                    function(b, c) {
                      return 1 - a(1 - b, c)
                    }
                  ],
                  InOut: [
                    [0.455, 0.03, 0.515, 0.955],
                    [0.645, 0.045, 0.355, 1],
                    [0.77, 0, 0.175, 1],
                    [0.86, 0, 0.07, 1],
                    [0.445, 0.05, 0.55, 0.95],
                    [1, 0, 0, 1],
                    [0.785, 0.135, 0.15, 0.86],
                    [0.68, -0.55, 0.265, 1.55],
                    function(b, c) {
                      return 0.5 > b
                        ? a(2 * b, c) / 2
                        : 1 - a(-2 * b + 2, c) / 2
                    }
                  ]
                },
                b = { linear: A(0.25, 0.25, 0.75, 0.75) },
                f = {},
                e
              for (e in d)
                (f.type = e),
                  d[f.type].forEach(
                    (function(a) {
                      return function(d, f) {
                        b['ease' + a.type + c[f]] = h.fnc(d)
                          ? d
                          : A.apply($jscomp$this, d)
                      }
                    })(f)
                  ),
                  (f = { type: f.type })
              return b
            })(),
            ha = {
              css: function(a, c, d) {
                return (a.style[c] = d)
              },
              attribute: function(a, c, d) {
                return a.setAttribute(c, d)
              },
              object: function(a, c, d) {
                return (a[c] = d)
              },
              transform: function(a, c, d, b, f) {
                b[f] || (b[f] = [])
                b[f].push(c + '(' + d + ')')
              }
            },
            v = [],
            B = 0,
            ia = (function() {
              function a() {
                B = requestAnimationFrame(c)
              }
              function c(c) {
                var b = v.length
                if (b) {
                  for (var d = 0; d < b; ) v[d] && v[d].tick(c), d++
                  a()
                } else cancelAnimationFrame(B), (B = 0)
              }
              return a
            })()
          q.version = '2.2.0'
          q.speed = 1
          q.running = v
          q.remove = function(a) {
            a = P(a)
            for (var c = v.length; c--; )
              for (var d = v[c], b = d.animations, f = b.length; f--; )
                u(a, b[f].animatable.target) &&
                  (b.splice(f, 1), b.length || d.pause())
          }
          q.getValue = K
          q.path = function(a, c) {
            var d = h.str(a) ? e(a)[0] : a,
              b = c || 100
            return function(a) {
              return { el: d, property: a, totalLength: N(d) * (b / 100) }
            }
          }
          q.setDashoffset = function(a) {
            var c = N(a)
            a.setAttribute('stroke-dasharray', c)
            return c
          }
          q.bezier = A
          q.easings = Q
          q.timeline = function(a) {
            var c = q(a)
            c.pause()
            c.duration = 0
            c.add = function(d) {
              c.children.forEach(function(a) {
                a.began = !0
                a.completed = !0
              })
              m(d).forEach(function(b) {
                var d = z(b, D(S, a || {}))
                d.targets = d.targets || a.targets
                b = c.duration
                var e = d.offset
                d.autoplay = !1
                d.direction = c.direction
                d.offset = h.und(e) ? b : L(e, b)
                c.began = !0
                c.completed = !0
                c.seek(d.offset)
                d = q(d)
                d.began = !0
                d.completed = !0
                d.duration > b && (c.duration = d.duration)
                c.children.push(d)
              })
              c.seek(0)
              c.reset()
              c.autoplay && c.restart()
              return c
            }
            return c
          }
          q.random = function(a, c) {
            return Math.floor(Math.random() * (c - a + 1)) + a
          }
          return q
        })
      },
      {}
    ],
    '../node_modules/twemoji/2/esm.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        /*! Copyright Twitter Inc. and other contributors. Licensed under MIT */
        var twemoji = (function() {
          'use strict'
          var twemoji = {
              base: 'https://twemoji.maxcdn.com/2/',
              ext: '.png',
              size: '72x72',
              className: 'emoji',
              convert: {
                fromCodePoint: fromCodePoint,
                toCodePoint: toCodePoint
              },
              onerror: function onerror() {
                if (this.parentNode) {
                  this.parentNode.replaceChild(
                    createText(this.alt, false),
                    this
                  )
                }
              },
              parse: parse,
              replace: replace,
              test: test
            },
            escaper = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&#39;',
              '"': '&quot;'
            },
            re = /(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[\u0023\u002a\u0030-\u0039]\ufe0f?\u20e3|(?:[\u00a9\u00ae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef9]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb4\uddb7\uddc0-\uddc2\uddd0\uddde-\uddff]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
            UFE0Fg = /\uFE0F/g,
            U200D = String.fromCharCode(8205),
            rescaper = /[&<>'"]/g,
            shouldntBeParsed = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
            fromCharCode = String.fromCharCode
          return twemoji
          function createText(text, clean) {
            return document.createTextNode(
              clean ? text.replace(UFE0Fg, '') : text
            )
          }
          function escapeHTML(s) {
            return s.replace(rescaper, replacer)
          }
          function defaultImageSrcGenerator(icon, options) {
            return ''.concat(options.base, options.size, '/', icon, options.ext)
          }
          function grabAllTextNodes(node, allText) {
            var childNodes = node.childNodes,
              length = childNodes.length,
              subnode,
              nodeType
            while (length--) {
              subnode = childNodes[length]
              nodeType = subnode.nodeType
              if (nodeType === 3) {
                allText.push(subnode)
              } else if (
                nodeType === 1 &&
                !('ownerSVGElement' in subnode) &&
                !shouldntBeParsed.test(subnode.nodeName.toLowerCase())
              ) {
                grabAllTextNodes(subnode, allText)
              }
            }
            return allText
          }
          function grabTheRightIcon(rawText) {
            return toCodePoint(
              rawText.indexOf(U200D) < 0 ? rawText.replace(UFE0Fg, '') : rawText
            )
          }
          function parseNode(node, options) {
            var allText = grabAllTextNodes(node, []),
              length = allText.length,
              attrib,
              attrname,
              modified,
              fragment,
              subnode,
              text,
              match,
              i,
              index,
              img,
              rawText,
              iconId,
              src
            while (length--) {
              modified = false
              fragment = document.createDocumentFragment()
              subnode = allText[length]
              text = subnode.nodeValue
              i = 0
              while ((match = re.exec(text))) {
                index = match.index
                if (index !== i) {
                  fragment.appendChild(createText(text.slice(i, index), true))
                }
                rawText = match[0]
                iconId = grabTheRightIcon(rawText)
                i = index + rawText.length
                src = options.callback(iconId, options)
                if (iconId && src) {
                  img = new Image()
                  img.onerror = options.onerror
                  img.setAttribute('draggable', 'false')
                  attrib = options.attributes(rawText, iconId)
                  for (attrname in attrib) {
                    if (
                      attrib.hasOwnProperty(attrname) &&
                      attrname.indexOf('on') !== 0 &&
                      !img.hasAttribute(attrname)
                    ) {
                      img.setAttribute(attrname, attrib[attrname])
                    }
                  }
                  img.className = options.className
                  img.alt = rawText
                  img.src = src
                  modified = true
                  fragment.appendChild(img)
                }
                if (!img) fragment.appendChild(createText(rawText, false))
                img = null
              }
              if (modified) {
                if (i < text.length) {
                  fragment.appendChild(createText(text.slice(i), true))
                }
                subnode.parentNode.replaceChild(fragment, subnode)
              }
            }
            return node
          }
          function parseString(str, options) {
            return replace(str, function(rawText) {
              var ret = rawText,
                iconId = grabTheRightIcon(rawText),
                src = options.callback(iconId, options),
                attrib,
                attrname
              if (iconId && src) {
                ret = '<img '.concat(
                  'class="',
                  options.className,
                  '" ',
                  'draggable="false" ',
                  'alt="',
                  rawText,
                  '"',
                  ' src="',
                  src,
                  '"'
                )
                attrib = options.attributes(rawText, iconId)
                for (attrname in attrib) {
                  if (
                    attrib.hasOwnProperty(attrname) &&
                    attrname.indexOf('on') !== 0 &&
                    ret.indexOf(' ' + attrname + '=') === -1
                  ) {
                    ret = ret.concat(
                      ' ',
                      attrname,
                      '="',
                      escapeHTML(attrib[attrname]),
                      '"'
                    )
                  }
                }
                ret = ret.concat('/>')
              }
              return ret
            })
          }
          function replacer(m) {
            return escaper[m]
          }
          function returnNull() {
            return null
          }
          function toSizeSquaredAsset(value) {
            return typeof value === 'number' ? value + 'x' + value : value
          }
          function fromCodePoint(codepoint) {
            var code =
              typeof codepoint === 'string'
                ? parseInt(codepoint, 16)
                : codepoint
            if (code < 65536) {
              return fromCharCode(code)
            }
            code -= 65536
            return fromCharCode(55296 + (code >> 10), 56320 + (code & 1023))
          }
          function parse(what, how) {
            if (!how || typeof how === 'function') {
              how = { callback: how }
            }
            return (typeof what === 'string' ? parseString : parseNode)(what, {
              callback: how.callback || defaultImageSrcGenerator,
              attributes:
                typeof how.attributes === 'function'
                  ? how.attributes
                  : returnNull,
              base: typeof how.base === 'string' ? how.base : twemoji.base,
              ext: how.ext || twemoji.ext,
              size: how.folder || toSizeSquaredAsset(how.size || twemoji.size),
              className: how.className || twemoji.className,
              onerror: how.onerror || twemoji.onerror
            })
          }
          function replace(text, callback) {
            return String(text).replace(re, callback)
          }
          function test(text) {
            re.lastIndex = 0
            var result = re.test(text)
            re.lastIndex = 0
            return result
          }
          function toCodePoint(unicodeSurrogates, sep) {
            var r = [],
              c = 0,
              p = 0,
              i = 0
            while (i < unicodeSurrogates.length) {
              c = unicodeSurrogates.charCodeAt(i++)
              if (p) {
                r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16))
                p = 0
              } else if (55296 <= c && c <= 56319) {
                p = c
              } else {
                r.push(c.toString(16))
              }
            }
            return r.join(sep || '-')
          }
        })()
        exports.default = twemoji
      },
      {}
    ],
    'js/utils.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.animateItems = exports.animateVersion = exports.animateLogo = exports.toKebabCase = exports.getEmojiSrc = exports.snippet = exports.prerender = exports.DIR = exports.isBrowser = undefined

        var _animejs = require('animejs')

        var _animejs2 = _interopRequireDefault(_animejs)

        var _twemoji = require('twemoji')

        var _twemoji2 = _interopRequireDefault(_twemoji)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var isBrowser = (exports.isBrowser = typeof window !== 'undefined')

        var DIR = (exports.DIR = './website/snippets/')

        var prerender = (exports.prerender = function prerender(main, tag) {
          var output = './docs/index.html'
          if (!isBrowser && typeof __prerenderRequire !== 'undefined') {
            var fs = __prerenderRequire('fs')
            var html = fs.readFileSync(output, 'utf8')
            fs.writeFileSync(output, html.replace(tag, tag + main))
          }
        })

        var snippet = (exports.snippet = function snippet(name) {
          return './website/snippets/' + name
        })

        var getEmojiSrc = (exports.getEmojiSrc = function getEmojiSrc(char) {
          if (isBrowser) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = _twemoji2.default.parse(char, {
              folder: 'svg',
              ext: '.svg'
            })
            return wrapper.firstElementChild.src
          }
        })

        var toKebabCase = (exports.toKebabCase = function toKebabCase(str) {
          return (
            str &&
            str
              .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
              )
              .map(function(x) {
                return x.toLowerCase()
              })
              .join('-')
          )
        })

        var animateLogo = (exports.animateLogo = function animateLogo(el) {
          ;(0, _animejs2.default)({
            targets: el,
            translateY: 210,
            duration: 2000,
            elasticity: 250,
            delay: 400
          })
        })

        var animateVersion = (exports.animateVersion = function animateVersion(
          el
        ) {
          ;(0, _animejs2.default)({
            targets: el,
            scale: 1,
            opacity: 1,
            duration: 2500,
            delay: 1000
          })
        })

        var animateItems = (exports.animateItems = function animateItems(el) {
          el.style.pointerEvents = 'none'
          ;(0, _animejs2.default)({
            targets: el,
            translateY: 0,
            opacity: 1,
            delay: 1500,
            duration: 2000,
            elasticity: 200,
            begin: function begin() {
              el.style.pointerEvents = 'auto'
            }
          })
        })
      },
      {
        animejs: '../node_modules/animejs/anime.min.js',
        twemoji: '../node_modules/twemoji/2/esm.js'
      }
    ],
    'js/state.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.default = {
          ajax: {
            imageSrc: '',
            isLoading: false,
            error: false,
            canFetch: true
          },
          performance: {
            inputValue: 0,
            numberOfElements: 0
          }
        }
      },
      {}
    ],
    'js/actions.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })
        exports.default = {
          ajax: {
            onShow: function onShow() {
              return function(state, actions) {
                if (state.isFetching || !state.canFetch) return

                fetch('https://unsplash.it/200/?random')
                  .then(function(response) {
                    return response.blob()
                  })
                  .then(actions.onDataReceived)
                  .catch(actions.errored)

                return {
                  error: false,
                  isFetching: true,
                  canFetch: false
                }
              }
            },

            onDataReceived: function onDataReceived(blob) {
              return function(state) {
                if (state.imageSrc === '') {
                  return { imageSrc: URL.createObjectURL(blob) }
                }
              }
            },

            onHidden: function onHidden() {
              return {
                error: false,
                imageSrc: '',
                isFetching: false,
                canFetch: true
              }
            },

            errored: function errored() {
              return { error: true, imageSrc: '' }
            }
          },

          performance: {
            test: function test() {
              return function(state) {
                return { numberOfElements: state.inputValue }
              }
            },
            setInputValue: function setInputValue(event) {
              return { inputValue: +event.target.value }
            }
          }
        }
      },
      {}
    ],
    'assets/img/logo.svg': [
      function(require, module, exports) {
        module.exports = '/logo.39ab4627.svg'
      },
      {}
    ],
    '../package.json': [
      function(require, module, exports) {
        module.exports = {
          name: 'tippy.js',
          version: '3.0.0',
          description: 'Vanilla JS Tooltip Library',
          main: 'dist/tippy.all.js',
          module: 'dist/esm/tippy.standalone.js',
          author: 'atomiks',
          license: 'MIT',
          keywords: ['tooltip', 'tippy', 'tippy.js'],
          repository: {
            type: 'git',
            url: 'git+https://github.com/atomiks/tippyjs.git'
          },
          scripts: {
            'dev:docs':
              'parcel website/index.html -d .devserver --no-cache --open',
            'build:docs':
              'parcel build website/index.html -d docs/ --public-url ./ && node website/build.js',
            dev: 'parcel tests/visual/index.html -d tests/visual/dist --open',
            build:
              'node ./scripts/build.js && npm run prettier && npm run build:docs',
            test: 'eslint "src/**/*.js" && jest --coverage',
            prettier: 'prettier --write "./**/*{js,scss}"'
          },
          jest: {
            setupFiles: [
              './tests/polyfills/createRange.js',
              './tests/polyfills/MutationObserver.js',
              './tests/polyfills/window.js'
            ],
            coveragePathIgnorePatterns: ['tests']
          },
          prettier: {
            semi: false,
            singleQuote: true
          },
          browserslist: ['> 0.5%'],
          alias: {
            '~': 'src'
          },
          devDependencies: {
            '@hyperapp/render': '^2.0.0',
            animejs: '^2.2.0',
            autoprefixer: '^6.7.7',
            'babel-core': '^6.26.3',
            'babel-jest': '^22.4.4',
            'babel-plugin-external-helpers': '^6.22.0',
            'babel-plugin-transform-react-jsx': '^6.24.1',
            'babel-preset-env': '^1.7.0',
            'babel-preset-es2015-rollup': '^3.0.0',
            'babel-preset-stage-2': '^6.24.1',
            'caniuse-lite': '^1.0.30000856',
            cssnano: '^3.10.0',
            eslint: '^4.18.2',
            'focus-visible': '^4.1.4',
            hyperapp: '^1.2.6',
            jest: '^23.5.0',
            jsdom: '^11.11.0',
            'mutation-observer': '^1.0.3',
            'node-sass': '^4.9.0',
            'normalize.css': '^8.0.0',
            'parcel-bundler': '^1.9.7',
            'parcel-plugin-markdown-string': '^1.3.2',
            postcss: '^5.2.18',
            'postcss-cssnext': '^3.1.0',
            'postcss-import': '^11.1.0',
            prettier: '^1.14.2',
            prismjs: '^1.15.0',
            rollup: '^0.55.5',
            'rollup-plugin-babel': '^2.7.1',
            'rollup-plugin-babel-minify': '^4.0.0',
            'rollup-plugin-commonjs': '^8.4.1',
            'rollup-plugin-css-only': '^0.2.0',
            'rollup-plugin-json': '^2.3.1',
            'rollup-plugin-node-resolve': '^3.2.0',
            'rollup-plugin-sass': '^0.4.10',
            'rollup-plugin-strip': '^1.1.1',
            twemoji: '^11.0.1'
          },
          dependencies: {
            'popper.js': '^1.14.4'
          }
        }
      },
      {}
    ],
    'js/components/Emoji.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _slicedToArray = (function() {
          function sliceIterator(arr, i) {
            var _arr = []
            var _n = true
            var _d = false
            var _e = undefined
            try {
              for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
              ) {
                _arr.push(_s.value)
                if (i && _arr.length === i) break
              }
            } catch (err) {
              _d = true
              _e = err
            } finally {
              try {
                if (!_n && _i['return']) _i['return']()
              } finally {
                if (_d) throw _e
              }
            }
            return _arr
          }
          return function(arr, i) {
            if (Array.isArray(arr)) {
              return arr
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i)
            } else {
              throw new TypeError(
                'Invalid attempt to destructure non-iterable instance'
              )
            }
          }
        })()

        var _hyperapp = require('hyperapp')

        var _utils = require('../utils')

        function _objectWithoutProperties(obj, keys) {
          var target = {}
          for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
            target[i] = obj[i]
          }
          return target
        }

        var SIZES = {
          large: '75px',
          medium: '40px',
          small: '25px'
        }

        exports.default = function(_ref, _ref2) {
          var size = _ref.size,
            props = _objectWithoutProperties(_ref, ['size'])

          var _ref3 = _slicedToArray(_ref2, 1),
            char = _ref3[0]

          return (0, _hyperapp.h)(
            'span',
            props,
            (0, _hyperapp.h)('img', {
              class: 'emoji',
              draggable: 0,
              alt: char,
              src: (0, _utils.getEmojiSrc)(char),
              style: { width: SIZES[size] }
            })
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../utils': 'js/utils.js'
      }
    ],
    '../dist/tippy.js': [
      function(require, module, exports) {
        var define
        var global = arguments[3]
        var _typeof =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                return typeof obj
              }
            : function(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              }

        /*!
* Tippy.js v3.0.0
* (c) 2017-2018 atomiks
* MIT
*/
        ;(function(global, factory) {
          ;(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ===
            'object' && typeof module !== 'undefined'
            ? (module.exports = factory())
            : typeof define === 'function' && define.amd
              ? define(factory)
              : (global.tippy = factory())
        })(this, function() {
          'use strict'

          var version = '3.0.0'

          var _extends =
            Object.assign ||
            function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i]

                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                  }
                }
              }

              return target
            }

          var Defaults = {
            a11y: true,
            content: '',
            placement: 'top',
            livePlacement: true,
            trigger: 'mouseenter focus',
            hideOnClick: true,
            animation: 'shift-away',
            animateFill: true,
            arrow: false,
            delay: [0, 20],
            duration: [325, 275],
            interactive: false,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            theme: 'dark',
            size: 'regular',
            distance: 10,
            offset: 0,
            multiple: false,
            followCursor: false,
            inertia: false,
            updateDuration: 200,
            sticky: false,
            appendTo: function appendTo() {
              return document.body
            },
            zIndex: 9999,
            touchHold: false,
            performance: false,
            flip: true,
            flipBehavior: 'flip',
            arrowType: 'sharp',
            arrowTransform: '',
            target: '',
            allowHTML: true,
            showOnInit: false,
            popperOptions: {},
            lazy: true,
            touch: true,
            wait: null,
            shouldPopperHideOnBlur: function shouldPopperHideOnBlur() {
              return true
            },
            onShow: function onShow() {},
            onShown: function onShown() {},
            onHide: function onHide() {},
            onHidden: function onHidden() {}
          }

          var setDefaults = function setDefaults(partialDefaults) {
            Defaults = _extends({}, Defaults, partialDefaults)
          }

          /**!
           * @fileOverview Kickass library to create and place poppers near their reference elements.
           * @version 1.14.4
           * @license
           * Copyright (c) 2016 Federico Zivolo and contributors
           *
           * Permission is hereby granted, free of charge, to any person obtaining a copy
           * of this software and associated documentation files (the "Software"), to deal
           * in the Software without restriction, including without limitation the rights
           * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
           * copies of the Software, and to permit persons to whom the Software is
           * furnished to do so, subject to the following conditions:
           *
           * The above copyright notice and this permission notice shall be included in all
           * copies or substantial portions of the Software.
           *
           * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
           * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
           * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
           * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
           * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
           * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
           * SOFTWARE.
           */
          var isBrowser =
            typeof window !== 'undefined' && typeof document !== 'undefined'

          var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox']
          var timeoutDuration = 0
          for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
            if (
              isBrowser &&
              navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0
            ) {
              timeoutDuration = 1
              break
            }
          }

          function microtaskDebounce(fn) {
            var called = false
            return function() {
              if (called) {
                return
              }
              called = true
              window.Promise.resolve().then(function() {
                called = false
                fn()
              })
            }
          }

          function taskDebounce(fn) {
            var scheduled = false
            return function() {
              if (!scheduled) {
                scheduled = true
                setTimeout(function() {
                  scheduled = false
                  fn()
                }, timeoutDuration)
              }
            }
          }

          var supportsMicroTasks = isBrowser && window.Promise

          /**
           * Create a debounced version of a method, that's asynchronously deferred
           * but called in the minimum time possible.
           *
           * @method
           * @memberof Popper.Utils
           * @argument {Function} fn
           * @returns {Function}
           */
          var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce

          /**
           * Check if the given variable is a function
           * @method
           * @memberof Popper.Utils
           * @argument {Any} functionToCheck - variable to check
           * @returns {Boolean} answer to: is a function?
           */
          function isFunction(functionToCheck) {
            var getType = {}
            return (
              functionToCheck &&
              getType.toString.call(functionToCheck) === '[object Function]'
            )
          }

          /**
           * Get CSS computed property of the given element
           * @method
           * @memberof Popper.Utils
           * @argument {Eement} element
           * @argument {String} property
           */
          function getStyleComputedProperty(element, property) {
            if (element.nodeType !== 1) {
              return []
            }
            // NOTE: 1 DOM access here
            var css = getComputedStyle(element, null)
            return property ? css[property] : css
          }

          /**
           * Returns the parentNode or the host of the element
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @returns {Element} parent
           */
          function getParentNode(element) {
            if (element.nodeName === 'HTML') {
              return element
            }
            return element.parentNode || element.host
          }

          /**
           * Returns the scrolling parent of the given element
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @returns {Element} scroll parent
           */
          function getScrollParent(element) {
            // Return body, `getScroll` will take care to get the correct `scrollTop` from it
            if (!element) {
              return document.body
            }

            switch (element.nodeName) {
              case 'HTML':
              case 'BODY':
                return element.ownerDocument.body
              case '#document':
                return element.body
            }

            // Firefox want us to check `-x` and `-y` variations as well

            var _getStyleComputedProp = getStyleComputedProperty(element),
              overflow = _getStyleComputedProp.overflow,
              overflowX = _getStyleComputedProp.overflowX,
              overflowY = _getStyleComputedProp.overflowY

            if (
              /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)
            ) {
              return element
            }

            return getScrollParent(getParentNode(element))
          }

          var isIE11 =
            isBrowser &&
            !!(window.MSInputMethodContext && document.documentMode)
          var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent)

          /**
           * Determines if the browser is Internet Explorer
           * @method
           * @memberof Popper.Utils
           * @param {Number} version to check
           * @returns {Boolean} isIE
           */
          function isIE(version) {
            if (version === 11) {
              return isIE11
            }
            if (version === 10) {
              return isIE10
            }
            return isIE11 || isIE10
          }

          /**
           * Returns the offset parent of the given element
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @returns {Element} offset parent
           */
          function getOffsetParent(element) {
            if (!element) {
              return document.documentElement
            }

            var noOffsetParent = isIE(10) ? document.body : null

            // NOTE: 1 DOM access here
            var offsetParent = element.offsetParent
            // Skip hidden elements which don't have an offsetParent
            while (
              offsetParent === noOffsetParent &&
              element.nextElementSibling
            ) {
              offsetParent = (element = element.nextElementSibling).offsetParent
            }

            var nodeName = offsetParent && offsetParent.nodeName

            if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
              return element
                ? element.ownerDocument.documentElement
                : document.documentElement
            }

            // .offsetParent will return the closest TD or TABLE in case
            // no offsetParent is present, I hate this job...
            if (
              ['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
              getStyleComputedProperty(offsetParent, 'position') === 'static'
            ) {
              return getOffsetParent(offsetParent)
            }

            return offsetParent
          }

          function isOffsetContainer(element) {
            var nodeName = element.nodeName

            if (nodeName === 'BODY') {
              return false
            }
            return (
              nodeName === 'HTML' ||
              getOffsetParent(element.firstElementChild) === element
            )
          }

          /**
           * Finds the root node (document, shadowDOM root) of the given element
           * @method
           * @memberof Popper.Utils
           * @argument {Element} node
           * @returns {Element} root node
           */
          function getRoot(node) {
            if (node.parentNode !== null) {
              return getRoot(node.parentNode)
            }

            return node
          }

          /**
           * Finds the offset parent common to the two provided nodes
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element1
           * @argument {Element} element2
           * @returns {Element} common offset parent
           */
          function findCommonOffsetParent(element1, element2) {
            // This check is needed to avoid errors in case one of the elements isn't defined for any reason
            if (
              !element1 ||
              !element1.nodeType ||
              !element2 ||
              !element2.nodeType
            ) {
              return document.documentElement
            }

            // Here we make sure to give as "start" the element that comes first in the DOM
            var order =
              element1.compareDocumentPosition(element2) &
              Node.DOCUMENT_POSITION_FOLLOWING
            var start = order ? element1 : element2
            var end = order ? element2 : element1

            // Get common ancestor container
            var range = document.createRange()
            range.setStart(start, 0)
            range.setEnd(end, 0)
            var commonAncestorContainer = range.commonAncestorContainer

            // Both nodes are inside #document

            if (
              (element1 !== commonAncestorContainer &&
                element2 !== commonAncestorContainer) ||
              start.contains(end)
            ) {
              if (isOffsetContainer(commonAncestorContainer)) {
                return commonAncestorContainer
              }

              return getOffsetParent(commonAncestorContainer)
            }

            // one of the nodes is inside shadowDOM, find which one
            var element1root = getRoot(element1)
            if (element1root.host) {
              return findCommonOffsetParent(element1root.host, element2)
            } else {
              return findCommonOffsetParent(element1, getRoot(element2).host)
            }
          }

          /**
           * Gets the scroll value of the given element in the given side (top and left)
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @argument {String} side `top` or `left`
           * @returns {number} amount of scrolled pixels
           */
          function getScroll(element) {
            var side =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : 'top'

            var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft'
            var nodeName = element.nodeName

            if (nodeName === 'BODY' || nodeName === 'HTML') {
              var html = element.ownerDocument.documentElement
              var scrollingElement =
                element.ownerDocument.scrollingElement || html
              return scrollingElement[upperSide]
            }

            return element[upperSide]
          }

          /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
          function includeScroll(rect, element) {
            var subtract =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : false

            var scrollTop = getScroll(element, 'top')
            var scrollLeft = getScroll(element, 'left')
            var modifier = subtract ? -1 : 1
            rect.top += scrollTop * modifier
            rect.bottom += scrollTop * modifier
            rect.left += scrollLeft * modifier
            rect.right += scrollLeft * modifier
            return rect
          }

          /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

          function getBordersSize(styles, axis) {
            var sideA = axis === 'x' ? 'Left' : 'Top'
            var sideB = sideA === 'Left' ? 'Right' : 'Bottom'

            return (
              parseFloat(styles['border' + sideA + 'Width'], 10) +
              parseFloat(styles['border' + sideB + 'Width'], 10)
            )
          }

          function getSize(axis, body, html, computedStyle) {
            return Math.max(
              body['offset' + axis],
              body['scroll' + axis],
              html['client' + axis],
              html['offset' + axis],
              html['scroll' + axis],
              isIE(10)
                ? parseInt(html['offset' + axis]) +
                  parseInt(
                    computedStyle[
                      'margin' + (axis === 'Height' ? 'Top' : 'Left')
                    ]
                  ) +
                  parseInt(
                    computedStyle[
                      'margin' + (axis === 'Height' ? 'Bottom' : 'Right')
                    ]
                  )
                : 0
            )
          }

          function getWindowSizes(document) {
            var body = document.body
            var html = document.documentElement
            var computedStyle = isIE(10) && getComputedStyle(html)

            return {
              height: getSize('Height', body, html, computedStyle),
              width: getSize('Width', body, html, computedStyle)
            }
          }

          var classCallCheck$1 = function classCallCheck(
            instance,
            Constructor
          ) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError('Cannot call a class as a function')
            }
          }

          var createClass$1 = (function() {
            function defineProperties(target, props) {
              for (var i = 0; i < props.length; i++) {
                var descriptor = props[i]
                descriptor.enumerable = descriptor.enumerable || false
                descriptor.configurable = true
                if ('value' in descriptor) descriptor.writable = true
                Object.defineProperty(target, descriptor.key, descriptor)
              }
            }

            return function(Constructor, protoProps, staticProps) {
              if (protoProps)
                defineProperties(Constructor.prototype, protoProps)
              if (staticProps) defineProperties(Constructor, staticProps)
              return Constructor
            }
          })()

          var defineProperty$1 = function defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
              })
            } else {
              obj[key] = value
            }

            return obj
          }

          var _extends$1 =
            Object.assign ||
            function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i]

                for (var key in source) {
                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                  }
                }
              }

              return target
            }

          /**
           * Given element offsets, generate an output similar to getBoundingClientRect
           * @method
           * @memberof Popper.Utils
           * @argument {Object} offsets
           * @returns {Object} ClientRect like output
           */
          function getClientRect(offsets) {
            return _extends$1({}, offsets, {
              right: offsets.left + offsets.width,
              bottom: offsets.top + offsets.height
            })
          }

          /**
           * Get bounding client rect of given element
           * @method
           * @memberof Popper.Utils
           * @param {HTMLElement} element
           * @return {Object} client rect
           */
          function getBoundingClientRect(element) {
            var rect = {}

            // IE10 10 FIX: Please, don't ask, the element isn't
            // considered in DOM in some circumstances...
            // This isn't reproducible in IE10 compatibility mode of IE11
            try {
              if (isIE(10)) {
                rect = element.getBoundingClientRect()
                var scrollTop = getScroll(element, 'top')
                var scrollLeft = getScroll(element, 'left')
                rect.top += scrollTop
                rect.left += scrollLeft
                rect.bottom += scrollTop
                rect.right += scrollLeft
              } else {
                rect = element.getBoundingClientRect()
              }
            } catch (e) {}

            var result = {
              left: rect.left,
              top: rect.top,
              width: rect.right - rect.left,
              height: rect.bottom - rect.top
            }

            // subtract scrollbar size from sizes
            var sizes =
              element.nodeName === 'HTML'
                ? getWindowSizes(element.ownerDocument)
                : {}
            var width =
              sizes.width || element.clientWidth || result.right - result.left
            var height =
              sizes.height || element.clientHeight || result.bottom - result.top

            var horizScrollbar = element.offsetWidth - width
            var vertScrollbar = element.offsetHeight - height

            // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
            // we make this check conditional for performance reasons
            if (horizScrollbar || vertScrollbar) {
              var styles = getStyleComputedProperty(element)
              horizScrollbar -= getBordersSize(styles, 'x')
              vertScrollbar -= getBordersSize(styles, 'y')

              result.width -= horizScrollbar
              result.height -= vertScrollbar
            }

            return getClientRect(result)
          }

          function getOffsetRectRelativeToArbitraryNode(children, parent) {
            var fixedPosition =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : false

            var isIE10 = isIE(10)
            var isHTML = parent.nodeName === 'HTML'
            var childrenRect = getBoundingClientRect(children)
            var parentRect = getBoundingClientRect(parent)
            var scrollParent = getScrollParent(children)

            var styles = getStyleComputedProperty(parent)
            var borderTopWidth = parseFloat(styles.borderTopWidth, 10)
            var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10)

            // In cases where the parent is fixed, we must ignore negative scroll in offset calc
            if (fixedPosition && isHTML) {
              parentRect.top = Math.max(parentRect.top, 0)
              parentRect.left = Math.max(parentRect.left, 0)
            }
            var offsets = getClientRect({
              top: childrenRect.top - parentRect.top - borderTopWidth,
              left: childrenRect.left - parentRect.left - borderLeftWidth,
              width: childrenRect.width,
              height: childrenRect.height
            })
            offsets.marginTop = 0
            offsets.marginLeft = 0

            // Subtract margins of documentElement in case it's being used as parent
            // we do this only on HTML because it's the only element that behaves
            // differently when margins are applied to it. The margins are included in
            // the box of the documentElement, in the other cases not.
            if (!isIE10 && isHTML) {
              var marginTop = parseFloat(styles.marginTop, 10)
              var marginLeft = parseFloat(styles.marginLeft, 10)

              offsets.top -= borderTopWidth - marginTop
              offsets.bottom -= borderTopWidth - marginTop
              offsets.left -= borderLeftWidth - marginLeft
              offsets.right -= borderLeftWidth - marginLeft

              // Attach marginTop and marginLeft because in some circumstances we may need them
              offsets.marginTop = marginTop
              offsets.marginLeft = marginLeft
            }

            if (
              isIE10 && !fixedPosition
                ? parent.contains(scrollParent)
                : parent === scrollParent && scrollParent.nodeName !== 'BODY'
            ) {
              offsets = includeScroll(offsets, parent)
            }

            return offsets
          }

          function getViewportOffsetRectRelativeToArtbitraryNode(element) {
            var excludeScroll =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : false

            var html = element.ownerDocument.documentElement
            var relativeOffset = getOffsetRectRelativeToArbitraryNode(
              element,
              html
            )
            var width = Math.max(html.clientWidth, window.innerWidth || 0)
            var height = Math.max(html.clientHeight, window.innerHeight || 0)

            var scrollTop = !excludeScroll ? getScroll(html) : 0
            var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0

            var offset = {
              top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
              left:
                scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
              width: width,
              height: height
            }

            return getClientRect(offset)
          }

          /**
           * Check if the given element is fixed or is inside a fixed parent
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @argument {Element} customContainer
           * @returns {Boolean} answer to "isFixed?"
           */
          function isFixed(element) {
            var nodeName = element.nodeName
            if (nodeName === 'BODY' || nodeName === 'HTML') {
              return false
            }
            if (getStyleComputedProperty(element, 'position') === 'fixed') {
              return true
            }
            return isFixed(getParentNode(element))
          }

          /**
           * Finds the first parent of an element that has a transformed property defined
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @returns {Element} first transformed parent or documentElement
           */

          function getFixedPositionOffsetParent(element) {
            // This check is needed to avoid errors in case one of the elements isn't defined for any reason
            if (!element || !element.parentElement || isIE()) {
              return document.documentElement
            }
            var el = element.parentElement
            while (el && getStyleComputedProperty(el, 'transform') === 'none') {
              el = el.parentElement
            }
            return el || document.documentElement
          }

          /**
           * Computed the boundaries limits and return them
           * @method
           * @memberof Popper.Utils
           * @param {HTMLElement} popper
           * @param {HTMLElement} reference
           * @param {number} padding
           * @param {HTMLElement} boundariesElement - Element used to define the boundaries
           * @param {Boolean} fixedPosition - Is in fixed position mode
           * @returns {Object} Coordinates of the boundaries
           */
          function getBoundaries(
            popper,
            reference,
            padding,
            boundariesElement
          ) {
            var fixedPosition =
              arguments.length > 4 && arguments[4] !== undefined
                ? arguments[4]
                : false

            // NOTE: 1 DOM access here

            var boundaries = { top: 0, left: 0 }
            var offsetParent = fixedPosition
              ? getFixedPositionOffsetParent(popper)
              : findCommonOffsetParent(popper, reference)

            // Handle viewport case
            if (boundariesElement === 'viewport') {
              boundaries = getViewportOffsetRectRelativeToArtbitraryNode(
                offsetParent,
                fixedPosition
              )
            } else {
              // Handle other cases based on DOM element used as boundaries
              var boundariesNode = void 0
              if (boundariesElement === 'scrollParent') {
                boundariesNode = getScrollParent(getParentNode(reference))
                if (boundariesNode.nodeName === 'BODY') {
                  boundariesNode = popper.ownerDocument.documentElement
                }
              } else if (boundariesElement === 'window') {
                boundariesNode = popper.ownerDocument.documentElement
              } else {
                boundariesNode = boundariesElement
              }

              var offsets = getOffsetRectRelativeToArbitraryNode(
                boundariesNode,
                offsetParent,
                fixedPosition
              )

              // In case of HTML, we need a different computation
              if (
                boundariesNode.nodeName === 'HTML' &&
                !isFixed(offsetParent)
              ) {
                var _getWindowSizes = getWindowSizes(popper.ownerDocument),
                  height = _getWindowSizes.height,
                  width = _getWindowSizes.width

                boundaries.top += offsets.top - offsets.marginTop
                boundaries.bottom = height + offsets.top
                boundaries.left += offsets.left - offsets.marginLeft
                boundaries.right = width + offsets.left
              } else {
                // for all the other DOM elements, this one is good
                boundaries = offsets
              }
            }

            // Add paddings
            padding = padding || 0
            var isPaddingNumber = typeof padding === 'number'
            boundaries.left += isPaddingNumber ? padding : padding.left || 0
            boundaries.top += isPaddingNumber ? padding : padding.top || 0
            boundaries.right -= isPaddingNumber ? padding : padding.right || 0
            boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0

            return boundaries
          }

          function getArea(_ref) {
            var width = _ref.width,
              height = _ref.height

            return width * height
          }

          /**
           * Utility used to transform the `auto` placement to the placement with more
           * available space.
           * @method
           * @memberof Popper.Utils
           * @argument {Object} data - The data object generated by update method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function computeAutoPlacement(
            placement,
            refRect,
            popper,
            reference,
            boundariesElement
          ) {
            var padding =
              arguments.length > 5 && arguments[5] !== undefined
                ? arguments[5]
                : 0

            if (placement.indexOf('auto') === -1) {
              return placement
            }

            var boundaries = getBoundaries(
              popper,
              reference,
              padding,
              boundariesElement
            )

            var rects = {
              top: {
                width: boundaries.width,
                height: refRect.top - boundaries.top
              },
              right: {
                width: boundaries.right - refRect.right,
                height: boundaries.height
              },
              bottom: {
                width: boundaries.width,
                height: boundaries.bottom - refRect.bottom
              },
              left: {
                width: refRect.left - boundaries.left,
                height: boundaries.height
              }
            }

            var sortedAreas = Object.keys(rects)
              .map(function(key) {
                return _extends$1(
                  {
                    key: key
                  },
                  rects[key],
                  {
                    area: getArea(rects[key])
                  }
                )
              })
              .sort(function(a, b) {
                return b.area - a.area
              })

            var filteredAreas = sortedAreas.filter(function(_ref2) {
              var width = _ref2.width,
                height = _ref2.height
              return (
                width >= popper.clientWidth && height >= popper.clientHeight
              )
            })

            var computedPlacement =
              filteredAreas.length > 0
                ? filteredAreas[0].key
                : sortedAreas[0].key

            var variation = placement.split('-')[1]

            return computedPlacement + (variation ? '-' + variation : '')
          }

          /**
           * Get offsets to the reference element
           * @method
           * @memberof Popper.Utils
           * @param {Object} state
           * @param {Element} popper - the popper element
           * @param {Element} reference - the reference element (the popper will be relative to this)
           * @param {Element} fixedPosition - is in fixed position mode
           * @returns {Object} An object containing the offsets which will be applied to the popper
           */
          function getReferenceOffsets(state, popper, reference) {
            var fixedPosition =
              arguments.length > 3 && arguments[3] !== undefined
                ? arguments[3]
                : null

            var commonOffsetParent = fixedPosition
              ? getFixedPositionOffsetParent(popper)
              : findCommonOffsetParent(popper, reference)
            return getOffsetRectRelativeToArbitraryNode(
              reference,
              commonOffsetParent,
              fixedPosition
            )
          }

          /**
           * Get the outer sizes of the given element (offset size + margins)
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element
           * @returns {Object} object containing width and height properties
           */
          function getOuterSizes(element) {
            var styles = getComputedStyle(element)
            var x =
              parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)
            var y =
              parseFloat(styles.marginLeft) + parseFloat(styles.marginRight)
            var result = {
              width: element.offsetWidth + y,
              height: element.offsetHeight + x
            }
            return result
          }

          /**
           * Get the opposite placement of the given one
           * @method
           * @memberof Popper.Utils
           * @argument {String} placement
           * @returns {String} flipped placement
           */
          function getOppositePlacement(placement) {
            var hash = {
              left: 'right',
              right: 'left',
              bottom: 'top',
              top: 'bottom'
            }
            return placement.replace(/left|right|bottom|top/g, function(
              matched
            ) {
              return hash[matched]
            })
          }

          /**
           * Get offsets to the popper
           * @method
           * @memberof Popper.Utils
           * @param {Object} position - CSS position the Popper will get applied
           * @param {HTMLElement} popper - the popper element
           * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
           * @param {String} placement - one of the valid placement options
           * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
           */
          function getPopperOffsets(popper, referenceOffsets, placement) {
            placement = placement.split('-')[0]

            // Get popper node sizes
            var popperRect = getOuterSizes(popper)

            // Add position, width and height to our offsets object
            var popperOffsets = {
              width: popperRect.width,
              height: popperRect.height
            }

            // depending by the popper placement we have to compute its offsets slightly differently
            var isHoriz = ['right', 'left'].indexOf(placement) !== -1
            var mainSide = isHoriz ? 'top' : 'left'
            var secondarySide = isHoriz ? 'left' : 'top'
            var measurement = isHoriz ? 'height' : 'width'
            var secondaryMeasurement = !isHoriz ? 'height' : 'width'

            popperOffsets[mainSide] =
              referenceOffsets[mainSide] +
              referenceOffsets[measurement] / 2 -
              popperRect[measurement] / 2
            if (placement === secondarySide) {
              popperOffsets[secondarySide] =
                referenceOffsets[secondarySide] -
                popperRect[secondaryMeasurement]
            } else {
              popperOffsets[secondarySide] =
                referenceOffsets[getOppositePlacement(secondarySide)]
            }

            return popperOffsets
          }

          /**
           * Mimics the `find` method of Array
           * @method
           * @memberof Popper.Utils
           * @argument {Array} arr
           * @argument prop
           * @argument value
           * @returns index or -1
           */
          function find(arr, check) {
            // use native find if supported
            if (Array.prototype.find) {
              return arr.find(check)
            }

            // use `filter` to obtain the same behavior of `find`
            return arr.filter(check)[0]
          }

          /**
           * Return the index of the matching object
           * @method
           * @memberof Popper.Utils
           * @argument {Array} arr
           * @argument prop
           * @argument value
           * @returns index or -1
           */
          function findIndex(arr, prop, value) {
            // use native findIndex if supported
            if (Array.prototype.findIndex) {
              return arr.findIndex(function(cur) {
                return cur[prop] === value
              })
            }

            // use `find` + `indexOf` if `findIndex` isn't supported
            var match = find(arr, function(obj) {
              return obj[prop] === value
            })
            return arr.indexOf(match)
          }

          /**
           * Loop trough the list of modifiers and run them in order,
           * each of them will then edit the data object.
           * @method
           * @memberof Popper.Utils
           * @param {dataObject} data
           * @param {Array} modifiers
           * @param {String} ends - Optional modifier name used as stopper
           * @returns {dataObject}
           */
          function runModifiers(modifiers, data, ends) {
            var modifiersToRun =
              ends === undefined
                ? modifiers
                : modifiers.slice(0, findIndex(modifiers, 'name', ends))

            modifiersToRun.forEach(function(modifier) {
              if (modifier['function']) {
                // eslint-disable-line dot-notation
                console.warn(
                  '`modifier.function` is deprecated, use `modifier.fn`!'
                )
              }
              var fn = modifier['function'] || modifier.fn // eslint-disable-line dot-notation
              if (modifier.enabled && isFunction(fn)) {
                // Add properties to offsets to make them a complete clientRect object
                // we do this before each modifier to make sure the previous one doesn't
                // mess with these values
                data.offsets.popper = getClientRect(data.offsets.popper)
                data.offsets.reference = getClientRect(data.offsets.reference)

                data = fn(data, modifier)
              }
            })

            return data
          }

          /**
           * Updates the position of the popper, computing the new offsets and applying
           * the new style.<br />
           * Prefer `scheduleUpdate` over `update` because of performance reasons.
           * @method
           * @memberof Popper
           */
          function update() {
            // if popper is destroyed, don't perform any further update
            if (this.state.isDestroyed) {
              return
            }

            var data = {
              instance: this,
              styles: {},
              arrowStyles: {},
              attributes: {},
              flipped: false,
              offsets: {}
            }

            // compute reference element offsets
            data.offsets.reference = getReferenceOffsets(
              this.state,
              this.popper,
              this.reference,
              this.options.positionFixed
            )

            // compute auto placement, store placement inside the data object,
            // modifiers will be able to edit `placement` if needed
            // and refer to originalPlacement to know the original value
            data.placement = computeAutoPlacement(
              this.options.placement,
              data.offsets.reference,
              this.popper,
              this.reference,
              this.options.modifiers.flip.boundariesElement,
              this.options.modifiers.flip.padding
            )

            // store the computed placement inside `originalPlacement`
            data.originalPlacement = data.placement

            data.positionFixed = this.options.positionFixed

            // compute the popper offsets
            data.offsets.popper = getPopperOffsets(
              this.popper,
              data.offsets.reference,
              data.placement
            )

            data.offsets.popper.position = this.options.positionFixed
              ? 'fixed'
              : 'absolute'

            // run the modifiers
            data = runModifiers(this.modifiers, data)

            // the first `update` will call `onCreate` callback
            // the other ones will call `onUpdate` callback
            if (!this.state.isCreated) {
              this.state.isCreated = true
              this.options.onCreate(data)
            } else {
              this.options.onUpdate(data)
            }
          }

          /**
           * Helper used to know if the given modifier is enabled.
           * @method
           * @memberof Popper.Utils
           * @returns {Boolean}
           */
          function isModifierEnabled(modifiers, modifierName) {
            return modifiers.some(function(_ref) {
              var name = _ref.name,
                enabled = _ref.enabled
              return enabled && name === modifierName
            })
          }

          /**
           * Get the prefixed supported property name
           * @method
           * @memberof Popper.Utils
           * @argument {String} property (camelCase)
           * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
           */
          function getSupportedPropertyName(property) {
            var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O']
            var upperProp = property.charAt(0).toUpperCase() + property.slice(1)

            for (var i = 0; i < prefixes.length; i++) {
              var prefix = prefixes[i]
              var toCheck = prefix ? '' + prefix + upperProp : property
              if (typeof document.body.style[toCheck] !== 'undefined') {
                return toCheck
              }
            }
            return null
          }

          /**
           * Destroys the popper.
           * @method
           * @memberof Popper
           */
          function destroy() {
            this.state.isDestroyed = true

            // touch DOM only if `applyStyle` modifier is enabled
            if (isModifierEnabled(this.modifiers, 'applyStyle')) {
              this.popper.removeAttribute('x-placement')
              this.popper.style.position = ''
              this.popper.style.top = ''
              this.popper.style.left = ''
              this.popper.style.right = ''
              this.popper.style.bottom = ''
              this.popper.style.willChange = ''
              this.popper.style[getSupportedPropertyName('transform')] = ''
            }

            this.disableEventListeners()

            // remove the popper if user explicity asked for the deletion on destroy
            // do not use `remove` because IE11 doesn't support it
            if (this.options.removeOnDestroy) {
              this.popper.parentNode.removeChild(this.popper)
            }
            return this
          }

          /**
           * Get the window associated with the element
           * @argument {Element} element
           * @returns {Window}
           */
          function getWindow(element) {
            var ownerDocument = element.ownerDocument
            return ownerDocument ? ownerDocument.defaultView : window
          }

          function attachToScrollParents(
            scrollParent,
            event,
            callback,
            scrollParents
          ) {
            var isBody = scrollParent.nodeName === 'BODY'
            var target = isBody
              ? scrollParent.ownerDocument.defaultView
              : scrollParent
            target.addEventListener(event, callback, { passive: true })

            if (!isBody) {
              attachToScrollParents(
                getScrollParent(target.parentNode),
                event,
                callback,
                scrollParents
              )
            }
            scrollParents.push(target)
          }

          /**
           * Setup needed event listeners used to update the popper position
           * @method
           * @memberof Popper.Utils
           * @private
           */
          function setupEventListeners(reference, options, state, updateBound) {
            // Resize event listener on window
            state.updateBound = updateBound
            getWindow(reference).addEventListener('resize', state.updateBound, {
              passive: true
            })

            // Scroll event listener on scroll parents
            var scrollElement = getScrollParent(reference)
            attachToScrollParents(
              scrollElement,
              'scroll',
              state.updateBound,
              state.scrollParents
            )
            state.scrollElement = scrollElement
            state.eventsEnabled = true

            return state
          }

          /**
           * It will add resize/scroll events and start recalculating
           * position of the popper element when they are triggered.
           * @method
           * @memberof Popper
           */
          function enableEventListeners() {
            if (!this.state.eventsEnabled) {
              this.state = setupEventListeners(
                this.reference,
                this.options,
                this.state,
                this.scheduleUpdate
              )
            }
          }

          /**
           * Remove event listeners used to update the popper position
           * @method
           * @memberof Popper.Utils
           * @private
           */
          function removeEventListeners(reference, state) {
            // Remove resize event listener on window
            getWindow(reference).removeEventListener(
              'resize',
              state.updateBound
            )

            // Remove scroll event listener on scroll parents
            state.scrollParents.forEach(function(target) {
              target.removeEventListener('scroll', state.updateBound)
            })

            // Reset state
            state.updateBound = null
            state.scrollParents = []
            state.scrollElement = null
            state.eventsEnabled = false
            return state
          }

          /**
           * It will remove resize/scroll events and won't recalculate popper position
           * when they are triggered. It also won't trigger `onUpdate` callback anymore,
           * unless you call `update` method manually.
           * @method
           * @memberof Popper
           */
          function disableEventListeners() {
            if (this.state.eventsEnabled) {
              cancelAnimationFrame(this.scheduleUpdate)
              this.state = removeEventListeners(this.reference, this.state)
            }
          }

          /**
           * Tells if a given input is a number
           * @method
           * @memberof Popper.Utils
           * @param {*} input to check
           * @return {Boolean}
           */
          function isNumeric(n) {
            return n !== '' && !isNaN(parseFloat(n)) && isFinite(n)
          }

          /**
           * Set the style to the given popper
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element - Element to apply the style to
           * @argument {Object} styles
           * Object with a list of properties and values which will be applied to the element
           */
          function setStyles(element, styles) {
            Object.keys(styles).forEach(function(prop) {
              var unit = ''
              // add unit if the value is numeric and is one of the following
              if (
                ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(
                  prop
                ) !== -1 &&
                isNumeric(styles[prop])
              ) {
                unit = 'px'
              }
              element.style[prop] = styles[prop] + unit
            })
          }

          /**
           * Set the attributes to the given popper
           * @method
           * @memberof Popper.Utils
           * @argument {Element} element - Element to apply the attributes to
           * @argument {Object} styles
           * Object with a list of properties and values which will be applied to the element
           */
          function setAttributes(element, attributes) {
            Object.keys(attributes).forEach(function(prop) {
              var value = attributes[prop]
              if (value !== false) {
                element.setAttribute(prop, attributes[prop])
              } else {
                element.removeAttribute(prop)
              }
            })
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by `update` method
           * @argument {Object} data.styles - List of style properties - values to apply to popper element
           * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The same data object
           */
          function applyStyle(data) {
            // any property present in `data.styles` will be applied to the popper,
            // in this way we can make the 3rd party modifiers add custom styles to it
            // Be aware, modifiers could override the properties defined in the previous
            // lines of this modifier!
            setStyles(data.instance.popper, data.styles)

            // any property present in `data.attributes` will be applied to the popper,
            // they will be set as HTML attributes of the element
            setAttributes(data.instance.popper, data.attributes)

            // if arrowElement is defined and arrowStyles has some properties
            if (data.arrowElement && Object.keys(data.arrowStyles).length) {
              setStyles(data.arrowElement, data.arrowStyles)
            }

            return data
          }

          /**
           * Set the x-placement attribute before everything else because it could be used
           * to add margins to the popper margins needs to be calculated to get the
           * correct popper offsets.
           * @method
           * @memberof Popper.modifiers
           * @param {HTMLElement} reference - The reference element used to position the popper
           * @param {HTMLElement} popper - The HTML element used as popper
           * @param {Object} options - Popper.js options
           */
          function applyStyleOnLoad(
            reference,
            popper,
            options,
            modifierOptions,
            state
          ) {
            // compute reference element offsets
            var referenceOffsets = getReferenceOffsets(
              state,
              popper,
              reference,
              options.positionFixed
            )

            // compute auto placement, store placement inside the data object,
            // modifiers will be able to edit `placement` if needed
            // and refer to originalPlacement to know the original value
            var placement = computeAutoPlacement(
              options.placement,
              referenceOffsets,
              popper,
              reference,
              options.modifiers.flip.boundariesElement,
              options.modifiers.flip.padding
            )

            popper.setAttribute('x-placement', placement)

            // Apply `position` to popper before anything else because
            // without the position applied we can't guarantee correct computations
            setStyles(popper, {
              position: options.positionFixed ? 'fixed' : 'absolute'
            })

            return options
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by `update` method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function computeStyle(data, options) {
            var x = options.x,
              y = options.y
            var popper = data.offsets.popper

            // Remove this legacy support in Popper.js v2

            var legacyGpuAccelerationOption = find(
              data.instance.modifiers,
              function(modifier) {
                return modifier.name === 'applyStyle'
              }
            ).gpuAcceleration
            if (legacyGpuAccelerationOption !== undefined) {
              console.warn(
                'WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'
              )
            }
            var gpuAcceleration =
              legacyGpuAccelerationOption !== undefined
                ? legacyGpuAccelerationOption
                : options.gpuAcceleration

            var offsetParent = getOffsetParent(data.instance.popper)
            var offsetParentRect = getBoundingClientRect(offsetParent)

            // Styles
            var styles = {
              position: popper.position
            }

            // Avoid blurry text by using full pixel integers.
            // For pixel-perfect positioning, top/bottom prefers rounded
            // values, while left/right prefers floored values.
            var offsets = {
              left: Math.floor(popper.left),
              top: Math.round(popper.top),
              bottom: Math.round(popper.bottom),
              right: Math.floor(popper.right)
            }

            var sideA = x === 'bottom' ? 'top' : 'bottom'
            var sideB = y === 'right' ? 'left' : 'right'

            // if gpuAcceleration is set to `true` and transform is supported,
            //  we use `translate3d` to apply the position to the popper we
            // automatically use the supported prefixed version if needed
            var prefixedProperty = getSupportedPropertyName('transform')

            // now, let's make a step back and look at this code closely (wtf?)
            // If the content of the popper grows once it's been positioned, it
            // may happen that the popper gets misplaced because of the new content
            // overflowing its reference element
            // To avoid this problem, we provide two options (x and y), which allow
            // the consumer to define the offset origin.
            // If we position a popper on top of a reference element, we can set
            // `x` to `top` to make the popper grow towards its top instead of
            // its bottom.
            var left = void 0,
              top = void 0
            if (sideA === 'bottom') {
              // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
              // and not the bottom of the html element
              if (offsetParent.nodeName === 'HTML') {
                top = -offsetParent.clientHeight + offsets.bottom
              } else {
                top = -offsetParentRect.height + offsets.bottom
              }
            } else {
              top = offsets.top
            }
            if (sideB === 'right') {
              if (offsetParent.nodeName === 'HTML') {
                left = -offsetParent.clientWidth + offsets.right
              } else {
                left = -offsetParentRect.width + offsets.right
              }
            } else {
              left = offsets.left
            }
            if (gpuAcceleration && prefixedProperty) {
              styles[prefixedProperty] =
                'translate3d(' + left + 'px, ' + top + 'px, 0)'
              styles[sideA] = 0
              styles[sideB] = 0
              styles.willChange = 'transform'
            } else {
              // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
              var invertTop = sideA === 'bottom' ? -1 : 1
              var invertLeft = sideB === 'right' ? -1 : 1
              styles[sideA] = top * invertTop
              styles[sideB] = left * invertLeft
              styles.willChange = sideA + ', ' + sideB
            }

            // Attributes
            var attributes = {
              'x-placement': data.placement
            }

            // Update `data` attributes, styles and arrowStyles
            data.attributes = _extends$1({}, attributes, data.attributes)
            data.styles = _extends$1({}, styles, data.styles)
            data.arrowStyles = _extends$1(
              {},
              data.offsets.arrow,
              data.arrowStyles
            )

            return data
          }

          /**
           * Helper used to know if the given modifier depends from another one.<br />
           * It checks if the needed modifier is listed and enabled.
           * @method
           * @memberof Popper.Utils
           * @param {Array} modifiers - list of modifiers
           * @param {String} requestingName - name of requesting modifier
           * @param {String} requestedName - name of requested modifier
           * @returns {Boolean}
           */
          function isModifierRequired(
            modifiers,
            requestingName,
            requestedName
          ) {
            var requesting = find(modifiers, function(_ref) {
              var name = _ref.name
              return name === requestingName
            })

            var isRequired =
              !!requesting &&
              modifiers.some(function(modifier) {
                return (
                  modifier.name === requestedName &&
                  modifier.enabled &&
                  modifier.order < requesting.order
                )
              })

            if (!isRequired) {
              var _requesting = '`' + requestingName + '`'
              var requested = '`' + requestedName + '`'
              console.warn(
                requested +
                  ' modifier is required by ' +
                  _requesting +
                  ' modifier in order to work, be sure to include it before ' +
                  _requesting +
                  '!'
              )
            }
            return isRequired
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by update method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function arrow(data, options) {
            var _data$offsets$arrow

            // arrow depends on keepTogether in order to work
            if (
              !isModifierRequired(
                data.instance.modifiers,
                'arrow',
                'keepTogether'
              )
            ) {
              return data
            }

            var arrowElement = options.element

            // if arrowElement is a string, suppose it's a CSS selector
            if (typeof arrowElement === 'string') {
              arrowElement = data.instance.popper.querySelector(arrowElement)

              // if arrowElement is not found, don't run the modifier
              if (!arrowElement) {
                return data
              }
            } else {
              // if the arrowElement isn't a query selector we must check that the
              // provided DOM node is child of its popper node
              if (!data.instance.popper.contains(arrowElement)) {
                console.warn(
                  'WARNING: `arrow.element` must be child of its popper element!'
                )
                return data
              }
            }

            var placement = data.placement.split('-')[0]
            var _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference

            var isVertical = ['left', 'right'].indexOf(placement) !== -1

            var len = isVertical ? 'height' : 'width'
            var sideCapitalized = isVertical ? 'Top' : 'Left'
            var side = sideCapitalized.toLowerCase()
            var altSide = isVertical ? 'left' : 'top'
            var opSide = isVertical ? 'bottom' : 'right'
            var arrowElementSize = getOuterSizes(arrowElement)[len]

            //
            // extends keepTogether behavior making sure the popper and its
            // reference have enough pixels in conjunction
            //

            // top/left side
            if (reference[opSide] - arrowElementSize < popper[side]) {
              data.offsets.popper[side] -=
                popper[side] - (reference[opSide] - arrowElementSize)
            }
            // bottom/right side
            if (reference[side] + arrowElementSize > popper[opSide]) {
              data.offsets.popper[side] +=
                reference[side] + arrowElementSize - popper[opSide]
            }
            data.offsets.popper = getClientRect(data.offsets.popper)

            // compute center of the popper
            var center =
              reference[side] + reference[len] / 2 - arrowElementSize / 2

            // Compute the sideValue using the updated popper offsets
            // take popper margin in account because we don't have this info available
            var css = getStyleComputedProperty(data.instance.popper)
            var popperMarginSide = parseFloat(
              css['margin' + sideCapitalized],
              10
            )
            var popperBorderSide = parseFloat(
              css['border' + sideCapitalized + 'Width'],
              10
            )
            var sideValue =
              center -
              data.offsets.popper[side] -
              popperMarginSide -
              popperBorderSide

            // prevent arrowElement from being placed not contiguously to its popper
            sideValue = Math.max(
              Math.min(popper[len] - arrowElementSize, sideValue),
              0
            )

            data.arrowElement = arrowElement
            data.offsets.arrow = ((_data$offsets$arrow = {}),
            defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)),
            defineProperty$1(_data$offsets$arrow, altSide, ''),
            _data$offsets$arrow)

            return data
          }

          /**
           * Get the opposite placement variation of the given one
           * @method
           * @memberof Popper.Utils
           * @argument {String} placement variation
           * @returns {String} flipped placement variation
           */
          function getOppositeVariation(variation) {
            if (variation === 'end') {
              return 'start'
            } else if (variation === 'start') {
              return 'end'
            }
            return variation
          }

          /**
           * List of accepted placements to use as values of the `placement` option.<br />
           * Valid placements are:
           * - `auto`
           * - `top`
           * - `right`
           * - `bottom`
           * - `left`
           *
           * Each placement can have a variation from this list:
           * - `-start`
           * - `-end`
           *
           * Variations are interpreted easily if you think of them as the left to right
           * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
           * is right.<br />
           * Vertically (`left` and `right`), `start` is top and `end` is bottom.
           *
           * Some valid examples are:
           * - `top-end` (on top of reference, right aligned)
           * - `right-start` (on right of reference, top aligned)
           * - `bottom` (on bottom, centered)
           * - `auto-end` (on the side with more space available, alignment depends by placement)
           *
           * @static
           * @type {Array}
           * @enum {String}
           * @readonly
           * @method placements
           * @memberof Popper
           */
          var placements = [
            'auto-start',
            'auto',
            'auto-end',
            'top-start',
            'top',
            'top-end',
            'right-start',
            'right',
            'right-end',
            'bottom-end',
            'bottom',
            'bottom-start',
            'left-end',
            'left',
            'left-start'
          ]

          // Get rid of `auto` `auto-start` and `auto-end`
          var validPlacements = placements.slice(3)

          /**
           * Given an initial placement, returns all the subsequent placements
           * clockwise (or counter-clockwise).
           *
           * @method
           * @memberof Popper.Utils
           * @argument {String} placement - A valid placement (it accepts variations)
           * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
           * @returns {Array} placements including their variations
           */
          function clockwise(placement) {
            var counter =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : false

            var index = validPlacements.indexOf(placement)
            var arr = validPlacements
              .slice(index + 1)
              .concat(validPlacements.slice(0, index))
            return counter ? arr.reverse() : arr
          }

          var BEHAVIORS = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by update method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function flip(data, options) {
            // if `inner` modifier is enabled, we can't use the `flip` modifier
            if (isModifierEnabled(data.instance.modifiers, 'inner')) {
              return data
            }

            if (data.flipped && data.placement === data.originalPlacement) {
              // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
              return data
            }

            var boundaries = getBoundaries(
              data.instance.popper,
              data.instance.reference,
              options.padding,
              options.boundariesElement,
              data.positionFixed
            )

            var placement = data.placement.split('-')[0]
            var placementOpposite = getOppositePlacement(placement)
            var variation = data.placement.split('-')[1] || ''

            var flipOrder = []

            switch (options.behavior) {
              case BEHAVIORS.FLIP:
                flipOrder = [placement, placementOpposite]
                break
              case BEHAVIORS.CLOCKWISE:
                flipOrder = clockwise(placement)
                break
              case BEHAVIORS.COUNTERCLOCKWISE:
                flipOrder = clockwise(placement, true)
                break
              default:
                flipOrder = options.behavior
            }

            flipOrder.forEach(function(step, index) {
              if (placement !== step || flipOrder.length === index + 1) {
                return data
              }

              placement = data.placement.split('-')[0]
              placementOpposite = getOppositePlacement(placement)

              var popperOffsets = data.offsets.popper
              var refOffsets = data.offsets.reference

              // using floor because the reference offsets may contain decimals we are not going to consider here
              var floor = Math.floor
              var overlapsRef =
                (placement === 'left' &&
                  floor(popperOffsets.right) > floor(refOffsets.left)) ||
                (placement === 'right' &&
                  floor(popperOffsets.left) < floor(refOffsets.right)) ||
                (placement === 'top' &&
                  floor(popperOffsets.bottom) > floor(refOffsets.top)) ||
                (placement === 'bottom' &&
                  floor(popperOffsets.top) < floor(refOffsets.bottom))

              var overflowsLeft =
                floor(popperOffsets.left) < floor(boundaries.left)
              var overflowsRight =
                floor(popperOffsets.right) > floor(boundaries.right)
              var overflowsTop =
                floor(popperOffsets.top) < floor(boundaries.top)
              var overflowsBottom =
                floor(popperOffsets.bottom) > floor(boundaries.bottom)

              var overflowsBoundaries =
                (placement === 'left' && overflowsLeft) ||
                (placement === 'right' && overflowsRight) ||
                (placement === 'top' && overflowsTop) ||
                (placement === 'bottom' && overflowsBottom)

              // flip the variation if required
              var isVertical = ['top', 'bottom'].indexOf(placement) !== -1
              var flippedVariation =
                !!options.flipVariations &&
                ((isVertical && variation === 'start' && overflowsLeft) ||
                  (isVertical && variation === 'end' && overflowsRight) ||
                  (!isVertical && variation === 'start' && overflowsTop) ||
                  (!isVertical && variation === 'end' && overflowsBottom))

              if (overlapsRef || overflowsBoundaries || flippedVariation) {
                // this boolean to detect any flip loop
                data.flipped = true

                if (overlapsRef || overflowsBoundaries) {
                  placement = flipOrder[index + 1]
                }

                if (flippedVariation) {
                  variation = getOppositeVariation(variation)
                }

                data.placement = placement + (variation ? '-' + variation : '')

                // this object contains `position`, we want to preserve it along with
                // any additional property we may add in the future
                data.offsets.popper = _extends$1(
                  {},
                  data.offsets.popper,
                  getPopperOffsets(
                    data.instance.popper,
                    data.offsets.reference,
                    data.placement
                  )
                )

                data = runModifiers(data.instance.modifiers, data, 'flip')
              }
            })
            return data
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by update method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function keepTogether(data) {
            var _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference

            var placement = data.placement.split('-')[0]
            var floor = Math.floor
            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1
            var side = isVertical ? 'right' : 'bottom'
            var opSide = isVertical ? 'left' : 'top'
            var measurement = isVertical ? 'width' : 'height'

            if (popper[side] < floor(reference[opSide])) {
              data.offsets.popper[opSide] =
                floor(reference[opSide]) - popper[measurement]
            }
            if (popper[opSide] > floor(reference[side])) {
              data.offsets.popper[opSide] = floor(reference[side])
            }

            return data
          }

          /**
           * Converts a string containing value + unit into a px value number
           * @function
           * @memberof {modifiers~offset}
           * @private
           * @argument {String} str - Value + unit string
           * @argument {String} measurement - `height` or `width`
           * @argument {Object} popperOffsets
           * @argument {Object} referenceOffsets
           * @returns {Number|String}
           * Value in pixels, or original string if no values were extracted
           */
          function toValue(str, measurement, popperOffsets, referenceOffsets) {
            // separate value from unit
            var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
            var value = +split[1]
            var unit = split[2]

            // If it's not a number it's an operator, I guess
            if (!value) {
              return str
            }

            if (unit.indexOf('%') === 0) {
              var element = void 0
              switch (unit) {
                case '%p':
                  element = popperOffsets
                  break
                case '%':
                case '%r':
                default:
                  element = referenceOffsets
              }

              var rect = getClientRect(element)
              return (rect[measurement] / 100) * value
            } else if (unit === 'vh' || unit === 'vw') {
              // if is a vh or vw, we calculate the size based on the viewport
              var size = void 0
              if (unit === 'vh') {
                size = Math.max(
                  document.documentElement.clientHeight,
                  window.innerHeight || 0
                )
              } else {
                size = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0
                )
              }
              return (size / 100) * value
            } else {
              // if is an explicit pixel unit, we get rid of the unit and keep the value
              // if is an implicit unit, it's px, and we return just the value
              return value
            }
          }

          /**
           * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
           * @function
           * @memberof {modifiers~offset}
           * @private
           * @argument {String} offset
           * @argument {Object} popperOffsets
           * @argument {Object} referenceOffsets
           * @argument {String} basePlacement
           * @returns {Array} a two cells array with x and y offsets in numbers
           */
          function parseOffset(
            offset,
            popperOffsets,
            referenceOffsets,
            basePlacement
          ) {
            var offsets = [0, 0]

            // Use height if placement is left or right and index is 0 otherwise use width
            // in this way the first offset will use an axis and the second one
            // will use the other one
            var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1

            // Split the offset string to obtain a list of values and operands
            // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
            var fragments = offset.split(/(\+|\-)/).map(function(frag) {
              return frag.trim()
            })

            // Detect if the offset string contains a pair of values or a single one
            // they could be separated by comma or space
            var divider = fragments.indexOf(
              find(fragments, function(frag) {
                return frag.search(/,|\s/) !== -1
              })
            )

            if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
              console.warn(
                'Offsets separated by white space(s) are deprecated, use a comma (,) instead.'
              )
            }

            // If divider is found, we divide the list of values and operands to divide
            // them by ofset X and Y.
            var splitRegex = /\s*,\s*|\s+/
            var ops =
              divider !== -1
                ? [
                    fragments
                      .slice(0, divider)
                      .concat([fragments[divider].split(splitRegex)[0]]),
                    [fragments[divider].split(splitRegex)[1]].concat(
                      fragments.slice(divider + 1)
                    )
                  ]
                : [fragments]

            // Convert the values with units to absolute pixels to allow our computations
            ops = ops.map(function(op, index) {
              // Most of the units rely on the orientation of the popper
              var measurement = (index === 1
              ? !useHeight
              : useHeight)
                ? 'height'
                : 'width'
              var mergeWithPrevious = false
              return (
                op
                  // This aggregates any `+` or `-` sign that aren't considered operators
                  // e.g.: 10 + +5 => [10, +, +5]
                  .reduce(function(a, b) {
                    if (
                      a[a.length - 1] === '' &&
                      ['+', '-'].indexOf(b) !== -1
                    ) {
                      a[a.length - 1] = b
                      mergeWithPrevious = true
                      return a
                    } else if (mergeWithPrevious) {
                      a[a.length - 1] += b
                      mergeWithPrevious = false
                      return a
                    } else {
                      return a.concat(b)
                    }
                  }, [])
                  // Here we convert the string values into number values (in px)
                  .map(function(str) {
                    return toValue(
                      str,
                      measurement,
                      popperOffsets,
                      referenceOffsets
                    )
                  })
              )
            })

            // Loop trough the offsets arrays and execute the operations
            ops.forEach(function(op, index) {
              op.forEach(function(frag, index2) {
                if (isNumeric(frag)) {
                  offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1)
                }
              })
            })
            return offsets
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by update method
           * @argument {Object} options - Modifiers configuration and options
           * @argument {Number|String} options.offset=0
           * The offset value as described in the modifier description
           * @returns {Object} The data object, properly modified
           */
          function offset(data, _ref) {
            var offset = _ref.offset
            var placement = data.placement,
              _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference

            var basePlacement = placement.split('-')[0]

            var offsets = void 0
            if (isNumeric(+offset)) {
              offsets = [+offset, 0]
            } else {
              offsets = parseOffset(offset, popper, reference, basePlacement)
            }

            if (basePlacement === 'left') {
              popper.top += offsets[0]
              popper.left -= offsets[1]
            } else if (basePlacement === 'right') {
              popper.top += offsets[0]
              popper.left += offsets[1]
            } else if (basePlacement === 'top') {
              popper.left += offsets[0]
              popper.top -= offsets[1]
            } else if (basePlacement === 'bottom') {
              popper.left += offsets[0]
              popper.top += offsets[1]
            }

            data.popper = popper
            return data
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by `update` method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function preventOverflow(data, options) {
            var boundariesElement =
              options.boundariesElement || getOffsetParent(data.instance.popper)

            // If offsetParent is the reference element, we really want to
            // go one step up and use the next offsetParent as reference to
            // avoid to make this modifier completely useless and look like broken
            if (data.instance.reference === boundariesElement) {
              boundariesElement = getOffsetParent(boundariesElement)
            }

            // NOTE: DOM access here
            // resets the popper's position so that the document size can be calculated excluding
            // the size of the popper element itself
            var transformProp = getSupportedPropertyName('transform')
            var popperStyles = data.instance.popper.style // assignment to help minification
            var top = popperStyles.top,
              left = popperStyles.left,
              transform = popperStyles[transformProp]

            popperStyles.top = ''
            popperStyles.left = ''
            popperStyles[transformProp] = ''

            var boundaries = getBoundaries(
              data.instance.popper,
              data.instance.reference,
              options.padding,
              boundariesElement,
              data.positionFixed
            )

            // NOTE: DOM access here
            // restores the original style properties after the offsets have been computed
            popperStyles.top = top
            popperStyles.left = left
            popperStyles[transformProp] = transform

            options.boundaries = boundaries

            var order = options.priority
            var popper = data.offsets.popper

            var check = {
              primary: function primary(placement) {
                var value = popper[placement]
                if (
                  popper[placement] < boundaries[placement] &&
                  !options.escapeWithReference
                ) {
                  value = Math.max(popper[placement], boundaries[placement])
                }
                return defineProperty$1({}, placement, value)
              },
              secondary: function secondary(placement) {
                var mainSide = placement === 'right' ? 'left' : 'top'
                var value = popper[mainSide]
                if (
                  popper[placement] > boundaries[placement] &&
                  !options.escapeWithReference
                ) {
                  value = Math.min(
                    popper[mainSide],
                    boundaries[placement] -
                      (placement === 'right' ? popper.width : popper.height)
                  )
                }
                return defineProperty$1({}, mainSide, value)
              }
            }

            order.forEach(function(placement) {
              var side =
                ['left', 'top'].indexOf(placement) !== -1
                  ? 'primary'
                  : 'secondary'
              popper = _extends$1({}, popper, check[side](placement))
            })

            data.offsets.popper = popper

            return data
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by `update` method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function shift(data) {
            var placement = data.placement
            var basePlacement = placement.split('-')[0]
            var shiftvariation = placement.split('-')[1]

            // if shift shiftvariation is specified, run the modifier
            if (shiftvariation) {
              var _data$offsets = data.offsets,
                reference = _data$offsets.reference,
                popper = _data$offsets.popper

              var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1
              var side = isVertical ? 'left' : 'top'
              var measurement = isVertical ? 'width' : 'height'

              var shiftOffsets = {
                start: defineProperty$1({}, side, reference[side]),
                end: defineProperty$1(
                  {},
                  side,
                  reference[side] + reference[measurement] - popper[measurement]
                )
              }

              data.offsets.popper = _extends$1(
                {},
                popper,
                shiftOffsets[shiftvariation]
              )
            }

            return data
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by update method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function hide(data) {
            if (
              !isModifierRequired(
                data.instance.modifiers,
                'hide',
                'preventOverflow'
              )
            ) {
              return data
            }

            var refRect = data.offsets.reference
            var bound = find(data.instance.modifiers, function(modifier) {
              return modifier.name === 'preventOverflow'
            }).boundaries

            if (
              refRect.bottom < bound.top ||
              refRect.left > bound.right ||
              refRect.top > bound.bottom ||
              refRect.right < bound.left
            ) {
              // Avoid unnecessary DOM access if visibility hasn't changed
              if (data.hide === true) {
                return data
              }

              data.hide = true
              data.attributes['x-out-of-boundaries'] = ''
            } else {
              // Avoid unnecessary DOM access if visibility hasn't changed
              if (data.hide === false) {
                return data
              }

              data.hide = false
              data.attributes['x-out-of-boundaries'] = false
            }

            return data
          }

          /**
           * @function
           * @memberof Modifiers
           * @argument {Object} data - The data object generated by `update` method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {Object} The data object, properly modified
           */
          function inner(data) {
            var placement = data.placement
            var basePlacement = placement.split('-')[0]
            var _data$offsets = data.offsets,
              popper = _data$offsets.popper,
              reference = _data$offsets.reference

            var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1

            var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1

            popper[isHoriz ? 'left' : 'top'] =
              reference[basePlacement] -
              (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0)

            data.placement = getOppositePlacement(placement)
            data.offsets.popper = getClientRect(popper)

            return data
          }

          /**
           * Modifier function, each modifier can have a function of this type assigned
           * to its `fn` property.<br />
           * These functions will be called on each update, this means that you must
           * make sure they are performant enough to avoid performance bottlenecks.
           *
           * @function ModifierFn
           * @argument {dataObject} data - The data object generated by `update` method
           * @argument {Object} options - Modifiers configuration and options
           * @returns {dataObject} The data object, properly modified
           */

          /**
           * Modifiers are plugins used to alter the behavior of your poppers.<br />
           * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
           * needed by the library.
           *
           * Usually you don't want to override the `order`, `fn` and `onLoad` props.
           * All the other properties are configurations that could be tweaked.
           * @namespace modifiers
           */
          var modifiers = {
            /**
             * Modifier used to shift the popper on the start or end of its reference
             * element.<br />
             * It will read the variation of the `placement` property.<br />
             * It can be one either `-end` or `-start`.
             * @memberof modifiers
             * @inner
             */
            shift: {
              /** @prop {number} order=100 - Index used to define the order of execution */
              order: 100,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: shift
            },

            /**
             * The `offset` modifier can shift your popper on both its axis.
             *
             * It accepts the following units:
             * - `px` or unit-less, interpreted as pixels
             * - `%` or `%r`, percentage relative to the length of the reference element
             * - `%p`, percentage relative to the length of the popper element
             * - `vw`, CSS viewport width unit
             * - `vh`, CSS viewport height unit
             *
             * For length is intended the main axis relative to the placement of the popper.<br />
             * This means that if the placement is `top` or `bottom`, the length will be the
             * `width`. In case of `left` or `right`, it will be the `height`.
             *
             * You can provide a single value (as `Number` or `String`), or a pair of values
             * as `String` divided by a comma or one (or more) white spaces.<br />
             * The latter is a deprecated method because it leads to confusion and will be
             * removed in v2.<br />
             * Additionally, it accepts additions and subtractions between different units.
             * Note that multiplications and divisions aren't supported.
             *
             * Valid examples are:
             * ```
             * 10
             * '10%'
             * '10, 10'
             * '10%, 10'
             * '10 + 10%'
             * '10 - 5vh + 3%'
             * '-10px + 5vh, 5px - 6%'
             * ```
             * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
             * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
             * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
             *
             * @memberof modifiers
             * @inner
             */
            offset: {
              /** @prop {number} order=200 - Index used to define the order of execution */
              order: 200,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: offset,
              /** @prop {Number|String} offset=0
               * The offset value as described in the modifier description
               */
              offset: 0
            },

            /**
             * Modifier used to prevent the popper from being positioned outside the boundary.
             *
             * A scenario exists where the reference itself is not within the boundaries.<br />
             * We can say it has "escaped the boundaries" — or just "escaped".<br />
             * In this case we need to decide whether the popper should either:
             *
             * - detach from the reference and remain "trapped" in the boundaries, or
             * - if it should ignore the boundary and "escape with its reference"
             *
             * When `escapeWithReference` is set to`true` and reference is completely
             * outside its boundaries, the popper will overflow (or completely leave)
             * the boundaries in order to remain attached to the edge of the reference.
             *
             * @memberof modifiers
             * @inner
             */
            preventOverflow: {
              /** @prop {number} order=300 - Index used to define the order of execution */
              order: 300,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: preventOverflow,
              /**
               * @prop {Array} [priority=['left','right','top','bottom']]
               * Popper will try to prevent overflow following these priorities by default,
               * then, it could overflow on the left and on top of the `boundariesElement`
               */
              priority: ['left', 'right', 'top', 'bottom'],
              /**
               * @prop {number} padding=5
               * Amount of pixel used to define a minimum distance between the boundaries
               * and the popper. This makes sure the popper always has a little padding
               * between the edges of its container
               */
              padding: 5,
              /**
               * @prop {String|HTMLElement} boundariesElement='scrollParent'
               * Boundaries used by the modifier. Can be `scrollParent`, `window`,
               * `viewport` or any DOM element.
               */
              boundariesElement: 'scrollParent'
            },

            /**
             * Modifier used to make sure the reference and its popper stay near each other
             * without leaving any gap between the two. Especially useful when the arrow is
             * enabled and you want to ensure that it points to its reference element.
             * It cares only about the first axis. You can still have poppers with margin
             * between the popper and its reference element.
             * @memberof modifiers
             * @inner
             */
            keepTogether: {
              /** @prop {number} order=400 - Index used to define the order of execution */
              order: 400,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: keepTogether
            },

            /**
             * This modifier is used to move the `arrowElement` of the popper to make
             * sure it is positioned between the reference element and its popper element.
             * It will read the outer size of the `arrowElement` node to detect how many
             * pixels of conjunction are needed.
             *
             * It has no effect if no `arrowElement` is provided.
             * @memberof modifiers
             * @inner
             */
            arrow: {
              /** @prop {number} order=500 - Index used to define the order of execution */
              order: 500,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: arrow,
              /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
              element: '[x-arrow]'
            },

            /**
             * Modifier used to flip the popper's placement when it starts to overlap its
             * reference element.
             *
             * Requires the `preventOverflow` modifier before it in order to work.
             *
             * **NOTE:** this modifier will interrupt the current update cycle and will
             * restart it if it detects the need to flip the placement.
             * @memberof modifiers
             * @inner
             */
            flip: {
              /** @prop {number} order=600 - Index used to define the order of execution */
              order: 600,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: flip,
              /**
               * @prop {String|Array} behavior='flip'
               * The behavior used to change the popper's placement. It can be one of
               * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
               * placements (with optional variations)
               */
              behavior: 'flip',
              /**
               * @prop {number} padding=5
               * The popper will flip if it hits the edges of the `boundariesElement`
               */
              padding: 5,
              /**
               * @prop {String|HTMLElement} boundariesElement='viewport'
               * The element which will define the boundaries of the popper position.
               * The popper will never be placed outside of the defined boundaries
               * (except if `keepTogether` is enabled)
               */
              boundariesElement: 'viewport'
            },

            /**
             * Modifier used to make the popper flow toward the inner of the reference element.
             * By default, when this modifier is disabled, the popper will be placed outside
             * the reference element.
             * @memberof modifiers
             * @inner
             */
            inner: {
              /** @prop {number} order=700 - Index used to define the order of execution */
              order: 700,
              /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
              enabled: false,
              /** @prop {ModifierFn} */
              fn: inner
            },

            /**
             * Modifier used to hide the popper when its reference element is outside of the
             * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
             * be used to hide with a CSS selector the popper when its reference is
             * out of boundaries.
             *
             * Requires the `preventOverflow` modifier before it in order to work.
             * @memberof modifiers
             * @inner
             */
            hide: {
              /** @prop {number} order=800 - Index used to define the order of execution */
              order: 800,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: hide
            },

            /**
             * Computes the style that will be applied to the popper element to gets
             * properly positioned.
             *
             * Note that this modifier will not touch the DOM, it just prepares the styles
             * so that `applyStyle` modifier can apply it. This separation is useful
             * in case you need to replace `applyStyle` with a custom implementation.
             *
             * This modifier has `850` as `order` value to maintain backward compatibility
             * with previous versions of Popper.js. Expect the modifiers ordering method
             * to change in future major versions of the library.
             *
             * @memberof modifiers
             * @inner
             */
            computeStyle: {
              /** @prop {number} order=850 - Index used to define the order of execution */
              order: 850,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: computeStyle,
              /**
               * @prop {Boolean} gpuAcceleration=true
               * If true, it uses the CSS 3D transformation to position the popper.
               * Otherwise, it will use the `top` and `left` properties
               */
              gpuAcceleration: true,
              /**
               * @prop {string} [x='bottom']
               * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
               * Change this if your popper should grow in a direction different from `bottom`
               */
              x: 'bottom',
              /**
               * @prop {string} [x='left']
               * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
               * Change this if your popper should grow in a direction different from `right`
               */
              y: 'right'
            },

            /**
             * Applies the computed styles to the popper element.
             *
             * All the DOM manipulations are limited to this modifier. This is useful in case
             * you want to integrate Popper.js inside a framework or view library and you
             * want to delegate all the DOM manipulations to it.
             *
             * Note that if you disable this modifier, you must make sure the popper element
             * has its position set to `absolute` before Popper.js can do its work!
             *
             * Just disable this modifier and define your own to achieve the desired effect.
             *
             * @memberof modifiers
             * @inner
             */
            applyStyle: {
              /** @prop {number} order=900 - Index used to define the order of execution */
              order: 900,
              /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
              enabled: true,
              /** @prop {ModifierFn} */
              fn: applyStyle,
              /** @prop {Function} */
              onLoad: applyStyleOnLoad,
              /**
               * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
               * @prop {Boolean} gpuAcceleration=true
               * If true, it uses the CSS 3D transformation to position the popper.
               * Otherwise, it will use the `top` and `left` properties
               */
              gpuAcceleration: undefined
            }
          }

          /**
           * The `dataObject` is an object containing all the information used by Popper.js.
           * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
           * @name dataObject
           * @property {Object} data.instance The Popper.js instance
           * @property {String} data.placement Placement applied to popper
           * @property {String} data.originalPlacement Placement originally defined on init
           * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
           * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
           * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
           * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
           * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
           * @property {Object} data.boundaries Offsets of the popper boundaries
           * @property {Object} data.offsets The measurements of popper, reference and arrow elements
           * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
           * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
           * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
           */

          /**
           * Default options provided to Popper.js constructor.<br />
           * These can be overridden using the `options` argument of Popper.js.<br />
           * To override an option, simply pass an object with the same
           * structure of the `options` object, as the 3rd argument. For example:
           * ```
           * new Popper(ref, pop, {
           *   modifiers: {
           *     preventOverflow: { enabled: false }
           *   }
           * })
           * ```
           * @type {Object}
           * @static
           * @memberof Popper
           */
          var Defaults$1 = {
            /**
             * Popper's placement.
             * @prop {Popper.placements} placement='bottom'
             */
            placement: 'bottom',

            /**
             * Set this to true if you want popper to position it self in 'fixed' mode
             * @prop {Boolean} positionFixed=false
             */
            positionFixed: false,

            /**
             * Whether events (resize, scroll) are initially enabled.
             * @prop {Boolean} eventsEnabled=true
             */
            eventsEnabled: true,

            /**
             * Set to true if you want to automatically remove the popper when
             * you call the `destroy` method.
             * @prop {Boolean} removeOnDestroy=false
             */
            removeOnDestroy: false,

            /**
             * Callback called when the popper is created.<br />
             * By default, it is set to no-op.<br />
             * Access Popper.js instance with `data.instance`.
             * @prop {onCreate}
             */
            onCreate: function onCreate() {},

            /**
             * Callback called when the popper is updated. This callback is not called
             * on the initialization/creation of the popper, but only on subsequent
             * updates.<br />
             * By default, it is set to no-op.<br />
             * Access Popper.js instance with `data.instance`.
             * @prop {onUpdate}
             */
            onUpdate: function onUpdate() {},

            /**
             * List of modifiers used to modify the offsets before they are applied to the popper.
             * They provide most of the functionalities of Popper.js.
             * @prop {modifiers}
             */
            modifiers: modifiers
          }

          /**
           * @callback onCreate
           * @param {dataObject} data
           */

          /**
           * @callback onUpdate
           * @param {dataObject} data
           */

          // Utils
          // Methods
          var Popper = (function() {
            /**
             * Creates a new Popper.js instance.
             * @class Popper
             * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
             * @param {HTMLElement} popper - The HTML element used as the popper
             * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
             * @return {Object} instance - The generated Popper.js instance
             */
            function Popper(reference, popper) {
              var _this = this

              var options =
                arguments.length > 2 && arguments[2] !== undefined
                  ? arguments[2]
                  : {}
              classCallCheck$1(this, Popper)

              this.scheduleUpdate = function() {
                return requestAnimationFrame(_this.update)
              }

              // make update() debounced, so that it only runs at most once-per-tick
              this.update = debounce(this.update.bind(this))

              // with {} we create a new object with the options inside it
              this.options = _extends$1({}, Popper.Defaults, options)

              // init state
              this.state = {
                isDestroyed: false,
                isCreated: false,
                scrollParents: []
              }

              // get reference and popper elements (allow jQuery wrappers)
              this.reference =
                reference && reference.jquery ? reference[0] : reference
              this.popper = popper && popper.jquery ? popper[0] : popper

              // Deep merge modifiers options
              this.options.modifiers = {}
              Object.keys(
                _extends$1({}, Popper.Defaults.modifiers, options.modifiers)
              ).forEach(function(name) {
                _this.options.modifiers[name] = _extends$1(
                  {},
                  Popper.Defaults.modifiers[name] || {},
                  options.modifiers ? options.modifiers[name] : {}
                )
              })

              // Refactoring modifiers' list (Object => Array)
              this.modifiers = Object.keys(this.options.modifiers)
                .map(function(name) {
                  return _extends$1(
                    {
                      name: name
                    },
                    _this.options.modifiers[name]
                  )
                })
                // sort the modifiers by order
                .sort(function(a, b) {
                  return a.order - b.order
                })

              // modifiers have the ability to execute arbitrary code when Popper.js get inited
              // such code is executed in the same order of its modifier
              // they could add new properties to their options configuration
              // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
              this.modifiers.forEach(function(modifierOptions) {
                if (
                  modifierOptions.enabled &&
                  isFunction(modifierOptions.onLoad)
                ) {
                  modifierOptions.onLoad(
                    _this.reference,
                    _this.popper,
                    _this.options,
                    modifierOptions,
                    _this.state
                  )
                }
              })

              // fire the first update to position the popper in the right place
              this.update()

              var eventsEnabled = this.options.eventsEnabled
              if (eventsEnabled) {
                // setup event listeners, they will take care of update the position in specific situations
                this.enableEventListeners()
              }

              this.state.eventsEnabled = eventsEnabled
            }

            // We can't use class properties because they don't get listed in the
            // class prototype and break stuff like Sinon stubs

            createClass$1(Popper, [
              {
                key: 'update',
                value: function update$$1() {
                  return update.call(this)
                }
              },
              {
                key: 'destroy',
                value: function destroy$$1() {
                  return destroy.call(this)
                }
              },
              {
                key: 'enableEventListeners',
                value: function enableEventListeners$$1() {
                  return enableEventListeners.call(this)
                }
              },
              {
                key: 'disableEventListeners',
                value: function disableEventListeners$$1() {
                  return disableEventListeners.call(this)
                }

                /**
                 * Schedules an update. It will run on the next UI update available.
                 * @method scheduleUpdate
                 * @memberof Popper
                 */

                /**
                 * Collection of utilities useful when writing custom modifiers.
                 * Starting from version 1.7, this method is available only if you
                 * include `popper-utils.js` before `popper.js`.
                 *
                 * **DEPRECATION**: This way to access PopperUtils is deprecated
                 * and will be removed in v2! Use the PopperUtils module directly instead.
                 * Due to the high instability of the methods contained in Utils, we can't
                 * guarantee them to follow semver. Use them at your own risk!
                 * @static
                 * @private
                 * @type {Object}
                 * @deprecated since version 1.8
                 * @member Utils
                 * @memberof Popper
                 */
              }
            ])
            return Popper
          })()

          /**
           * The `referenceObject` is an object that provides an interface compatible with Popper.js
           * and lets you use it as replacement of a real DOM node.<br />
           * You can use this method to position a popper relatively to a set of coordinates
           * in case you don't have a DOM node to use as reference.
           *
           * ```
           * new Popper(referenceObject, popperNode);
           * ```
           *
           * NB: This feature isn't supported in Internet Explorer 10.
           * @name referenceObject
           * @property {Function} data.getBoundingClientRect
           * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
           * @property {number} data.clientWidth
           * An ES6 getter that will return the width of the virtual reference element.
           * @property {number} data.clientHeight
           * An ES6 getter that will return the height of the virtual reference element.
           */

          Popper.Utils = (typeof window !== 'undefined'
            ? window
            : global
          ).PopperUtils
          Popper.placements = placements
          Popper.Defaults = Defaults$1

          var Selectors = {
            POPPER: '.tippy-popper',
            TOOLTIP: '.tippy-tooltip',
            CONTENT: '.tippy-content',
            BACKDROP: '.tippy-backdrop',
            ARROW: '.tippy-arrow',
            ROUND_ARROW: '.tippy-roundarrow'
          }

          /**
           * Firefox extensions doesn't allow 'innerHTML' to be set but we can trick it
           * + aid for minifiers not to remove the trick
           */
          var FF_EXTENSION_TRICK = {
            x: true

            /**
             * Determines if the runtime is a browser
             */
          }
          var isBrowser$1 = typeof window !== 'undefined'

          /**
           * Determines if the browser is supported
           */

          /**
           * Injects a string of CSS styles to the style node in the document head
           */

          /**
           * Ponyfill for Array.from; converts iterable values to an array
           */
          var toArray$1 = function toArray$$1(value) {
            return [].slice.call(value)
          }

          /**
           * Sets the content of a tooltip
           */
          var setContent = function setContent(contentEl, props) {
            if (props.content instanceof Element) {
              setInnerHTML(contentEl, '')
              contentEl.appendChild(props.content)
            } else {
              contentEl[props.allowHTML ? 'innerHTML' : 'textContent'] =
                props.content
            }
          }

          /**
           * Determines if an element can receive focus
           */
          var elementCanReceiveFocus = function elementCanReceiveFocus(el) {
            return el instanceof Element
              ? matches.call(
                  el,
                  'a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]'
                ) && !el.hasAttribute('disabled')
              : true
          }

          /**
           * Applies a transition duration to a list of elements
           */
          var applyTransitionDuration = function applyTransitionDuration(
            els,
            value
          ) {
            els.filter(Boolean).forEach(function(el) {
              el.style.transitionDuration = value + 'ms'
            })
          }

          /**
           * Returns the child elements of a popper element
           */
          var getChildren = function getChildren(popper) {
            var select = function select(s) {
              return popper.querySelector(s)
            }
            return {
              tooltip: select(Selectors.TOOLTIP),
              backdrop: select(Selectors.BACKDROP),
              content: select(Selectors.CONTENT),
              arrow: select(Selectors.ARROW) || select(Selectors.ROUND_ARROW)
            }
          }

          /**
           * Determines if a value is a plain object
           */
          var isPlainObject = function isPlainObject(value) {
            return {}.toString.call(value) === '[object Object]'
          }

          /**
           * Creates and returns a div element
           */
          var div = function div() {
            return document.createElement('div')
          }

          /**
           * Sets the innerHTML of an element while tricking linters & minifiers
           */
          var setInnerHTML = function setInnerHTML(el, html) {
            el[FF_EXTENSION_TRICK.x && 'innerHTML'] =
              html instanceof Element
                ? html[FF_EXTENSION_TRICK.x && 'innerHTML']
                : html
          }

          /**
           * Returns an array of elements based on the value
           */
          var getArrayOfElements = function getArrayOfElements(value) {
            if (value instanceof Element || isPlainObject(value)) {
              return [value]
            }
            if (value instanceof NodeList) {
              return toArray$1(value)
            }
            if (Array.isArray(value)) {
              return value
            }

            try {
              return toArray$1(document.querySelectorAll(value))
            } catch (e) {
              return []
            }
          }

          /**
           * Determines if a value is numeric
           */
          var isNumeric$1 = function isNumeric(value) {
            return !isNaN(value) && !isNaN(parseFloat(value))
          }

          /**
           * Returns a value at a given index depending on if it's an array or number
           */
          var getValue = function getValue(value, index, defaultValue) {
            if (Array.isArray(value)) {
              var v = value[index]
              return v == null ? defaultValue : v
            }
            return value
          }

          /**
           * Creates an arrow element and returns it
           */
          var createArrowElement = function createArrowElement(arrowType) {
            var arrow = div()
            if (arrowType === 'round') {
              arrow.className = 'tippy-roundarrow'
              setInnerHTML(
                arrow,
                '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>'
              )
            } else {
              arrow.className = 'tippy-arrow'
            }
            return arrow
          }

          /**
           * Creates a backdrop element and returns it
           */
          var createBackdropElement = function createBackdropElement() {
            var backdrop = div()
            backdrop.className = 'tippy-backdrop'
            backdrop.setAttribute('data-state', 'hidden')
            return backdrop
          }

          /**
           * Adds interactive attributes
           */
          var addInteractive = function addInteractive(popper, tooltip) {
            popper.setAttribute('tabindex', '-1')
            tooltip.setAttribute('data-interactive', '')
          }

          /**
           * Removes interactive attributes
           */
          var removeInteractive = function removeInteractive(popper, tooltip) {
            popper.removeAttribute('tabindex')
            tooltip.removeAttribute('data-interactive')
          }

          /**
           * Adds inertia attribute
           */
          var addInertia = function addInertia(tooltip) {
            tooltip.setAttribute('data-inertia', '')
          }

          /**
           * Removes inertia attribute
           */
          var removeInertia = function removeInertia(tooltip) {
            tooltip.removeAttribute('data-inertia')
          }

          /**
           * Constructs the popper element and returns it
           */
          var createPopperElement = function createPopperElement(id, props) {
            var popper = div()
            popper.className = 'tippy-popper'
            popper.setAttribute('role', 'tooltip')
            popper.id = 'tippy-' + id
            popper.style.zIndex = props.zIndex

            var tooltip = div()
            tooltip.className = 'tippy-tooltip'
            tooltip.setAttribute('data-size', props.size)
            tooltip.setAttribute('data-animation', props.animation)
            tooltip.setAttribute('data-state', 'hidden')
            props.theme.split(' ').forEach(function(t) {
              tooltip.classList.add(t + '-theme')
            })

            var content = div()
            content.className = 'tippy-content'

            if (props.interactive) {
              addInteractive(popper, tooltip)
            }

            if (props.arrow) {
              tooltip.appendChild(createArrowElement(props.arrowType))
            }

            if (props.animateFill) {
              tooltip.appendChild(createBackdropElement())
              tooltip.setAttribute('data-animatefill', '')
            }

            if (props.inertia) {
              tooltip.setAttribute('data-inertia', '')
            }

            setContent(content, props)

            tooltip.appendChild(content)
            popper.appendChild(tooltip)

            popper.addEventListener('focusout', function(e) {
              if (
                e.relatedTarget &&
                popper._tippy &&
                !closestCallback(e.relatedTarget, function(el) {
                  return el === popper
                }) &&
                popper._tippy.props.shouldPopperHideOnBlur(e)
              ) {
                popper._tippy.hide()
              }
            })

            return popper
          }

          /**
           * Updates the popper element based on the new props
           */
          var updatePopperElement = function updatePopperElement(
            popper,
            prevProps,
            nextProps
          ) {
            var _getChildren = getChildren(popper),
              tooltip = _getChildren.tooltip,
              content = _getChildren.content,
              backdrop = _getChildren.backdrop,
              arrow = _getChildren.arrow

            popper.style.zIndex = nextProps.zIndex
            tooltip.setAttribute('data-size', nextProps.size)
            tooltip.setAttribute('data-animation', nextProps.animation)

            if (prevProps.content !== nextProps.content) {
              setContent(content, nextProps)
            }

            // animateFill
            if (!prevProps.animateFill && nextProps.animateFill) {
              tooltip.appendChild(createBackdropElement())
              tooltip.setAttribute('data-animatefill', '')
            } else if (prevProps.animateFill && !nextProps.animateFill) {
              tooltip.removeChild(backdrop)
              tooltip.removeAttribute('data-animatefill')
            }

            // arrow
            if (!prevProps.arrow && nextProps.arrow) {
              tooltip.appendChild(createArrowElement(nextProps.arrowType))
            } else if (prevProps.arrow && !nextProps.arrow) {
              tooltip.removeChild(arrow)
            }

            // arrowType
            if (
              prevProps.arrow &&
              nextProps.arrow &&
              prevProps.arrowType !== nextProps.arrowType
            ) {
              tooltip.replaceChild(
                createArrowElement(nextProps.arrowType),
                arrow
              )
            }

            // interactive
            if (!prevProps.interactive && nextProps.interactive) {
              addInteractive(popper, tooltip)
            } else if (prevProps.interactive && !nextProps.interactive) {
              removeInteractive(popper, tooltip)
            }

            // inertia
            if (!prevProps.inertia && nextProps.inertia) {
              addInertia(tooltip)
            } else if (prevProps.inertia && !nextProps.inertia) {
              removeInertia(tooltip)
            }

            // theme
            if (prevProps.theme !== nextProps.theme) {
              prevProps.theme.split(' ').forEach(function(theme) {
                tooltip.classList.remove(theme + '-theme')
              })
              nextProps.theme.split(' ').forEach(function(theme) {
                tooltip.classList.add(theme + '-theme')
              })
            }
          }

          /**
           * Hides all visible poppers on the document
           */
          var hideAllPoppers = function hideAllPoppers(excludeTippy) {
            toArray$1(document.querySelectorAll(Selectors.POPPER)).forEach(
              function(popper) {
                var tip = popper._tippy
                if (
                  tip &&
                  tip.props.hideOnClick === true &&
                  (!excludeTippy || popper !== excludeTippy.popper)
                ) {
                  tip.hide()
                }
              }
            )
          }

          /**
           * Returns an object of optional props from data-tippy-* attributes
           */
          var getDataAttributeOptions = function getDataAttributeOptions(
            reference
          ) {
            return Object.keys(Defaults).reduce(function(acc, key) {
              var valueAsString = (
                reference.getAttribute('data-tippy-' + key) || ''
              ).trim()

              if (!valueAsString) {
                return acc
              }

              if (valueAsString === 'true') {
                acc[key] = true
              } else if (valueAsString === 'false') {
                acc[key] = false
              } else if (isNumeric$1(valueAsString)) {
                acc[key] = Number(valueAsString)
              } else if (key !== 'target' && valueAsString[0] === '[') {
                acc[key] = JSON.parse(valueAsString)
              } else {
                acc[key] = valueAsString
              }

              return acc
            }, {})
          }

          /**
           * Polyfills the virtual reference (plain object) with needed props
           * Mutating because DOM elements are mutated, adds _tippy property
           */
          var polyfillVirtualReferenceProps = function polyfillVirtualReferenceProps(
            virtualReference
          ) {
            var polyfills = {
              isVirtual: true,
              attributes: virtualReference.attributes || {},
              setAttribute: function setAttribute(key, value) {
                virtualReference.attributes[key] = value
              },
              getAttribute: function getAttribute(key) {
                return virtualReference.attributes[key]
              },
              removeAttribute: function removeAttribute(key) {
                delete virtualReference.attributes[key]
              },
              hasAttribute: function hasAttribute(key) {
                return key in virtualReference.attributes
              },
              addEventListener: function addEventListener() {},
              removeEventListener: function removeEventListener() {},

              classList: {
                classNames: {},
                add: function add(key) {
                  virtualReference.classList.classNames[key] = true
                },
                remove: function remove(key) {
                  delete virtualReference.classList.classNames[key]
                },
                contains: function contains(key) {
                  return key in virtualReference.classList.classNames
                }
              }
            }

            for (var key in polyfills) {
              virtualReference[key] = polyfills[key]
            }

            return virtualReference
          }

          /**
           * Ponyfill for Element.prototype.matches
           */
          var matches = (function() {
            if (isBrowser$1) {
              var e = Element.prototype
              return (
                e.matches ||
                e.matchesSelector ||
                e.webkitMatchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector
              )
            }
          })()

          /**
           * Ponyfill for Element.prototype.closest
           */
          var closest = function closest(element, parentSelector) {
            return (
              Element.prototype.closest ||
              function(selector) {
                var el = this
                while (el) {
                  if (matches.call(el, selector)) return el
                  el = el.parentElement
                }
              }
            ).call(element, parentSelector)
          }

          /**
           * Works like Element.prototype.closest, but uses a callback instead
           */
          var closestCallback = function closestCallback(element, callback) {
            while (element) {
              if (callback(element)) return element
              element = element.parentElement
            }
          }

          /**
           * Focuses an element while preventing a scroll jump if it's not within the viewport
           */
          var focus = function focus(el) {
            var x = window.scrollX || window.pageXOffset
            var y = window.scrollY || window.pageYOffset
            el.focus()
            scroll(x, y)
          }

          /**
           * Triggers reflow
           */
          var reflow = function reflow(popper) {
            void popper.offsetHeight
          }

          /**
           * Transforms the x/y axis ased on the placement
           */
          var transformAxisBasedOnPlacement = function transformAxisBasedOnPlacement(
            axis,
            isVertical
          ) {
            return (
              (isVertical
                ? axis
                : {
                    X: 'Y',
                    Y: 'X'
                  }[axis]) || ''
            )
          }

          /**
           * Transforms the scale/translate numbers based on the placement
           */
          var transformNumbersBasedOnPlacement = function transformNumbersBasedOnPlacement(
            type,
            numbers,
            isVertical,
            isReverse
          ) {
            /**
             * Avoid destructuring because a large boilerplate function is generated
             * by Babel
             */
            var a = numbers[0]
            var b = numbers[1]

            if (!a && !b) {
              return ''
            }

            var transforms = {
              scale: (function() {
                if (!b) {
                  return '' + a
                } else {
                  return isVertical ? a + ', ' + b : b + ', ' + a
                }
              })(),
              translate: (function() {
                if (!b) {
                  return isReverse ? -a + 'px' : a + 'px'
                } else {
                  if (isVertical) {
                    return isReverse
                      ? a + 'px, ' + -b + 'px'
                      : a + 'px, ' + b + 'px'
                  } else {
                    return isReverse
                      ? -b + 'px, ' + a + 'px'
                      : b + 'px, ' + a + 'px'
                  }
                }
              })()
            }

            return transforms[type]
          }

          /**
           * Returns the axis for a CSS function (translate or scale)
           */
          var getTransformAxis = function getTransformAxis(str, cssFunction) {
            var match = str.match(new RegExp(cssFunction + '([XY])'))
            return match ? match[1] : ''
          }

          /**
           * Returns the numbers given to the CSS function
           */
          var getTransformNumbers = function getTransformNumbers(str, regex) {
            var match = str.match(regex)
            return match ? match[1].split(',').map(parseFloat) : []
          }

          var TRANSFORM_NUMBER_RE = {
            translate: /translateX?Y?\(([^)]+)\)/,
            scale: /scaleX?Y?\(([^)]+)\)/

            /**
             * Computes the arrow's transform so that it is correct for any placement
             */
          }
          var computeArrowTransform = function computeArrowTransform(
            arrow,
            arrowTransform
          ) {
            var placement = getPopperPlacement(closest(arrow, Selectors.POPPER))
            var isVertical = placement === 'top' || placement === 'bottom'
            var isReverse = placement === 'right' || placement === 'bottom'

            var matches = {
              translate: {
                axis: getTransformAxis(arrowTransform, 'translate'),
                numbers: getTransformNumbers(
                  arrowTransform,
                  TRANSFORM_NUMBER_RE.translate
                )
              },
              scale: {
                axis: getTransformAxis(arrowTransform, 'scale'),
                numbers: getTransformNumbers(
                  arrowTransform,
                  TRANSFORM_NUMBER_RE.scale
                )
              }
            }

            var computedTransform = arrowTransform
              .replace(
                TRANSFORM_NUMBER_RE.translate,
                'translate' +
                  transformAxisBasedOnPlacement(
                    matches.translate.axis,
                    isVertical
                  ) +
                  '(' +
                  transformNumbersBasedOnPlacement(
                    'translate',
                    matches.translate.numbers,
                    isVertical,
                    isReverse
                  ) +
                  ')'
              )
              .replace(
                TRANSFORM_NUMBER_RE.scale,
                'scale' +
                  transformAxisBasedOnPlacement(
                    matches.scale.axis,
                    isVertical
                  ) +
                  '(' +
                  transformNumbersBasedOnPlacement(
                    'scale',
                    matches.scale.numbers,
                    isVertical,
                    isReverse
                  ) +
                  ')'
              )

            arrow.style[prefix('transform')] = computedTransform
          }

          /**
           * Sets the visibility state of a popper so it can begin to transition in or out
           */
          var setVisibilityState = function setVisibilityState(els, type) {
            els.filter(Boolean).forEach(function(el) {
              el.setAttribute('data-state', type)
            })
          }

          /**
           * Prefixes a CSS property with the one supported by the browser
           */
          var prefix = function prefix(property) {
            var prefixes = ['', 'webkit']
            var upperProp = property[0].toUpperCase() + property.slice(1)

            for (var i = 0; i < prefixes.length; i++) {
              var _prefix = prefixes[i]
              var prefixedProp = _prefix ? _prefix + upperProp : property
              if (typeof document.body.style[prefixedProp] !== 'undefined') {
                return prefixedProp
              }
            }

            return null
          }

          /**
           * Update's a popper's position and runs a callback onUpdate; wrapper for async updates
           */
          var updatePopperPosition = function updatePopperPosition(
            popperInstance,
            callback,
            updateAlreadyCalled
          ) {
            var popper = popperInstance.popper,
              options = popperInstance.options

            var onCreate = options.onCreate
            var onUpdate = options.onUpdate

            options.onCreate = options.onUpdate = function() {
              reflow(popper)
              callback && callback()
              onUpdate()
              options.onCreate = onCreate
              options.onUpdate = onUpdate
            }

            if (!updateAlreadyCalled) {
              popperInstance.scheduleUpdate()
            }
          }

          /**
           * Defers a function's execution until the call stack has cleared
           */
          var defer = function defer(fn) {
            setTimeout(fn, 1)
          }

          /**
           * Determines if the mouse cursor is outside of the popper's interactive border
           * region
           */
          var isCursorOutsideInteractiveBorder = function isCursorOutsideInteractiveBorder(
            popperPlacement,
            popperRect,
            event,
            props
          ) {
            if (!popperPlacement) {
              return true
            }

            var x = event.clientX,
              y = event.clientY
            var interactiveBorder = props.interactiveBorder,
              distance = props.distance

            var exceedsTop =
              popperRect.top - y >
              (popperPlacement === 'top'
                ? interactiveBorder + distance
                : interactiveBorder)

            var exceedsBottom =
              y - popperRect.bottom >
              (popperPlacement === 'bottom'
                ? interactiveBorder + distance
                : interactiveBorder)

            var exceedsLeft =
              popperRect.left - x >
              (popperPlacement === 'left'
                ? interactiveBorder + distance
                : interactiveBorder)

            var exceedsRight =
              x - popperRect.right >
              (popperPlacement === 'right'
                ? interactiveBorder + distance
                : interactiveBorder)

            return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight
          }

          /**
           * Returns the distance offset, taking into account the default offset due to
           * the transform: translate() rule in CSS
           */
          var getOffsetDistanceInPx = function getOffsetDistanceInPx(
            distance,
            defaultDistance
          ) {
            return -(distance - defaultDistance) + 'px'
          }

          /**
           * Returns the popper's placement, ignoring shifting (top-start, etc)
           */
          var getPopperPlacement = function getPopperPlacement(popper) {
            var fullPlacement = popper.getAttribute('x-placement')
            return fullPlacement ? fullPlacement.split('-')[0] : ''
          }

          /**
           * Evaluates props
           */
          var evaluateProps = function evaluateProps(reference, props) {
            var out = _extends(
              {},
              props,
              props.performance ? {} : getDataAttributeOptions(reference)
            )

            if (out.arrow) {
              out.animateFill = false
            }

            if (typeof out.appendTo === 'function') {
              out.appendTo = props.appendTo(reference)
            }

            if (typeof out.content === 'function') {
              out.content = props.content(reference)
            }

            return out
          }

          /**
           * Add/remove transitionend listener from tooltip
           */
          var toggleTransitionEndListener = function toggleTransitionEndListener(
            tooltip,
            action,
            listener
          ) {
            tooltip[action + 'EventListener']('transitionend', listener)
          }

          /**
           * Debounce utility
           */
          var debounce$1 = function debounce(fn, ms) {
            var timeoutId = void 0
            return function() {
              var _this = this,
                _arguments = arguments

              clearTimeout(timeoutId)
              timeoutId = setTimeout(function() {
                return fn.apply(_this, _arguments)
              }, ms)
            }
          }

          var nav = isBrowser$1 ? navigator : {}
          var win = isBrowser$1 ? window : {}
          var isIE$1 = /MSIE |Trident\//.test(nav.userAgent)
          var isIOS = /iPhone|iPad|iPod/.test(nav.platform) && !win.MSStream
          var supportsTouch = 'ontouchstart' in win
          var isUsingTouch = false

          var onDocumentTouch = function onDocumentTouch() {
            if (isUsingTouch) {
              return
            }

            isUsingTouch = true

            if (isIOS) {
              document.body.classList.add('tippy-iOS')
            }

            if (window.performance) {
              document.addEventListener('mousemove', onDocumentMouseMove)
            }
          }

          var lastMouseMoveTime = 0
          var onDocumentMouseMove = function onDocumentMouseMove() {
            var now = performance.now()

            // Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference
            if (now - lastMouseMoveTime < 20) {
              isUsingTouch = false
              document.removeEventListener('mousemove', onDocumentMouseMove)
              if (!isIOS) {
                document.body.classList.remove('tippy-iOS')
              }
            }

            lastMouseMoveTime = now
          }

          var onDocumentClick = function onDocumentClick(_ref) {
            var target = _ref.target

            // Simulated events dispatched on the document
            if (!(target instanceof Element)) {
              return hideAllPoppers()
            }

            // Clicked on an interactive popper
            var popper = closest(target, Selectors.POPPER)
            if (popper && popper._tippy && popper._tippy.props.interactive) {
              return
            }

            // Clicked on a reference
            var reference = closestCallback(target, function(el) {
              return el._tippy && el._tippy.reference === el
            })
            if (reference) {
              var tip = reference._tippy
              var isClickTrigger = tip.props.trigger.indexOf('click') > -1

              if (isUsingTouch || isClickTrigger) {
                return hideAllPoppers(tip)
              }

              if (tip.props.hideOnClick !== true || isClickTrigger) {
                return
              }

              tip.clearDelayTimeouts()
            }

            hideAllPoppers()
          }

          var onWindowBlur = function onWindowBlur() {
            var _document = document,
              activeElement = _document.activeElement

            if (activeElement && activeElement.blur && activeElement._tippy) {
              activeElement.blur()
            }
          }

          var onWindowResize = function onWindowResize() {
            toArray$1(document.querySelectorAll(Selectors.POPPER)).forEach(
              function(popper) {
                var tippyInstance = popper._tippy
                if (!tippyInstance.props.livePlacement) {
                  tippyInstance.popperInstance.scheduleUpdate()
                }
              }
            )
          }

          /**
           * Adds the needed global event listeners
           */
          function bindEventListeners() {
            document.addEventListener('click', onDocumentClick)
            document.addEventListener('touchstart', onDocumentTouch)
            window.addEventListener('blur', onWindowBlur)
            window.addEventListener('resize', onWindowResize)

            if (
              !supportsTouch &&
              (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
            ) {
              document.addEventListener('pointerdown', onDocumentTouch)
            }
          }

          var idCounter = 1

          function createTippy(reference, collectionProps) {
            var props = evaluateProps(reference, collectionProps)

            // If the reference shouldn't have multiple tippys, return null early
            if (!props.multiple && reference._tippy) {
              return null
            }

            /* ======================= 🔒 Private members 🔒 ======================= */
            var popperMutationObserver = null
            var lastTriggerEvent = {}
            var lastMouseMoveEvent = null
            var showTimeoutId = 0
            var hideTimeoutId = 0
            var isPreparingToShow = false
            var transitionEndListener = function transitionEndListener() {}
            var listeners = []
            var referenceJustProgrammaticallyFocused = false
            var debouncedOnMouseMove =
              props.interactiveDebounce > 0
                ? debounce$1(onMouseMove, props.interactiveDebounce)
                : onMouseMove

            /* ======================= 🔑 Public members 🔑 ======================= */
            var id = idCounter++

            var popper = createPopperElement(id, props)

            var popperChildren = getChildren(popper)

            var state = {
              isEnabled: true,
              isVisible: false,
              isDestroyed: false
            }

            var popperInstance = null

            // 🌟 tippy instance
            var tip = {
              // properties
              id: id,
              reference: reference,
              popper: popper,
              popperChildren: popperChildren,
              popperInstance: popperInstance,
              props: props,
              state: state,
              // methods
              clearDelayTimeouts: clearDelayTimeouts,
              set: set$$1,
              setContent: setContent$$1,
              show: show,
              hide: hide,
              enable: enable,
              disable: disable,
              destroy: destroy
            }

            addTriggersToReference()

            reference.addEventListener('click', onReferenceClick)

            if (!props.lazy) {
              tip.popperInstance = createPopperInstance()
              tip.popperInstance.disableEventListeners()
            }

            if (props.showOnInit) {
              /**
               * Firefox has a bug where the tooltip will be placed incorrectly due to
               * strange layout on load, `setTimeout` gives the layout time to adjust
               * properly
               */
              setTimeout(prepareShow, 20)
            }

            // Ensure the reference element can receive focus (and is not a delegate)
            if (
              props.a11y &&
              !props.target &&
              !elementCanReceiveFocus(reference)
            ) {
              reference.setAttribute('tabindex', '0')
            }

            // Install shortcuts
            reference._tippy = tip
            popper._tippy = tip

            return tip

            /* ======================= 🔒 Private methods 🔒 ======================= */
            /**
             * If the reference was clicked, it also receives focus
             */
            function onReferenceClick() {
              defer(function() {
                referenceJustProgrammaticallyFocused = false
              })
            }

            /**
             * Listener for the `followCursor` prop
             */
            function followCursorListener(event) {
              var _lastMouseMoveEvent = (lastMouseMoveEvent = event),
                clientX = _lastMouseMoveEvent.clientX,
                clientY = _lastMouseMoveEvent.clientY

              if (!tip.popperInstance) {
                return
              }

              tip.popperInstance.reference = {
                getBoundingClientRect: function getBoundingClientRect() {
                  return {
                    width: 0,
                    height: 0,
                    top: clientY,
                    left: clientX,
                    right: clientX,
                    bottom: clientY
                  }
                },
                clientWidth: 0,
                clientHeight: 0
              }

              tip.popperInstance.scheduleUpdate()
            }

            /**
             * Creates the tippy instance for a delegate when it's been triggered
             */
            function createDelegateChildTippy(event) {
              var targetEl = closest(event.target, tip.props.target)
              if (targetEl && !targetEl._tippy) {
                var content = tip.props.content
                if (content) {
                  createTippy(
                    targetEl,
                    _extends({}, tip.props, {
                      content: content,
                      target: '',
                      showOnInit: true
                    })
                  )
                  prepareShow(event)
                }
              }
            }

            /**
             * Setup before show() is invoked (delays, etc.)
             */
            function prepareShow(event) {
              clearDelayTimeouts()

              if (tip.state.isVisible) {
                return
              }

              // Is a delegate, create an instance for the child target
              if (tip.props.target) {
                return createDelegateChildTippy(event)
              }

              isPreparingToShow = true

              if (tip.props.wait) {
                return tip.props.wait(tip, event)
              }

              /**
               * If the tooltip has a delay, we need to be listening to the mousemove as
               * soon as the trigger event is fired so that it's in the correct position
               * upon mount
               */
              if (hasFollowCursorBehavior()) {
                if (popperChildren.arrow) {
                  popperChildren.arrow.style.margin = '0'
                }
                document.addEventListener('mousemove', followCursorListener)
              }

              var delay = getValue(tip.props.delay, 0, Defaults.delay)

              if (delay) {
                showTimeoutId = setTimeout(function() {
                  show()
                }, delay)
              } else {
                show()
              }
            }

            /**
             * Setup before hide() is invoked (delays, etc.)
             */
            function prepareHide() {
              clearDelayTimeouts()

              if (!tip.state.isVisible) {
                return
              }

              isPreparingToShow = false

              var delay = getValue(tip.props.delay, 1, Defaults.delay)

              if (delay) {
                hideTimeoutId = setTimeout(function() {
                  if (tip.state.isVisible) {
                    hide()
                  }
                }, delay)
              } else {
                hide()
              }
            }

            /**
             * Cleans up old listeners
             */
            function cleanupOldMouseMoveListeners() {
              document.body.removeEventListener('mouseleave', prepareHide)
              document.removeEventListener('mousemove', debouncedOnMouseMove)
            }

            /**
             * Event listener invoked upon trigger
             */
            function onTrigger(event) {
              if (!tip.state.isEnabled) {
                return
              }

              var shouldStopEvent =
                supportsTouch &&
                isUsingTouch &&
                ['mouseenter', 'mouseover', 'focus'].indexOf(event.type) > -1

              if (shouldStopEvent && tip.props.touchHold) {
                return
              }

              if (!tip.state.isVisible) {
                lastTriggerEvent = event
              }

              // Toggle show/hide when clicking click-triggered tooltips
              if (
                event.type === 'click' &&
                tip.props.hideOnClick !== false &&
                tip.state.isVisible
              ) {
                prepareHide()
              } else {
                prepareShow(event)
              }
            }

            /**
             * Event listener used for interactive tooltips to detect when they should hide
             */
            function onMouseMove(event) {
              var referenceTheCursorIsOver = closestCallback(
                event.target,
                function(el) {
                  return el._tippy
                }
              )

              var isCursorOverPopper =
                closest(event.target, Selectors.POPPER) === tip.popper
              var isCursorOverReference =
                referenceTheCursorIsOver === tip.reference

              if (isCursorOverPopper || isCursorOverReference) {
                return
              }

              if (
                isCursorOutsideInteractiveBorder(
                  getPopperPlacement(tip.popper),
                  tip.popper.getBoundingClientRect(),
                  event,
                  tip.props
                )
              ) {
                cleanupOldMouseMoveListeners()
                prepareHide()
              }
            }

            /**
             * Event listener invoked upon mouseleave
             */
            function onMouseLeave(event) {
              if (
                ['mouseleave', 'mouseout'].indexOf(event.type) > -1 &&
                supportsTouch &&
                isUsingTouch &&
                tip.props.touchHold
              ) {
                return
              }

              if (tip.props.interactive) {
                document.body.addEventListener('mouseleave', prepareHide)
                document.addEventListener('mousemove', debouncedOnMouseMove)
                return
              }

              prepareHide()
            }

            /**
             * Event listener invoked upon blur
             */
            function onBlur(event) {
              if (event.target !== tip.reference || isUsingTouch) {
                return
              }

              if (tip.props.interactive) {
                if (!event.relatedTarget) {
                  return
                }
                if (closest(event.relatedTarget, Selectors.POPPER)) {
                  return
                }
              }

              prepareHide()
            }

            /**
             * Event listener invoked when a child target is triggered
             */
            function onDelegateShow(event) {
              if (closest(event.target, tip.props.target)) {
                prepareShow(event)
              }
            }

            /**
             * Event listener invoked when a child target should hide
             */
            function onDelegateHide(event) {
              if (closest(event.target, tip.props.target)) {
                prepareHide()
              }
            }

            /**
             * Creates the popper instance for the tip
             */
            function createPopperInstance() {
              var tooltip = tip.popperChildren.tooltip
              var popperOptions = tip.props.popperOptions

              var arrowSelector =
                Selectors[
                  tip.props.arrowType === 'round' ? 'ROUND_ARROW' : 'ARROW'
                ]
              var arrow = tooltip.querySelector(arrowSelector)

              var config = _extends(
                {
                  placement: tip.props.placement
                },
                popperOptions || {},
                {
                  modifiers: _extends(
                    {},
                    popperOptions ? popperOptions.modifiers : {},
                    {
                      arrow: _extends(
                        {
                          element: arrowSelector
                        },
                        popperOptions && popperOptions.modifiers
                          ? popperOptions.modifiers.arrow
                          : {}
                      ),
                      flip: _extends(
                        {
                          enabled: tip.props.flip,
                          padding:
                            tip.props.distance +
                            5 /* 5px from viewport boundary */,
                          behavior: tip.props.flipBehavior
                        },
                        popperOptions && popperOptions.modifiers
                          ? popperOptions.modifiers.flip
                          : {}
                      ),
                      offset: _extends(
                        {
                          offset: tip.props.offset
                        },
                        popperOptions && popperOptions.modifiers
                          ? popperOptions.modifiers.offset
                          : {}
                      )
                    }
                  ),
                  onCreate: function onCreate() {
                    tooltip.style[
                      getPopperPlacement(tip.popper)
                    ] = getOffsetDistanceInPx(
                      tip.props.distance,
                      Defaults.distance
                    )

                    if (arrow && tip.props.arrowTransform) {
                      computeArrowTransform(arrow, tip.props.arrowTransform)
                    }
                  },
                  onUpdate: function onUpdate() {
                    var styles = tooltip.style
                    styles.top = ''
                    styles.bottom = ''
                    styles.left = ''
                    styles.right = ''
                    styles[
                      getPopperPlacement(tip.popper)
                    ] = getOffsetDistanceInPx(
                      tip.props.distance,
                      Defaults.distance
                    )

                    if (arrow && tip.props.arrowTransform) {
                      computeArrowTransform(arrow, tip.props.arrowTransform)
                    }
                  }
                }
              )

              /**
               * Ensure the popper's position stays correct if its dimensions change.
               * Use .update() over .scheduleUpdate() so there is no 1 frame flash
               * due to async update.
               */
              var observer = new MutationObserver(function() {
                tip.popperInstance.update()
              })
              observer.observe(tip.popper, { childList: true, subtree: true })
              if (popperMutationObserver) {
                popperMutationObserver.disconnect()
              }
              popperMutationObserver = observer

              // fixes https://github.com/atomiks/tippyjs/issues/193
              tip.popper.addEventListener('mouseenter', function(event) {
                if (
                  tip.state.isVisible &&
                  lastTriggerEvent.type === 'mouseenter'
                ) {
                  prepareShow(event)
                }
              })
              tip.popper.addEventListener('mouseleave', function(event) {
                if (
                  lastTriggerEvent.type === 'mouseenter' &&
                  tip.props.interactiveDebounce === 0 &&
                  isCursorOutsideInteractiveBorder(
                    getPopperPlacement(tip.popper),
                    tip.popper.getBoundingClientRect(),
                    event,
                    tip.props
                  )
                ) {
                  prepareHide()
                }
              })

              return new Popper(tip.reference, tip.popper, config)
            }

            /**
             * Mounts the tooltip to the DOM
             */
            function mount(onceUpdated) {
              if (!tip.popperInstance) {
                tip.popperInstance = createPopperInstance()
                if (!tip.props.livePlacement) {
                  tip.popperInstance.disableEventListeners()
                }
              } else {
                tip.popperInstance.scheduleUpdate()
                if (tip.props.livePlacement && !hasFollowCursorBehavior()) {
                  tip.popperInstance.enableEventListeners()
                }
              }

              /**
               * If the instance previously had followCursor behavior, it will be
               * positioned incorrectly if triggered by `focus` afterwards.
               * Update the reference back to the real DOM element
               */
              tip.popperInstance.reference = tip.reference
              if (hasFollowCursorBehavior()) {
                if (tip.popperChildren.arrow) {
                  tip.popperChildren.arrow.style.margin = ''
                }
              }

              updatePopperPosition(tip.popperInstance, onceUpdated, true)

              if (!tip.props.appendTo.contains(tip.popper)) {
                tip.props.appendTo.appendChild(tip.popper)
              }
            }

            /**
             * Determines if the instance is in `followCursor` mode
             */
            function hasFollowCursorBehavior() {
              return (
                tip.props.followCursor &&
                !isUsingTouch &&
                lastTriggerEvent.type !== 'focus'
              )
            }

            /**
             * Updates the tooltip's position on each animation frame + timeout
             */
            function makeSticky() {
              var updatePosition = function updatePosition() {
                applyTransitionDuration([tip.popper], tip.props.updateDuration)

                if (tip.popperInstance) {
                  tip.popperInstance.scheduleUpdate()
                }

                if (tip.state.isVisible) {
                  requestAnimationFrame(function() {
                    defer(updatePosition)
                  })
                } else {
                  applyTransitionDuration([tip.popper], 0)
                }
              }

              updatePosition()
            }

            /**
             * Invokes a callback once the tooltip has fully transitioned out
             */
            function onTransitionedOut(duration, callback) {
              onTransitionEnd(duration, function() {
                if (
                  !tip.state.isVisible &&
                  tip.props.appendTo.contains(tip.popper)
                ) {
                  callback()
                }
              })
            }

            /**
             * Invokes a callback once the tooltip has fully transitioned in
             */
            function onTransitionedIn(duration, callback) {
              onTransitionEnd(duration, callback)
            }

            /**
             * Invokes a callback once the tooltip's CSS transition ends
             */
            function onTransitionEnd(duration, callback) {
              // Make callback synchronous if duration is 0
              if (duration === 0) {
                return callback()
              }

              var tooltip = tip.popperChildren.tooltip

              var listener = function listener(e) {
                if (e.target === tooltip) {
                  toggleTransitionEndListener(tooltip, 'remove', listener)
                  callback()
                }
              }

              toggleTransitionEndListener(
                tooltip,
                'remove',
                transitionEndListener
              )
              toggleTransitionEndListener(tooltip, 'add', listener)

              transitionEndListener = listener
            }

            /**
             * Adds an event listener to the reference
             */
            function on(eventType, handler, acc) {
              tip.reference.addEventListener(eventType, handler)
              acc.push({ eventType: eventType, handler: handler })
            }

            /**
             * Adds event listeners to the reference based on the `trigger` prop
             */
            function addTriggersToReference() {
              listeners = tip.props.trigger
                .trim()
                .split(' ')
                .reduce(function(acc, eventType) {
                  if (eventType === 'manual') {
                    return acc
                  }

                  if (!props.target) {
                    on(eventType, onTrigger, acc)
                    switch (eventType) {
                      case 'mouseenter':
                        on('mouseleave', onMouseLeave, acc)
                        break
                      case 'focus':
                        on(isIE$1 ? 'focusout' : 'blur', onBlur, acc)
                        break
                    }
                  } else {
                    switch (eventType) {
                      case 'mouseenter':
                        on('mouseover', onDelegateShow, acc)
                        on('mouseout', onDelegateHide, acc)
                        break
                      case 'focus':
                        on('focusin', onDelegateShow, acc)
                        on('focusout', onDelegateHide, acc)
                        break
                      case 'click':
                        on(eventType, onDelegateShow, acc)
                        break
                    }
                  }

                  return acc
                }, [])
            }

            /**
             * Removes event listeners from the reference
             */
            function removeTriggersFromReference() {
              listeners.forEach(function(_ref) {
                var eventType = _ref.eventType,
                  handler = _ref.handler

                tip.reference.removeEventListener(eventType, handler)
              })
            }

            /* ======================= 🔑 Public methods 🔑 ======================= */
            /**
             * Enables the instance to allow it to show or hide
             */
            function enable() {
              tip.state.isEnabled = true
            }

            /**
             * Disables the instance to disallow it to show or hide
             */
            function disable() {
              tip.state.isEnabled = false
            }

            /**
             * Clears pending timeouts related to the `delay` prop if any
             */
            function clearDelayTimeouts() {
              clearTimeout(showTimeoutId)
              clearTimeout(hideTimeoutId)
            }

            /**
             * Sets new props for the instance and redraws the tooltip
             */
            function set$$1(options) {
              var prevProps = tip.props
              var nextProps = evaluateProps(
                tip.reference,
                _extends({}, tip.props, options, {
                  performance: true
                })
              )
              nextProps.performance =
                options.performance || prevProps.performance
              tip.props = nextProps

              if ('trigger' in options) {
                removeTriggersFromReference()
                addTriggersToReference()
              }

              if ('interactiveDebounce' in options) {
                cleanupOldMouseMoveListeners()
                debouncedOnMouseMove = debounce$1(
                  onMouseMove,
                  options.interactiveDebounce
                )
              }

              updatePopperElement(tip.popper, prevProps, nextProps)
              tip.popperChildren = getChildren(tip.popper)
            }

            /**
             * Shortcut for .set({ content: newContent })
             */
            function setContent$$1(content) {
              set$$1({ content: content })
            }

            /**
             * Shows the tooltip
             */
            function show() {
              var duration =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : getValue(tip.props.duration, 0, Defaults.duration[0])

              if (
                tip.state.isDestroyed ||
                !tip.state.isEnabled ||
                (isUsingTouch && !tip.props.touch)
              ) {
                return
              }

              // Destroy tooltip if the reference element is no longer on the DOM
              if (
                !tip.reference.isVirtual &&
                !document.documentElement.contains(tip.reference)
              ) {
                return destroy()
              }

              // Do not show tooltip if the reference element has a `disabled` attribute
              if (tip.reference.hasAttribute('disabled')) {
                return
              }

              // If the reference was just programmatically focused for accessibility reasons
              if (referenceJustProgrammaticallyFocused) {
                referenceJustProgrammaticallyFocused = false
                return
              }

              tip.props.onShow(tip)

              tip.popper.style.visibility = 'visible'
              tip.state.isVisible = true

              // Prevent a transition if the popper is at the opposite placement
              applyTransitionDuration(
                [
                  tip.popper,
                  tip.popperChildren.tooltip,
                  tip.popperChildren.backdrop
                ],
                0
              )

              mount(function() {
                if (!tip.state.isVisible) {
                  return
                }

                if (!hasFollowCursorBehavior()) {
                  // Arrow will sometimes not be positioned correctly. Force another update.
                  tip.popperInstance.scheduleUpdate()
                }

                // Set initial position near the cursor
                if (hasFollowCursorBehavior()) {
                  tip.popperInstance.disableEventListeners()
                  var delay = getValue(tip.props.delay, 0, Defaults.delay)
                  if (lastTriggerEvent.type) {
                    followCursorListener(
                      delay && lastMouseMoveEvent
                        ? lastMouseMoveEvent
                        : lastTriggerEvent
                    )
                  }
                }

                applyTransitionDuration(
                  [
                    tip.popperChildren.tooltip,
                    tip.popperChildren.backdrop,
                    tip.popperChildren.backdrop
                      ? tip.popperChildren.content
                      : null
                  ],
                  duration
                )

                if (tip.props.interactive) {
                  tip.reference.classList.add('tippy-active')
                }

                if (tip.props.sticky) {
                  makeSticky()
                }

                setVisibilityState(
                  [tip.popperChildren.tooltip, tip.popperChildren.backdrop],
                  'visible'
                )

                onTransitionedIn(duration, function() {
                  if (tip.props.updateDuration === 0) {
                    tip.popperChildren.tooltip.classList.add(
                      'tippy-notransition'
                    )
                  }

                  if (
                    tip.props.interactive &&
                    lastTriggerEvent.type === 'focus'
                  ) {
                    focus(tip.popper)
                  }

                  tip.reference.setAttribute('aria-describedby', tip.popper.id)

                  tip.props.onShown(tip)
                })
              })
            }

            /**
             * Hides the tooltip
             */
            function hide() {
              var duration =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : getValue(tip.props.duration, 1, Defaults.duration[1])

              if (tip.state.isDestroyed || !tip.state.isEnabled) {
                return
              }

              tip.props.onHide(tip)

              if (tip.props.updateDuration === 0) {
                tip.popperChildren.tooltip.classList.remove(
                  'tippy-notransition'
                )
              }

              if (tip.props.interactive) {
                tip.reference.classList.remove('tippy-active')
              }

              tip.popper.style.visibility = 'hidden'
              tip.state.isVisible = false

              applyTransitionDuration(
                [
                  tip.popperChildren.tooltip,
                  tip.popperChildren.backdrop,
                  tip.popperChildren.backdrop
                    ? tip.popperChildren.content
                    : null
                ],
                duration
              )

              setVisibilityState(
                [tip.popperChildren.tooltip, tip.popperChildren.backdrop],
                'hidden'
              )

              if (
                tip.props.interactive &&
                !referenceJustProgrammaticallyFocused &&
                lastTriggerEvent.type === 'focus'
              ) {
                referenceJustProgrammaticallyFocused = true
                focus(tip.reference)
              }

              onTransitionedOut(duration, function() {
                if (!isPreparingToShow) {
                  document.removeEventListener(
                    'mousemove',
                    followCursorListener
                  )
                  lastMouseMoveEvent = null
                }

                tip.reference.removeAttribute('aria-describedby')

                tip.popperInstance.disableEventListeners()

                tip.props.appendTo.removeChild(tip.popper)

                tip.props.onHidden(tip)
              })
            }

            /**
             * Destroys the tooltip
             */
            function destroy(destroyTargetInstances) {
              if (tip.state.isDestroyed) {
                return
              }

              // Ensure the popper is hidden
              if (tip.state.isVisible) {
                hide(0)
              }

              removeTriggersFromReference()

              tip.reference.removeEventListener('click', onReferenceClick)

              delete tip.reference._tippy

              if (tip.props.target && destroyTargetInstances) {
                toArray$1(
                  tip.reference.querySelectorAll(tip.props.target)
                ).forEach(function(child) {
                  return child._tippy && child._tippy.destroy()
                })
              }

              if (tip.popperInstance) {
                tip.popperInstance.destroy()
              }

              if (popperMutationObserver) {
                popperMutationObserver.disconnect()
              }

              tip.state.isDestroyed = true
            }
          }

          var eventListenersBound = false

          function tippy$1(targets, options, one) {
            if (!eventListenersBound) {
              bindEventListeners()
              eventListenersBound = true
            }

            // Throw an error if the user supplied an invalid option
            for (var key in options || {}) {
              if (!(key in Defaults)) {
                throw Error('[tippy]: ' + key + ' is not a valid option')
              }
            }

            var props = _extends({}, Defaults, options)

            /**
             * If they are specifying a virtual positioning reference, we need to polyfill
             * some native DOM props
             */
            if (isPlainObject(targets)) {
              polyfillVirtualReferenceProps(targets)
            }

            var references = getArrayOfElements(targets)
            var firstReference = references[0]

            var instances = (one && firstReference
              ? [firstReference]
              : references
            ).reduce(function(acc, reference) {
              var tip = reference && createTippy(reference, props)
              return tip ? acc.concat(tip) : acc
            }, [])

            return {
              targets: targets,
              props: props,
              instances: instances,
              destroyAll: function destroyAll() {
                this.instances.forEach(function(instance) {
                  instance.destroy()
                })
                this.instances = []
              }
            }
          }

          /**
           * Static props
           */
          tippy$1.version = version
          tippy$1.defaults = Defaults

          /**
           * Static methods
           */
          tippy$1.one = function(targets, options) {
            return tippy$1(targets, options, true).instances[0]
          }
          tippy$1.setDefaults = function(partialDefaults) {
            setDefaults(partialDefaults)
            tippy$1.defaults = Defaults
          }
          tippy$1.disableAnimations = function() {
            tippy$1.setDefaults({
              duration: 0,
              updateDuration: 0,
              animateFill: false
            })
          }
          tippy$1.hideAllPoppers = hideAllPoppers

          /**
           * Auto-init tooltips for elements with a `data-tippy="..."` attribute
           */
          var autoInit = function autoInit() {
            toArray$1(document.querySelectorAll('[data-tippy]')).forEach(
              function(el) {
                var content = el.getAttribute('data-tippy')
                if (content) {
                  tippy$1(el, { content: content })
                }
              }
            )
          }
          if (isBrowser$1) {
            setTimeout(autoInit)
          }

          return tippy$1
        })
        //# sourceMappingURL=tippy.js.map
      },
      {}
    ],
    'js/components/Tippy.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _extends =
          Object.assign ||
          function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i]
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key]
                }
              }
            }
            return target
          }

        var _slicedToArray = (function() {
          function sliceIterator(arr, i) {
            var _arr = []
            var _n = true
            var _d = false
            var _e = undefined
            try {
              for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
              ) {
                _arr.push(_s.value)
                if (i && _arr.length === i) break
              }
            } catch (err) {
              _d = true
              _e = err
            } finally {
              try {
                if (!_n && _i['return']) _i['return']()
              } finally {
                if (_d) throw _e
              }
            }
            return _arr
          }
          return function(arr, i) {
            if (Array.isArray(arr)) {
              return arr
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i)
            } else {
              throw new TypeError(
                'Invalid attempt to destructure non-iterable instance'
              )
            }
          }
        })()

        var _hyperapp = require('hyperapp')

        var _tippy = require('../../../dist/tippy.js')

        var _tippy2 = _interopRequireDefault(_tippy)

        var _utils = require('../utils')

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var Tippy = function Tippy(realProps, _ref) {
          var _ref2 = _slicedToArray(_ref, 1),
            reference = _ref2[0]

          var props = _extends({}, realProps, {
            content: realProps.content || "I'm a Tippy tooltip"
          })

          if (props.content.constructor === Object && !props.target) {
            var container = _utils.isBrowser && document.createElement('div')
            ;(0, _hyperapp.app)({}, {}, props.content, container)
            props.content = container
          }

          var update = function update(element) {
            setTimeout(function() {
              element._tippy.set(props)
            }, 1)
          }

          return (0, _hyperapp.h)(
            reference.nodeName,
            _extends({}, reference.attributes, {
              oncreate: function oncreate(element) {
                return !element._tippy && (0, _tippy2.default)(element, props)
              },
              onupdate: function onupdate(element) {
                return element._tippy && update(element)
              },
              ondestroy: function ondestroy(element) {
                return element._tippy && element._tippy.destroy()
              }
            }),
            reference.children
          )
        }

        Tippy.secondary = function(props, children) {
          return (0, _hyperapp.h)(
            Tippy,
            _extends({}, props, {
              arrow: true,
              animation: 'fade',
              appendTo: function appendTo(ref) {
                return ref.parentNode
              },
              theme: 'secondary'
            }),
            children
          )
        }

        exports.default = Tippy
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../../dist/tippy.js': '../dist/tippy.js',
        '../utils': 'js/utils.js'
      }
    ],
    'js/sections/Header.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _logo = require('../../assets/img/logo.svg')

        var _logo2 = _interopRequireDefault(_logo)

        var _package = require('../../../package.json')

        var _utils = require('../utils')

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        exports.default = function() {
          return (0, _hyperapp.h)(
            'header',
            { class: 'header' },
            (0, _hyperapp.h)(
              'div',
              { class: 'container' },
              (0, _hyperapp.h)('img', {
                class: 'header__logo',
                src: _logo2.default,
                oncreate: _utils.animateLogo
              }),
              (0, _hyperapp.h)(
                'div',
                { class: 'header__heading-wrapper' },
                (0, _hyperapp.h)(
                  'h1',
                  { class: 'header__heading' },
                  'Tippy.js',
                  (0, _hyperapp.h)(
                    'span',
                    {
                      oncreate: _utils.animateVersion,
                      class: 'header__version',
                      style: {
                        opacity: 0,
                        transform: 'scale(0.8)'
                      }
                    },
                    'v',
                    _package.version
                  )
                )
              ),
              (0, _hyperapp.h)(
                'h2',
                { class: 'header__slogan' },
                'A highly customizable vanilla JS tooltip & popover library'
              ),
              (0, _hyperapp.h)(
                'div',
                {
                  oncreate: _utils.animateItems,
                  class: 'header__items',
                  style: {
                    opacity: 0,
                    transform: 'translateY(50px)'
                  }
                },
                (0, _hyperapp.h)(
                  'div',
                  { class: 'header__item' },
                  (0, _hyperapp.h)(
                    'p',
                    null,
                    (0, _hyperapp.h)(
                      _Emoji2.default,
                      { size: 'small' },
                      '\uD83D\uDC8E'
                    ),
                    '14 kB'
                  )
                ),
                (0, _hyperapp.h)(
                  'div',
                  { class: 'header__item' },
                  (0, _hyperapp.h)(
                    _Tippy2.default,
                    {
                      content:
                        'Popper.js is the <strong>positioning engine</strong> behind the tooltips.',
                      arrow: true,
                      theme: 'light',
                      offset: '0, 2',
                      sticky: 'true',
                      updateDuration: '250',
                      arrowType: 'round'
                    },
                    (0, _hyperapp.h)(
                      'a',
                      {
                        class: 'header__button',
                        href: 'https://popper.js.org/',
                        target: '_blank'
                      },
                      (0, _hyperapp.h)(
                        _Emoji2.default,
                        { size: 'small' },
                        '\u26A1'
                      ),
                      'Powered by Popper.js'
                    )
                  )
                ),
                (0, _hyperapp.h)(
                  'div',
                  { class: 'header__item has-github-button' },
                  (0, _hyperapp.h)(
                    'a',
                    {
                      class: 'github-button',
                      href: 'https://github.com/atomiks/tippyjs',
                      'data-size': 'large',
                      'data-count-href': '/atomiks/tippyjs/stargazers',
                      'data-show-count': 'true',
                      'data-count-aria-label': '# stargazers on GitHub',
                      'aria-label': 'Star atomiks/tippyjs on GitHub'
                    },
                    'Star'
                  )
                ),
                (0, _hyperapp.h)(
                  'div',
                  { class: 'header__item' },
                  (0, _hyperapp.h)(
                    'p',
                    { class: 'header__docs-wrapper' },
                    (0, _hyperapp.h)(
                      'a',
                      {
                        class: 'header__docs',
                        href: 'https://atomiks.github.io/tippyjs/v2/index.html'
                      },
                      'v2 docs'
                    )
                  )
                )
              )
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../assets/img/logo.svg': 'assets/img/logo.svg',
        '../../../package.json': '../package.json',
        '../utils': 'js/utils.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Tippy': 'js/components/Tippy.js'
      }
    ],
    'js/sections/Demo.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _logo = require('../../assets/img/logo.svg')

        var _logo2 = _interopRequireDefault(_logo)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var ANIMATIONS = [
          'shift-away',
          'shift-toward',
          'perspective',
          'fade',
          'scale'
        ]

        var printValue = function printValue(value) {
          return Array.isArray(value) ? '[' + value.join(', ') + ']' : value
        }

        exports.default = function() {
          return (0, _hyperapp.h)(
            'section',
            { class: 'section', id: 'demo' },
            (0, _hyperapp.h)(
              'h2',
              { class: 'section__heading' },
              "Tippy's features"
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Default'),
              (0, _hyperapp.h)(
                'p',
                null,
                'The default tippy tooltip looks like this when given no options. It has a nifty backdrop filling animation!'
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { content: "I'm the default tooltip!" },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Try me!')
              )
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\u2195\uFE0F'
              ),
              (0, _hyperapp.h)(
                'h3',
                { class: 'feature__heading' },
                'Placement'
              ),
              (0, _hyperapp.h)(
                'p',
                null,
                'A tooltip can be placed in four different ways in relation to its reference element. Additionally, the tooltip be shifted.'
              ),
              ['top', 'bottom', 'left', 'right'].map(function(placement) {
                return (0,
                _hyperapp.h)(_Tippy2.default, { placement: placement }, (0, _hyperapp.h)('button', { class: 'btn' }, placement[0].toUpperCase() + placement.slice(1)))
              })
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\u25B6\uFE0F'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Arrows'),
              (0, _hyperapp.h)(
                'p',
                null,
                'Arrows point toward the reference element. There are two different types of arrows: sharp and round. You can transform the proportion and scale of the arrows any way you like.'
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { arrow: true, animation: 'fade' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Default')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { arrow: true, arrowType: 'round', animation: 'fade' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Round')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  arrow: true,
                  arrowTransform: 'scaleX(1.5)',
                  animation: 'fade'
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Wide')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  arrow: true,
                  arrowTransform: 'scaleX(0.75)',
                  animation: 'fade'
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Skinny')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  arrow: true,
                  arrowTransform: 'scale(0.75)',
                  animation: 'fade'
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Small')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  arrow: true,
                  arrowTransform: 'scale(1.35)',
                  animation: 'fade'
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Large')
              )
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\uD83D\uDC4F'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Triggers'),
              (0, _hyperapp.h)(
                'p',
                null,
                'Triggers define the types of events that cause a tooltip to show.'
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { trigger: 'mouseenter' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Hover or touch')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { trigger: 'focus', hideOnClick: false },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Focus or touch')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { trigger: 'click' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Click')
              )
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\u270D\uFE0F'
              ),
              (0, _hyperapp.h)(
                'h3',
                { class: 'feature__heading' },
                'Interactivity'
              ),
              (0, _hyperapp.h)(
                'p',
                null,
                "Tooltips can be interactive, meaning they won't hide when you hover over or click on them."
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { interactive: true },
                (0, _hyperapp.h)(
                  'button',
                  { class: 'btn' },
                  'Interactive (hover)'
                )
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { interactive: true, trigger: 'click' },
                (0, _hyperapp.h)(
                  'button',
                  { class: 'btn' },
                  'Interactive (click)'
                )
              )
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\uD83D\uDCAB'
              ),
              (0, _hyperapp.h)(
                'h3',
                { class: 'feature__heading' },
                'Animations'
              ),
              (0, _hyperapp.h)(
                'p',
                null,
                'Tooltips can have different types of animations.'
              ),
              ANIMATIONS.map(function(animation) {
                return (0,
                _hyperapp.h)(_Tippy2.default, { animation: animation, arrow: true }, (0, _hyperapp.h)('button', { class: 'btn' }, animation[0].toUpperCase() + animation.slice(1)))
              }),
              ANIMATIONS.filter(function(animation) {
                return animation !== 'fade'
              }).map(function(animation) {
                return (0, _hyperapp.h)(
                  _Tippy2.default,
                  {
                    animation: animation,
                    duration: [600, 300],
                    inertia: true,
                    arrow: true
                  },
                  (0, _hyperapp.h)(
                    'button',
                    { class: 'btn' },
                    'Inertia (',
                    animation[0].toUpperCase() + animation.slice(1),
                    ')'
                  )
                )
              })
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\u23F1\uFE0F'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Duration'),
              (0, _hyperapp.h)(
                'p',
                null,
                'A tippy can have different transition durations.'
              ),
              [0, 200, 1000, [250, 1000], [1000, 500]].map(function(duration) {
                return (0,
                _hyperapp.h)(_Tippy2.default, { duration: duration }, (0, _hyperapp.h)('button', { class: 'btn' }, printValue(duration)))
              })
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\u23F3'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Delay'),
              (0, _hyperapp.h)(
                'p',
                null,
                'Tooltips can delay showing or',
                ' ',
                (0, _hyperapp.h)(
                  _Tippy2.default.secondary,
                  {
                    content:
                      '*Hide delay is always 0 on touch devices for UX reasons'
                  },
                  (0, _hyperapp.h)(
                    'span',
                    { class: 'tippy', tabindex: '0' },
                    'hiding*'
                  )
                ),
                ' ',
                'after a trigger.'
              ),
              [0, 200, 800, [800, 0], [200, 800]].map(function(delay) {
                return (0,
                _hyperapp.h)(_Tippy2.default, { delay: delay }, (0, _hyperapp.h)('button', { class: 'btn' }, printValue(delay)))
              })
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\uD83D\uDDBC\uFE0F'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'HTML'),
              (0, _hyperapp.h)(
                'p',
                null,
                'Tooltips can contain HTML, allowing you to craft awesome interactive popovers.'
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  appendTo: function appendTo(el) {
                    return el.parentNode
                  },
                  interactive: true,
                  theme: 'light rounded',
                  arrow: true,
                  size: 'large',
                  arrowTransform: 'scale(2)',
                  distance: 15,
                  interactiveBorder: 20,
                  content: (0, _hyperapp.h)(
                    'div',
                    { class: 'template', style: { padding: '20px' } },
                    (0, _hyperapp.h)('img', {
                      width: '100',
                      src: _logo2.default
                    }),
                    (0, _hyperapp.h)(
                      'h3',
                      null,
                      'Look! The tippy logo is inside a ',
                      (0, _hyperapp.h)('strong', null, 'tippy'),
                      '.'
                    ),
                    (0, _hyperapp.h)(
                      'button',
                      {
                        class: 'btn',
                        onclick: function onclick(e) {
                          return e.target.closest('.tippy-popper')._tippy.hide()
                        }
                      },
                      'Close'
                    )
                  )
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'HTML Templates')
              )
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\uD83D\uDD8C\uFE0F'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Themes'),
              (0, _hyperapp.h)(
                'p',
                null,
                'A tippy can have any kind of theme you want! Creating a custom theme is a breeze.'
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { content: 'See-though!', theme: 'translucent' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Translucent')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { content: "Nice n' light", theme: 'light', arrow: true },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Light')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { content: 'Awesome colors!', theme: 'gradient' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Gradient')
              )
            ),
            (0, _hyperapp.h)(
              'div',
              { class: 'feature' },
              (0, _hyperapp.h)(
                _Emoji2.default,
                { size: 'medium', class: 'feature__icon' },
                '\uD83D\uDE0D'
              ),
              (0, _hyperapp.h)('h3', { class: 'feature__heading' }, 'Misc'),
              (0, _hyperapp.h)(
                'p',
                null,
                'Tippy has a ton of',
                ' ',
                (0, _hyperapp.h)(
                  _Tippy2.default.secondary,
                  {
                    interactive: true,
                    content: (0, _hyperapp.h)(
                      'div',
                      null,
                      'Missing a feature you need? Submit a',
                      ' ',
                      (0, _hyperapp.h)(
                        'a',
                        {
                          class: 'is-white',
                          href: 'https://github.com/atomiks/tippyjs/issues',
                          target: '_blank'
                        },
                        'feature request'
                      ),
                      ' ',
                      'on the GitHub repo!'
                    )
                  },
                  (0, _hyperapp.h)(
                    'span',
                    { class: 'tippy', tabindex: '0' },
                    'features'
                  )
                ),
                ", and it's constantly improving."
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  content: "How cool's this?!",
                  followCursor: true,
                  arrow: true,
                  animation: 'fade'
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Follow cursor')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  content: "You'll need a touch device for this one.",
                  touchHold: true
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Touch & Hold')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  content: "I'm hugging the tooltip!",
                  distance: 0,
                  animation: 'fade',
                  animateFill: false
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Distance')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  content:
                    "I'm offset by 10px on the x-axis, and 50px on the y-axis",
                  offset: '10, 50',
                  animation: 'fade',
                  animateFill: false
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Offset')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { size: 'small' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Small')
              ),
              (0, _hyperapp.h)(
                _Tippy2.default,
                { size: 'large' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Large')
              )
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../assets/img/logo.svg': 'assets/img/logo.svg',
        '../components/Tippy': 'js/components/Tippy.js',
        '../components/Emoji': 'js/components/Emoji.js'
      }
    ],
    'js/components/Heading.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _utils = require('../utils')

        var Subheading = function Subheading(scope) {
          return function(props, children) {
            var id = (0, _utils.toKebabCase)(scope + children[0])
            var link = (0, _hyperapp.h)('a', { href: '#' + id }, children)
            return (0, _hyperapp.h)(
              'h3',
              { id: id, class: 'section__subheading' },
              link
            )
          }
        }

        exports.default = function(scope, children) {
          if (typeof scope === 'string') {
            return Subheading(scope)
          }
          var id = (0, _utils.toKebabCase)(children[0])
          var link = (0, _hyperapp.h)('a', { href: '#' + id }, children)
          return (0, _hyperapp.h)(
            'div',
            { id: id, class: 'section__heading-wrapper' },
            (0, _hyperapp.h)('h2', { class: 'section__heading' }, link)
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../utils': 'js/utils.js'
      }
    ],
    'js/components/Section.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _utils = require('../utils')

        var _Emoji = require('./Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Heading = require('./Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        exports.default = function(_ref, children) {
          var title = _ref.title,
            emoji = _ref.emoji
          return (0, _hyperapp.h)(
            'section',
            { class: 'section', id: (0, _utils.toKebabCase)(title) },
            (0, _hyperapp.h)(
              _Emoji2.default,
              { class: 'section__icon-wrapper', size: 'large' },
              emoji
            ),
            (0, _hyperapp.h)(_Heading2.default, null, title),
            children
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../utils': 'js/utils.js',
        './Emoji': 'js/components/Emoji.js',
        './Heading': 'js/components/Heading.js'
      }
    ],
    'js/sections/Why.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Why use Tippy.js?'

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83E\uDD14' },
            (0, _hyperapp.h)(
              'p',
              null,
              'You might be wondering why you should use a 14 kB JS library for tooltips and popovers instead of a CSS solution. Pure CSS tooltips are great for simple tooltips when the reference element is positioned in a certain way, but they:'
            ),
            (0, _hyperapp.h)(
              'ul',
              null,
              (0, _hyperapp.h)(
                'li',
                null,
                'Will overflow when the tooltip is large and the reference is close to the window edge'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                "Can't flip to stay optimally visible within the viewport"
              ),
              (0, _hyperapp.h)('li', null, "Can't follow the mouse cursor"),
              (0, _hyperapp.h)(
                'li',
                null,
                'Difficult to work with self-closing elements like ',
                (0, _hyperapp.h)('code', null, 'img')
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                'JavaScript is required for dynamic HTML content'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                'JavaScript is required to perform side effects (e.g. AJAX)'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'In addition, Tippy automatically handles many use cases available declaratively in a simple option API. Options like',
              ' ',
              (0, _hyperapp.h)('code', null, 'followCursor'),
              ', ',
              (0, _hyperapp.h)('code', null, 'interactive'),
              ', ',
              (0, _hyperapp.h)('code', null, 'touch'),
              ',',
              ' ',
              (0, _hyperapp.h)('code', null, 'arrow'),
              ', and the ',
              (0, _hyperapp.h)('code', null, 'on*'),
              ' lifecycle functions make dealing with tooltips & popovers a breeze.'
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../components/Section': 'js/components/Section.js'
      }
    ],
    '../node_modules/prismjs/prism.js': [
      function(require, module, exports) {
        var global = arguments[3]

        /* **********************************************
     Begin prism-core.js
********************************************** */

        var _self =
          typeof window !== 'undefined'
            ? window // if in browser
            : typeof WorkerGlobalScope !== 'undefined' &&
              self instanceof WorkerGlobalScope
              ? self // if in worker
              : {} // if in node js

        /**
         * Prism: Lightweight, robust, elegant syntax highlighting
         * MIT license http://www.opensource.org/licenses/mit-license.php/
         * @author Lea Verou http://lea.verou.me
         */

        var Prism = (function() {
          // Private helper vars
          var lang = /\blang(?:uage)?-([\w-]+)\b/i
          var uniqueId = 0

          var _ = (_self.Prism = {
            manual: _self.Prism && _self.Prism.manual,
            disableWorkerMessageHandler:
              _self.Prism && _self.Prism.disableWorkerMessageHandler,
            util: {
              encode: function(tokens) {
                if (tokens instanceof Token) {
                  return new Token(
                    tokens.type,
                    _.util.encode(tokens.content),
                    tokens.alias
                  )
                } else if (_.util.type(tokens) === 'Array') {
                  return tokens.map(_.util.encode)
                } else {
                  return tokens
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/\u00a0/g, ' ')
                }
              },

              type: function(o) {
                return Object.prototype.toString
                  .call(o)
                  .match(/\[object (\w+)\]/)[1]
              },

              objId: function(obj) {
                if (!obj['__id']) {
                  Object.defineProperty(obj, '__id', { value: ++uniqueId })
                }
                return obj['__id']
              },

              // Deep clone a language definition (e.g. to extend it)
              clone: function(o, visited) {
                var type = _.util.type(o)
                visited = visited || {}

                switch (type) {
                  case 'Object':
                    if (visited[_.util.objId(o)]) {
                      return visited[_.util.objId(o)]
                    }
                    var clone = {}
                    visited[_.util.objId(o)] = clone

                    for (var key in o) {
                      if (o.hasOwnProperty(key)) {
                        clone[key] = _.util.clone(o[key], visited)
                      }
                    }

                    return clone

                  case 'Array':
                    if (visited[_.util.objId(o)]) {
                      return visited[_.util.objId(o)]
                    }
                    var clone = []
                    visited[_.util.objId(o)] = clone

                    o.forEach(function(v, i) {
                      clone[i] = _.util.clone(v, visited)
                    })

                    return clone
                }

                return o
              }
            },

            languages: {
              extend: function(id, redef) {
                var lang = _.util.clone(_.languages[id])

                for (var key in redef) {
                  lang[key] = redef[key]
                }

                return lang
              },

              /**
               * Insert a token before another token in a language literal
               * As this needs to recreate the object (we cannot actually insert before keys in object literals),
               * we cannot just provide an object, we need anobject and a key.
               * @param inside The key (or language id) of the parent
               * @param before The key to insert before. If not provided, the function appends instead.
               * @param insert Object with the key/value pairs to insert
               * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
               */
              insertBefore: function(inside, before, insert, root) {
                root = root || _.languages
                var grammar = root[inside]

                if (arguments.length == 2) {
                  insert = arguments[1]

                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      grammar[newToken] = insert[newToken]
                    }
                  }

                  return grammar
                }

                var ret = {}

                for (var token in grammar) {
                  if (grammar.hasOwnProperty(token)) {
                    if (token == before) {
                      for (var newToken in insert) {
                        if (insert.hasOwnProperty(newToken)) {
                          ret[newToken] = insert[newToken]
                        }
                      }
                    }

                    ret[token] = grammar[token]
                  }
                }

                // Update references in other language definitions
                _.languages.DFS(_.languages, function(key, value) {
                  if (value === root[inside] && key != inside) {
                    this[key] = ret
                  }
                })

                return (root[inside] = ret)
              },

              // Traverse a language definition with Depth First Search
              DFS: function(o, callback, type, visited) {
                visited = visited || {}
                for (var i in o) {
                  if (o.hasOwnProperty(i)) {
                    callback.call(o, i, o[i], type || i)

                    if (
                      _.util.type(o[i]) === 'Object' &&
                      !visited[_.util.objId(o[i])]
                    ) {
                      visited[_.util.objId(o[i])] = true
                      _.languages.DFS(o[i], callback, null, visited)
                    } else if (
                      _.util.type(o[i]) === 'Array' &&
                      !visited[_.util.objId(o[i])]
                    ) {
                      visited[_.util.objId(o[i])] = true
                      _.languages.DFS(o[i], callback, i, visited)
                    }
                  }
                }
              }
            },
            plugins: {},

            highlightAll: function(async, callback) {
              _.highlightAllUnder(document, async, callback)
            },

            highlightAllUnder: function(container, async, callback) {
              var env = {
                callback: callback,
                selector:
                  'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
              }

              _.hooks.run('before-highlightall', env)

              var elements =
                env.elements || container.querySelectorAll(env.selector)

              for (var i = 0, element; (element = elements[i++]); ) {
                _.highlightElement(element, async === true, env.callback)
              }
            },

            highlightElement: function(element, async, callback) {
              // Find language
              var language,
                grammar,
                parent = element

              while (parent && !lang.test(parent.className)) {
                parent = parent.parentNode
              }

              if (parent) {
                language = (parent.className.match(lang) || [
                  ,
                  ''
                ])[1].toLowerCase()
                grammar = _.languages[language]
              }

              // Set language on the element, if not present
              element.className =
                element.className.replace(lang, '').replace(/\s+/g, ' ') +
                ' language-' +
                language

              if (element.parentNode) {
                // Set language on the parent, for styling
                parent = element.parentNode

                if (/pre/i.test(parent.nodeName)) {
                  parent.className =
                    parent.className.replace(lang, '').replace(/\s+/g, ' ') +
                    ' language-' +
                    language
                }
              }

              var code = element.textContent

              var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
              }

              _.hooks.run('before-sanity-check', env)

              if (!env.code || !env.grammar) {
                if (env.code) {
                  _.hooks.run('before-highlight', env)
                  env.element.textContent = env.code
                  _.hooks.run('after-highlight', env)
                }
                _.hooks.run('complete', env)
                return
              }

              _.hooks.run('before-highlight', env)

              if (async && _self.Worker) {
                var worker = new Worker(_.filename)

                worker.onmessage = function(evt) {
                  env.highlightedCode = evt.data

                  _.hooks.run('before-insert', env)

                  env.element.innerHTML = env.highlightedCode

                  callback && callback.call(env.element)
                  _.hooks.run('after-highlight', env)
                  _.hooks.run('complete', env)
                }

                worker.postMessage(
                  JSON.stringify({
                    language: env.language,
                    code: env.code,
                    immediateClose: true
                  })
                )
              } else {
                env.highlightedCode = _.highlight(
                  env.code,
                  env.grammar,
                  env.language
                )

                _.hooks.run('before-insert', env)

                env.element.innerHTML = env.highlightedCode

                callback && callback.call(element)

                _.hooks.run('after-highlight', env)
                _.hooks.run('complete', env)
              }
            },

            highlight: function(text, grammar, language) {
              var env = {
                code: text,
                grammar: grammar,
                language: language
              }
              _.hooks.run('before-tokenize', env)
              env.tokens = _.tokenize(env.code, env.grammar)
              _.hooks.run('after-tokenize', env)
              return Token.stringify(_.util.encode(env.tokens), env.language)
            },

            matchGrammar: function(
              text,
              strarr,
              grammar,
              index,
              startPos,
              oneshot,
              target
            ) {
              var Token = _.Token

              for (var token in grammar) {
                if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                  continue
                }

                if (token == target) {
                  return
                }

                var patterns = grammar[token]
                patterns =
                  _.util.type(patterns) === 'Array' ? patterns : [patterns]

                for (var j = 0; j < patterns.length; ++j) {
                  var pattern = patterns[j],
                    inside = pattern.inside,
                    lookbehind = !!pattern.lookbehind,
                    greedy = !!pattern.greedy,
                    lookbehindLength = 0,
                    alias = pattern.alias

                  if (greedy && !pattern.pattern.global) {
                    // Without the global flag, lastIndex won't work
                    var flags = pattern.pattern.toString().match(/[imuy]*$/)[0]
                    pattern.pattern = RegExp(
                      pattern.pattern.source,
                      flags + 'g'
                    )
                  }

                  pattern = pattern.pattern || pattern

                  // Don’t cache length as it changes during the loop
                  for (
                    var i = index, pos = startPos;
                    i < strarr.length;
                    pos += strarr[i].length, ++i
                  ) {
                    var str = strarr[i]

                    if (strarr.length > text.length) {
                      // Something went terribly wrong, ABORT, ABORT!
                      return
                    }

                    if (str instanceof Token) {
                      continue
                    }

                    if (greedy && i != strarr.length - 1) {
                      pattern.lastIndex = pos
                      var match = pattern.exec(text)
                      if (!match) {
                        break
                      }

                      var from =
                          match.index + (lookbehind ? match[1].length : 0),
                        to = match.index + match[0].length,
                        k = i,
                        p = pos

                      for (
                        var len = strarr.length;
                        k < len &&
                        (p < to || (!strarr[k].type && !strarr[k - 1].greedy));
                        ++k
                      ) {
                        p += strarr[k].length
                        // Move the index i to the element in strarr that is closest to from
                        if (from >= p) {
                          ++i
                          pos = p
                        }
                      }

                      // If strarr[i] is a Token, then the match starts inside another Token, which is invalid
                      if (strarr[i] instanceof Token) {
                        continue
                      }

                      // Number of tokens to delete and replace with the new match
                      delNum = k - i
                      str = text.slice(pos, p)
                      match.index -= pos
                    } else {
                      pattern.lastIndex = 0

                      var match = pattern.exec(str),
                        delNum = 1
                    }

                    if (!match) {
                      if (oneshot) {
                        break
                      }

                      continue
                    }

                    if (lookbehind) {
                      lookbehindLength = match[1] ? match[1].length : 0
                    }

                    var from = match.index + lookbehindLength,
                      match = match[0].slice(lookbehindLength),
                      to = from + match.length,
                      before = str.slice(0, from),
                      after = str.slice(to)

                    var args = [i, delNum]

                    if (before) {
                      ++i
                      pos += before.length
                      args.push(before)
                    }

                    var wrapped = new Token(
                      token,
                      inside ? _.tokenize(match, inside) : match,
                      alias,
                      match,
                      greedy
                    )

                    args.push(wrapped)

                    if (after) {
                      args.push(after)
                    }

                    Array.prototype.splice.apply(strarr, args)

                    if (delNum != 1)
                      _.matchGrammar(text, strarr, grammar, i, pos, true, token)

                    if (oneshot) break
                  }
                }
              }
            },

            tokenize: function(text, grammar, language) {
              var strarr = [text]

              var rest = grammar.rest

              if (rest) {
                for (var token in rest) {
                  grammar[token] = rest[token]
                }

                delete grammar.rest
              }

              _.matchGrammar(text, strarr, grammar, 0, 0, false)

              return strarr
            },

            hooks: {
              all: {},

              add: function(name, callback) {
                var hooks = _.hooks.all

                hooks[name] = hooks[name] || []

                hooks[name].push(callback)
              },

              run: function(name, env) {
                var callbacks = _.hooks.all[name]

                if (!callbacks || !callbacks.length) {
                  return
                }

                for (var i = 0, callback; (callback = callbacks[i++]); ) {
                  callback(env)
                }
              }
            }
          })

          var Token = (_.Token = function(
            type,
            content,
            alias,
            matchedStr,
            greedy
          ) {
            this.type = type
            this.content = content
            this.alias = alias
            // Copy of the full string this token was created from
            this.length = (matchedStr || '').length | 0
            this.greedy = !!greedy
          })

          Token.stringify = function(o, language, parent) {
            if (typeof o == 'string') {
              return o
            }

            if (_.util.type(o) === 'Array') {
              return o
                .map(function(element) {
                  return Token.stringify(element, language, o)
                })
                .join('')
            }

            var env = {
              type: o.type,
              content: Token.stringify(o.content, language, parent),
              tag: 'span',
              classes: ['token', o.type],
              attributes: {},
              language: language,
              parent: parent
            }

            if (o.alias) {
              var aliases =
                _.util.type(o.alias) === 'Array' ? o.alias : [o.alias]
              Array.prototype.push.apply(env.classes, aliases)
            }

            _.hooks.run('wrap', env)

            var attributes = Object.keys(env.attributes)
              .map(function(name) {
                return (
                  name +
                  '="' +
                  (env.attributes[name] || '').replace(/"/g, '&quot;') +
                  '"'
                )
              })
              .join(' ')

            return (
              '<' +
              env.tag +
              ' class="' +
              env.classes.join(' ') +
              '"' +
              (attributes ? ' ' + attributes : '') +
              '>' +
              env.content +
              '</' +
              env.tag +
              '>'
            )
          }

          if (!_self.document) {
            if (!_self.addEventListener) {
              // in Node.js
              return _self.Prism
            }

            if (!_.disableWorkerMessageHandler) {
              // In worker
              _self.addEventListener(
                'message',
                function(evt) {
                  var message = JSON.parse(evt.data),
                    lang = message.language,
                    code = message.code,
                    immediateClose = message.immediateClose

                  _self.postMessage(_.highlight(code, _.languages[lang], lang))
                  if (immediateClose) {
                    _self.close()
                  }
                },
                false
              )
            }

            return _self.Prism
          }

          //Get current script and highlight
          var script =
            document.currentScript ||
            [].slice.call(document.getElementsByTagName('script')).pop()

          if (script) {
            _.filename = script.src

            if (!_.manual && !script.hasAttribute('data-manual')) {
              if (document.readyState !== 'loading') {
                if (window.requestAnimationFrame) {
                  window.requestAnimationFrame(_.highlightAll)
                } else {
                  window.setTimeout(_.highlightAll, 16)
                }
              } else {
                document.addEventListener('DOMContentLoaded', _.highlightAll)
              }
            }
          }

          return _self.Prism
        })()

        if (typeof module !== 'undefined' && module.exports) {
          module.exports = Prism
        }

        // hack for components to work correctly in node.js
        if (typeof global !== 'undefined') {
          global.Prism = Prism
        }

        /* **********************************************
     Begin prism-markup.js
********************************************** */

        Prism.languages.markup = {
          comment: /<!--[\s\S]*?-->/,
          prolog: /<\?[\s\S]+?\?>/,
          doctype: /<!DOCTYPE[\s\S]+?>/i,
          cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
          tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
            greedy: true,
            inside: {
              tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                  punctuation: /^<\/?/,
                  namespace: /^[^\s>\/:]+:/
                }
              },
              'attr-value': {
                pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                inside: {
                  punctuation: [
                    /^=/,
                    {
                      pattern: /(^|[^\\])["']/,
                      lookbehind: true
                    }
                  ]
                }
              },
              punctuation: /\/?>/,
              'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: {
                  namespace: /^[^\s>\/:]+:/
                }
              }
            }
          },
          entity: /&#?[\da-z]{1,8};/i
        }

        Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
          Prism.languages.markup['entity']

        // Plugin to make entity title show the real entity, idea by Roman Komarov
        Prism.hooks.add('wrap', function(env) {
          if (env.type === 'entity') {
            env.attributes['title'] = env.content.replace(/&amp;/, '&')
          }
        })

        Prism.languages.xml = Prism.languages.markup
        Prism.languages.html = Prism.languages.markup
        Prism.languages.mathml = Prism.languages.markup
        Prism.languages.svg = Prism.languages.markup

        /* **********************************************
     Begin prism-css.js
********************************************** */

        Prism.languages.css = {
          comment: /\/\*[\s\S]*?\*\//,
          atrule: {
            pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
            inside: {
              rule: /@[\w-]+/
              // See rest below
            }
          },
          url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
          selector: /[^{}\s][^{};]*?(?=\s*\{)/,
          string: {
            pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true
          },
          property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
          important: /\B!important\b/i,
          function: /[-a-z0-9]+(?=\()/i,
          punctuation: /[(){};:]/
        }

        Prism.languages.css['atrule'].inside.rest = Prism.languages.css

        if (Prism.languages.markup) {
          Prism.languages.insertBefore('markup', 'tag', {
            style: {
              pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
              lookbehind: true,
              inside: Prism.languages.css,
              alias: 'language-css',
              greedy: true
            }
          })

          Prism.languages.insertBefore(
            'inside',
            'attr-value',
            {
              'style-attr': {
                pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                inside: {
                  'attr-name': {
                    pattern: /^\s*style/i,
                    inside: Prism.languages.markup.tag.inside
                  },
                  punctuation: /^\s*=\s*['"]|['"]\s*$/,
                  'attr-value': {
                    pattern: /.+/i,
                    inside: Prism.languages.css
                  }
                },
                alias: 'language-css'
              }
            },
            Prism.languages.markup.tag
          )
        }

        /* **********************************************
     Begin prism-clike.js
********************************************** */

        Prism.languages.clike = {
          comment: [
            {
              pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
              lookbehind: true
            },
            {
              pattern: /(^|[^\\:])\/\/.*/,
              lookbehind: true,
              greedy: true
            }
          ],
          string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true
          },
          'class-name': {
            pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
            lookbehind: true,
            inside: {
              punctuation: /[.\\]/
            }
          },
          keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
          boolean: /\b(?:true|false)\b/,
          function: /[a-z0-9_]+(?=\()/i,
          number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
          punctuation: /[{}[\];(),.:]/
        }

        /* **********************************************
     Begin prism-javascript.js
********************************************** */

        Prism.languages.javascript = Prism.languages.extend('clike', {
          keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
          number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
          // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
          function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
          operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
        })

        Prism.languages.insertBefore('javascript', 'keyword', {
          regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
            lookbehind: true,
            greedy: true
          },
          // This must be declared before keyword because we use "function" inside the look-forward
          'function-variable': {
            pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
            alias: 'function'
          },
          constant: /\b[A-Z][A-Z\d_]*\b/
        })

        Prism.languages.insertBefore('javascript', 'string', {
          'template-string': {
            pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
            greedy: true,
            inside: {
              interpolation: {
                pattern: /\${[^}]+}/,
                inside: {
                  'interpolation-punctuation': {
                    pattern: /^\${|}$/,
                    alias: 'punctuation'
                  },
                  rest: null // See below
                }
              },
              string: /[\s\S]+/
            }
          }
        })
        Prism.languages.javascript['template-string'].inside[
          'interpolation'
        ].inside.rest = Prism.languages.javascript

        if (Prism.languages.markup) {
          Prism.languages.insertBefore('markup', 'tag', {
            script: {
              pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
              lookbehind: true,
              inside: Prism.languages.javascript,
              alias: 'language-javascript',
              greedy: true
            }
          })
        }

        Prism.languages.js = Prism.languages.javascript

        /* **********************************************
     Begin prism-file-highlight.js
********************************************** */
        ;(function() {
          if (
            typeof self === 'undefined' ||
            !self.Prism ||
            !self.document ||
            !document.querySelector
          ) {
            return
          }

          self.Prism.fileHighlight = function() {
            var Extensions = {
              js: 'javascript',
              py: 'python',
              rb: 'ruby',
              ps1: 'powershell',
              psm1: 'powershell',
              sh: 'bash',
              bat: 'batch',
              h: 'c',
              tex: 'latex'
            }

            Array.prototype.slice
              .call(document.querySelectorAll('pre[data-src]'))
              .forEach(function(pre) {
                var src = pre.getAttribute('data-src')

                var language,
                  parent = pre
                var lang = /\blang(?:uage)?-([\w-]+)\b/i
                while (parent && !lang.test(parent.className)) {
                  parent = parent.parentNode
                }

                if (parent) {
                  language = (pre.className.match(lang) || [, ''])[1]
                }

                if (!language) {
                  var extension = (src.match(/\.(\w+)$/) || [, ''])[1]
                  language = Extensions[extension] || extension
                }

                var code = document.createElement('code')
                code.className = 'language-' + language

                pre.textContent = ''

                code.textContent = 'Loading…'

                pre.appendChild(code)

                var xhr = new XMLHttpRequest()

                xhr.open('GET', src, true)

                xhr.onreadystatechange = function() {
                  if (xhr.readyState == 4) {
                    if (xhr.status < 400 && xhr.responseText) {
                      code.textContent = xhr.responseText

                      Prism.highlightElement(code)
                    } else if (xhr.status >= 400) {
                      code.textContent =
                        '✖ Error ' +
                        xhr.status +
                        ' while fetching file: ' +
                        xhr.statusText
                    } else {
                      code.textContent =
                        '✖ Error: File does not exist or is empty'
                    }
                  }
                }

                xhr.send(null)
              })

            if (Prism.plugins.toolbar) {
              Prism.plugins.toolbar.registerButton('download-file', function(
                env
              ) {
                var pre = env.element.parentNode
                if (
                  !pre ||
                  !/pre/i.test(pre.nodeName) ||
                  !pre.hasAttribute('data-src') ||
                  !pre.hasAttribute('data-download-link')
                ) {
                  return
                }
                var src = pre.getAttribute('data-src')
                var a = document.createElement('a')
                a.textContent =
                  pre.getAttribute('data-download-link-label') || 'Download'
                a.setAttribute('download', '')
                a.href = src
                return a
              })
            }
          }

          document.addEventListener(
            'DOMContentLoaded',
            self.Prism.fileHighlight
          )
        })()
      },
      {}
    ],
    'js/components/Code.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _prismjs = require('prismjs')

        var _prismjs2 = _interopRequireDefault(_prismjs)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var getLang = function getLang(str) {
          return (str.match(/```(js|html|css|shell)/) || [])[1]
        }

        exports.default = function(_ref) {
          var content = _ref.content,
            lang = _ref.lang

          lang = getLang(content || '') || lang || 'js'
          return (0, _hyperapp.h)(
            'div',
            { class: 'code-wrapper', 'data-lang': lang },
            (0, _hyperapp.h)(
              'pre',
              null,
              (0, _hyperapp.h)(
                'code',
                {
                  oncreate: _prismjs2.default.highlightElement,
                  class: 'lang-' + lang
                },
                content
                  .replace(/```(js|html|css|shell)([\s\S]*)```/g, '$2')
                  .trim()
              )
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        prismjs: '../node_modules/prismjs/prism.js'
      }
    ],
    'js/components/ExternalLink.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        exports.default = function(_ref, children) {
          var to = _ref.to
          return (0, _hyperapp.h)(
            'a',
            { href: to, target: '_blank', rel: 'noopener noreferrer' },
            children
          )
        }
      },
      { hyperapp: '../node_modules/hyperapp/src/index.js' }
    ],
    'js/sections/GettingStarted.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _ExternalLink = require('../components/ExternalLink')

        var _ExternalLink2 = _interopRequireDefault(_ExternalLink)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Getting Started'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83D\uDCE6' },
            (0, _hyperapp.h)(
              Subheading,
              null,
              'Option 1: CDN ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83D\uDD17'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'Include this script from the unpkg CDN in your HTML document before your own scripts:'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              lang: 'html',
              content:
                '<script src="https://unpkg.com/tippy.js@3/dist/tippy.all.min.js"></script>'
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              "Once it's loaded, you'll have access to the ",
              (0, _hyperapp.h)('code', null, 'tippy'),
              ' module which will allow you to create awesome tooltips!'
            ),
            (0, _hyperapp.h)(
              Subheading,
              null,
              'Option 2: Package Manager ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83D\uDCE6'
              )
            ),
            (0, _hyperapp.h)('p', null, 'Install using either npm or yarn:'),
            (0, _hyperapp.h)(_Code2.default, {
              lang: 'shell',
              content: 'npm i tippy.js'
            }),
            (0, _hyperapp.h)(_Code2.default, {
              lang: 'shell',
              content: 'yarn add tippy.js'
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'Then you can import the ',
              (0, _hyperapp.h)('code', null, 'tippy'),
              ' module:'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: "import tippy from 'tippy.js'"
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              "You'll also need to import Tippy's CSS. With a module bundler like Webpack or Parcel, it can be imported directly:"
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: "import 'tippy.js/dist/tippy.css'"
            }),
            (0, _hyperapp.h)(
              Subheading,
              null,
              'View Library Components ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83C\uDF81'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'If you would like to use Tippy.js as a declarative component, there are wrappers available.'
            ),
            (0, _hyperapp.h)(
              'ul',
              null,
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)(
                  _ExternalLink2.default,
                  { to: 'https://github.com/atomiks/tippy.js-react' },
                  'React'
                )
              )
            ),
            (0, _hyperapp.h)(
              Subheading,
              null,
              'Files ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83D\uDCC1'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'Tippy builds a bunch of different files that can be used:'
            ),
            (0, _hyperapp.h)(
              'ul',
              null,
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy.all.js'),
                ' is all dependencies (Tippy + Popper + CSS) in a single file. The CSS is injected into the document head.'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy.js'),
                ' is Tippy + Popper together, without the CSS.'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy.standalone.js'),
                ' is Tippy by itself, without Popper or the CSS. This is useful if you are using a CDN and want to use the latest version of Popper.js if the bundled version is outdated, or use Popper itself for other things.'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy.css'),
                " is Tippy's CSS stylesheet by itself."
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'There are also ',
              (0, _hyperapp.h)('code', null, '.min'),
              ' versions of the above, which means the file is minified for production use.'
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../components/Section': 'js/components/Section.js',
        '../components/Heading': 'js/components/Heading.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/ExternalLink': 'js/components/ExternalLink.js'
      }
    ],
    'snippets/virtual-reference.md': [
      function(require, module, exports) {
        module.exports =
          '```js\nconst virtualReference = {\n  getBoundingClientRect() {\n    return {\n      width: 100,\n      height: 100,\n      top: 100,\n      left: 100,\n      right: 200,\n      bottom: 200\n    }\n  },\n  clientHeight: 100,\n  clientWidth: 100\n}\n\ntippy(virtualReference, { content: "I\'m a tooltip!" })\n```\n'
      },
      {}
    ],
    'snippets/auto-tippy-button.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<button data-tippy="I\'m a tooltip!">Text</button>\n```\n'
      },
      {}
    ],
    'snippets/function-button.md': [
      function(require, module, exports) {
        module.exports = '```html\n<button>Text</button>\n```\n'
      },
      {}
    ],
    'snippets/function-call.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('button', { content: \"I'm a tooltip!\" })\n```\n"
      },
      {}
    ],
    'js/components/ResultBox.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        exports.default = function(props, children) {
          return (0, _hyperapp.h)(
            'div',
            { class: 'section__result' },
            (0, _hyperapp.h)('p', { class: 'section__result-text' }, 'Result:'),
            children
          )
        }
      },
      { hyperapp: '../node_modules/hyperapp/src/index.js' }
    ],
    'js/sections/CreatingTooltips.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _virtualReference = require('../../snippets/virtual-reference')

        var _virtualReference2 = _interopRequireDefault(_virtualReference)

        var _autoTippyButton = require('../../snippets/auto-tippy-button')

        var _autoTippyButton2 = _interopRequireDefault(_autoTippyButton)

        var _functionButton = require('../../snippets/function-button')

        var _functionButton2 = _interopRequireDefault(_functionButton)

        var _functionCall = require('../../snippets/function-call')

        var _functionCall2 = _interopRequireDefault(_functionCall)

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        var _ResultBox = require('../components/ResultBox')

        var _ResultBox2 = _interopRequireDefault(_ResultBox)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Creating Tooltips'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83D\uDD27' },
            (0, _hyperapp.h)(Subheading, null, 'Method 1: Auto'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Give your reference element a ',
              (0, _hyperapp.h)('code', null, 'data-tippy'),
              ' attribute containing the tooltip content.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _autoTippyButton2.default
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              "When Tippy.js is loaded in the document, it will search for elements with the attribute and give them a tooltip automatically. This means you won't have to touch JavaScript at all."
            ),
            (0, _hyperapp.h)(Subheading, null, 'Method 2: Function'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Use the ',
              (0, _hyperapp.h)('code', null, 'tippy'),
              ' function.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _functionButton2.default
            }),
            (0, _hyperapp.h)(_Code2.default, {
              content: _functionCall2.default
            }),
            (0, _hyperapp.h)(
              _ResultBox2.default,
              null,
              (0, _hyperapp.h)(
                _Tippy2.default,
                { content: "I'm a tooltip!" },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Text')
              )
            ),
            (0, _hyperapp.h)(
              Subheading,
              null,
              'Accepted inputs ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83C\uDF9B'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'A single',
              ' ',
              (0, _hyperapp.h)(
                _Tippy2.default.secondary,
                {
                  content: (0, _hyperapp.h)(
                    'div',
                    null,
                    (0, _hyperapp.h)('strong', null, 'D'),
                    'ocument ',
                    (0, _hyperapp.h)('strong', null, 'O'),
                    'bject ',
                    (0, _hyperapp.h)('strong', null, 'M'),
                    'odel - the tree structure of the HTML document where each node (such as a DIV tag) is represented by an object'
                  )
                },
                (0, _hyperapp.h)(
                  'span',
                  { tabindex: '0', class: 'tippy' },
                  'DOM'
                )
              ),
              ' ',
              (0, _hyperapp.h)('code', null, 'Element'),
              ' (or an array of them) will work:'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: "tippy(document.querySelector('.btn'))"
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'As well as a ',
              (0, _hyperapp.h)('code', null, 'NodeList'),
              ':'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: "tippy(document.querySelectorAll('.btn'))"
            }),
            (0, _hyperapp.h)(
              Subheading,
              null,
              'Advanced ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83E\uDD2F'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'You can use a virtual element as the positioning reference instead of a real element:'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _virtualReference2.default
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'Popper.js uses these properties to determine the position of the tooltip.'
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/virtual-reference': 'snippets/virtual-reference.md',
        '../../snippets/auto-tippy-button': 'snippets/auto-tippy-button.md',
        '../../snippets/function-button': 'snippets/function-button.md',
        '../../snippets/function-call': 'snippets/function-call.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Code': 'js/components/Code.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Tippy': 'js/components/Tippy.js',
        '../components/ResultBox': 'js/components/ResultBox.js',
        '../components/Heading': 'js/components/Heading.js'
      }
    ],
    'snippets/html-button.md': [
      function(require, module, exports) {
        module.exports = '```html\n<button class="btn">Text</button>\n```\n'
      },
      {}
    ],
    'snippets/options-object.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('.btn', {\n  content: \"I'm a tooltip!\",\n  delay: 100,\n  arrow: true,\n  arrowType: 'round',\n  size: 'large',\n  duration: 500\n  animation: 'scale'\n})\n```\n"
      },
      {}
    ],
    'snippets/data-attributes.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<button\n  class="btn"\n  data-tippy="I\'m a Tippy tooltip!"\n  data-tippy-delay="50"\n  data-tippy-arrow="true"\n  data-tippy-animation="shift-toward"\n>\n  Text\n</button>\n```\n'
      },
      {}
    ],
    'snippets/multiple-content-html.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<button class="btn" data-tippy-content="Tooltip A">Text</button>\n<button class="btn" data-tippy-content="Tooltip B">Text</button>\n<button class="btn" data-tippy-content="Tooltip C">Text</button>\n```\n'
      },
      {}
    ],
    'snippets/multiple-content-js.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('.btn', {\n  animation: 'shift-toward',\n  arrow: true,\n  delay: 50\n})\n```\n"
      },
      {}
    ],
    'snippets/set-defaults.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy.setDefaults({\n  arrow: true,\n  arrowType: 'round',\n  duration: 0\n})\n```\n"
      },
      {}
    ],
    'js/sections/CustomizingTooltips.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _htmlButton = require('../../snippets/html-button.md')

        var _htmlButton2 = _interopRequireDefault(_htmlButton)

        var _optionsObject = require('../../snippets/options-object.md')

        var _optionsObject2 = _interopRequireDefault(_optionsObject)

        var _dataAttributes = require('../../snippets/data-attributes.md')

        var _dataAttributes2 = _interopRequireDefault(_dataAttributes)

        var _multipleContentHtml = require('../../snippets/multiple-content-html.md')

        var _multipleContentHtml2 = _interopRequireDefault(_multipleContentHtml)

        var _multipleContentJs = require('../../snippets/multiple-content-js.md')

        var _multipleContentJs2 = _interopRequireDefault(_multipleContentJs)

        var _setDefaults = require('../../snippets/set-defaults.md')

        var _setDefaults2 = _interopRequireDefault(_setDefaults)

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        var _ResultBox = require('../components/ResultBox')

        var _ResultBox2 = _interopRequireDefault(_ResultBox)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Customizing Tooltips'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\u2699\uFE0F' },
            (0, _hyperapp.h)(
              'p',
              null,
              (0, _hyperapp.h)('code', null, 'tippy()'),
              " takes an object of options as a second argument for you to configure the tooltips being created. Here's an example:"
            ),
            (0, _hyperapp.h)(_Code2.default, { content: _htmlButton2.default }),
            (0, _hyperapp.h)(_Code2.default, {
              content: _optionsObject2.default
            }),
            (0, _hyperapp.h)(
              _ResultBox2.default,
              null,
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  content: "I'm a tooltip!",
                  delay: 100,
                  arrow: true,
                  arrowType: 'round',
                  size: 'large',
                  duration: 500,
                  animation: 'scale'
                },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Text')
              )
            ),
            (0, _hyperapp.h)(
              Subheading,
              null,
              'Data attributes ',
              (0, _hyperapp.h)(
                _Emoji2.default,
                { class: 'section__emoji' },
                '\uD83C\uDFF7'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'You can also specify options on the reference element itself by adding',
              ' ',
              (0, _hyperapp.h)('code', null, 'data-tippy-*'),
              ' attributes. This will override the options specified in the instance.'
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'Used in conjunction with the Auto Method, you can give elements custom tooltips without ever touching JavaScript.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _dataAttributes2.default
            }),
            (0, _hyperapp.h)(
              _ResultBox2.default,
              null,
              (0, _hyperapp.h)(
                _Tippy2.default,
                { delay: 50, arrow: true, animation: 'shift-toward' },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Text')
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'Using ',
              (0, _hyperapp.h)('code', null, 'data-tippy-content'),
              ' therefore allows you to use the function for common custom configuration while giving each tooltip different content.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _multipleContentHtml2.default
            }),
            (0, _hyperapp.h)(_Code2.default, {
              content: _multipleContentJs2.default
            }),
            (0, _hyperapp.h)(Subheading, null, 'Default config'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Use the ',
              (0, _hyperapp.h)('code', null, 'tippy.setDefaults()'),
              ' method to change the default configuration for tippys. It will apply these settings to every future instance.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _setDefaults2.default
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'Note that the auto-initializing function is deferred with',
              ' ',
              (0, _hyperapp.h)('code', null, 'setTimeout()'),
              ', which means you can change the default config before the tooltips are automatically created.'
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/html-button.md': 'snippets/html-button.md',
        '../../snippets/options-object.md': 'snippets/options-object.md',
        '../../snippets/data-attributes.md': 'snippets/data-attributes.md',
        '../../snippets/multiple-content-html.md':
          'snippets/multiple-content-html.md',
        '../../snippets/multiple-content-js.md':
          'snippets/multiple-content-js.md',
        '../../snippets/set-defaults.md': 'snippets/set-defaults.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/Tippy': 'js/components/Tippy.js',
        '../components/ResultBox': 'js/components/ResultBox.js',
        '../components/Heading': 'js/components/Heading.js'
      }
    ],
    'snippets/ajax.md': [
      function(require, module, exports) {
        module.exports =
          "```js\nconst INITIAL_CONTENT = 'Loading...'\n\nconst state = {\n  isFetching: false,\n  canFetch: true\n}\n\ntippy('#ajax-tippy', {\n  content: INITIAL_CONTENT,\n  async onShow(tip) {\n    if (state.isFetching || !state.canFetch) return\n\n    state.isFetching = true\n    state.canFetch = false\n\n    try {\n      const response = await fetch('https://unsplash.it/200/?random')\n      const blob = await response.blob()\n      const url = URL.createObjectURL(blob)\n      if (tip.state.isVisible) {\n        const img = new Image()\n        img.width = 200\n        img.height = 200\n        img.src = url\n        tip.setContent(img)\n      }\n    } catch (e) {\n      tip.setContent(`Fetch failed. ${e}`)\n    } finally {\n      state.isFetching = false\n    }\n  },\n  onHidden(tip) {\n    state.canFetch = true\n    tip.setContent(INITIAL_CONTENT)\n  }\n})\n```\n"
      },
      {}
    ],
    'snippets/event-delegation-html.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<div id="parent">\n  <div class="child">Text</div>\n  <div class="child">Text</div>\n  <div class="child">Text</div>\n  <div class="other">Text</div>\n</div>\n```\n'
      },
      {}
    ],
    'snippets/event-delegation-js.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('#parent', {\n  content: 'Shared content',\n  target: '.child'\n})\n```\n"
      },
      {}
    ],
    'snippets/scrollable-container.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('.mySelector', {\n  popperOptions: {\n    modifiers: {\n      preventOverflow: { enabled: false },\n      hide: { enabled: false }\n    }\n  }\n})\n```\n"
      },
      {}
    ],
    'snippets/disable-touch.md': [
      function(require, module, exports) {
        module.exports =
          '```js\n// Disable the tooltip on touch devices\ntip.disableTouch()\n```\n'
      },
      {}
    ],
    'snippets/on-image-dimensions-known.md': [
      function(require, module, exports) {
        module.exports =
          '```js\nfunction onImageDimensionsKnown(img, callback) {\n  const interval = setInterval(() => {\n    if (img.naturalWidth) {\n      clearInterval(interval)\n      callback()\n    }\n  })\n  // Clean up if the image dimensions fail to be known\n  setTimeout(() => {\n    clearInterval(interval)\n  }, 1000)\n}\n\n// Usage:\nonImageDimensionsKnown(img, () => {\n  tip.setContent(img)\n})\n```\n'
      },
      {}
    ],
    'snippets/append-to.md': [
      function(require, module, exports) {
        module.exports =
          '```js\ntippy(list, {\n  appendTo(ref) {\n    return ref.parentNode\n  }\n})\n```\n'
      },
      {}
    ],
    'snippets/wait.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy(ref, {\n  wait(tip, event) {\n    // Delay by 200ms if\n    // trigger was not focus\n    setTimeout(\n      tip.show,\n      event.type === 'focus'\n        ? 0\n        : 200\n    )\n})\n```\n"
      },
      {}
    ],
    'js/components/OptionsTable.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _utils = require('../utils')

        var _Code = require('./Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _appendTo = require('../../snippets/append-to')

        var _appendTo2 = _interopRequireDefault(_appendTo)

        var _wait = require('../../snippets/wait')

        var _wait2 = _interopRequireDefault(_wait)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var Prop = function Prop(props, children) {
          var id = (0, _utils.toKebabCase)(props.name) + '-option'
          return (0, _hyperapp.h)(
            'tr',
            { id: id },
            (0, _hyperapp.h)(
              'td',
              null,
              (0, _hyperapp.h)(
                'code',
                { class: 'prop' },
                (0, _hyperapp.h)('a', { href: '#' + id }, props.name)
              )
            ),
            (0, _hyperapp.h)(
              'td',
              null,
              (0, _hyperapp.h)('code', null, props.default)
            ),
            (0, _hyperapp.h)(
              'td',
              null,
              Array.isArray(props.value)
                ? props.value.map(function(i) {
                    return (0,
                    _hyperapp.h)('div', null, (0, _hyperapp.h)('code', null, i))
                  })
                : (0, _hyperapp.h)('code', null, props.value)
            ),
            (0, _hyperapp.h)('td', null, children)
          )
        }

        exports.default = function() {
          return (0, _hyperapp.h)(
            'div',
            { class: 'table-wrapper' },
            (0, _hyperapp.h)(
              'table',
              { class: 'table', cellspacing: '0' },
              (0, _hyperapp.h)(
                'thead',
                null,
                (0, _hyperapp.h)(
                  'tr',
                  null,
                  (0, _hyperapp.h)('th', null, 'Prop'),
                  (0, _hyperapp.h)('th', null, 'Default'),
                  (0, _hyperapp.h)('th', null, 'Value'),
                  (0, _hyperapp.h)('th', null, 'Description')
                )
              ),
              (0, _hyperapp.h)(
                'tbody',
                null,
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'allowHTML', default: 'true', value: 'Boolean' },
                  'Determines if HTML can be rendered in the tippy.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'animateFill', default: 'true', value: 'Boolean' },
                  "Determines if the tippy's background fill should be animated. Disabled if ",
                  (0, _hyperapp.h)('code', null, 'arrow: true'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'animation',
                    default: '"shift-away"',
                    value: [
                      '"fade"',
                      '"scale"',
                      '"shift-toward"',
                      '"perspective"',
                      '"shift-away"'
                    ]
                  },
                  'The type of transition animation.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'appendTo',
                    default: 'document.body',
                    value: ['Element', 'Function']
                  },
                  'The element to append the tippy to. Use a function that returns an element to dynamically append the tippy relative to the reference element.',
                  (0, _hyperapp.h)(_Code2.default, {
                    content: _appendTo2.default
                  })
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'arrow', default: 'false', value: 'Boolean' },
                  'Determines if an arrow should be added to the tippy pointing toward the reference element.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'arrowType',
                    default: '"sharp"',
                    value: ['"sharp"', '"round"']
                  },
                  'The type of arrow. ',
                  (0, _hyperapp.h)('code', null, '"sharp"'),
                  ' is a CSS triangle using the border method, while ',
                  (0, _hyperapp.h)('code', null, '"round"'),
                  ' is a custom SVG shape.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'arrowTransform',
                    default: '""',
                    value: ['"scaleX(2)"', '"scale(0.8)"']
                  },
                  'CSS transform to apply to the arrow. Only ',
                  (0, _hyperapp.h)('code', null, 'scale'),
                  ' and',
                  ' ',
                  (0, _hyperapp.h)('code', null, 'translate'),
                  ' are supported. It is dynamic. Apply the transform that you would normally give to a ',
                  (0, _hyperapp.h)('code', null, '"top"'),
                  ' ',
                  'placement, even if the placement is different.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'content',
                    default: '""',
                    value: ['String', 'Element']
                  },
                  'The content of the tippy.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'delay',
                    default: '[0, 20]',
                    value: ['Number', '[show, hide]']
                  },
                  'Delay in ms once a trigger event is fired before a tippy shows or hides. Use an array of numbers such as ',
                  (0, _hyperapp.h)('code', null, '[100, 500]'),
                  ' to specify a different value for show and hide. Use ',
                  (0, _hyperapp.h)('code', null, 'null'),
                  ' in the array to use the default value, e.g. ',
                  (0, _hyperapp.h)('code', null, '[null, 50]'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'duration',
                    default: '[275, 250]',
                    value: ['Number', '[show, hide]']
                  },
                  'Duration of the CSS transition animation in ms. Use an array of numbers such as ',
                  (0, _hyperapp.h)('code', null, '[100, 500]'),
                  ' to specify a different value for show and hide. Add ',
                  (0, _hyperapp.h)('code', null, 'null'),
                  ' in the array to use the default value, e.g. ',
                  (0, _hyperapp.h)('code', null, '[null, 50]'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'distance', default: '10', value: 'Number' },
                  'How far in pixels the tippy element is from the reference element. Only applies to a single axis and not to the parent popper element, see',
                  ' ',
                  (0, _hyperapp.h)(
                    'a',
                    { class: 'link', href: '#offset' },
                    'offset'
                  ),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'flip', default: 'true', value: 'Boolean' },
                  'Determines if the tippy flips so that it is placed within the viewport as best it can be if there is not enough room.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'flipBehavior',
                    default: '"flip"',
                    value: ['"flip"', 'Array']
                  },
                  'Determines the order of flipping, i.e. which placements to prefer if a certain placement cannot be used. Use an array such as',
                  ' ',
                  (0, _hyperapp.h)('code', null, '["bottom", "left"]'),
                  ' to prefer the "left" placement if "bottom" is unavailable. By default, it chooses the opposite axis, i.e. "top".'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'followCursor', default: 'false', value: 'Boolean' },
                  "Determines if the tippy follows the user's mouse cursor while showing."
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'hideOnClick',
                    default: 'true',
                    value: ['Boolean', '"toggle"']
                  },
                  'Determines if the tippy should hide if its reference element was clicked. For click-triggered tippys, using ',
                  (0, _hyperapp.h)('code', null, 'false'),
                  ' will prevent the tippy from ever hiding once it is showing. To prevent clicks outside of the tippy from hiding it but still allow it to be toggled, use the string ',
                  (0, _hyperapp.h)('code', null, '"toggle"'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'inertia', default: 'false', value: 'Boolean' },
                  'Adds an attribute to the tippy element that changes the CSS transition timing function to add an inertial "slingshot" effect to the animation.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'interactive', default: 'false', value: 'Boolean' },
                  'Determines if a tippy should be interactive, i.e. able to be hovered over or clicked without hiding.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'interactiveBorder',
                    default: 'false',
                    value: 'Boolean'
                  },
                  'Determines the size of the invisible border around a tippy that will prevent it from hiding (only relevant for the hover trigger). Useful to prevent the tippy from accidentally hiding from clumsy cursor movements.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'interactiveDebounce',
                    default: '0',
                    value: 'Number'
                  },
                  'A number in ms that debounces the ',
                  (0, _hyperapp.h)('code', null, 'onMouseMove'),
                  ' handler which determines when the tippy should hide.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'lazy', default: 'true', value: 'Boolean' },
                  'By default, the ',
                  (0, _hyperapp.h)('code', null, 'popperInstance'),
                  " (the positioning engine for the tippy) is lazily created. That is, it's only created when necessary (i.e. triggering the tippy for the first time). Setting this prop to false allows you to access the instance synchronously without needing to show the tippy."
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'livePlacement', default: 'true', value: 'Boolean' },
                  "Determines if the popper instance should listen to scroll events. This means it will update the position on scroll. If you don't want the tippy to flip around when scrolling, and the tippy's reference is not in a scrollable container, you can set this to false."
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'multiple', default: 'false', value: 'Boolean' },
                  'Determines if the reference can have multiple tippy instances.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'offset', default: 'false', value: 'Boolean' },
                  'An offset that Popper.js uses to offset the popper element. Can work with both the x and y axis, distinct from',
                  ' ',
                  (0, _hyperapp.h)('a', { href: '#distance' }, 'distance'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'onHidden', default: 'noop', value: 'Function' },
                  'Lifecycle function invoked when a tippy has fully transitioned out.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'onHide', default: 'noop', value: 'Function' },
                  'Lifecycle function invoked when a tippy begins to transition out.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'onShow', default: 'noop', value: 'Function' },
                  'Lifecycle function invoked when a tippy begins to transition in.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'onShown', default: 'noop', value: 'Function' },
                  'Lifecycle function invoked when a tippy has fully transitioned in.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'performance', default: 'false', value: 'Boolean' },
                  'If true, disables ',
                  (0, _hyperapp.h)('code', null, 'data-tippy-*'),
                  ' attributes which reduces init execution by half.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'placement',
                    default: '"top"',
                    value: ['"top"', '"bottom"', '"left"', '"right"'],
                    type: 'string'
                  },
                  'Positions the tippy relative to its reference element. Use the suffix',
                  ' ',
                  (0, _hyperapp.h)('code', null, '-start'),
                  ' or ',
                  (0, _hyperapp.h)('code', null, '-end'),
                  ' to shift the tippy to the start or end of the reference element, instead of centering it. For example, ',
                  (0, _hyperapp.h)('code', null, 'top-start'),
                  ' or ',
                  (0, _hyperapp.h)('code', null, 'left-end'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'popperOptions', default: '{}', value: 'Object' },
                  'Specify custom Popper.js options. See the',
                  ' ',
                  (0, _hyperapp.h)(
                    'a',
                    {
                      target: '_blank',
                      href: 'https://popper.js.org/popper-documentation.html'
                    },
                    'Popper.js documentation'
                  ),
                  ' ',
                  'for more.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'shouldPopperHideOnBlur',
                    default: '(FocusOutEvent) => true',
                    value: 'Function'
                  },
                  "A function that returns a boolean to determine if the popper element should hide if it's blurred (applies only if interactive).",
                  ' ',
                  (0, _hyperapp.h)('span', {
                    style: { display: 'block', marginBottom: '10px' }
                  }),
                  'If the popper element is blurred (i.e. no elements within it are in focus), the popper is hidden. However, there are cases in which you may need to keep it visible even when not in focus.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'size',
                    default: '"regular"',
                    value: ['"small"', '"regular"', '"large"']
                  },
                  'The size of the tippy.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'sticky', default: 'false', value: 'Boolean' },
                  'Ensures the tippy stays stuck to its reference element if it moves around while showing.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'target', default: '""', value: 'String' },
                  'CSS selector used for event delegation.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'theme', default: '"dark"', value: 'String' },
                  "Themes added as classes (each separated by a space) to the tippy's class list, which adds a ",
                  (0, _hyperapp.h)('code', null, '-theme'),
                  ' suffix, i.e.',
                  ' ',
                  (0, _hyperapp.h)('code', null, '"dark-theme"'),
                  '.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'touch', default: 'true', value: 'Boolean' },
                  'Determines if the tippy displays on touch devices.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'touchHold', default: 'false', value: 'Boolean' },
                  'Determines trigger behavior on touch devices. If true, instead of a tap on the reference and a tap elsewhere to hide the tippy, the reference must be pressed and held for the tippy to show. Letting go from the screen will hide it.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  {
                    name: 'trigger',
                    default: '"mouseenter focus"',
                    value: ['"mouseenter"', '"focus"', '"click"', '"manual"']
                  },
                  'The events (each separated by a space) which cause a tippy to show. Use manual to only trigger the tippy programmatically.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'updateDuration', default: '200', value: 'Number' },
                  'The transition duration between position updates for the',
                  ' ',
                  (0, _hyperapp.h)('code', null, 'sticky'),
                  ' option. Set to ',
                  (0, _hyperapp.h)('code', null, '0'),
                  ' to prevent flips from transitioning.'
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'wait', default: 'null', value: 'Function' },
                  'A function that, when defined, will wait until you manually invoke',
                  ' ',
                  (0, _hyperapp.h)('code', null, 'show()'),
                  ' when a tippy is triggered. It takes the tippy instance and the trigger event as arguments.',
                  (0, _hyperapp.h)(_Code2.default, { content: _wait2.default })
                ),
                (0, _hyperapp.h)(
                  Prop,
                  { name: 'zIndex', default: '9999', value: 'Number' },
                  'The ',
                  (0, _hyperapp.h)('code', null, 'z-index'),
                  ' of the popper element.'
                )
              )
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../utils': 'js/utils.js',
        './Code': 'js/components/Code.js',
        '../../snippets/append-to': 'snippets/append-to.md',
        '../../snippets/wait': 'snippets/wait.md'
      }
    ],
    'js/sections/AllOptions.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _ajax = require('../../snippets/ajax.md')

        var _ajax2 = _interopRequireDefault(_ajax)

        var _eventDelegationHtml = require('../../snippets/event-delegation-html')

        var _eventDelegationHtml2 = _interopRequireDefault(_eventDelegationHtml)

        var _eventDelegationJs = require('../../snippets/event-delegation-js')

        var _eventDelegationJs2 = _interopRequireDefault(_eventDelegationJs)

        var _scrollableContainer = require('../../snippets/scrollable-container')

        var _scrollableContainer2 = _interopRequireDefault(_scrollableContainer)

        var _disableTouch = require('../../snippets/disable-touch')

        var _disableTouch2 = _interopRequireDefault(_disableTouch)

        var _onImageDimensionsKnown = require('../../snippets/on-image-dimensions-known')

        var _onImageDimensionsKnown2 = _interopRequireDefault(
          _onImageDimensionsKnown
        )

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        var _ResultBox = require('../components/ResultBox')

        var _ResultBox2 = _interopRequireDefault(_ResultBox)

        var _OptionsTable = require('../components/OptionsTable')

        var _OptionsTable2 = _interopRequireDefault(_OptionsTable)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'All Options'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return function(state, actions) {
            return (0, _hyperapp.h)(
              _Section2.default,
              { title: TITLE, emoji: '\uD83D\uDD2E' },
              (0, _hyperapp.h)(
                'p',
                null,
                'Below is a list of all possible options you can pass to tippy.'
              ),
              (0, _hyperapp.h)(_OptionsTable2.default, null),
              (0, _hyperapp.h)(Subheading, null, 'AJAX tooltips'),
              (0, _hyperapp.h)(
                'p',
                null,
                "Lifecycle functions allow you to do powerful things with tippys. Here's an example of dynamic content which on show, fetches a new random image from the Unsplash API."
              ),
              (0, _hyperapp.h)(
                _ResultBox2.default,
                null,
                (0, _hyperapp.h)(
                  _Tippy2.default,
                  {
                    onShow: actions.ajax.onShow,
                    onHidden: actions.ajax.onHidden,
                    arrow: true,
                    content: (0, _hyperapp.h)(
                      'div',
                      null,
                      state.ajax.error && 'Loading failed',
                      !state.ajax.imageSrc
                        ? 'Loading...'
                        : (0, _hyperapp.h)('img', {
                            style: { display: 'block' },
                            width: '200',
                            height: '200',
                            src: state.ajax.imageSrc
                          })
                    )
                  },
                  (0, _hyperapp.h)(
                    'button',
                    { class: 'btn' },
                    'Hover for a new image'
                  )
                )
              ),
              (0, _hyperapp.h)(_Code2.default, { content: _ajax2.default }),
              (0, _hyperapp.h)(
                'p',
                null,
                "Note that if you don't specify the dimensions of the image (",
                (0, _hyperapp.h)('code', null, 'width'),
                ' and ',
                (0, _hyperapp.h)('code', null, 'height'),
                "), the tooltip will be positioned incorrectly once it loads. This is because the position of the tooltip is updated before the image's dimensions become known by the browser."
              ),
              (0, _hyperapp.h)(
                'p',
                null,
                "To ensure the tooltip is positioned correctly, the following utility function will fire the callback function as soon as the image's dimensions become known by the browser (before it's fully loaded)."
              ),
              (0, _hyperapp.h)(_Code2.default, {
                content: _onImageDimensionsKnown2.default
              }),
              (0, _hyperapp.h)(
                'p',
                null,
                'If you want the image to be ',
                (0, _hyperapp.h)('em', null, 'fully'),
                ' loaded, then you can specify',
                ' ',
                (0, _hyperapp.h)('code', null, 'img.onload'),
                ' as the callback before setting ',
                (0, _hyperapp.h)('code', null, 'src'),
                '.'
              ),
              (0, _hyperapp.h)(Subheading, null, 'Event delegation'),
              (0, _hyperapp.h)(
                'p',
                null,
                'Event delegation only requires minimal setup. Your setup should look similar to this, with a parent element wrapping the child elements you would like to give tooltips to:'
              ),
              (0, _hyperapp.h)(_Code2.default, {
                content: _eventDelegationHtml2.default
              }),
              (0, _hyperapp.h)(
                'p',
                null,
                'Then, specify a CSS selector as the ',
                (0, _hyperapp.h)('code', null, 'target'),
                ' that matches child elements which should receive tooltips'
              ),
              (0, _hyperapp.h)(_Code2.default, {
                content: _eventDelegationJs2.default
              }),
              (0, _hyperapp.h)(
                'p',
                null,
                (0, _hyperapp.h)(
                  _Emoji2.default,
                  { size: 'small' },
                  '\u26A0\uFE0F'
                ),
                'Avoid binding a Tippy instance to the body, as',
                ' ',
                (0, _hyperapp.h)('code', null, 'mouseover / mouseout'),
                ' events will constantly fire as the cursor moves over the page. Instead, give it to the nearest possible parent element.'
              ),
              (0, _hyperapp.h)(
                Subheading,
                null,
                'Tooltips inside a scrollable container'
              ),
              (0, _hyperapp.h)(
                'p',
                null,
                'Add the following options to prevent the tippy from staying stuck within the viewport.'
              ),
              (0, _hyperapp.h)(_Code2.default, {
                content: _scrollableContainer2.default
              })
            )
          }
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/ajax.md': 'snippets/ajax.md',
        '../../snippets/event-delegation-html':
          'snippets/event-delegation-html.md',
        '../../snippets/event-delegation-js': 'snippets/event-delegation-js.md',
        '../../snippets/scrollable-container':
          'snippets/scrollable-container.md',
        '../../snippets/disable-touch': 'snippets/disable-touch.md',
        '../../snippets/on-image-dimensions-known':
          'snippets/on-image-dimensions-known.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/Heading': 'js/components/Heading.js',
        '../components/ResultBox': 'js/components/ResultBox.js',
        '../components/OptionsTable': 'js/components/OptionsTable.js',
        '../components/Tippy': 'js/components/Tippy.js'
      }
    ],
    'snippets/tip-collection.md': [
      function(require, module, exports) {
        module.exports =
          "```js\n{\n  // Targets that should receive a tippy\n  targets: '.btn',\n\n  // Default props + options merged together\n  props: { ... },\n\n  // Array of all instances that were created\n  instances: [tip, tip, tip, ...],\n\n  // Method to destroy all the tooltips that were created\n  destroyAll() { ... }\n}\n```\n"
      },
      {}
    ],
    'snippets/tip-instance.md': [
      function(require, module, exports) {
        module.exports =
          "```js\n{\n  // id of the instance (1 to Infinity)\n  id: 1,\n\n  // Reference element that is the trigger for the tooltip\n  reference: Element,\n\n  // Popper element that contains the tooltip\n  popper: Element,\n\n  // Object that contains the child elements of the popper element\n  popperChildren: { ... }\n\n  // Popper instance is not created until shown for the first time,\n  // unless specified otherwise\n  popperInstance: null,\n\n  // Instance props + attribute options merged together\n  props: { ... },\n\n  // The state of the instance\n  state: {\n    // Has the instance been destroyed?\n    isDestroyed: false,\n    // Is the instance enabled?\n    isEnabled: true,\n    // Is the tooltip currently visible and not transitioning out?\n    isVisible: false\n  },\n\n  // Also contains methods, which you'll learn in the next section\n}\n```\n"
      },
      {}
    ],
    'snippets/access-tippy-instance.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('.btn')\nconst btn = document.querySelector('.btn')\nconst tip = btn._tippy\n```\n"
      },
      {}
    ],
    'snippets/shortcuts.md': [
      function(require, module, exports) {
        module.exports =
          '```js\n// The popper element has the instance attached to it:\npopper._tippy\n// As does the reference element (as seen above):\nreference._tippy\n```\n'
      },
      {}
    ],
    'js/sections/Objects.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _tipCollection = require('../../snippets/tip-collection')

        var _tipCollection2 = _interopRequireDefault(_tipCollection)

        var _tipInstance = require('../../snippets/tip-instance')

        var _tipInstance2 = _interopRequireDefault(_tipInstance)

        var _accessTippyInstance = require('../../snippets/access-tippy-instance')

        var _accessTippyInstance2 = _interopRequireDefault(_accessTippyInstance)

        var _shortcuts = require('../../snippets/shortcuts')

        var _shortcuts2 = _interopRequireDefault(_shortcuts)

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Objects'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83C\uDFF7\uFE0F' },
            (0, _hyperapp.h)(
              'p',
              null,
              'When using Tippy.js, there are two types of objects to think about: collections and instances.'
            ),
            (0, _hyperapp.h)(Subheading, null, 'Collections'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Whenever you call ',
              (0, _hyperapp.h)('code', null, 'tippy()'),
              ', you are potentially creating many tippys at once. It returns an object containing information about the tippys you created.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: "const tipCollection = tippy('.btn')"
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              (0, _hyperapp.h)('code', null, 'tipCollection'),
              ' is a plain object.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _tipCollection2.default
            }),
            (0, _hyperapp.h)(Subheading, null, 'Tippy instances'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Stored on reference elements via the ',
              (0, _hyperapp.h)('code', null, '_tippy'),
              ' property, and inside the ',
              (0, _hyperapp.h)('code', null, 'instances'),
              ' array of the collection.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _accessTippyInstance2.default
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'Alternatively, you can use the ',
              (0, _hyperapp.h)('code', null, 'tippy.one()'),
              ' method to return the instance directly, because only a single tippy is created.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: "const tip = tippy.one('.btn')"
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              (0, _hyperapp.h)('code', null, 'tip'),
              ' is also a plain object.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _tipInstance2.default
            }),
            (0, _hyperapp.h)(Subheading, null, 'Shortcuts'),
            (0, _hyperapp.h)(
              'p',
              null,
              'There are a couple of shortcuts available for accessing the instance.'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: _shortcuts2.default })
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/tip-collection': 'snippets/tip-collection.md',
        '../../snippets/tip-instance': 'snippets/tip-instance.md',
        '../../snippets/access-tippy-instance':
          'snippets/access-tippy-instance.md',
        '../../snippets/shortcuts': 'snippets/shortcuts.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/Heading': 'js/components/Heading.js'
      }
    ],
    'snippets/set-method.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntip.set({\n  content: 'New content',\n  arrow: true,\n  duration: 1000,\n  animation: 'perspective'\n})\n```\n"
      },
      {}
    ],
    'js/sections/Methods.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _setMethod = require('../../snippets/set-method')

        var _setMethod2 = _interopRequireDefault(_setMethod)

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _ResultBox = require('../components/ResultBox')

        var _ResultBox2 = _interopRequireDefault(_ResultBox)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Methods'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83D\uDD79' },
            (0, _hyperapp.h)(
              'p',
              null,
              'Tippy instances have 7 methods available which allow you to control the tooltip without the use of UI events.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              lang: 'html',
              content: '<button data-tippy="Hello">Text</button>'
            }),
            (0, _hyperapp.h)(_Code2.default, {
              content: "const btn = document.querySelector('button')"
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'The Tippy instance is stored on the button element via the',
              ' ',
              (0, _hyperapp.h)('code', null, '_tippy'),
              ' property.',
              ' '
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: 'const tip = btn._tippy'
            }),
            (0, _hyperapp.h)(
              'blockquote',
              { class: 'blockquote' },
              (0, _hyperapp.h)(
                'strong',
                null,
                'Why is it prefixed with an underscore?'
              ),
              " Since we're attaching a non-standard property to an ",
              (0, _hyperapp.h)('code', null, 'Element'),
              ', we prefix it with an underscore. In the future, there may exist a real',
              ' ',
              (0, _hyperapp.h)('code', null, 'tippy'),
              ' property of elements that would get overwritten by the library, and real DOM properties are never prefixed with an underscore.'
            ),
            (0, _hyperapp.h)(Subheading, null, 'Show the tooltip'),
            (0, _hyperapp.h)(_Code2.default, { content: 'tip.show()' }),
            (0, _hyperapp.h)(Subheading, null, 'Hide the tooltip'),
            (0, _hyperapp.h)(_Code2.default, { content: 'tip.hide()' }),
            (0, _hyperapp.h)(Subheading, null, 'Custom transition duration'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Pass a number in as an argument to override the instance option:'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: 'tip.show(200)' }),
            (0, _hyperapp.h)(Subheading, null, 'Disable the tooltip'),
            (0, _hyperapp.h)(
              'p',
              null,
              'The tooltip can be temporarily disabled from showing/hiding:'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: 'tip.disable()' }),
            (0, _hyperapp.h)('p', null, 'To re-enable:'),
            (0, _hyperapp.h)(_Code2.default, { content: 'tip.enable()' }),
            (0, _hyperapp.h)(Subheading, null, 'Destroy the tooltip'),
            (0, _hyperapp.h)(
              'p',
              null,
              'To permanently destroy the tooltip and remove all listeners from the reference element:'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: 'tip.destroy()' }),
            (0, _hyperapp.h)(
              'p',
              null,
              'The ',
              (0, _hyperapp.h)('code', null, '_tippy'),
              ' property is deleted from the reference element upon destruction.'
            ),
            (0, _hyperapp.h)(Subheading, null, 'Update the tooltip'),
            (0, _hyperapp.h)(
              'p',
              null,
              'Pass an object of new props to the ',
              (0, _hyperapp.h)('code', null, 'set()'),
              ' method to update the tip. The tooltip element will be redrawn to reflect the change.'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: _setMethod2.default })
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/set-method': 'snippets/set-method.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Heading': 'js/components/Heading.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/ResultBox': 'js/components/ResultBox.js',
        '../components/Tippy': 'js/components/Tippy.js'
      }
    ],
    'snippets/html-element.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<button class="btn">Text</button>\n<div id="myTemplate">\n  My HTML <strong style="color: pink;">tooltip</strong> content\n</div>\n```\n'
      },
      {}
    ],
    'snippets/html-element-js.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('.btn', {\n  content: document.querySelector('#myTemplate')\n})\n```\n"
      },
      {}
    ],
    'js/sections/HTMLContent.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _htmlElement = require('../../snippets/html-element')

        var _htmlElement2 = _interopRequireDefault(_htmlElement)

        var _htmlElementJs = require('../../snippets/html-element-js')

        var _htmlElementJs2 = _interopRequireDefault(_htmlElementJs)

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _ResultBox = require('../components/ResultBox')

        var _ResultBox2 = _interopRequireDefault(_ResultBox)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'HTML Content'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83D\uDDBC\uFE0F' },
            (0, _hyperapp.h)(
              'p',
              null,
              'Along with using a string of HTML content, you can provide an',
              ' ',
              (0, _hyperapp.h)('code', null, 'HTMLElement'),
              ' for the ',
              (0, _hyperapp.h)('code', null, 'content'),
              ' option.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _htmlElement2.default
            }),
            (0, _hyperapp.h)(_Code2.default, {
              content: _htmlElementJs2.default
            }),
            (0, _hyperapp.h)(
              _ResultBox2.default,
              null,
              (0, _hyperapp.h)(
                _Tippy2.default,
                {
                  content: (0, _hyperapp.h)(
                    'div',
                    null,
                    'My HTML ',
                    (0, _hyperapp.h)(
                      'strong',
                      { style: { color: 'pink' } },
                      'tooltip'
                    ),
                    ' content'
                  )
                },
                (0, _hyperapp.h)(
                  'button',
                  { class: 'btn' },
                  'I have an HTML template!'
                )
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'Tippy will append the DOM element directly to the tooltip, so it will be removed from the page.'
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              "What if you want to reuse it multiple times? There's a DOM method for deep-cloning a node."
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content:
                "const clone = document.querySelector('#myTemplate').cloneNode(true)"
            })
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/html-element': 'snippets/html-element.md',
        '../../snippets/html-element-js': 'snippets/html-element-js.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Heading': 'js/components/Heading.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/ResultBox': 'js/components/ResultBox.js',
        '../components/Tippy': 'js/components/Tippy.js'
      }
    ],
    'snippets/theme-css.md': [
      function(require, module, exports) {
        module.exports =
          '```css\n/* If `animateFill: true` (default) */\n.tippy-tooltip.honeybee-theme .tippy-backdrop {\n  background-color: yellow;\n  font-weight: bold;\n  color: #333;\n}\n\n/* If `animateFill: false` */\n.tippy-tooltip.honeybee-theme {\n  background-color: yellow;\n  border: 2px solid orange;\n  font-weight: bold;\n  color: #333;\n}\n```\n'
      },
      {}
    ],
    'snippets/theme-js.md': [
      function(require, module, exports) {
        module.exports =
          "```js\ntippy('.btn', {\n  theme: 'honeybee'\n})\n```\n"
      },
      {}
    ],
    'snippets/tippy-element.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<div class="tippy-popper" x-placement="top">\n  <div class="tippy-tooltip">\n    <div class="tippy-content">\n      My content\n    </div>\n  </div>\n</div>\n```\n'
      },
      {}
    ],
    'snippets/tippy-element-arrow.md': [
      function(require, module, exports) {
        module.exports =
          '```html\n<div class="tippy-popper" x-placement="top">\n  <div class="tippy-tooltip">\n    <div class="tippy-backdrop"></div> <!-- animateFill: true -->\n    <div class="tippy-arrow"></div> <!-- arrow: true -->\n    <div class="tippy-content">\n      My content\n    </div>\n  </div>\n</div>\n```\n'
      },
      {}
    ],
    'snippets/css-arrow.md': [
      function(require, module, exports) {
        module.exports =
          "```css\n.tippy-popper[x-placement^='top'] .tippy-tooltip.honeybee-theme .tippy-arrow {\n  /* Your styling here. */\n}\n```\n"
      },
      {}
    ],
    'js/sections/CreatingCustomThemes.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _themeCss = require('../../snippets/theme-css')

        var _themeCss2 = _interopRequireDefault(_themeCss)

        var _themeJs = require('../../snippets/theme-js')

        var _themeJs2 = _interopRequireDefault(_themeJs)

        var _tippyElement = require('../../snippets/tippy-element')

        var _tippyElement2 = _interopRequireDefault(_tippyElement)

        var _tippyElementArrow = require('../../snippets/tippy-element-arrow')

        var _tippyElementArrow2 = _interopRequireDefault(_tippyElementArrow)

        var _cssArrow = require('../../snippets/css-arrow')

        var _cssArrow2 = _interopRequireDefault(_cssArrow)

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Code = require('../components/Code')

        var _Code2 = _interopRequireDefault(_Code)

        var _ResultBox = require('../components/ResultBox')

        var _ResultBox2 = _interopRequireDefault(_ResultBox)

        var _Tippy = require('../components/Tippy')

        var _Tippy2 = _interopRequireDefault(_Tippy)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Creating Custom Themes'
        var Subheading = (0, _Heading2.default)(TITLE)

        exports.default = function() {
          return (0, _hyperapp.h)(
            _Section2.default,
            { title: TITLE, emoji: '\uD83D\uDD8C\uFE0F' },
            (0, _hyperapp.h)(Subheading, null, 'Tippy element structure'),
            (0, _hyperapp.h)(
              'p',
              null,
              "To know what selectors to use, it's helpful to understand the structure of a tippy element."
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _tippyElement2.default
            }),
            (0, _hyperapp.h)(
              'p',
              null,
              'A tippy is essentially three nested ',
              (0, _hyperapp.h)('code', null, 'div'),
              's.'
            ),
            (0, _hyperapp.h)(
              'ul',
              null,
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy-popper'),
                " is what Popper.js uses to position the tippy. You shouldn't apply any styles directly to this element, but you will need it when targeting a specific placement (",
                (0, _hyperapp.h)('code', null, 'x-placement'),
                ').'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy-tooltip'),
                ' is the actual tooltip. Use this to style the tooltip when ',
                (0, _hyperapp.h)('code', null, 'animateFill: false'),
                '.'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy-backdrop'),
                ' is the background fill of the tooltip. Use this when ',
                (0, _hyperapp.h)('code', null, 'animateFill: true'),
                '.'
              ),
              (0, _hyperapp.h)(
                'li',
                null,
                (0, _hyperapp.h)('code', null, 'tippy-content'),
                ' is anything inside the tooltip.'
              )
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'However, depending on the options you supply, additional elements may exist inside it, such as an arrow or backdrop (default) element.'
            ),
            (0, _hyperapp.h)(_Code2.default, {
              content: _tippyElementArrow2.default
            }),
            (0, _hyperapp.h)(Subheading, null, 'Creating a theme'),
            (0, _hyperapp.h)(
              'p',
              null,
              'If you wanted to make a theme called ',
              (0, _hyperapp.h)('code', null, 'honeybee'),
              ', then your CSS would look like:'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: _themeCss2.default }),
            (0, _hyperapp.h)(
              'p',
              null,
              'The ',
              (0, _hyperapp.h)('code', null, '-theme'),
              ' suffix is required.'
            ),
            (0, _hyperapp.h)(
              'p',
              null,
              'To apply the theme to the tooltip, specify a ',
              (0, _hyperapp.h)('code', null, 'theme'),
              ' option',
              ' ',
              (0, _hyperapp.h)('em', null, 'without'),
              ' the ',
              (0, _hyperapp.h)('code', null, '-theme'),
              ' suffix:'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: _themeJs2.default }),
            (0, _hyperapp.h)(
              _ResultBox2.default,
              null,
              (0, _hyperapp.h)(
                _Tippy2.default,
                { theme: 'honeybee', animateFill: false },
                (0, _hyperapp.h)('button', { class: 'btn' }, 'Custom theme')
              )
            ),
            (0, _hyperapp.h)(Subheading, null, 'Styling the arrow'),
            (0, _hyperapp.h)(
              'p',
              null,
              'There are two arrow selectors: ',
              (0, _hyperapp.h)('code', null, '.tippy-arrow'),
              ' and',
              ' ',
              (0, _hyperapp.h)('code', null, '.tippy-roundarrow'),
              '. The first is the pure CSS triangle shape, while the second is a custom SVG.'
            ),
            (0, _hyperapp.h)(_Code2.default, { content: _cssArrow2.default }),
            (0, _hyperapp.h)(
              'p',
              null,
              'You will need to style the arrow for each different popper placement (top, bottom, left, right), which is why the selector is so long.'
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../../snippets/theme-css': 'snippets/theme-css.md',
        '../../snippets/theme-js': 'snippets/theme-js.md',
        '../../snippets/tippy-element': 'snippets/tippy-element.md',
        '../../snippets/tippy-element-arrow': 'snippets/tippy-element-arrow.md',
        '../../snippets/css-arrow': 'snippets/css-arrow.md',
        '../components/Section': 'js/components/Section.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Code': 'js/components/Code.js',
        '../components/ResultBox': 'js/components/ResultBox.js',
        '../components/Tippy': 'js/components/Tippy.js',
        '../components/Heading': 'js/components/Heading.js'
      }
    ],
    'js/sections/BrowserSupport.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        var _Emoji = require('../components/Emoji')

        var _Emoji2 = _interopRequireDefault(_Emoji)

        var _Heading = require('../components/Heading')

        var _Heading2 = _interopRequireDefault(_Heading)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Browser Support'

        exports.default = function() {
          return function(state, actions) {
            return (0, _hyperapp.h)(
              _Section2.default,
              { title: TITLE, emoji: '\uD83D\uDCBB' },
              (0, _hyperapp.h)(
                'p',
                null,
                'Tippy supports browsers with ',
                (0, _hyperapp.h)('code', null, 'requestAnimationFrame'),
                ' and',
                ' ',
                (0, _hyperapp.h)('code', null, 'MutationObserver'),
                ' support.'
              ),
              (0, _hyperapp.h)(
                'p',
                null,
                'IE10 is only partially supported unless you polyfill',
                ' ',
                (0, _hyperapp.h)('code', null, 'MutationObserver'),
                ', then it is fully supported.'
              )
            )
          }
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../components/Section': 'js/components/Section.js',
        '../components/Emoji': 'js/components/Emoji.js',
        '../components/Heading': 'js/components/Heading.js'
      }
    ],
    'js/sections/Performance.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _Section = require('../components/Section')

        var _Section2 = _interopRequireDefault(_Section)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var TITLE = 'Performance'

        exports.default = function() {
          return function(state, actions) {
            return (0, _hyperapp.h)(
              _Section2.default,
              { title: TITLE, emoji: '\u26A1\uFE0F' },
              (0, _hyperapp.h)(
                'p',
                null,
                'Tested with 2.6 GHz Skylake MacBook Pro using Chrome 67:'
              ),
              (0, _hyperapp.h)(
                'ul',
                null,
                (0, _hyperapp.h)(
                  'li',
                  null,
                  (0, _hyperapp.h)(
                    'strong',
                    null,
                    (0, _hyperapp.h)('code', null, 'tippy.all.min.js'),
                    ' evaluation time:'
                  ),
                  ' ',
                  '5ms'
                ),
                (0, _hyperapp.h)(
                  'li',
                  null,
                  (0, _hyperapp.h)(
                    'strong',
                    null,
                    'Performance mode off (default):'
                  ),
                  ' 1.3ms per 10 elements'
                ),
                (0, _hyperapp.h)(
                  'li',
                  null,
                  (0, _hyperapp.h)('strong', null, 'Performance mode on:'),
                  ' 1ms per 10 elements'
                ),
                (0, _hyperapp.h)(
                  'li',
                  null,
                  (0, _hyperapp.h)('strong', null, 'Lazy mode off:'),
                  ' 3ms per 10 elements'
                ),
                (0, _hyperapp.h)(
                  'li',
                  null,
                  (0, _hyperapp.h)('strong', null, 'Event delegation:'),
                  ' <1ms for any number of child elements'
                )
              )
            )
          }
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '../components/Section': 'js/components/Section.js'
      }
    ],
    'js/sections/Main.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _Demo = require('./Demo')

        var _Demo2 = _interopRequireDefault(_Demo)

        var _Why = require('./Why')

        var _Why2 = _interopRequireDefault(_Why)

        var _GettingStarted = require('./GettingStarted')

        var _GettingStarted2 = _interopRequireDefault(_GettingStarted)

        var _CreatingTooltips = require('./CreatingTooltips')

        var _CreatingTooltips2 = _interopRequireDefault(_CreatingTooltips)

        var _CustomizingTooltips = require('./CustomizingTooltips')

        var _CustomizingTooltips2 = _interopRequireDefault(_CustomizingTooltips)

        var _AllOptions = require('./AllOptions')

        var _AllOptions2 = _interopRequireDefault(_AllOptions)

        var _Objects = require('./Objects')

        var _Objects2 = _interopRequireDefault(_Objects)

        var _Methods = require('./Methods')

        var _Methods2 = _interopRequireDefault(_Methods)

        var _HTMLContent = require('./HTMLContent')

        var _HTMLContent2 = _interopRequireDefault(_HTMLContent)

        var _CreatingCustomThemes = require('./CreatingCustomThemes')

        var _CreatingCustomThemes2 = _interopRequireDefault(
          _CreatingCustomThemes
        )

        var _BrowserSupport = require('./BrowserSupport')

        var _BrowserSupport2 = _interopRequireDefault(_BrowserSupport)

        var _Performance = require('./Performance')

        var _Performance2 = _interopRequireDefault(_Performance)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        exports.default = function() {
          return (0, _hyperapp.h)(
            'main',
            { class: 'main' },
            (0, _hyperapp.h)(
              'div',
              { class: 'container main__body' },
              (0, _hyperapp.h)(_Demo2.default, null),
              (0, _hyperapp.h)(_Why2.default, null),
              (0, _hyperapp.h)(_GettingStarted2.default, null),
              (0, _hyperapp.h)(_CreatingTooltips2.default, null),
              (0, _hyperapp.h)(_CustomizingTooltips2.default, null),
              (0, _hyperapp.h)(_AllOptions2.default, null),
              (0, _hyperapp.h)(_Objects2.default, null),
              (0, _hyperapp.h)(_Methods2.default, null),
              (0, _hyperapp.h)(_HTMLContent2.default, null),
              (0, _hyperapp.h)(_CreatingCustomThemes2.default, null),
              (0, _hyperapp.h)(_BrowserSupport2.default, null),
              (0, _hyperapp.h)(_Performance2.default, null)
            )
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        './Demo': 'js/sections/Demo.js',
        './Why': 'js/sections/Why.js',
        './GettingStarted': 'js/sections/GettingStarted.js',
        './CreatingTooltips': 'js/sections/CreatingTooltips.js',
        './CustomizingTooltips': 'js/sections/CustomizingTooltips.js',
        './AllOptions': 'js/sections/AllOptions.js',
        './Objects': 'js/sections/Objects.js',
        './Methods': 'js/sections/Methods.js',
        './HTMLContent': 'js/sections/HTMLContent.js',
        './CreatingCustomThemes': 'js/sections/CreatingCustomThemes.js',
        './BrowserSupport': 'js/sections/BrowserSupport.js',
        './Performance': 'js/sections/Performance.js'
      }
    ],
    'js/view.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true
        })

        var _hyperapp = require('hyperapp')

        var _Header = require('./sections/Header')

        var _Header2 = _interopRequireDefault(_Header)

        var _Main = require('./sections/Main')

        var _Main2 = _interopRequireDefault(_Main)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        exports.default = function(state, actions) {
          return (0, _hyperapp.h)(
            'div',
            { class: 'app' },
            (0, _hyperapp.h)(_Header2.default, null),
            (0, _hyperapp.h)(_Main2.default, null)
          )
        }
      },
      {
        hyperapp: '../node_modules/hyperapp/src/index.js',
        './sections/Header': 'js/sections/Header.js',
        './sections/Main': 'js/sections/Main.js'
      }
    ],
    'index.js': [
      function(require, module, exports) {
        'use strict'

        require('../dist/tippy.css')

        require('../dist/themes/light.css')

        require('../dist/themes/translucent.css')

        require('normalize.css')

        require('./css/index.scss')

        require('focus-visible')

        var _hyperapp = require('hyperapp')

        var _module = require('@hyperapp/render/browser/module')

        var _utils = require('./js/utils')

        var _state = require('./js/state')

        var _state2 = _interopRequireDefault(_state)

        var _actions = require('./js/actions')

        var _actions2 = _interopRequireDefault(_actions)

        var _view = require('./js/view')

        var _view2 = _interopRequireDefault(_view)

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        var main = (0, _module.withRender)(_hyperapp.app)(
          _state2.default,
          _actions2.default,
          _view2.default,
          _utils.isBrowser && document.body
        )
        ;(0, _utils.prerender)(main, '<body>')
      },
      {
        '../dist/tippy.css': '../dist/tippy.css',
        '../dist/themes/light.css': '../dist/themes/light.css',
        '../dist/themes/translucent.css': '../dist/themes/translucent.css',
        'normalize.css': '../node_modules/normalize.css/normalize.css',
        './css/index.scss': 'css/index.scss',
        'focus-visible': '../node_modules/focus-visible/dist/focus-visible.js',
        hyperapp: '../node_modules/hyperapp/src/index.js',
        '@hyperapp/render/browser/module':
          '../node_modules/@hyperapp/render/browser/module.js',
        './js/utils': 'js/utils.js',
        './js/state': 'js/state.js',
        './js/actions': 'js/actions.js',
        './js/view': 'js/view.js'
      }
    ],
    '../node_modules/parcel-bundler/src/builtins/hmr-runtime.js': [
      function(require, module, exports) {
        var global = arguments[3]
        var OVERLAY_ID = '__parcel__error__overlay__'

        var OldModule = module.bundle.Module

        function Module(moduleName) {
          OldModule.call(this, moduleName)
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function(fn) {
              this._acceptCallbacks.push(fn || function() {})
            },
            dispose: function(fn) {
              this._disposeCallbacks.push(fn)
            }
          }

          module.bundle.hotData = null
        }

        module.bundle.Module = Module

        var parent = module.bundle.parent
        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== 'undefined'
        ) {
          var hostname = '' || location.hostname
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws'
          var ws = new WebSocket(
            protocol + '://' + hostname + ':' + '62429' + '/'
          )
          ws.onmessage = function(event) {
            var data = JSON.parse(event.data)

            if (data.type === 'update') {
              console.clear()

              data.assets.forEach(function(asset) {
                hmrApply(global.parcelRequire, asset)
              })

              data.assets.forEach(function(asset) {
                if (!asset.isNew) {
                  hmrAccept(global.parcelRequire, asset.id)
                }
              })
            }

            if (data.type === 'reload') {
              ws.close()
              ws.onclose = function() {
                location.reload()
              }
            }

            if (data.type === 'error-resolved') {
              console.log('[parcel] ✨ Error resolved')

              removeErrorOverlay()
            }

            if (data.type === 'error') {
              console.error(
                '[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack
              )

              removeErrorOverlay()

              var overlay = createErrorOverlay(data)
              document.body.appendChild(overlay)
            }
          }
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID)
          if (overlay) {
            overlay.remove()
          }
        }

        function createErrorOverlay(data) {
          var overlay = document.createElement('div')
          overlay.id = OVERLAY_ID

          // html encode message and stack trace
          var message = document.createElement('div')
          var stackTrace = document.createElement('pre')
          message.innerText = data.error.message
          stackTrace.innerText = data.error.stack

          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            '</div>' +
            '<pre>' +
            stackTrace.innerHTML +
            '</pre>' +
            '</div>'

          return overlay
        }

        function getParents(bundle, id) {
          var modules = bundle.modules
          if (!modules) {
            return []
          }

          var parents = []
          var k, d, dep

          for (k in modules) {
            for (d in modules[k][1]) {
              dep = modules[k][1][d]
              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push(k)
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id))
          }

          return parents
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules
          if (!modules) {
            return
          }

          if (modules[asset.id] || !bundle.parent) {
            var fn = new Function(
              'require',
              'module',
              'exports',
              asset.generated.js
            )
            asset.isNew = !modules[asset.id]
            modules[asset.id] = [fn, asset.deps]
          } else if (bundle.parent) {
            hmrApply(bundle.parent, asset)
          }
        }

        function hmrAccept(bundle, id) {
          var modules = bundle.modules
          if (!modules) {
            return
          }

          if (!modules[id] && bundle.parent) {
            return hmrAccept(bundle.parent, id)
          }

          var cached = bundle.cache[id]
          bundle.hotData = {}
          if (cached) {
            cached.hot.data = bundle.hotData
          }

          if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
            cached.hot._disposeCallbacks.forEach(function(cb) {
              cb(bundle.hotData)
            })
          }

          delete bundle.cache[id]
          bundle(id)

          cached = bundle.cache[id]
          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function(cb) {
              cb()
            })
            return true
          }

          return getParents(global.parcelRequire, id).some(function(id) {
            return hmrAccept(global.parcelRequire, id)
          })
        }
      },
      {}
    ]
  },
  {},
  ['../node_modules/parcel-bundler/src/builtins/hmr-runtime.js', 'index.js'],
  null
)
//# sourceMappingURL=/website.e17b8be1.map

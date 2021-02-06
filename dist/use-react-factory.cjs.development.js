'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rxjs = require('rxjs');
var reactStreamBuilder = require('react-stream-builder');
var useObservable = _interopDefault(require('use-observable'));

var createStore = function createStore(initValue) {
  var stream = new rxjs.BehaviorSubject(initValue);
  return {
    stream: stream,
    initValue: initValue
  };
};
var StreamBuilder = reactStreamBuilder.StreamBuilder;
var ConnectionState = reactStreamBuilder.ConnectionState;
var sink = function sink(stream) {
  return {
    add: function add(value) {
      return stream.next(value);
    }
  };
};

var useReactFactory = function useReactFactory(stream, initValue) {
  var state = useObservable(stream, initValue);
  return {
    state: state
  };
};

exports.ConnectionState = ConnectionState;
exports.StreamBuilder = StreamBuilder;
exports.createStore = createStore;
exports.sink = sink;
exports.useReactFactory = useReactFactory;
//# sourceMappingURL=use-react-factory.cjs.development.js.map

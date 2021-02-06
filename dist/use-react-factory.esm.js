import { BehaviorSubject } from 'rxjs';
import { StreamBuilder as StreamBuilder$1, ConnectionState as ConnectionState$1 } from 'react-stream-builder';
import useObservable from 'use-observable';

var createStore = function createStore(initValue) {
  var stream = new BehaviorSubject(initValue);
  return {
    stream: stream,
    initValue: initValue
  };
};
var StreamBuilder = StreamBuilder$1;
var ConnectionState = ConnectionState$1;
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

export { ConnectionState, StreamBuilder, createStore, sink, useReactFactory };
//# sourceMappingURL=use-react-factory.esm.js.map

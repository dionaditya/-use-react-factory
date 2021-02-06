import { BehaviorSubject } from 'rxjs'
import { StreamBuilder as StreamProvider, Snapshot, ConnectionState as ConnectionStateProvider } from 'react-stream-builder'
import useObservable from "use-observable"

export type StreamSnapshot<T> = Snapshot<T>;

export const createStore: <T>(initValue: T) => {stream: BehaviorSubject<T>; initValue: T}  = <T extends unknown>(initValue: T) => {
    const stream = new BehaviorSubject(initValue)
    return {
        stream,
        initValue
    }
};

export const StreamBuilder = StreamProvider
export const ConnectionState = ConnectionStateProvider

type Sink = <T extends unknown>(stream: BehaviorSubject<T>) => {
    add: (value: T) => void;
}

export const sink: Sink = <T extends unknown>(stream: BehaviorSubject<T>) => {
    return {
        add: (value: T): void => {
            stream.next(value)
        } 
    }
}

interface ReactFactory<T> {
    state: T;
}

const useReactFactory: <T>(stream: BehaviorSubject<T>, initValue: T) => ReactFactory<T> = 
    <T extends unknown>(stream: BehaviorSubject<T>, initValue: T) => {
    const state = useObservable(stream, initValue)

    return {
        state,
    }
}

export default useReactFactory


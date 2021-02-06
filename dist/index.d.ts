import { BehaviorSubject } from 'rxjs';
import { StreamBuilder as StreamProvider, Snapshot, ConnectionState as ConnectionStateProvider } from 'react-stream-builder';
export declare type StreamSnapshot<T> = Snapshot<T>;
export declare const createStore: <T extends unknown>(initValue: T) => {
    stream: BehaviorSubject<T>;
    initValue: T;
};
export declare const StreamBuilder: typeof StreamProvider;
export declare const ConnectionState: typeof ConnectionStateProvider;
declare type Sink = <T extends unknown>(stream: BehaviorSubject<T>) => {
    add: (value: T) => void;
};
export declare const sink: Sink;
interface IReactFactory<T> {
    state: T;
}
declare const useReactFactory: <T>(stream: BehaviorSubject<T>, initValue: T) => IReactFactory<T>;
export { useReactFactory };

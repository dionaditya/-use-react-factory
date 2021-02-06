# use-react-factory

React hooks to help generate bloc pattern in react for alternative React Context. 

```
  This is expiremental API. So, cant have breaking changes in newer version
```

Acknowledment about bloc pattern

![Bloc pattern](https://koenig-media.raywenderlich.com/uploads/2020/08/04-BLoC-diagram-1.png)

## Getting started

```bash
npm i use-react-factory rxjs # or yarn add user-react-factory
```

Create bloc class that provide 3 class properties (stream, sink, and initialValue)

```
ExampleBloc.ts

import { BehaviorSubject } from "rxjs"
import { createStore, sink } from "use-react-factory"

export default class ExampleBloc<T>{
    public exampleStream: BehaviorSubject<T>
    public initValue: T
    private _sink: any

    constructor(initValue: T) {
        const {stream, initValue: startValue} = createStore(initValue)
        this.exampleStream = stream
        this.initValue = startValue
        this._sink = sink(stream)
    }

    // example method 
    // this method to handle event that have been fired from UI
    // the method name depends on your application. this one just for example
    say(value: T) {
        this._sink.add(value)
    }
}
```

```
App.tsx 

import useReactFactory, { StreamBuilder, ConnectionState } from 'use-react-factory'

import ExampleBloc from './ExampleBloc'


const initState: string = ''

export const exampleBloc = new ExampleBloc<string>(initState)

function App() {
  const {
    state,
  } = useReactFactory<IState>(
      exampleBloc.exampleStream, 
      exampleBloc.initValue)


  return (
    <div className="App">
        <StreamBuilder
          stream={counterBloc.counterStream}
          builder={(snapshot: StreamSnapshot<string>) => {
            // If the observable has not yet emitted any values print a message
            // indicating that we're still waiting.
            if (snapshot.state !== ConnectionState.active) {
              return "Loading...";
            }

            return (
              <div>
                // read 
                <p>Hello, {snapshot.data}</p>
                <button onClick={() => {exampleBlock.say('World')}}>Click to show World</button>
              </div>
            );
          }}
        />
        <div>
          Read value from state outside stream builder
          {state}
        </div>
    </div>
  )
}

export default App

```

## API

createStore(initValue) 

### Import

```
  import { createStore } from "use-react-factory"
```

### Usage

```
   const {stream, initValue: initialValue} = createStore(initValue)
```

Function API

| Value      | Description | Type |
| ----------- | ----------- | ----------- |
|   initValue    | initial state     | <T> or any  |
|   stream    |  an observable for bloc  | BehaviorSubject<T>   |

sink(stream)

### Import

```
  import { sink } from "use-react-factory"
```

### Usage

```
   sink(stream)
```

Function API

| Value      | Description | Type |
| ----------- | ----------- | ----------- |
|   stream    |  an observable for bloc  | BehaviorSubject<T>   |

StreamBuilder

### Import

```
import { StreamBuilder, ConnectionState, StreamSnapshot } from 'use-react-factory'
```

### Usage

```
  <StreamBuilder
          stream={stream}
          builder={(snapshot: StreamSnapshot<IState>) => {
            // If the observable has not yet emitted any values print a message
            // indicating that we're still waiting.
            if (snapshot.state !== ConnectionState.active) {
              return "Loading...";
            }

            return (
              <div>
            
              </div>
            );
          }}
        />   
```

API

| Value      | Description | Type |
| ----------- | ----------- | ----------- |
|   stream    |  an observable from bloc  | BehaviorSubject<T>   |
|   StreamSnapshot    | Stream state  |  'StreamSnapshot<T> = ActiveSnapshot<T> | NoneSnapshot<T> | DoneSnapshot<T>;'  |

```
enum ConnectionState {
  // Not currently connected to any asynchronous computation.
  none,

  // Connected to an asynchronous computation and awaiting interaction.
  waiting,

  // Connected to an active asynchronous computation.
  //
  // For example, a Observable that has returned at least one value, but is not
  // yet done.
  active,

  // Connected to a terminated asynchronous computation.
  done,
}

// ActiveSnapshot enforces that data is present in this snapshot.
interface ActiveSnapshot<T> {
  state: ConnectionState.active;
  data: T;
}

// NoneSnapshot enforces that data is undefined in this snapshot.
interface NoneSnapshot<T> {
  state: ConnectionState.none;
  data: undefined;
}

// DoneSnapshot enforces that data is undefined in this snapshot.
interface DoneSnapshot<T> {
  state: ConnectionState.done;
  data: undefined;
}

```

useReactFactory(stream, initValue)

## import 

```
import useReactFactory from 'use-react-factory'
```

## Usage

```
  const {
    state,
  } = useReactFactory<IState>(
      stream, 
      initValue)

```

API

| Value      | Description | Type |
| ----------- | ----------- | ----------- |
|   stream    |  an observable from bloc  | BehaviorSubject<T>   |
|    initialValue   |  initialValue from bloc  | <T> or any   |
|    state   |  current state of bloc stream  | <T> or any   |
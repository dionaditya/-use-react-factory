import { act } from 'react-dom/test-utils';
import useReactFactory from "../src"
import { testHook } from '../tools/testHook';
import {BehaviorSubject} from 'rxjs'

const stream = new BehaviorSubject<number>(0)

let reactFactory: {
  state: number
} | undefined;

beforeEach(() => {
  testHook(() => {
    reactFactory = useReactFactory<number>(stream, 0);
  });
});

describe('useReactfactory', () => {
  test('should have correct state after change', () => {
    act(() => {
      stream.next(1)
    })
    expect(reactFactory?.state).toBe(1);
  });
});
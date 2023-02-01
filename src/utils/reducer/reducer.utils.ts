import { AnyAction } from 'redux';

type Matchable<AC extends () => AnyAction> = AC & { // we want this AC to also have type and a match method
  type: ReturnType<AC>['type']; // so pass type of a function to the ReturnType and it gives us the type of the return of the function 
  match(action: AnyAction): action is ReturnType<AC>;
} 
// AC stands for Action creater

export function withMatcher<AC extends () => AnyAction & { type : string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) { // we dont need to be exact anymore because we specified the type above so that's why we just said 'Function'
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P; // what if we had added a ? question mark to make the payload optional, would we still need the Action type? the problem with this approach is that here the payload will be either a P or undefined so even if we dont have any payload on an action the payload is still there and it is undefined and we dont want this in typescript. instead we wanna throw an error whenever we try to access the payload on an action that doesnt have it instead of undefined. so by doing this we narrow the scope
}

export type Action<T> = {
  type: T;
}

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({
//   type,
//   payload,
// });

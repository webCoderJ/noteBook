let memorizedState = [];
let cursor = 0;

function render() { }

function useState(defaultValue) {
  memorizedState[cursor] = memorizedState[cursor] || defaultValue;
  const curCursor = cursor;
  function setState(newState) {
    memorizedState[curCursor] = newState;
    render();
  }
  return [memorizedState[cursor]++, setState];
}

function useCallback(fn, deps) {
  // 进入需要存储deps
  // 判断新的deps跟之前存储的是否相等，不等则重新执行 fn
  // 怎么让fn访问到的变量是旧的呢，不执行就是旧的
  let oldDeps = memorizedState[cursor];
  let hasChanged = oldDeps
    ? !oldDeps.every((item, i) => item === oldDeps[i])
    : true;
  if (hasChanged) {
    memorizedState[cursor] = deps;
    return fn;
  }
  cursor++;
}

const [a, setA] = useState(false);

let ifAchanged = useCallback(() => {
  if (a) {
    console.log('a is changed', a);
  }
}, [a])

ifAchanged();
// useState :

const [count, setCount] = React.useState(0);

// useEffect :

// this will run when the component mounts and anytime the stateful data changes
React.useEffect(() => {
    alert('Hey, Nads here!');
});

// this will run, when the component is first initialized
React.useEffect(() => {
    alert('Hey, Nads here!');
}, []);

// this will run only when count state changes
React.useEffect(() => {
    fetch('nads').then(() => setLoaded(true));
}, [count]);

// this will run when the component is destroyed or before the component is removed from UI.
React.useEffect(() => {
    alert('Hey, Nads here');

    return () => alert('Goodbye Component');
});

// useContext :

const ans = {
    right: '✅',
    wrong: '❌'
}

const AnsContext = createContext(ans);

function Exam(props) {
    return (
        // Any child component inside this component can access the value which is sent.
        <AnsContext.Provider value={ans.right}>
            <RightAns />
        </AnsContext.Provider>
    )
}

function RightAns() {
    // it consumes value from the nearest parent provider.
    const ans = React.useContext(AnsContext);
    return <p>{ans}</p>
    // previously we were required to wrap up inside the AnsContext.Consumer
    // but this useContext hook, get rids that.
}

// useRef :

function App() {
    const myBtn = React.useRef(null);
    const handleBtn = () => myBtn.current.click();
    return (
        <button ref={myBtn} onChange={handleBtn} >
        </button>
    )
}

// useReducer :

function reducer(state, dispatch) {
    switch(action.type) {
        case 'increment':
            return state+1;
        case 'decrement':
            return state-1;
        default:
            throw new Error();
    }
}

function useReducer() {
    // state is the state we want to show in the UI.
    const [state, dispatch] = React.useReducer(reducer, 0);

    return (
        <>
        Count : {state}
        <button onClick={() => dispatch({type:'decrement'})}>-</button>
        <button onClick={() => dispatch({type:'increment'})}>+</button>
        </>
    )
}

// useMemo :

function useMemo() {

    const [count, setCount] = React.useState(60);

    const expensiveCount = useMemo(() => {
        return count**2;
    }, [count]) // recompute when count changes.
}

// useCallback : 

function useCallbackDemo() {
    const [count, setCount] = useState(60);

    const showCount = React.useCallback(() => {
        alert(`Count ${count}`);
    }, [count])

    return <> <SomeChild handler = {showCount} /> </>
}

// useImperativeHandle :

function useImperativeHandleDemo(props, ref) {

    const myBtn = useRef(null);

    React.useImperativeHandle(ref, () => ({
        click: () => {
            console.log('clicking button!');
            myBtn.current.click();
        }
    }));
}

// useLayoutEffect : 
function useLayoutEffectDemo() {

    const myBtn = React.useRef(null);

    React.useLayoutEffect(() => {
        const rect = myBtn.current.getBoundingClientRect();
        // scroll position before the dom is visually updated
        console.log(rect.height);
    })
}

// useDebugValue : 

function useDisplayName() {
    const [displayName, setDisplayName] = React.useState();

    React.useEffect(() => {
        const data = fetchFromDatabase(props.userId);
        setDisplayName(data.displayName);
    }, []);

    React.useDebugValue(displayName ?? 'loading...');
    return displayName;
}
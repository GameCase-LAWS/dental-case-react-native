import React from "react";
import { measure } from "./tools/resolution";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

export const Context = React.createContext({
  context: {},
  setContext: () => {},
});

export const ScreenContextProvider = (props) => {
    const _measure = measure(SCREEN_WIDTH/36);
    const [context, setContext] = React.useState(_measure);

    const updateContext = (props) => {
        setUser((old) => ({ ...old, ...props }));
    };

    const initState = {
        context,
        setContext,
        updateContext,
    };

    return (
        <Context.Provider value={initState}>
        {props.children}
        </Context.Provider>
    );
};

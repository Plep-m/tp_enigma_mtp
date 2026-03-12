import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { View, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type ScreenMap = Record<string, React.ComponentType>;

type NavigationContextType<T extends ScreenMap> = {
  navigate: (screen: keyof T & string) => void;
  goBack: () => void;
  canGoBack: boolean;
};

export function createNavigator<T extends ScreenMap>(
  screens: T,
  initialScreen: keyof T & string = Object.keys(screens)[0] as keyof T & string,
) {
  type ScreenName = keyof T & string;

  const NavigationContext = createContext<NavigationContextType<T> | null>(null);

  function useAppNavigation(): NavigationContextType<T> {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error('useAppNavigation must be used inside Navigator');
    return ctx;
  }

  function Navigator() {
    const [stack, setStack] = useState<ScreenName[]>([initialScreen]);

    const navigate = useCallback((screen: ScreenName) => {
      setStack((prev) => {
        if (prev[prev.length - 1] === screen) return prev;
        return [...prev, screen];
      });
    }, []);

    const goBack = useCallback(() => {
      setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    }, []);

    const canGoBack = stack.length > 1;
    const currentScreen = stack[stack.length - 1];

    useEffect(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (canGoBack) {
          goBack();
          return true;
        }
        return false;
      });
      return () => sub.remove();
    }, [canGoBack, goBack]);

    return (
      <NavigationContext.Provider value={{ navigate, goBack, canGoBack }}>
        <SafeAreaProvider>
          {(Object.keys(screens) as ScreenName[]).map((screen) => (
            <View
              key={screen}
              style={{ flex: 1, display: currentScreen === screen ? 'flex' : 'none' }}
            >
              {React.createElement(screens[screen])}
            </View>
          ))}
        </SafeAreaProvider>
      </NavigationContext.Provider>
    );
  }

  return { Navigator, useAppNavigation };
}

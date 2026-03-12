import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { View, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type ScreenMap = Record<string, React.ComponentType>;

type NavigationContextType = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  canGoBack: boolean;
  params?: any;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useAppNavigation(): NavigationContextType {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useAppNavigation must be used inside Navigator');
  return ctx;
}

export function createNavigator<T extends ScreenMap>(
  screens: T,
  initialScreen: keyof T & string = Object.keys(screens)[0] as keyof T & string,
) {
  type ScreenName = keyof T & string;

  function Navigator() {
    const [stack, setStack] = useState<{ name: ScreenName; params?: any }[]>([
      { name: initialScreen },
    ]);

    const navigate = useCallback((screen: ScreenName, params?: any) => {
      setStack((prev) => {
        if (prev[prev.length - 1]?.name === screen) return prev;
        return [...prev, { name: screen, params }];
      });
    }, []);

    const goBack = useCallback(() => {
      setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    }, []);

    const canGoBack = stack.length > 1;
    const currentStackItem = stack[stack.length - 1];
    const currentScreen = currentStackItem?.name;

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

    const navigateContext = useCallback((screen: string, params?: any) => {
        navigate(screen as ScreenName, params);
    }, [navigate]);

    return (
      <NavigationContext.Provider value={{ navigate: navigateContext, goBack, canGoBack, params: currentStackItem?.params }}>
        <SafeAreaProvider>
          {(Object.keys(screens) as ScreenName[]).map((screen) => (
            <View
              key={screen}
              style={{ flex: 1, display: currentScreen === screen ? 'flex' : 'none' }}
            >
              {React.createElement(screens[screen], currentStackItem?.name === screen ? currentStackItem?.params : {})}
            </View>
          ))}
        </SafeAreaProvider>
      </NavigationContext.Provider>
    );
  }

  return { Navigator };
}

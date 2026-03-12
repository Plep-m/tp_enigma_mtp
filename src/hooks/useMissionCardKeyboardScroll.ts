import { useCallback, useEffect, useRef } from 'react';
import {
  Dimensions,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

type MissionCardRefs = { [key: string]: View | null };

export const useMissionCardKeyboardScroll = (
  scrollViewRef: React.RefObject<ScrollView | null>,
  missionCardRefs: React.RefObject<MissionCardRefs>
) => {
  const keyboardHeightRef = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (event) => {
      keyboardHeightRef.current = event.endCoordinates.height;
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      keyboardHeightRef.current = 0;
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;
  }, []);

  const scrollMissionCardIntoSafeZone = useCallback(
    (stepIndex: number, missionIndex: number) => {
      const refKey = `${stepIndex}-${missionIndex}`;
      const missionCardView = missionCardRefs.current[refKey];
      if (!missionCardView || !scrollViewRef.current) {
        return;
      }

      missionCardView.measureInWindow((_, y, __, height) => {
        const keyboardTop = Dimensions.get('window').height - keyboardHeightRef.current;
        const visibleBottom = keyboardTop - 16;
        const overlap = y + height - visibleBottom;

        if (overlap > 0) {
          scrollViewRef.current?.scrollTo({
            y: Math.max(0, scrollYRef.current + overlap + 12),
            animated: true,
          });
        }
      });
    },
    [missionCardRefs, scrollViewRef]
  );

  const handleMissionFocus = useCallback(
    (stepIndex: number, missionIndex: number) => {
      scrollMissionCardIntoSafeZone(stepIndex, missionIndex);
      setTimeout(() => scrollMissionCardIntoSafeZone(stepIndex, missionIndex), 260);
    },
    [scrollMissionCardIntoSafeZone]
  );

  return { handleScroll, handleMissionFocus };
};

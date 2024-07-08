import React, { useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook

const withFocusAwareness = (WrappedComponent, options = {}) => {
    const { debounceDelay = 100, onError = null } = options;

    const EnhancedComponent = (props) => {
        const [isFocused, setIsFocused] = useState(true);

        const debouncedSetIsFocused = useMemo(() => {
            let timeoutId;
            return (value) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setIsFocused(value);
                }, debounceDelay);
            };
        }, [debounceDelay]);

        useFocusEffect(
            React.useCallback(() => {
                const handleFocusChange = (isScreenFocused) => {
                    debouncedSetIsFocused(isScreenFocused);
                };

                const focusSubscription = props.navigation.addListener('focus', () => handleFocusChange(true));
                const blurSubscription = props.navigation.addListener('blur', () => handleFocusChange(false));

                return () => {
                    focusSubscription();
                    blurSubscription();
                };
            }, [debouncedSetIsFocused, props.navigation])
        );

        useEffect(() => {
            const handleAppStateChange = (nextAppState) => {
                if (nextAppState === 'active') {
                    debouncedSetIsFocused(true);
                } else {
                    debouncedSetIsFocused(false);
                }
            };

            const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

            return () => {
                appStateSubscription.remove();
            };
        }, [debouncedSetIsFocused]);

        useEffect(() => {
            if (onError && typeof onError === 'function') {
                if (!props.navigation) {
                    onError(new Error('Navigation prop is required for withFocusAwareness HOC'));
                }
            }
        }, [onError, props.navigation]);

        const memoizedProps = useMemo(() => ({ ...props, isFocused }), [props, isFocused]);

        return <WrappedComponent {...memoizedProps} />;
    };

    return EnhancedComponent;
};

export default withFocusAwareness;

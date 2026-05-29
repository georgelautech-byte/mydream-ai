import { Pressable } from 'react-native';

export function withPressable<T>(Component: React.ComponentType<T>) {
  return function PressableComponent(props: T & { onPress?: () => void; disabled?: boolean }) {
    return (
      <Pressable disabled={props.disabled} onPress={props.onPress}>
        <Component {...props} />
      </Pressable>
    );
  };
}

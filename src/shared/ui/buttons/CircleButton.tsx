import { TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
import Typography from '../typography/Typography';

interface CircleButtonProps extends TouchableOpacityProps {
  text?: string | number;
}

export default function CircleButton({ text, children, ...props }: CircleButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: '#ffffff13',
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 80,
      }}
      {...props}
    >
      {text ? (
        <Typography weight="medium" variant="title-1">
          {text}
        </Typography>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

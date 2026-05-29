import { FlatListProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks/useTheme';
import Grid from '../grid/Grid';

interface HorizontalListPickerProps<T> extends FlatListProps<T> {
  ITEM_SIZE: number;
}

export default function HorizontalListPicker<T>({ ITEM_SIZE, ...props }: HorizontalListPickerProps<T>) {
  const colors = useTheme();
  return (
    <Grid row space="md" color={colors.background.primary} style={{ borderRadius: 20 }}>
      <FlatList
        snapToInterval={50}
        contentContainerStyle={{ padding: 8 }}
        decelerationRate={0}
        getItemLayout={(data, index) => ({
          length: ITEM_SIZE,
          offset: ITEM_SIZE * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Grid width={10} />}
        horizontal
        {...props}
      />
    </Grid>
  );
}

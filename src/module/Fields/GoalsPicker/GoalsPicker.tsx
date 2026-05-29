import { goalsMock } from '@/entities/userTags/mock/goalsMock';
import { IGoalItem } from '@/entities/userTags/types/types';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

interface GoalsPickerProps {
  value: IGoalItem[];
  onChange: (goal: IGoalItem[]) => void;
}

export default function GoalsPicker({ value, onChange }: GoalsPickerProps) {
  const [currentGoals, setCurrentGoals] = useState<IGoalItem[]>(value);
  const { t } = useTranslation();

  const handleGoalChange = (goal: IGoalItem) => {
    const isGoalSelected = currentGoals.some(item => item.id === goal.id);
    const updatedGoals = isGoalSelected ? currentGoals.filter(item => item.id !== goal.id) : [...currentGoals, goal];

    setCurrentGoals(updatedGoals);
    onChange(updatedGoals);
  };

  const isPicked = (goal: IGoalItem) => {
    return currentGoals.some(item => item.id === goal.id);
  };

  return (
    <Grid space="lg">
      <Grid space="md" wrap justfity="center">
        {goalsMock.map(item => (
          <View key={item.id} style={styles.halfWidth}>
            <SurfacePicker
              // header={
              //   item.image && (
              //     <Image contentFit="fill" style={{ height: 70, width: 70, borderRadius: 100 }} source={item.image} />
              //   )
              // }
              paddingVertical={9}
              // height={25}
              justfity="center"
              isPicked={isPicked(item)}
              label={t(`onboarding.goals.${item.name}`)}
              item={item}
              onChange={item => handleGoalChange(item)}
            />
          </View>
        ))}
      </Grid>
      <Typography weight="extra-bold" textAlign="center" variant="headline">
        {value.length}/{goalsMock.length}
      </Typography>
    </Grid>
  );
}

const styles = StyleSheet.create({
  halfWidth: {
    width: '100%',
    // padding: 8,
  },
});

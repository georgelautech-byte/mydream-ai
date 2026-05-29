import { fontWeight } from '@/shared/styles/typography/typography';
import { normalizedSize } from '@/shared/utils/size';
import { StyleSheet, TextProps, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface AnimatedTextProps extends TextProps {
  text: string; // Текст с возможными символами переноса строк (\n)
  duration?: number; // Длительность анимации для одного слова
}

const EnterFadeText: React.FC<AnimatedTextProps> = ({ text, duration = 150, ...props }) => {
  // Разделяем текст на строки по \n
  const lines = text.split('\n');

  return (
    <View style={styles.container}>
      {lines.map((line, lineIndex) => (
        <View key={`line-${lineIndex}`} style={styles.line}>
          {line.split(' ').map((word, wordIndex) => {
            // Рассчитываем общий индекс слова для корректной задержки
            const globalIndex = lines.slice(0, lineIndex).reduce((acc, l) => acc + l.split(' ').length, 0) + wordIndex;
            return (
              <Animated.Text
                {...props}
                key={`word-${lineIndex}-${wordIndex}`}
                entering={FadeIn.duration(500).delay(globalIndex * duration)}
                style={styles.text}
              >
                {word}{' '}
              </Animated.Text>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Разделение по строкам
  },
  line: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Автоматический перенос слов
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: normalizedSize(32),
    fontFamily: fontWeight['extra-bold'],
    color: '#fefefe',
    lineHeight: normalizedSize(43),
    letterSpacing: 0.3,
  },
});

export default EnterFadeText;

// icons/GenderIcons.tsx

import Svg, { Circle, Path, Line, SvgProps } from 'react-native-svg';

/** ♂ */
export const MaleIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Circle cx={10} cy={14} r={6} />
    <Path d="M15 9l5-5" />
    <Line x1={19} y1={4} x2={19} y2={8} />
    <Line x1={19} y1={4} x2={15} y2={4} />
  </Svg>
);

/** ♀ */
export const FemaleIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Circle cx={12} cy={8} r={6} />
    <Line x1={12} y1={14} x2={12} y2={22} />
    <Line x1={8} y1={18} x2={16} y2={18} />
  </Svg>
);

/** ⚧ (универсальный символ non-binary / trans) */
export const NonBinaryIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* главное кольцо */}
    <Circle cx={12} cy={12} r={5} />
    {/* стрелка вверх-вправо */}
    <Line x1={12} y1={7} x2={12} y2={2} />
    <Line x1={12} y1={2} x2={17} y2={2} />
    {/* крест вниз */}
    <Line x1={12} y1={17} x2={12} y2={22} />
    {/* стрелка влево */}
    <Line x1={7} y1={12} x2={2} y2={12} />
  </Svg>
);

/** «Prefer not to say» — вопросительный знак в круге */
export const UnknownGenderIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 3" />
    <Circle cx={12} cy={17.5} r={0.5} fill="currentColor" stroke="none" />
  </Svg>
);

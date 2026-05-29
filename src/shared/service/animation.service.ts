import {
  ComplexAnimationBuilder,
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutLeft,
  SlideOutRight,
  ZoomInDown,
} from 'react-native-reanimated';

// Место контроля анимаций в приложении

type OptionAnimationServiceType = {
  ANIMATION_SPEED: number;
  MASS: number;
  stiffness: number;
};

const OptionsAnimationService: OptionAnimationServiceType = {
  ANIMATION_SPEED: 160,
  MASS: 0.6,
  stiffness: 70,
};

class AnimationEngine {
  public ANIMATION_SPEED: number;
  public MASS: number;
  public stiffness: number;

  constructor(options: OptionAnimationServiceType) {
    const { ANIMATION_SPEED, MASS, stiffness } = options;
    this.ANIMATION_SPEED = ANIMATION_SPEED;
    this.MASS = MASS;
    this.stiffness = stiffness;
  }

  private createAnimation<T extends ComplexAnimationBuilder>(animationType: T, n: number) {
    return animationType
      .delay(n * this.ANIMATION_SPEED)
      .springify()
      .stiffness(this.stiffness)
      .mass(this.MASS);
  }

  fadeInUp = (n: number) => this.createAnimation(new FadeInUp(), n);
  fadeInDown = (n: number) => this.createAnimation(new FadeInDown(), n);
  fadeOutUp = (n: number) => this.createAnimation(new FadeOutUp(), n);
  zoomInDown = (n: number) => this.createAnimation(new ZoomInDown(), n);
  slideInRight = (n: number) => this.createAnimation(new SlideInRight(), n);
  slideOutRight = (n: number) => this.createAnimation(new SlideOutRight(), n);
  slideOutLeft = (n: number) => this.createAnimation(new SlideOutLeft(), n);
  slideInLeft = (n: number) => this.createAnimation(new SlideInLeft(), n);
  slideInDown = (n: number) => this.createAnimation(new SlideInDown(), n);
  slideInUp = (n: number) => this.createAnimation(new SlideInUp(), n);
}

export const animationEngine = new AnimationEngine(OptionsAnimationService);

class AnimationService {
  animationEngine: AnimationEngine;

  constructor(animationEngine: AnimationEngine) {
    this.animationEngine = animationEngine;
  }
}

export const animationService = new AnimationService(animationEngine);

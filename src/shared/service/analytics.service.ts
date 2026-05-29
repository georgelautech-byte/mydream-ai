import { customEvent as customEventFn } from 'vexo-analytics';

export const Events = {
  press_record_button_under_text: 'press_record_button_under_text',
  press_record_button: 'press_record_button',
  mic_button_inactive: 'mic_button_inactive',
  mic_button_active: 'mic_button_active',
  audio_too_short: 'audio_too_short',
  press_subblock: 'press_subblock',
  press_settings: 'press_settings',
  press_rate_us: 'press_rate_us',
  press_leave_a_review: 'press_leave_a_review',
  press_passcode: 'press_passcode',
  press_complete_dream_inactive: 'press_complete_dream_inactive',
  press_complete_dream_active: 'press_complete_dream_active',
  open_interpretation: 'open_interpretation',
  disabled_interpretation: 'disabled_interpretation',
  press_feedback: 'press_feedback',
  error_to_create_dream: 'error_to_create_dream',
  press_outer_share_button: 'press_outer_share_button',
  press_inner_share_button: 'press_inner_share_button',
};

class EventsController {
  private customEvent: (name: string, args: object) => void;

  constructor(customEvent: (name: string, args: object) => void) {
    this.customEvent = customEvent;
  }

  trackEvent(name: string, args: object) {
    this.customEvent(name, args);
  }
}

export const analytics = new EventsController(customEventFn);

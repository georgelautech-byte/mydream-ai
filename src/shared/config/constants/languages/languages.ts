interface IDisplayLanguage {
  label: string;
  code: string;
  flag: string;
}

export const languages: IDisplayLanguage[] = [
  // { label: 'العربية', code: 'ar', flag: '🇸🇦' },
  { label: 'Türkçe', code: 'tr', flag: '🇹🇷' },
  { label: '中文', code: 'zh', flag: '🇨🇳' },
  { label: 'Nederlands', code: 'nl', flag: '🇳🇱' },
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: 'Español', code: 'es', flag: '🇪🇸' },
  { label: 'Français', code: 'fr', flag: '🇫🇷' },
  { label: 'Deutsch', code: 'de', flag: '🇩🇪' },
  { label: 'हिंदी', code: 'hi', flag: '🇮🇳' },
  { label: 'Italiano', code: 'it', flag: '🇮🇹' },
  { label: '日本語', code: 'ja', flag: '🇯🇵' },
  { label: '한국어', code: 'ko', flag: '🇰🇷' },
  { label: 'Polski', code: 'pl', flag: '🇵🇱' },
  { label: 'Português', code: 'pt', flag: '🇵🇹' },
  { label: 'Svenska', code: 'sv', flag: '🇸🇪' },
  { label: 'Norsk', code: 'no', flag: '🇳🇴' },
  { label: 'Русский', code: 'ru', flag: '🇷🇺' },
  { label: 'Čeština', code: 'cs', flag: '🇨🇿' },
].sort((a, b) => a.code.localeCompare(b.code));

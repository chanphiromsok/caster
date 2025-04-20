export interface ThemeColors {
  "--primary": string;
  "--primary-light": string;
  "--secondary": string;
  "--primary-text": string;
  "--card": string;
  "--text": string;
  "--subtext": string;
  "--accent": string;
  "--inactive": string;
  "--divider": string;
  "--sub-card": string;
  "--off-white": string;
  "--card-reverse": string;
  "--tag": string;
  "--green-300": string;
  "--blue-300": string;
  "--orange-300": string;
}

type RawThemeKeys = keyof ThemeColors;
type TrimmedThemeKeys = RawThemeKeys extends `--${infer T}` ? T : never;

export const DEFAULT_MIN_CHAR = 1;
export const DEFAULT_MAX_CHAR = 255;

export const emptyMessage = (title: string) => `${title} is required!`;
export const exceedMaxCharMessage = (
  title: string,
  maxChar: number = DEFAULT_MAX_CHAR
) => `${title} has a maximum of ${maxChar} character`;
export const receedMinCharMessage = (
  title: string,
  minChar: number = DEFAULT_MIN_CHAR
) => `${title} has a minimum of ${minChar} character`;

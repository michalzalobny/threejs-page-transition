import { pageTransitionDuration } from 'variables';

export const VARIABLES = [
  {
    name: '--transition-duration',
    value: pageTransitionDuration + 'ms',
  },
];

interface SetCssVariables {
  variables: typeof VARIABLES;
}

export const setCssVariables = ({ variables }: SetCssVariables) => {
  const root = document.documentElement;

  for (let i = 0; i < variables.length; i++) {
    const el = variables[i];
    root.style.setProperty(el.name, el.value);
  }
};

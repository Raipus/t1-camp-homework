import type { Theme } from '@/app/App';
import { SystemDarkModeSolid, SystemLightModeSolid } from '@admiral-ds/icons';
import { IconButton, TooltipHoc } from '@admiral-ds/react-ui';
import React, { type Dispatch, type SetStateAction } from 'react';

type Props = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

const ButtonWithTooltip = TooltipHoc(IconButton);

export const ThemeButton: React.FC<Props> = ({ theme, setTheme }) => {
  return (
    <ButtonWithTooltip
      renderContent={() => (theme === 'light' ? 'Тёмная тема' : 'Светлая тема')}
      dimension="m"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <SystemDarkModeSolid /> : <SystemLightModeSolid />}
    </ButtonWithTooltip>
  );
};

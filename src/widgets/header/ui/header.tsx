import type { Theme } from '@/app/App';
import { typography } from '@admiral-ds/react-ui';
import React, { type Dispatch, type SetStateAction } from 'react';
import styled from 'styled-components';
import Logo from '@shared/assets/icons/logo.svg?react';
import { ThemeButton } from '@/features/theme-button';

type Props = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

const Background = styled.header`
  background: var(--admiral-color-Special_ElevatedBG);
  display: flex;
  justify-content: space-between;
  border-bottom-left-radius: var(--admiral-border-radius-Large);
  border-bottom-right-radius: var(--admiral-border-radius-Large);
  padding: 1rem;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
`;

const Brand = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const BrandNameHeader = styled.h1`
  ${typography['Header/H3']}
  color: var(--admiral-color-Neutral_Neutral90);

  @media (max-width: 768px) {
    ${typography['Header/H4']}
  }
`;

export const Header: React.FC<Props> = ({ theme, setTheme }) => {
  return (
    <Background>
      <Brand>
        <Logo />
        <BrandNameHeader>Т1: Менеджер задач</BrandNameHeader>
      </Brand>
      <ThemeButton theme={theme} setTheme={setTheme} />
    </Background>
  );
};

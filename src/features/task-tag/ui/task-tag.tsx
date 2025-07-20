import BugSolid from '@admiral-ds/icons/build/category/BugSolid.svg?react';
import IdeaSolid from '@admiral-ds/icons/build/category/IdeaSolid.svg?react';
import AddTemplateSolid from '@admiral-ds/icons/build/documents/AddTemplateSolid.svg?react';
import DocOperationsSolid from '@admiral-ds/icons/build/documents/DocOperationsSolid.svg?react';
import TesterSolid from '@admiral-ds/icons/build/category/TesterSolid.svg?react';

import ErrorSolid from '@admiral-ds/icons/build/service/ErrorSolid.svg?react';
import InfoSolid from '@admiral-ds/icons/build/service/InfoSolid.svg?react';
import LessOrEqualSolid from '@admiral-ds/icons/build/service/LessOrEqualSolid.svg?react';

import { Tag, type TagKind } from '@admiral-ds/react-ui';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
};

export const TaskTag: React.FC<Props> = ({ title }) => {
  const [icon, setIcon] = useState<React.ReactNode>(<InfoSolid />);
  const [kind, setKind] = useState<TagKind>('neutral');

  useEffect(() => {
    if (title === 'Баг') {
      setKind('danger');
      setIcon(<BugSolid />);
    }
    if (title === 'Фича') {
      setKind('success');
      setIcon(<IdeaSolid />);
    }
    if (title === 'Документация') {
      setKind('primary');
      setIcon(<AddTemplateSolid />);
    }
    if (title === 'Рефакторинг') {
      setKind('warning');
      setIcon(<DocOperationsSolid />);
    }
    if (title === 'Тест') {
      setKind('neutral');
      setIcon(<TesterSolid />);
    }

    if (title === 'Высокий') {
      setKind('danger');
      setIcon(<ErrorSolid />);
    }
    if (title === 'Средний') {
      setKind('warning');
      setIcon(<InfoSolid />);
    }
    if (title === 'Низкий') {
      setKind('success');
      setIcon(<LessOrEqualSolid />);
    }
  }, [title]);

  return (
    <Tag statusViaBackground kind={kind} icon={icon} as="span" style={{ cursor: 'pointer' }}>
      {title}
    </Tag>
  );
};

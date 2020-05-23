import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { pipe } from 'common';
import { withToggleType } from 'element';
import { HeadingType } from 'elements/heading';
import { ToolbarLink } from 'elements/link/components';
import * as SlateReact from 'slate-react';
import { input, output } from './onMouseDown-without-url.fixture';

it('should render', () => {
  const editor = pipe(input, withToggleType());

  jest.spyOn(SlateReact, 'useSlate').mockReturnValue(editor as any);
  jest.spyOn(window, 'prompt').mockReturnValue('');

  const { getByTestId } = render(
    <ToolbarLink data-testid="ToolbarLink" type={HeadingType.H1} icon={null} />
  );

  const element = getByTestId('ToolbarLink');
  fireEvent.mouseDown(element);

  expect(editor.children).toEqual(output.children);
});

import React, { useEffect } from 'react';
import {
  Combobox,
  ComboboxProps,
  comboboxStore,
} from '@udecode/plate-combobox';
import { PlatePluginKey } from '@udecode/plate-core';
import {
  COMBOBOX_TRIGGER_MENTION,
  CreateMentionNode,
  ELEMENT_MENTION,
  getMentionOnSelectItem,
} from '@udecode/plate-mention';

export const MentionCombobox = ({
  items,
  component,
  onRenderItem,
  id,
  pluginKey = ELEMENT_MENTION,
  trigger,
  insertSpaceAfterMention,
  createMentionNode,
}: Pick<ComboboxProps, 'items' | 'component' | 'onRenderItem'> & {
  id?: string;
  trigger?: string;
  insertSpaceAfterMention?: boolean;
  createMentionNode?: CreateMentionNode;
} & PlatePluginKey) => {
  const activeId = comboboxStore.use.activeId();
  const onSelectMentionItem = getMentionOnSelectItem({
    pluginKey,
    insertSpaceAfterMention,
    createMentionNode,
  });

  useEffect(() => {
    comboboxStore.set.setComboboxById({
      id: id ?? pluginKey,
      trigger: trigger ?? COMBOBOX_TRIGGER_MENTION,
      onSelectItem: onSelectMentionItem,
    });
  }, [pluginKey, onSelectMentionItem, trigger, id]);

  if (activeId !== id ?? pluginKey) return null;

  return (
    <Combobox items={items} component={component} onRenderItem={onRenderItem} />
  );
};
import * as vscode from 'vscode';

import { pascalCase } from 'change-case';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { modules, workspaceDir } from './_helper';

export async function handleModuleGen() {
  // 模块
  const module = await vscode.window.showQuickPick(modules());
  if (!module) return;

  // 名称
  const name = await vscode.window.showInputBox({
    prompt: '请输入页面英文名称(小写+下划线模式)',
  });
  if (!name) return;

  // 描述
  const desc = await vscode.window.showInputBox({
    prompt: '请输入页面描述',
  });
  if (!desc) return;


}

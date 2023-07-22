import { pascalCase } from 'change-case';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { modules, screensOf, workspaceDir } from './_helper';

export async function handleFeatRename() {
  const module = await vscode.window.showQuickPick(modules());
  if (!module) return;

  const oldName = await vscode.window.showQuickPick(screensOf(module));
  if (!oldName) return;

  const newName = await vscode.window.showInputBox({ prompt: "请输入新名称(使用下划线格式)" });
  if (!newName) return;

  const workspace = workspaceDir();
  const modulePath = `${workspace}/modules/${module}`

  // 重命名文件
  const blocFilePath = `${modulePath}/lib/src/bloc/local/${oldName}.bloc.dart`;
  if (fs.existsSync(blocFilePath)) {
    fs.renameSync(blocFilePath, `${modulePath}/lib/src/bloc/local/${newName}.bloc.dart`);
  }

  const screenDirPath = `${modulePath}/lib/src/ui/screen/${oldName}`;
  fs.renameSync(screenDirPath, `${modulePath}/lib/src/ui/screen/${newName}`);
  const screenFilePath = `${modulePath}/lib/src/ui/screen/${newName}/${oldName}.screen.dart`;
  fs.renameSync(screenFilePath, `${modulePath}/lib/src/ui/screen/${newName}/${newName}.screen.dart`);

  // 重命名引用
  _replaceForFile(`${modulePath}/lib/src/bloc/local/${newName}.bloc.dart`, oldName, newName);
  _replaceForFile(`${modulePath}/lib/src/ui/screen/${newName}/${newName}.screen.dart`, oldName, newName);
  _replaceForFile(`${modulePath}/lib/src/bloc/bloc.export.dart`, oldName, newName);
  _replaceForFile(`${modulePath}/lib/src/ui/screen/screen.export.dart`, oldName, newName);
  _replaceForFile(`${modulePath}/lib/src/router.dart`, oldName, newName);
  _replaceForFile(`${workspace}/components/constant/lib/src/resource/constants.dart`, oldName, newName);
}

function _replaceForFile(filePath: string, oldName: string, newName: string) {
  const camelOldName = pascalCase(oldName)
  const camelNewName = pascalCase(newName)

  const file = fs.readFileSync(filePath, 'utf8');
  const newContent = file
    .replace(RegExp(oldName, 'g'), newName)
    .replace(RegExp(camelOldName, 'g'), camelNewName);
  fs.writeFileSync(filePath, newContent);
}
import * as vscode from 'vscode';
import { workspaceDir } from './_helper';


export async function handleProjectGen() {
  // 生成预定的组件
  await _genComponent()
}

async function _genComponent() {
  const extensionPath = vscode.extensions
    .getExtension('decoratedflutter.decorated-flutter-vscode')
    ?.extensionUri;

  const componentsTmpl = extensionPath?.path + '/media/tmpl/components';
  vscode.workspace.fs.copy(
    vscode.Uri.file(componentsTmpl),
    vscode.Uri.file(`${workspaceDir()}/components`),
  );
  const modulesTmpl = extensionPath?.path + '/media/tmpl/modules';
  vscode.workspace.fs.copy(
    vscode.Uri.file(modulesTmpl),
    vscode.Uri.file(`${workspaceDir()}/modules`),
  );
}
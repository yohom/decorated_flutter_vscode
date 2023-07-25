import * as vscode from 'vscode';
import { workspaceDir } from './_helper';


export async function handleProjectGen() {
  const extensionPath = vscode.extensions
    .getExtension('decoratedflutter.decorated-flutter-vscode')
    ?.extensionUri;

  const componentsTmpl = extensionPath?.path + '/media/tmpl/project/components';
  vscode.workspace.fs.copy(
    vscode.Uri.file(componentsTmpl),
    vscode.Uri.file(`${workspaceDir()}/components`),
  );
  const modulesTmpl = extensionPath?.path + '/media/tmpl/project/modules';
  vscode.workspace.fs.copy(
    vscode.Uri.file(modulesTmpl),
    vscode.Uri.file(`${workspaceDir()}/modules`),
  );
}
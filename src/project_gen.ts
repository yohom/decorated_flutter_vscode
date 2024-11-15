import * as vscode from 'vscode';
import { workspaceDir } from './_helper';

export async function handleProjectGen() {
  const extensionPath = vscode.extensions
    .getExtension('decoratedflutter.decorated-flutter-vscode')
    ?.extensionUri;

  const componentsTmpl = extensionPath?.path + '/media/tmpl/project/components';
  await vscode.workspace.fs.copy(
    vscode.Uri.file(componentsTmpl),
    vscode.Uri.file(`${workspaceDir()}/components`),
    { overwrite: true }
  );

  const modulesTmpl = extensionPath?.path + '/media/tmpl/project/modules';
  await vscode.workspace.fs.copy(
    vscode.Uri.file(modulesTmpl),
    vscode.Uri.file(`${workspaceDir()}/modules`),
    { overwrite: true }
  );

  const pubspecTmpl = extensionPath?.path + '/media/tmpl/project/pubspec.yaml';
  await vscode.workspace.fs.copy(
    vscode.Uri.file(pubspecTmpl),
    vscode.Uri.file(`${workspaceDir()}/pubspec.yaml`),
    { overwrite: true }
  );

  const mainTmpl = extensionPath?.path + '/media/tmpl/project/lib/main.dart';
  await vscode.workspace.fs.copy(
    vscode.Uri.file(mainTmpl),
    vscode.Uri.file(`${workspaceDir()}/lib/main.dart`),
    { overwrite: true }
  );

  await vscode.workspace.fs.delete(
    vscode.Uri.file(`${workspaceDir()}/test`),
    { recursive: true },
  );

  await vscode.commands.executeCommand('pub.get');
}
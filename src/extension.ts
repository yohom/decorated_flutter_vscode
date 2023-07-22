import * as vscode from 'vscode';
import { handleFeatGen } from './feat_gen';
import { handleFeatRename } from './feat_rename';

export function activate(context: vscode.ExtensionContext) {
	let featGen = vscode.commands.registerCommand('decorated-flutter.feat_gen', handleFeatGen);
	let featRename = vscode.commands.registerCommand('decorated-flutter.feat_rename', handleFeatRename);

	context.subscriptions.push(featGen);
	context.subscriptions.push(featRename);
}

export function deactivate() { }

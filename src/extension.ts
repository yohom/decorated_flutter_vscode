import * as vscode from 'vscode';
import { handleFeatGen } from './feat_gen';
import { handleFeatRemove } from './feat_remove';
import { handleFeatRename } from './feat_rename';

export function activate(context: vscode.ExtensionContext) {
	let featGen = vscode.commands.registerCommand('decorated-flutter.feat_gen', handleFeatGen);
	let featRename = vscode.commands.registerCommand('decorated-flutter.feat_rename', handleFeatRename);
	let featRemove = vscode.commands.registerCommand('decorated-flutter.feat_remove', handleFeatRemove);

	context.subscriptions.push(featGen);
	context.subscriptions.push(featRename);
	context.subscriptions.push(featRemove);
}

export function deactivate() { }

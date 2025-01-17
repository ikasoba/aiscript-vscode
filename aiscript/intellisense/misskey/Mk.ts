import { languages, CompletionItem, CompletionItemKind } from 'vscode';
import { createCompletionItemKindMethod } from '../misc/createCompletionItemKindFn';

export default languages.registerCompletionItemProvider('aiscript', {
    provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        if (!(/Mk:$/).test(linePrefix)) {
            if (/(:|\.)[^)\s]*$/.test(linePrefix)) {
                return undefined;
            }
    
            const MkRoot = new CompletionItem('Mk:');
            MkRoot.kind = CompletionItemKind.Class;
            MkRoot.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
            return [MkRoot];
        }

        return [
            createCompletionItemKindMethod('dialog'),
            createCompletionItemKindMethod('confirm'),
            createCompletionItemKindMethod('api'),
            createCompletionItemKindMethod('apiExternal'),
            createCompletionItemKindMethod('save'),
            createCompletionItemKindMethod('load'),
            createCompletionItemKindMethod('url'),
            createCompletionItemKindMethod('nyaize'),
        ];
    }
}, ':');

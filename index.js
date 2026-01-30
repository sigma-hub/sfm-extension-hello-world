/**
 * Hello World Extension for Sigma File Manager
 * 
 * This is a demo extension that demonstrates how to:
 * - Add items to the context menu
 * - Register and execute commands
 * - Show notifications
 * - Show dialogs
 * - Access app context (current path, selected entries)
 * - Execute built-in commands (navigate, open dialogs)
 */

async function activate(context) {
  console.log('[Hello World] Extension activated!');
  console.log('[Hello World] Extension path:', context.extensionPath);

  const appVersion = await sigma.context.getAppVersion();
  console.log('[Hello World] App version:', appVersion);

  sigma.contextMenu.registerItem(
    {
      id: 'say-hello',
      title: '👋 Say Hello',
      group: 'extensions',
      order: 1
    },
    async (menuContext) => {
      const count = menuContext.selectedEntries.length;
      const firstName = menuContext.selectedEntries[0]?.name || 'there';
      
      sigma.ui.showNotification({
        title: 'Hello!',
        message: `Hello from the Hello World extension! You selected: ${firstName}`,
        type: 'info',
        duration: 3000
      });
    }
  );

  sigma.contextMenu.registerItem(
    {
      id: 'count-selected',
      title: '📊 Count Selected Items',
      group: 'extensions',
      order: 2,
      when: {
        selectionType: 'multiple'
      }
    },
    async (menuContext) => {
      const count = menuContext.selectedEntries.length;
      const files = menuContext.selectedEntries.filter(e => !e.isDirectory).length;
      const folders = menuContext.selectedEntries.filter(e => e.isDirectory).length;
      
      sigma.ui.showNotification({
        title: 'Selection Count',
        message: `Selected ${count} items: ${files} files, ${folders} folders`,
        type: 'success',
        duration: 4000
      });
    }
  );

  sigma.contextMenu.registerItem(
    {
      id: 'file-info',
      title: 'ℹ️ Show File Details',
      group: 'extensions',
      order: 3,
      when: {
        selectionType: 'single',
        entryType: 'file'
      }
    },
    async (menuContext) => {
      const file = menuContext.selectedEntries[0];
      
      if (file) {
        const sizeKB = file.size ? (file.size / 1024).toFixed(2) : 'Unknown';
        
        await sigma.ui.showDialog({
          title: 'File Details',
          message: `Name: ${file.name}\nPath: ${file.path}\nExtension: ${file.extension || 'None'}\nSize: ${sizeKB} KB`,
          type: 'info',
          confirmText: 'OK'
        });
      }
    }
  );

  sigma.contextMenu.registerItem(
    {
      id: 'copy-path',
      title: '📋 Copy Path',
      group: 'extensions',
      order: 4,
      when: {
        selectionType: 'single'
      }
    },
    async (menuContext) => {
      const entry = menuContext.selectedEntries[0];
      
      if (entry) {
        await navigator.clipboard.writeText(entry.path);
        
        sigma.ui.showNotification({
          title: 'Path Copied',
          message: `Copied to clipboard: ${entry.path}`,
          type: 'success',
          duration: 2000
        });
      }
    }
  );

  sigma.commands.registerCommand(
    { id: 'greet', title: 'Greet User' },
    async () => {
      const result = await sigma.ui.showDialog({
        title: 'Greeting',
        message: 'What is your name?',
        type: 'prompt',
        defaultValue: 'World',
        confirmText: 'Greet Me',
        cancelText: 'Cancel'
      });

      if (result.confirmed && result.value) {
        sigma.ui.showNotification({
          title: 'Hello!',
          message: `Hello, ${result.value}! Welcome to Sigma File Manager!`,
          type: 'success',
          duration: 5000
        });
      }
    }
  );

  sigma.commands.registerCommand(
    { id: 'show-info', title: 'Show Extension Info' },
    async () => {
      const appVersion = await sigma.context.getAppVersion();
      sigma.ui.showNotification({
        title: 'Hello World Extension',
        message: `Version 1.3.0 - Running on Sigma File Manager v${appVersion}`,
        type: 'info'
      });
    }
  );

  sigma.commands.registerCommand(
    { id: 'show-context', title: 'Show Current Context', description: 'Shows current path and selection info' },
    () => {
      const currentPath = sigma.context.getCurrentPath();
      const selectedEntries = sigma.context.getSelectedEntries();

      const message = selectedEntries.length > 0
        ? `Path: ${currentPath}\nSelected: ${selectedEntries.length} items\nFirst: ${selectedEntries[0].name}`
        : `Path: ${currentPath}\nNo items selected`;

      sigma.ui.showDialog({
        title: 'Current Context',
        message: message,
        type: 'info',
        confirmText: 'OK'
      });
    }
  );

  sigma.commands.registerCommand(
    { id: 'open-file-dialog', title: 'Open File Dialog', description: 'Opens a native file picker' },
    async () => {
      const result = await sigma.dialog.openFile({
        title: 'Select a file',
        filters: [
          { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (result) {
        sigma.ui.showNotification({
          title: 'File Selected',
          message: `You selected: ${Array.isArray(result) ? result.join(', ') : result}`,
          type: 'success'
        });
      }
    }
  );

  sigma.commands.registerCommand(
    { id: 'list-builtin-commands', title: 'List Built-in Commands', description: 'Shows available built-in commands' },
    async () => {
      const commands = sigma.commands.getBuiltinCommands();
      const commandList = commands.map(cmd => `• ${cmd.id}`).join('\n');

      await sigma.ui.showDialog({
        title: 'Built-in Commands',
        message: `Available commands:\n\n${commandList}`,
        type: 'info',
        confirmText: 'OK'
      });
    }
  );

  sigma.contextMenu.registerItem(
    {
      id: 'quick-view-file',
      title: '👁️ Quick View',
      group: 'extensions',
      order: 5,
      when: {
        selectionType: 'single',
        entryType: 'file'
      }
    },
    async (menuContext) => {
      const file = menuContext.selectedEntries[0];
      if (file) {
        try {
          await sigma.commands.executeCommand('sigma.quickView.open', file.path);
        } catch (err) {
          sigma.ui.showNotification({
            title: 'Quick View Error',
            message: err.message || 'Could not open quick view',
            type: 'error'
          });
        }
      }
    }
  );

  sigma.contextMenu.registerItem(
    {
      id: 'open-in-explorer',
      title: '📂 Open in System Explorer',
      group: 'extensions',
      order: 6,
      when: {
        selectionType: 'single'
      }
    },
    async (menuContext) => {
      const entry = menuContext.selectedEntries[0];
      if (entry) {
        try {
          await sigma.commands.executeCommand('sigma.navigator.openInSystemExplorer', entry.path);
        } catch (err) {
          sigma.ui.showNotification({
            title: 'Error',
            message: err.message || 'Could not open in explorer',
            type: 'error'
          });
        }
      }
    }
  );

  console.log('[Hello World] All handlers registered!');
}

async function deactivate() {
  console.log('[Hello World] Extension deactivated!');
}

if (typeof module !== 'undefined') {
  module.exports = { activate, deactivate };
}

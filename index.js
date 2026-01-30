/**
 * Hello World Extension for Sigma File Manager
 * 
 * This is a demo extension that demonstrates how to:
 * - Add items to the context menu
 * - Register and execute commands
 * - Show notifications
 * - Show dialogs
 */

async function activate(context) {
  console.log('[Hello World] Extension activated!');
  console.log('[Hello World] Extension path:', context.extensionPath);

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
    () => {
      sigma.ui.showNotification({
        title: 'Hello World Extension',
        message: 'Version 1.0.0 - A demo extension for Sigma File Manager',
        type: 'info'
      });
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

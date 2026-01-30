# Changelog

All notable changes to this extension will be documented in this file.

## [1.5.0] - 2026-01-30

### Changed

- Renamed extension from "Hello World" to "Example"
- Updated description to better reflect the extension's purpose as a reference implementation
- Updated configuration title to "Example Extension Settings"

## [1.4.1] - 2026-01-30

### Fixed

- "Greet User" command now properly uses configured settings (greeting, style, duration)
- Previously the greet command was hardcoded and ignored user settings

## [1.4.0] - 2026-01-30

### Added

- **Configurable Settings** - Extension now has user-configurable settings:
  - `greeting` - Customize the greeting message (default: "Hello")
  - `showNotifications` - Enable/disable notifications (default: true)
  - `notificationDuration` - Set notification duration in ms (default: 4000)
  - `greetingStyle` - Choose greeting style: friendly, formal, or casual
- New "Show Current Settings" command - displays all current setting values
- Settings change detection using `sigma.settings.onChange()`

### Changed

- "Say Hello" context menu item now respects user settings:
  - Uses configured greeting message
  - Applies selected greeting style
  - Respects notification duration setting
  - Can be disabled via showNotifications setting
- "Show Extension Info" now uses configured notification duration
- Updated description to mention configurable settings

### Technical

- Demonstrates new `sigma.settings` API:
  - `sigma.settings.get(key)` - Get a setting value with default fallback
  - `sigma.settings.getAll()` - Get all settings at once
  - `sigma.settings.onChange(key, callback)` - Watch for setting changes
- Settings are automatically displayed in Settings > Extensions

## [1.3.0] - 2026-01-30

### Added

- New context API demonstrations:
  - "Show Current Context" command - displays current path and selected entries
  - Uses `sigma.context.getCurrentPath()` and `sigma.context.getSelectedEntries()`
- New built-in command demonstrations:
  - "Quick View" context menu item - opens files in quick view using `sigma.quickView.open`
  - "Open in System Explorer" context menu item - opens items in system file explorer
  - "List Built-in Commands" command - shows available built-in commands
- New dialog API demonstration:
  - "Open File Dialog" command - demonstrates native file picker using `sigma.dialog.openFile()`
- App version display using `sigma.context.getAppVersion()`

### Changed

- Updated "Show Extension Info" to display app version alongside extension version
- Updated description to reflect new capabilities

## [1.2.0] - 2026-01-30

### Changed

- Updated manifest to use new categories system (replaced tags-based classification)
- Category changed to "Example" for clearer extension classification
- Fixed repository URL in manifest

## [1.1.0] - 2026-01-30

### Added

- New context menu item: "Copy Path" - copies the selected item's path to clipboard

### Changed

- Updated description to better reflect extension capabilities

## [1.0.0] - 2025-01-30

### Added

- Initial release
- Context menu items:
  - Say Hello - Shows greeting notification
  - Count Selected Items - Shows count of selected files/folders
  - Show File Details - Displays file information dialog
- Commands:
  - Greet User - Interactive greeting with name prompt
  - Show Extension Info - Displays extension information

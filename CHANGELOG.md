# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2020-03-30

### Added

- <https://github.com/leafac/shiki-latex/issues/8>: Add support for `mathescape` mode.

## [1.1.6] - 2020-03-26

### Added

- A bunch more of debugging information.

### Fixed

- <https://github.com/leafac/shiki-latex/issues/6>: Preserve trailing newlines.

## [1.1.5] - 2020-03-25

### Fixed

- Remove colors from log even if `stderr` is a TTY.

## [1.1.4] - 2020-03-24

### Changed

- Use the [`debug` package](https://www.npmjs.com/package/debug) instead of homebrewed solution. Call with `DEBUG=shiki-latex` environment variable and logs are written to `shiki-minted-debug.log`.

## [1.1.3] - 2020-03-24

### Changed

- Debugging environment variable from `SHIKI_LATEX_DEBUG` to `DEBUG`.

## [1.1.2] - 2020-03-23

### Added

- Better `README` formatting.

## [1.1.1] - 2020-03-23

### Fixed

- <https://github.com/leafac/shiki-latex/issues/4>: Escape `\` correctly.

## [1.1.0] - 2020-03-22

### Added

- <https://github.com/leafac/shiki-latex/issues/3#issuecomment-601790389>: Load custom themes.
- Debugging with the `SHIKI_LATEX_DEBUG` environment variable. The debug log is written to `shiki-minted-debug.json`.

### Fixed

- <https://github.com/leafac/shiki-latex/issues/3>: Normalize colors, for example, `#D8DEE9FF` turns into `#D8DEE9`, and `#FFF` turns into `#FFFFFF`. This is necessary because the `xcolor` LaTeX package expects colors in this format.

## [1.0.2] - 2020-03-13

### Fixed

- <https://github.com/leafac/shiki-latex/issues/2>: Escaping `}`.

## [1.0.1] - 2020-03-13

### Fixed

- <https://github.com/leafac/shiki-latex/issues/1>: Parsing of parameters to make executable compatible with older versions of minted.

## [1.0.0] - 2020-03-10

### Added

- LaTeX renderer for Shiki.
- Executable compatible with the way minted calls Pygments.

[unreleased]: https://github.com/leafac/shiki-latex/compare/1.2.0...HEAD
[1.2.0]: https://github.com/leafac/shiki-latex/compare/1.1.6...1.2.0
[1.1.6]: https://github.com/leafac/shiki-latex/compare/1.1.5...1.1.6
[1.1.5]: https://github.com/leafac/shiki-latex/compare/1.1.4...1.1.5
[1.1.4]: https://github.com/leafac/shiki-latex/compare/1.1.3...1.1.4
[1.1.3]: https://github.com/leafac/shiki-latex/compare/1.1.2...1.1.3
[1.1.2]: https://github.com/leafac/shiki-latex/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/leafac/shiki-latex/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/leafac/shiki-latex/compare/1.0.2...1.1.0
[1.0.2]: https://github.com/leafac/shiki-latex/compare/1.0.0...1.0.2
[1.0.1]: https://github.com/leafac/shiki-latex/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/leafac/shiki-latex/releases/tag/1.0.0

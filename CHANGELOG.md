# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

---

### [0.0.10] - 2023-02-05

### Feat

- feat: added `remove` method to remove keys from body on step instance

### Fix

- fix: ensure get id from body if exists and apply to step instance

---

### [0.0.9] - 2023-02-05

### Feat

- feat: added `autoPublishLog` middleware

---

### [0.0.8] - 2023-02-04

### Feat

- feat: added provider to publish to aws S3
- feat: added provider to publish to an endpoint by http request.

---

### [0.0.7] - 2023-02-03

### Fix

- fix: get caller class name from error.

---

### [0.0.6] - 2023-02-03

### Fix

- fix: get tags from catch error and format data on error.

---

### [0.0.5] - 2023-02-03

### Added

- added: implement `Step.catch(err)` to create a step from Error.

### Fix

- fix: write local file
- fix: remove keys from sub object in body or data using `remove: []` option

---

### [0.0.4] - 2023-02-01

### Added

- added: implement `bindLog` to bind a log instance to request.

---

### [0.0.3] - 2023-01-31

### Fix

- fix: added step on write local log
- fix: change step from `info` to `stack`

### Changed
### Breaking change

- rename: from `LOGMiddleware` to `stackLog`

---

### [0.0.2-beta.0] - 2023-01-31

### Changed

- log: change generated file name to .log

### Added

- log: added middleware builder
- log: added "method" attribute to step as "GET", "POST" ... option

---

### [0.0.1-beta.2] - 2023-01-29

### Added

- log: format messages for each category
- [ ERROR ]: Step.error(props)
- [ DEBUG ]: Step.debug(props)
- [ INFO  ]: Step.info(props)
- [ FATAL ]: Step.fatal(props)
- [ WARN  ]: Step.warn(props)
- [ STACK ]: Step.stack(props)
- [ UNDEF ]: When create step with invalid type
- [ LOG   ]: When create a global log - Log.ini()

### Change

- log: remove console.log and use process.stdout

---

### [0.0.1-beta.1] - 2023-01-29

### Added

- log: added global log
- log: added step log
- log: added print function
- log: added save local log on txt file

---

### [0.0.1-beta.0] - 2023-01-27

### Added

- log: create base lib

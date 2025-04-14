# Vertec Ticket Extractor

## Installation

Install using npm:

```sh
npm install -g vertec-ticket-extractor
```

Locate your installation folder

```sh
npm list -g
```

You should find a `node_modules/vertec-ticket-extractor` folder.

Go to `chrome://extensions` or `edge://extensions` respectivly and enable to switch labelled _Developer Mode_. Then press the _Load unpacked_ button and select the above mentioned folder.

## Usage

To use the extension you need to [create an atlassian API-Token](https://id.atlassian.com/manage-profile/security/api-tokens). Enter this and your accounts E-Mail in the settings dialog that pops up once you click on the extension icon in your brownser.

## Update

To update the extension, run the following:

```sh
npm upgrade -g vertec-ticket-extractor
```

## Build locally

Install dependencies:

```sh
pnpm install
```

Compile typescript & generate assets:

```sh
pnpm build
```

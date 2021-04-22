export const Versions = [
  '16.7',
  '16.8',
  '16.9',
  '16.10',
  '16.10.1',
  '16.10.2',
  '16.11',
  '16.12.0',
  '16.13.0',
  '16.13.1',
  '16.14.0',
  '17.0.0',
  '17.0.1',
  '17.0.2',
  'next',
];

export const TEST_PORT = 6060;
export const TIMEOUT = 5000;

export const getURL = (version: string): string => `http://localhost:${TEST_PORT}/${version}.html`;

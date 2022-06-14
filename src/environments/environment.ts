export const APP_ENVIRONMENT = 'APP_ENVIRONMENT';

export interface Environment {
  cachingTime: number;
  timeout: number;
  httpSourceUrls: string[];
}

export const environment = {
  cachingTime: 3600, // 1 hour
  timeout: 800,
  httpSourceUrls: ['https://coding-challenge.powerus.de/flight/source1', 'https://coding-challenge.powerus.de/flight/source2'],
};

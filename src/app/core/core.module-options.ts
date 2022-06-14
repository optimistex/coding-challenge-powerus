import { InjectionToken } from '@nestjs/common';

export const CORE_MODULE_OPTIONS: InjectionToken = 'CORE_MODULE_OPTIONS';

export interface CoreModuleOptions {
  /** Time in seconds */
  cachingTime: number;
  timeout: number;
  httpSourceUrls: string[];
}

import { InjectionToken } from '@nestjs/common';

export const CORE_MODULE_OPTIONS: InjectionToken = 'CORE_MODULE_OPTIONS';

export interface CoreModuleOptions {
  timeout: number;
  httpSourceUrls: string[];
}

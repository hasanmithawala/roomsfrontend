import { InjectionToken } from '@angular/core';
import { Appconfig } from './appconfig.interface';
import { environment } from 'src/environments/environment';
export const APP_SERVICE_CONFIG = new InjectionToken<Appconfig>('app config');
export const APP_CONFIG: Appconfig = {
  apiEndPoint: environment.apiEndPoint,
};
// when you want to inject a specific value than this can be used

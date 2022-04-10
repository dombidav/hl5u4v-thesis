// import { APP_INJECTOR } from '../app/app.module'
// import { firstValueFrom } from 'rxjs'
// import { TranslateService } from '@ngx-translate/core'

export function translate(key: string, params?: any): Promise<string> {
  return Promise.resolve(key)
  // When using the TranslateService, the first value from the Observable is the translation:
  // const translate = APP_INJECTOR.get(TranslateService)
  // return firstValueFrom(translate.get(key, { ...params }))
}

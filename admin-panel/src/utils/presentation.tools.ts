import { AlertController, LoadingController } from '@ionic/angular'
import { ConfirmationService } from 'primeng/api'
import { APP_INJECTOR } from '../app/app.module'
import { translate } from './translation.tools'

export async function presentConfirmation(message: string, header: string = ''): Promise<boolean> {
  const confirmation = APP_INJECTOR.get(ConfirmationService)
  message = await translate(message)
  header = header === '' ? '' : await translate(header)

  return new Promise((resolve) => {
    confirmation.confirm({
      message,
      header,
      closeOnEscape: false,
      accept: () => resolve(true),
      reject: () => resolve(false),
    })
  })
}

export async function presentAlert(message: string, header: string = ''): Promise<void> {
  const alert = APP_INJECTOR.get(AlertController)
  message = await translate(message)
  header = header === '' ? '' : await translate(header)

  return new Promise((resolve) => {
    alert
      .create({
        header,
        message,
        buttons: ['OK'],
      })
      .then((d) => d.present().then(() => resolve()))
  })
}

export async function presentLoading(translationKey = '') {
  const loadingController = APP_INJECTOR.get(LoadingController)

  const l = await loadingController.create(
    translationKey
      ? {
        message: await translate(translationKey),
      }
      : {},
  )
  l.present().then()
  return l
}

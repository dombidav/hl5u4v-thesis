import { environment } from '../environments/environment'

export function api(url: string | string[], params?: { [key: string]: string }): string {
    if (typeof url === 'string') {
        url = [url]
    }
    if (!params) {
        params = {}
    }
    return `${environment.APP_URL}/${url.join('/')}?${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')}`
}

export class NaeApiRest {
  private baseUrl: string

  constructor() {
    this.baseUrl = '/app/'
  }

  authRequestOptions = (method: string = 'POST') => {
    let token: string = ''
    const localToken = localStorage.getItem('token')
    if (localToken !== null) {
      token = localToken
    }
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }
  }

  addElement = (model: string, data: any) => {
    const url = this.baseUrl + model + '/'

    const requestOptions = {
      ...this.authRequestOptions('POST'),
      body: JSON.stringify(data)
    }

    return fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => this._checkResponse(res))
  }

  getElements = (model: string, extraData?: any) => {
    let url = this.baseUrl + model + '/'
    if (extraData) {
      url += '?extraData=' + JSON.stringify(extraData)
    }

    const requestOptions = {
      ...this.authRequestOptions('GET')
    }

    return fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => this._checkResponse(res))
  }

  getElement = (model: string, id: number) => {
    const url = this.baseUrl + model + '/' + id

    const requestOptions = {
      ...this.authRequestOptions('GET')
    }

    return fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => this._checkResponse(res))
  }

  getElementRel = (model: string, id: number, relModel: string) => {
    const url = this.baseUrl + model + '/' + id + '/' + relModel

    const requestOptions = {
      ...this.authRequestOptions('GET')
    }

    return fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => this._checkResponse(res))
  }

  updateElement = (model: string, id: number, data: any) => {
    const url = this.baseUrl + model + '/' + id

    const requestOptions = {
      ...this.authRequestOptions('PUT'),
      body: JSON.stringify(data)
    }

    return fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => this._checkResponse(res))
  }

  deleteElement = (model: string, id: number) => {
    const url = this.baseUrl + model + '/' + id

    const requestOptions = {
      ...this.authRequestOptions('DELETE')
    }

    return fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => this._checkResponse(res))
  }

  _checkResponse = (res: any) => {
    // eslint-disable-next-line promise/param-names
    return new Promise<any>((success, reject) => {
      if (!!res && res.success !== 0) {
        success(res)
      } else {
        reject(res.errors)
      }
    })
  }
}

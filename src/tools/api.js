class Api {
    constructor(endpoint, token) {
        this.endpoint = endpoint
        this.token = token
        this.name = null

        if (this.token) this.readToken()
    }

    readToken() {
        const json = JSON.parse(atob(this.token.split('.')[1]))

        this.name = json.name
    }

    async to(url, params = {}) {
        if (!params['headers'])
            params['headers'] = {}
        if (this.token)
            params['headers']['Authorization'] = `Bearer ${this.token}`
        if (params.method === 'post')
            params['headers']['Content-Type'] = 'application/json'
        if (params.body instanceof Object)
            params['body'] = JSON.stringify(params['body'])

        const res = await fetch(`${this.endpoint}/${url}`, params)
        return await res.json()
    }

    async authorize(name, authorization) {
        const { token } = await this.to('authenticate', {
            method: 'post',
            body: {
                name,
                token: authorization
            }
        })

        localStorage.setItem('token', token)
        this.token = token
        this.readToken()
    }
}

export default Api

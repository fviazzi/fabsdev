// Models
import sample from './models/sample.json'

export default function Mock () {

  const oldFetch = window.fetch

  window.fetch = async (url, content) => {

    // Switch endpoint
    switch (true) {

      case url.includes('localhost/sample'):
        return promise(sample, content)

      default:
        // Pass through any requests not handled above
        return oldFetch(url, content).then(response => response)
    }
  }

  function promise (model) {

    return new Promise((resolve, reject) => {

      // Declare response
      const body = model.body

      // Make sure response is good
      if (model.status >= 200 && model.status < 300) {

        // Resolve
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => body
          })
        }, 600)

      } else {

        // Throw error
        setTimeout(() => {

          const error = new Error({
            ok: false,
            status: model.status,
            data: model.errors
          })
          reject(error)
        }, 600)
      }
    })
  }
}

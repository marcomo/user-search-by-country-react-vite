import { Status } from "../types/Status"

export type Resource<T> = { read: () => T | undefined }

const promiseWrapper: <T>(wrappedPromise: Promise<T>) => Resource<T> = <T>(wrappedPromise: Promise<T>) => {
  let status: Status = Status.pending
  let response: T

  const suspender = wrappedPromise.then(
    (res: T) => {
      status = Status.resolved
      response = res
    },
    err => {
      status = Status.rejected
      response = err
    }
  )
  return {
    read() {
      // pending
      if (status === Status.pending) {
        throw suspender
      }
      // rejected
      if (status === Status.rejected) {
        throw response
      }
      //resolved
      if (status === Status.resolved) {
        return response
      }
    }
  }
}

export default promiseWrapper
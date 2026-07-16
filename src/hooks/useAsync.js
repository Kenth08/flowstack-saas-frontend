import { useCallback, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// useAsync — standardizes the loading / error / data lifecycle for any async
// function (today: the mock `src/api/*` calls; tomorrow: the same functions
// hitting the real backend). Pages use it to render skeletons, ErrorState with
// a retry, and EmptyState — with zero changes needed when the API goes live.
//
// Usage:
//   const { data, loading, error, reload } = useAsync(() => listProjects(), [])
//
// `deps` behaves like a useEffect dependency array: when a value changes (e.g.
// the active workspace uuid) the request re-runs automatically.
// ---------------------------------------------------------------------------
export function useAsync(asyncFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => setReloadKey((k) => k + 1), [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    Promise.resolve()
      .then(asyncFn)
      .then((result) => {
        if (active) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (active) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey])

  return { data, loading, error, reload }
}

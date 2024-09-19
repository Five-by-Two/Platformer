import { Route, Routes } from 'react-router-dom'
import { routerConfig } from './routerConfig'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { NotFoundPage } from '../pages'

export function Router() {
  const { pathname } = useLocation()

  useEffect(() => {
    console.log('Current path is:', pathname)
  }, [])

  return (
    <Routes>
      {routerConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

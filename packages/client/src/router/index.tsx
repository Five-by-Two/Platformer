import { Route, Routes } from 'react-router-dom'
import { routerConfig } from './routerConfig'
import { NotFoundPage } from '../pages'

export function Router() {
  return (
    <Routes>
      {routerConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

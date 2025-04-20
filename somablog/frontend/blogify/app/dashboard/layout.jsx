import { Toaster } from 'react-hot-toast'
import ClientWrapper from './ClientWrapper'
import AuthInterceptor from '../components/AuthInterceptor'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Toaster />
      <AuthInterceptor />
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </div>
  )
}
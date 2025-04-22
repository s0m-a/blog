import { Toaster } from 'react-hot-toast'
import ClientWrapper from './ClientWrapper'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Toaster />
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </div>
  )
}
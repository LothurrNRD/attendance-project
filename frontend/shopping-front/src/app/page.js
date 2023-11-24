import Link from 'next/link'
import Login from './login/page'

export default function Home() {
  return (
    <>
      <Link style={{ margin: '20px' }} href={'/login'}>Login Page</Link >
      <Link href={'/shop-page'}>Shopping</Link>
    </>
  )
}

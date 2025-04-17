
import { OrbitProgress } from 'react-loading-indicators'

function Loading() {
  return (
    <div className='flex items-center justify-center h-screen' >
      
      <OrbitProgress variant="dotted" color="#2563EB" size="large" text="" textColor="" />
    </div>
  )
}

export default Loading

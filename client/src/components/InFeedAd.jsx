import { useEffect } from 'react'

const InFeedAd = ({ slot }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className="my-8">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-9394005351573853"
        data-ad-slot={slot}
      />
    </div>
  )
}

export default InFeedAd

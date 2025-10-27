import { useEffect } from 'react'

const AdBanner = ({ slot, format = 'auto', responsive = true, style = {} }) => {
  useEffect(() => {
    try {
      // Push ad to AdSense
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div style={{ textAlign: 'center', margin: '20px 0', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9394005351573853"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

export default AdBanner

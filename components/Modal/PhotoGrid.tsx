import type { MediaItem } from '@/lib/types'
import { imageUrl, videoUrl, videoPosterUrl } from '@/lib/cloudinary'

// Placeholder gradients used until real media is uploaded
const PLACEHOLDER_GRADS = ['grad-1','grad-2','grad-3','grad-4','grad-5','grad-6','grad-7','grad-8']
const PLACEHOLDER_EMOJIS = ['🌊','🏄','🌴','🌅','🌺','⛵','🐠','🌮']

interface Props {
  media: MediaItem[]
}

export default function PhotoGrid({ media }: Props) {
  return (
    <div className="photo-grid">
      {media.map((item, i) => (
        <div key={item.id} className={`photo-item${item.is_wide ? ' wide' : ''}`}>
          {item.cloudinary_public_id ? (
            item.resource_type === 'video' ? (
              <video
                src={videoUrl(item.cloudinary_public_id)}
                poster={videoPosterUrl(item.cloudinary_public_id)}
                controls
                playsInline
                preload="none"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl(item.cloudinary_public_id)}
                alt=""
                loading="lazy"
              />
            )
          ) : (
            // Placeholder until real media is uploaded
            <div className={`photo-placeholder ${PLACEHOLDER_GRADS[i % 8]}`}>
              {PLACEHOLDER_EMOJIS[i % 8]}
            </div>
          )}
          {item.resource_type === 'video' && (
            <div className="video-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {item.duration_seconds
                ? `${Math.floor(item.duration_seconds / 60)}:${String(item.duration_seconds % 60).padStart(2, '0')}`
                : 'video'}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

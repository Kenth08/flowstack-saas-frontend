import { cn } from '../../lib/cn'

// Served from /public — reference by root URL (not imported/bundled).
const logoUrl = '/flowstack-logo.png'

// FlowStack logo (image lockup: glyph + wordmark).
// `variant="light"` renders the full-color logo (for light backgrounds).
// `variant="dark"`  renders a solid-white version (for the navy sidebar,
// dark panels, etc.) via a CSS filter so the dark wordmark stays legible.
// `className` controls the height (defaults to h-8).
export default function Logo({ variant = 'dark', className }) {
  return (
    <img
      src={logoUrl}
      alt="FlowStack"
      className={cn(
        'w-auto select-none',
        className || 'h-8',
        variant === 'dark' && '[filter:brightness(0)_invert(1)]'
      )}
      draggable={false}
    />
  )
}

<<<<<<< Updated upstream
# Homepage Fixes TODO

## Immediate Tasks
- [x] Reduce particle rotation speed in ParticleNameAnimation.tsx (0.01 → 0.005)
- [x] Update Home.tsx to use EnhancedTechStack3D component instead of individual components
- [x] Add ParallaxBackground3D component to Home.tsx
- [x] Verify the layout matches TODO.md requirements (layers that progress as users scroll)

## Phase 4: Styling & Polish (from TODO_IMPLEMENTATION.md)
- [ ] Update CSS for 3D effects
- [ ] Add responsive design
- [ ] Test color schemes
- [ ] Optimize performance

## Phase 5: Testing
- [ ] Test 3D performance
- [ ] Verify responsive design
- [ ] Test animations
- [ ] Cross-browser testing
=======
Core Features
Scroll-Triggered Animation System on the Home Page

Smooth scroll-jacking that controls the user's scroll position
Each "slide" triggers when scrolling reaches specific thresholds
Parallax effects and smooth transitions between sections
Progress indicator showing which slide is currently active

Slide-Specific Features:
Slide 1: Name with Particle Effects

Large, bold "Jed Lin" text as the centerpiece
Dynamic particle system with electricity-like branching effects
Particles emanating from the text in organic, lightning-inspired patterns
Subtle glow effects and color variations in the particles
Responsive animation that reacts to mouse movement or scroll position

Slide 2: Dynamic Age Counter

Real-time age calculation from October 15, 2008 13:44
Updates every second showing years, days, hours, minutes, seconds
Smooth number transitions with subtle animations
Could display as a digital counter or more creative visualization
Optional: Show time in different formats (milliseconds lived, heartbeats, etc.)

Slide 3: Interactive Globe

3D globe with realistic world map textures
Smooth rotation animation on initial load
Zoom and focus transition to Toronto, Canada
Possible weather overlay or city lights effect
Subtle ambient lighting and shadows for depth

Slide 4: Introduction Content

Your biographical text presented with elegant typography
Staggered text animations (words/lines appearing in sequence)
Clean, readable layout with proper spacing
Subtle background elements or animations

Navigation & Controls

Action buttons (View Work, About, Resume) positioned below the scrolling container
Optional: Side navigation dots indicating current slide
Smooth scroll controls or "next/previous" functionality
Escape hatch to normal scrolling behavior

Technical Considerations

Mobile-responsive design with touch-friendly interactions
Performance optimization for smooth 60fps animations
Accessibility options (reduced motion preferences)
Fallback for users who prefer traditional scrolling
>>>>>>> Stashed changes

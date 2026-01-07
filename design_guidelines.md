# Design Guidelines: Cinematic 3D Scroll Animation

## Design Approach: Reference-Based
**Primary Reference**: Codrops Cinematic 3D Scroll Tutorial (Variant 2)
**Core Principle**: Create an exact 1:1 replica of the immersive scroll-driven 3D building transformation experience

## Layout Structure

**Full-Viewport Immersion**
- Each section occupies 100vh (full viewport height)
- Canvas/3D container fills entire screen
- Fixed positioning for 3D scene during scroll progression
- Minimum 5-7 scroll sections to showcase building transformation

**Scroll-Driven Navigation**
- Vertical scroll controls 3D scene progression
- Smooth scroll interpolation between keyframes
- Section indicators (subtle dots/numbers) on side to show progress
- No traditional navigation - scroll IS the navigation

## Typography

**Headline System**
- Primary: Bold, extra-large display font (80-120px desktop, 40-60px mobile)
- Secondary: Medium weight supporting text (24-32px)
- Use for sparse overlay text that appears during scroll transitions

**Caption/UI Text**
- Small, uppercase labels for section indicators (10-12px)
- Minimal body text if needed (16-18px)

## Spacing & Layout Primitives

**Tailwind Units**: Use p-4, p-8, p-12 for UI overlays
**3D Scene**: Full-screen canvas with no padding
**Text Overlays**: Positioned absolutely with controlled spacing from edges (e.g., left-8, bottom-12)

## Component Library

**Primary Components**

1. **3D Canvas Container**
   - Full viewport, z-index layering for content on top
   - WebGL/Three.js rendering surface

2. **Building Model**
   - Detailed 3D building structure with multiple morph targets
   - Smooth transition between architectural states
   - Proper lighting and material definitions

3. **Scroll Progress Indicator**
   - Vertical dot navigation showing current section
   - Minimalist, semi-transparent design

4. **Text Overlay Cards**
   - Fade in/out based on scroll position
   - Semi-transparent dark background with blur
   - Positioned strategically to not obscure building

5. **Loading Screen**
   - Simple progress indicator while 3D assets load
   - Matches overall aesthetic

## Animation Strategy

**Scroll-Linked Transformations**
- Camera movements tied to scroll percentage
- Building morphs through defined keyframe states
- Parallax effects on background elements
- Smooth easing functions (cubic-bezier recommended)

**Transition Timing**
- Each building state change spans 1 viewport scroll
- Overlap transitions for seamless flow
- Use GSAP ScrollTrigger or similar for precision

## Images & 3D Assets

**3D Building Model**
- High-quality architectural model (GLTF/GLB format)
- Multiple geometry states for morphing effect
- PBR materials for realistic rendering

**Environment**
- Skybox or gradient background
- Subtle atmospheric effects (fog/particles optional)
- Lighting that complements building geometry

**No Traditional Images**: This is a 3D-first experience - all visuals generated through WebGL

## Technical Specifications

**Performance**
- Optimize polygon count for smooth 60fps
- Use LOD (Level of Detail) for complex geometry
- Implement efficient scroll event handling

**Responsive Behavior**
- Adjust camera FOV and position for mobile
- Simplify geometry on lower-end devices if needed
- Maintain full-screen immersion across all breakpoints

**Accessibility**
- Provide skip/jump to section controls
- Reduced motion alternative if requested
- Keyboard navigation support

## Critical Implementation Notes

- Use Three.js for 3D rendering
- ScrollTrigger (GSAP) for scroll-animation binding
- Camera should move through/around building as user scrolls
- Building transformations should feel architectural and intentional
- Maintain cinematic quality with proper lighting and camera angles
- Dark background treatment to emphasize building structure

**No Color Specifications**: Focus on form, depth, and transformation rather than specific color palette
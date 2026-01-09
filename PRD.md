# Planning Guide

A comprehensive submarine training application for CGSM SFE 2026 (SNA DE GRASSE) that delivers educational courses with audio narration, Suffren submarine blueprints, and multiple-choice quizzes across various submarine domains, featuring AI-generated audio narration with a soft feminine voice, score tracking, and audio control capabilities.

**Experience Qualities**:
1. **Focused** - Clean, distraction-free interface that prioritizes learning content and quiz progression
2. **Accessible** - Simple navigation with large touch targets optimized for smartphone use, including locked-screen audio playback
3. **Professional** - Reliable training tool with clear feedback, score tracking, and downloadable results

**Complexity Level**: Light Application (multiple features with basic state)
This is a training tool with course content, multiple quiz sections, audio narration, score tracking, and download capabilities - but no complex backend integrations or advanced state management beyond quiz progress and scores.

## Essential Features

### Audio Course Library with AI Narration
- **Functionality**: Displays educational content about submarine systems with AI-generated audio narration
- **Purpose**: Provides foundational knowledge before quiz attempts
- **Trigger**: User selects a course topic from the main menu
- **Progression**: Course selection → Content display with play/pause controls → Audio narration plays with text highlighting → User can adjust audio speed/volume → Navigate to related quiz
- **Success criteria**: Audio plays continuously even when phone is locked, content is readable, narration is clear with feminine voice

### Suffren Submarine Plans Viewer
- **Functionality**: Displays detailed blueprints of the SNA Suffren with zoom, pan, and download capabilities
- **Purpose**: Provides technical reference material for submarine structure and systems
- **Trigger**: User selects the "Plans" tab from main navigation
- **Progression**: Tab selection → Plans display with embedded viewer → User can zoom in/out → User can toggle fullscreen → User can download original file
- **Success criteria**: Plans are clearly visible, zoom controls work smoothly, download opens Google Drive link, fullscreen mode works on mobile

### Multiple Quiz Categories (2-3 different quiz types, 130+ total questions)
- **Functionality**: Presents multiple-choice questions across submarine domains (navigation, systems, safety, operations, etc.) with optional timed mode featuring countdown timer for each question
- **Purpose**: Tests knowledge retention and provides practical training assessment with time pressure simulation
- **Trigger**: User selects a quiz category from main menu or after completing a course, optionally enabling timed mode in settings
- **Progression**: Quiz settings (enable timer, set time limit) → Quiz selection → Question display with 4 answer options → Countdown timer (if enabled) → User selects answer → Immediate feedback (correct/incorrect) → Next question → Final score display with percentage
- **Success criteria**: Smooth question flow, clear feedback, accurate scoring, at least 130 questions across multiple categories, countdown timer with visual indicators, automatic submission when time expires

### Score Tracking and Download
- **Functionality**: Records quiz attempts, displays results, and allows downloading score reports
- **Purpose**: Enables progress monitoring and official record-keeping
- **Trigger**: Quiz completion
- **Progression**: Quiz completion → Score summary screen → Option to download results as file → Share or save locally
- **Success criteria**: Scores persist between sessions, download generates readable format (text/JSON), includes date and category

### Audio Control Panel
- **Functionality**: Adjusts playback speed, volume, and enables background playback
- **Purpose**: Customizes learning experience for individual preferences
- **Trigger**: Accessible from any course screen
- **Progression**: User opens audio controls → Adjusts speed (0.5x-2x) → Adjusts volume → Enables/disables background playback → Settings persist
- **Success criteria**: Audio continues when screen locks, speed changes are smooth, controls are intuitive

### Timed Quiz Mode
- **Functionality**: Optional countdown timer for each quiz question with configurable time limits (15s to 2 minutes)
- **Purpose**: Simulates exam pressure and improves quick decision-making skills
- **Trigger**: User enables timed mode in quiz settings before starting a quiz
- **Progression**: Settings menu → Toggle timed mode → Select time per question → Start quiz → Visual countdown with color indicators (green>50%, orange>20%, red<20%) → Auto-submit when time expires
- **Success criteria**: Countdown accurate to the second, color changes smooth, auto-submission works correctly, timer pauses during feedback screen, settings persist across sessions

## Edge Case Handling
- **Empty quiz state**: Show message to select a category if user navigates directly to quiz without selection
- **Audio loading failure**: Display error message and retry button if AI audio generation fails
- **Incomplete quiz**: Save progress if user navigates away, offer to resume or restart
- **No score history**: Show empty state with encouragement to take first quiz
- **Browser audio restrictions**: Prompt user to enable audio permissions on first interaction
- **Timer expiration**: Auto-submit current answer (or mark as incorrect) when countdown reaches zero, show appropriate feedback
- **Settings change mid-quiz**: Timer settings only apply to new quiz sessions, not current active quiz

## Design Direction
The design should evoke professionalism, clarity, and technical precision reminiscent of submarine instrumentation - clean interfaces with high contrast, organized information hierarchy, and utilitarian efficiency.

## Color Selection
A deep nautical theme with technical precision inspired by submarine control panels and underwater environments.

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.08 250)) - Communicates submarine environment, authority, and technical focus
- **Secondary Colors**: Steel Gray (oklch(0.45 0.01 240)) for secondary actions and Sonar Green (oklch(0.65 0.12 150)) for success states
- **Accent Color**: Bright Cyan (oklch(0.75 0.15 210)) - Attention-grabbing for CTAs, active states, and quiz feedback
- **Foreground/Background Pairings**: 
  - Primary (Deep Navy #1a2e4a): White text (#FFFFFF) - Ratio 9.2:1 ✓
  - Accent (Bright Cyan #4dd0e1): Deep Navy text (#1a2e4a) - Ratio 7.8:1 ✓
  - Background (Dark Blue-Gray #0d1b2a): Light Gray text (#e8eef3) - Ratio 12.5:1 ✓
  - Success (Sonar Green #5fb878): White text (#FFFFFF) - Ratio 5.2:1 ✓

## Font Selection
Typography should be clear, legible on small screens, and convey technical precision suitable for training materials.

- **Primary Font**: Space Grotesk - Modern geometric sans-serif with excellent readability and technical character
- **Typographic Hierarchy**: 
  - H1 (Section Titles): Space Grotesk Bold/32px/tight letter spacing
  - H2 (Quiz Questions): Space Grotesk Semibold/24px/normal spacing
  - Body (Course Content): Space Grotesk Regular/16px/relaxed line height (1.6)
  - UI Labels: Space Grotesk Medium/14px/normal spacing
  - Score Display: Space Grotesk Bold/48px/tight spacing

## Animations
Animations should be purposeful and enhance the training experience without distraction - smooth transitions between questions, subtle feedback on answer selection, and gentle pulsing for audio playback indicators.

- Question transitions: 300ms slide with fade
- Answer selection: 150ms scale with color change
- Score reveal: 400ms count-up animation
- Audio controls: 200ms smooth state changes
- Navigation: 250ms fade between sections
- Timer countdown: Smooth color transitions (green→orange→red) based on remaining time percentage
- Timer appearance: 200ms fade-in when question loads

## Component Selection
- **Components**: 
  - Tabs (main navigation between Audio Course/Plans/Quizzes/Scores)
  - Card (course content, plans viewer, quiz questions, score summaries, timer display)
  - Button (answer options, navigation, audio controls, zoom controls)
  - Progress (quiz completion indicator, timer countdown bar)
  - Scroll Area (course content, question history)
  - Dialog (score download confirmation, quiz settings with timer options)
  - Badge (category labels, correct/incorrect indicators, timer status)
  - Slider (audio speed/volume controls)
  - Switch (enable/disable timed mode)
  - Select (time per question dropdown)
  - Footer (legal notice with copyright information)
  
- **Customizations**: 
  - Large touch-friendly answer buttons (min 56px height)
  - Custom audio player with waveform visualization
  - Quiz progress indicator with segment highlighting
  - Score download button with icon
  - Timer card with color-coded countdown (green/orange/red based on time remaining)
  - Timer badge on quiz cards showing time limit when timed mode enabled
  - Embedded Google Drive viewer for plans with zoom controls
  - Legal footer with copyright notice from Bastien Verdu
  
- **States**: 
  - Buttons: Default (navy), Hover (lighter navy), Active (cyan), Disabled (gray), Selected (cyan with checkmark)
  - Answer options: Unselected (neutral), Selected (cyan border), Correct (green fill), Incorrect (red fill)
  - Audio controls: Playing (pulsing cyan), Paused (static gray), Loading (spinning)
  - Timer: Safe (green >50%), Warning (orange 20-50%), Critical (red <20%), Expired (gray)
  - Zoom controls: Default (outline), Disabled (when at min/max zoom)
  
- **Icon Selection**: 
  - Play/Pause (audio controls)
  - Headphones (audio course tab)
  - Blueprint (plans tab)
  - Clipboard (quizzes)
  - TrendUp (scores)
  - Download (export scores, download plans)
  - Gear (quiz settings)
  - CheckCircle (correct answers)
  - XCircle (incorrect answers)
  - Timer (countdown indicator, timed mode badge)
  - MagnifyingGlassPlus/Minus (zoom controls)
  - ArrowsOut (fullscreen toggle)
  
- **Spacing**: 
  - Section padding: p-6 (24px)
  - Card gaps: gap-4 (16px)
  - Button spacing: space-y-3 (12px between)
  - Component margins: mb-6 (24px)
  - Footer padding: py-6 (24px vertical)
  
- **Mobile**: 
  - Single column layout throughout
  - Sticky header with tabs
  - Fixed audio controls at bottom when course is active
  - Full-width answer buttons
  - Collapsible score history
  - Bottom sheet for settings instead of dialog
  - Responsive footer with centered legal text

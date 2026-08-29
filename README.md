# SafeDrive AI

Build a premium, modern, highly interactive React.js web application prototype called:

SAFEdriveX

AI-Powered Road Safety & Reward System

This is a Future 6.0 hackathon prototype focused on ROAD SAFETY.

IMPORTANT:

This is a FRONTEND-ONLY prototype for a hackathon/judging demonstration.

Do NOT build the backend yet.

Do NOT require real IoT hardware.

Do NOT require real AI models.

Do NOT require real GPS hardware.

Use realistic mock data and simulated real-time sensor data.

The frontend must look like a real production-ready smart road safety platform, not like a basic student dashboard.

==================================================

PROJECT GOAL

==================================================

The platform encourages safe driving using:

- AI-based unsafe driving detection

- Real-time safety alerts

- Helmet compliance

- Seat-belt compliance

- Speed monitoring

- Mobile-phone distraction detection

- Harsh braking detection

- Rash driving detection

- Drowsiness detection

- Driving safety score

- Reward points

- Reward redemption

- Driving history

- Leaderboard

- Emergency SOS

- Admin analytics

The concept is:

SAFE DRIVING → HIGHER SCORE → MORE POINTS → REWARDS

UNSAFE DRIVING → ALERT → SCORE/PENALTY → SAFER BEHAVIOUR

The application should communicate this concept immediately to a hackathon judge.

==================================================

TECH STACK

==================================================

Use:

- React.js

- Vite

- Tailwind CSS

- React Router

- Lucide React icons

- Framer Motion for animations

- Recharts for graphs

- Leaflet / React Leaflet for map visualization

- JavaScript

- Local mock JSON/data

- localStorage for temporary frontend persistence

Do NOT use TypeScript unless necessary.

Use reusable React components.

Create a clean component architecture.

==================================================

DESIGN DIRECTION

==================================================

Overall design:

Premium Smart Mobility + AI + IoT dashboard.

Visual inspiration:

- Modern automotive dashboard

- Tesla-style information hierarchy

- Smart-city technology

- AI monitoring dashboard

- Futuristic but professional

- Dark mode as primary UI

- Glassmorphism used carefully

- Neon green for SAFE

- Red for DANGER

- Amber/yellow for WARNING

- Blue/cyan for technology information

Do NOT make it look like a gaming website.

It should look like a serious government/Smart City/AI road safety product.

Use:

Background:

#07111F / #0B1220 style dark navy

Cards:

dark glass panels with subtle borders

SAFE:

green

WARNING:

amber

DANGER:

red

INFO:

blue/cyan

Typography:

Inter or another modern sans-serif.

Use large numbers for important metrics.

Use subtle gradients.

Use soft shadows.

Use glowing status indicators.

==================================================

GLOBAL LAYOUT

==================================================

Create a responsive application shell.

Desktop:

--------------------------------------------------

| Logo | Navigation | Notifications | Profile   |

--------------------------------------------------

| Sidebar | Main Content                         |

|         |                                      |

|         |                                      |

--------------------------------------------------

Sidebar:

1. Dashboard

2. Live Monitoring

3. Safety Score

4. Driving History

5. Rewards

6. Leaderboard

7. Emergency SOS

8. Profile

Bottom:

Settings

Logout

Mobile:

Convert sidebar into a responsive drawer/bottom navigation.

==================================================

BRAND

==================================================

Logo:

Shield + motorcycle/car safety symbol.

Brand:

SafeDriveX

Tagline:

"Ride Smart. Drive Safe."

Alternative tagline:

"Every Safe Drive Counts."

Add small status:

● System Online

==================================================

PAGE 1 — LANDING PAGE

==================================================

Create a highly impressive landing page.

Hero section:

LEFT:

Small badge:

AI + IoT ROAD SAFETY PLATFORM

Heading:

"Make Every Journey

A Safer Journey."

Highlight:

"AI-powered road safety monitoring and rewards."

Description:

"SafeDriveX detects unsafe driving behaviour, provides real-time alerts, tracks driving performance and rewards responsible drivers."

Buttons:

[Explore Dashboard]

[See How It Works]

RIGHT:

Create a futuristic interactive vehicle/rider safety visualization.

Show:

- motorcycle

- smart helmet

- GPS

- AI camera

- safety dashboard

- sensor signals

Can use a high-quality generated/placeholder vehicle image if available.

Overlay floating status cards:

Speed

45 km/h

Helmet

Verified

Phone

Safe

Safety Score

92/100

Hero animation:

slow floating elements and pulsing sensor signals.

==================================================

LANDING PAGE — LIVE SAFETY DEMO

==================================================

Immediately below hero.

Title:

"Real-Time Safety Intelligence"

Create a simulated dashboard.

Cards:

CURRENT SPEED

45 km/h

SPEED LIMIT

60 km/h

HELMET

VERIFIED

PHONE

SAFE

BRAKING

NORMAL

SAFETY SCORE

92/100

Add animated status indicators.

Include a small "LIVE SIMULATION" badge.

==================================================

LANDING PAGE — HOW IT WORKS

==================================================

Create a 4-step process:

01

Sensors Collect Data

02

AI Detects Behaviour

03

Real-Time Alert

04

Score & Rewards

Show connecting animated lines.

==================================================

LANDING PAGE — SAFETY MODULES

==================================================

Create attractive cards for:

Helmet Detection

Seat Belt Detection

Speed Monitoring

Phone Detection

Harsh Braking

Drowsiness Detection

Rash Driving

Wrong-Side Detection

Each card should contain:

Icon

Title

Short description

Status

Example:

Helmet Detection

AI vision checks helmet compliance.

Status:

ACTIVE

==================================================

LANDING PAGE — REWARD SYSTEM

==================================================

Explain:

"Safe behaviour should be rewarded."

Show:

+10 Helmet

+15 Speed Compliance

+20 No Phone

+20 Smooth Driving

+15 Safe Braking

+25 10 KM Safe Drive

+50 Daily Challenge

+100 Weekly Safe Driver

Use attractive point animations.

==================================================

LANDING PAGE — CTA

==================================================

Large final section:

"Your Safety Has a Score.

Make Yours Count."

Buttons:

Start Safe Driving

View Demo

==================================================

PAGE 2 — LOGIN

==================================================

Modern split-screen login.

LEFT:

SafeDriveX branding

Safety quote:

"Every safe decision protects a life."

RIGHT:

Login form

Email

Password

Remember me

Login button

Google login button

"Don't have an account? Register"

Add demo login:

Demo Driver

Demo Admin

==================================================

PAGE 3 — REGISTER

==================================================

Fields:

Full Name

Email

Mobile Number

Vehicle Number

License Number

Password

Confirm Password

Vehicle type:

Motorcycle

Car

Commercial Vehicle

Button:

Create SafeDriveX Account

==================================================

PAGE 4 — DRIVER DASHBOARD

==================================================

This is the MOST IMPORTANT page.

Make this page visually impressive.

Top:

Good Morning, Vaishali

"Ready for a safer journey?"

System status:

● IoT Device Connected

● AI Monitoring Active

--------------------------------------------------

TOP METRICS

--------------------------------------------------

Current Speed

45 km/h

Speed Limit 60 km/h

Helmet

VERIFIED

Phone

SAFE

Safety Score

92/100

Points

2,450

--------------------------------------------------

SAFETY SCORE

--------------------------------------------------

Large circular animated score:

92 / 100

Label:

Excellent Driver

Show score breakdown:

Helmet Compliance 100%

Speed Compliance 94%

Braking Behaviour 90%

Phone-Free Driving 100%

Smooth Driving 85%

Use animated progress bars.

--------------------------------------------------

LIVE DRIVING STATUS

--------------------------------------------------

Create a large live monitoring panel.

Show:

Speed:

45 km/h

Speed Limit:

60 km/h

Helmet:

ON

Phone:

SAFE

Brake:

NORMAL

Drowsiness:

NORMAL

GPS:

CONNECTED

Camera:

ACTIVE

Create small pulsing LIVE indicator.

==================================================

REAL-TIME ALERT PANEL

==================================================

Show recent events.

Example:

10:32 AM

Speed within limit

+15 points

10:28 AM

Helmet verified

+10 points

10:21 AM

Smooth braking detected

+15 points

Use green status.

Also demonstrate warning state:

WARNING

Speed approaching limit

And danger state:

CRITICAL

Mobile phone detected

Allow buttons to simulate:

[Safe Event]

[Warning Event]

[Violation Event]

When clicked, update dashboard visually.

==================================================

DRIVING PERFORMANCE CHART

==================================================

Use Recharts.

Create:

Weekly Safety Score

Monday 82

Tuesday 88

Wednesday 91

Thursday 86

Friday 92

Saturday 94

Sunday 92

Chart:

Line chart

Also show:

Trips

42

Safe Trips

39

Violations

3

Distance

186 km

==================================================

MAP SECTION

==================================================

Use Leaflet.

Show a mock driving route.

Markers:

Start

Current Location

Safety Event

Destination

Display:

Current Location

Bhavnagar, Gujarat

Use mock coordinates.

Do NOT require real GPS.

==================================================

PAGE 5 — LIVE MONITORING

==================================================

Create a dedicated real-time monitoring page.

Header:

LIVE SAFETY MONITORING

Status:

● AI Monitoring Active

Main area:

LEFT:

Large camera preview.

Use a realistic placeholder image/video frame.

Overlay detection boxes.

Example:

PERSON

HELMET ✓

PHONE

NOT DETECTED ✓

RIGHT:

AI Detection Panel

Helmet

SAFE

Phone

SAFE

Drowsiness

SAFE

Seat Belt

SAFE

Driving Style

NORMAL

Bottom:

Sensor status.

GPS

CONNECTED

Accelerometer

ACTIVE

Gyroscope

ACTIVE

Camera

ACTIVE

Buzzer

READY

Create a "Simulate Violation" button.

When clicked:

Phone detected!

Change UI to red.

Show:

PHONE DETECTED

Please focus on driving.

Play visual alarm animation.

==================================================

PAGE 6 — SAFETY SCORE

==================================================

Create a beautiful analytics page.

Large score:

92 / 100

Level:

SAFE DRIVER

Show:

Current Score

92

Weekly Average

89

Monthly Average

87

Best Score

96

Score calculation:

Helmet

+10

Speed Compliance

+15

No Phone

+20

Smooth Driving

+20

Safe Braking

+15

Traffic Compliance

+15

Daily Safe Drive

+25

Use charts.

Show score history.

==================================================

PAGE 7 — DRIVING HISTORY

==================================================

Create table/list of previous trips.

Columns:

Date

Route

Distance

Max Speed

Violations

Safety Score

Points

Example:

10 Aug

Bhavnagar → GEC

12.4 km

54 km/h

0

94

+85

9 Aug

Bhavnagar → Home

8.7 km

62 km/h

1

81

+40

Add filters:

Date

Score

Violations

Route

Clicking a trip opens detailed trip information.

==================================================

PAGE 8 — REWARD STORE

==================================================

This should be visually attractive.

Header:

REWARD STORE

Current Points:

2,450 Points

Progress:

2450 / 5000

"2,550 points to unlock Insurance Discount"

Create reward cards:

500 POINTS

Coffee Coupon

1000 POINTS

Fuel Cashback

2000 POINTS

Shopping Voucher

3000 POINTS

Free Vehicle Service

5000 POINTS

Insurance Discount

Each card:

Icon

Reward name

Points

Description

Button:

Redeem

If insufficient points:

Need 550 more points

Add redemption confirmation modal.

==================================================

PAGE 9 — LEADERBOARD

==================================================

Create gamified but professional leaderboard.

Title:

SAFE DRIVER LEADERBOARD

Tabs:

College

City

State

Top 3:

#1

Aarav

4,820 points

96 safety score

#2

Vaishali

4,620 points

94 safety score

#3

Riya

4,400 points

93 safety score

Use podium cards.

Below:

Rank

Driver

Safety Score

Points

Safe Trips

Highlight current user.

Add:

"This Week's Safest Drivers"

==================================================

PAGE 10 — EMERGENCY SOS

==================================================

Make this page visually serious.

Header:

EMERGENCY SAFETY CENTER

Large SOS button:

SOS

"Press and hold for emergency assistance"

Show:

Emergency Contacts

Police

Ambulance

Family Contact

Mock GPS:

22.3039° N

72.1770° E

Location:

Bhavnagar, Gujarat

Emergency status:

READY

Create crash detection simulation:

"Simulate Emergency"

When activated:

EMERGENCY DETECTED

Location shared with emergency contacts.

Show countdown animation.

IMPORTANT:

This is only a prototype.

Do not actually call emergency services.

==================================================

PAGE 11 — PROFILE

==================================================

Driver profile.

Avatar

Vaishali

Safe Driver Level

Vehicle:

GJ-XX-XXXX

License:

XXXX XXXX XXXX

Statistics:

Total Trips

125

Safe Trips

117

Distance

1,284 km

Points

8,420

Safety Score

92

Achievements:

Helmet Hero

100 Safe KM

Phone-Free Driver

Smooth Braker

Weekly Champion

==================================================

PAGE 12 — ADMIN DASHBOARD

==================================================

Create a separate admin interface.

Admin sidebar:

Overview

Users

Violations

Sensors

Rewards

Reports

Analytics

Top metrics:

Total Drivers

12,840

Active Drivers

8,920

Safe Trips Today

18,420

Violations

1,240

Average Safety Score

87

Create charts:

Daily Safe Trips

Violation Types

Safety Score Distribution

Reward Redemption

==================================================

ADMIN — VIOLATIONS

==================================================

Table:

Driver

Violation

Location

Time

Severity

Points

Examples:

Rahul

Overspeed

Bhavnagar

10:32 AM

HIGH

-100

Riya

Mobile Usage

Bhavnagar

10:21 AM

MEDIUM

-100

==================================================

ADMIN — SENSOR MONITORING

==================================================

Show IoT sensor cards:

GPS

ONLINE

Camera

ONLINE

Accelerometer

ONLINE

Gyroscope

ONLINE

Helmet Sensor

ONLINE

Alcohol Sensor

ONLINE

Eye Sensor

ONLINE

Use green status indicators.

Allow one sensor to be simulated as:

OFFLINE

Then show warning.

==================================================

ADMIN — ANALYTICS

==================================================

Create professional charts.

Safety Score Trend

Violations by Type

Helmet Compliance

Phone Usage

Speed Violations

Harsh Braking

Drowsiness

Reward Redemptions

Use Recharts.

==================================================

IMPORTANT PROTOTYPE FEATURE

"JUDGE DEMO MODE"

==================================================

Create a special Demo Mode accessible from the dashboard.

Button:

🎬 Start Judge Demo

When clicked, show a guided demonstration.

Scenario:

STEP 1

Driver starts journey.

Status:

Helmet VERIFIED

Speed NORMAL

Phone SAFE

Score:

85

STEP 2

Driver maintains safe speed.

Points:

+15

Score:

88

STEP 3

Driver uses phone.

Trigger:

PHONE DETECTED

Show large red warning.

Score decreases.

Points:

-100

STEP 4

Driver stops phone usage.

Status returns SAFE.

STEP 5

Driver completes safe journey.

Reward:

+50 points

Final score:

92/100

Show:

"SAFE JOURNEY COMPLETED"

"85 → 92"

"+95 POINTS EARNED"

This demo should feel smooth and impressive.

Add Next Step button.

==================================================

MOCK REAL-TIME SIMULATION

==================================================

Create a reusable simulation hook.

Every few seconds, randomly update:

speed

helmetStatus

phoneStatus

brakeStatus

drowsiness

gpsStatus

safetyScore

But do NOT make the simulation chaotic.

Use realistic transitions.

Example:

45 → 47 → 49 → 52 km/h

If speed > speedLimit:

status = WARNING

If speed > speedLimit + 10:

status = DANGER

If phoneDetected:

show red alert.

Allow manual simulation buttons.

==================================================

NOTIFICATION SYSTEM

==================================================

Create toast notifications.

Examples:

✓ Helmet detected. +10 points

✓ Safe speed maintained. +15 points

⚠ Speed approaching limit

✕ Phone usage detected. -100 points

✓ Safe journey completed. +50 points

==================================================

SAFETY SCORE LOGIC

==================================================

Frontend demo logic:

Start score:

85

Safe behaviour increases score.

Unsafe behaviour decreases score.

Keep score between:

0 and 100.

Display score using:

Circular progress ring.

Colors:

80-100 = Green

60-79 = Amber

0-59 = Red

==================================================

REWARD LOGIC

==================================================

Points should be stored in frontend state/localStorage.

Reward points:

Wear Helmet +10

Wear Seat Belt +10

Follow Speed Limit +15

No Mobile Usage +20

Smooth Driving +20

Safe Braking +15

Follow Traffic Signals +15

Drive 10 km Safely +25

Daily Challenge +50

Weekly Safe Driver +100

Penalty:

No Helmet -50

No Seat Belt -50

Mobile Usage -100

Over Speed -100

Wrong Side -150

Signal Jump -200

Rash Driving -150

Drink Driving -500

Use these values consistently throughout the application.

==================================================

ANIMATIONS

==================================================

Use Framer Motion.

Animations:

- Page transitions

- Card entrance

- Number counters

- Progress bars

- Score ring animation

- Alert pulse

- Sensor pulse

- Reward points flying into balance

- Modal animations

- Chart animations

- Sidebar transitions

- Button hover effects

Do NOT overuse animations.

The UI should remain professional.

==================================================

RESPONSIVE DESIGN

==================================================

Desktop:

Optimized for 1440px+

Tablet:

Responsive grid

Mobile:

Fully responsive.

Dashboard cards should stack correctly.

Charts should remain readable.

Sidebar becomes drawer.

==================================================

ACCESSIBILITY

==================================================

Use:

- semantic HTML

- proper labels

- keyboard navigation

- sufficient contrast

- aria labels where needed

==================================================

COMPONENT STRUCTURE

==================================================

Create reusable components such as:

Navbar

Sidebar

DashboardCard

MetricCard

SafetyScore

SafetyRing

AlertCard

SensorCard

StatusBadge

SpeedGauge

RewardCard

LeaderboardTable

DrivingChart

SafetyChart

MapPanel

CameraPanel

DetectionOverlay

EmergencyButton

Modal

Toast

ProgressBar

PageHeader

==================================================

DATA STRUCTURE

==================================================

Create mock data files:

users.js

drivingData.js

rewards.js

violations.js

leaderboard.js

sensorData.js

alerts.js

Keep data separate from components.

==================================================

ROUTING

==================================================

Routes:

/

 /login

 /register

 /dashboard

 /live-monitoring

 /safety-score

 /history

 /rewards

 /leaderboard

 /emergency

 /profile

Admin:

/admin

/admin/users

/admin/violations

/admin/sensors

/admin/rewards

/admin/analytics

==================================================

IMPORTANT UX REQUIREMENT

==================================================

The judge should understand the product within 10 seconds.

The dashboard must immediately communicate:

1. Current Speed

2. Speed Limit

3. Helmet Status

4. Phone Status

5. Safety Score

6. Points

7. Real-Time Alerts

The UI should visually answer:

"Is the driver safe right now?"

==================================================

IMPORTANT HACKATHON PRESENTATION REQUIREMENT

==================================================

Make the prototype feel like a real working system.

Even though the backend and hardware are not implemented yet, the frontend should demonstrate:

Camera → AI Detection → Alert → Score Change → Points → Reward

Use simulated data to demonstrate this complete pipeline.

Clearly label simulated/demo components internally, but do NOT put "fake" or "fake data" everywhere in the UI.

Use:

LIVE DEMO

SIMULATION

CONNECTED

MONITORING

rather than making the interface look unfinished.

==================================================

FINAL QUALITY REQUIREMENT

==================================================

Do not generate a generic admin dashboard.

Do not use excessive white backgrounds.

Do not make every card identical.

Do not create placeholder lorem ipsum.

Do not leave empty pages.

Every page must have meaningful realistic data.

The final result should look like a startup-quality AI + IoT road safety platform suitable for:

Future 6.0 Hackathon

Smart City Demonstration

Government Road Safety Proposal

College Innovation Competition

The UI must be visually impressive enough that a judge immediately understands:

"AI detects unsafe behaviour → system warns driver → driving score changes → safe behaviour earns points → points become rewards."

Build the complete frontend now.

React + Vite

Tailwind CSS

Framer Motion

Recharts

React Leaflet

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://safedrive-ai-rewards.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b4f66421-5f33-44d6-b0bd-a7b2134b265b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

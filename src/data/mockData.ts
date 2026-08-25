export const REWARD_POINTS = [
  { label: "Wear Helmet", points: 10 },
  { label: "Wear Seat Belt", points: 10 },
  { label: "Follow Speed Limit", points: 15 },
  { label: "No Mobile Usage", points: 20 },
  { label: "Smooth Driving", points: 20 },
  { label: "Safe Braking", points: 15 },
  { label: "Follow Traffic Signals", points: 15 },
  { label: "Drive 10 km Safely", points: 25 },
  { label: "Daily Challenge", points: 50 },
  { label: "Weekly Safe Driver", points: 100 },
];

export const PENALTY_POINTS = [
  { label: "No Helmet", points: -50 },
  { label: "No Seat Belt", points: -50 },
  { label: "Mobile Usage", points: -100 },
  { label: "Over Speed", points: -100 },
  { label: "Wrong Side", points: -150 },
  { label: "Signal Jump", points: -200 },
  { label: "Rash Driving", points: -150 },
  { label: "Drink Driving", points: -500 },
];

export const currentUser = {
  name: "Vaishali",
  fullName: "Vaishali Chauhan",
  level: "Safe Driver Level 4",
  email: "vaishali@safedrivex.io",
  vehicle: "GJ-04-XX-7788",
  vehicleType: "Motorcycle",
  license: "GJ04 2019 0071234",
  city: "Bhavnagar, Gujarat",
  stats: {
    totalTrips: 125,
    safeTrips: 117,
    distance: 1284,
    points: 8420,
    safetyScore: 92,
  },
  achievements: [
    { name: "Helmet Hero", desc: "100 consecutive helmet-verified rides" },
    { name: "100 Safe KM", desc: "Zero violations across 100 km" },
    { name: "Phone-Free Driver", desc: "30 days without phone detection" },
    { name: "Smooth Braker", desc: "No harsh braking for 2 weeks" },
    { name: "Weekly Champion", desc: "Top 3 city leaderboard finish" },
  ],
};

export const scoreBreakdown = [
  { label: "Helmet Compliance", value: 100 },
  { label: "Speed Compliance", value: 94 },
  { label: "Braking Behaviour", value: 90 },
  { label: "Phone-Free Driving", value: 100 },
  { label: "Smooth Driving", value: 85 },
];

export const weeklyScores = [
  { day: "Mon", score: 82, violations: 2 },
  { day: "Tue", score: 88, violations: 1 },
  { day: "Wed", score: 91, violations: 0 },
  { day: "Thu", score: 86, violations: 1 },
  { day: "Fri", score: 92, violations: 0 },
  { day: "Sat", score: 94, violations: 0 },
  { day: "Sun", score: 92, violations: 0 },
];

export const monthlyScores = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  score: Math.round(80 + 12 * Math.sin(i / 3.4) + (i % 5 === 0 ? 3 : 0)),
}));

export const tripSummary = {
  trips: 42,
  safeTrips: 39,
  violations: 3,
  distance: 186,
};

export type Trip = {
  id: string;
  date: string;
  route: string;
  distance: number;
  maxSpeed: number;
  violations: number;
  score: number;
  points: number;
  duration: string;
  events: { time: string; label: string; type: "safe" | "warning" | "danger" }[];
};

export const trips: Trip[] = [
  {
    id: "t1",
    date: "10 Aug",
    route: "Bhavnagar → GEC",
    distance: 12.4,
    maxSpeed: 54,
    violations: 0,
    score: 94,
    points: 85,
    duration: "27 min",
    events: [
      { time: "09:02", label: "Helmet verified", type: "safe" },
      { time: "09:11", label: "Smooth braking detected", type: "safe" },
      { time: "09:24", label: "Speed within limit", type: "safe" },
    ],
  },
  {
    id: "t2",
    date: "09 Aug",
    route: "Bhavnagar → Home",
    distance: 8.7,
    maxSpeed: 62,
    violations: 1,
    score: 81,
    points: 40,
    duration: "19 min",
    events: [
      { time: "18:31", label: "Helmet verified", type: "safe" },
      { time: "18:40", label: "Speed approaching limit", type: "warning" },
      { time: "18:44", label: "Over speed 62 km/h", type: "danger" },
    ],
  },
  {
    id: "t3",
    date: "08 Aug",
    route: "GEC → Takhteshwar",
    distance: 5.2,
    maxSpeed: 46,
    violations: 0,
    score: 96,
    points: 70,
    duration: "13 min",
    events: [
      { time: "17:02", label: "Helmet verified", type: "safe" },
      { time: "17:09", label: "Signal compliance", type: "safe" },
    ],
  },
  {
    id: "t4",
    date: "07 Aug",
    route: "Bhavnagar → Ghogha",
    distance: 21.6,
    maxSpeed: 71,
    violations: 2,
    score: 74,
    points: 15,
    duration: "38 min",
    events: [
      { time: "07:12", label: "Helmet verified", type: "safe" },
      { time: "07:26", label: "Mobile phone detected", type: "danger" },
      { time: "07:33", label: "Harsh braking", type: "danger" },
    ],
  },
  {
    id: "t5",
    date: "06 Aug",
    route: "Home → Market",
    distance: 3.9,
    maxSpeed: 38,
    violations: 0,
    score: 98,
    points: 60,
    duration: "11 min",
    events: [
      { time: "11:02", label: "Helmet verified", type: "safe" },
      { time: "11:07", label: "Smooth driving streak", type: "safe" },
    ],
  },
  {
    id: "t6",
    date: "05 Aug",
    route: "Bhavnagar → Sihor",
    distance: 18.2,
    maxSpeed: 66,
    violations: 1,
    score: 84,
    points: 45,
    duration: "31 min",
    events: [
      { time: "16:05", label: "Helmet verified", type: "safe" },
      { time: "16:22", label: "Over speed 66 km/h", type: "danger" },
    ],
  },
];

export const rewards = [
  {
    id: "r1",
    name: "Coffee Coupon",
    points: 500,
    desc: "Free premium coffee at partner cafés across the city.",
    icon: "coffee",
    partner: "CityBrew",
  },
  {
    id: "r2",
    name: "Fuel Cashback",
    points: 1000,
    desc: "₹150 cashback on your next fuel refill at partner pumps.",
    icon: "fuel",
    partner: "IndianFuel",
  },
  {
    id: "r3",
    name: "Shopping Voucher",
    points: 2000,
    desc: "₹500 voucher usable at 40+ retail partners.",
    icon: "bag",
    partner: "RetailPlus",
  },
  {
    id: "r4",
    name: "Free Vehicle Service",
    points: 3000,
    desc: "Complete safety inspection and general service.",
    icon: "wrench",
    partner: "AutoCare",
  },
  {
    id: "r5",
    name: "Insurance Discount",
    points: 5000,
    desc: "Up to 20% off annual vehicle insurance premium.",
    icon: "shield",
    partner: "SafeAssure",
  },
];

export const leaderboard = {
  College: [
    { rank: 1, name: "Aarav", points: 4820, score: 96, trips: 132 },
    { rank: 2, name: "Vaishali", points: 4620, score: 94, trips: 125 },
    { rank: 3, name: "Riya", points: 4400, score: 93, trips: 118 },
    { rank: 4, name: "Karan", points: 4180, score: 91, trips: 110 },
    { rank: 5, name: "Meera", points: 3960, score: 90, trips: 104 },
    { rank: 6, name: "Dev", points: 3740, score: 88, trips: 99 },
    { rank: 7, name: "Ananya", points: 3520, score: 87, trips: 94 },
    { rank: 8, name: "Rahul", points: 3310, score: 84, trips: 90 },
  ],
  City: [
    { rank: 1, name: "Nikhil", points: 7420, score: 97, trips: 210 },
    { rank: 2, name: "Aarav", points: 6980, score: 96, trips: 198 },
    { rank: 3, name: "Vaishali", points: 6620, score: 94, trips: 190 },
    { rank: 4, name: "Priya", points: 6210, score: 93, trips: 184 },
    { rank: 5, name: "Manav", points: 5980, score: 92, trips: 178 },
    { rank: 6, name: "Isha", points: 5720, score: 90, trips: 170 },
  ],
  State: [
    { rank: 1, name: "Rohan", points: 12420, score: 98, trips: 402 },
    { rank: 2, name: "Sneha", points: 11880, score: 97, trips: 388 },
    { rank: 3, name: "Nikhil", points: 11220, score: 96, trips: 372 },
    { rank: 4, name: "Vaishali", points: 10620, score: 94, trips: 356 },
    { rank: 5, name: "Kabir", points: 10110, score: 93, trips: 340 },
    { rank: 6, name: "Tanvi", points: 9840, score: 92, trips: 331 },
  ],
} as const;

export const safetyModules = [
  {
    title: "Helmet Detection",
    desc: "AI vision checks helmet compliance before ignition.",
    status: "ACTIVE",
    icon: "helmet",
  },
  {
    title: "Seat Belt Detection",
    desc: "Cabin camera validates belt usage for all front seats.",
    status: "ACTIVE",
    icon: "belt",
  },
  {
    title: "Speed Monitoring",
    desc: "GPS + road database compares speed to live limits.",
    status: "ACTIVE",
    icon: "speed",
  },
  {
    title: "Phone Detection",
    desc: "Detects handheld phone usage while in motion.",
    status: "ACTIVE",
    icon: "phone",
  },
  {
    title: "Harsh Braking",
    desc: "Accelerometer flags sudden deceleration spikes.",
    status: "ACTIVE",
    icon: "brake",
  },
  {
    title: "Drowsiness Detection",
    desc: "Eye-aspect-ratio model tracks fatigue signals.",
    status: "ACTIVE",
    icon: "eye",
  },
  {
    title: "Rash Driving",
    desc: "Gyroscope detects aggressive lane weaving.",
    status: "ACTIVE",
    icon: "rash",
  },
  {
    title: "Wrong-Side Detection",
    desc: "Map matching flags wrong-way movement instantly.",
    status: "BETA",
    icon: "wrong",
  },
];

export const adminMetrics = [
  { label: "Total Drivers", value: 12840, tone: "info" },
  { label: "Active Drivers", value: 8920, tone: "safe" },
  { label: "Safe Trips Today", value: 18420, tone: "safe" },
  { label: "Violations", value: 1240, tone: "danger" },
  { label: "Avg Safety Score", value: 87, tone: "warning" },
];

export const dailySafeTrips = [
  { day: "Mon", safe: 15400, violations: 1420 },
  { day: "Tue", safe: 16120, violations: 1330 },
  { day: "Wed", safe: 17240, violations: 1290 },
  { day: "Thu", safe: 16880, violations: 1360 },
  { day: "Fri", safe: 18010, violations: 1470 },
  { day: "Sat", safe: 18920, violations: 1610 },
  { day: "Sun", safe: 18420, violations: 1240 },
];

export const violationTypes = [
  { type: "Overspeed", count: 420 },
  { type: "Mobile Usage", count: 310 },
  { type: "No Helmet", count: 240 },
  { type: "Harsh Braking", count: 155 },
  { type: "Drowsiness", count: 65 },
  { type: "Wrong Side", count: 50 },
];

export const scoreDistribution = [
  { band: "0-59", drivers: 640 },
  { band: "60-69", drivers: 1180 },
  { band: "70-79", drivers: 2460 },
  { band: "80-89", drivers: 4720 },
  { band: "90-100", drivers: 3840 },
];

export const redemptionData = [
  { name: "Coffee Coupon", value: 3420 },
  { name: "Fuel Cashback", value: 2180 },
  { name: "Shopping Voucher", value: 1240 },
  { name: "Vehicle Service", value: 620 },
  { name: "Insurance Discount", value: 210 },
];

export const adminViolations = [
  {
    driver: "Rahul",
    violation: "Overspeed",
    location: "Kaliyabid, Bhavnagar",
    time: "10:32 AM",
    severity: "HIGH",
    points: -100,
  },
  {
    driver: "Riya",
    violation: "Mobile Usage",
    location: "Ghogha Circle, Bhavnagar",
    time: "10:21 AM",
    severity: "MEDIUM",
    points: -100,
  },
  {
    driver: "Karan",
    violation: "No Helmet",
    location: "Nari Road, Bhavnagar",
    time: "10:04 AM",
    severity: "HIGH",
    points: -50,
  },
  {
    driver: "Meera",
    violation: "Harsh Braking",
    location: "Waghawadi Road",
    time: "09:52 AM",
    severity: "LOW",
    points: -30,
  },
  {
    driver: "Dev",
    violation: "Signal Jump",
    location: "Crescent Circle",
    time: "09:41 AM",
    severity: "HIGH",
    points: -200,
  },
  {
    driver: "Ananya",
    violation: "Drowsiness",
    location: "Sihor Highway",
    time: "09:18 AM",
    severity: "MEDIUM",
    points: -150,
  },
];

export const adminUsers = [
  { name: "Aarav Patel", vehicle: "GJ-04-AB-1122", score: 96, trips: 132, status: "Active" },
  { name: "Vaishali Chauhan", vehicle: "GJ-04-XX-7788", score: 94, trips: 125, status: "Active" },
  { name: "Riya Shah", vehicle: "GJ-04-CD-3344", score: 93, trips: 118, status: "Active" },
  { name: "Rahul Mehta", vehicle: "GJ-04-EF-5566", score: 78, trips: 90, status: "Flagged" },
  { name: "Meera Joshi", vehicle: "GJ-04-GH-7788", score: 90, trips: 104, status: "Active" },
  { name: "Dev Raval", vehicle: "GJ-04-IJ-9900", score: 71, trips: 66, status: "Suspended" },
];

export const sensors = [
  { name: "GPS Module", key: "gps", detail: "NEO-6M · 1Hz fix" },
  { name: "AI Camera", key: "camera", detail: "ESP32-CAM · 15 fps" },
  { name: "Accelerometer", key: "accel", detail: "MPU6050 · ±4g" },
  { name: "Gyroscope", key: "gyro", detail: "MPU6050 · 500°/s" },
  { name: "Helmet Sensor", key: "helmet", detail: "IR proximity" },
  { name: "Alcohol Sensor", key: "alcohol", detail: "MQ-3 · calibrated" },
  { name: "Eye Sensor", key: "eye", detail: "EAR model v2" },
];

export const emergencyContacts = [
  { name: "Police Control Room", number: "100", tag: "Emergency" },
  { name: "Ambulance", number: "108", tag: "Medical" },
  { name: "Family Contact — Papa", number: "+91 98XXX XXX21", tag: "Personal" },
  { name: "Highway Patrol", number: "1033", tag: "Roadside" },
];

export const routePath: [number, number][] = [
  [8, 78],
  [18, 70],
  [26, 62],
  [34, 66],
  [44, 54],
  [55, 47],
  [63, 38],
  [72, 34],
  [82, 24],
  [91, 18],
];

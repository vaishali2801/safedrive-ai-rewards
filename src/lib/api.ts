// In dev, Vite proxies /api → backend. In production, hit the backend directly.
const API_BASE = import.meta.env["VITE_API_URL"] ?? "/api";

class ApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("sdx_token");
  }

  setToken(token: string) {
    localStorage.setItem("sdx_token", token);
  }

  clearToken() {
    localStorage.removeItem("sdx_token");
  }

  private async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      ...options,
      headers,
    });

    const text = await res.text();

    let body: any;
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Server returned non-JSON (${res.status}). Is the backend running on port 5001?`);
    }

    if (!res.ok) {
      throw new Error(body.message || `HTTP ${res.status}`);
    }

    return body as T;
  }

  get<T = unknown>(endpoint: string, params?: Record<string, string | number | undefined>) {
    const query = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== "")
            .map(([k, v]) => [k, String(v)]),
        ).toString()
      : "";
    return this.request<T>(`${endpoint}${query}`);
  }

  post<T = unknown>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  }

  patch<T = unknown>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  }

  delete<T = unknown>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // ── Auth ──────────────────────────────────────────
  register(data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    licenseNumber?: string;
    vehicleNumber: string;
    vehicleType: string;
  }) {
    return this.post<{ success: boolean; data: { token: string; user: unknown } }>(
      "/auth/register",
      data,
    );
  }

  login(email: string, password: string) {
    return this.post<{ success: boolean; data: { token: string; user: unknown } }>(
      "/auth/login",
      { email, password },
    );
  }

  getMe() {
    return this.get<{ success: boolean; data: unknown }>("/auth/me");
  }

  logout() {
    return this.post("/auth/logout");
  }

  // ── Dashboard ─────────────────────────────────────
  getDashboard() {
    return this.get<{ success: boolean; data: Record<string, unknown> }>("/dashboard");
  }

  // ── Driving ───────────────────────────────────────
  startDrivingSession(data: {
    vehicleId: string;
    startLocation?: { coordinates: number[]; address?: string };
    speedLimit?: number;
  }) {
    return this.post("/driving/start", data);
  }

  getActiveSession() {
    return this.get("/driving/active");
  }

  endDrivingSession(data: {
    sessionId: string;
    endLocation?: { coordinates: number[]; address?: string };
  }) {
    return this.post("/driving/end", data);
  }

  getDrivingHistory(params?: Record<string, string | number | undefined>) {
    return this.get("/driving/history", params);
  }

  getDrivingStats() {
    return this.get("/driving/stats");
  }

  // ── Safety ────────────────────────────────────────
  getSafetyScore() {
    return this.get("/safety/score");
  }

  getSafetyHistory(params?: Record<string, string | number | undefined>) {
    return this.get("/safety/history", params);
  }

  getSafetyBreakdown() {
    return this.get("/safety/breakdown");
  }

  // ── Alerts ────────────────────────────────────────
  getAlerts(params?: Record<string, string | number | undefined>) {
    return this.get("/alerts", params);
  }

  getUnreadAlertCount() {
    return this.get("/alerts/unread-count");
  }

  markAlertAsRead(id: string) {
    return this.patch(`/alerts/${id}/read`);
  }

  markAllAlertsAsRead() {
    return this.patch("/alerts/read-all");
  }

  // ── Rewards ───────────────────────────────────────
  getRewards(params?: Record<string, string | number | undefined>) {
    return this.get("/rewards", params);
  }

  getMyRedemptions(params?: Record<string, string | number | undefined>) {
    return this.get("/rewards/my-redemptions", params);
  }

  redeemReward(id: string) {
    return this.post(`/rewards/${id}/redeem`);
  }

  // ── Leaderboard ───────────────────────────────────
  getLeaderboard(params?: Record<string, string | number | undefined>) {
    return this.get("/leaderboard", params);
  }

  // ── Emergency ─────────────────────────────────────
  triggerSOS(data: {
    triggerType: string;
    latitude?: number;
    longitude?: number;
    address?: string;
  }) {
    return this.post("/emergency/sos", data);
  }

  getEmergencyHistory(params?: Record<string, string | number | undefined>) {
    return this.get("/emergency/history", params);
  }

  // ── Admin ─────────────────────────────────────────
  getAdminDashboard() {
    return this.get("/admin/dashboard");
  }

  getAdminUsers(params?: Record<string, string | number | undefined>) {
    return this.get("/admin/users", params);
  }

  getAdminViolations(params?: Record<string, string | number | undefined>) {
    return this.get("/admin/violations", params);
  }

  getAdminAnalytics(params?: Record<string, string | number | undefined>) {
    return this.get("/admin/analytics", params);
  }

  // ── User ──────────────────────────────────────────
  getProfile() {
    return this.get("/users/profile");
  }

  getUserStats() {
    return this.get("/users/stats");
  }

  updateProfile(data: { name?: string; mobile?: string; licenseNumber?: string }) {
    return this.patch("/users/profile", data);
  }

  // ── AI ────────────────────────────────────────────
  aiDetection(type: string, data: Record<string, unknown>) {
    return this.post(`/ai/${type}`, data);
  }
}

export const api = new ApiClient();

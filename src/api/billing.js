// ---------------------------------------------------------------------------
// Billing  —  /api/v1/billing/
// ---------------------------------------------------------------------------
import { apiFetch, endpoints, mockRequest } from './client'
import { billing, plans } from '../data/mockData'

// GET /api/v1/billing/subscription/  ->  current plan, usage, invoice history.
export function getSubscription() {
  // TODO(api): return apiFetch(endpoints.subscription())
  return mockRequest(billing)
}

// Pricing plans shown on Billing + Landing. Static marketing content today;
// the backend may serve these so pricing can change without a redeploy.
export function listPlans() {
  // TODO(api): return apiFetch(`${API_BASE_URL}/billing/plans/`)
  return mockRequest(plans)
}

// POST /api/v1/billing/checkout-session/  ->  { url } to redirect to Stripe.
// payload: { plan: 'pro' | 'business' | ... }
export function createCheckoutSession(payload) {
  // TODO(api): const { url } = await apiFetch(endpoints.checkoutSession(), { method: 'POST', body: payload })
  //            window.location.href = url
  return mockRequest({ url: null, plan: payload?.plan })
}

// POST /api/v1/billing/portal-session/  ->  { url } to Stripe billing portal.
export function createPortalSession() {
  // TODO(api): const { url } = await apiFetch(endpoints.portalSession(), { method: 'POST' })
  //            window.location.href = url
  return mockRequest({ url: null })
}

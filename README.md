# Hotel Room Booking

A hotel room booking calculator built for the Raintech Software Limited coding assessment: pick check-in/check-out dates, choose one room, and see the nights and total price with clear validation and error handling.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Vitest

## How to run

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

Runs the Vitest suite (`vitest run`) covering nights/price calculation, date validation, room availability, and guest capacity.

## Build

```bash
npm run build
```

Type-checks with `tsc --noEmit` and then produces a production build with Vite.

## Implementation notes

- **Component / business-logic separation:** presentation lives in `src/components/` and `src/App.tsx`; pure business rules live in `src/logic/` (`booking.ts`, `validation.ts`, `availability.ts`, `dates.ts`); static data lives in `src/data/`; contracts live in `src/types/`. Logic modules have no React, DOM, storage, or network access, and the UI consumes their results instead of re-implementing rules.
- **Calendar-day calculation:** nights are computed as calendar days between check-in and check-out using UTC date math (`Date.UTC`), so timezone offsets and DST transitions cannot shift the result. Same-day and reversed ranges yield 0 nights, never a positive booking.
- **Validation precedence:** `validateDates(checkIn, checkOut, today)` is deterministic — it takes an explicit `today` string (the UI passes the current local day via `getTodayString()`), compares ISO date strings lexicographically, and reports errors in fixed order: `MISSING_CHECK_IN` → `PAST_CHECK_IN` → `MISSING_CHECK_OUT` → `INVALID_RANGE`. Today is a valid check-in; check-out must be strictly after check-in.
- **Optional availability / capacity features:** both bonuses are implemented. Availability uses the half-open interval model `[checkIn, checkOut)` against demo bookings in `src/data/bookings.ts`, so a request starting exactly on an existing check-out day is available; invalid requested ranges are treated as unavailable so they can never pass the check. Capacity filtering uses the single `isRoomCapacitySufficient` rule, and a selected room is automatically deselected if changed dates, guest count, or availability invalidate it.

## Improvements with more time

- Backend persistence for bookings with server-side availability validation.
- Real room inventory instead of hardcoded rooms and demo bookings.
- Booking confirmation workflow (guest details, reference number, confirmation screen).
- Stronger integration/e2e coverage for the full select-dates → select-room → confirm flow.

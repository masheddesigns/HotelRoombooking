# Hotel Room Booking

A hotel room booking calculator built for the Raintech Software Limited coding assessment: pick check-in/check-out dates, choose one room, and see the nights and total price with clear validation and error handling.

## Live Demo
[Open the live application](https://hotel-roombooking.vercel.app/)

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Vitest
- ESLint

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

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

Type-checks with `tsc --noEmit` and then produces a production build with Vite.

## Implementation notes

- **Component / business-logic separation:** presentation lives in `src/components/` and `src/App.tsx`; pure business rules live in `src/logic/` (`booking.ts`, `validation.ts`, `availability.ts`, `dates.ts`); static data lives in `src/data/`; contracts live in `src/types/`. Logic modules have no React, DOM, storage, or network access, and the UI consumes their results instead of re-implementing rules.
- **Calendar-day calculation:** nights are computed as calendar days between check-in and check-out using UTC date math (`Date.UTC`), so timezone offsets and DST transitions cannot shift the result. Same-day and reversed ranges yield 0 nights, never a positive booking.
- **Validation precedence:** `validateDates(checkIn, checkOut, today)` is deterministic — it takes an explicit `today` string (the UI passes the current local day via `getTodayString()`), compares ISO date strings lexicographically, and reports errors in fixed order: `MISSING_CHECK_IN` → `PAST_CHECK_IN` → `MISSING_CHECK_OUT` → `INVALID_RANGE`. Today is a valid check-in; check-out must be strictly after check-in.

## Assessment requirements

- Hardcoded rooms (R101–R301 with fixed rates and capacities).
- Check-in / check-out date selection with single room selection.
- Nights and total price calculation.
- Check-in cannot be in the past; check-out must be after check-in.
- Clear validation messages with deterministic error precedence.

## Bonus features

- Rooms already booked for the selected dates cannot be selected (half-open `[checkIn, checkOut)` availability check against demo bookings in `src/data/bookings.ts`; invalid ranges never pass).
- Unit tests for nights/price calculation (42 Vitest tests across `src/logic/`).
- Room filtering by guest count via the single `isRoomCapacitySufficient` rule; a room only counts as selected while its dates, availability, and capacity all hold.

## Improvements with more time

- Backend persistence for bookings with server-side availability validation.
- Real room inventory instead of hardcoded rooms and demo bookings.
- Booking confirmation workflow (guest details, reference number, confirmation screen).
- Stronger integration/e2e coverage for the full select-dates → select-room → confirm flow.

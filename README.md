# Travel Nurse Tycoon

A mobile-first nurse career sim prototype built with Next.js, Tailwind CSS, and Zustand. The experience brings the Travel Nurse Tycoon product vision to life with interactive offers, licensure tracking, housing choices, finances, and recruiter messaging.

## Getting Started

```bash
npm install
npm run dev
```

The development server runs at [http://localhost:3000](http://localhost:3000). The interface is optimized for 360–414px widths; shrink your browser or use device emulation for the best feel.

## Scripts

- `npm run dev` – start the Next.js development server
- `npm run build` – create a production build
- `npm run start` – run the production build locally
- `npm run lint` – run ESLint using Next.js defaults
- `npm run format` – check formatting with Prettier
- `npm run format:write` – apply Prettier formatting

## Container Deployment

The project ships with a multi-stage Dockerfile that builds the Next.js app and
starts it with `next start` on port 8080—Cloud Run's expected default. To build
and run the container locally:

```bash
docker build -t travel-nurse-tycoon .
docker run -p 8080:8080 travel-nurse-tycoon
```

Cloud Run will automatically inject the `PORT` environment variable, so no
additional configuration is required for deployment.

## Content

Seed data lives in [`docs/product_spec_gdd.md`](docs/product_spec_gdd.md) and the in-app mock data inside [`data`](data).

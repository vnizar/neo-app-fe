# neo-app-fe

Simple Frontend application to show the data from project [nasa-neo](https://github.com/vnizar/nasa-neo).

## Running the application locally

Before you run the application, you need to define configuration in `.env.local` and add
```
NEO_API_BASE_URL=<base_url_to_API>
NEO_API_VERSION=<API_version>
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed version

For deployed version you can check [here] (https://neo-app-fe-theta.vercel.app/).
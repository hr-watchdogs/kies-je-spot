This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First copy the example.env to env.local and fill in the required tokens:

```dotenv
NEXT_PUBLIC_MAPBOX_TOKEN="[your-token]"
```

To start local development run the following command
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Creating new features

To create new features please follow the next steps.

1. **Create a new branch based on ticket name**
```shell
$ git checkout -b [ticket-name]
```
**Example**
```shell
$ git checkout -b PROT-6
```
2. **Make sure the features builds correc**t
```shell
$ npm run build
```
If using yarn:
```shell
$ yarn build
```
3. **Commit and push the changes**

Make sure to always add a commit message that describes the changes using the following format
```shell
$ git commit -m "PROT-6: Created new header component" -p
```
```shell

$ git push
```

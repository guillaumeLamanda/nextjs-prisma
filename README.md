# nextjs-prisma

This is a basic implementation of [nextjs](nextjs.org) powered
with [Prisma Framework](https://github.com/prisma/prisma2) (v2, currently in alpha).

> ⚠ there is a [current issue](https://github.com/prisma/prisma2/issues/1226) about `child_process`
> in `getServerProps`.  
> Still possible to make it work using `/api` + `SRW`

## Getting started

`yarn dev` - launch the next.js development server  
`yarn build` - build the website  
`yarn prisma:dev` - launch prisma develop mode  
`yarn prisma:generate` - generate photon client

## Reproduce `child_process` error

Run `yarn prisma:generate` to generate the prisma photon client.

Then run `yarn dev`.

- http://localhost:3000 run well (no photon calls)
- http://localhost:3000/post work with `SRW` client to call `/api` route.
- http://localhost:3000/api/graphql work as expected, prisma client work well from here.

import { useEffect, useState } from "react";
import { useCookies } from 'next-client-cookies';

import { unstable_noStore as noStore } from 'next/cache'

import { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = (async () => {
  return global.process.env.APP_HOST_IP;
})

// export default function getServerSideIP() {
//     noStore();
//     console.log(getServerSideProps());
//     return null;
// }
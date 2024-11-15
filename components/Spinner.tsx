import React from 'react'
import spinner from "@/public/180-ring-with-bg.svg";
import Image from 'next/image';

export default function Spinner() {
  return (
    <Image src={spinner} width={40} height={40} alt='spinner'></Image>
  )
}

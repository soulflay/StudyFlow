"use client";
import React from 'react'
import Typewriter from "typewriter-effect"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter options = {{
        loop:true
      }}
  
      onInit = {(typewriter) => {
        typewriter.typeString("Ace Every Class, No Sweat 😎📖")
        .pauseFor(1500).deleteAll()
        .typeString("Notes That Work as Hard as You Do 💼⚡")
        .pauseFor(1500).deleteAll()
        .typeString("The Future of Studying is Here ⚡📚")
        .pauseFor(1500).deleteAll()
        .start();
      }}
        
      />
    
)
}

export default TypewriterTitle
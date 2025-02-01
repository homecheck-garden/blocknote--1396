"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
 
const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];
 
export function MultiStepLoaderOverlayComponent({ 
    loading ,
    steps ,
    duration = 2000,
    index= undefined
} : { 
    loading : boolean,
    steps : { text : string }[],
    duration? : number,
    index? : number

 }) {
  return (
      <Loader loadingStates={steps} loading={loading} duration={duration} loop={false} index={index} />
  );
}
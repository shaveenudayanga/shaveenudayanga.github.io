---
title: "Building Lumina: What I Learned Creating an AI-Powered Robotic Lamp"
date: "2026-02-15"
updated: "2026-02-15"
description: "A deep dive into the engineering decisions behind Lumina — from custom PCB design and ESP32 firmware to real-time gesture tracking with MediaPipe and voice conversation with Gemini 2.5."
author: "Shaveen Udayanga"
tags: ["IoT", "AI", "HCI", "ESP32"]
image: "/images/portfolio/lumina/lumina-hero.webp"
imageAlt: "Lumina AI-powered robotic lamp with OLED face display"
faq:
  - question: "What is Lumina?"
    answer: "Lumina is an AI-powered robotic lamp that uses an ESP32 microcontroller, two servo motors for pan/tilt movement, MediaPipe for real-time hand tracking, and Google Gemini 2.5 for voice conversation, along with an expressive OLED face display."
  - question: "What hardware does Lumina use?"
    answer: "Lumina runs on an ESP32 microcontroller with a custom PCB designed in KiCad, two servo motors for movement, and an OLED display. It communicates with a Python host over WiFi using UDP for sub-10ms latency."
  - question: "How does Lumina track hand gestures in real-time?"
    answer: "Lumina uses Google's MediaPipe hand tracking running at 30fps on a Python host application. The position data is sent over UDP to the ESP32, which applies exponential smoothing for fluid servo movement at 50Hz."
---

## Why Build a Robotic Lamp?

For my Human-Computer Interaction course, I wanted to build something that felt genuinely alive. Not another chatbot on a screen, but a physical object that responds to you, moves with intent, and can hold a conversation.

Lumina started as a sketch on a whiteboard and became a fully functional robotic lamp with voice conversation (powered by Gemini 2.5), real-time hand tracking (MediaPipe), and an expressive OLED face.

## The Hardware Stack

The brain of Lumina is an ESP32 microcontroller running custom firmware. I designed the PCB in KiCad, printed it, and hand-soldered every component. The mechanical design uses two servo motors for pan and tilt movement, giving the lamp a surprisingly expressive range of motion.

The trickiest part was getting smooth movement. Servos jitter if you feed them raw position data, so I implemented exponential smoothing on the ESP32 side. The result is fluid, natural-looking motion that tracks your hand in real-time.

## Software Architecture

The software runs across three layers:

1. **ESP32 firmware** (C++): Handles servo control, OLED display animations, and UDP packet reception
2. **Python host application**: Runs MediaPipe hand tracking, Gemini voice conversation, and sends control packets to the ESP32
3. **UDP bridge**: Lightweight protocol for sub-10ms latency between the host and microcontroller

I chose UDP over serial because it decouples the host from the hardware. The lamp connects over WiFi, which means the host application can run on any machine on the network.

## Lessons Learned

1. **Hardware is unforgiving.** A software bug costs you a restart. A soldering mistake costs you hours with a desoldering wick.
2. **Real-time systems need real constraints.** MediaPipe runs at 30fps, but servo updates at 50Hz feel best. Managing these different timing requirements taught me about priority scheduling at a visceral level.
3. **The HCI insight:** People anthropomorphize things that move. The moment Lumina tracked someone's hand for the first time, they started talking to it. Before we even added voice.

## What's Next

I want to add persistent memory so Lumina remembers who it has talked to. The current conversation resets each session. I am also exploring adding a depth sensor for more precise spatial awareness.
